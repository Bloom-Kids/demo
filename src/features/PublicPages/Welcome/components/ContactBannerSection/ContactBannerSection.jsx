import './ContactBannerSection.css';

const SOCIAL_ICONS = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle
        cx="17.5"
        cy="6.5"
        r="1"
        fill="currentColor"
        stroke="none"
      />
    </>
  ),

  x: (
    <>
      <path d="M5 4 19 20" />
      <path d="M19 4 5 20" />
    </>
  ),

  facebook: (
    <path d="M14 21v-8h3l.5-4H14V7c0-1.2.8-2 2-2h2V2h-3c-3.1 0-5 1.9-5 5v2H7v4h3v8" />
  ),

  whatsapp: (
    <>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L4 20.5l1.4-4A8.5 8.5 0 1 1 20.5 11.5Z" />
      <path d="M8.5 7.5c.8 4.2 3.8 7.2 8 8l1.2-2-2.3-1.3-1.2 1.2a8 8 0 0 1-3.6-3.6l1.2-1.2-1.3-2.3-2 1.2Z" />
    </>
  ),
};

const SOCIAL_LINKS = [
  {
    id: 1,
    label: 'إنستغرام',
    icon: 'instagram',
    href: '#instagram',
  },
  {
    id: 2,
    label: 'منصة إكس',
    icon: 'x',
    href: '#x',
  },
  {
    id: 3,
    label: 'فيسبوك',
    icon: 'facebook',
    href: '#facebook',
  },
  {
    id: 4,
    label: 'واتساب',
    icon: 'whatsapp',
    href: '#whatsapp',
  },
];

function SocialIcon({ name }) {
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
      {SOCIAL_ICONS[name]}
    </svg>
  );
}

function ContactBannerSection() {
  return (
    <section
      id="contact-banner"
      className="contact-banner"
      aria-labelledby="contact-banner-title"
    >
      <div className="contact-banner__content" data-reveal="scale">
        <h2 id="contact-banner-title" className="contact-banner__title">
          تواصل معنا لأي استفسارات
        </h2>

        <div className="contact-banner__socials">
          {SOCIAL_LINKS.map((socialLink) => (
            <a
              className="contact-banner__social-link"
              href={socialLink.href}
              aria-label={socialLink.label}
              key={socialLink.id}
            >
              <SocialIcon name={socialLink.icon} />
            </a>
          ))}
        </div>

        <a
          className="contact-banner__button"
          href="#contact"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c1 .4 1.9.6 2.9.7a2 2 0 0 1 1.6 1.9Z" />
          </svg>

          تواصل معنا
        </a>
      </div>
    </section>
  );
}

export default ContactBannerSection;
