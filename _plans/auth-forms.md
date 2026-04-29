# Plan: Authentication Forms

## Context

The `/login` and `/signup` pages are currently placeholder stubs with only a heading. This plan implements functional forms on both pages: email field, password field with show/hide toggle, a submit button, and a switch link between the two pages. On submit, `{ email, password }` is logged to the console. Both pages share a single `AuthForm` component parameterised by `mode`.

---

## Approach

A shared `AuthForm` component with a `mode: 'login' | 'signup'` prop drives all variation between the two pages (heading, button label, switch-link text and destination). Both pages become thin layout wrappers that render `<AuthForm mode="..." />`. This avoids duplicating form logic and makes it trivial to switch between the two.

The component uses controlled inputs + `useState` for `email`, `password`, and `showPassword`. It must be a Client Component (`'use client'`). `Eye` / `EyeOff` from `lucide-react` (already installed) handle the toggle icon.

---

## Files

### Create
| File | Purpose |
|---|---|
| `tests/components/AuthForm.test.tsx` | Tests — written first (TDD) |
| `components/AuthForm/AuthForm.tsx` | Shared form component |
| `components/AuthForm/AuthForm.module.css` | Component styles |
| `components/AuthForm/index.ts` | Barrel export |

### Modify
| File | Change |
|---|---|
| `app/(public)/login/page.tsx` | Replace heading stub with `<AuthForm mode="login" />`; fix function name (`SignupPage` → `LoginPage`) |
| `app/(public)/signup/page.tsx` | Replace heading stub with `<AuthForm mode="signup" />` |

---

## Component Design

**Props:**
```ts
interface AuthFormProps {
  mode: 'login' | 'signup'
}
```

**State:** `email`, `password`, `showPassword` (all local `useState`)

**Mode-derived config** (object lookup before JSX):
- `login` → heading "Log in to Your Account", button "Log In", link "Don't have an account? Sign up" → `/signup`
- `signup` → heading "Sign Up for an Account", button "Sign Up", link "Already have an account? Log in" → `/login`

**Submit handler:** `event.preventDefault()` then `console.log({ email, password })`

**Password toggle button:** must have `type="button"` to prevent accidental form submission; `aria-label` of "Show password" / "Hide password" for accessibility and testability.

**JSX structure:** `formCard` > `h1` (heading) > `form` > `field` (email) + `field` > `passwordWrapper` (password input + toggle button) + `submitButton` > `switchLink` (Next.js `Link`)

**CSS Module classes** (`AuthForm.module.css`):
- `.formCard` — card container, `bg-lighter`, rounded, padded, `max-w-sm mx-auto`
- `.field` — label + input column stack
- `.passwordWrapper` — `relative` container; button absolutely positioned `right-3`
- `.submitButton` — full-width, `bg-primary text-dark`
- `.switchLink` — centred small text; `a` styled `text-primary`

All via `@apply`; `@reference "../../app/globals.css"` at the top.

---

## Tests (`tests/components/AuthForm.test.tsx`)

| Test | How |
|---|---|
| Login heading renders | `getByRole('heading', { name: /log in/i })` |
| Email + password inputs render | `getByLabelText(/email/i)`, `getByLabelText(/password/i)` |
| "Log In" submit button renders | `getByRole('button', { name: /log in/i })` |
| Switch link to `/signup` renders | `getByRole('link', { name: /sign up/i })` with correct `href` |
| Signup mode renders "Sign Up" button and link to `/login` | Same pattern with `mode="signup"` |
| Password hidden by default | Input `type` is `"password"` |
| Toggle reveals password | `userEvent.click` toggle button → input `type` becomes `"text"` |
| Toggle hides password again | Click twice → `type` back to `"password"` |
| Submit logs `{ email, password }` | `vi.spyOn(console, 'log')`, type with `userEvent`, submit, assert spy called with correct object, `mockRestore()` |

---

## Implementation Order

1. Write `tests/components/AuthForm.test.tsx` (all tests above)
2. Run tests — confirm red (`module not found`)
3. Create `components/AuthForm/index.ts`, `AuthForm.module.css`, `AuthForm.tsx`
4. Run tests — confirm all green
5. Update `app/(public)/login/page.tsx`
6. Update `app/(public)/signup/page.tsx`
7. Run full suite (`npm test`) — confirm nothing regressed

---

## Verification

- `npx vitest run tests/components/AuthForm.test.tsx` — all tests pass
- `npm test` — Navbar and Avatar tests still pass
- `npm run dev` — visit `/login` and `/signup` to verify forms render, toggle works, submit logs to console, and switch links navigate correctly
