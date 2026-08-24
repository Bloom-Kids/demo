import { useEffect, useRef } from "react";
import bloomKidsLogo from "../../../../assets/images/bloom-kids-logo.jpg";
import "./AuthShowcase.css";

const PARTICLE_COLORS = [
  "rgba(130, 188, 243, 0.88)",
  "rgba(251, 176, 64, 0.82)",
  "rgba(255, 255, 255, 0.72)",
  "rgba(19, 73, 139, 0.96)",
];

function createParticle(width, height, index) {
  const angle = (index * 2.399963229728653) % (Math.PI * 2);
  const distance = 0.18 + ((index * 37) % 70) / 100;

  return {
    x: width * (0.5 + Math.cos(angle) * distance * 0.52),
    y: height * (0.5 + Math.sin(angle) * distance * 0.52),
    radius: 1.2 + (index % 4) * 0.55,
    velocityX: Math.cos(angle + Math.PI / 2) * (0.08 + (index % 3) * 0.025),
    velocityY: Math.sin(angle + Math.PI / 2) * (0.08 + (index % 3) * 0.025),
    color: PARTICLE_COLORS[index % PARTICLE_COLORS.length],
  };
}

function LearningPathIcon({ type }) {
  if (type === "book") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.8c3.2-.7 5.9 0 8 2v11c-2.1-2-4.8-2.7-8-2V5.8Z" />
        <path d="M20 5.8c-3.2-.7-5.9 0-8 2v11c2.1-2 4.8-2.7 8-2V5.8Z" />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 13 4 4L19 7" />
    </svg>
  );
}

