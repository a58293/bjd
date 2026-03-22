
import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number; 
  y: number; 
  z: number; 
  size: number;
  speedY: number; 
  drift: number;
  opacity: number;
  maxOpacity: number;
  pulse: number; 
  pulseSpeed: number; 
  color: string;
  glowColor: string; 
  angle: number; 
  sinOffset: number;
}

const AtmosphereOverlay: React.FC<{ active: boolean; mousePos: { x: number; y: number } }> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 150; // 适中的粒子数量，保持优雅

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      { base: 'rgba(255, 255, 255, ', glow: 'rgba(255, 255, 255, 0.8)' }, // 纯白
      { base: 'rgba(255, 245, 200, ', glow: 'rgba(255, 230, 150, 0.6)' }, // 浅金
      { base: 'rgba(230, 210, 255, ', glow: 'rgba(180, 140, 255, 0.4)' }, // 圣紫
    ];

    const createParticle = (isInit = false): Particle => {
      const colorScheme = colors[Math.floor(Math.random() * colors.length)];
      const z = Math.random() * 3 + 1; // 深度感
      return {
        x: Math.random() * canvas.width,
        // 初始化时随机分布，新生成时从底部冒出
        y: isInit ? Math.random() * canvas.height : canvas.height + Math.random() * 100,
        z: z,
        size: (Math.random() * 1.5 + 0.5) / (z * 0.5),
        speedY: -(Math.random() * 0.4 + 0.2) / (z * 0.5), // 越小（远）的粒子上升越慢
        drift: (Math.random() - 0.5) * 0.1,
        opacity: 0,
        maxOpacity: Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        color: colorScheme.base,
        glowColor: colorScheme.glow,
        angle: Math.random() * Math.PI * 2,
        sinOffset: Math.random() * 1000
      };
    };

    const init = () => {
      particles = Array.from({ length: particleCount }, () => createParticle(true));
    };

    const drawDivineRays = () => {
      const centerX = canvas.width * 0.85;
      const centerY = -400;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      
      const time = Date.now() / 8000;
      for (let i = 0; i < 5; i++) {
        const offset = i * 450 - 1200;
        const width = 500 + Math.sin(time + i) * 200;
        const rayGrad = ctx.createLinearGradient(centerX + offset, centerY, centerX + offset - 1000, canvas.height);
        
        const flicker = 0.04 + Math.sin(time * 1.5 + i) * 0.02;
        rayGrad.addColorStop(0, `rgba(255, 255, 250, ${flicker})`);
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.moveTo(centerX + offset - width/2, centerY);
        ctx.lineTo(centerX + offset + width/2, centerY);
        ctx.lineTo(centerX + offset + width/2 - 1800, canvas.height);
        ctx.lineTo(centerX + offset - width/2 - 1800, canvas.height);
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDivineRays();

      ctx.globalCompositeOperation = 'lighter';
      const time = Date.now() * 0.001;

      particles.forEach((p, i) => {
        // 更新位置：稳步上升
        p.y += p.speedY;
        // 横向轻微摆动
        p.x += p.drift + Math.sin(time * 0.5 + p.sinOffset) * 0.2;
        p.pulse += p.pulseSpeed;

        // 计算高度透明度映射 (Fade In at bottom, Fade Out at top)
        const margin = 150;
        let edgeOpacity = 1;
        if (p.y > canvas.height - margin) {
          edgeOpacity = (canvas.height - p.y) / margin;
        } else if (p.y < margin) {
          edgeOpacity = p.y / margin;
        }

        // 结合呼吸闪烁效果
        const twinkle = (0.7 + Math.sin(p.pulse) * 0.3);
        const currentOpacity = Math.max(0, p.maxOpacity * edgeOpacity * twinkle);

        // 越界重置到屏幕下方
        if (p.y < -50) {
          particles[i] = createParticle(false);
        }

        // 绘制粒子辉光
        const glowRadius = p.size * 12;
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        gradient.addColorStop(0, p.glowColor.replace(/[\d\.]+\)$/, (currentOpacity * 0.8) + ')'));
        gradient.addColorStop(0.5, p.glowColor.replace(/[\d\.]+\)$/, (currentOpacity * 0.2) + ')'));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // 绘制粒子核心
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + currentOpacity + ')';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-[3000ms] ${active ? 'opacity-100' : 'opacity-0'}`}
    />
  );
};

export default AtmosphereOverlay;
