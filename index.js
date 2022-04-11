export const skip = (exitCode = 0) => {
  const { INIT_CWD, PWD = process.cwd() } = process.env

  if (!INIT_CWD || INIT_CWD === PWD || INIT_CWD.indexOf(PWD) === 0) {
    console.info(`Skipping 'postinstall' on local install`)
    process.exit(exitCode)
  }
}
