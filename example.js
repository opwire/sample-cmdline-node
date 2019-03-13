var bootstrap = require('./bootstrap');

const minimist = require('minimist');
const raw_args = minimist(process.argv.slice(2));
const args = {};
args.inputFormat = raw_args["input-format"] || raw_args["format"] || "json";
args.outputFormat = raw_args["output-format"] || raw_args["format"] || "json";

bootstrap(args, function(err, store) {
  const isPlainText = args.outputFormat !== "json";
  if (err) {
    if (isPlainText) {
      process.stderr.write(err);
    } else {
      process.stderr.write(JSON.stringify({
        name: err.name,
        message: err.message,
        stack: err.stack
      }, null, 2));
    }
    process.stderr.write("\n");
    process.exit(1);
  }

  if (isPlainText) {
    for(const key in store) {
      console.log("%s:", key.toUpperCase());
      let content = store[key];
      if (typeof store[key] !== 'string') {
        content = JSON.stringify(content, null, 2);
      }
      console.log(content);
      console.log();
    }
  } else {
    console.log(JSON.stringify(store, null, 2));
  }
})
