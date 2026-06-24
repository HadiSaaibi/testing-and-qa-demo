// Optional stretch. Fixed with Vitest fake timers so it no longer races
// a real clock: time only advances when we tell it to, so the timeout
// and the Date.now() check always agree.

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

describe("flaky timing example (fix me)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("waits at least 50ms", async () => {
    const start = Date.now();
    const promise = new Promise((r) => setTimeout(r, 50));
    vi.advanceTimersByTime(50);
    await promise;
    expect(Date.now() - start).toBeGreaterThanOrEqual(50);
  });
});
