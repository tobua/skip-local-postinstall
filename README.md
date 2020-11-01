# skip-local-postinstall

Skips (successfully exits current process) when postinstall is called locally instead of being called when the package has been published to npm.

```json
// package.json
{
  "scripts": {
    "postinstall": "node ./installation.js"
  }
}
```

```js
// installation.js
import skip from 'skip-local-postinstall'

skip()

// This code will only be executed when installed through npm.
console.log('Installing from npm.')
```

Credits to Már Örlygsson for suggesting this on [Stackoverflow](https://stackoverflow.com/a/53239387/3185545s).

**Please note** that the environment variable used for this plugin has dissapeared in npm Version 7: [GitHub Issue in npm CLI Repository](https://github.com/npm/cli/issues/2033).
