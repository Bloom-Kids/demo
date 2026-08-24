import test from "node:test";
import assert from "node:assert/strict";
import {
  createEmailResendPayload,
  createEmailVerificationPath,
} from "./emailVerificationService.js";
import {
  createForgotPasswordPayload,
  createResetPasswordPayload,
} from "./passwordService.js";

test("ينشئ طلب نسيت كلمة المرور بحقل البريد فقط", () => {
  assert.deepEqual(createForgotPasswordPayload("user@example.com"), {
    email: "user@example.com",
  });
});

test("ينشئ طلب إعادة التعيين بأسماء حقول Laravel", () => {
  assert.deepEqual(
    createResetPasswordPayload({
      token: "raw-token",
      email: "user@example.com",
      password: "new-password",
      passwordConfirmation: "new-password",
    }),
    {
      token: "raw-token",
      email: "user@example.com",
      password: "new-password",
      password_confirmation: "new-password",
    }
  );
});

test("ينشئ طلب إعادة إرسال التحقق بحقل البريد فقط", () => {
  assert.deepEqual(createEmailResendPayload("user@example.com"), {
    email: "user@example.com",
  });
});

test("يمرر مسار التحقق والاستعلام الموقّع كما وصلا", () => {
  assert.equal(
    createEmailVerificationPath({
      id: "42",
      hash: "raw-hash",
      signedQuery: "?expires=123&signature=a%2Bb%3D",
    }),
    "/api/auth/verify-email/42/raw-hash?expires=123&signature=a%2Bb%3D"
  );
});
