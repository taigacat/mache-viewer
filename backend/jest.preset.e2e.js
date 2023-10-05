const merge = require('merge');
const ts_preset = require('ts-jest/jest-preset');
const dynamodb_local_preset = require('@shelf/jest-dynamodb/jest-preset');

module.exports = merge.recursive(ts_preset, dynamodb_local_preset, {
  globals: {
    test_url: `http://${process.env.HOST || '127.0.0.1'}:${
      process.env.PORT || 3000
    }`,
  },
});
