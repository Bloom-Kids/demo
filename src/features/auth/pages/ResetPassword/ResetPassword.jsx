import { useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PATHS } from "../../../../routes/paths";
import { getResetPasswordError } from "../../api/authApiMessages";
import { resetPassword } from "../../api/passwordService";
import AuthFlowLayout from "../../components/AuthFlowLayout/AuthFlowLayout";
import AuthInput from "../../components/AuthInput";
import {
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from "../Register/RegisterIcons";

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function ResetPassword() {
  const navigate = useNavigate();
  const { token: pathToken = "" } = useParams();
  const [searchParams] = useSearchParams();
  const isSubmittingRef = useRef(false);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [touched, setTouched] = useState({
    password: false,
    passwordConfirmation: false,
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [apiFieldErrors, setApiFieldErrors] = useState({
    password: "",
    passwordConfirmation: "",
  });

  const token = searchParams.get("token") || pathToken;
  const email = searchParams.get("email") || "";
  const linkDataError = !token
    ? "رابط إعادة التعيين لا يحتوي على رمز صالح. اطلب رابطًا جديدًا."
    : !email
      ? "رابط إعادة التعيين لا يحتوي على بريد إلكتروني. اطلب رابطًا جديدًا."
      : !EMAIL_PATTERN.test(email)
        ? "البريد الإلكتروني الموجود في رابط إعادة التعيين غير صحيح."
        : "";
  const passwordIsLongEnough = password.length >= MIN_PASSWORD_LENGTH;
  const passwordsMatch =
    Boolean(passwordConfirmation) && password === passwordConfirmation;
  const isFormValid =
    !linkDataError && passwordIsLongEnough && passwordsMatch;

  const passwordError = !password
    ? "يرجى إدخال كلمة المرور الجديدة"
    : !passwordIsLongEnough
      ? `يجب ألا تقل كلمة المرور عن ${MIN_PASSWORD_LENGTH} أحرف`
      : "";

  const confirmationError = !passwordConfirmation
    ? "يرجى تأكيد كلمة المرور الجديدة"
    : !passwordsMatch
      ? "كلمتا المرور غير متطابقتين"
      : "";

  const visibilityButton = (isVisible, setIsVisible, fieldName) => (
    <button
      className="auth-input__action"
      type="button"
      aria-label={`${isVisible ? "إخفاء" : "إظهار"} ${fieldName}`}
      onClick={() => setIsVisible((currentValue) => !currentValue)}
    >
      {isVisible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmittingRef.current) return;

    setTouched({ password: true, passwordConfirmation: true });
    setFeedback(linkDataError);
    setApiFieldErrors({ password: "", passwordConfirmation: "" });

    if (!isFormValid) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);
    setFeedback("");

    try {
      await resetPassword({
        token,
        email,
        password,
        passwordConfirmation,
      });
      setPassword("");
      setPasswordConfirmation("");
      navigate(PATHS.AUTH.PASSWORD_CHANGED, { replace: true });
    } catch (requestError) {
      const apiError = getResetPasswordError(requestError);
      setApiFieldErrors(apiError.fieldErrors);
      setFeedback(apiError.message);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFlowLayout
      titleId="reset-password-title"
      eyebrow="كلمة مرور جديدة"
      title="عيّن كلمة مرور جديدة"
      description="اختر كلمة مرور قوية ومختلفة عن كلمات المرور التي استخدمتها سابقًا."
      Icon={LockIcon}
    >
      {email && <b className="auth-flow-page__email">{email}</b>}

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="password"
          label="كلمة المرور الجديدة"
          type={isPasswordVisible ? "text" : "password"}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setApiFieldErrors((current) => ({ ...current, password: "" }));
            if (feedback) setFeedback("");
          }}
          onBlur={() =>
            setTouched((current) => ({ ...current, password: true }))
          }
          placeholder="كلمة المرور الجديدة"
          autoComplete="new-password"
          Icon={LockIcon}
          error={
            (touched.password ? passwordError : "") || apiFieldErrors.password
          }
          describedBy="password-requirements"
          action={visibilityButton(
            isPasswordVisible,
            setIsPasswordVisible,
            "كلمة المرور الجديدة"
          )}
        />

        <AuthInput
          id="passwordConfirmation"
          label="تأكيد كلمة المرور الجديدة"
          type={isConfirmationVisible ? "text" : "password"}
          value={passwordConfirmation}
          onChange={(event) => {
            setPasswordConfirmation(event.target.value);
            setApiFieldErrors((current) => ({
              ...current,
              passwordConfirmation: "",
            }));
            if (feedback) setFeedback("");
          }}
          onBlur={() =>
            setTouched((current) => ({
              ...current,
              passwordConfirmation: true,
            }))
          }
          placeholder="تأكيد كلمة المرور الجديدة"
          autoComplete="new-password"
          Icon={LockIcon}
          error={
            (touched.passwordConfirmation ? confirmationError : "") ||
            apiFieldErrors.passwordConfirmation
          }
          describedBy="password-requirements"
          action={visibilityButton(
            isConfirmationVisible,
            setIsConfirmationVisible,
            "تأكيد كلمة المرور الجديدة"
          )}
        />

        <ul className="password-requirements" id="password-requirements">
          <li
            className={
              passwordIsLongEnough ? "password-requirements__item--met" : ""
            }
          >
            ثمانية أحرف على الأقل
          </li>
          <li
            className={
              passwordsMatch ? "password-requirements__item--met" : ""
            }
          >
            تطابق كلمتي المرور
          </li>
        </ul>

        <button
          className="auth-form__submit"
          type="submit"
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "جارٍ حفظ كلمة المرور..." : "حفظ كلمة المرور الجديدة"}
        </button>
      </form>

      {(linkDataError || feedback) && (
        <p
          className="auth-flow-page__feedback auth-flow-page__feedback--error"
          role="alert"
        >
          {feedback || linkDataError}
        </p>
      )}
    </AuthFlowLayout>
  );
}

export default ResetPassword;
