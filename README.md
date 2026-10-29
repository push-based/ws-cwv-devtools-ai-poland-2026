# Push-Based Angular Performance Workshop

## Installation Instructions

**System Requirements**

* `node > 20`
* `npm > 8`

**Clone and install**

```bash
git clone https://github.com/push-based/{{repoName}}.git

cd {{repoName}}
npm install

# (optional) if the step before didn't work, please try the following
npm install --force
```

**Run the application**

```bash
npm run start
```

## Workshop Information

* [ws info doc]({{WsDocLink}})
* [slides]({{SlidesFolderLink}})

## Exercises

* [0. Project Setup](./exercises/project%20setup.md)
* [0.1 Additional Project Setups](./exercises/additional-projects.md)

### 1-Day

* [Tooling: Performance Analysis & Flame Charts](./exercises/performance-tab-flame-charts.md)
* [Change Detection: Dirty Check](./exercises/change-detection%20-%20Dirty%20Check.md)
* [Change Detection: zone.js optimizations](./exercises/change-detection%20-%20zone-optimizations.md)
* [Change Detection: OnPush](./exercises/change-detection%20-%20OnPush.md)
* [Change Detection: Manual Change Detection](./exercises/change-detection%20-%20manual%20cd.md)
* [Change Detection: signals](./exercises/change-detection%20-%20signals.md)
* [Change Detection: zoneless](./exercises/change-detection%20-%20zoneless.md)
* [Tooling: JS Event Loop](./exercises/event-loop.md)
* [INP: Scheduling - chunk work](./exercises/scheduling-chunk-work.md)
* [Network: Preconnect](./exercises/network-resource-hints-preconnect.md)
* [Network: Preload & Prefetch](./exercises/network-resource-hints-preload-prefetch.md)
* [Network: Lazy Loading Resources](./exercises/network-lazy-loading.md)
* [Network: Prefetch LCP Data](./exercises/network-prefetch-lcp-data.md)
* [Network: Cancel In-Flight Requests](./exercises/network-cancel-requests.md)
* [Network: Image Optimizations](./exercises/ng-optimized-images.md)
* [Defer](./exercises/defer.md)
* [SSR: Setup & Gotchas](exercises/ssr%20-%20setup%20%26%20gotchas.md)
* [SSR: Caching & Server Timing](exercises/ssr-simple-caching-and-server-timing.md)
* [SSR: Server Routes Configuration](exercises/ssr-server-routes-config.md)


### n-Days

### Day 1

* [Tooling: Performance Analysis & Flame Charts](./exercises/performance-tab-flame-charts.md)
* [Tooling: JS Event Loop](./exercises/event-loop.md)
* [INP: Scheduling - chunk work](./exercises/scheduling-chunk-work.md)
* [INP: Scheduling - Prioritize Work](./exercises/scheduling-prioritize-work.md)
* [Network: Preconnect](./exercises/network-resource-hints-preconnect.md)
* [Network: Preload & Prefetch](./exercises/network-resource-hints-preload-prefetch.md)
* [Network: Lazy Loading Resources](./exercises/network-lazy-loading.md)
* [Network: Prefetch LCP Data](./exercises/network-prefetch-lcp-data.md)
* [Network: Cancel In-Flight Requests](./exercises/network-cancel-requests.md)
* [Network: Image Optimizations](./exercises/ng-optimized-images.md)

### Day 2

* [CSS: Forced Reflow ResizeObserver](./exercises/css%20-%20resizeobserver.md)
* [CSS: Forced Reflow IntersectionObserver](./exercises/css%20-%20intersection-observer.md)
* [CSS: Compositor Animations](./exercises/css%20-%20compositor-only-animations.md)
* [CSS: contain](./exercises/css%20-%20containment.md)
* [CSS: content-visibility](./exercises/css%20-%20content-visibility.md)
* [CSS: layout trashing](./exercises/css%20-%20layout-trashing.md)
* [Change Detection: Dirty Check](./exercises/change-detection%20-%20Dirty%20Check.md)
* [Change Detection: zone.js optimizations](./exercises/change-detection%20-%20zone-optimizations.md)
* [Change Detection: OnPush](./exercises/change-detection%20-%20OnPush.md)
* [Change Detection: Manual Change Detection](./exercises/change-detection%20-%20manual%20cd.md)
* [Change Detection: signals](./exercises/change-detection%20-%20signals.md)
* [Change Detection: zoneless](./exercises/change-detection%20-%20zoneless.md)
* [Defer](./exercises/defer.md)
* [SSR: Setup & Gotchas](exercises/ssr%20-%20setup%20%26%20gotchas.md)
* [SSR: Caching & Server Timing](exercises/ssr-simple-caching-and-server-timing.md)
* [SSR: Server Routes Configuration](exercises/ssr-server-routes-config.md)
* [Tooling: Recorder](./exercises/user_flow%20-%20recorder.md)
* [Tooling: Lighthouse](./exercises/user_flow%20-%20lighthouse.md)

#### Day 3
