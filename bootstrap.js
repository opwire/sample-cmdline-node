'use strict'

const minimist = require('minimist');

const KEYS = ["OPWIRE_REQUEST", "OPWIRE_SETTING"];

function start(callback) {
  const store = {}

  const argv = minimist(process.argv.slice(2));
  const args = {};
  args.inputFormat = argv["input-format"] || argv["format"] || "json";
  args.outputFormat = argv["output-format"] || argv["format"] || "json";

  KEYS.forEach(function(key) {
    if (key in process.env) {
      store[key] = JSON.parse(process.env[key])
    }
  })

  var input = '';

  process.stdin.setEncoding('utf8');

  process.stdin.on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      input += chunk;
    }
  });

  process.stdin.on('end', () => {
    let error = null;
    store.input = input;
    if (args.inputFormat === "json" && input.length > 0) {
      try {
        store.input = JSON.parse(input);
      } catch (err) {
        error = err;
      }
    }
    callback(error, args, store);
  });
}

module.exports = start;
