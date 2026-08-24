import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import loginLearningImage from "../../../../assets/images/auth-login-learning.png";
import { PATHS } from "../../../../routes/paths";
import AuthInput from "../../components/AuthInput";
import AuthShowcase from "../../components/AuthShowcase/AuthShowcase";
import useAuth from "../../hooks/useAuth";
import {
  getFieldErrors,
  getGeneralAuthError,
  isEmailVerificationError,
} from "../../utils/authErrors";
import { validateLoginForm } from "../../utils/authValidation";
import {
  EmailIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from "../Register/RegisterIcons";
import "../Register/Register.css";
import "./Login.css";

const INITIAL_FORM_VALUES = {
  email: "",
  password: "",
};

const API_FIELD_MAP = {
  email: "email",
  password: "password",
};

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const successMessage = location.state?.successMessage ?? "";

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

    const nextErrors = validateLoginForm(formValues);
    setErrors(nextErrors);
    setGeneralError("");

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({
        email: formValues.email.trim(),
        password: formValues.password,
      });
      const emailVerificationPath = PATHS.AUTH.EMAIL_VERIFICATION_SENT;

      if (result.requiresEmailVerification && emailVerificationPath) {
        navigate(emailVerificationPath, {
          replace: true,
          state: { email: formValues.email.trim() },
        });
        return;
      }

      navigate(PATHS.HOME ?? PATHS.WELCOME, { replace: true });
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

  const passwordAction = (
    <button
      className="auth-input__action"
      type="button"
      aria-label={isPasswordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
      onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
      disabled={isSubmitting}
    >
      {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  return (
    <section className="auth-page login-page" aria-labelledby="login-title">
      <div className="auth-page__form-panel login-page__form-panel">
        <div className="auth-page__form-shell login-page__form-shell">
          <a className="auth-page__home-link" href={PATHS.HOME ?? PATHS.WELCOME}>
            <span aria-hidden="true">‹</span>
            العودة إلى الرئيسية
          </a>

          <header className="auth-page__header login-page__header">
            <span className="auth-page__eyebrow">سعداء بعودتك</span>
            <h1 className="auth-page__title" id="login-title">
              أهلاً بك من جديد
            </h1>
            <p className="auth-page__subtitle">
              سجّل الدخول للعودة إلى المسارات والأنشطة والإنجازات في بلوم كيدز.
            </p>
          </header>

          <form
            className="auth-form login-form"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
            noValidate
          >
            {successMessage && (
              <div className="auth-form__message auth-form__message--success" role="status">
                {successMessage}
              </div>
            )}

            {generalError && (
              <div className="auth-form__message auth-form__message--error" role="alert">
                {generalError}
              </div>
            )}

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

            <AuthInput
              id="password"
              label="كلمة المرور"
              type={isPasswordVisible ? "text" : "password"}
              value={formValues.password}
              onChange={updateField}
              placeholder="كلمة مرور"
              autoComplete="current-password"
              Icon={LockIcon}
              error={errors.password}
              action={passwordAction}
              disabled={isSubmitting}
            />

            <a
              className="login-form__forgot-link"
              href={PATHS.AUTH.FORGOT_PASSWORD}
            >
              نسيت كلمة المرور؟
            </a>

            <button className="auth-form__submit" type="submit" disabled={isSubmitting}>
              {isSubmitting && <span className="auth-form__spinner" aria-hidden="true" />}
              <span>{isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}</span>
            </button>
          </form>

          <div className="auth-page__switch">
            <span>ليس لديك حساب؟</span>
            <a href={PATHS.AUTH.REGISTER}>
              إنشاء حساب جديد
            </a>
          </div>
        </div>
      </div>

      <AuthShowcase
        variant="photo"
        image={loginLearningImage}
        imageAlt="أطفال يتعلمون مع معلمتهم باستخدام نشاط رقمي تفاعلي"
        eyebrow="تعلم يعود معك"
        title="كل إنجاز محفوظ، وكل خطوة واضحة"
        description="عد إلى مساحة الطفل التعليمية، تابع التقدم، واكتشف المحطة التالية في رحلة تعلم ممتعة وآمنة."
      />
    </section>
  );
}

export default Login;
