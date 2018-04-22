/*
 * Copyright (C) 2018 Garden Technologies, Inc. <info@garden.io>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { PluginContext } from "../../plugin-context"
import { ServiceStatus } from "../../types/service"
import { join, relative, resolve } from "path"
import * as escapeStringRegexp from "escape-string-regexp"
import { DeploymentError, PluginError } from "../../exceptions"
import {
  gcfServicesSchema, GoogleCloudFunctionsModule,
} from "../google/google-cloud-functions"
import {
  ConfigureEnvironmentParams,
  DeployServiceParams, GetEnvironmentStatusParams, GetServiceLogsParams, GetServiceOutputsParams,
  GetServiceStatusParams, ParseModuleParams,
  GardenPlugin,
} from "../../types/plugin"
import { STATIC_DIR } from "../../constants"
import { ContainerModule, ContainerService } from "../container"
import { validate } from "../../types/common"

const emulatorModulePath = join(STATIC_DIR, "local-gcf-container")
const emulatorPort = 8010
const emulatorServiceName = "google-cloud-functions"

export const gardenPlugin = (): GardenPlugin => ({
  actions: {
    getEnvironmentStatus,
    configureEnvironment,
  },
  moduleActions: {
    "google-cloud-function": {
      async parseModule({ ctx, moduleConfig }: ParseModuleParams<GoogleCloudFunctionsModule>) {
        const module = new GoogleCloudFunctionsModule(ctx, moduleConfig)

        // TODO: check that each function exists at the specified path

        module.services = validate(
          moduleConfig.services, gcfServicesSchema, `services in module ${moduleConfig.name}`,
        )

        return module
      },

      getServiceStatus,

      async deployService({ ctx, config, service, env }: DeployServiceParams<GoogleCloudFunctionsModule>) {
        const containerFunctionPath = resolve(
          "/functions",
          relative(ctx.projectRoot, service.module.path),
          service.config.path,
        )

        const emulator = await getEmulatorService(ctx)
        const result = await ctx.execInService(
          emulator,
          [
            "functions-emulator", "deploy",
            "--trigger-http",
            "--project", "local",
            "--region", "local",
            "--local-path", containerFunctionPath,
            "--entry-point", service.config.entrypoint || service.name,
            service.config.function,
          ],
        )

        if (result.code !== 0) {
          throw new DeploymentError(`Deploying function ${service.name} failed: ${result.output}`, {
            serviceName: service.name,
            error: result.stderr,
          })
        }

        return getServiceStatus({ ctx, config, service, env })
      },

      async getServiceOutputs({ ctx, service }: GetServiceOutputsParams<GoogleCloudFunctionsModule>) {
        const emulator = await getEmulatorService(ctx)

        return {
          endpoint: `http://${emulator.name}:${emulatorPort}/local/local/${service.config.function}`,
        }
      },

      async getServiceLogs({ ctx, stream, tail }: GetServiceLogsParams<GoogleCloudFunctionsModule>) {
        const emulator = await getEmulatorService(ctx)
        // TODO: filter to only relevant function logs
        return ctx.getServiceLogs(emulator, stream, tail)
      },
    },
  },
})

async function getEnvironmentStatus({ ctx }: GetEnvironmentStatusParams) {
  // Check if functions emulator container is running
  const status = await ctx.getServiceStatus(await getEmulatorService(ctx))

  return { configured: status.state === "ready" }
}

async function configureEnvironment({ ctx, config, env, logEntry }: ConfigureEnvironmentParams) {
  const status = await getEnvironmentStatus({ ctx, config, env })

  // TODO: This check should happen ahead of calling this handler
  if (status.configured) {
    return
  }

  const service = await getEmulatorService(ctx)

  // We mount the project root into the container, so we can exec deploy any function in there later.
  service.config.volumes = [{
    name: "functions",
    containerPath: "/functions",
    hostPath: ctx.projectRoot,
  }]

  // TODO: Publish this container separately from the project instead of building it here
  await ctx.buildModule(service.module)
  await ctx.deployService(service, undefined, logEntry)
}

async function getServiceStatus(
  { ctx, service }: GetServiceStatusParams<GoogleCloudFunctionsModule>,
): Promise<ServiceStatus> {
  const emulator = await getEmulatorService(ctx)
  const emulatorStatus = await ctx.getServiceStatus(emulator)

  if (emulatorStatus !== "ready") {
    return { state: "stopped" }
  }

  const result = await ctx.execInService(emulator, ["functions-emulator", "list"])

  // Regex fun. Yay.
  // TODO: Submit issue/PR to @google-cloud/functions-emulator to get machine-readable output
  if (result.output.match(new RegExp(`READY\\s+│\\s+${escapeStringRegexp(service.name)}\\s+│`, "g"))) {
    // For now we don't have a way to track which version is developed.
    // We most likely need to keep track of that on our side.
    return { state: "ready" }
  } else {
    return {}
  }
}

async function getEmulatorService(ctx: PluginContext) {
  const module = await ctx.resolveModule<ContainerModule>(emulatorModulePath)

  if (!module) {
    throw new PluginError(`Could not find Google Cloud Function emulator module`, {
      emulatorModulePath,
    })
  }

  return ContainerService.factory(ctx, module, emulatorServiceName)
}