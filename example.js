var bootstrap = require('./bootstrap');

bootstrap(function(err, store) {
  console.log(JSON.stringify(store, null, 2));
})
