import loginLearningImage from "../../../../assets/images/auth-login-learning.png";
import { PATHS } from "../../../../routes/paths";
import AuthShowcase from "../AuthShowcase/AuthShowcase";
import "../../pages/Register/Register.css";
import "./AuthFlowLayout.css";

function AuthFlowLayout({
  titleId,
  eyebrow,
  title,
  description,
  Icon,
  children,
  showcaseTitle = "خطوات واضحة في كل مرحلة",
  showcaseDescription = "تجربة آمنة ومنظمة تساعدك على العودة إلى حسابك ومتابعة رحلة التعلم بسهولة.",
}) {
  return (
    <section className="auth-page auth-flow-page" aria-labelledby={titleId}>
      <div className="auth-page__form-panel">
        <div className="auth-page__form-shell auth-flow-page__form-shell">
          <a className="auth-page__home-link" href={PATHS.HOME}>
            <span aria-hidden="true">‹</span>
            العودة إلى الرئيسية
          </a>

          {Icon && (
            <span className="auth-flow-page__icon" aria-hidden="true">
              <Icon />
            </span>
          )}

          <header className="auth-page__header auth-flow-page__header">
            <span className="auth-page__eyebrow">{eyebrow}</span>
            <h1 className="auth-page__title" id={titleId}>
              {title}
            </h1>
            <p className="auth-page__subtitle">{description}</p>
          </header>

          <div className="auth-flow-page__content">{children}</div>
        </div>
      </div>

      <AuthShowcase
        variant="photo"
        image={loginLearningImage}
        imageAlt="أطفال يتعلمون مع معلمتهم في بيئة تعليمية تفاعلية"
        eyebrow="حسابك قريب منك"
        title={showcaseTitle}
        description={showcaseDescription}
      />
    </section>
  );
}

export default AuthFlowLayout;
