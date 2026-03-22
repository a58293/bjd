import React, { useState, useEffect, useRef } from 'react';
import { Goddess, Language } from '../types';
import { BASE_IMAGE_URL } from '../constants';
import { UI_TRANSLATIONS } from '../constants';

interface PortalViewProps {
  goddesses: Goddess[];
  currentLang: Language;
  onSelect: (view: 'GODDESS' | 'ANGEL', index?: number) => void;
}

const PortalView: React.FC<PortalViewProps> = ({ goddesses, currentLang, onSelect }) => {
  const [phase, setPhase] = useState<'intro' | 'selection'>('intro');
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollState = useRef({
    target: 0,
    current: 0,
    isDragging: false,
    startX: 0,
    startScroll: 0,
    distance: 0,
    velocity: 0,
    lastX: 0,
    lastTime: 0
  });
  const snapTimeout = useRef<NodeJS.Timeout | null>(null);
  const itemMetrics = useRef<{center: number}[]>([]);

  const getSnappedTarget = (projectedScroll: number) => {
    const container = scrollRef.current;
    if (!container || itemMetrics.current.length === 0) return projectedScroll;
    
    const containerWidth = container.clientWidth;
    const containerCenter = projectedScroll + containerWidth / 2;
    
    let closestIndex = 0;
    let minDistance = Infinity;
    
    itemMetrics.current.forEach((metric, index) => {
      const dist = Math.abs(metric.center - containerCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = index;
      }
    });
    
    const targetScroll = itemMetrics.current[closestIndex].center - containerWidth / 2;
    const maxScroll = container.scrollWidth - containerWidth;
    return Math.max(0, Math.min(targetScroll, maxScroll));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth Scroll & 3D Effect
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || phase !== 'selection') return;

    let animationFrameId: number;
    let containerWidth = container.clientWidth;
    let scrollWidth = container.scrollWidth;
    let maxScroll = scrollWidth - containerWidth;

    const updateMetrics = () => {
      containerWidth = container.clientWidth;
      scrollWidth = container.scrollWidth;
      maxScroll = scrollWidth - containerWidth;
      itemMetrics.current = itemRefs.current.map(item => {
        if (!item) return { center: 0 };
        return { center: item.offsetLeft + item.offsetWidth / 2 };
      });
    };

    updateMetrics();

    const handleResize = () => {
      updateMetrics();
      scrollState.current.target = getSnappedTarget(scrollState.current.current);
    };

    window.addEventListener('resize', handleResize);
    
    // Ensure metrics are correct after initial layout/transition
    setTimeout(handleResize, 100);
    setTimeout(handleResize, 500);

    // Initialize
    scrollState.current.target = container.scrollLeft;
    scrollState.current.current = container.scrollLeft;

    const updateFrame = () => {
      const state = scrollState.current;

      if (!state.isDragging) {
        // Lerp current to target for silky smooth momentum
        state.current += (state.target - state.current) * 0.08;
        
        if (Math.abs(state.target - state.current) < 0.5) {
          state.current = state.target;
        }

        // Apply scroll without native sync to avoid fighting with snap
        container.scrollLeft = state.current;
      } else {
        // If dragging, apply directly
        container.scrollLeft = state.current;
      }

      // 3D Transforms
      const scrollLeft = container.scrollLeft;
      const containerCenter = scrollLeft + containerWidth / 2;

      itemRefs.current.forEach((item, index) => {
        if (!item || !itemMetrics.current[index]) return;
        const itemCenter = itemMetrics.current[index].center;
        const distance = itemCenter - containerCenter;
        const normalizedDistance = distance / (containerWidth * 0.4); 
        
        const clampedDistance = Math.max(-2.5, Math.min(2.5, normalizedDistance));

        const rotateY = clampedDistance * -45; 
        const translateZ = Math.abs(clampedDistance) * -200; 
        const opacity = Math.max(0.15, 1 - Math.abs(clampedDistance) * 0.5);
        const zIndex = 100 - Math.abs(Math.round(clampedDistance * 10));

        item.style.transform = `perspective(1000px) translateZ(${translateZ}px) rotateY(${rotateY}deg)`;
        item.style.opacity = opacity.toString();
        item.style.zIndex = zIndex.toString();
      });

      animationFrameId = requestAnimationFrame(updateFrame);
    };

    updateFrame();

    const handleWheel = (e: WheelEvent) => {
      if (phase !== 'selection') return;
      e.preventDefault(); // Hijack all wheel events to prevent native scroll conflicts
      
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      scrollState.current.target += delta * 1.5;
      scrollState.current.target = Math.max(0, Math.min(scrollState.current.target, maxScroll));
      
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
      snapTimeout.current = setTimeout(() => {
        scrollState.current.target = getSnappedTarget(scrollState.current.target);
      }, 150);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('wheel', handleWheel);
      if (snapTimeout.current) clearTimeout(snapTimeout.current);
    };
  }, [phase]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    const state = scrollState.current;
    state.isDragging = true;
    state.distance = 0;
    state.startX = e.pageX;
    state.startScroll = state.current;
    state.lastX = e.pageX;
    state.lastTime = Date.now();
    state.velocity = 0;
    if (snapTimeout.current) clearTimeout(snapTimeout.current);
  };

  const handleMouseLeave = () => {
    const state = scrollState.current;
    if (state.isDragging) {
      state.isDragging = false;
      const maxScroll = scrollRef.current ? scrollRef.current.scrollWidth - scrollRef.current.clientWidth : 0;
      let projectedTarget = state.current - state.velocity * 150;
      projectedTarget = Math.max(0, Math.min(projectedTarget, maxScroll));
      state.target = getSnappedTarget(projectedTarget);
    }
  };

  const handleMouseUp = () => {
    const state = scrollState.current;
    if (state.isDragging) {
      state.isDragging = false;
      const maxScroll = scrollRef.current ? scrollRef.current.scrollWidth - scrollRef.current.clientWidth : 0;
      let projectedTarget = state.current - state.velocity * 150;
      projectedTarget = Math.max(0, Math.min(projectedTarget, maxScroll));
      state.target = getSnappedTarget(projectedTarget);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const state = scrollState.current;
    if (!state.isDragging || !scrollRef.current) return;
    e.preventDefault();
    
    const x = e.pageX;
    const walk = (x - state.startX) * 1.5;
    
    state.current = state.startScroll - walk;
    state.target = state.current;
    
    const now = Date.now();
    const dt = now - state.lastTime;
    if (dt > 0) {
      state.velocity = (x - state.lastX) / dt;
      state.lastX = x;
      state.lastTime = now;
    }
    
    state.distance = Math.abs(x - state.startX);
  };

  const handlePlaqueClick = (index: number) => {
    if (scrollState.current.distance > 20) return; // Ignore click if it was a drag
    onSelect('GODDESS', index);
  };

  const ui = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS['zh'];
  const isCJK = ['zh', 'ja', 'ko'].includes(currentLang);
  
  let titleFont = 'font-serif font-bold uppercase';
  if (currentLang === 'zh') titleFont = 'font-brush';
  else if (currentLang === 'ja') titleFont = 'font-jp font-bold';
  else if (currentLang === 'ko') titleFont = 'font-kr font-bold';

  return (
    <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
      
      {/* Background Image that pushes forward (向前推) */}
      <div 
        className={`absolute inset-0 transition-all duration-[3000ms] cubic-bezier(0.25, 1, 0.5, 1) origin-center ${
          phase === 'intro' 
            ? 'scale-100 opacity-100 blur-0' 
            : 'scale-[2.5] opacity-30 blur-2xl'
        }`}
      >
        <img 
          src={`${BASE_IMAGE_URL}/portal-bg.webp`} 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={(e) => { e.currentTarget.src = 'https://picsum.photos/seed/shanhai/1920/1080'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
      </div>

      {/* Intro Text */}
      <div 
        className={`absolute z-30 flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all duration-1000 ${
          phase === 'intro' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-20 pointer-events-none'
        }`}
        onClick={() => setPhase('selection')}
      >
        <h1 className={`${titleFont} text-4xl lg:text-7xl text-white tracking-[0.2em] mb-6 lg:mb-8 drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`}>
          {isCJK ? '开启 · 花神卷' : 'Open · Floral Scroll'}
        </h1>
        <div className="flex flex-col items-center gap-4 opacity-70 animate-pulse">
          <span className="text-white tracking-[0.3em] lg:tracking-[0.5em] text-xs lg:text-base uppercase font-light">
            {isCJK ? '四时有序，万卉循时而开' : 'Seasons in order, flowers bloom in time'}
          </span>
          <div className="w-[1px] h-8 lg:h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>

      {/* Jade Plaques Selection (玉牌) */}
      <div 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`absolute z-40 w-full h-full flex items-center overflow-x-auto overflow-y-hidden no-scrollbar px-[calc(50vw-80px)] md:px-[calc(50vw-96px)] lg:px-[calc(50vw-128px)] landscape:px-[calc(50vw-64px)] sm:landscape:px-[calc(50vw-64px)] md:landscape:px-[calc(50vw-64px)] lg:landscape:px-[calc(50vw-128px)] gap-6 md:gap-8 lg:gap-16 transition-all duration-[2000ms] ease-out cursor-grab active:cursor-grabbing ${
          phase === 'selection' ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-32 pointer-events-none'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {goddesses.map((goddess, index) => (
          <div 
            key={goddess.id}
            ref={(el) => itemRefs.current[index] = el}
            className="relative shrink-0 w-40 h-[55vh] md:w-48 md:h-[60vh] lg:w-64 lg:h-[75vh] landscape:w-32 landscape:h-[65vh] sm:landscape:w-32 sm:landscape:h-[65vh] md:landscape:w-32 md:landscape:h-[65vh] lg:landscape:w-64 lg:landscape:h-[75vh] cursor-pointer group"
            onClick={() => handlePlaqueClick(index)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Inner Wrapper for styling */}
            <div className="absolute inset-0 rounded-md overflow-hidden border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:border-white/60 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all duration-500">
              {/* Plaque Background Image */}
              <img 
                src={goddess.plaqueImage || goddess.image || `https://picsum.photos/seed/flower${index}/400/800`} 
                alt={goddess.id} 
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-[1500ms] ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = `https://picsum.photos/seed/flower${index}/400/800`; }}
              />
              
              {/* Plaque Inner Gradient for Jade effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-black/20 to-black/90 group-hover:from-emerald-900/50 transition-colors duration-700 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
              
              {/* Plaque Content */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col items-center justify-between">
                {/* Top Ornament (Jade hole/tassel representation) */}
                <div className="flex flex-col items-center gap-2 mt-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full border border-white/50" />
                  <div className="w-[1px] h-4 md:h-6 bg-white/30" />
                </div>
                
                {/* Name */}
                <div className="flex-1 flex items-center justify-center py-4 md:py-8">
                  <span className={`leading-none text-white/95 text-2xl md:text-3xl lg:text-4xl landscape:text-xl sm:landscape:text-xl md:landscape:text-xl lg:landscape:text-4xl tracking-[0.2em] lg:tracking-[0.3em] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:text-white group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-all duration-500 ${titleFont} ${isCJK ? 'writing-v' : 'writing-v-en rotate-180'}`}>
                    {goddess.translations[currentLang]?.name || goddess.id}
                  </span>
                </div>
                
                {/* Bottom Ornament */}
                <div className="flex flex-col items-center gap-2 md:gap-3 mb-2">
                  <span className="text-white/50 text-[9px] md:text-[10px] landscape:text-[8px] sm:landscape:text-[8px] md:landscape:text-[8px] lg:landscape:text-[10px] tracking-widest uppercase group-hover:text-white/90 transition-colors">
                    {index === 0 ? (isCJK ? '百花之首' : 'Origin') : (isCJK ? `${index}月令` : `Month ${index}`)}
                  </span>
                  <div className="w-6 md:w-8 h-[1px] bg-white/30" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Back button when in selection phase */}
      <div 
        className={`absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 z-50 transition-all duration-1000 ${
          phase === 'selection' ? 'opacity-100 delay-[1000ms]' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button 
          onClick={() => setPhase('intro')}
          className="px-6 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white/70 hover:text-white hover:bg-white/10 hover:border-white/40 text-[10px] lg:text-xs tracking-[0.3em] uppercase transition-all"
        >
          {isCJK ? '返回' : 'Back'}
        </button>
      </div>
    </div>
  );
};

export default PortalView;
