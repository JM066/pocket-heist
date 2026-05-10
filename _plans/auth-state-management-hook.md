# Plan: Auth State Management Hook

## Context

The app has Firebase Auth wired up at the SDK level (`lib/firebase.ts` exports `auth`), but there is no global state tracking who is currently signed in. Components have no way to know the current user. This plan introduces a React context + `useUser` hook that listens to Firebase's `onAuthStateChanged` in real time and makes the current user available to any component in the tree.

---

## Approach

A `UserProvider` context wraps the app at the root layout level. It subscribes to `onAuthStateChanged` on mount and stores the result in state. The `useUser` hook reads from that context. Any component that calls `useUser()` gets the live user value and re-renders automatically on auth state changes.

Three possible values:
- `undefined` — Firebase hasn't resolved yet (initial load)
- `null` — no user signed in
- `User` — Firebase User object (signed in)

---

## Files

### Create
| File | Purpose |
|---|---|
| `lib/UserProvider.tsx` | Context + provider component with `onAuthStateChanged` listener |
| `lib/useUser.ts` | `useUser` hook that reads from the context |
| `tests/lib/useUser.test.tsx` | Tests for the hook and provider |

### Modify
| File | Change |
|---|---|
| `app/layout.tsx` | Wrap children in `<UserProvider>` |

---

## Implementation Order

1. Write `tests/lib/useUser.test.tsx` (TDD — red first)
2. Create `lib/UserProvider.tsx` and `lib/useUser.ts`
3. Run tests — confirm green
4. Update `app/layout.tsx` to wrap children in `<UserProvider>`
5. Run full suite — confirm nothing regressed

---

## Tests (`tests/lib/useUser.test.tsx`)

| Test | How |
|---|---|
| Returns `undefined` before Firebase resolves | Mock `onAuthStateChanged` to never call back; assert `useUser()` returns `undefined` |
| Returns `null` when signed out | Mock fires callback with `null`; assert hook returns `null` |
| Returns user object when signed in | Mock fires callback with a fake user; assert hook returns that object |
| Updates when auth state changes | Fire callback twice (null → user); assert hook reflects both values |
| Throws if called outside provider | Render hook without `UserProvider`; assert error thrown |
| Unsubscribes on unmount | Assert the unsubscribe function returned by `onAuthStateChanged` is called on unmount |

Firebase Auth (`lib/firebase.ts`) will be mocked in tests using `vi.mock`.

---

## Key Files

| File | Role |
|---|---|
| `app/layout.tsx` | Root layout — mount `UserProvider` here |
| `lib/firebase.ts` | Exports `auth` — imported by `UserProvider` |
| `lib/UserProvider.tsx` | To create — context + `onAuthStateChanged` listener |
| `lib/useUser.ts` | To create — hook that reads the context |

---

## Verification

- `npx vitest run tests/lib/useUser.test.tsx` — all tests pass
- `npm test` — full suite still green
- `npm run dev` — open browser console; sign in on `/login` and confirm auth state resolves (no errors)
