import { apiRequest } from "./apiClient.js";

const pendingVerificationRequests = new Map();

export function createEmailResendPayload(email) {
  return { email };
}

export function createEmailVerificationPath({ id, hash, signedQuery }) {
  return `/api/auth/verify-email/${id}/${hash}${signedQuery}`;
}

export function resendVerificationEmail(email, accessToken = "") {
  return apiRequest("/api/auth/email/resend", {
    method: "POST",
    body: createEmailResendPayload(email),
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });
}

export function verifyEmail({ id, hash, signedQuery }) {
  const requestPath = createEmailVerificationPath({ id, hash, signedQuery });

  if (pendingVerificationRequests.has(requestPath)) {
    return pendingVerificationRequests.get(requestPath);
  }

  const request = apiRequest(requestPath).finally(() => {
    pendingVerificationRequests.delete(requestPath);
  });

  pendingVerificationRequests.set(requestPath, request);
  return request;
}
