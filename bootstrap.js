'use strict'

const KEYS = ["OPWIRE_REQUEST", "OPWIRE_SETTING"];

function start(args, callback) {
  const store = {}

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
    callback(error, store);
  });
}

module.exports = start;
