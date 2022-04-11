import { execSync } from 'child_process'
import { environment, prepare, file, packageJson, listFilesMatching } from 'jest-fixture'

const [fixturePath] = environment('remote')

test('File gets created as installed from remote.', async () => {
    prepare([
        file('skip-remote/package.json', {
            name: 'skip-remote',
            version: '1.0.0',
            type: 'module',
            scripts: {
                postinstall: 'skip-local-postinstall fail.js'
            },
            dependencies: {
                'skip-local-postinstall': 'file:../../../..'
            },
            files: [
                "fail.js"
            ]
        }),
        file('skip-remote/fail.js', `import { writeFileSync } from 'fs'
import { join } from 'path'

writeFileSync(join(process.cwd(), 'failed.png'), '')`),
        packageJson('remote', {
            version: '1.0.0',
            type: 'module',
            dependencies: {
                'skip-remote': 'file:./skip-remote'
            }
        }),
    ])

    execSync('npm install', { cwd: fixturePath, stdio: 'inherit' })

    const files = listFilesMatching('*.png', fixturePath)

    expect(files.length).toEqual(0)
})
