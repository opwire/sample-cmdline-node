var bootstrap = require('./boostrap')

bootstrap(function(err, store) {
  console.log(JSON.stringify(store, null, 4));
})
