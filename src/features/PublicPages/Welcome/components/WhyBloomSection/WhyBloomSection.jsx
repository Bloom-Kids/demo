import './WhyBloomSection.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../../../../routes/paths';

const ICONS = {
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.5 4 5.5 4 9s-1.5 6.5-4 9c-2.5-2.5-4-5.5-4-9s1.5-6.5 4-9Z" />
    </>
  ),

  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="M8 14h.01M12 14h.01M16 14h.01" />
      <path d="M8 17h.01M12 17h.01M16 17h.01" />
    </>
  ),

  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18M9 12v2h6v-2" />
    </>
  ),

  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14a2 2 0 0 1 2-2h1v7H6a2 2 0 0 1-2-2v-3Z" />
      <path d="M20 14a2 2 0 0 0-2-2h-1v7h1a2 2 0 0 0 2-2v-3Z" />
    </>
  ),

  calendarCheck: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
      <path d="m8 16 2 2 5-5" />
    </>
  ),

  checklist: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3h6v3H9z" />
      <path d="m8 11 1.5 1.5L12 10M14 12h2" />
      <path d="m8 16 1.5 1.5L12 15M14 17h2" />
    </>
  ),
};

const BENEFITS = [
  {
    id: 1,
    icon: 'globe',
    text: 'محتوى تعليمي تفاعلي يناسب احتياجات طفلك ويساعده على التعلم.',
  },
  {
    id: 2,
    icon: 'calendar',
    text: 'مسار تعليمي مخصص يتم تحديده بناءً على مستوى الطفل واحتياجاته.',
  },
  {
    id: 3,
    icon: 'briefcase',
    text: 'متابعة مستمرة لتقدم الطفل وإنجازاته خلال رحلته التعليمية.',
  },
  {
    id: 4,
    icon: 'headphones',
    text: 'أنشطة تعليمية ممتعة تجمع بين التعلم واللعب بطريقة بسيطة.',
  },
  {
    id: 5,
    icon: 'calendarCheck',
    text: 'بيئة تعليمية آمنة تشجع الطفل على المشاركة وبناء ثقته بنفسه.',
  },
  {
    id: 6,
    icon: 'checklist',
    text: 'تقارير واضحة تساعد ولي الأمر على متابعة مستوى الطفل وتطوره.',
  },
];

function BenefitIcon({ name }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

function WhyBloomSection() {
  return (
    <section
      id="why-bloom"
      className="why-bloom"
      aria-labelledby="why-bloom-title"
    >
      <div className="why-bloom__content">
        <div className="why-bloom__heading" data-reveal>
          <span className="why-bloom__eyebrow">تعليم يناسب كل طفل</span>
          <h2
            id="why-bloom-title"
            className="why-bloom__title"
          >
            لماذا تختار بلوم كيدز؟
          </h2>
          <p className="why-bloom__intro">
            تجربة تعليمية تجمع بين التخصيص والمتابعة والمتعة في مكان واحد.
          </p>
        </div>

        <div className="why-bloom__grid">
          {BENEFITS.map((benefit) => (
            <article
              className="why-bloom__card"
              data-reveal="scale"
              style={{ '--reveal-delay': `${benefit.id * 70}ms` }}
              key={benefit.id}
            >
              <span
                className="why-bloom__icon"
                aria-hidden="true"
              >
                <BenefitIcon name={benefit.icon} />
              </span>

              <p className="why-bloom__card-text">
                {benefit.text}
              </p>
            </article>
          ))}
        </div>

        <div className="why-bloom__action" data-reveal>
          <Link
            className="why-bloom__button"
            to={PATHS.AUTH.REGISTER}
          >
            سجل الآن
          </Link>
        </div>
      </div>
    </section>
  );
}

export default WhyBloomSection;
