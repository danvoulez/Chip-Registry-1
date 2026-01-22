# Chip Registry Creative OS - Task List (Spec v1.1.0)

Legend: ✅ Done, 🟨 Partial, ⬜️ Not Started

## 1) Project Scaffolding & Tooling
- ✅ Next.js 15 App Router structure with main routes (`/create`, `/explore`, `/compare`, `/mint`, `/focus`, `/status`, `/updates`).
- ✅ Global layout, providers, and base theme tokens wired to Tailwind.
- ✅ Core folders created: app, components, lib, stores, hooks.
- ✅ Mock API routes for runs plan/execute/events, receipts, explore.
- 🟨 Linting/formatting config present but no explicit ESLint/Prettier config files yet.
- ⬜️ `pnpm` lockfile and scripts verified in CI.

## 2) Design System & UI Foundations
- ✅ Dark cryptographic theme CSS variables + Tailwind mapping.
- ✅ UI primitives: `CidPill`, `StatusBadge`, `MetricsStrip`, `ProgressLines`, `ReceiptViz`, `Tooltip`, `Toast`, `Modal`, `SplitButton`.
- 🟨 `CidPill` copy + tooltip implemented, but context menu options (copy full/short) not implemented.
- 🟨 `ReceiptViz` placeholder exists, blurhash rendering/fade-in still missing.
- ⬜️ Focus-visible styling and keyboard-first patterns beyond basics.
- ⬜️ A11y aria attributes for dialogs (`aria-modal`) and expanded toasts/alerts.

## 3) Core Domain Types & Utilities
- ✅ Core types (`CidStr`, `RunEvent`, `ReceiptExpanded`, etc.).
- ✅ Utility formatters and CID abbreviation.
- ✅ Run reducer with event handling + idempotent event CID tracking.
- 🟨 `prettyCanon` uses `atob` with no guards; should handle invalid base64 and avoid logging.
- ⬜️ Canon bytes viewers + JSON inspector views with copy affordances.

## 4) State Management (Zustand) & React Query
- ✅ Run store + compare store + workbench store stub.
- ✅ React Query provider and hooks for receipt/explore.
- 🟨 Missing `useWorlds`/`useChips` hooks and caching policies for those queries.
- ⬜️ Compare store UI integration beyond simple toggles.
- ⬜️ Optimistic favorite receipt handling + rollback on API error.

## 5) Create Page (Plan → Execute → SSE)
- ✅ Omnibox UI inputs + Plan/Execute logic wired to mock endpoints.
- ✅ CandidateGrid 2×2 layout (responsive).
- ✅ SSE hook connects to mock stream and updates candidates.
- 🟨 `Plan` gating logic only uses mock allowed=true (no denied path UX yet).
- 🟨 Candidate status transitions do not include explicit queued/running actions (only via reducer events).
- ⬜️ Workbench drawer and compare tray (optional).
- ⬜️ Hotkeys for create flow (1–4, Enter, V, R, C) not wired.

## 6) Explore Page
- ✅ Filter bar and receipt grid with pagination.
- ✅ Receipt card actions: open, compare, replay, favorite (stubbed).
- 🟨 Virtualization/masonry not implemented (currently static grid).
- ⬜️ Cursor-based filters for date range, verified flag, world/chip selectors.
- ⬜️ Prefetch-on-hover behavior for receipt/focus.

## 7) Compare Page
- ✅ Two-receipt comparison flow and metric deltas table.
- ✅ Output diff mode toggles UI.
- ⬜️ Determinism delta and proof summary widgets.
- ⬜️ Winner rules (highlight winner per metric/determinism grade).

## 8) Focus Page
- ✅ ReceiptViz hero + core proof pills + metrics strip + inspector drawer.
- 🟨 Proof pill row has fewer than required (missing policy/adversity/run/conference CIDs).
- 🟨 Outputs/logs panels are placeholders.
- ⬜️ Action stack: Vary/Remix/Battle/Replayer/Compare/Verify endpoints (UI + mock wiring).
- ⬜️ Inspector tabs content with canonical receipt + copy buttons.

## 9) Mint Page
- ✅ Step wizard skeleton + manifest editor.
- 🟨 No API wiring for conference/sign/publish/alias steps.
- ⬜️ Step-specific views and receipts/cid pills for each action.

## 10) Mock API Coverage
- ✅ `/api/mock/runs/plan`
- ✅ `/api/mock/runs/execute`
- ✅ `/api/mock/runs/:runId/events` (SSE)
- ✅ `/api/mock/receipts/:receiptCid`
- ✅ `/api/mock/explore`
- ⬜️ Mock endpoints for `verify`, `replay`, `actions/vary`, `actions/remix`, `actions/battle_test`.
- ⬜️ Mock endpoints for `worlds`, `chips`, `mint/*`, `aliases/set`.
- ⬜️ Gating denied path (`gate.allowed=false`) and candidate failure script.

## 11) Performance & Virtualization
- ⬜️ Explore grid virtualization via TanStack Virtual (overscan=6).
- ⬜️ Lazy image loading and blurhash placeholder + fade-in.
- ⬜️ Cache-control behaviors for receipt immutable caching.

## 12) Accessibility & UX
- ✅ Toast uses `aria-live=polite`.
- 🟨 No global hotkeys integration beyond placeholder hook.
- ⬜️ Keyboard focus rings and skip-navigation.
- ⬜️ Structured error UI using `ApiError` format (no raw stack traces).

## 13) Testing
- ⬜️ Unit tests for run reducer and candidate transitions.
- ⬜️ Integration tests for create flow with mocks.
- ⬜️ E2E tests for explore virtualization and compare mode switching.

## 14) Documentation & Ops
- ⬜️ README with local dev instructions.
- ⬜️ Environment flags (`NEXT_PUBLIC_USE_MOCKS`) usage documented.
- ⬜️ CSP guidance for artifact domains.
