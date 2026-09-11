# Project Overview & Guidelines

## Language & Communication Preference

- Always communicate and answer in English only to prevent terminal formatting/RTL issues.
- Keep explanations direct, clean, and concise. Avoid unnecessary conversational preambles.

## Tech Stack & Architecture

- Framework: React 19 (Vite)
- Styling: Tailwind CSS & Material-UI (MUI)
- State Management: Context API (React Context)
- Component structure: Functional components only. Keep components modular and reusable under `src/components/`.

## Coding & Style Standards

- Use modern JavaScript / ES6+ clean code syntax.
- Naming conventions: `PascalCase` for React components/files (`.jsx`), `camelCase` for functions/variables, and `kebab-case` for general CSS/styles.
- Performance: Use `useMemo` and `useCallback` appropriately to prevent unnecessary re-renders when filtering or computing heavy state.
- Clean Code: Avoid placing inline functions inside large JSX render blocks if they can be extracted. Clean up console logs before finalizing code.

## Verification & Commands

Before finishing a task, verify changes using these project commands:

- Build check: `npm run build`
- Dev server: `npm run dev`

- Do not include "Co-authored-by: Codex" or any Codex signatures in git commit messages.
