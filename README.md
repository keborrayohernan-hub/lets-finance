# Let's Finance (Expo)

An Expo (React Native) build of every screen on the **Redo of Screens** page of the "Adding AI" Figma file. It uses the design's colors, type styles, spacing, icons and images.

## Run it

```bash
cd lets-finance
npm install
npx expo install --fix    # lines up package versions with your Expo SDK
npx expo start            # scan the QR code with Expo Go, or press i / a for a simulator
```

The project targets Expo SDK 54. If Expo Go reports that the project uses an unsupported SDK, run `npx expo install expo@latest --fix` and start again.

## Font

The design uses **Aileron**. It's free (SIL Open Font License) but isn't included here. To switch it on, add the four `.otf` files to `assets/fonts/` and uncomment the lines in `src/fonts.ts`. Until then, the app uses the system font at the same sizes and weights.

## How the app flows

Welcome → How old are you? → Connect your bank → Create account → Home.

The app shows **Ethan's dashboard** (the bottom row in Figma), with Upcoming Payments and Credit Score. Sofia's version is still in the code: to switch to it, set `ACTIVE_PERSONA` to `'sofia'` in `src/state.tsx`.

| Figma frame | File |
|---|---|
| Lets Finance App | `app/index.tsx` |
| Question 1 / 2 / 3 (and 4–6) | `app/onboarding/age.tsx`, `bank.tsx`, `account.tsx` |
| Sofia's / Ethan's Dashboard | `app/(tabs)/home.tsx` |
| Sofia's / Ethan's transactions | `app/(tabs)/transactions.tsx` (Home → See All) |
| Article (Lets learn), A-C … R-W | `app/(tabs)/learn.tsx` (Articles / Financial Terms switch) |
| 7 article pages | `app/article/[id].tsx` |
| quiz 1 – 7 | `app/(tabs)/quiz/[id].tsx` (opens from the end of each article) |
| Budget | `app/(tabs)/budget.tsx` |
| Advice | `app/(tabs)/advice.tsx` (tap the overspending bubble on Budget) |
| Spendings | `app/(tabs)/spendings.tsx` (tap a category to open it) |
| Account, Settings, Notifications | `app/account.tsx`, `app/settings.tsx`, `app/notifications.tsx` |

- Design tokens (colors, radii, text styles) are in `src/theme.ts`.
- Screen content is in `src/data/`.
- Icons are the Figma vectors, in `src/components/Icon.tsx`.

## Changes from the Figma file

These were fixed in the app. The Figma file itself is unchanged.

- **Budget split:** the label said "Wants – 30%". The numbers work out to 50 / 30 / 20, so it now says 20%. Each line's percentage is now labeled "% of needs/savings/wants", because that's what the figure measures.
- **Quiz answer keys:** quiz 1 Q3 should be False. Quiz 2 Q2 marked the wrong account type as correct. Quiz 7 Q5 marked "stop working immediately" as correct. Duplicate options were removed in quiz 2 Q3 and quiz 4 Q4.
- **Quiz questions:** quiz 3 Q5 and quiz 4 Q4 had questions pasted in from other quizzes, so their text was rewritten to match their answer choices.
- **Glossary:** APR, ATM, BNPL, Deductible, Interest and Scam had definitions copied from other terms. Each now has its own definition.
- **Articles:** two article pages had the wrong title or author. They now match their cards.
- **Typos:** "You're Almost There", "recommend", "Necessities", "than usual" and a few others.
- **Sofia's transactions:** the dashboard and the Transactions screen show different amounts. Both now use the dashboard amounts.
- **Added behavior:** the design had no selected or answered states, so these use the design's own colors. Selected answers turn brand teal. Quiz answers turn green (`#669C63`) when right and salmon (`#F59F99`) when wrong.
