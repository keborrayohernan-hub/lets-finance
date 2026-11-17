import React, { createContext, useContext, useMemo, useState } from 'react';
import { personas, Persona } from './data/personas';

export type AgeGroup = 'Under 16' | '16–18' | '19–24' | '25+';

export const notificationKeys = ['Payday Reminder', 'Goal Milestones', 'Overspend Alerts', 'Weekly Tips', 'New Articles'] as const;
export type NotificationKey = (typeof notificationKeys)[number];

type AppState = {
  persona: Persona;
  age: AgeGroup | null;
  setAge: (a: AgeGroup) => void;
  goals: string[];
  toggleGoal: (g: string) => void;
  fullName: string;
  setFullName: (s: string) => void;
  email: string;
  setEmail: (s: string) => void;
  weeklyTips: boolean;
  setWeeklyTips: (b: boolean) => void;
  notifications: Record<NotificationKey, boolean>;
  toggleNotification: (k: NotificationKey) => void;
};

const Ctx = createContext<AppState | null>(null);

/**
 * Which demo user the app shows (dashboard, transactions, account).
 * Set to 'sofia' to use the teen dashboard from the top row of the Figma file instead.
 */
export const ACTIVE_PERSONA: Persona['id'] = 'ethan';

/** App-wide state: onboarding answers, profile fields and notification toggles. */
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [age, setAge] = useState<AgeGroup | null>(null);
  const [goals, setGoals] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [weeklyTips, setWeeklyTips] = useState(true);
  const [notifications, setNotifications] = useState<Record<NotificationKey, boolean>>(
    Object.fromEntries(notificationKeys.map((k) => [k, true])) as Record<NotificationKey, boolean>,
  );

  const value = useMemo<AppState>(() => {
    const persona = personas[ACTIVE_PERSONA];
    return {
      persona,
      age,
      setAge,
      goals,
      toggleGoal: (g) => setGoals((cur) => (cur.includes(g) ? cur.filter((x) => x !== g) : [...cur, g])),
      fullName,
      setFullName,
      email,
      setEmail,
      weeklyTips,
      setWeeklyTips,
      notifications,
      toggleNotification: (k) => setNotifications((cur) => ({ ...cur, [k]: !cur[k] })),
    };
  }, [age, goals, fullName, email, weeklyTips, notifications]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAppState must be used inside AppStateProvider');
  return v;
}
