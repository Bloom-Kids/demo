import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeSignedQuery,
  readSignedVerificationLink,
} from "./signedVerificationLink.js";

test("يحافظ على ترتيب وقيمة معاملات الرابط الموقّع", () => {
  const link = readSignedVerificationLink(
    "/auth/verify-email/42/raw-hash",
    "?expires=123&signature=a%2Bb%3D&extra=value"
  );

  assert.deepEqual(link, {
    id: "42",
    hash: "raw-hash",
    signedQuery: "?expires=123&signature=a%2Bb%3D&extra=value",
  });
});

test("يقبل صيغ مسارات التحقق الخاصة بالواجهة وLaravel والـ API", () => {
  const search = "?expires=123&signature=signed-value";

  for (const pathname of [
    "/auth/verify-email/42/raw-hash",
    "/verify-email/42/raw-hash",
    "/email/verify/42/raw-hash",
    "/api/auth/verify-email/42/raw-hash",
  ]) {
    assert.deepEqual(readSignedVerificationLink(pathname, search), {
      id: "42",
      hash: "raw-hash",
      signedQuery: search,
    });
  }
});

test("يصحح amp;signature مرة واحدة دون فك ترميز التوقيع", () => {
  assert.equal(
    normalizeSignedQuery("?expires=123&amp;signature=a%2Bb%3D"),
    "?expires=123&signature=a%2Bb%3D"
  );
});

test("يرفض رابطًا لا يحتوي على التوقيع أو تاريخ الانتهاء", () => {
  assert.equal(
    readSignedVerificationLink(
      "/auth/verify-email/42/raw-hash",
      "?expires=123"
    ),
    null
  );
});
