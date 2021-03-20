# skip-local-postinstall

Skips (successfully exits current process) when postinstall is called locally instead of being called when the package has been published to npm.

```js
// package.json
"scripts": {
  "postinstall": "node ./installation.js"
}
```

```js
// installation.js
import { skip } from 'skip-local-postinstall'

skip()

// This code will only be executed when installed through npm.
console.log('Installing from npm.')
```

Requires [`process.env.INIT_CWD`](https://github.com/npm/cli/issues/2033) variable available in all stable npm releases. Credits to Már Örlygsson for suggesting this implementaiton on [Stackoverflow](https://stackoverflow.com/a/53239387/3185545s).

## Compiled Postinstall File

In cases where you want to run a postinstall script for compiled files (i.e. source in TypeScript) the file will not be there when installing the package locally. To address that this plugin also includes a bin script. It's arguments will be passed directly to the `node` command and can include additional arguments apart from the file to run.

```js
// package.json
"scripts": {
  "postinstall": "skip-local-postinstall ./dist/installation.js"
}
```
