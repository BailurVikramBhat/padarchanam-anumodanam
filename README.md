# पादार्चनं अनुमोदनम् (Visit Scheduling App)

## Current State

This Angular application, styled with Bulma CSS, is a self-contained demo of the visit scheduling system. All data and authentication flows are currently mocked; future integration with a real backend is planned.

---

### 1. Demo Login

- **Credentials:** `client1` / `simple123`
- Displays an info banner on the login form:
  ```
  🚧 Demo mode: Use `client1` / `simple123` to log in. All data is dummy until backend is connected.
  ```
- Simulates backend latency (configurable via `fakeLatency`), shows loading spinner on the login button, and displays an error notification on invalid credentials.

### 2. Mode Selection

- After successful login, the user is routed to **Select Mode**.
- Allows choosing between **Mock DB** and **Actual DB** (currently no real DB operations).

### 3. Navbar & Routing

- **Navbar** includes links to:
  - **Today** (`/dashboard/today`)
  - **Analytics** (`/dashboard/full`)
  - **Settings** (`/dashboard/settings`)
  - **Logout** (opens a confirmation modal)
- Protected routes using `AuthGuard` and `AlreadyAuthGuard`.
- Default redirect from `/dashboard` → `/dashboard/today`.

### 4. Dashboard (Today & Analytics)

- **Today:** Placeholder for daily visit summary dashboard.
- **Analytics:** Placeholder for full dashboard charts.

### 5. Settings (future update)

- Single-page view listing:
  1. **Update Data Preferences**
     - Inline edit activated by a pencil icon.
     - Toggle between Mock vs Actual DB.
     - Shows a top-right Bulma notification explaining the action.
  2. **Account Settings**
     - Inline edit activated by a pencil icon.
     - Change username and/or password.
     - Client-side validation for matching passwords and a notification on save/cancel.

### 6. Alerts & Notifications

- Reusable Bulma notifications for:
  - Fixed top-right alerts on settings actions.
  - Error alerts on login failure.
  - Info banner on the login screen.

---

## Getting Started

### Prerequisites

- Node.js & npm
- Angular CLI
- Bulma CSS & FontAwesome

### Install & Run

```bash
git clone https://github.com/BailurVikramBhat/padarchanam-anumodanam.git
cd <your-project-folder>
npm install
ng serve
```

### Demo Usage

- Navigate to `http://localhost:4200`
- Login with **test/test**
- Explore the navbar, mode selection, and settings page interactions.

---

## Next Steps

- Hook up real backend endpoints for authentication and data persistence.
- Implement the actual **Today** dashboard and **Analytics** charts as per the backend response.
- Add SMS/email confirmation for password change.
- Finalize the visit booking workflow with Spring Boot backend.
