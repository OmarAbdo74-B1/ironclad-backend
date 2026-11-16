# Ironclad Backend

Car showroom REST API (Node.js 22 + Express), part of the **Ironclad** DevSecOps & GitOps platform.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/health` | Liveness/readiness probe |
| GET | `/api/info` | Version, environment, and pod name |
| GET | `/api/cars` | All cars (`?category=Supercar` to filter) |
| GET | `/api/cars/:id` | One car (`400` invalid id, `404` not found) |

## Configuration

| Variable | Default | Set by |
|---|---|---|
| `PORT` | `3000` | Dockerfile |
| `APP_VERSION` | `dev` | Jenkins (`--build-arg`) |
| `APP_ENV` | `local` | Kustomize overlay |

## Local

```bash
npm ci
npm test
npm start
```

## Pipeline

Unit tests (in Docker) → SonarQube + Quality Gate → image build → Trivy → Docker Hub → GitOps `app/overlays/dev`.

## Security

- Non-root user (`node`), read-only root filesystem compatible (writes nothing to disk)
- Production dependencies only in the runtime image
- `X-Powered-By` disabled, `nosniff` header, 10 KB JSON body limit
- Graceful shutdown on `SIGTERM`
