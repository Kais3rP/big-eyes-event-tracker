import { events } from "data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      alerts: events.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {}),
      toggleAlert: (id) =>
        set((state) => ({
          alerts: { ...state.alerts, [id]: !state.alerts[id] },
        })),
    }),
    {
      name: "main",
    }
  )
);
