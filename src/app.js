'use strict';

const express = require('express');
const { CARS } = require('./data/cars');

function createApp(config = {}) {
  const info = {
    service: 'ironclad-backend',
    version: config.version || 'dev',
    environment: config.environment || 'local',
    pod: config.pod || 'local'
  };

  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '10kb' }));

  app.use((req, res, next) => {
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'UP' });
  });

  app.get('/api/info', (req, res) => {
    res.json(info);
  });

  app.get('/api/cars', (req, res) => {
    const { category } = req.query;
    const cars = typeof category === 'string' && category.length > 0
      ? CARS.filter((car) => car.category.toLowerCase() === category.toLowerCase())
      : CARS;
    res.json({ count: cars.length, cars, servedBy: info.pod, environment: info.environment });
  });

  app.get('/api/cars/:id', (req, res) => {
    const id = Number.parseInt(req.params.id, 10);
    if (!Number.isInteger(id) || id < 1) {
      return res.status(400).json({ error: 'Invalid car id' });
    }
    const car = CARS.find((c) => c.id === id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    return res.json(car);
  });

  app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

module.exports = { createApp };
