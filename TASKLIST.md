# Chip Registry Creative OS - Task List (Spec v1.1.0)

Legend: ✅ Done, 🟨 Partial, ⬜️ Not Started

## 1) Project Scaffolding & Tooling
- ✅ Next.js 15 App Router structure with main routes (`/create`, `/explore`, `/compare`, `/mint`, `/focus`, `/status`, `/updates`).
- ✅ Global layout, providers, and base theme tokens wired to Tailwind.
- ✅ Core folders created: app, components, lib, stores, hooks.
- ✅ Mock API routes for runs plan/execute/events, receipts, explore.
- 🟨 Linting/formatting
  - ✅ Base configs present (TypeScript, Tailwind, PostCSS).
  - ⬜️ Add explicit ESLint config file.
  - ⬜️ Add explicit Prettier config file.
  - ⬜️ Add lint/format scripts and document usage.
- ⬜️ `pnpm` lockfile and scripts verified in CI.
- ⬜️ Dev tooling
  - ⬜️ Add Husky/lint-staged hooks for formatting.
  - ⬜️ Add VSCode workspace settings for formatting + Tailwind.

## 2) Design System & UI Foundations
- ✅ Dark cryptographic theme CSS variables + Tailwind mapping.
- ✅ UI primitives shipped
  - ✅ `CidPill`
  - ✅ `StatusBadge`
  - ✅ `MetricsStrip`
  - ✅ `ProgressLines`
  - ✅ `ReceiptViz`
  - ✅ `Tooltip`
  - ✅ `Toast`
  - ✅ `Modal`
  - ✅ `SplitButton`
- 🟨 `CidPill` enhancements
  - ✅ Copy button + tooltip.
  - ⬜️ Context menu options (copy full/short).
- 🟨 `ReceiptViz` enhancements
  - ✅ Placeholder component exists.
  - ⬜️ Blurhash rendering.
  - ⬜️ Fade-in animation on image load.
- ⬜️ Focus-visible styling and keyboard-first patterns beyond basics.
- ⬜️ A11y attributes for dialogs (e.g., `aria-modal`) and expanded toasts/alerts.
- ⬜️ Consistent motion tokens (transition durations, easing curves).

## 3) Core Domain Types & Utilities
- ✅ Core types (`CidStr`, `RunEvent`, `ReceiptExpanded`, etc.).
- ✅ Utility formatters and CID abbreviation helpers.
- ✅ Run reducer with event handling + idempotent event CID tracking.
- 🟨 `prettyCanon` hardening
  - ✅ Basic decoding in place.
  - ⬜️ Guard against invalid base64 (no throw).
  - ⬜️ Avoid console logging in formatter.
- ⬜️ Canon/JSON inspectors
  - ⬜️ Canon bytes viewer component.
  - ⬜️ JSON inspector with collapse/expand.
  - ⬜️ Copy affordances for raw canon + formatted JSON.

## 4) State Management (Zustand) & React Query
- ✅ Stores
  - ✅ Run store.
  - ✅ Compare store.
  - ✅ Workbench store stub.
- ✅ React Query provider and hooks for receipt/explore.
- 🟨 Missing query hooks
  - ⬜️ `useWorlds` hook.
  - ⬜️ `useChips` hook.
  - ⬜️ Caching policies (stale time, retries, error boundaries).
- ⬜️ Compare store UI integration beyond simple toggles.
- ⬜️ Optimistic favorite receipt handling + rollback on API error.
- ⬜️ Centralized error handling (ApiError adapter + toast integration).

## 5) Create Page (Plan → Execute → SSE)
- ✅ Omnibox UI inputs + Plan/Execute logic wired to mock endpoints.
- ✅ CandidateGrid 2×2 layout (responsive).
- ✅ SSE hook connects to mock stream and updates candidates.
- 🟨 Plan flow
  - ✅ Mock `gate.allowed=true` path wired.
  - ⬜️ Denied path UX (gate not allowed).
  - ⬜️ Explanation copy + retry path for gate failure.
- 🟨 Candidate transitions
  - ✅ Reducer event handling in place.
  - ⬜️ Explicit queued/running states in UI.
  - ⬜️ Per-candidate action buttons disabled/locked during run.
- ⬜️ Workbench drawer and compare tray (optional).
- ⬜️ Hotkeys for create flow (1–4, Enter, V, R, C) wired.
- ⬜️ Candidate action overflow menu (replay, open receipt, compare).

