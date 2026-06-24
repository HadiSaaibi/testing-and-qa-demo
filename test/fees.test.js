// Unit tests for src/fees.js. The applyWaiver/feesTotal specs are red
// until you implement applyWaiver (TDD: red -> green -> refactor).

import { describe, it, expect } from "vitest";
import { feesSubtotal, applyWaiver, feesTotal } from "../src/fees.js";

const late3 = { title: "Dune", daysLate: 3, dailyRate: 0.25 }; // $0.75
const late10 = { title: "Neuromancer", daysLate: 10, dailyRate: 1.0 }; // $10

describe("feesSubtotal (provided)", () => {
  it("is 0 for no returns", () => {
    expect(feesSubtotal([])).toBe(0);
  });

  it("charges daysLate * dailyRate", () => {
    expect(feesSubtotal([late3])).toBe(0.75);
  });

  it("sums across books", () => {
    expect(feesSubtotal([late3, late10])).toBe(10.75);
  });

  it("never charges for on-time/early returns", () => {
    expect(feesSubtotal([{ daysLate: -2, dailyRate: 0.25 }])).toBe(0);
  });

  it("throws when items is not an array", () => {
    expect(() => feesSubtotal("nope")).toThrow(TypeError);
  });
});

describe("applyWaiver (TODO)", () => {
  it("STUDENT takes 10% off", () => {
    expect(applyWaiver(10, "STUDENT")).toBe(9);
  });

  it("SENIOR takes 20% off", () => {
    expect(applyWaiver(10, "SENIOR")).toBe(8);
  });

  it("FIRSTBOOK takes $5 off", () => {
    expect(applyWaiver(10, "FIRSTBOOK")).toBe(5);
  });

  it("ignores unknown/empty/missing codes", () => {
    expect(applyWaiver(10, "NOPE")).toBe(10);
    expect(applyWaiver(10, "")).toBe(10);
    expect(applyWaiver(10, undefined)).toBe(10);
  });

  it("never goes negative", () => {
    expect(applyWaiver(2, "FIRSTBOOK")).toBe(0);
  });
});

describe("feesTotal (provided)", () => {
  it("is the subtotal with no waiver", () => {
    expect(feesTotal([late10], "")).toBe(10);
  });

  it("applies the waiver", () => {
    expect(feesTotal([late3, late10], "SENIOR")).toBe(8.6);
  });
});
