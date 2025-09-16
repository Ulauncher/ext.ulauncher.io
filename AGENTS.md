# Repository Guidelines

## Project Structure & Module Organization
Source lives in `src/`, split into feature folders such as `extBrowse/`, `extAdd/`, `extCommon/`, and shared utilities in `utils/`. Routing and globals sit in `src/app/`. Static assets and the HTML shell are under `public/`. Build artifacts land in `build/`; deployment helpers are in `build-utils/` and `nginx-config/`. Jest mocks reside in `__mocks__/`.

## Build, Test, and Development Commands
- `npm run start`: run the CRA dev server on http://localhost:3000 with hot reload.
- `npm run build`: create an optimized production bundle in `build/`.
- `npm run test`: execute Jest tests in watch mode using jsdom.
- `npm run check-formatting`: list files diverging from Prettier rules.
- `npm run run prettier`: auto-format `src/**/*.js` before committing.
- `npm run local-api-proxy`: start the local CORS proxy expected by Auth0/API flows.

## Coding Style & Naming Conventions
Use the pinned Node 22.x and Yarn 1.x versions from `package.json`. JavaScript is formatted with Prettier (2-space indent, single quotes, trailing semicolons omitted). Components follow PascalCase filenames (e.g., `AddExtension.js`), Redux actions/selectors use camelCase, and tests mirror source names with `.spec.js` suffixes. Keep React class components and Redux logic colocated with their feature folder.

## Testing Guidelines
Tests use Jest with Enzyme; store them alongside features, suffixed `.spec.js` (e.g., `extCommon/ScreenshotDropzone.spec.js`). Prefer shallow rendering for UI units and mock network calls via entries in `__mocks__/`. Run `npm test` locally before PRs when adding complex logic, and ensure new behavior has assertions.

## Commit & Pull Request Guidelines
Write commits in the present tense and keep subjects brief (`Increase ITEMS_PER_PAGE to 54`). Reference related issues in the body when applicable. For pull requests, include a clear summary of the change, reproduction steps for reviewers. Confirm linting and tests were run.