function AuthShowcase({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "",
  variant = "dashboard",
  className = "",
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof navigator === "undefined" ||
      navigator.userAgent.includes("jsdom")
    ) {
      return undefined;
    }

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return undefined;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = { x: 0, y: 0, isActive: false };
    let width = 0;
    let height = 0;
    let particles = [];
    let animationFrameId;

    const resizeCanvas = () => {
      const bounds = canvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(bounds.width, 1);
      height = Math.max(bounds.height, 1);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = Math.max(22, Math.min(48, Math.round(width / 22)));
      particles = Array.from({ length: particleCount }, (_, index) =>
        createParticle(width, height, index)
      );
    };

    const drawScene = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const orbitX = width * 0.52 + Math.sin(time * 0.00022) * width * 0.025;
      const orbitY = height * 0.46 + Math.cos(time * 0.00018) * height * 0.025;
      const glow = context.createRadialGradient(
        orbitX,
        orbitY,
        0,
        orbitX,
        orbitY,
        Math.max(width, height) * 0.42
      );
      glow.addColorStop(0, "rgba(130, 188, 243, 0.2)");
      glow.addColorStop(0.52, "rgba(19, 73, 139, 0.14)");
      glow.addColorStop(1, "rgba(5, 28, 56, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      particles.forEach((particle, particleIndex) => {
        if (!reducedMotionQuery.matches) {
          particle.x += particle.velocityX;
          particle.y += particle.velocityY;

          if (particle.x < -10) particle.x = width + 10;
          if (particle.x > width + 10) particle.x = -10;
          if (particle.y < -10) particle.y = height + 10;
          if (particle.y > height + 10) particle.y = -10;
        }

        const pointerOffsetX = pointer.isActive
          ? (pointer.x - width / 2) * (0.004 + (particleIndex % 3) * 0.002)
          : 0;
        const pointerOffsetY = pointer.isActive
          ? (pointer.y - height / 2) * (0.004 + (particleIndex % 3) * 0.002)
          : 0;

        const particleX = particle.x + pointerOffsetX;
        const particleY = particle.y + pointerOffsetY;

        particles.slice(particleIndex + 1).forEach((nextParticle) => {
          const distanceX = nextParticle.x - particle.x;
          const distanceY = nextParticle.y - particle.y;
          const distance = Math.hypot(distanceX, distanceY);

          if (distance < 112) {
            context.beginPath();
            context.moveTo(particleX, particleY);
            context.lineTo(nextParticle.x, nextParticle.y);
            context.strokeStyle = `rgba(173, 211, 247, ${0.15 * (1 - distance / 112)})`;
            context.lineWidth = 1;
            context.stroke();
          }
        });

        context.beginPath();
        context.arc(particleX, particleY, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.fill();
      });
    };

    const animate = (time) => {
      drawScene(time);

      if (!reducedMotionQuery.matches) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    const handlePointerMove = (event) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = event.clientX - bounds.left;
      pointer.y = event.clientY - bounds.top;
      pointer.isActive = true;
    };

    const handlePointerLeave = () => {
      pointer.isActive = false;
    };

    const handleMotionPreferenceChange = () => {
      window.cancelAnimationFrame(animationFrameId);
      drawScene();

      if (!reducedMotionQuery.matches) {
        animationFrameId = window.requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    drawScene();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(resizeCanvas)
        : null;

    resizeObserver?.observe(canvas);
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    reducedMotionQuery.addEventListener?.("change", handleMotionPreferenceChange);

    if (!reducedMotionQuery.matches) {
      animationFrameId = window.requestAnimationFrame(animate);
    }

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      reducedMotionQuery.removeEventListener?.("change", handleMotionPreferenceChange);
    };
  }, []);

  const isPhotoShowcase = variant === "photo";
  const showcaseClassName = [
    "auth-showcase",
    `auth-showcase--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={showcaseClassName} aria-label="رحلة التعلم في بلوم كيدز">
      <canvas className="auth-showcase__canvas" ref={canvasRef} aria-hidden="true" />
      <span className="auth-showcase__glow auth-showcase__glow--one" aria-hidden="true" />
      <span className="auth-showcase__glow auth-showcase__glow--two" aria-hidden="true" />

      <div className="auth-showcase__content">
        <div className="auth-showcase__brand">
          <span className="auth-showcase__logo-window" aria-hidden="true">
            <img src={bloomKidsLogo} alt="" />
          </span>
          <span className="auth-showcase__brand-copy">
            <strong>Bloom Kids</strong>
            <small>مساحة تعلم تنمو مع الطفل</small>
          </span>
        </div>

        <div
          className="auth-showcase__stage"
          aria-hidden={isPhotoShowcase ? undefined : "true"}
        >
          <span className="auth-showcase__orbit auth-showcase__orbit--one" />
          <span className="auth-showcase__orbit auth-showcase__orbit--two" />

          {isPhotoShowcase ? (
            <figure className="auth-showcase__photo-frame">
              <img className="auth-showcase__photo" src={image} alt={imageAlt} />
              <span className="auth-showcase__photo-shade" aria-hidden="true" />
              <figcaption className="auth-showcase__photo-caption">
                <span className="auth-showcase__photo-caption-mark" aria-hidden="true" />
                تعلم يجمع الطفل والمعلم في رحلة واحدة
              </figcaption>
            </figure>
          ) : (
            <>
              <article className="learning-card">
                <div className="learning-card__header">
                  <div>
                    <span>مسار اليوم</span>
                    <strong>خطوات صغيرة، أثر كبير</strong>
                  </div>
                  <span className="learning-card__status">جاهز للبدء</span>
                </div>

                <div className="learning-card__path">
                  <div className="learning-card__step learning-card__step--completed">
                    <span className="learning-card__icon">
                      <LearningPathIcon type="check" />
                    </span>
                    <span>
                      <strong>اكتشاف اليوم</strong>
                      <small>تمت الخطوة بنجاح</small>
                    </span>
                  </div>

                  <div className="learning-card__step learning-card__step--active">
                    <span className="learning-card__icon">
                      <LearningPathIcon type="book" />
                    </span>
                    <span>
                      <strong>تجربة تفاعلية</strong>
                      <small>المحطة الحالية</small>
                    </span>
                  </div>

                  <div className="learning-card__step">
                    <span className="learning-card__icon">
                      <LearningPathIcon type="spark" />
                    </span>
                    <span>
                      <strong>إنجاز جديد</strong>
                      <small>المحطة التالية</small>
                    </span>
                  </div>
                </div>

                <div className="learning-card__progress">
                  <span>
                    <strong>68%</strong>
                    <small>تقدم المسار</small>
                  </span>
                  <span className="learning-card__progress-track">
                    <span />
                  </span>
                </div>
              </article>

              <div className="auth-showcase__floating-card auth-showcase__floating-card--achievement">
                <span className="auth-showcase__floating-icon">
                  <LearningPathIcon type="spark" />
                </span>
                <span>
                  <strong>إنجاز جديد</strong>
                  <small>كل خطوة تستحق الاحتفاء</small>
                </span>
              </div>

              <div className="auth-showcase__floating-card auth-showcase__floating-card--focus">
                <span className="auth-showcase__focus-ring">
                  <span />
                </span>
                <span>
                  <strong>مسار واضح</strong>
                  <small>تعلم يناسب كل مرحلة</small>
                </span>
              </div>
            </>
          )}
        </div>

        <div className="auth-showcase__copy">
          <span className="auth-showcase__eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </aside>
  );
}

export default AuthShowcase;
