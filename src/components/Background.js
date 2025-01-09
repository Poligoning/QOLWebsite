import React, { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    const calculateParticles = () => {
      // Base particle count for 1920x1080 is 150
      const baseArea = 1920 * 1080;
      const currentArea = window.innerWidth * window.innerHeight;
      const scaleFactor = currentArea / baseArea;

      // Minimum of 50 particles, scale linearly otherwise
      return Math.max(50, Math.floor(150 * scaleFactor));
    };

    const initParticles = () => {
      const particles = [];
      const numParticles = calculateParticles();

      // Create particles with randomized values
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 3 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          alpha: Math.random() * 0.4 + 0.3,
          deltaAlpha: Math.random() * 0.005 + 0.002,
        });
      }
      return particles;
    };

    let particles = initParticles();

    function animate() {
      ctx.fillStyle = '#030807';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // move them around
      particles.forEach((particle) => {
        particle.alpha += particle.deltaAlpha;
        if (particle.alpha <= 0.3 || particle.alpha >= 0.7) {
          particle.deltaAlpha = -particle.deltaAlpha;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(146, 218, 199, ${particle.alpha})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasSize();
      particles = initParticles(); // Recalculate particles on resize
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1]"
      style={{ backgroundColor: '#030807' }}
    />
  );
}
