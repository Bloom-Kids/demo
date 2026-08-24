import { useEffect, useState } from 'react';
import logo from '../../assets/images/logo.jpg';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let animationFrameId;

    function updateNavbar() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0
        ? (window.scrollY / scrollableHeight) * 100
        : 0;

      setIsScrolled(window.scrollY > 18);
      setScrollProgress(Math.min(progress, 100));
    }

    function handleScroll() {
      window.cancelAnimationFrame(animationFrameId);
      animationFrameId = window.requestAnimationFrame(updateNavbar);
    }

    updateNavbar();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  function toggleMenu() {
    setIsMenuOpen((currentState) => !currentState);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav
      className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
      style={{ '--scroll-progress': `${scrollProgress}%` }}
      aria-label="التنقل الرئيسي"
    >
      <div className="navbar__container">
        <Link
          className="navbar__brand"
          to={PATHS.WELCOME}
          aria-label="الصفحة الرئيسية"
          onClick={closeMenu}
        >
          <img
            className="navbar__logo"
            src={logo}
            alt="شعار بلوم كيدز"
          />
        </Link>

        <button
          className="navbar__toggle"
          type="button"
          aria-label="فتح وإغلاق قائمة التنقل"
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div
          id="navbar-menu"
          className={`navbar__menu ${
            isMenuOpen ? 'navbar__menu--open' : ''
          }`}
        >
          <div className="navbar__links">
            <Link to={PATHS.WELCOME} onClick={closeMenu}>
              الرئيسية
            </Link>

            <a href="#about-bloom" onClick={closeMenu}>
              من نحن
            </a>

            <a href="#why-bloom" onClick={closeMenu}>
              المميزات
            </a>

            <a href="#contact-banner" onClick={closeMenu}>
              تواصل معنا
            </a>
          </div>

          <div className="navbar__actions">
            <Link
              className="navbar__login-link"
              to={PATHS.AUTH.LOGIN}
              onClick={closeMenu}
            >
              دخول
            </Link>

            <Link
              className="navbar__register-button"
              to={PATHS.AUTH.REGISTER}
              onClick={closeMenu}
            >
              حساب جديد
            </Link>
          </div>
        </div>
      </div>

      <span className="navbar__progress" aria-hidden="true"></span>
    </nav>
  );
}

export default Navbar;
