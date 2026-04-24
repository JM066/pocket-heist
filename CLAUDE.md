# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm start        # Start production server (after build)
npm run lint     # ESLint (flat config, v9)
npm test         # Run all tests with Vitest (watch mode)
```

To run a single test file:

```bash
npx vitest run tests/components/Navbar.test.tsx
```

## Architecture

**Pocket Heist** is a Next.js 16 App Router project (React 19, TypeScript, Tailwind CSS v4).

### Route Groups

Two route groups define the two layout contexts:

- `app/(public)/` — unauthenticated pages (home, login, signup, preview); no Navbar
- `app/(dashboard)/` — protected heist pages; wraps content in the Navbar layout

### Styling

Tailwind CSS v4 via PostCSS. Custom theme tokens are defined in `app/globals.css` using `@theme`:

- Primary: `#C27AFF`, Secondary: `#FB64B6`
- Dark backgrounds: `#030712`, `#0A101D`, `#101828`
- Success: `#05DF72`, Error: `#FF6467`

Components use CSS Modules alongside Tailwind. Module files must include a `@reference` pointing to `globals.css` (path is relative — adjust depth to match the file's location) to access theme tokens inside `.module.css` files.

- Do NOT apply Tailwind classes directly in JSX unless it's a single class. When an element needs multiple classes, combine them into a named CSS Module class using `@apply`.
- Global utility classes (`.page-content`, `.center-content`, `.form-title`) are defined in `globals.css` and available without importing.

### Components

Components live in `components/<Name>/` with a barrel `index.ts` for clean imports. New components should follow this pattern.

### Testing

Vitest + React Testing Library with jsdom. Tests live in `tests/` mirroring the source structure. Global test APIs (`describe`, `it`, `expect`) are available without imports. `vitest.setup.ts` imports `@testing-library/jest-dom` matchers, so DOM assertions like `toBeInTheDocument()` are available globally.

### Path Alias

`@/*` resolves to the project root (configured in both `tsconfig.json` and `vitest.config.mts`).

## Additional Coding Preference

- Do NOT apply Tailwind classes directly in JSX unless it's a single class. When an element needs multiple classes, combine them into a named CSS Module class using `@apply`.
- Global utility classes (`.btn`, `.page-content`, `.center-content`, `.form-title`) are defined in `globals.css` and available without importing.
