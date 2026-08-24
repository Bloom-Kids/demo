import { ApiError, errorContains, hasFieldError } from "./apiClient";

export function getRetryMessage(seconds) {
  if (Number.isFinite(seconds) && seconds > 0) {
    return `عدد المحاولات كبير. يمكنك إعادة المحاولة بعد ${seconds} ثانية.`;
  }

  return "عدد المحاولات كبير. يرجى الانتظار قليلًا ثم إعادة المحاولة.";
}

export function getCommonApiMessage(error) {
  if (!(error instanceof ApiError)) {
    return "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.";
  }

  if (error.type === "configuration") {
    return "إعداد الاتصال بالخادم غير مكتمل. يرجى التواصل مع الدعم.";
  }

  if (error.type === "offline") {
    return "لا يوجد اتصال بالإنترنت. تحقق من الشبكة ثم أعد المحاولة.";
  }

  if (error.type === "timeout") {
    return "استغرق الاتصال وقتًا أطول من المتوقع. يرجى إعادة المحاولة.";
  }

  if (error.type === "network") {
    return "تعذر الاتصال بالخادم. تحقق من الشبكة ثم أعد المحاولة.";
  }

  if (error.status === 429) {
    return getRetryMessage(error.retryAfterSeconds);
  }

  if (error.status >= 500) {
    return "تعذر إكمال العملية بسبب مشكلة في الخادم. يرجى المحاولة لاحقًا.";
  }

  return "تعذر إكمال العملية. يرجى التحقق من البيانات وإعادة المحاولة.";
}

export function getForgotPasswordError(error) {
  if (error instanceof ApiError && error.status === 422) {
    return {
      email: hasFieldError(error, "email")
        ? "يرجى التحقق من البريد الإلكتروني وإعادة المحاولة"
        : "",
      message: hasFieldError(error, "email")
        ? ""
        : "تعذر إرسال رابط إعادة التعيين. يرجى التحقق من البيانات.",
    };
  }

  return { email: "", message: getCommonApiMessage(error) };
}

export function getResendErrorMessage(error) {
  if (
    errorContains(error, [
      "already verified",
      "already been verified",
      "موثق مسبق",
      "مفعّل مسبق",
      "مفعل مسبق",
    ])
  ) {
    return "هذا البريد موثّق مسبقًا، ويمكنك الانتقال إلى تسجيل الدخول.";
  }

  if (error instanceof ApiError) {
    if (error.status === 401) {
      return "تحتاج هذه العملية إلى جلسة صالحة. يرجى تسجيل الدخول ثم المحاولة.";
    }

    if (error.status === 403) {
      return "لا يمكن إعادة إرسال رابط التحقق لهذا الحساب.";
    }

    if (error.status === 404) {
      return "تعذر العثور على الحساب المرتبط بهذا البريد الإلكتروني.";
    }

    if (error.status === 422 || hasFieldError(error, "email")) {
      return "البريد الإلكتروني غير صحيح أو لا يمكن استخدامه لإعادة الإرسال.";
    }
  }

  return getCommonApiMessage(error);
}

export function getResetPasswordError(error) {
  const fieldErrors = { password: "", passwordConfirmation: "" };

  if (
    errorContains(error, [
      "expired",
      "expire",
      "منتهي",
      "انتهت صلاحية",
    ])
  ) {
    return {
      fieldErrors,
      message: "انتهت صلاحية رابط إعادة التعيين. اطلب رابطًا جديدًا.",
    };
  }

  if (error instanceof ApiError && error.status === 422) {
    if (hasFieldError(error, "password")) {
      fieldErrors.password = "كلمة المرور لا تستوفي متطلبات الأمان المطلوبة";
    }

    if (hasFieldError(error, "password_confirmation")) {
      fieldErrors.passwordConfirmation = "تأكيد كلمة المرور غير مطابق";
    }

    const linkIsInvalid =
      hasFieldError(error, "token") ||
      hasFieldError(error, "email") ||
      errorContains(error, ["token", "email", "البريد", "الرمز"]);

    return {
      fieldErrors,
      message: linkIsInvalid
        ? "رابط إعادة التعيين غير صالح، أو أن البريد لا يطابق الرابط."
        : fieldErrors.password || fieldErrors.passwordConfirmation
          ? "يرجى تصحيح الحقول الموضحة ثم إعادة المحاولة."
          : "تعذر التحقق من بيانات إعادة التعيين.",
    };
  }

  if (error instanceof ApiError && [403, 404].includes(error.status)) {
    return {
      fieldErrors,
      message: "رابط إعادة التعيين غير صالح أو لم يعد متاحًا.",
    };
  }

  return { fieldErrors, message: getCommonApiMessage(error) };
}

export function getEmailVerificationError(error) {
  if (
    errorContains(error, [
      "already verified",
      "already been verified",
      "موثق مسبق",
      "مفعّل مسبق",
      "مفعل مسبق",
    ])
  ) {
    return {
      state: "already-verified",
      message: "هذا البريد موثّق مسبقًا، ويمكنك تسجيل الدخول مباشرة.",
    };
  }

  if (
    errorContains(error, [
      "expired",
      "expire",
      "منتهي",
      "انتهت صلاحية",
    ])
  ) {
    return {
      state: "expired",
      message: "انتهت صلاحية رابط التحقق. اطلب رابطًا جديدًا ثم أعد المحاولة.",
    };
  }

  if (
    errorContains(error, ["signature", "invalid signature", "التوقيع"])
  ) {
    return {
      state: "invalid-signature",
      message: "توقيع رابط التحقق غير صالح. استخدم أحدث رابط وصلك.",
    };
  }

  if (error instanceof ApiError) {
    if (error.type === "offline" || error.type === "network") {
      return {
        state: "connection-error",
        message: getCommonApiMessage(error),
      };
    }

    if (error.type === "timeout" || error.status >= 500) {
      return { state: "server-error", message: getCommonApiMessage(error) };
    }

    if (error.status === 403) {
      return {
        state: "invalid-signature",
        message: "توقيع رابط التحقق غير صالح أو انتهت صلاحيته.",
      };
    }

    if ([401, 404, 422].includes(error.status)) {
      return {
        state: "invalid-link",
        message: "رابط التحقق غير صحيح أو لم يعد متاحًا.",
      };
    }
  }

  return { state: "server-error", message: getCommonApiMessage(error) };
}
