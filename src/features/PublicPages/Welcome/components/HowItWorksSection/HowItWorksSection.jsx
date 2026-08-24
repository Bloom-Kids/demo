import './HowItWorksSection.css';
import videoPoster from '../../../../../assets/images/hero-slide-1.png';

const STEPS = [
  {
    id: 1,
    title: 'إنشاء حساب',
    description: 'أنشئ حساب ولي الأمر خلال دقائق قليلة.',
  },
  {
    id: 2,
    title: 'إضافة بيانات الطفل',
    description: 'أضف المعلومات الأساسية لنفهم احتياجات طفلك.',
  },
  {
    id: 3,
    title: 'اجتياز تحديد المستوى',
    description: 'اختبار بسيط يحدد المهارات الحالية ونقاط التحسين.',
  },
  {
    id: 4,
    title: 'الحصول على مسار تعليمي مخصص',
    description: 'نجهز رحلة تعليمية مناسبة تتطور مع مستوى طفلك.',
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="how-it-works"
    >
      <div className="how-it-works__content">
        <div className="how-it-works__steps">
          <div className="how-it-works__heading" data-reveal="from-right">
            <span className="how-it-works__eyebrow">أربع خطوات بسيطة</span>
            <h2 className="how-it-works__title">
              كيف تعمل المنصة؟
            </h2>

            <p className="how-it-works__intro">
              من إنشاء الحساب إلى خطة تعلم مصممة خصيصًا لطفلك.
            </p>
          </div>

          <ol className="how-it-works__list">
            {STEPS.map((step) => (
              <li
                className="how-it-works__step"
                key={step.id}
                data-reveal="from-right"
                style={{ '--reveal-delay': `${step.id * 70}ms` }}
              >
                <span className="how-it-works__step-circle">
                  {step.id}
                </span>

                <div className="how-it-works__step-text">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="how-it-works__video" data-reveal="from-left">
          <div className="how-it-works__video-frame">
            <img
              className="how-it-works__video-image"
              src={videoPoster}
              alt="معاينة لوحة المواد التعليمية في منصة بلوم كيدز"
            />

            <span className="how-it-works__video-overlay" aria-hidden="true"></span>

            <button
              className="how-it-works__play-button"
              type="button"
              aria-label="تشغيل الفيديو التعريفي"
            >
              <span aria-hidden="true"></span>
            </button>
          </div>

          <div className="how-it-works__video-footer">
            <span className="how-it-works__video-label">
              الحصول على مسار تعليمي مخصص
            </span>

            <span className="how-it-works__video-step">
              الخطوة الرابعة
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
