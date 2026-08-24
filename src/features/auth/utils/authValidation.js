const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9]{7,15}$/;

export const MIN_PASSWORD_LENGTH = 8;

export function validateLoginForm(values) {
  const errors = {};
  const email = values.email.trim();

  if (!email) {
    errors.email = "يرجى إدخال البريد الإلكتروني";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "يرجى إدخال بريد إلكتروني صحيح";
  }

  if (!values.password) {
    errors.password = "يرجى إدخال كلمة المرور";
  }

  return errors;
}

export function validateRegisterForm(values) {
  const errors = validateLoginForm(values);
  const phone = values.phone.replace(/[\s()-]/g, "");

  if (!values.fullName.trim()) {
    errors.fullName = "يرجى إدخال الاسم بالكامل";
  }

  if (!values.phone.trim()) {
    errors.phone = "يرجى إدخال رقم الجوال";
  } else if (!PHONE_PATTERN.test(phone)) {
    errors.phone = "يرجى إدخال رقم جوال صحيح";
  }

  if (values.password && values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `يجب ألا تقل كلمة المرور عن ${MIN_PASSWORD_LENGTH} أحرف`;
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = "يرجى تأكيد كلمة المرور";
  } else if (values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = "كلمتا المرور غير متطابقتين";
  }

  return errors;
}
