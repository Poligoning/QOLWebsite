import React, { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);
  const shootingStarsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();

    // Define the stars
    const stars = [];
    const numStars = 150;

    // Initialize stars with random positions and properties
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2 + 0.5,
        alpha: Math.random(),
        delta: Math.random() * 0.02 + 0.005,
      });
    }

    // Create Shooting Stars
    function createShootingStar() {
      const shootingStar = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        length: Math.random() * 80 + 10,
        speed: Math.random() * 4 + 6,
        angle: Math.PI / 4 + ((Math.random() - 0.5) * Math.PI) / 6,
        opacity: 1,
      };
      shootingStarsRef.current.push(shootingStar);
    }

    // Calls the stars
    const shootingStarInterval = setInterval(() => {
      // Adjust for more/less Shooting Stars!!
      if (Math.random() < 0.035) {
        createShootingStar();
      }
    }, 100);

    function animate() {
      ctx.fillStyle = 'rgb(2, 2, 20)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.alpha += star.delta;
        if (star.alpha <= 0 || star.alpha >= 1) {
          star.delta = -star.delta;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });

      shootingStarsRef.current.forEach((shootingStar, index) => {
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        const endX =
          shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length;
        const endY =
          shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length;
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.opacity})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.02;

        if (
          shootingStar.opacity <= 0 ||
          shootingStar.x > canvas.width ||
          shootingStar.y > canvas.height
        ) {
          shootingStarsRef.current.splice(index, 1);
        }
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      setCanvasSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(shootingStarInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-1]"
      style={{ backgroundColor: '#020214' }}
    />
  );
}
