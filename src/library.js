const server = require('./server');
const runtime = require('./runtime');
const settings = require('./settings');

module.exports = (mainGraph, options = {}, preStart = () => Promise.resolve()) => settings
  .loadForLibrary(options)
  .then((config) => server.create(config)
    // Subscribe runtime to signals
    .then((rt) => runtime.subscribe(rt, config))
    // Execute pre-start hook, like for example custom component loader
    .then((rt) => preStart(rt, config).then(() => rt))
    // Load and set up a main graph
    .then((rt) => runtime.startGraph(mainGraph, rt, config))
    // Start the WebSocket server
    .then((rt) => server.start(rt, config))
    // Register service
    .then((rt) => runtime.advertiseMdns(rt, options))
    .then((rt) => runtime.ping(rt, config)));
