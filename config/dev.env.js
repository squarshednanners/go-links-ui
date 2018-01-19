'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:8080"',
  CLIENT_ID: '"trusted-app"',
  CLIENT_SECRET: '"secret"'
})
