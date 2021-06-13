const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const fs = require('fs')

const gitRevisionPlugin = new GitRevisionPlugin()

module.exports = {
  webpack: (config, { isServer, webpack }) => {
    if(!isServer){
      config.node = {
        fs: `empty`
      }
    }
    config.plugins.push(new webpack.DefinePlugin({
      DEV: false,
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.version': JSON.stringify(gitRevisionPlugin.commithash().slice(0, 7)), // TODO: delete when real
      DEPLOYED_ADDRESS: JSON.stringify(fs.readFileSync('deployedAddress', 'utf8').replace(/\n|\r/g, "")),
      DEPLOYED_ABI: fs.existsSync('deployedABI') && fs.readFileSync('deployedABI', 'utf8')
    }))

    return config
  }
}