---
order: 5
title: Template Strings
---

# Template string reference

Below you'll find the schema of the keys available when interpolating template strings (see our [Variables and Templating](../guides/variables-and-templating.md) guide for more information and usage examples).

Note that there are four sections below, since different configuration sections have different keys available to them. Please make sure to refer to the correct section.

## Project configuration context

The following keys are available in any template strings within project definitions in `garden.yml` config files, except the `name` field (which cannot be templated). See the [Provider](#provider-configuration-context) section below for additional keys available when configuring `providers`:


### `${local.*}`

Context variables that are specific to the currently running environment/machine.

| Type     |
| -------- |
| `object` |

### `${local.artifactsPath}`

The absolute path to the directory where exported artifacts from test and task runs are stored.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.artifactsPath}
```

### `${local.env.*}`

A map of all local environment variables (see https://nodejs.org/api/process.html#process_process_env).

| Type     |
| -------- |
| `object` |

### `${local.env.<env-var-name>}`

The environment variable value.

| Type     |
| -------- |
| `string` |

### `${local.platform}`

A string indicating the platform that the framework is running on (see https://nodejs.org/api/process.html#process_process_platform)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.platform}
```

### `${local.username}`

The current username (as resolved by https://github.com/sindresorhus/username)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.username}
```

### `${project.*}`

Information about the Garden project.

| Type     |
| -------- |
| `object` |

### `${project.name}`

The name of the Garden project.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${project.name}
```


## Provider configuration context

The following keys are available in template strings under the `providers` key (or `environments[].providers) in project configs.

Providers can also reference outputs defined by other providers, via the `${providers.<provider-name>.outputs}` key. For details on which outputs are available for a given provider, please refer to the [reference](https://docs.garden.io/reference/providers) docs for the provider in question, and look for the _Outputs_ section.


### `${local.*}`

Context variables that are specific to the currently running environment/machine.

| Type     |
| -------- |
| `object` |

### `${local.artifactsPath}`

The absolute path to the directory where exported artifacts from test and task runs are stored.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.artifactsPath}
```

### `${local.env.*}`

A map of all local environment variables (see https://nodejs.org/api/process.html#process_process_env).

| Type     |
| -------- |
| `object` |

### `${local.env.<env-var-name>}`

The environment variable value.

| Type     |
| -------- |
| `string` |

### `${local.platform}`

A string indicating the platform that the framework is running on (see https://nodejs.org/api/process.html#process_process_platform)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.platform}
```

### `${local.username}`

The current username (as resolved by https://github.com/sindresorhus/username)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.username}
```

### `${project.*}`

Information about the Garden project.

| Type     |
| -------- |
| `object` |

### `${project.name}`

The name of the Garden project.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${project.name}
```

### `${environment.*}`

Information about the environment that Garden is running against.

| Type     |
| -------- |
| `object` |

### `${environment.name}`

The name of the environment Garden is running against, excluding the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.name}
```

### `${environment.fullName}`

The full name of the environment Garden is running against, including the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.fullName}
```

### `${environment.namespace}`

The currently active namespace (if any).

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.namespace}
```

### `${variables.*}`

A map of all variables defined in the project configuration.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${variables.<variable-name>}`

| Type                                             |
| ------------------------------------------------ |
| `number | string | boolean | link | array[link]` |

### `${var.*}`

Alias for the variables field.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${var.<name>}`

Number, string or boolean

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${providers.*}`

Retrieve information about providers that are defined in the project.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${providers.<provider-name>.config.*}`

The resolved configuration for the provider.

| Type     |
| -------- |
| `object` |

### `${providers.<provider-name>.config.<config-key>}`

The provider config key value. Refer to individual [provider references](https://docs.garden.io/reference/providers) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${providers.<provider-name>.outputs.*}`

The outputs defined by the provider (see individual plugin docs for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${providers.<provider-name>.outputs.<output-key>}`

The provider output value. Refer to individual [provider references](https://docs.garden.io/reference/providers) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |


## Module configuration context

The below keys are available in template strings in module configs. These include all the keys from the sections above.

Modules can reference outputs defined by providers, via the `${providers.<provider-name>.outputs}` key. For details on which outputs are available for a given provider, please refer to the [reference](https://docs.garden.io/reference/providers) docs for the provider in question, and look for the _Outputs_ section.

Modules can also reference outputs defined by other modules, via the `${modules.<module-name>.outputs}` key, as well as service and task outputs via the `${runtime.services.<service-name>.outputs}` and `${runtime.tasks.<task-name>.outputs}` keys.
For details on which outputs are available for a given module type, please refer to the [reference](https://docs.garden.io/reference/module-types) docs for the module type in question, and look for the _Outputs_ section.


### `${local.*}`

Context variables that are specific to the currently running environment/machine.

| Type     |
| -------- |
| `object` |

### `${local.artifactsPath}`

The absolute path to the directory where exported artifacts from test and task runs are stored.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.artifactsPath}
```

### `${local.env.*}`

A map of all local environment variables (see https://nodejs.org/api/process.html#process_process_env).

| Type     |
| -------- |
| `object` |

### `${local.env.<env-var-name>}`

The environment variable value.

| Type     |
| -------- |
| `string` |

### `${local.platform}`

A string indicating the platform that the framework is running on (see https://nodejs.org/api/process.html#process_process_platform)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.platform}
```

### `${local.username}`

The current username (as resolved by https://github.com/sindresorhus/username)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.username}
```

### `${project.*}`

Information about the Garden project.

| Type     |
| -------- |
| `object` |

### `${project.name}`

The name of the Garden project.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${project.name}
```

### `${environment.*}`

Information about the environment that Garden is running against.

| Type     |
| -------- |
| `object` |

### `${environment.name}`

The name of the environment Garden is running against, excluding the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.name}
```

### `${environment.fullName}`

The full name of the environment Garden is running against, including the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.fullName}
```

### `${environment.namespace}`

The currently active namespace (if any).

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.namespace}
```

### `${variables.*}`

A map of all variables defined in the project configuration.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${variables.<variable-name>}`

| Type                                             |
| ------------------------------------------------ |
| `number | string | boolean | link | array[link]` |

### `${var.*}`

Alias for the variables field.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${var.<name>}`

Number, string or boolean

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${providers.*}`

Retrieve information about providers that are defined in the project.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${providers.<provider-name>.config.*}`

The resolved configuration for the provider.

| Type     |
| -------- |
| `object` |

### `${providers.<provider-name>.config.<config-key>}`

The provider config key value. Refer to individual [provider references](https://docs.garden.io/reference/providers) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${providers.<provider-name>.outputs.*}`

The outputs defined by the provider (see individual plugin docs for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${providers.<provider-name>.outputs.<output-key>}`

The provider output value. Refer to individual [provider references](https://docs.garden.io/reference/providers) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${modules.*}`

Retrieve information about modules that are defined in the project.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${modules.<module-name>.buildPath}`

The build path of the module.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${modules.<module-name>.buildPath}
```

### `${modules.<module-name>.outputs.*}`

The outputs defined by the module (see individual module type [references](https://docs.garden.io/reference/module-types) for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${modules.<module-name>.outputs.<output-name>}`

The module output value. Refer to individual [module type references](https://docs.garden.io/reference/module-types) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${modules.<module-name>.path}`

The local path of the module.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${modules.<module-name>.path}
```

### `${modules.<module-name>.version}`

The current version of the module.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${modules.<module-name>.version}
```

### `${runtime.*}`

Runtime outputs and information from services and tasks (only resolved at runtime when deploying services and running tasks).

| Type     |
| -------- |
| `object` |

### `${runtime.services.*}`

Runtime information from the services that the service/task being run depends on.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.services.<service-name>.outputs.*}`

The runtime outputs defined by the service (see individual module type [references](https://docs.garden.io/reference/module-types) for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.services.<service-name>.outputs.<output-name>}`

The service output value. Refer to individual [module type references](https://docs.garden.io/reference/module-types) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${runtime.tasks.*}`

Runtime information from the tasks that the service/task being run depends on.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.tasks.<task-name>.outputs.*}`

The runtime outputs defined by the task (see individual module type [references](https://docs.garden.io/reference/module-types) for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.tasks.<task-name>.outputs.<output-name>}`

The task output value. Refer to individual [module type references](https://docs.garden.io/reference/module-types) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |


## Output configuration context

The below keys are available in template strings for _project outputs_, specified in `outputs[].value` keys in project config files. These include all the keys from the sections above.

Output values can reference outputs defined by providers, via the `${providers.<provider-name>.outputs}` key. For details on which outputs are available for a given provider, please refer to the [reference](https://docs.garden.io/reference/providers) docs for the provider in question, and look for the _Outputs_ section.

Output values may also reference outputs defined by modules, via the `${modules.<module-name>.outputs}` key, as well as service and task outputs via the `${runtime.services.<service-name>.outputs}` and `${runtime.tasks.<task-name>.outputs}` keys.
For details on which outputs are available for a given module type, please refer to the [reference](https://docs.garden.io/reference/module-types) docs for the module type in question, and look for the _Outputs_ section.


### `${local.*}`

Context variables that are specific to the currently running environment/machine.

| Type     |
| -------- |
| `object` |

### `${local.artifactsPath}`

The absolute path to the directory where exported artifacts from test and task runs are stored.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.artifactsPath}
```

### `${local.env.*}`

A map of all local environment variables (see https://nodejs.org/api/process.html#process_process_env).

| Type     |
| -------- |
| `object` |

### `${local.env.<env-var-name>}`

The environment variable value.

| Type     |
| -------- |
| `string` |

### `${local.platform}`

A string indicating the platform that the framework is running on (see https://nodejs.org/api/process.html#process_process_platform)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.platform}
```

### `${local.username}`

The current username (as resolved by https://github.com/sindresorhus/username)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.username}
```

### `${project.*}`

Information about the Garden project.

| Type     |
| -------- |
| `object` |

### `${project.name}`

The name of the Garden project.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${project.name}
```

### `${environment.*}`

Information about the environment that Garden is running against.

| Type     |
| -------- |
| `object` |

### `${environment.name}`

The name of the environment Garden is running against, excluding the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.name}
```

### `${environment.fullName}`

The full name of the environment Garden is running against, including the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.fullName}
```

### `${environment.namespace}`

The currently active namespace (if any).

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.namespace}
```

### `${variables.*}`

A map of all variables defined in the project configuration.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${variables.<variable-name>}`

| Type                                             |
| ------------------------------------------------ |
| `number | string | boolean | link | array[link]` |

### `${var.*}`

Alias for the variables field.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${var.<name>}`

Number, string or boolean

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${providers.*}`

Retrieve information about providers that are defined in the project.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${providers.<provider-name>.config.*}`

The resolved configuration for the provider.

| Type     |
| -------- |
| `object` |

### `${providers.<provider-name>.config.<config-key>}`

The provider config key value. Refer to individual [provider references](https://docs.garden.io/reference/providers) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${providers.<provider-name>.outputs.*}`

The outputs defined by the provider (see individual plugin docs for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${providers.<provider-name>.outputs.<output-key>}`

The provider output value. Refer to individual [provider references](https://docs.garden.io/reference/providers) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${modules.*}`

Retrieve information about modules that are defined in the project.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${modules.<module-name>.buildPath}`

The build path of the module.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${modules.<module-name>.buildPath}
```

### `${modules.<module-name>.outputs.*}`

The outputs defined by the module (see individual module type [references](https://docs.garden.io/reference/module-types) for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${modules.<module-name>.outputs.<output-name>}`

The module output value. Refer to individual [module type references](https://docs.garden.io/reference/module-types) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${modules.<module-name>.path}`

The local path of the module.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${modules.<module-name>.path}
```

### `${modules.<module-name>.version}`

The current version of the module.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${modules.<module-name>.version}
```

### `${runtime.*}`

Runtime outputs and information from services and tasks (only resolved at runtime when deploying services and running tasks).

| Type     |
| -------- |
| `object` |

### `${runtime.services.*}`

Runtime information from the services that the service/task being run depends on.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.services.<service-name>.outputs.*}`

The runtime outputs defined by the service (see individual module type [references](https://docs.garden.io/reference/module-types) for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.services.<service-name>.outputs.<output-name>}`

The service output value. Refer to individual [module type references](https://docs.garden.io/reference/module-types) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${runtime.tasks.*}`

Runtime information from the tasks that the service/task being run depends on.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.tasks.<task-name>.outputs.*}`

The runtime outputs defined by the task (see individual module type [references](https://docs.garden.io/reference/module-types) for details).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${runtime.tasks.<task-name>.outputs.<output-name>}`

The task output value. Refer to individual [module type references](https://docs.garden.io/reference/module-types) for details.

| Type                        |
| --------------------------- |
| `number | string | boolean` |


## Workflow configuration context

The below keys are available in template strings for Workflow configurations.

Note that the `{steps.*}` key is only available for the `steps[].command` and `steps[].script` fields in Workflow configs, and may only reference previous steps in the same workflow. See below for more details.


### `${local.*}`

Context variables that are specific to the currently running environment/machine.

| Type     |
| -------- |
| `object` |

### `${local.artifactsPath}`

The absolute path to the directory where exported artifacts from test and task runs are stored.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.artifactsPath}
```

### `${local.env.*}`

A map of all local environment variables (see https://nodejs.org/api/process.html#process_process_env).

| Type     |
| -------- |
| `object` |

### `${local.env.<env-var-name>}`

The environment variable value.

| Type     |
| -------- |
| `string` |

### `${local.platform}`

A string indicating the platform that the framework is running on (see https://nodejs.org/api/process.html#process_process_platform)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.platform}
```

### `${local.username}`

The current username (as resolved by https://github.com/sindresorhus/username)

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${local.username}
```

### `${project.*}`

Information about the Garden project.

| Type     |
| -------- |
| `object` |

### `${project.name}`

The name of the Garden project.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${project.name}
```

### `${environment.*}`

Information about the environment that Garden is running against.

| Type     |
| -------- |
| `object` |

### `${environment.name}`

The name of the environment Garden is running against, excluding the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.name}
```

### `${environment.fullName}`

The full name of the environment Garden is running against, including the namespace.

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.fullName}
```

### `${environment.namespace}`

The currently active namespace (if any).

| Type     |
| -------- |
| `string` |

Example:

```yaml
my-variable: ${environment.namespace}
```

### `${variables.*}`

A map of all variables defined in the project configuration.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${variables.<variable-name>}`

| Type                                             |
| ------------------------------------------------ |
| `number | string | boolean | link | array[link]` |

### `${var.*}`

Alias for the variables field.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${var.<name>}`

Number, string or boolean

| Type                        |
| --------------------------- |
| `number | string | boolean` |

### `${steps.*}`

Reference previous steps in a workflow. Only available in the `steps[].command` and `steps[].script` fields.
The name of the step should be the explicitly set `name` of the other step, or if one is not set, use
`step-<n>`, where <n> is the sequential number of the step (starting from 1).

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${steps.<step-name>.log}`

The full output log from the step.

| Type     |
| -------- |
| `string` |

### `${steps.<step-name>.outputs.*}`

The outputs returned by the step, as a mapping. Script steps will always have `stdout` and `stderr` keys.
Command steps return different keys, including potentially nested maps and arrays. Please refer to each command
for its output schema.

| Type     | Default |
| -------- | ------- |
| `object` | `{}`    |

### `${steps.<step-name>.outputs.<output-key>}`

| Type                                             |
| ------------------------------------------------ |
| `number | string | boolean | link | array[link]` |

