import { existsSync } from 'fs'
import { join } from 'path'
import { execSync } from 'child_process'
import { environment, prepare, file, packageJson } from 'jest-fixture'

const [fixturePath] = environment('remote')

test('File gets created as installed from remote.', () => {
  prepare([
    file('skip-remote/package.json', {
      name: 'skip-remote',
      version: '1.0.0',
      type: 'module',
      scripts: {
        postinstall: 'skip-local-postinstall fail.js',
      },
      dependencies: {
        'skip-local-postinstall': 'file:../../../..',
      },
      files: ['fail.js'],
    }),
    file(
      'skip-remote/fail.js',
      `import { writeFileSync } from 'fs'
import { join } from 'path'

writeFileSync(join(process.cwd(), 'failed.png'), '')`
    ),
    packageJson('remote', {
      version: '1.0.0',
      type: 'module',
    }),
  ])

  execSync('npm install', { cwd: fixturePath, stdio: 'inherit' })

  const result = execSync('npm pack ./skip-remote | tail -1', {
    cwd: fixturePath,
    stdio: 'pipe',
  })

  execSync(`npm i --no-save ${result.toString()}`, {
    cwd: fixturePath,
    stdio: 'inherit',
  })

  const generatedPngPath = join(fixturePath, 'node_modules/skip-remote/failed.png')

  expect(existsSync(generatedPngPath)).toBe(true)
})
