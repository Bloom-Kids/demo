import './Footer.css';
import logo from '../../assets/images/logo.jpg';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

function Footer() {
  return (
    <footer className="site-footer">
      <div
        className="site-footer__wave"
        aria-hidden="true"
      ></div>

      <div className="site-footer__content" data-reveal>
        <div className="site-footer__about">
          <Link
            className="site-footer__brand"
            to={PATHS.WELCOME}
            aria-label="العودة إلى الصفحة الرئيسية"
          >
            <img
              className="site-footer__image"
              src={logo}
              alt="شعار بلوم كيدز"
            />
          </Link>

          <p className="site-footer__description">
            بلوم كيدز منصة تعليمية تساعد الأطفال على تطوير
            مهاراتهم والتعلم بطريقة آمنة وممتعة.
          </p>
        </div>

        <nav
          className="site-footer__navigation"
          aria-label="روابط صفحات الموقع"
        >
          <h2 className="site-footer__heading">
            الصفحات الرئيسية
          </h2>

          <ul className="site-footer__links">
            <li>
              <Link to={PATHS.WELCOME}>الرئيسية</Link>
            </li>

            <li>
              <a href="#how-it-works">كيف تعمل</a>
            </li>

            <li>
              <a href="#why-bloom-title">المميزات</a>
            </li>

            <li>
              <a href="#contact">تواصل معنا</a>
            </li>
          </ul>
        </nav>

        <div
          id="contact"
          className="site-footer__contact"
        >
          <h2 className="site-footer__heading">
            تواصل معنا
          </h2>

          <ul className="site-footer__contact-list">
            <li>
              <span aria-hidden="true">⌖</span>
              فلسطين، غزة
            </li>

            <li>
              <span aria-hidden="true">☎</span>
              0000000000
            </li>

            <li>
              <span aria-hidden="true">✉</span>
              info@bloom.com
            </li>
          </ul>
        </div>
      </div>

      <p className="site-footer__copyright">
        منصة بلوم كيدز - جميع الحقوق محفوظة 2027
      </p>
    </footer>
  );
}

export default Footer;
