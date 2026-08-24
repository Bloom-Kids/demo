import { useEffect, useRef } from 'react';

function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const colors = ['#0F4C81', '#63ABFD', '#FBB040', '#FFA5CB'];
    let frameId;
    let particles = [];

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.max(12, Math.floor(rect.width / 85)) }, (_, index) => ({
        x: (index * 97) % rect.width,
        y: (index * 61) % rect.height,
        size: 2 + (index % 3),
        speed: 0.08 + (index % 4) * 0.025,
        color: colors[index % colors.length],
        phase: index * 0.7,
      }));
    };

    const draw = (time = 0) => {
      const rect = canvas.getBoundingClientRect();
      context.clearRect(0, 0, rect.width, rect.height);
      particles.forEach((particle) => {
        const drift = Math.sin(time * 0.00045 + particle.phase) * 14;
        context.beginPath();
        context.arc(particle.x + drift, particle.y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.color;
        context.globalAlpha = 0.2;
        context.fill();
        particle.y -= reduceMotion ? 0 : particle.speed;
        if (particle.y < -10) particle.y = rect.height + 10;
      });
      context.globalAlpha = 1;
      if (!reduceMotion) frameId = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-section__canvas" aria-hidden="true" />;
}

export default HeroCanvas;
