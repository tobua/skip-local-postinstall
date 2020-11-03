module.exports = () => {
  const penultimateDirectoryNodeModules = /.+\/node_modules\/[^\/\n]+/

  const currentDirectory = process.cwd()

  if (!currentDirectory.match(penultimateDirectoryNodeModules)) {
    console.info(`Skipping 'postinstall' on local install`)
    process.exit(0)
  }
}
