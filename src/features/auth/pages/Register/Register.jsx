import { useState } from "react";
import { useNavigate } from "react-router-dom";
import registerLearningImage from "../../../../assets/images/auth-register-learning.png";
import { PATHS } from "../../../../routes/paths";
import AuthInput from "../../components/AuthInput";
import AuthShowcase from "../../components/AuthShowcase/AuthShowcase";
import useAuth from "../../hooks/useAuth";
import {
  getFieldErrors,
  getGeneralAuthError,
  isEmailVerificationError,
} from "../../utils/authErrors";
import { validateRegisterForm } from "../../utils/authValidation";
import {
  ChevronDownIcon,
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
  PhoneIcon,
  UserIcon,
} from "./RegisterIcons";
import "./Register.css";

const INITIAL_FORM_VALUES = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  passwordConfirmation: "",
};

const API_FIELD_MAP = {
  name: "fullName",
  full_name: "fullName",
  email: "email",
  phone: "phone",
  phone_number: "phone",
  mobile: "phone",
  password: "password",
  password_confirmation: "passwordConfirmation",
};

const normalizePhone = (phone, countryCode) => {
  const normalizedPhone = phone.replace(/[\s()-]/g, "");

  if (normalizedPhone.startsWith("+")) {
    return normalizedPhone;
  }

  return `${countryCode}${normalizedPhone.replace(/^0+/, "")}`;
};

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [countryCode, setCountryCode] = useState("+966");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    if (generalError) {
      setGeneralError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const nextErrors = validateRegisterForm(formValues);
    setErrors(nextErrors);
    setGeneralError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await register({
        name: formValues.fullName.trim(),
        email: formValues.email.trim(),
        phone: normalizePhone(formValues.phone, countryCode),
        password: formValues.password,
        password_confirmation: formValues.passwordConfirmation,
      });
      const emailVerificationPath = PATHS.AUTH.EMAIL_VERIFICATION_SENT;

      if (result.requiresEmailVerification && emailVerificationPath) {
        navigate(emailVerificationPath, {
          replace: true,
          state: { email: formValues.email.trim() },
        });
        return;
      }

      if (result.token) {
        navigate(PATHS.HOME ?? PATHS.WELCOME, { replace: true });
        return;
      }

      navigate(PATHS.AUTH.LOGIN, {
        replace: true,
        state: {
          successMessage: result.requiresEmailVerification
            ? "تم إنشاء الحساب. راجع بريدك الإلكتروني لتوثيق الحساب"
            : "تم إنشاء الحساب بنجاح. يمكنك تسجيل الدخول الآن",
        },
      });
    } catch (error) {
      const fieldErrors = getFieldErrors(error, API_FIELD_MAP);
      const emailVerificationPath = PATHS.AUTH.EMAIL_VERIFICATION_SENT;

      if (isEmailVerificationError(error) && emailVerificationPath) {
        navigate(emailVerificationPath, {
          state: { email: formValues.email.trim() },
        });
        return;
      }

      setErrors(fieldErrors);
      setGeneralError(
        getGeneralAuthError(error, Object.keys(fieldErrors).length > 0)
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordAction = (isVisible, toggleVisibility, label) => (
    <button
      className="auth-input__action"
      type="button"
      aria-label={label}
      onClick={() => toggleVisibility((currentValue) => !currentValue)}
      disabled={isSubmitting}
    >
      {isVisible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  return (
    <section className="auth-page register-page" aria-labelledby="register-title">
      <div className="auth-page__form-panel">
        <div className="auth-page__form-shell">
          <a className="auth-page__home-link" href={PATHS.HOME ?? PATHS.WELCOME}>
            <span aria-hidden="true">‹</span>
            العودة إلى الرئيسية
          </a>

          <ol className="register-steps" aria-label="خطوات إنشاء الحساب">
            <li className="register-steps__item register-steps__item--current" aria-current="step">
              <span className="register-steps__marker" />
              <span className="register-steps__label">بيانات الحساب</span>
            </li>
            <li className="register-steps__item">
              <span className="register-steps__marker" />
              <span className="register-steps__label">تأكيد الحساب</span>
            </li>
          </ol>

          <header className="auth-page__header register-page__header">
            <span className="auth-page__eyebrow">ابدأ رحلة أكثر وضوحًا</span>
            <h1 className="auth-page__title" id="register-title">
              إنشاء حساب جديد
            </h1>
            <p className="auth-page__subtitle">
              أدخل بياناتك الأساسية، وابدأ تجربة تعليمية مصممة لتنمو مع طفلك.
            </p>
          </header>

          <form
            className="auth-form register-form"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
            noValidate
          >
            {generalError && (
              <div className="auth-form__message auth-form__message--error" role="alert">
                {generalError}
              </div>
            )}

            <AuthInput
              id="fullName"
              label="الاسم بالكامل"
              value={formValues.fullName}
              onChange={updateField}
              placeholder="اسمك بالكامل"
              autoComplete="name"
              Icon={UserIcon}
              error={errors.fullName}
              disabled={isSubmitting}
            />

            <AuthInput
              id="email"
              label="البريد الإلكتروني"
              type="email"
              value={formValues.email}
              onChange={updateField}
              placeholder="بريدك الإلكتروني"
              autoComplete="email"
              inputMode="email"
              Icon={EmailIcon}
              error={errors.email}
              disabled={isSubmitting}
            />

            <div className="register-form__phone-row">
              <AuthInput
                id="phone"
                label="رقم الجوال"
                type="tel"
                value={formValues.phone}
                onChange={updateField}
                placeholder="رقم الجوال"
                autoComplete="tel-national"
                inputMode="tel"
                Icon={PhoneIcon}
                error={errors.phone}
                disabled={isSubmitting}
              />

              <div className="country-code">
                <label className="visually-hidden" htmlFor="countryCode">
                  مفتاح الدولة
                </label>
                <span className="country-code__flag" aria-hidden="true" />
                <select
                  className="country-code__select"
                  id="countryCode"
                  value={countryCode}
                  onChange={(event) => setCountryCode(event.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="+966">+966</option>
                </select>
                <span className="country-code__chevron" aria-hidden="true">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            <AuthInput
              id="password"
              label="كلمة المرور"
              type={isPasswordVisible ? "text" : "password"}
              value={formValues.password}
              onChange={updateField}
              placeholder="كلمة المرور"
              autoComplete="new-password"
              Icon={LockIcon}
              error={errors.password}
              disabled={isSubmitting}
              action={passwordAction(
                isPasswordVisible,
                setIsPasswordVisible,
                isPasswordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
              )}
            />

            <AuthInput
              id="passwordConfirmation"
              label="تأكيد كلمة المرور"
              type={isConfirmationVisible ? "text" : "password"}
              value={formValues.passwordConfirmation}
              onChange={updateField}
              placeholder="تأكيد كلمة المرور"
              autoComplete="new-password"
              Icon={LockIcon}
              error={errors.passwordConfirmation}
              disabled={isSubmitting}
              action={passwordAction(
                isConfirmationVisible,
                setIsConfirmationVisible,
                isConfirmationVisible ? "إخفاء تأكيد كلمة المرور" : "إظهار تأكيد كلمة المرور"
              )}
            />

            <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
              {isSubmitting && <span className="auth-form__spinner" aria-hidden="true" />}
              <span>{isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}</span>
            </button>
          </form>

          <div className="auth-page__switch">
            <span>لديك حساب بالفعل؟</span>
            <a href={PATHS.AUTH.LOGIN}>
              تسجيل الدخول
            </a>
          </div>
        </div>
      </div>

      <AuthShowcase
        variant="photo"
        image={registerLearningImage}
        imageAlt="معلمة وأطفال يبدأون رحلة تعلم رقمية ممتعة معًا"
        eyebrow="رحلة تبدأ بخطوة"
        title="مساحة تعليمية تتطور مع طفلك"
        description="أنشئ حسابك لتبدأ رحلة منظمة تجمع التعلم التفاعلي، متابعة التقدم، والاحتفاء بكل إنجاز."
      />
    </section>
  );
}

export default Register;
