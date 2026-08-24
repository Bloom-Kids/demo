import './AboutBloomSection.css';

function AboutBloomSection() {
  return (
    <section id="about-bloom" className="about-bloom">
      <div className="about-bloom__content">
        <div className="about-bloom__text" data-reveal="from-right">
          <span className="about-bloom__eyebrow">تعلّم يتطور باستمرار</span>
          <h2 className="about-bloom__title">
            رحلة تعليمية تنمو مع طفلك
          </h2>

          <p className="about-bloom__description">
            تقدم بلوم كيدز تجربة تعليمية آمنة وممتعة تساعد الطفل
            على تطوير مهاراته والتقدم في مساره التعليمي بطريقة
            تناسب مستواه واحتياجاته.
          </p>

          <ul className="about-bloom__features">
            <li><span aria-hidden="true">✓</span> محتوى يتدرج حسب مستوى الطفل</li>
            <li><span aria-hidden="true">✓</span> تقارير تقدم سهلة وواضحة</li>
            <li><span aria-hidden="true">✓</span> أنشطة تفاعلية تحافظ على الحماس</li>
          </ul>
        </div>

        <div
          className="about-bloom__visual"
          data-reveal="from-left"
          aria-hidden="true"
        >
          <div className="about-bloom__circle about-bloom__circle--outer">
            <div className="about-bloom__circle about-bloom__circle--middle">
              <div className="about-bloom__circle about-bloom__circle--inner">
                <div className="about-bloom__circle-center">
                  <strong>٣</strong>
                  <span>محاور للنمو</span>
                </div>
              </div>
            </div>
          </div>

          <span className="about-bloom__decoration about-bloom__decoration--blue"></span>
          <span className="about-bloom__decoration about-bloom__decoration--light"></span>
          <span className="about-bloom__decoration about-bloom__decoration--small"></span>
          <span className="about-bloom__orbit-label about-bloom__orbit-label--learning">تعلّم</span>
          <span className="about-bloom__orbit-label about-bloom__orbit-label--practice">تطبيق</span>
          <span className="about-bloom__orbit-label about-bloom__orbit-label--progress">تقدّم</span>
        </div>
      </div>
    </section>
  );
}

export default AboutBloomSection;
