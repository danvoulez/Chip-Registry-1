# Chip Registry Creative OS

## Local development

```bash
pnpm install
pnpm dev
```

Build and start:

```bash
pnpm build
pnpm start
```

## Linting & formatting

```bash
pnpm lint
pnpm lint:fix
pnpm format
pnpm format:check
```

Husky runs `lint-staged` on commit after `pnpm install` (via `pnpm prepare`).

## Environment flags

| Variable                | Purpose                                                 |
| ----------------------- | ------------------------------------------------------- |
| `NEXT_PUBLIC_USE_MOCKS` | Forces UI to use mock API endpoints when set to `true`. |

## Mock API endpoints

- `GET /api/mock/explore`
- `GET /api/mock/receipts/:receiptCid`
- `GET /api/mock/runs/plan`
- `GET /api/mock/runs/execute`
- `GET /api/mock/runs/:runId/events` (SSE)
- `GET /api/mock/worlds`
- `GET /api/mock/chips`
