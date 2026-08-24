import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PATHS } from "../../../../routes/paths";
import {
  getResendErrorMessage,
  getRetryMessage,
} from "../../api/authApiMessages";
import { resendVerificationEmail } from "../../api/emailVerificationService";
import { requestPasswordReset } from "../../api/passwordService";
import AuthFlowLayout from "../../components/AuthFlowLayout/AuthFlowLayout";
import AuthInput from "../../components/AuthInput";
import { EmailIcon, MailSentIcon } from "../Register/RegisterIcons";

const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

function CheckEmail({ purpose = "password-reset" }) {
  const [searchParams] = useSearchParams();
  const isSubmittingRef = useRef(false);
  const [resendStatus, setResendStatus] = useState("idle");
  const [feedback, setFeedback] = useState(null);
  const [retrySeconds, setRetrySeconds] = useState(0);
  const [retryUntil, setRetryUntil] = useState(0);
  const emailFromQuery = searchParams.get("email") || "";
  const hasValidQueryEmail = EMAIL_PATTERN.test(emailFromQuery);
  const [email, setEmail] = useState(
    hasValidQueryEmail ? emailFromQuery : ""
  );
  const [emailError, setEmailError] = useState("");
  const queryPurpose = searchParams.get("purpose");
  const isVerification =
    purpose === "email-verification" || queryPurpose === "email-verification";

  useEffect(() => {
    if (!retryUntil) return undefined;

    const intervalId = window.setInterval(() => {
      const remaining = Math.max(
        0,
        Math.ceil((retryUntil - Date.now()) / 1000)
      );

      setRetrySeconds(remaining);

      if (remaining === 0) {
        window.clearInterval(intervalId);
      }
    }, 250);

    return () => window.clearInterval(intervalId);
  }, [retryUntil]);

  const handleResend = async () => {
    if (isSubmittingRef.current || retrySeconds > 0) return;

    if (!email || !EMAIL_PATTERN.test(email)) {
      setResendStatus("error");
      setEmailError(
        email
          ? "يرجى إدخال بريد إلكتروني صحيح"
          : "يرجى إدخال البريد الإلكتروني"
      );
      setFeedback({
        type: "error",
        message: "تعذر إعادة الإرسال قبل إدخال بريد إلكتروني صحيح.",
      });
      return;
    }

    isSubmittingRef.current = true;
    setResendStatus("sending");
    setFeedback(null);
    setEmailError("");

    try {
      if (isVerification) {
        await resendVerificationEmail(email);
      } else {
        await requestPasswordReset(email);
      }

      setResendStatus("sent");
      setFeedback({
        type: "success",
        message: isVerification
          ? "تم إرسال رابط تحقق جديد إلى بريدك الإلكتروني."
          : "تم إرسال رابط إعادة تعيين جديد إلى بريدك الإلكتروني.",
      });
    } catch (requestError) {
      const nextRetrySeconds = requestError?.retryAfterSeconds || 0;

      if (requestError?.status === 429 && nextRetrySeconds > 0) {
        setRetrySeconds(nextRetrySeconds);
        setRetryUntil(Date.now() + nextRetrySeconds * 1000);
      }

      setResendStatus("error");
      if (requestError?.status === 422 && !hasValidQueryEmail) {
        setEmailError("البريد الإلكتروني غير صحيح أو لا يمكن استخدامه");
      }
      setFeedback({
        type: "error",
        message:
          requestError?.status === 429
            ? getRetryMessage(nextRetrySeconds)
            : getResendErrorMessage(requestError),
      });
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const resendIsDisabled = resendStatus === "sending" || retrySeconds > 0;

  return (
    <AuthFlowLayout
      titleId="check-email-title"
      eyebrow={isVerification ? "تأكيد الحساب" : "راجع بريدك"}
      title={isVerification ? "أرسلنا رابط تفعيل الحساب" : "أرسلنا رابط إعادة التعيين"}
      description={
        isVerification
          ? "افتح الرسالة في بريدك الإلكتروني واضغط على رابط التفعيل لإكمال إنشاء الحساب."
          : "افتح الرسالة في بريدك الإلكتروني واضغط على الرابط لتعيين كلمة مرور جديدة."
      }
      Icon={MailSentIcon}
    >
      {hasValidQueryEmail ? (
        <b className="auth-flow-page__email">{email}</b>
      ) : (
        <div className="auth-flow-page__resend-email">
          <AuthInput
            id="resendEmail"
            label="البريد الإلكتروني"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (emailError) setEmailError("");
              if (feedback) setFeedback(null);
            }}
            onBlur={() => {
              if (!email) {
                setEmailError("يرجى إدخال البريد الإلكتروني");
              } else if (!EMAIL_PATTERN.test(email)) {
                setEmailError("يرجى إدخال بريد إلكتروني صحيح");
              }
            }}
            placeholder="بريدك الإلكتروني"
            autoComplete="email"
            inputMode="email"
            Icon={EmailIcon}
            error={emailError}
          />
        </div>
      )}

      <div className="auth-flow-page__actions">
        <a
          className="auth-flow-page__secondary-link"
          href={isVerification ? PATHS.AUTH.REGISTER : PATHS.AUTH.FORGOT_PASSWORD}
        >
          تغيير البريد الإلكتروني
        </a>
      </div>

      <div className="auth-flow-page__helper-row">
        <span>لم تصلك الرسالة؟</span>
        <button
          className="auth-flow-page__text-button"
          type="button"
          disabled={resendIsDisabled}
          onClick={handleResend}
        >
          {resendStatus === "sending"
            ? "جارٍ إعادة الإرسال..."
            : retrySeconds > 0
              ? `إعادة المحاولة بعد ${retrySeconds} ثانية`
              : "إعادة إرسال الرابط"}
        </button>
      </div>

      {feedback && (
        <p
          className={`auth-flow-page__feedback auth-flow-page__feedback--${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
          aria-live="polite"
        >
          {feedback.message}
        </p>
      )}

      <a className="auth-flow-page__back-link" href={PATHS.AUTH.LOGIN}>
        العودة إلى تسجيل الدخول
      </a>
    </AuthFlowLayout>
  );
}

export default CheckEmail;
