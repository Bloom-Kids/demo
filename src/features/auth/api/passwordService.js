import { apiRequest } from "./apiClient.js";

export function createForgotPasswordPayload(email) {
  return { email };
}

export function createResetPasswordPayload({
  token,
  email,
  password,
  passwordConfirmation,
}) {
  return {
    token,
    email,
    password,
    password_confirmation: passwordConfirmation,
  };
}

export function requestPasswordReset(email) {
  return apiRequest("/api/auth/forgot-password", {
    method: "POST",
    body: createForgotPasswordPayload(email),
  });
}

export function resetPassword({
  token,
  email,
  password,
  passwordConfirmation,
}) {
  return apiRequest("/api/auth/reset-password", {
    method: "POST",
    body: createResetPasswordPayload({
      token,
      email,
      password,
      passwordConfirmation,
    }),
  });
}
