# Spec for Authentication Forms

branch: claude/feature/auth-forms

## Summary

Add functional login and signup forms to the `/login` and `/signup` pages. Both forms share the same fields (email, password) and visual structure, differing only in their submit button label and heading. A toggle link lets users switch between the two forms. On submission, form data is logged to the console.

## Functional Requirements

- Both `/login` and `/signup` pages render a form with:
  - An email input field (type `email`)
  - A password input field (type `password`) with a show/hide toggle icon
  - A submit button labelled "Log In" on the login page and "Sign Up" on the signup page
- The password field defaults to hidden (`type="password"`); clicking the toggle icon switches it to visible (`type="text"`) and back
- On form submission, `event.preventDefault()` is called and the email + password values are logged to the console
- Each page includes a link to switch to the other form:
  - Login page: "Don't have an account? Sign up"
  - Signup page: "Already have an account? Log in"
- The forms should be centred on the page, consistent with the existing `.center-content` layout

## Possible Edge Cases

- Submitting with empty fields — no special validation required for now; console.log should still fire
- Password toggle should not trigger form submission
- The toggle icon should be visually inside or adjacent to the password input

## Acceptance Criteria

- Visiting `/login` shows a login form with email, password, toggle icon, "Log In" button, and a link to `/signup`
- Visiting `/signup` shows a signup form with email, password, toggle icon, "Sign Up" button, and a link to `/login`
- Clicking the toggle icon on the password field reveals/hides the password
- Submitting either form logs `{ email, password }` to the browser console
- The switch link navigates correctly between the two pages

## Open Questions

- Should the `AuthForm` be a shared component used by both pages, or kept as separate implementations?
- Should the toggle icon use a Lucide icon (e.g. `Eye` / `EyeOff`)?

## Testing Guidelines

Create test files in `tests/components/` covering:

- `AuthForm` (if extracted as a shared component) renders email input, password input, and submit button
- Password visibility toggles correctly when the icon is clicked
- Form submission calls `console.log` with the correct email and password values
- The switch link renders with the correct `href`
