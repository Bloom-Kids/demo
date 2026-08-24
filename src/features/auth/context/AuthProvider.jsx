import { useState } from "react";
import { loginRequest, registerRequest } from "../api/authService";
import {
  clearAuthStorage,
  getStoredToken,
  getStoredUser,
  saveAuthSession,
} from "../utils/authStorage";
import AuthContext from "./AuthContext";

function AuthProvider({ children }) {
  const [token, setToken] = useState(() => getStoredToken());
  const [user, setUser] = useState(() => getStoredUser());

  const persistSession = (authResult) => {
    if (!authResult.token) {
      return;
    }

    const storedUser = saveAuthSession(authResult.token, authResult.user);
    setToken(authResult.token);
    setUser(storedUser);
  };

  const login = async (credentials) => {
    const result = await loginRequest(credentials);
    persistSession(result);
    return result;
  };

  const register = async (accountData) => {
    const result = await registerRequest(accountData);
    persistSession(result);
    return result;
  };

  const logout = () => {
    clearAuthStorage();
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
