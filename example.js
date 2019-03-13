var bootstrap = require('./bootstrap');

bootstrap(function(err, store) {
  if (err) {
    process.stderr.write(JSON.stringify({
      name: err.name,
      message: err.message,
      stack: err.stack
    }, null, 2));
    process.exit(1);
  }
  console.log(JSON.stringify(store, null, 2));
})
