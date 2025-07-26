# Next.js Boilerplate

A scalable and feature-rich **Next.js boilerplate** designed for production-ready applications. It includes full developer tooling support, reusable components and hooks, and follows best practices for maintainability and performance.

---

## Features

- **Next.js** with **TypeScript**
- **ESLint** & **Prettier** – Code linting and formatting
- **Husky** + **Commitlint** – Git hooks with conventional commit support
- **Yup** – Schema validation
- **Reusable Components** – Input, Select, etc.
- **Custom Hooks** – `useCRUD`, `useDarkMode`, `useQuery`
- **Base API layer** – Centralized API calls
- **Middleware Support** – Easily extendable for auth, logging, etc.
- **Dockerfile** – Containerized app setup

---

## Development Setup

### 1. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Run development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

### 3. Format code

```bash
pnpm format
# or
npm run format
# or
yarn format
```

### 4. Lint code

```bash
pnpm lint
# or
npm run lint
# or
yarn lint
```

---

## Git Hooks & Linting

- **Husky** runs pre-commit and pre-push checks.
- **Commitlint** ensures commit messages follow [Conventional Commits](https://www.conventionalcommits.org/).

To install hooks:

```bash
pnpm prepare
# or
npm run prepare
# or
yarn prepare
```

---

## Docker

Build and run with Docker:

```bash
docker build -t next-boiler-plate .
docker run -p 3000:3000 next-boiler-plate
```

---

## Custom Hooks & Utilities

- `useCRUD`: Handles Create, Read, Update, Delete logic.
- `useDarkMode`: Toggles dark/light theme.
- `useQuery`: Simplified async fetching.
- `baseAPI`: Axios-based wrapper for API calls.

---

## Code Quality Tools

- `eslint.config.mjs`: Linting configuration
- `.prettierrc`: Formatting rules
- `commitlint.config.js`: Commit message rules
- `.husky/`: Git hook scripts

---

## Author

Crafted by sabababluani – feel free to contribute or fork the project!
