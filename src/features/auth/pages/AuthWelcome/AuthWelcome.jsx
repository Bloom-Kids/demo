import bloomKidsLogo from "../../../../assets/images/bloom-kids-logo.jpg";
import AuthShowcase from "../../components/AuthShowcase/AuthShowcase";
import { PATHS } from "../../../../routes/paths";
import "./AuthWelcome.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function AuthWelcome() {
  return (
    <div className="auth-welcome">
      <header className="auth-welcome__header">
        <a className="auth-welcome__brand" href={PATHS.HOME} aria-label="بلوم كيدز — الرئيسية">
          <span className="auth-welcome__logo-window" aria-hidden="true">
            <img src={bloomKidsLogo} alt="" />
          </span>
          <span>
            <strong>Bloom Kids</strong>
            <small>مساحة تعلم تنمو مع الطفل</small>
          </span>
        </a>

        <nav className="auth-welcome__nav" aria-label="الدخول وإنشاء الحساب">
          <a className="auth-welcome__nav-login" href={PATHS.AUTH.LOGIN}>
            تسجيل الدخول
          </a>
          <a className="auth-welcome__nav-register" href={PATHS.AUTH.REGISTER}>
            إنشاء حساب
          </a>
        </nav>
      </header>

      <main className="auth-welcome__hero">
        <div className="auth-welcome__content">
          <span className="auth-welcome__eyebrow">منصة بلوم كيدز التعليمية</span>
          <h1>
            تعليم يكتشف قدرات الطفل
            <span> وينمو معه خطوة بخطوة</span>
          </h1>
          <p>
            تجربة عربية تفاعلية تجمع التعلم والمتابعة والإنجاز في مساحة واضحة
            وممتعة للطفل وولي الأمر.
          </p>

          <div className="auth-welcome__actions">
            <a className="auth-welcome__primary-action" href={PATHS.AUTH.REGISTER}>
              ابدأ بإنشاء حساب
              <ArrowIcon />
            </a>
            <a className="auth-welcome__secondary-action" href={PATHS.AUTH.LOGIN}>
              لدي حساب بالفعل
            </a>
          </div>

          <ul className="auth-welcome__features" aria-label="مزايا تجربة بلوم كيدز">
            <li><span />مسار تعلم واضح</li>
            <li><span />أنشطة تفاعلية</li>
            <li><span />متابعة مستمرة للتقدم</li>
          </ul>
        </div>

        <AuthShowcase
          className="auth-welcome__showcase"
          eyebrow="تجربة تعليمية متكاملة"
          title="رحلة تتشكل حول احتياجات الطفل"
          description="من أول نشاط إلى كل إنجاز جديد، تظهر الخطوات بوضوح وتبقى رحلة التعلم ممتعة وقريبة."
        />
      </main>
    </div>
  );
}

export default AuthWelcome;
