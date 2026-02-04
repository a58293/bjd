
import React, { useState, useEffect, useRef } from 'react';
import { Goddess, Language } from '../types';
import { UI_TRANSLATIONS } from '../constants';

interface Props {
  goddess: Goddess;
  currentLang: Language;
  onClose: () => void;
}

const ShopModal: React.FC<Props> = ({ goddess, currentLang, onClose }) => {
  const [selectedRegion, setSelectedRegion] = useState<'NONE' | 'DOMESTIC' | 'INTERNATIONAL'>('NONE');
  const ui = UI_TRANSLATIONS[currentLang];
  const paypalContainerRef = useRef<HTMLDivElement>(null);
  const isCJK = ['zh', 'ja', 'ko'].includes(currentLang);
  
  // 字体策略
  let titleFont = 'font-serif font-bold uppercase';
  if (currentLang === 'zh') titleFont = 'font-brush';
  else if (currentLang === 'ja') titleFont = 'font-jp font-bold';
  else if (currentLang === 'ko') titleFont = 'font-kr font-bold';

  // 同步 App.tsx 的回退逻辑
  const getLangData = (g: Goddess, lang: Language) => {
    if (g.translations[lang]) return g.translations[lang];
    if (!['zh', 'ja', 'ko'].includes(lang) && g.translations['en']) {
        return g.translations['en'];
    }
    return g.translations['zh'];
  };

  const langData = getLangData(goddess, currentLang);
  const displayImage = goddess.localUrl || goddess.image;

  useEffect(() => {
    let isMounted = true;
    
    if (selectedRegion === 'INTERNATIONAL') {
      const renderButtons = async () => {
         if (!paypalContainerRef.current) return;
         paypalContainerRef.current.innerHTML = '';
         
         try {
            const paypal = (window as any).paypal;
            if (paypal) {
                await paypal.Buttons({
                    createOrder: (data: any, actions: any) => {
                        return actions.order.create({
                          purchase_units: [{
                            reference_id: goddess.id,
                            description: `${langData.name} - Digital Archive`,
                            amount: {
                              currency_code: 'USD',
                              value: '19.90'
                            }
                          }]
                        });
                    },
                    onApprove: async (data: any, actions: any) => {
                        const order = await actions.order.capture();
                        alert(`结缘成功！\n感谢您收藏 ${langData.name}。\n订单号：${order.id}`);
                        if (isMounted) onClose();
                    },
                    onError: (err: any) => {
                        console.warn('PayPal interaction error:', err);
                    },
                    style: {
                        layout: 'vertical',
                        color: 'gold',
                        shape: 'rect',
                        label: 'checkout',
                        height: 45
                    }
                }).render(paypalContainerRef.current);
            }
         } catch (err) {
             console.error("PayPal failed to render:", err);
         }
      };

      if (!(window as any).paypal) {
          const scriptId = 'paypal-js-sdk';
          if (!document.getElementById(scriptId)) {
              const script = document.createElement('script');
              script.id = scriptId;
              script.src = "https://www.paypal.com/sdk/js?client-id=test&currency=USD";
              script.onload = () => { if(isMounted) renderButtons(); };
              script.onerror = () => console.error("PayPal SDK failed to load");
              document.body.appendChild(script);
          } else {
              const script = document.getElementById(scriptId);
              script?.addEventListener('load', () => { if(isMounted) renderButtons(); });
              // Check if already loaded but event missed
              if ((window as any).paypal && isMounted) renderButtons();
          }
      } else {
          renderButtons();
      }
    }
    
    return () => { isMounted = false; };
  }, [selectedRegion, goddess, currentLang, onClose, langData]);

  const handleDomesticRedirect = () => {
    if (goddess.shopUrl) {
      window.open(goddess.shopUrl, '_blank');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/40 backdrop-blur-3xl flex items-center justify-center p-6 lg:p-12 transition-all animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-[#0c0c10]/95 border border-white/10 w-full max-w-5xl min-h-[550px] relative overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row rounded-sm"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-full lg:w-2/5 relative bg-black/40 border-r border-white/5 overflow-hidden">
          <img src={displayImage} className="w-full h-full object-cover opacity-50" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent" />
          <div className="absolute bottom-12 left-10 right-10">
            <span className={`text-amber-500/60 uppercase block mb-3 font-bold
               ${isCJK ? 'text-[10px] tracking-[0.5em]' : 'text-[9px] tracking-[0.2em]'}
            `}>{ui.digitalPack}</span>
            <h3 className={`${titleFont} text-white mb-2
               ${isCJK ? 'text-5xl' : 'text-3xl lg:text-4xl'}
            `}>{langData.name}</h3>
          </div>
        </div>

        <div className="flex-1 p-10 lg:p-16 flex flex-col relative">
          <button onClick={onClose} className="absolute top-8 right-8 text-white/20 hover:text-white transition-all text-xl">✕</button>
          
          <header className="mb-10">
            <h2 className={`${titleFont} text-white mb-3 tracking-widest
               ${isCJK ? 'text-5xl' : 'text-3xl lg:text-4xl'}
            `}>{ui.shopSelectTitle}</h2>
            <p className="text-[11px] tracking-[0.2em] lg:tracking-[0.4em] text-white/20 uppercase font-black">{ui.shopSelectSub}</p>
          </header>

          <div className="space-y-4">
            <div onClick={() => setSelectedRegion('DOMESTIC')} className={`cursor-pointer p-6 border transition-all ${selectedRegion === 'DOMESTIC' ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}>
              <h4 className={`text-lg lg:text-xl mb-1 ${selectedRegion === 'DOMESTIC' ? 'text-amber-500' : 'text-white/70'}`}>{ui.regionDomestic}</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{ui.taobaoHint}</p>
            </div>

            <div onClick={() => setSelectedRegion('INTERNATIONAL')} className={`cursor-pointer p-6 border transition-all ${selectedRegion === 'INTERNATIONAL' ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}>
              <h4 className={`text-lg lg:text-xl mb-1 ${selectedRegion === 'INTERNATIONAL' ? 'text-amber-500' : 'text-white/70'}`}>{ui.regionInternational}</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{ui.paypalHint}</p>
            </div>
          </div>

          <div className="mt-auto pt-10">
            {selectedRegion === 'DOMESTIC' && (
              <button 
                onClick={handleDomesticRedirect}
                className="w-full py-4 bg-amber-500 text-black font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-amber-400 transition-colors"
              >
                {ui.visitShop}
              </button>
            )}

            {selectedRegion === 'INTERNATIONAL' && (
              <div className="space-y-6">
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{ui.price}</span>
                    <span className="text-xl lg:text-2xl text-amber-500 font-light">$19.90 USD</span>
                  </div>
                  <p className="text-[11px] text-white/30 leading-relaxed">{ui.paymentGuide}</p>
                </div>
                <div ref={paypalContainerRef} className="min-h-[45px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
