import './HeroSection.css';
import heroChild from '../../../../../assets/images/hero-child-books.png';
import HeroCanvas from './HeroCanvas';

function HeroSection() {
  return (
    <section className="hero-section">
      <HeroCanvas />
      <div className="hero-section__content">
        <div className="hero-section__text">
          <span className="hero-section__eyebrow">تعليم ذكي • تجربة آمنة</span>
          <h1 className="hero-section__title">
            رحلة تعلّم <span>ملهمة</span> تبدأ من مستوى طفلك
          </h1>

          <p className="hero-section__description">
            منصة تعليمية تفاعلية تساعد الأطفال المتأخرين على استعادة
            مهاراتهم بطريقة ممتعة وآمنة.
          </p>

          <a
            className="hero-section__button"
            href="#how-it-works"
          >
            ابدأ رحلة طفلك
            <span aria-hidden="true">←</span>
          </a>
          <div className="hero-section__trust" aria-label="مزايا المنصة">
            <span>✓ مسار مخصص</span>
            <span>✓ متابعة واضحة</span>
            <span>✓ بيئة آمنة</span>
          </div>
        </div>

        <div
          className="hero-section__visual"
          aria-hidden="true"
        >
          <div className="hero-portrait">
            <span className="hero-portrait__orb hero-portrait__orb--one"></span>
            <span className="hero-portrait__orb hero-portrait__orb--two"></span>
            <div className="hero-portrait__badge hero-portrait__badge--progress">
              <strong>+85%</strong><span>تقدم مستمر</span>
            </div>
            <div className="hero-portrait__badge hero-portrait__badge--learning">
              <span className="hero-portrait__badge-icon">★</span><span>تعلّم ممتع</span>
            </div>
            <div className="hero-portrait__backdrop"></div>
            <img className="hero-portrait__image" src={heroChild} alt="" />
          </div>
        </div>
      </div>

      <div
        className="hero-section__bottom-wave"
        aria-hidden="true"
      ></div>
    </section>
  );
}

export default HeroSection;
