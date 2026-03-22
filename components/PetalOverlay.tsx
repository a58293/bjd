
import React, { useEffect, useRef } from 'react';

// 定义扩充后的物理模式
type PhysicsMode = 
  | 'NEBULA_CONVERGE' // 百花：星云汇聚
  | 'DRIVING_SNOW'    // 梅花：横向风雪
  | 'SPRING_RAIN'     // 杏花：垂直细雨
  | 'SPIRAL_GENTLE'   // 桃花：柔风回旋
  | 'RADIAL_BLOOM'    // 牡丹：中心绽放
  | 'RISING_EMBER'    // 石榴：炽热流火
  | 'RISE_BUBBLE'     // 荷花/水仙：水下气泡
  | 'UPWARD_DRIFT'    // 蜀葵：缓慢升腾
  | 'SUSPENDED_GOLD'  // 桂花：金粟悬浮
  | 'LATERAL_WIND'    // 菊花：东篱秋风
  | 'FROST_TWINKLE'   // 芙蓉：霜花闪烁
  | 'HEAVY_FALL';     // 山茶：重力落红

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  flip: number;
  flipSpeed: number;
  opacity: number;
  color: string;
  type: 'REAL_PETAL_1' | 'REAL_PETAL_2' | 'SHARP_STAR' | 'SOFT_GLOW' | 'GOLD_DUST' | 'RAIN_DROP';
  life: number;
  maxLife: number;
  swayFreq: number;
  swayAmp: number;
  physicsMode: PhysicsMode;
  // 特殊属性
  angle?: number;       
  radius?: number;      
  originX?: number;     
  originY?: number;
}

