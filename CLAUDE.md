# Let's Finance — project notes for Claude Code

Expo (React Native) app built from the Figma file "Adding AI" (page "Redo of Screens",
file key jOyFFWL8e1e1Tbj9wYJZPB). A budgeting and money-education app for teens and young adults.
The owner (Kelly) is a designer and new to the terminal: explain steps plainly and run commands for her.

## Stack
- Expo SDK 54, expo-router 6 (file-based routes in `app/`), TypeScript, react-native-svg.
- No UI library: styles use the design tokens in `src/theme.ts` (colors, radii, Figma text styles).
- `designTop(y, insets.top)` converts a y position from the 430×932 Figma frames (59 pt status bar)
  into a real-device offset. Keep spacing matched to the Figma values.
- Font: Aileron. Not bundled yet. `src/fonts.ts` explains how to add the .otf files; until then the
  system font is used at the same sizes and weights.

## Structure
- `app/index.tsx`: welcome. `app/onboarding/{age,bank,account}.tsx`: Questions 1–3
  (`account.tsx?edit=1` doubles as Edit Profile).
- `app/(tabs)/`: home, learn, budget, spendings, plus hidden tab routes advice, transactions,
  quiz/[id] (these show the nav bar). The custom nav bar is in `src/components/NavBar.tsx`.
- `app/article/[id].tsx`, `app/account.tsx`, `app/settings.tsx`, `app/notifications.tsx`.
- Data: `src/data/personas.ts` (Sofia and Ethan), `src/data/content.ts` (budget, spendings,
  advice, article cards), plus `articles.json`, `glossary.json` and `quizzes.json`, which were
  generated from the Figma text.
- `ACTIVE_PERSONA` in `src/state.tsx` is set to `'ethan'`: the app always shows Ethan's dashboard.
- Icons are Figma vector paths in `src/components/Icon.tsx`; images are in `assets/images`
  (exported from Figma).

## Deliberate fixes vs. the Figma file (see README)
Budget "Wants" is 20% (not 30%); quiz answer keys were corrected; six glossary definitions that had
been pasted from other terms were rewritten; article titles/authors were matched to their cards;
typos were fixed.

## Current status / open issue
- Kelly is trying to open the app in Expo Go on her iPhone. `npm install` succeeded.
- Over Wi-Fi (school network), Expo Go showed "taking longer than it should", so use the tunnel.
  `Start Lets Finance.command` (double-click) installs `@expo/ngrok` locally and runs
  `npx expo start --tunnel --clear`. A global ngrok install failed with a permissions error (code 243).
- Unconfirmed: which SDK her App Store copy of Expo Go supports. If Expo Go reports that the
  project is incompatible, upgrade to that SDK with `npx expo install expo@^<SDK>.0.0 --fix`, then
  check the app still runs (expo-router and react-navigation APIs may change between SDKs).
- On GitHub (public): https://github.com/keborrayohernan-hub/lets-finance, uploaded 2026-11-17 as
  one commit through the GitHub API using a standalone gh CLI at
  `~/tools/gh_2.104.0_macOS_arm64/bin/gh` (signed in). This local folder is NOT a git repo yet:
  git wasn't installed (Apple's Command Line Tools install was still pending). To sync later,
  install git, then clone the repo or connect this folder to it.
- Deployed to Vercel (project kelly-7eaf/lets-finance) from the GitHub repo. `vercel.json` builds
  the web version with `npx expo export --platform web` into `dist/` and rewrites every path to
  `/index.html` (web output is "single", a single-page app). Vercel Authentication (deployment
  protection) is on, so only signed-in Vercel team members can view it unless it's turned off.

## Ideas discussed for adding AI (not built yet)
A budget explainer and chat on Budget; Advice cards driven by real spending; "Needs Attention" with
a reason; goal plans; "Ask about this" in Learn; tone set by the onboarding age. Include an
AI-generated label and an "educational guidance, not financial advice" note, with no product or
investment recommendations.
