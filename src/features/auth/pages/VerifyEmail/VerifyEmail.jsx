import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../../../routes/paths";
import { getEmailVerificationError } from "../../api/authApiMessages";
import { verifyEmail } from "../../api/emailVerificationService";
import { readSignedVerificationLink } from "../../api/signedVerificationLink";
import AuthFlowLayout from "../../components/AuthFlowLayout/AuthFlowLayout";
import { MailSentIcon, SuccessIcon } from "../Register/RegisterIcons";

function VerifyEmail() {
  const navigate = useNavigate();
  const linkData = useMemo(
    () =>
      readSignedVerificationLink(
        window.location.pathname,
        window.location.search
      ),
    []
  );
  const [result, setResult] = useState(() =>
    linkData
      ? {
          state: "loading",
          message: "جارٍ التحقق من البريد الإلكتروني، يرجى الانتظار...",
        }
      : {
          state: "invalid-link",
          message: "رابط التحقق غير صحيح أو تنقصه بيانات التوقيع.",
        }
  );

  useEffect(() => {
    if (!linkData) return undefined;

    let isActive = true;

    verifyEmail(linkData)
      .then(() => {
        if (!isActive) return;
        navigate(PATHS.AUTH.EMAIL_VERIFIED, { replace: true });
      })
      .catch((requestError) => {
        if (!isActive) return;
        const verificationError = getEmailVerificationError(requestError);

        if (verificationError.state === "already-verified") {
          navigate(PATHS.AUTH.EMAIL_VERIFIED, { replace: true });
          return;
        }

        setResult(verificationError);
      });

    return () => {
      isActive = false;
    };
  }, [linkData, navigate]);

  const isSuccessful = ["success", "already-verified"].includes(result.state);
  const feedbackType = isSuccessful
    ? "success"
    : result.state === "loading"
      ? "info"
      : "error";

  return (
    <AuthFlowLayout
      titleId="verify-email-title"
      eyebrow={isSuccessful ? "تم تفعيل الحساب" : "تأكيد البريد"}
      title={
        result.state === "loading"
          ? "جارٍ التحقق من بريدك الإلكتروني"
          : isSuccessful
            ? "اكتمل التحقق من البريد الإلكتروني"
            : "تعذر التحقق من البريد الإلكتروني"
      }
      description="نتحقق من صلاحية الرابط الموقّع كما وصل إلى بريدك دون تغيير بياناته."
      Icon={isSuccessful ? SuccessIcon : MailSentIcon}
    >
      <p
        className={`auth-flow-page__feedback auth-flow-page__feedback--${feedbackType}`}
        role={feedbackType === "error" ? "alert" : "status"}
        aria-live="polite"
      >
        {result.message}
      </p>

      {isSuccessful && (
        <div className="auth-flow-page__actions auth-flow-page__status-actions">
          <a
            className="auth-form__submit auth-flow-page__primary-link"
            href={PATHS.AUTH.LOGIN}
          >
            الانتقال إلى تسجيل الدخول
          </a>
        </div>
      )}

      {!isSuccessful && result.state !== "loading" && (
        <a
          className="auth-flow-page__back-link"
          href={PATHS.AUTH.EMAIL_VERIFICATION_SENT}
        >
          طلب رابط تحقق جديد
        </a>
      )}
    </AuthFlowLayout>
  );
}

export default VerifyEmail;
