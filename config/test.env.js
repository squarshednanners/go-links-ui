'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_URL: '""',
  CLIENT_ID: '""',
  CLIENT_SECRET: '""'
})
