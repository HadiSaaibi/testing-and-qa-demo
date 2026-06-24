// Express app for the front desk. Exports the app (no listen) so tests
// can hit it in-memory with Supertest; src/server.js opens the port.

import express from "express";
import { feesSubtotal, feesTotal, round2 } from "./fees.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  // provided
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // POST /checkout { items, code? } -> 200 { subtotal, waiver, total } | 400
  app.post("/checkout", (req, res) => {
    const { items, code } = req.body;

    if (!Array.isArray(items)) {
      return res.status(400).json({ error: "items must be an array" });
    }
    const itemsValid = items.every(
      (item) =>
        typeof item.daysLate === "number" && typeof item.dailyRate === "number"
    );
    if (!itemsValid) {
      return res
        .status(400)
        .json({ error: "each item needs numeric daysLate and dailyRate" });
    }

    const subtotal = feesSubtotal(items);
    const total = feesTotal(items, code);
    res.json({ subtotal, waiver: round2(subtotal - total), total });
  });

  return app;
}
