
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GODDESS_DATA, UI_TRANSLATIONS } from './constants';
import { Goddess, Language } from './types';
import InfoOverlay from './components/InfoOverlay';
import PetalOverlay from './components/PetalOverlay';
import AtmosphereOverlay from './components/AtmosphereOverlay';
import ShopModal from './components/ShopModal';

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
  const [activeView, setActiveView] = useState('GODDESS' as ActiveView);
  const [activeInfo, setActiveInfo] = useState('NONE' as InfoSection);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const selectedGoddess = goddesses[currentIndex];
  
  // 改进的回退逻辑：获取当前语言数据，如果缺失，非CJK语言优先回退到英文
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
  
  // 字体策略：中日韩分别使用各自的衬线/毛笔字体，西方语言使用大写衬线
  let titleFont = 'font-serif font-bold uppercase';
  if (currentLang === 'zh') titleFont = 'font-brush';
  else if (currentLang === 'ja') titleFont = 'font-jp font-bold';
  else if (currentLang === 'ko') titleFont = 'font-kr font-bold';

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeSample || activeInfo !== 'NONE' || isTransitioningRef.current || showShopModal || showDetail) return;
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
    return () => window.removeEventListener('wheel', handleWheel);
  }, [currentIndex, goddesses.length, showDetail, activeSample, activeInfo, performChange, showShopModal]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const renderTitle = (text: string) => {
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

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={currentLang}
      className={`relative w-screen h-screen transition-all duration-[1500ms] ${activeView === 'GODDESS' ? 'bg-[#050505]' : 'bg-[#040508]'} text-[#e5e5e5] overflow-hidden select-none font-serif`}
    >
      <PetalOverlay active={activeView === 'GODDESS'} color={selectedGoddess.color} goddessId={selectedGoddess.id} />
      <AtmosphereOverlay active={activeView === 'ANGEL'} mousePos={mousePos} />

      <div 
        className={`absolute inset-0 z-10 transition-all duration-[2000ms] ease-in-out ${isTransitioning ? 'opacity-0 scale-[1.02] blur-xl' : 'opacity-100 scale-100'}`}
        style={{ filter: (showDetail || showShopModal) ? 'blur(50px) brightness(0.15)' : 'none' }}
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

      {/* 顶部视图切换开关 (Top Right) */}
      <div className={`fixed top-8 ${isRTL ? 'left-12' : 'right-12'} z-50 flex items-center gap-6 transition-all duration-1000 ${showDetail ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
        <button 
          onClick={() => setActiveView('GODDESS')}
          className={`text-[10px] lg:text-[11px] tracking-[0.2em] font-bold uppercase transition-colors duration-500 ${activeView === 'GODDESS' ? 'text-amber-500' : 'text-white/30 hover:text-white'}`}
        >
          {ui.viewGoddess}
        </button>
        <div className="w-[1px] h-3 bg-white/10" />
        <button 
          onClick={() => setActiveView('ANGEL')}
          className={`text-[10px] lg:text-[11px] tracking-[0.2em] font-bold uppercase transition-colors duration-500 ${activeView === 'ANGEL' ? 'text-amber-500' : 'text-white/30 hover:text-white'}`}
        >
          {ui.viewAngel}
        </button>
      </div>
      
      {/* 左侧导航 - 针对不同语言调整字号和间距 */}
      <nav className={`fixed ${isRTL ? 'right-0' : 'left-0'} top-0 bottom-0 w-24 lg:w-32 z-50 flex flex-col justify-center items-center transition-all duration-1000 ${showDetail ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex flex-col gap-10 lg:gap-14">
          {ui.nav.map((label: string, i: number) => (
            <button key={i} onClick={() => setActiveInfo(['ABOUT','NOTICE','CUSTOM','CONTACT'][i] as InfoSection)} className="group relative flex flex-col items-center gap-3 py-2">
              <span className="text-[9px] font-black tracking-widest text-white/10 group-hover:text-amber-500/40 transition-all">0{i+1}</span>
              <span className={`
                transition-all duration-700 text-white/30 group-hover:text-white
                ${isCJK 
                  ? 'writing-v text-[15px] lg:text-[16px] tracking-[0.6em] lg:tracking-[0.8em]' 
                  : 'writing-h text-[10px] lg:text-[11px] uppercase tracking-[0.15em] lg:tracking-[0.2em] -rotate-90 w-4 h-24 flex items-center justify-center whitespace-nowrap'
                }
              `}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* 主展示区 */}
      <main className={`relative z-30 w-full h-full flex items-center transition-all duration-[1200ms] ${isRTL ? 'justify-end pr-20 lg:pr-48' : 'justify-start pl-20 lg:pl-48'}`}>
        {activeView === 'GODDESS' ? (
          <div key={selectedGoddess.id} className={`w-full max-w-[85vw] lg:max-w-4xl flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}>
            <div className={`transition-all duration-1000 ${showDetail ? 'opacity-0 blur-xl translate-x-12 pointer-events-none' : 'opacity-100 translate-x-0'}`}>
              
              {/* 副标题 */}
              <div className={`flex items-center gap-4 lg:gap-6 mb-8 lg:mb-12 overflow-hidden ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="h-[1px] w-8 lg:w-12 bg-white/30" />
                <span className={`uppercase font-light text-white/50 whitespace-nowrap
                   ${isCJK ? 'text-[12px] tracking-[0.6em]' : 'text-[10px] tracking-[0.3em]'}
                `}>{langData.title}</span>
              </div>
              
              {/* 主标题 - 响应式字体大小 */}
              <div className="group/namebox cursor-pointer mb-12 lg:mb-16" onClick={() => setShowDetail(true)}>
                <h1 className={`${titleFont} transition-all duration-700 group-hover/namebox:scale-[1.02] text-white/95 leading-tight
                  ${isCJK 
                    ? 'text-7xl lg:text-[9rem]' 
                    : 'text-5xl lg:text-[5.5rem] tracking-wide break-words max-w-4xl' 
                  }`}>
                  {renderTitle(langData.name)}
                </h1>
              </div>

              {/* 按钮 */}
              <button onClick={() => setShowDetail(true)}
                className="group relative flex items-center gap-6 lg:gap-10 py-6 lg:py-10 px-8 lg:px-14 transition-all duration-1000">
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-2xl rounded-sm border border-white/10 group-hover:bg-white/[0.07] group-hover:border-white/20" />
                <div className="relative w-10 h-10 lg:w-14 lg:h-14 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 lg:w-3 h-2 lg:h-3 rounded-full animate-pulse" style={{ backgroundColor: selectedGoddess.color, boxShadow: `0 0 25px ${selectedGoddess.color}` }} />
                </div>
                <span className={`relative z-10 text-white/90 font-black uppercase whitespace-nowrap
                   ${isCJK ? 'tracking-[0.5em] text-[16px] lg:text-[18px]' : 'tracking-[0.2em] text-[12px] lg:text-[14px]'}
                `}>{ui.openArchive}</span>
              </button>
            </div>

            {/* 详情页 */}
            {showDetail && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 lg:p-12 animate-fadeIn" onClick={() => setShowDetail(false)}>
                <div dir={isRTL ? 'rtl' : 'ltr'} className="relative w-full max-w-7xl h-full max-h-[90vh] lg:max-h-[85vh] flex flex-col lg:flex-row bg-black/50 backdrop-blur-3xl border border-white/10 shadow-2xl overflow-hidden cursor-default" onClick={e => e.stopPropagation()}>
                  
                  {/* 详情页左侧标题栏 */}
                  <div className={`lg:min-w-[16rem] border-white/5 p-8 lg:p-12 flex flex-row lg:flex-col items-center justify-between lg:justify-center gap-6 lg:gap-10 relative border-b lg:border-b-0 ${isRTL ? 'lg:border-l' : 'lg:border-r'}`}>
                    <h2 className={`${titleFont} text-white/90 
                      ${isCJK 
                        ? 'writing-v text-4xl lg:text-7xl' 
                        : 'text-2xl lg:text-4xl text-center leading-normal tracking-widest' 
                      }
                    `}>{langData.name}</h2>
                    {isCJK && <div className="hidden lg:block w-px h-32 bg-gradient-to-b from-white/20 to-transparent" />}
                    <span className="text-[9px] lg:text-[11px] tracking-[0.3em] lg:tracking-[0.5em] text-white/30 uppercase font-black whitespace-nowrap">{ui.detailLabel}</span>
                    <button onClick={() => setShowDetail(false)} className="lg:hidden text-white/50 text-2xl">✕</button>
                  </div>

                  {/* 详情页内容 */}
                  <div className="flex-1 p-8 lg:p-20 flex flex-col relative overflow-hidden">
                    <div className="mb-8 lg:mb-12 shrink-0">
                        <h3 className={`text-white/90 mb-4 lg:mb-6 font-light
                           ${isCJK ? 'text-2xl lg:text-3xl tracking-[0.2em]' : 'text-xl lg:text-3xl tracking-[0.1em] uppercase'}
                        `}>{langData.shortDesc}</h3>
                        <div className="w-16 lg:w-20 h-[2px]" style={{ background: selectedGoddess.color }} />
                    </div>
                    <div className="flex-1 overflow-y-auto no-scrollbar pr-2 lg:pr-6">
                        <p className={`text-white/60 font-serif font-light
                           ${isCJK 
                             ? 'text-[15px] lg:text-[16px] tracking-[0.1em] text-justify leading-relaxed' 
                             : 'text-[13px] lg:text-[15px] tracking-[0.05em] leading-[2.2] text-left'
                           }
                           ${isRTL ? 'text-right' : ''}
                        `}>{langData.description}</p>
                    </div>
                    <div className="mt-8 lg:mt-12 pt-6 lg:pt-10 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-6 shrink-0">
                        <div className="flex gap-4 lg:gap-6 w-full lg:w-auto">
                            <button onClick={() => window.open(selectedGoddess.pvUrl, '_blank')} className="flex-1 lg:flex-none px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-white/5 border border-white/10 text-[10px] lg:text-[12px] tracking-widest hover:bg-white/10 transition-all uppercase whitespace-nowrap">{ui.listenPV}</button>
                            <button onClick={() => setShowShopModal(true)} className="flex-1 lg:flex-none px-6 lg:px-8 py-3 lg:py-4 rounded-full bg-white/5 border border-white/10 text-[10px] lg:text-[12px] tracking-widest hover:bg-white/10 transition-all uppercase whitespace-nowrap">{ui.visitShop}</button>
                        </div>
                        <div className="text-right w-full lg:w-auto">
                           <span className="text-[14px] lg:text-[16px] font-bold tracking-widest" style={{ color: selectedGoddess.color }}>{langData.flower}</span>
                        </div>
                    </div>
                  </div>

                  {/* 详情页右侧素材栏 */}
                  <div className="hidden lg:flex w-80 bg-black/40 p-10 flex-col gap-8 border-white/5 border-l">
                    <span className="text-[10px] tracking-[0.5em] text-white/30 uppercase font-black">{ui.artifacts}</span>
                    <div className="flex-1 overflow-y-auto no-scrollbar space-y-8">
                      {selectedGoddess.samples?.map((s, i) => (
                        <img key={i} src={s} onClick={() => setActiveSample(s)} className="w-full aspect-square object-cover opacity-60 hover:opacity-100 transition-all cursor-zoom-in rounded-sm" alt="" />
                      ))}
                    </div>
                    <button onClick={() => setShowDetail(false)} className="py-6 text-[11px] tracking-[1em] text-white/30 hover:text-white uppercase border-t border-white/10">{ui.close}</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-left animate-fadeIn">
            <p className={`font-light text-white opacity-30 
              ${isCJK ? 'text-4xl lg:text-6xl tracking-[2em]' : 'text-2xl lg:text-4xl tracking-[0.5em] uppercase'}`}>
              {isCJK ? '万籁俱寂 静候微芒' : 'Silence Awaits The Light'}
            </p>
          </div>
        )}
      </main>

      {/* 功能入口按钮 */}
      <div className={`fixed bottom-8 lg:bottom-12 ${isRTL ? 'left-6 lg:left-12' : 'right-6 lg:right-12'} z-[60] flex flex-col items-end gap-6`}>
        <div className="flex flex-col items-end gap-4">
          <div className={`flex flex-col gap-3 transition-all duration-700 ${showLangMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}>
            {languages.map(lang => (
              <button key={lang.code} onClick={() => { setCurrentLang(lang.code); setShowLangMenu(false); }}
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center border text-[10px] lg:text-[11px] font-bold transition-all ${currentLang === lang.code ? 'bg-amber-500 border-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'bg-black/70 border-white/10 text-white/50 hover:border-white/40'}`}>
                {lang.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 lg:gap-5">
             <button onClick={() => setShowLangMenu(!showLangMenu)} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-black/60 border border-white/10 backdrop-blur-2xl flex items-center justify-center text-[11px] lg:text-[13px] text-white/80 hover:border-white/50 transition-all uppercase">
                {ui.lang}
             </button>
          </div>
        </div>
      </div>

      {activeSample && (
        <div className="fixed inset-0 z-[200] bg-black/98 flex items-center justify-center cursor-zoom-out animate-fadeIn" onClick={() => setActiveSample(null)}>
           <img src={activeSample} className="max-w-[90%] max-h-[90%] object-contain shadow-2xl" alt="" />
        </div>
      )}

      {showShopModal && <ShopModal goddess={selectedGoddess} currentLang={currentLang} onClose={() => setShowShopModal(false)} />}
      <InfoOverlay section={activeInfo} onClose={() => setActiveInfo('NONE')} />
    </div>
  );
};

export default App;
