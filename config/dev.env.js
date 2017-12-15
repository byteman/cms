var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.60.44:8889"',
  SOCKET_API: '"192.168.60.44:9980"',
  //BASE_API: '"http://192.168.40.176:8000"',
})
