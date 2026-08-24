const TOKEN_STORAGE_KEY = "bloomKids.auth.accessToken";
const USER_STORAGE_KEY = "bloomKids.auth.user";

const sanitizeUser = (user) => {
  if (!user || typeof user !== "object") {
    return null;
  }

  return {
    id: user.id ?? null,
    name: user.name ?? null,
    email: user.email ?? null,
    role: user.role ?? null,
    email_verified_at: user.email_verified_at ?? null,
  };
};

export const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const getStoredUser = () => {
  const storedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!storedUser) {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
};

export const saveAuthSession = (token, user) => {
  const storedUser = sanitizeUser(user);

  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  if (storedUser) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(storedUser));
  } else {
    localStorage.removeItem(USER_STORAGE_KEY);
  }

  return storedUser;
};

export const clearAuthStorage = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
};
