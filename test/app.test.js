'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('../src/app');

let server;
let baseUrl;

before(async () => {
  const app = createApp({ version: 'v-test', environment: 'test', pod: 'pod-1' });
  await new Promise((resolve) => {
    server = app.listen(0, '127.0.0.1', resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => new Promise((resolve) => server.close(resolve)));

test('GET /health returns UP', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'UP' });
});

test('responses include security headers and hide the framework', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(res.headers.get('x-powered-by'), null);
});

test('GET /api/info returns build and runtime info', async () => {
  const res = await fetch(`${baseUrl}/api/info`);
  const body = await res.json();
  assert.equal(body.version, 'v-test');
  assert.equal(body.environment, 'test');
  assert.equal(body.pod, 'pod-1');
});

test('GET /api/cars returns all cars', async () => {
  const res = await fetch(`${baseUrl}/api/cars`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.count, 6);
  assert.equal(body.cars.length, 6);
  assert.equal(body.environment, 'test');
});

test('GET /api/cars filters by category (case-insensitive)', async () => {
  const res = await fetch(`${baseUrl}/api/cars?category=supercar`);
  const body = await res.json();
  assert.equal(body.count, 3);
  assert.ok(body.cars.every((c) => c.category === 'Supercar'));
});

test('GET /api/cars/:id returns one car', async () => {
  const res = await fetch(`${baseUrl}/api/cars/3`);
  assert.equal(res.status, 200);
  assert.equal((await res.json()).name, 'Ferrari SF90 Stradale');
});

test('GET /api/cars/:id returns 404 for unknown id', async () => {
  const res = await fetch(`${baseUrl}/api/cars/999`);
  assert.equal(res.status, 404);
});

test('GET /api/cars/:id returns 400 for invalid id', async () => {
  const res = await fetch(`${baseUrl}/api/cars/abc`);
  assert.equal(res.status, 400);
});

test('unknown routes return JSON 404', async () => {
  const res = await fetch(`${baseUrl}/nope`);
  assert.equal(res.status, 404);
  assert.deepEqual(await res.json(), { error: 'Not found' });
});

test('defaults are used when no config is given', async () => {
  const app = createApp();
  const s = await new Promise((resolve) => {
    const srv = app.listen(0, '127.0.0.1', () => resolve(srv));
  });
  const res = await fetch(`http://127.0.0.1:${s.address().port}/api/info`);
  const body = await res.json();
  await new Promise((resolve) => s.close(resolve));
  assert.equal(body.version, 'dev');
  assert.equal(body.environment, 'local');
});
