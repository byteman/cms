var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTP_HOST: '192.168.40.176:8000',
  BASE_API: '"http://192.168.40.176:8000"',
  //BASE_API: 'http://' + location.hostname + ':8000'
})
