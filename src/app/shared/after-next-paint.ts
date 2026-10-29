/**
 * Resolves after the browser had the chance to paint the next frame.
 * Use it to push non-urgent work (tracking, logging, prefetching) out of an event handler,
 * so the interaction's next paint isn't blocked by it.
 */
export function afterNextPaint(): Promise<void> {
  return new Promise((resolve) =>
    requestAnimationFrame(() => setTimeout(resolve, 0)),
  );
}
