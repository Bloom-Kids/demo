import { ApiError, apiRequest } from "./apiClient.js";

const LOGIN_ENDPOINT = "/api/auth/login";
const REGISTER_ENDPOINT = "/api/auth/register";

const getPayload = (response) => response?.data ?? response ?? {};

const extractAccessToken = (response) => {
  const payload = getPayload(response);

  return (
    payload.access_token ??
    payload.accessToken ??
    payload.token ??
    payload.authentication?.access_token ??
    response?.access_token ??
    response?.token ??
    null
  );
};

const extractUser = (response) => {
  const payload = getPayload(response);
  return payload.user ?? response?.user ?? null;
};

const requiresEmailVerification = (response, user) => {
  const payload = getPayload(response);
  const explicitFlag =
    payload.requires_email_verification ??
    payload.email_verification_required ??
    response?.requires_email_verification ??
    response?.email_verification_required;

  if (typeof explicitFlag === "boolean") {
    return explicitFlag;
  }

  if (user && Object.hasOwn(user, "email_verified_at")) {
    return user.email_verified_at === null;
  }

  const responseCode = String(response?.code ?? payload?.code ?? "");
  const responseMessage = String(response?.message ?? payload?.message ?? "");

  return /EMAIL.*VERIF|VERIF.*EMAIL/i.test(responseCode) || /verif.*email|email.*verif/i.test(responseMessage);
};

const normalizeAuthResponse = (response) => {
  const user = extractUser(response);

  return {
    token: extractAccessToken(response),
    user,
    requiresEmailVerification: requiresEmailVerification(response, user),
    message: response?.message ?? getPayload(response)?.message ?? "",
  };
};

export async function loginRequest(credentials) {
  const response = await apiRequest(LOGIN_ENDPOINT, {
    method: "POST",
    body: credentials,
    skipAuth: true,
  });
  const result = normalizeAuthResponse(response);

  if (!result.token) {
    throw new ApiError({
      message: "The login response did not include an access token.",
      status: 502,
      code: "INVALID_AUTH_RESPONSE",
    });
  }

  return result;
}

export async function registerRequest(accountData) {
  const response = await apiRequest(REGISTER_ENDPOINT, {
    method: "POST",
    body: accountData,
    skipAuth: true,
  });

  return normalizeAuthResponse(response);
}
