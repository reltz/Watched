# Watched

A personal library for the movies & series you watch — organize them into
collections, search OMDB to add new titles, and access everything from any device.

This is the **2026 rewrite** of the original Angular 11 app: a fresh, modern,
responsive Angular 19 application that talks to the **same backends**.

> The original Angular 11 version lives on the `master` branch. This modern
> rewrite lives on the `Watched2026` branch.

## Stack

- **Angular 19** — standalone components, signals, new control flow (`@if`/`@for`)
- **Angular Material 3** — dark "cinema" theme via the M3 theming API
- **@angular/fire 19** — Google sign-in (Firebase Auth)
- **Signals** for client state (replaces the old Akita store)
- **OMDB API** for title search & details
- **Firebase Cloud Function** REST API for persisting collections

## Architecture

```
src/app/
  core/      Services: auth, OMDB, collections REST adapter, signal store, export/import, route guard
  models/    Shared TypeScript interfaces (ported from the original app)
  shared/    Nav bar, confirm dialog
  dialogs/   Create / import collection, add-to-collection
  pages/     login, collections (list), collection-detail, search
```

State lives in `WatchedStore` (Angular signals). `CollectionsService` is the
REST adapter to the Firebase Cloud Function and keeps the store in sync.

## Run

```bash
npm install
npm start        # ng serve — http://localhost:4200
npm run build    # production build
```

## Backends / config

All endpoints and keys live in `src/environments/environment.ts`:

- `omdb` — OMDB API base URL, key, and number of result pages per search
- `collectionsApiUrl` — Firebase Cloud Function that stores collections
- `firebaseConfig` — Firebase project used for Google authentication

## Features

- Google sign-in (app is gated behind auth)
- Browse collections as a responsive poster grid
- Create collections, import/export collections as JSON
- Search across all collections for a title
- Search OMDB and add results to a collection
- Per-title actions: copy to / move to another collection, remove
- Rename and delete collections
