import { PATHS } from "../../../../routes/paths";
import AuthFlowLayout from "../../components/AuthFlowLayout/AuthFlowLayout";
import { SuccessIcon } from "../Register/RegisterIcons";

function PasswordChanged() {
  return (
    <AuthFlowLayout
      titleId="password-changed-title"
      eyebrow="اكتملت العملية"
      title="تم تغيير كلمة المرور بنجاح"
      description="يمكنك الآن تسجيل الدخول باستخدام كلمة المرور الجديدة ومتابعة رحلة التعلم."
      Icon={SuccessIcon}
      showcaseTitle="كل شيء جاهز للعودة"
    >
      <div className="auth-flow-page__actions">
        <a
          className="auth-form__submit auth-flow-page__primary-link"
          href={PATHS.AUTH.LOGIN}
        >
          العودة إلى تسجيل الدخول
        </a>
      </div>
    </AuthFlowLayout>
  );
}

export default PasswordChanged;
