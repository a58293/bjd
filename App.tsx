import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GODDESS_DATA, UI_TRANSLATIONS } from './constants';
import { Goddess, Language } from './types';
import InfoOverlay from './components/InfoOverlay';
import PetalOverlay from './components/PetalOverlay';
import AtmosphereOverlay from './components/AtmosphereOverlay';
import ShopModal from './components/ShopModal';
import VideoModal from './components/VideoModal';
import WaitingModal from './components/WaitingModal';
import SelectionBar from './components/SelectionBar';

type ActiveView = 'GODDESS' | 'ANGEL';
type InfoSection = 'NONE' | 'ABOUT' | 'NOTICE' | 'CUSTOM' | 'CONTACT';

const App: React.FC = () => {
  const [goddesses, setGoddesses] = useState<Goddess[]>(GODDESS_DATA);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLang, setCurrentLang] = useState<Language>('zh');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [activeSample, setActiveSample] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  
  // 状态管理
  const [playingPvUrl, setPlayingPvUrl] = useState<string | null>(null);
  const [showWaitingModal, setShowWaitingModal] = useState(false); 

  // 默认进入花神卷
  const [activeView, setActiveView] = useState('GODDESS' as ActiveView); 
  const [activeInfo, setActiveInfo] = useState('NONE' as InfoSection);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const selectedGoddess = goddesses[currentIndex];
  
  const getLangData = (g: Goddess, lang: Language) => {
    if (g.translations[lang]) return g.translations[lang];
    if (!['zh', 'ja', 'ko'].includes(lang) && g.translations['en']) {
        return g.translations['en'];
    }
    return g.translations['zh'];
  };
  
  const langData = getLangData(selectedGoddess, currentLang);
  const ui = UI_TRANSLATIONS[currentLang];
  const isTransitioningRef = useRef(false);

  const isRTL = currentLang === 'ar';
  const isCJK = ['zh', 'ja', 'ko'].includes(currentLang);
  
  // 字体配置
  let titleFont = 'font-serif font-bold uppercase';
  if (currentLang === 'zh') titleFont = 'font-brush';
  else if (currentLang === 'ja') titleFont = 'font-jp font-bold';
  else if (currentLang === 'ko') titleFont = 'font-kr font-bold';

  /**
   * 智能排版系统
   * 根据语言特性和屏幕比例返回最佳样式
   */
  const getAdaptiveTitleStyle = (lang: Language): { className: string; style: React.CSSProperties } => {
      const isArabic = lang === 'ar';
      const isCJK = ['zh', 'ja', 'ko'].includes(lang);

      if (isArabic) {
          // 阿拉伯语：强制横排，基于宽度缩放，确保在任何屏幕都不会过大
          return {
              className: `text-right leading-tight break-words max-w-[80vw] lg:max-w-[50vw]`,
              style: {
                  fontSize: 'clamp(2.5rem, 6vw, 6rem)', // 最小2.5rem，首选视口宽度的6%，最大6rem
                  direction: 'rtl'
              }
          };
      } else if (isCJK) {
          // CJK：桌面端竖排，基于高度缩放
          return {
              className: `lg:writing-v whitespace-nowrap lg:whitespace-normal leading-normal text-center lg:text-left`,
              style: {
                  // 桌面端字号基于视口高度(vh)，移动端基于宽度(vw)
                  fontSize: 'clamp(2.5rem, 11vh, 8.5rem)' 
              }
          };
      } else {
          // 西文 (English/French)：改为横排，支持长文字自动换行
          return {
              className: `leading-[0.9] tracking-widest text-center lg:text-left whitespace-normal max-w-[90vw] lg:max-w-[50vw] break-words uppercase`,
              style: {
                  fontSize: 'clamp(3rem, 5vw, 7rem)'
              }
          };
      }
  };

  const titleStyle = getAdaptiveTitleStyle(currentLang);

  const performChange = useCallback((newIndex: number) => {
    if (isTransitioningRef.current) return;
    setIsTransitioning(true);
    isTransitioningRef.current = true;
    setActiveSample(null); 
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setIsTransitioning(false);
        isTransitioningRef.current = false;
      }, 50);
    }, 600);
  }, []);

  const handleViewSwitch = (view: ActiveView) => {
    setActiveView(view);
  };

  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e: TouchEvent) => {
      if (activeView !== 'GODDESS') return;
      if (activeSample || activeInfo !== 'NONE' || isTransitioningRef.current || showShopModal || showDetail || playingPvUrl || showWaitingModal) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 50) { 
        if (diff > 0) { 
           const next = (currentIndex + 1) % goddesses.length;
           performChange(next);
        } else { 
           const prev = (currentIndex - 1 + goddesses.length) % goddesses.length;
           performChange(prev);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (activeView !== 'GODDESS') return;
      if (activeSample || activeInfo !== 'NONE' || isTransitioningRef.current || showShopModal || showDetail || playingPvUrl || showWaitingModal) return;
      if (Math.abs(e.deltaY) < 30) return;

      if (e.deltaY > 0) {
        const next = (currentIndex + 1) % goddesses.length;
        performChange(next);
      } else {
        const prev = (currentIndex - 1 + goddesses.length) % goddesses.length;
        performChange(prev);
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, goddesses.length, showDetail, activeSample, activeInfo, performChange, showShopModal, playingPvUrl, showWaitingModal, activeView]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderTitle = (text: string) => {
    if (isRTL) {
        return (
            <span className={`inline-block transition-all duration-[1200ms] ease-out ${isTransitioning ? 'opacity-0 translate-y-8 blur-md' : 'opacity-100 translate-y-0 blur-0'}`}>
                {text}
            </span>
        );
    }
    
    if (isCJK) {
      return text.split('').map((char, i) => (
        <span key={i} className={`inline-block transition-all duration-[1200ms] cubic-bezier(0.19, 1, 0.22, 1) ${isTransitioning ? 'opacity-0 translate-y-12 blur-sm scale-95' : 'opacity-100 translate-y-0 blur-0 scale-100'}`} 
          style={{ transitionDelay: `${i * 120}ms` }}>{char}</span>
      ));
    }
    return (
      <span className={`inline-block transition-all duration-[1200ms] ease-out ${isTransitioning ? 'opacity-0 translate-y-8 blur-md' : 'opacity-100 translate-y-0 blur-0'}`}>
        {text}
      </span>
    );
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'zh', label: '中' },
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'AR' },
    { code: 'ja', label: '日' },
    { code: 'ko', label: '한' }
  ];

  const handlePlayPV = () => {
    if (selectedGoddess.pvUrl && selectedGoddess.pvUrl.trim() !== '') {
        setPlayingPvUrl(selectedGoddess.pvUrl);
    } else {
        setShowWaitingModal(true);
    }
  };

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={currentLang}
      className={`relative w-screen h-screen transition-all duration-[1500ms] ${activeView === 'GODDESS' ? 'bg-[#050505]' : 'bg-[#040508]'} text-[#e5e5e5] overflow-hidden select-none font-serif`}
    >
      <PetalOverlay active={activeView === 'GODDESS'} color={selectedGoddess.color} goddessId={selectedGoddess.id} />
      <AtmosphereOverlay active={activeView === 'ANGEL'} mousePos={mousePos} />

      {/* 侧边选择栏 - 增加 isRTL 属性，使其在阿拉伯语下位于左侧 */}
      {activeView === 'GODDESS' && !showDetail && !showShopModal && !playingPvUrl && !showWaitingModal && (
        <SelectionBar 
          selectedId={selectedGoddess.id} 
          allGoddesses={goddesses} 
          isRTL={isRTL}
          onSelect={(g) => {
             const idx = goddesses.findIndex(item => item.id === g.id);
             performChange(idx);
          }} 
        />
      )}

      {/* 背景图层 */}
      <div 
        className={`absolute inset-0 z-10 transition-all duration-[2000ms] ease-in-out ${isTransitioning ? 'opacity-0 scale-[1.02] blur-xl' : 'opacity-100 scale-100'}`}
        style={{ filter: (showDetail || showShopModal || playingPvUrl || showWaitingModal) ? 'blur(50px) brightness(0.15)' : 'none' }}
      >
        <div className="relative w-full h-full">
          <div 
            className="w-full h-full transition-all duration-[12000ms] ease-out"
            style={{ transform: activeView === 'GODDESS' ? `scale(1.1) translate(${(mousePos.x - 0.5) * -20}px, ${(mousePos.y - 0.5) * -20}px)` : 'none' }}
          >
            {activeView === 'GODDESS' && (
                <img 
                key={selectedGoddess.localUrl || selectedGoddess.image}
                src={selectedGoddess.localUrl || selectedGoddess.image} 
                className={`w-full h-full object-cover transition-all duration-[3000ms] ${selectedGoddess.id === 'hundred-flowers' ? 'opacity-70' : 'opacity-40'}`}
                alt=""
                />
            )}
          </div>
          <div className="absolute inset-0 vignette pointer-events-none opacity-80" />
        </div>
      </div>

      {/* 顶部视图切换开关 - RTL 下移至左侧 */}
      <div className={`fixed top-6 lg:top-8 z-50 flex items-center gap-6 transition-all duration-1000 
          ${isRTL ? 'left-6 lg:left-12' : 'right-6 lg:right-12'}
          ${showDetail ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
      `}>
        <button 
          onClick={() => handleViewSwitch('GODDESS')}
          className={`text-[10px] lg:text-[11px] tracking-[0.2em] font-bold uppercase transition-colors duration-500 ${activeView === 'GODDESS' ? 'text-amber-500' : 'text-white/30 hover:text-white'}`}
        >
          {ui.viewGoddess}
        </button>
        <div className="w-1 h-1 rounded-full bg-white/10" />
        <button 
          onClick={() => handleViewSwitch('ANGEL')}
          className={`text-[10px] lg:text-[11px] tracking-[0.2em] font-bold uppercase transition-colors duration-500 ${activeView === 'ANGEL' ? 'text-amber-500' : 'text-white/30 hover:text-white'}`}
        >
          {ui.viewAngel}
        </button>
      </div>
      
      {/* 导航栏 */}
      <nav className={`fixed z-50 transition-all duration-1000 
         lg:top-0 lg:bottom-0 lg:w-32 lg:flex-col lg:justify-center lg:h-full lg:bg-transparent lg:border-none
         bottom-0 left-0 right-0 h-20 flex flex-row items-center justify-evenly bg-black/90 backdrop-blur-xl border-t border-white/10 pb-4 lg:pb-0
         ${isRTL ? 'lg:right-0' : 'lg:left-0'} 
         ${showDetail ? 'opacity-0 pointer-events-none translate-y-10 lg:translate-y-0' : 'opacity-100 translate-y-0'}
      `}>
        <div className="flex lg:flex-col flex-row gap-0 lg:gap-14 w-full lg:w-auto justify-evenly lg:justify-start">
          {ui.nav.map((label: string, i: number) => (
            <button key={i} onClick={() => setActiveInfo(['ABOUT','NOTICE','CUSTOM','CONTACT'][i] as InfoSection)} className="group relative flex lg:flex-col flex-col items-center gap-1 lg:gap-3 py-2 w-16 lg:w-auto">
              <span className="text-[8px] lg:text-[9px] font-black tracking-widest text-white/10 group-hover:text-amber-500/40 transition-all">0{i+1}</span>
              <span className={`
                transition-all duration-700 text-white/30 group-hover:text-white
                ${isCJK 
                  ? 'lg:writing-v text-[12px] lg:text-[16px] tracking-[0.2em] lg:tracking-[0.8em]' 
                  : 'lg:writing-h text-[9px] lg:text-[11px] uppercase tracking-[0.1em] lg:tracking-[0.2em] lg:-rotate-90 lg:w-4 lg:h-24 flex items-center justify-center whitespace-nowrap'
                }
              `}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* 主展示区 */}
      <main className={`relative z-30 w-full h-full flex items-center transition-all duration-[1200ms] 
         ${activeView === 'GODDESS' 
           ? (isRTL ? 'justify-center lg:justify-start lg:pr-48' : 'justify-center lg:justify-start lg:pl-48')
           : 'justify-center'
         }
      `}>
        {activeView === 'GODDESS' ? (
          <div key={selectedGoddess.id} className={`w-full max-w-[90vw] lg:max-w-[70vw] flex flex-col items-center lg:items-start text-center lg:text-left ${isRTL ? 'lg:items-end lg:text-right' : ''}`}>
            <div className={`transition-all duration-1000 ${showDetail ? 'opacity-0 blur-xl translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
              
              {/* 副标题 & 百花女神特殊标记 */}
              <div className={`flex items-center justify-center lg:justify-start gap-4 lg:gap-6 mb-6 lg:mb-12 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
                {/* 如果是百花女神，显示特殊Badge */}
                {selectedGoddess.type === 'HUNDRED' ? (
                     <div className="px-3 py-1 border border-amber-500/50 rounded-full bg-amber-500/10">
                        <span className="text-[9px] text-amber-500 tracking-widest font-bold">THE PRIME · 司春</span>
                     </div>
                ) : (
                    <div className="h-[1px] w-8 lg:w-12 bg-white/30" />
                )}
                
                <span className={`uppercase font-light text-white/50 
                   ${isCJK ? 'text-[12px] tracking-[0.6em] whitespace-nowrap' : 'text-[10px] tracking-[0.3em] whitespace-normal'}
                `}>{langData.title}</span>
                
                {selectedGoddess.type !== 'HUNDRED' && <div className="lg:hidden h-[1px] w-8 bg-white/30" />}
              </div>
              
              {/* 主标题 - 应用智能适配样式 */}
              <div className="group/namebox cursor-pointer mb-8 lg:mb-16 relative" onClick={() => setShowDetail(true)}>
                <h1 
                    className={`${titleFont} transition-all duration-700 group-hover/namebox:scale-[1.02] text-white/95 ${titleStyle.className}`}
                    style={titleStyle.style}
                >
                  {renderTitle(langData.name)}
                </h1>
              </div>

              {/* 按钮 */}
              <button onClick={() => setShowDetail(true)}
                className="group relative flex items-center gap-4 lg:gap-10 py-4 lg:py-10 px-6 lg:px-14 transition-all duration-1000 mx-auto lg:mx-0">
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl rounded-sm border border-white/10 group-hover:bg-white/[0.07] group-hover:border-white/20" />
                <div className="relative w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 lg:w-3 h-2 lg:h-3 rounded-full animate-pulse" style={{ backgroundColor: selectedGoddess.color, boxShadow: `0 0 25px ${selectedGoddess.color}` }} />
                </div>
                <span className={`relative z-10 text-white/90 font-black uppercase whitespace-nowrap
                   ${isCJK ? 'tracking-[0.3em] lg:tracking-[0.5em] text-[14px] lg:text-[18px]' : 'tracking-[0.2em] text-[10px] lg:text-[14px]'}
                `}>{ui.openArchive}</span>
              </button>
            </div>

            {/* 详情页 */}
            {showDetail && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center lg:p-12 animate-fadeIn bg-black/90 lg:bg-transparent" onClick={() => setShowDetail(false)}>
                <div dir={isRTL ? 'rtl' : 'ltr'} 
                  className="relative w-full h-full lg:max-w-7xl lg:max-h-[85vh] flex flex-col lg:flex-row bg-black/50 lg:backdrop-blur-3xl lg:border lg:border-white/10 lg:shadow-2xl overflow-hidden cursor-default" 
                  onClick={e => e.stopPropagation()}
                >
                  
                  <button onClick={() => setShowDetail(false)} className="lg:hidden absolute top-6 right-6 z-[120] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white/70">✕</button>

                  <div className={`
                    shrink-0 p-8 lg:p-12 flex flex-col items-start lg:items-center justify-center lg:justify-center gap-4 lg:gap-10 relative
                    border-b border-white/10 lg:border-b-0 lg:w-[18rem]
                    ${isRTL ? 'lg:border-l' : 'lg:border-r'}
                  `}>
                    {/* 详情页标题同样适配 */}
                    <h2 className={`${titleFont} text-white/90 mt-8 lg:mt-0 ${isCJK ? 'lg:writing-v text-4xl lg:text-7xl' : (isRTL ? 'text-4xl text-right' : 'lg:writing-v-en lg:rotate-180 text-4xl lg:text-6xl text-center')}`}>
                      {langData.name}
                    </h2>
                    
                    {isCJK && <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-white/20 to-transparent" />}
                    
                    <span className="text-[9px] lg:text-[11px] tracking-[0.3em] lg:tracking-[0.5em] text-white/30 uppercase font-black whitespace-nowrap">{ui.detailLabel}</span>
                  </div>

                  <div className="flex-1 p-8 lg:p-20 flex flex-col relative overflow-y-auto no-scrollbar">
                    <div className="mb-8 lg:mb-12 shrink-0">
                        <h3 className={`text-white/90 mb-4 lg:mb-6 font-light
                           ${isCJK ? 'text-2xl lg:text-3xl tracking-[0.2em]' : 'text-xl lg:text-3xl tracking-[0.1em] uppercase'}
                        `}>{langData.shortDesc}</h3>
                        <div className="w-16 lg:w-20 h-[2px]" style={{ background: selectedGoddess.color }} />
                    </div>
                    
                    <div className="shrink-0 mb-8">
                        <p className={`text-white/60 font-serif font-light
                           ${isCJK 
                             ? 'text-[15px] lg:text-[16px] tracking-[0.1em] text-justify leading-relaxed' 
                             : 'text-[13px] lg:text-[15px] tracking-[0.05em] leading-[2.2] text-left'
                           }
                           ${isRTL ? 'text-right' : ''}
                        `}>{langData.description}</p>
                    </div>

                    {/* 移动端素材图 */}
                    <div className="lg:hidden w-full flex gap-4 overflow-x-auto no-scrollbar mb-8 pb-4">
                        {selectedGoddess.samples?.map((s, i) => (
                           <img 
                              key={i} 
                              src={s} 
                              onClick={() => setActiveSample(s)} 
                              className="h-32 aspect-square object-cover rounded-sm border border-white/10" 
                              alt="" 
                           />
                        ))}
                    </div>

                    <div className="mt-auto pt-6 lg:pt-10 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 shrink-0 pb-20 lg:pb-0">
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full lg:w-auto">
                            <button onClick={handlePlayPV} className="w-full lg:w-auto px-6 lg:px-8 py-4 rounded-full bg-white/5 border border-white/10 text-[12px] tracking-widest hover:bg-white/10 transition-all uppercase whitespace-nowrap">{ui.enterRealm}</button>
                            <button onClick={() => setShowShopModal(true)} className="w-full lg:w-auto px-6 lg:px-8 py-4 rounded-full bg-white/5 border border-white/10 text-[12px] tracking-widest hover:bg-white/10 transition-all uppercase whitespace-nowrap">{ui.visitShop}</button>
                        </div>
                        <div className="text-right w-full lg:w-auto">
                           <span className="text-[14px] lg:text-[16px] font-bold tracking-widest" style={{ color: selectedGoddess.color }}>{langData.flower}</span>
                        </div>
                    </div>
                  </div>

                  {/* 桌面端素材栏 */}
                  <div className="hidden lg:flex w-80 bg-black/40 p-10 flex-col gap-6 border-white/5 border-l">
                    <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-black">{ui.artifacts}</span>
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
                      {selectedGoddess.samples?.map((s, i) => (
                        <img 
                          key={i} 
                          src={s} 
                          onError={(e) => e.currentTarget.style.display = 'none'}
                          onClick={() => setActiveSample(s)} 
                          className="w-full aspect-square object-cover opacity-60 hover:opacity-100 transition-all cursor-zoom-in rounded-sm border border-white/5 hover:border-white/20" 
                          alt="" 
                        />
                      ))}
                    </div>
                    <button onClick={() => setShowDetail(false)} className="py-6 text-[11px] tracking-[1em] text-white/30 hover:text-white uppercase border-t border-white/10">{ui.close}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center text-center animate-fadeIn px-6">
            <p className={`font-light text-white opacity-30 whitespace-nowrap
              ${isCJK ? 'text-[clamp(1.5rem,4vw,5rem)] tracking-[0.5em] lg:tracking-[1em]' : 'text-[clamp(1.2rem,3vw,3rem)] tracking-[0.2em] lg:tracking-[0.5em] uppercase'}`}>
              {isCJK ? '万籁俱寂 静候微芒' : 'Silence Awaits The Light'}
            </p>
          </div>
        )}
      </main>

      {/* 语言切换 & 功能按钮 */}
      <div className={`fixed z-[60] flex flex-col gap-6 
          top-6 left-6 items-start
          lg:top-auto lg:left-auto lg:bottom-12 lg:right-12 lg:items-end
          ${isRTL ? 'lg:left-12 lg:right-auto' : ''}
      `}>
        <div className="flex flex-col lg:items-end items-start gap-4">
          <div className={`flex flex-col gap-3 transition-all duration-700 ${showLangMenu ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 lg:translate-y-12 pointer-events-none'}`}>
            {languages.map(lang => (
              <button key={lang.code} onClick={() => { setCurrentLang(lang.code); setShowLangMenu(false); }}
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border text-[10px] lg:text-[11px] font-bold transition-all ${currentLang === lang.code ? 'bg-amber-500 border-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-black/70 border-white/10 text-white/50 hover:border-white/40'}`}>
                {lang.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
             <button onClick={() => setShowLangMenu(!showLangMenu)} className="w-10 h-10 lg:w-14 lg:h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-2xl flex items-center justify-center text-[10px] lg:text-[13px] text-white/80 hover:border-white/50 transition-all uppercase">
                {ui.lang}
             </button>
          </div>
        </div>
      </div>

      {activeSample && (
        <div className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center cursor-zoom-out animate-fadeIn p-4" onClick={() => setActiveSample(null)}>
           <img src={activeSample} className="max-w-full max-h-full object-contain shadow-2xl" alt="" />
        </div>
      )}

      {showShopModal && <ShopModal goddess={selectedGoddess} currentLang={currentLang} onClose={() => setShowShopModal(false)} />}
      {playingPvUrl && <VideoModal url={playingPvUrl} onClose={() => setPlayingPvUrl(null)} />}
      {showWaitingModal && <WaitingModal message={langData.waitingMessage} color={selectedGoddess.color} onClose={() => setShowWaitingModal(false)} />}
      
      <InfoOverlay section={activeInfo} onClose={() => setActiveInfo('NONE')} />
    </div>
  );
};

export default App;