# Tycho's Treasury

A design system and library (treasury, if you will) of Vue UI components, designed for my blog and portfolio sites.

---
## Development

Install dependencies:

```powershell
pnpm install
```

Run Storybook in dev mode:

```powershell
pnpm run storybook
```


Bootstrap a new standard component:

```powershell
npx generate-vue-cli component ComponentName
```

Or for "atoms" (small building blocks for larger components):

```powershell
npx generate-vue-cli component ComponentName --type=atom
```

Or "patterns" (groupings of components into reusable page sections):

```powershell
npx generate-vue-cli component ComponentName --type=pattern
```