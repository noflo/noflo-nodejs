const open = require('open');
const settings = require('./settings');
const server = require('./server');
const runtime = require('./runtime');
const debug = require('./debug');

exports.main = () => {
  settings.load()
    .then((options) => server.create(options)
      .then((rt) => runtime.subscribe(rt, options))
      .then((rt) => runtime.startGraph(options.graph, rt, options))
      .then((rt) => server.start(rt, options))
      .then((rt) => runtime.advertiseMdns(rt, options))
      .then((rt) => runtime.ping(rt, options))
      .then(() => {
        if (options.batch) {
          return;
        }
        if (options.id) {
          process.title = `noflo-nodejs-${options.id}`;
        }
        setTimeout(() => {
          if (options.protocol === 'webrtc') {
            console.log(`NoFlo runtime is now listening at WebRTC channel #${options.id}`);
          } else {
            console.log(`NoFlo runtime is now listening at ${server.getUrl(options)}`);
          }
          if (options.secret) {
            console.log(`Live IDE URL: ${server.liveUrl(options)}`);
          }
          if (!options.open) {
            return;
          }
          open(server.liveUrl(options, true))
            .catch(() => {});
        }, 10);
      }))
    .catch((err) => {
      debug.showError(err);
      process.exit(1);
    });
};

if (!module.parent) {
  exports.main();
}
