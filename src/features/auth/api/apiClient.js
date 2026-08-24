import { getStoredToken } from "../utils/authStorage.js";

const DEFAULT_TIMEOUT_MS = 15000;

function getApiBaseUrl() {
  const baseUrl = import.meta.env?.VITE_API_BASE_URL?.trim();

  if (!baseUrl) {
    throw new ApiError({
      message: "API base URL is not configured.",
      code: "API_CONFIG_MISSING",
      type: "configuration",
      serverMessage: "VITE_API_BASE_URL is not configured",
    });
  }

  return baseUrl.replace(/\/+$/, "");
}

function getRetryAfterSeconds(value) {
  if (!value) return null;

  const seconds = Number(value);

  if (Number.isFinite(seconds)) {
    return Math.max(0, Math.ceil(seconds));
  }

  const retryAt = Date.parse(value);

  if (Number.isNaN(retryAt)) return null;

  return Math.max(0, Math.ceil((retryAt - Date.now()) / 1000));
}

async function readResponseBody(response) {
  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    const responseText = await response.text();
    return responseText ? { message: responseText } : null;
  } catch {
    return null;
  }
}

export class ApiError extends Error {
  constructor({
    message = "",
    status = 0,
    code = "API_ERROR",
    errors = {},
    data = null,
    type = "http",
    retryAfterSeconds = null,
    serverMessage = "",
  } = {}) {
    super(message || serverMessage || "تعذر إكمال طلب الخادم");
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.errors = errors;
    this.data = data;
    this.type = type;
    this.retryAfterSeconds = retryAfterSeconds;
    this.serverMessage = serverMessage || message;
  }
}

export function hasFieldError(error, fieldName) {
  return Boolean(
    error instanceof ApiError &&
      error.errors &&
      Object.prototype.hasOwnProperty.call(error.errors, fieldName)
  );
}

export function errorContains(error, fragments) {
  if (!(error instanceof ApiError)) return false;

  const searchableText = `${error.serverMessage} ${error.message} ${error.code}`.toLowerCase();
  return fragments.some((fragment) =>
    searchableText.includes(fragment.toLowerCase())
  );
}

export function buildRequestHeaders({ body, headers = {}, skipAuth = false }) {
  const token = skipAuth ? null : getStoredToken();

  return {
    Accept: "application/json",
    ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };
}

export async function apiRequest(
  path,
  {
    method = "GET",
    body,
    headers = {},
    skipAuth = false,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    timeout,
  } = {}
) {
  const requestTimeout = timeout ?? timeoutMs;
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), requestTimeout);
  let response;

  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      method,
      headers: buildRequestHeaders({ body, headers, skipAuth }),
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error?.name === "AbortError") {
      throw new ApiError({
        message: "The request timed out.",
        code: "REQUEST_TIMEOUT",
        type: "timeout",
      });
    }

    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      throw new ApiError({
        message: "The browser is offline.",
        code: "NETWORK_OFFLINE",
        type: "offline",
      });
    }

    throw new ApiError({
      message: "The server could not be reached.",
      code: "NETWORK_ERROR",
      type: "network",
    });
  } finally {
    window.clearTimeout(timeoutId);
  }

  const payload = await readResponseBody(response);

  if (!response.ok) {
    const serverMessage = payload?.message || payload?.data?.message || "";

    throw new ApiError({
      message: serverMessage || response.statusText || "The request failed.",
      status: response.status,
      code: payload?.code || payload?.data?.code || "API_ERROR",
      errors: payload?.errors || payload?.data?.errors || {},
      data: payload?.data ?? null,
      retryAfterSeconds: getRetryAfterSeconds(
        response.headers.get("Retry-After")
      ),
      serverMessage,
    });
  }

  return {
    status: response.status,
    apiStatus: payload?.status ?? null,
    code: payload?.code || payload?.data?.code || "",
    message: payload?.message || payload?.data?.message || "",
    data: payload?.data ?? payload,
  };
}
