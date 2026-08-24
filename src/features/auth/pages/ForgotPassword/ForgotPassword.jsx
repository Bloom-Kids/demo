import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../routes/paths";
import { getForgotPasswordError } from "../../api/authApiMessages";
import { requestPasswordReset } from "../../api/passwordService";
import AuthFlowLayout from "../../components/AuthFlowLayout/AuthFlowLayout";
import AuthInput from "../../components/AuthInput";
import { EmailIcon, MailSentIcon } from "../Register/RegisterIcons";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function ForgotPassword() {
  const navigate = useNavigate();
  const isSubmittingRef = useRef(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      return "يرجى إدخال البريد الإلكتروني";
    }

    if (!EMAIL_PATTERN.test(email.trim())) {
      return "يرجى إدخال بريد إلكتروني صحيح";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmittingRef.current) return;

    const nextError = validateEmail();
    setError(nextError);
    setFeedback("");

    if (nextError) return;

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const normalizedEmail = email.trim();
      await requestPasswordReset(normalizedEmail);
      const encodedEmail = encodeURIComponent(normalizedEmail);
      navigate(
        `${PATHS.AUTH.CHECK_EMAIL}?purpose=password-reset&email=${encodedEmail}`,
        { replace: true }
      );
    } catch (requestError) {
      const apiError = getForgotPasswordError(requestError);
      setError(apiError.email);
      setFeedback(apiError.message);
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  return (
    <AuthFlowLayout
      titleId="forgot-password-title"
      eyebrow="استعادة الوصول"
      title="نسيت كلمة المرور؟"
      description="أدخل بريدك الإلكتروني وسنرسل لك رابطًا آمنًا لتعيين كلمة مرور جديدة."
      Icon={MailSentIcon}
      showcaseTitle="العودة إلى حسابك بخطوات بسيطة"
      showcaseDescription="ابدأ بطلب رابط إعادة التعيين، ثم افتح بريدك واتبع الرابط للعودة إلى رحلتك التعليمية."
    >
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <AuthInput
          id="email"
          label="البريد الإلكتروني"
          type="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError("");
            if (feedback) setFeedback("");
          }}
          onBlur={() => setError(validateEmail())}
          placeholder="بريدك الإلكتروني"
          autoComplete="email"
          inputMode="email"
          Icon={EmailIcon}
          error={error}
        />

        <button
          className="auth-form__submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "جارٍ إرسال الرابط..." : "إرسال رابط إعادة التعيين"}
        </button>
      </form>

      {feedback && (
        <p
          className="auth-flow-page__feedback auth-flow-page__feedback--error"
          role="alert"
        >
          {feedback}
        </p>
      )}

      <a className="auth-flow-page__back-link" href={PATHS.AUTH.LOGIN}>
        العودة إلى تسجيل الدخول
      </a>
    </AuthFlowLayout>
  );
}

export default ForgotPassword;
