"use client";

import { useState, useCallback } from "react";
import { useApp } from "./context";

export function useN8N() {
  const { notify } = useApp();
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async <T,>(fn: () => Promise<T>, errorMsg = "Request failed"): Promise<T | null> => {
      setLoading(true);
      try {
        return await fn();
      } catch (e) {
        notify("error", e instanceof Error ? e.message : errorMsg);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [notify]
  );

  return { loading, run };
}