## 6) Explore Page
- ✅ Filter bar and receipt grid with pagination.
- ✅ Receipt card actions: open, compare, replay, favorite (stubbed).
- 🟨 Grid performance
  - ⬜️ Virtualization/masonry layout.
  - ⬜️ Skeleton loading state.
- ⬜️ Cursor-based filters
  - ⬜️ Date range filter.
  - ⬜️ Verified flag filter.
  - ⬜️ World selector.
  - ⬜️ Chip selector.
- ⬜️ Prefetch-on-hover behavior for receipt/focus.
- ⬜️ Empty state for no results + clear filters CTA.

## 7) Compare Page
- ✅ Two-receipt comparison flow and metric deltas table.
- ✅ Output diff mode toggles UI.
- ⬜️ Determinism delta and proof summary widgets.
- ⬜️ Winner rules (highlight winner per metric/determinism grade).
- ⬜️ Shareable compare permalink + copy link.
- ⬜️ Export comparison summary (CSV/JSON).

## 8) Focus Page
- ✅ ReceiptViz hero + core proof pills + metrics strip + inspector drawer.
- 🟨 Proof pills
  - ✅ Core proof pills exist.
  - ⬜️ Policy/adversity/run/conference CIDs.
- 🟨 Outputs/logs panels
  - ✅ Placeholder sections exist.
  - ⬜️ Real output log formatting.
  - ⬜️ Log filtering + copy.
- ⬜️ Action stack: Vary/Remix/Battle/Replayer/Compare/Verify endpoints (UI + mock wiring).
- ⬜️ Inspector tabs content with canonical receipt + copy buttons.
- ⬜️ Related receipts sidebar (same world/chip).

## 9) Mint Page
- ✅ Step wizard skeleton + manifest editor.
- 🟨 API wiring
  - ⬜️ Conference step.
  - ⬜️ Sign step.
  - ⬜️ Publish step.
  - ⬜️ Alias step.
- ⬜️ Step-specific views
  - ⬜️ Receipt cards per step.
  - ⬜️ CID pill per step.
  - ⬜️ Status badges per step.
- ⬜️ Draft persistence and resume flow.

## 10) Mock API Coverage
- ✅ `/api/mock/runs/plan`
- ✅ `/api/mock/runs/execute`
- ✅ `/api/mock/runs/:runId/events` (SSE)
- ✅ `/api/mock/receipts/:receiptCid`
- ✅ `/api/mock/explore`
- ⬜️ Action endpoints
  - ⬜️ `verify`
  - ⬜️ `replay`
  - ⬜️ `actions/vary`
  - ⬜️ `actions/remix`
  - ⬜️ `actions/battle_test`
- ⬜️ Query endpoints
  - ⬜️ `worlds`
  - ⬜️ `chips`
  - ⬜️ `mint/*`
  - ⬜️ `aliases/set`
- ⬜️ Gating denied path (`gate.allowed=false`) and candidate failure script.

## 11) Performance & Virtualization
- ⬜️ Explore grid virtualization via TanStack Virtual (overscan=6).
- ⬜️ Lazy image loading and blurhash placeholder + fade-in.
- ⬜️ Cache-control behaviors for receipt immutable caching.
- ⬜️ Prefetch receipt data on hover (React Query). 

## 12) Accessibility & UX
- ✅ Toast uses `aria-live=polite`.
- 🟨 Hotkeys
  - ✅ Placeholder hook exists.
  - ⬜️ Global hotkey registry.
  - ⬜️ Per-page shortcut map.
- ⬜️ Keyboard focus rings and skip-navigation.
- ⬜️ Structured error UI using `ApiError` format (no raw stack traces).
- ⬜️ Screen-reader labels for icon-only actions.
- ⬜️ Form validation patterns (inline error states + summary).

## 13) Testing
- ⬜️ Unit tests for run reducer and candidate transitions.
- ⬜️ Integration tests for create flow with mocks.
- ⬜️ E2E tests for explore virtualization and compare mode switching.
- ⬜️ Accessibility smoke tests (axe/playwright).

## 14) Documentation & Ops
- ⬜️ README with local dev instructions.
- ⬜️ Environment flags (`NEXT_PUBLIC_USE_MOCKS`) usage documented.
- ⬜️ CSP guidance for artifact domains.
- ⬜️ API mocking guide (what endpoints exist + payloads).
