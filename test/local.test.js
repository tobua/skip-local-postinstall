import { execSync } from 'child_process'
import { environment, prepare, file, packageJson, listFilesMatching } from 'jest-fixture'

const [fixturePath] = environment('local')

test('No file is created as postinstall is skipped.', async () => {
    prepare([
        file('fail.js', `import { writeFileSync } from 'fs'
import { join } from 'path'

writeFileSync(join(process.cwd(), 'failed.png'), '')`),
        packageJson('build', {
            name: 'skip-test', type: 'module',
            scripts: {
                postinstall: 'skip-local-postinstall fail.js'
            },
            dependencies: {
                'skip-local-postinstall': 'file:../../..'
            }
        }),
    ])

    execSync('npm install', { cwd: fixturePath, stdio: 'inherit' })

    const files = listFilesMatching('*.png', fixturePath)

    expect(files.length).toEqual(0)
})
