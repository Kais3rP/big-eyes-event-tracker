import { events } from "data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const blacklisted = ["events", "notificationsStatus"];

export const useStore = create(
  persist(
    (set) => ({
      events: events,
      alerts: events.reduce((acc, curr) => ({ ...acc, [curr.id]: false }), {}),
      markEventCompleted: (id) =>
        set((state) => {
          const idx = state.events.findIndex((el) => el.id === id);
          const updatedEvent = {
            ...state.events.find((el) => el.id === id),
            completed: true,
          };
          const updatedEvents = [...state.events];
          updatedEvents[idx] = updatedEvent;
          return { events: updatedEvents };
        }),
      toggleAlert: (id) =>
        set((state) => ({
          alerts: { ...state.alerts, [id]: !state.alerts[id] },
        })),
      notificationsStatus: Notification.permission,
      updateNotificationsStatus: (status) =>
        set((state) => ({
          notificationsStatus: status,
        })),
    }),
    {
      name: "main",
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !blacklisted.includes(key))
        ),
    }
  )
);

export const useUIStore = create(
  (set) => ({
    isIntroModalVisible: true,
    hideIntroModal: () =>
      set((state) => ({
        isIntroModalVisible: false,
      })),
  }),
  {
    name: "ui",
  }
);
