var getBabelRelayPlugin = require('babel-relay-plugin');
var schemaData = require('./dist/server/core/api/schema.json').data;

module.exports = getBabelRelayPlugin(schemaData);
