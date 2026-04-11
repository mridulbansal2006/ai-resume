"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { Candidate, Notification } from "./types";
import { getCandidates, testConnection, DEMO_MODE } from "./api";

interface AppContextValue {
  candidates: Candidate[];
  setCandidates: React.Dispatch<React.SetStateAction<Candidate[]>>;
  refreshCandidates: () => Promise<void>;
  loadingCandidates: boolean;
  notifications: Notification[];
  notify: (type: Notification["type"], message: string) => void;
  dismissNotification: (id: string) => void;
  n8nConnected: boolean | null;
  checkConnection: () => Promise<void>;
  demoMode: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loadingCandidates, setLoadingCandidates] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [n8nConnected, setN8nConnected] = useState<boolean | null>(null);

  const notify = useCallback((type: Notification["type"], message: string) => {
    const id = `n${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setNotifications((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4500);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const refreshCandidates = useCallback(async () => {
    setLoadingCandidates(true);
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (e) {
      notify("error", e instanceof Error ? e.message : "Failed to load candidates");
    } finally {
      setLoadingCandidates(false);
    }
  }, [notify]);

  const checkConnection = useCallback(async () => {
    const ok = await testConnection();
    setN8nConnected(ok);
  }, []);

  useEffect(() => {
    refreshCandidates();
    checkConnection();
  }, [refreshCandidates, checkConnection]);

  return (
    <AppContext.Provider
      value={{
        candidates,
        setCandidates,
        refreshCandidates,
        loadingCandidates,
        notifications,
        notify,
        dismissNotification,
        n8nConnected,
        checkConnection,
        demoMode: DEMO_MODE,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
