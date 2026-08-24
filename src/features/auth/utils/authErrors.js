const FIELD_FALLBACKS = {
  fullName: "يرجى مراجعة الاسم المدخل",
  email: "يرجى مراجعة البريد الإلكتروني",
  phone: "يرجى مراجعة رقم الجوال",
  password: "يرجى مراجعة كلمة المرور",
  passwordConfirmation: "يرجى مراجعة تأكيد كلمة المرور",
};

const hasArabicText = (message) => /[\u0600-\u06ff]/.test(message);

const translateFieldMessage = (message, fieldName) => {
  const normalizedMessage = String(message ?? "");

  if (hasArabicText(normalizedMessage)) {
    return normalizedMessage;
  }

  if (/required/i.test(normalizedMessage)) {
    return {
      fullName: "يرجى إدخال الاسم بالكامل",
      email: "يرجى إدخال البريد الإلكتروني",
      phone: "يرجى إدخال رقم الجوال",
      password: "يرجى إدخال كلمة المرور",
      passwordConfirmation: "يرجى تأكيد كلمة المرور",
    }[fieldName];
  }

  if (/taken|unique|already (?:exists|used|registered)/i.test(normalizedMessage)) {
    return fieldName === "email"
      ? "البريد الإلكتروني مستخدم مسبقًا"
      : FIELD_FALLBACKS[fieldName];
  }

  if (/valid email|email.*valid|email address/i.test(normalizedMessage)) {
    return "يرجى إدخال بريد إلكتروني صحيح";
  }

  if (/confirm|match/i.test(normalizedMessage)) {
    return "كلمتا المرور غير متطابقتين";
  }

  if (/at least|min(?:imum)?/i.test(normalizedMessage) && fieldName === "password") {
    return "كلمة المرور أقصر من الحد المطلوب";
  }

  if (/phone|mobile|digits|numeric/i.test(normalizedMessage) && fieldName === "phone") {
    return "يرجى إدخال رقم جوال صحيح";
  }

  return FIELD_FALLBACKS[fieldName] ?? "يرجى مراجعة هذا الحقل";
};

export function getFieldErrors(error, apiFieldMap) {
  if (!error?.errors || typeof error.errors !== "object") {
    return {};
  }

  return Object.entries(error.errors).reduce((fieldErrors, [apiField, messages]) => {
    const formField = apiFieldMap[apiField];

    if (!formField) {
      return fieldErrors;
    }

    const firstMessage = Array.isArray(messages) ? messages[0] : messages;
    fieldErrors[formField] = translateFieldMessage(firstMessage, formField);
    return fieldErrors;
  }, {});
}

export function isEmailVerificationError(error) {
  const code = String(error?.code ?? "");
  const message = String(error?.message ?? "");

  return (
    error?.status === 403 &&
    (/EMAIL.*VERIF|VERIF.*EMAIL/i.test(code) || /verif.*email|email.*verif/i.test(message))
  );
}

export function getGeneralAuthError(error, hasFieldErrors = false) {
  if (hasFieldErrors) {
    return "";
  }

  if (error?.code === "REQUEST_TIMEOUT") {
    return "استغرق الاتصال وقتًا أطول من المتوقع. يرجى المحاولة مجددًا";
  }

  if (error?.code === "NETWORK_ERROR") {
    return "تعذّر الاتصال بالخادم. تحقق من الإنترنت ثم حاول مجددًا";
  }

  if (error?.code === "API_CONFIG_MISSING" || error?.code === "INVALID_AUTH_RESPONSE") {
    return "تعذّر إكمال العملية حاليًا. يرجى المحاولة لاحقًا";
  }

  if (error?.status === 401) {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
  }

  if (isEmailVerificationError(error)) {
    return "يرجى توثيق بريدك الإلكتروني أولًا";
  }

  if (error?.status === 403) {
    return "لا تملك صلاحية إكمال هذه العملية";
  }

  if (error?.status === 409) {
    return "يوجد حساب مسجل بهذه البيانات مسبقًا";
  }

  if (error?.status === 422) {
    return "يرجى مراجعة البيانات المدخلة";
  }

  if (error?.status === 429) {
    return "محاولات كثيرة خلال وقت قصير. انتظر قليلًا ثم حاول مجددًا";
  }

  if (error?.status >= 500) {
    return "حدث خطأ في الخادم. يرجى المحاولة لاحقًا";
  }

  return "تعذّر إكمال العملية. يرجى المحاولة مجددًا";
}
