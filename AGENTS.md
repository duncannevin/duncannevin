# Repository Guidelines

## Project Structure & Module Organization
- `src/`: Angular 19 app source. Components in `src/app/components/*.component.ts`, services in `src/app/services/*.service.ts`, app config/routes in `src/app/app.*`.
- `public/`: Static assets copied to the build (favicons, images).
- `dist/`: Build output. CDK deploy expects `dist/duncannevin.landing/browser`.
- `infrastructure/`: AWS CDK app (`bin/infra.ts`, `lib/deploy-stack.ts`).
- `certs/`: Local dev TLS cert/key used by `make start`.
- `cdk.out/`: CDK synthesis artifacts (generated).

## Build, Test, and Development Commands
- `npm start`: Runs `make start` → `ng serve` with SSL on `https://localhost.duncannevin.com:4200`.
- `npm run build`: Production build with optimization and hashing.
- `npm run watch`: Development build with watch + source maps.
- `npm test`: Run Karma/Jasmine unit tests.
- `npm run cdk:synth`: Synthesize CloudFormation to `GratitudeStack.template.yaml`.
- `npm run cdk:diff` / `npm run cdk:deploy`: Review/deploy CDK stack. Requires `CERT_ARN` in `.env`.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; UTF‑8; trim trailing whitespace (see `.editorconfig`).
- TypeScript: single quotes preferred; filenames kebab‑case (`hero.component.ts`, `demo-derby-client.service.ts`).
- Angular: standalone components; keep UI in `components/`, logic in `services/`.
- Styles: Tailwind via PostCSS; favor utility classes in templates over deep CSS.

## Testing Guidelines
- Frameworks: Jasmine + Karma.
- File naming: place tests next to code as `*.spec.ts` (e.g., `app.component.spec.ts`).
- Run: `npm test` for watch UI; use Chrome launcher by default. No strict coverage threshold enforced—add tests for components, services, and critical routes.

## Commit & Pull Request Guidelines
- Commits: Imperative, concise subject (≤72 chars). Example: `feat(hero): add responsive image` or `fix(service): handle websocket reconnect`.
- Reference issues when relevant (`Closes #123`). Group related changes; avoid mixed concerns.
- PRs: Include clear description, screenshots/GIFs for UI, reproduction steps, and deployment notes (e.g., CDK changes). Link issues and request review.

## Security & Configuration Tips
- Secrets: Do not commit `.env` or private certs. Required: `CERT_ARN=...` for CDK deploys.
- Local SSL: `make start` expects `certs/localhost.duncannevin.com.pem` and `-key.pem`. Add `/etc/hosts` entry: `127.0.0.1 localhost.duncannevin.com`.

