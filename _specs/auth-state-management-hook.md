# Auth State Management Hook

## Overview

A global authentication state solution that makes the currently signed-in Firebase user available to any page or component via a `useUser` hook. The hook returns the Firebase `User` object when signed in, or `null` when signed out, and stays in sync with Firebase Auth in real time.

## Goals

- Provide a single source of truth for the current user's auth state across the entire app.
- Expose auth state through a `useUser` hook that any component or page can call.
- Automatically reflect sign-in and sign-out events without requiring a page reload.

## Out of Scope

- Sign-up, login, and logout UI flows or actions.
- Redirecting unauthenticated users to the login page.
- Role-based access control or permission checks.
- Persisting user profile data in Firestore.

## User Stories

- As a developer, I want to call `useUser()` in any component and get the current Firebase user (or `null`), so I can conditionally render UI based on auth state.
- As a user, I want the app to instantly reflect my sign-in or sign-out state across all open components without a page reload.

## Behaviour

- A context provider wraps the application and subscribes to Firebase Auth's `onAuthStateChanged` listener when it mounts.
- While the initial auth state is being resolved (before Firebase responds), the user value is `undefined` to distinguish "loading" from "logged out".
- Once resolved, the value is either the Firebase `User` object (logged in) or `null` (logged out).
- The listener is cleaned up when the provider unmounts.
- The `useUser` hook reads from this context. It throws a clear error if called outside the provider.
- Any component that calls `useUser()` re-renders automatically when auth state changes.

## Acceptance Criteria

- [ ] A context provider exists and is mounted at the app root so all pages have access.
- [ ] `useUser()` returns `undefined` before Firebase has resolved the initial auth state.
- [ ] `useUser()` returns `null` when no user is signed in.
- [ ] `useUser()` returns the Firebase `User` object when a user is signed in.
- [ ] Auth state updates in real time — no page reload required.
- [ ] Calling `useUser()` outside the provider throws a descriptive error.
- [ ] The Firebase listener is unsubscribed when the provider unmounts (no memory leaks).
- [ ] Existing components that reference user state are updated to use `useUser()`.

## Design Notes

No design reference — this is a logic-only feature with no UI of its own.
