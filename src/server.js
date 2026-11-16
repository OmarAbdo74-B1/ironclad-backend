'use strict';

const { createApp } = require('./app');

const port = Number.parseInt(process.env.PORT || '3000', 10);

const app = createApp({
  version: process.env.APP_VERSION,
  environment: process.env.APP_ENV,
  pod: process.env.HOSTNAME
});

const server = app.listen(port, '0.0.0.0', () => {
  console.log(`ironclad-backend listening on port ${port}`);
});

function shutdown(signal) {
  console.log(`${signal} received, shutting down`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
