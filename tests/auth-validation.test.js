import assert from "node:assert/strict";
import test from "node:test";
import { buildRequestHeaders } from "../src/features/auth/api/apiClient.js";
import { getFieldErrors, getGeneralAuthError } from "../src/features/auth/utils/authErrors.js";
import {
  clearAuthStorage,
  getStoredUser,
  saveAuthSession,
} from "../src/features/auth/utils/authStorage.js";
import {
  MIN_PASSWORD_LENGTH,
  validateLoginForm,
  validateRegisterForm,
} from "../src/features/auth/utils/authValidation.js";

const storage = new Map();

globalThis.localStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => storage.set(key, String(value)),
  removeItem: (key) => storage.delete(key),
};

test("يرفض نموذج الدخول البريد غير الصحيح والحقول الفارغة", () => {
  assert.deepEqual(validateLoginForm({ email: "بريد-غير-صحيح", password: "" }), {
    email: "يرجى إدخال بريد إلكتروني صحيح",
    password: "يرجى إدخال كلمة المرور",
  });
});

test("يتحقق نموذج التسجيل من الهاتف وطول كلمة المرور وتطابقها", () => {
  const errors = validateRegisterForm({
    fullName: "مستخدم تجريبي",
    email: "user@example.com",
    phone: "12",
    password: "1".repeat(MIN_PASSWORD_LENGTH - 1),
    passwordConfirmation: "كلمة مختلفة",
  });

  assert.equal(errors.phone, "يرجى إدخال رقم جوال صحيح");
  assert.equal(errors.password, `يجب ألا تقل كلمة المرور عن ${MIN_PASSWORD_LENGTH} أحرف`);
  assert.equal(errors.passwordConfirmation, "كلمتا المرور غير متطابقتين");
});

test("يحوّل أخطاء Laravel إلى أسماء حقول النموذج ورسائل عربية", () => {
  const errors = getFieldErrors(
    {
      errors: {
        email: ["The email has already been taken."],
        password_confirmation: ["The password confirmation does not match."],
      },
    },
    { email: "email", password_confirmation: "passwordConfirmation" }
  );

  assert.deepEqual(errors, {
    email: "البريد الإلكتروني مستخدم مسبقًا",
    passwordConfirmation: "كلمتا المرور غير متطابقتين",
  });
});

test("يعرض رسائل واضحة لأخطاء الدخول والاتصال والمهلة", () => {
  assert.equal(
    getGeneralAuthError({ status: 401 }),
    "البريد الإلكتروني أو كلمة المرور غير صحيحة"
  );
  assert.match(getGeneralAuthError({ code: "NETWORK_ERROR" }), /تعذّر الاتصال/);
  assert.match(getGeneralAuthError({ code: "REQUEST_TIMEOUT" }), /وقتًا أطول/);
});

test("يرسل JSON ويرفق Bearer token تلقائيًا للطلبات المحمية", () => {
  clearAuthStorage();
  saveAuthSession("access-token", { id: 7, name: "مستخدم", password: "لا تُخزن" });

  const headers = buildRequestHeaders({ body: { example: true } });

  assert.equal(headers["Content-Type"], "application/json");
  assert.equal(headers.Authorization, "Bearer access-token");
  assert.equal(Object.hasOwn(getStoredUser(), "password"), false);
});

test("لا يرفق token مع طلبات الدخول والتسجيل", () => {
  const headers = buildRequestHeaders({ body: {}, skipAuth: true });
  assert.equal(Object.hasOwn(headers, "Authorization"), false);
});