const PetalOverlay: React.FC<{ active: boolean; color?: string; goddessId: string }> = ({ active, color = '#ffffff', goddessId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // 根据花神ID配置独特的物理系统
    const getSystemConfig = (id: string) => {
      switch(id) {
        case 'hundred-flowers':
          // 移除 SOFT_GLOW，改用花瓣和星芒，避免光球造成的脏感
          return { count: 160, types: ['REAL_PETAL_1', 'REAL_PETAL_2', 'SHARP_STAR'], physics: 'NEBULA_CONVERGE', baseSize: 1.1 };
        
        case 'plum-blossom': // 梅花 - 风雪
          return { count: 120, types: ['REAL_PETAL_2', 'GOLD_DUST'], physics: 'DRIVING_SNOW', baseSize: 0.8 };
        
        case 'apricot': // 杏花 - 烟雨
          return { count: 150, types: ['RAIN_DROP', 'REAL_PETAL_2'], physics: 'SPRING_RAIN', baseSize: 1.0 };
        
        case 'peach-blossom': // 桃花 - 柔风
          return { count: 60, types: ['REAL_PETAL_1'], physics: 'SPIRAL_GENTLE', baseSize: 1.2 };
        
        case 'peony': // 牡丹 - 绽放
          return { count: 60, types: ['REAL_PETAL_1', 'SOFT_GLOW'], physics: 'RADIAL_BLOOM', baseSize: 1.8 };
        
        case 'pomegranate': // 石榴 - 流火
          return { count: 100, types: ['SOFT_GLOW', 'GOLD_DUST'], physics: 'RISING_EMBER', baseSize: 1.0 };
        
        case 'lotus': 
        case 'narcissus': // 荷花/水仙 - 气泡
          return { count: 70, types: ['SOFT_GLOW', 'REAL_PETAL_2'], physics: 'RISE_BUBBLE', baseSize: 1.2 };
        
        case 'hollyhock': // 蜀葵 - 升腾
          return { count: 60, types: ['REAL_PETAL_2'], physics: 'UPWARD_DRIFT', baseSize: 1.3 };
        
        case 'osmanthus': // 桂花 - 悬浮
          return { count: 300, types: ['GOLD_DUST'], physics: 'SUSPENDED_GOLD', baseSize: 0.7 };
        
        case 'chrysanthemum': // 菊花 - 秋风
          return { count: 80, types: ['REAL_PETAL_2'], physics: 'LATERAL_WIND', baseSize: 1.1 };
        
        case 'cotton-rose': // 芙蓉 - 霜冻
          return { count: 100, types: ['SHARP_STAR'], physics: 'FROST_TWINKLE', baseSize: 1.5 };
        
        case 'camellia': // 山茶 - 落红
        default:
          return { count: 50, types: ['REAL_PETAL_1'], physics: 'HEAVY_FALL', baseSize: 1.4 };
      }
    };

    const config = getSystemConfig(goddessId);

    const createParticle = (isInit = false): Particle => {
      const pType = config.types[Math.floor(Math.random() * config.types.length)] as any;
      const physics = config.physics as any;
      
      let x = 0, y = 0, vx = 0, vy = 0, angle = 0, radius = 0;
      
      // --- 初始位置与速度策略 ---
      const w = canvas.width;
      const h = canvas.height;

      if (physics === 'NEBULA_CONVERGE') {
        const maxDist = Math.max(w, h) * 0.7;
        angle = Math.random() * Math.PI * 2;
        radius = isInit ? 180 + Math.random() * (maxDist - 180) : maxDist + Math.random() * 100;
        x = w / 2 + Math.cos(angle) * radius;
        y = h / 2 + Math.sin(angle) * radius;
      } 
      else if (physics === 'DRIVING_SNOW') { 
        x = isInit ? Math.random() * w : w + 20;
        y = Math.random() * h;
        vx = -(Math.random() * 3 + 2); 
        vy = Math.random() * 1 + 0.5;  
      }
      else if (physics === 'SPRING_RAIN') { 
        x = Math.random() * w;
        y = isInit ? Math.random() * h : -50;
        vy = Math.random() * 5 + 8; 
      }
      else if (physics === 'RADIAL_BLOOM') { 
        x = w / 2 + (Math.random() - 0.5) * 20; 
        y = h / 2 + (Math.random() - 0.5) * 20;
        angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.0 + 1.0; 
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      }
      else if (physics === 'RISING_EMBER' || physics === 'UPWARD_DRIFT') { 
        x = Math.random() * w;
        y = isInit ? Math.random() * h : h + 20;
        vy = physics === 'RISING_EMBER' ? -(Math.random() * 2 + 1) : -(Math.random() * 0.8 + 0.2);
      }
      else if (physics === 'LATERAL_WIND') { 
        x = isInit ? Math.random() * w : w + 20;
        y = Math.random() * h;
        vx = -(Math.random() * 1 + 0.5);
        vy = Math.random() * 0.5 - 0.2;
      }
      else if (physics === 'SUSPENDED_GOLD') {
        // 桂花初始分布：全屏随机，或者从顶部慢慢落下
        x = Math.random() * w;
        y = isInit ? Math.random() * h : -10; // 新生成的从顶部开始
      }
      else { 
        x = Math.random() * w;
        y = isInit ? Math.random() * h : (physics === 'HEAVY_FALL' ? -20 : Math.random() * h);
        if (physics === 'HEAVY_FALL') vy = Math.random() * 2 + 1.5;
      }

      // --- 颜色处理 ---
      let finalColor = color;
      if (goddessId === 'hundred-flowers') {
          const variants = [color, '#E8D1FF', '#F2EAFF', '#E0F4FF'];
          finalColor = variants[Math.floor(Math.random() * variants.length)];
      }
      if (goddessId === 'plum-blossom' && Math.random() > 0.5) finalColor = '#FFFFFF';

      // --- 尺寸处理 ---
      let size = (Math.random() * 3 + 2) * config.baseSize; 
      if (pType === 'GOLD_DUST') size = Math.random() * 2.0 + 1.0; // 稍微调大一点点确保可见
      if (pType === 'SHARP_STAR') size = Math.random() * 2 + 0.5;
      if (pType === 'SOFT_GLOW') size = Math.random() * 20 + 10;
      if (pType === 'RAIN_DROP') size = Math.random() * 1 + 0.5;

      return {
        x, y, vx, vy,
        z: Math.random() * 0.5 + 0.5,
        size,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        flip: Math.random() * Math.PI,
        flipSpeed: Math.random() * 0.03 + 0.01,
        opacity: 0,
        color: finalColor,
        type: pType,
        life: 0,
        maxLife: 400 + Math.random() * 300,
        swayFreq: Math.random() * 0.02 + 0.01,
        swayAmp: Math.random() * 1 + 0.5,
        physicsMode: physics,
        angle: Math.random() * Math.PI * 2, // 确保有初始角度用于计算偏移
        radius,
        originX: x, 
        originY: y
      };
    };

    // 绘制具体形状
    const drawShape = (ctx: CanvasRenderingContext2D, p: Particle) => {
      ctx.beginPath();
      
      if (p.type === 'RAIN_DROP') {
          ctx.rect(0, 0, p.size * 0.5, p.size * 15);
          ctx.fill();
      } else if (p.type === 'REAL_PETAL_1') {
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
        ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();
      } else if (p.type === 'REAL_PETAL_2') {
        ctx.ellipse(0, 0, p.size * 0.3, p.size, 0, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === 'SHARP_STAR') {
        ctx.beginPath();
        ctx.moveTo(0, -p.size); 
        ctx.quadraticCurveTo(0.5, 0, p.size, 0);
        ctx.quadraticCurveTo(0.5, 0, 0, p.size);
        ctx.quadraticCurveTo(-0.5, 0, -p.size, 0);
        ctx.quadraticCurveTo(-0.5, 0, 0, -p.size);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)'; 
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, 0, p.size * 0.3, 0, Math.PI*2);
        ctx.fillStyle = p.color;
        ctx.fill();
      } else if (p.type === 'GOLD_DUST') {
        ctx.rect(-p.size/2, -p.size/2, p.size, p.size);
        ctx.fill();
      } else if (p.type === 'SOFT_GLOW') {
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.7)'); 
        grad.addColorStop(0.4, p.color); 
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)'); 
        ctx.fillStyle = grad;
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = Date.now() * 0.001;

      particles.forEach((p, i) => {
        p.life++;
        
        // 淡入淡出逻辑
        const fadeIn = 30;
        let targetOpacity = 1;
        
        if (p.physicsMode === 'FROST_TWINKLE') {
           targetOpacity = 0.5 + Math.sin(time * 3 + i) * 0.5;
        } else if (p.physicsMode === 'RISING_EMBER') {
           targetOpacity = 0.7 + Math.random() * 0.3;
        }

        if (p.life < fadeIn) p.opacity = (p.life / fadeIn) * targetOpacity;
        else if (p.life > p.maxLife - fadeIn) p.opacity = ((p.maxLife - p.life) / fadeIn) * targetOpacity;
        else p.opacity = targetOpacity;


        // --- 核心物理更新逻辑 ---
        
        switch (p.physicsMode) {
          case 'NEBULA_CONVERGE': 
             if (p.angle !== undefined && p.radius !== undefined) {
                const speed = 1.0 + Math.random() * 0.8;
                p.radius -= speed;
                p.angle += 0.003 + (50 / (p.radius + 100)) * 0.005;
                p.x = canvas.width / 2 + Math.cos(p.angle) * p.radius;
                p.y = canvas.height / 2 + Math.sin(p.angle) * p.radius * 0.8;
                
                const vanishRadius = 120;
                if (p.radius < vanishRadius + 100) {
                    const fade = Math.max(0, (p.radius - vanishRadius) / 100);
                    p.opacity = Math.min(p.opacity, fade);
                    if (p.radius < vanishRadius) particles[i] = createParticle(false);
                }
             }
             break;

          case 'DRIVING_SNOW': 
             p.x += p.vx;
             p.y += p.vy + Math.sin(time * 5 + i) * 0.5; 
             break;

          case 'SPRING_RAIN': 
             p.y += p.vy;
             break;

          case 'SPIRAL_GENTLE': 
             p.x += Math.sin(time + i) * 0.5;
             p.y += Math.cos(time * 0.8 + i) * 0.5;
             break;

          case 'RADIAL_BLOOM': 
             p.x += p.vx;
             p.y += p.vy;
             break;

          case 'RISING_EMBER': 
          case 'UPWARD_DRIFT': 
             p.y += p.vy;
             p.x += Math.sin(time * 2 + i) * 0.5; 
             break;

          case 'RISE_BUBBLE': 
             p.y -= Math.random() * 0.5 + 0.2;
             p.x += Math.sin(time + i) * 0.3;
             break;

          case 'SUSPENDED_GOLD': 
             // 桂花修复：改为清晰的缓慢飘落 + 柔和回旋，不再是微弱抖动
             p.y += 0.4; // 缓慢但可见的下落速度
             p.x += Math.sin(time * 0.8 + (p.angle || i)) * 0.4; // 优雅的左右摆动
             break;

          case 'LATERAL_WIND': 
             p.x += p.vx;
             p.y += p.vy + Math.sin(time * 2 + i) * 0.3;
             p.rotation += 0.05;
             break;
          
          case 'FROST_TWINKLE': 
             break;

          case 'HEAVY_FALL': 
          default:
             p.y += p.vy;
             p.x += Math.sin(time + i) * p.swayAmp;
             break;
        }

        // 旋转与翻转
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        // 越界重置
        const m = 50;
        const w = canvas.width;
        const h = canvas.height;
        let shouldReset = false;

        if (p.physicsMode !== 'NEBULA_CONVERGE') {
            if (p.opacity <= 0 && p.life > 50) shouldReset = true;
            if (p.life > p.maxLife) shouldReset = true;
            
            if (p.physicsMode === 'DRIVING_SNOW' || p.physicsMode === 'LATERAL_WIND') {
                if (p.x < -m) shouldReset = true;
            } else if (p.physicsMode === 'RISING_EMBER' || p.physicsMode === 'UPWARD_DRIFT' || p.physicsMode === 'RISE_BUBBLE') {
                if (p.y < -m) shouldReset = true;
            } else if (p.physicsMode === 'RADIAL_BLOOM') {
                 const dist = Math.sqrt((p.x - w/2)**2 + (p.y - h/2)**2);
                 if (dist > Math.max(w, h)/1.2) shouldReset = true; 
            } else if (p.physicsMode === 'SPRING_RAIN' || p.physicsMode === 'HEAVY_FALL' || p.physicsMode === 'SUSPENDED_GOLD') {
                // 增加 SUSPENDED_GOLD 的越界检测
                if (p.y > h + m) shouldReset = true;
            }
        }

        if (shouldReset) {
            particles[i] = createParticle(false);
        }

        // 绘制
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        
        // 翻转效果 (花瓣类)
        if (p.type.includes('PETAL')) {
            const scaleY = Math.abs(Math.cos(p.flip)); 
            ctx.scale(1, scaleY);
            ctx.globalCompositeOperation = 'source-over'; 
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 0;
            ctx.globalAlpha = p.opacity * 0.8;
            drawShape(ctx, p);
            
            // 高光
            ctx.globalAlpha = p.opacity * 0.3;
            ctx.fillStyle = '#ffffff';
            ctx.scale(0.5, 0.5); 
            drawShape(ctx, p);
        } else {
            // 光点类：使用 screen 滤色模式，消除黑圈
            ctx.globalCompositeOperation = 'screen'; 
            ctx.globalAlpha = p.opacity;
            if (p.type !== 'SOFT_GLOW' && p.type !== 'SHARP_STAR') {
                 ctx.fillStyle = p.color;
                 ctx.shadowColor = p.color;
                 ctx.shadowBlur = 10;
            }
            drawShape(ctx, p);
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(update);
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: config.count }, () => createParticle(true));
    };

    window.addEventListener('resize', resize);
    resize();
    update();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [active, color, goddessId]);

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none z-20 transition-opacity duration-[2000ms] ${active ? 'opacity-100' : 'opacity-0'}`} />;
};

export default PetalOverlay;
