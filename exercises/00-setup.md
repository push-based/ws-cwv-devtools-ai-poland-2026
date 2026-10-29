# 00. Project Setup

## 1. Install & run

```bash
npm install
npm run start
```

Open [http://localhost:4200](http://localhost:4200). You should see a grid of popular movies.

> [!NOTE]
> The app talks to the public [TMDB](https://www.themoviedb.org/) API. A read-only access token is
> already configured, you don't need an account.

## 2. Two ways to serve the app

| Command              | Bundles                     | Use it for                            |
|----------------------|-----------------------------|---------------------------------------|
| `npm run start`      | development (unminified)    | INP, exploring, reading code in traces |
| `npm run start:prod` | production (minified)       | everything **loading** related: LCP, CLS, bytes |

> [!IMPORTANT]
> Never judge loading performance on a development build. In our measurements the dev `main.js` is
> **1.9 MB**, the production one **~400 kB** (103 kB gzipped). On a throttled network that's the
> difference between an LCP of 30 seconds and one of 3.

## 3. Prepare Chrome for measuring

Extensions, cached files and other tabs all influence your measurements.

* Use a **separate Chrome profile** or an **Incognito window** (extensions are off there by default).
* Close other heavy tabs.
* Open DevTools with `F12` or `Ctrl + Shift + I` (Mac: `⌘ + ⌥ + I`).
* In the **Network** panel, tick **Disable cache** — it is active while DevTools is open.

## 4. The code you will touch

You don't need to know Angular for the measuring parts. When an exercise asks you to change code,
these are the files:

| File                                                 | What it is                          |
|------------------------------------------------------|-------------------------------------|
| `src/index.html`                                     | the HTML document                   |
| `src/app/app.config.ts`                              | app-wide providers                  |
| `src/app/movie/movie-card/movie-card.component.ts`   | one movie tile in the grid          |
| `src/app/app-shell/app-shell.component.ts`           | header + sidebar navigation         |

Ready? Continue with [01. Measure Core Web Vitals](./01-measure-core-web-vitals.md).
