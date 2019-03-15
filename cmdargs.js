'use strict';

const minimist = require('minimist');

function extractArgs() {
  const raw_args = minimist(process.argv.slice(2));
  const args = {};
  args.inputFormat = raw_args["input-format"] || raw_args["format"] || "json";
  args.outputFormat = raw_args["output-format"] || raw_args["format"] || "json";
  return args;
}

module.exports = extractArgs;
