import { Link } from "react-router-dom";
import brandLogo from "../../../../assets/images/bloom-kids-logo.jpg";
import celebrationImage from "../../../../assets/images/auth-register-learning.png";
import { PATHS } from "../../../../routes/paths";
import { SuccessIcon } from "../Register/RegisterIcons";
import "./EmailVerified.css";

function EmailVerified() {
  return (
    <section className="email-verified-page" aria-labelledby="email-verified-title">
      <div className="email-verified-page__decor" aria-hidden="true">
        <span className="email-verified-page__orb email-verified-page__orb--blue" />
        <span className="email-verified-page__orb email-verified-page__orb--orange" />
        <span className="email-verified-page__grid" />
      </div>

      <div className="email-verified-page__shell">
        <main className="email-verified-card">
          <Link
            className="email-verified-card__brand"
            to={PATHS.HOME}
            aria-label="بلوم كيدز — الصفحة الرئيسية"
          >
            <img src={brandLogo} alt="شعار بلوم كيدز" />
          </Link>

          <div className="email-verified-card__status" role="status">
            <span className="email-verified-card__status-dot" aria-hidden="true" />
            تم التحقق من البريد الإلكتروني
          </div>

          <div className="email-verified-card__success-mark" aria-hidden="true">
            <span className="email-verified-card__success-ring">
              <SuccessIcon />
            </span>
            <span className="email-verified-card__spark email-verified-card__spark--one" />
            <span className="email-verified-card__spark email-verified-card__spark--two" />
            <span className="email-verified-card__spark email-verified-card__spark--three" />
            <span className="email-verified-card__spark email-verified-card__spark--four" />
          </div>

          <header className="email-verified-card__header">
            <span className="email-verified-card__eyebrow">أهلًا بك في بلوم كيدز</span>
            <h1 id="email-verified-title">تم تفعيل حسابك بنجاح!</h1>
            <p>
              بريدك الإلكتروني أصبح موثّقًا، وحسابك جاهز الآن. سجّل الدخول
              وابدأ رحلة تعليمية ممتعة وآمنة مع طفلك.
            </p>
          </header>

          <ol className="email-verified-card__steps" aria-label="حالة إعداد الحساب">
            <li className="email-verified-card__step email-verified-card__step--done">
              <span aria-hidden="true">✓</span>
              <div>
                <b>إنشاء الحساب</b>
                <small>اكتمل</small>
              </div>
            </li>
            <li className="email-verified-card__step email-verified-card__step--done">
              <span aria-hidden="true">✓</span>
              <div>
                <b>تفعيل البريد</b>
                <small>اكتمل</small>
              </div>
            </li>
            <li className="email-verified-card__step email-verified-card__step--next">
              <span aria-hidden="true">3</span>
              <div>
                <b>تسجيل الدخول</b>
                <small>الخطوة التالية</small>
              </div>
            </li>
          </ol>

          <div className="email-verified-card__actions">
            <Link
              className="email-verified-card__button email-verified-card__button--primary"
              to={PATHS.AUTH.LOGIN}
            >
              تسجيل الدخول الآن
              <span aria-hidden="true">←</span>
            </Link>
            <Link
              className="email-verified-card__button email-verified-card__button--secondary"
              to={PATHS.HOME}
            >
              العودة إلى الرئيسية
            </Link>
          </div>

          <p className="email-verified-card__security-note">
            <span aria-hidden="true">✓</span>
            تم تأمين حسابك وتأكيد هويتك الإلكترونية
          </p>
        </main>

        <aside className="email-verified-visual" aria-label="رحلة بلوم كيدز التعليمية">
          <img
            className="email-verified-visual__image"
            src={celebrationImage}
            alt="معلمة وأطفال في تجربة تعليمية تفاعلية"
          />
          <div className="email-verified-visual__shade" />
          <div className="email-verified-visual__content">
            <span>حسابك جاهز</span>
            <h2>كل خطوة صغيرة تصنع إنجازًا كبيرًا</h2>
            <p>
              استكشف الأنشطة والمسارات التعليمية المصممة لتناسب رحلة طفلك.
            </p>
          </div>
          <div className="email-verified-visual__floating-card">
            <span aria-hidden="true">★</span>
            <div>
              <b>بداية موفّقة!</b>
              <small>رحلة التعلم تبدأ الآن</small>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default EmailVerified;
