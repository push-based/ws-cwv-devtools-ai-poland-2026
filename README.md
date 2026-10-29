# Core Web Vitals in Practice with Chrome DevTools

Hands-on follow-up to the free session
[Web Performance in Practice with Chrome DevTools](https://ai-poland.pl/free-workshops/web-performance-devtools)
by Michael Hladky ([PushBased](https://push-based.io)) at AI Poland.

In the session we looked at how the browser renders a page, what the three Core Web Vitals measure,
and how to read a Performance panel trace. This repository lets you do all of that yourself on a
real application that has real LCP, INP and CLS problems built in — and fix them one by one.

| Metric  | Measures            | Good      | Poor      |
|---------|---------------------|-----------|-----------|
| **LCP** | Loading performance | ≤ 2.5 s   | > 4 s     |
| **INP** | Responsiveness      | ≤ 200 ms  | > 500 ms  |
| **CLS** | Visual stability    | ≤ 0.1     | > 0.25    |

All thresholds are judged at the 75th percentile of real page loads.

## Installation

**System requirements**

* `node >= 20`
* `npm >= 10`
* Google Chrome (current stable)

**Clone and install**

```bash
git clone https://github.com/push-based/ws-cwv-devtools-ai-poland-2026.git

cd ws-cwv-devtools-ai-poland-2026
npm install

# (optional) if the step before didn't work, try:
npm install --force
```

**Run the application**

```bash
# for interactions (INP) and general exploring
npm run start

# for anything loading related (LCP, CLS): minified, production-like bundles
npm run start:prod
```

The app is served at [http://localhost:4200](http://localhost:4200).

## The application

**HubMovies** is a movie browser built with Angular on top of [The Movie Database (TMDB)](https://www.themoviedb.org/) API.
You don't need to know Angular to do most of the exercises — measuring is the same for every framework,
and every fix comes with a solution you can copy.

## Exercises

* [00. Project setup](./exercises/00-setup.md)
* [01. Measure Core Web Vitals](./exercises/01-measure-core-web-vitals.md)

### CLS — Cumulative Layout Shift

* [02. Find and fix layout shifts](./exercises/02-cls-find-and-fix-layout-shifts.md)

> We start with CLS on purpose: reserving space for images is also what makes lazy loading work in the LCP exercises.

### LCP — Largest Contentful Paint

* [03. Identify the LCP element and break it down](./exercises/03-lcp-identify-and-break-down.md)
* [04. Prioritize the LCP image](./exercises/04-lcp-prioritize-the-lcp-image.md)
* [05. Connect to critical origins early](./exercises/05-lcp-preconnect.md)
* [06. Serve right-sized images](./exercises/06-lcp-right-sized-images.md)

### INP — Interaction to Next Paint

* [07. Measure and break down interactions](./exercises/07-inp-measure-interactions.md)
* [08. Long processing time: get non-urgent work out of the way](./exercises/08-inp-processing-time.md)
* [09. Input delay: long rendering tasks and DOM size](./exercises/09-inp-input-delay-dom-size.md)

### Bonus

* [10. LCP with server-side rendering](./exercises/10-bonus-lcp-ssr.md)

## Solutions

Every exercise that changes code has a solution branch. The branches build on each other in exercise
order, so each one contains all fixes up to that point:

| Branch                          | Contains fixes from |
|---------------------------------|---------------------|
| `solution/02-cls-reserve-space` | 02                  |
| `solution/04-lcp-image-priority`| 02 – 04             |
| `solution/05-lcp-preconnect`    | 02 – 05             |
| `solution/06-lcp-image-size`    | 02 – 06             |
| `solution/08-inp-yield`         | 02 – 08             |
| `solution/09-inp-dom-size`      | 02 – 09             |
| `solution/10-lcp-ssr`           | 02 – 10             |

See a single fix with e.g. `git diff solution/06-lcp-image-size solution/08-inp-yield`.

## What we measured

Numbers from our own runs, so you know what to expect. Yours will differ with your machine and
network — compare **your before** with **your after**, never with these.

| Step                     | Result                                                                                   |
|--------------------------|------------------------------------------------------------------------------------------|
| Start                    | CLS 0.28 – 0.87 (poor), LCP 4.3 s on Fast 4G (poor), 20 posters / 3.9 MB loaded upfront |
| 02 reserve space         | CLS → 0.00                                                                               |
| 04 lazy + priority       | 20 → 7 image requests, 3.9 MB → 1.4 MB transferred                                       |
| 06 right-sized images    | 1x desktop screen: LCP poster `w780` → `w500` (~190 → ~100 kB), other posters → `w342` (~50 kB) |
| 08 tracking after paint  | navigation click 136 – 584 ms → 40 – 72 ms (6x CPU throttling)                           |
| 09 DOM size              | 5,521 → 521 DOM nodes, list render frames 314 ms → 116 ms (6x CPU)                       |
| 10 SSR                   | LCP resource load delay ~3.5 s → ~1.3 s (Lighthouse mobile)                              |

## Further reading

* [web.dev: Core Web Vitals](https://web.dev/articles/vitals)
* [web.dev: Optimize LCP](https://web.dev/articles/optimize-lcp)
* [web.dev: Optimize INP](https://web.dev/articles/optimize-inp)
* [web.dev: Optimize CLS](https://web.dev/articles/optimize-cls)
* [Chrome DevTools: Performance panel](https://developer.chrome.com/docs/devtools/performance)
* [CrUX Vis](https://cruxvis.withgoogle.com)

---

Want to go deeper — change detection, scheduling, SSR, bundle size? Check out the full-day
[PushBased Angular performance workshop](https://push-based.io).
