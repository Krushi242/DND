export interface AdminSession {
  id?: number;
  username: string;
  email?: string | null;
  role?: string;
  token?: string;
}

const ADMIN_SESSION_KEY = 'drd_admin_session';

export const getAdminSession = (): AdminSession | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const stored = window.localStorage.getItem(ADMIN_SESSION_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored) as AdminSession;
  } catch {
    return null;
  }
};

export const isAdminAuthenticated = () => Boolean(getAdminSession());

export const saveAdminSession = (session: AdminSession) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
};

export const clearAdminSession = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(ADMIN_SESSION_KEY);
};
