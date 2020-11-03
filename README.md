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

Previously this plugin was implemented using the `process.env.INIT_CWD` variable as suggested by Már Örlygsson on [Stackoverflow](https://stackoverflow.com/a/53239387/3185545s). Since this variable was deprecated from the npm CLI starting with version 7 we're now checking whether the penultimate directory in `process.cwd()` is equal to `node_modules` which indicates postinstall being run after installing through npm.
