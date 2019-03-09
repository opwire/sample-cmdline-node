'use strict'

const KEYS = ["OPWIRE_REQUEST", "OPWIRE_SETTING", "OPWIRE_FEATAGS"];

function start(callback) {
  var store = {}

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
    try {
      if (input.length > 0) {
        store.input = JSON.parse(input);
      }
      callback(null, store);
    } catch (err) {
      callback(err);
    }
  });
}

module.exports = start;
