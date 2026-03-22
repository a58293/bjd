
import React, { useState } from 'react';
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
  const isCJK = ['zh', 'ja', 'ko'].includes(currentLang);
  
  let titleFont = 'font-serif font-bold uppercase';
  if (currentLang === 'zh') titleFont = 'font-brush';
  else if (currentLang === 'ja') titleFont = 'font-jp font-bold';
  else if (currentLang === 'ko') titleFont = 'font-kr font-bold';

  const getLangData = (g: Goddess, lang: Language) => {
    if (g.translations[lang]) return g.translations[lang];
    if (!['zh', 'ja', 'ko'].includes(lang) && g.translations['en']) {
        return g.translations['en'];
    }
    return g.translations['zh'];
  };

  const langData = getLangData(goddess, currentLang);
  const displayImage = goddess.localUrl || goddess.image;

  const handleDomesticRedirect = () => {
    if (goddess.shopUrl) {
      window.open(goddess.shopUrl, '_blank');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/80 backdrop-blur-3xl flex items-center justify-center p-4 lg:p-12 transition-all animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-[#0c0c10]/95 border border-white/10 w-full max-w-5xl h-full lg:h-auto lg:min-h-[550px] relative overflow-y-auto lg:overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row rounded-sm"
        onClick={e => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-all text-2xl lg:text-xl w-10 h-10 flex items-center justify-center bg-black/20 rounded-full lg:bg-transparent">✕</button>

        {/* 图片区域 - 移动端高度较小 */}
        <div className="w-full h-48 lg:h-auto lg:w-2/5 relative bg-black/40 border-b lg:border-b-0 lg:border-r border-white/5 overflow-hidden shrink-0">
          <img src={displayImage} className="w-full h-full object-cover opacity-50" alt="" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 lg:bottom-12 lg:left-10 lg:right-10">
            <span className={`text-amber-500/60 uppercase block mb-1 lg:mb-3 font-bold
               ${isCJK ? 'text-[10px] tracking-[0.5em]' : 'text-[9px] tracking-[0.2em]'}
            `}>{ui.digitalPack}</span>
            <h3 className={`${titleFont} text-white mb-2
               ${isCJK ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-4xl'}
            `}>{langData.name}</h3>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 p-6 lg:p-16 flex flex-col relative">
          
          <header className="mb-8 lg:mb-10">
            <h2 className={`${titleFont} text-white mb-2 lg:mb-3 tracking-widest
               ${isCJK ? 'text-3xl lg:text-5xl' : 'text-2xl lg:text-4xl'}
            `}>{ui.shopSelectTitle}</h2>
            <p className="text-[10px] lg:text-[11px] tracking-[0.2em] lg:tracking-[0.4em] text-white/20 uppercase font-black">{ui.shopSelectSub}</p>
          </header>

          <div className="space-y-4">
            <div onClick={() => setSelectedRegion('DOMESTIC')} className={`cursor-pointer p-5 lg:p-6 border transition-all ${selectedRegion === 'DOMESTIC' ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}>
              <h4 className={`text-base lg:text-xl mb-1 ${selectedRegion === 'DOMESTIC' ? 'text-amber-500' : 'text-white/70'}`}>{ui.regionDomestic}</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{ui.taobaoHint}</p>
            </div>

            <div onClick={() => setSelectedRegion('INTERNATIONAL')} className={`cursor-pointer p-5 lg:p-6 border transition-all ${selectedRegion === 'INTERNATIONAL' ? 'border-amber-500 bg-amber-500/5' : 'border-white/5 bg-white/[0.02] hover:border-white/10'}`}>
              <h4 className={`text-base lg:text-xl mb-1 ${selectedRegion === 'INTERNATIONAL' ? 'text-amber-500' : 'text-white/70'}`}>{ui.regionInternational}</h4>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">{ui.paypalHint}</p>
            </div>
          </div>

          <div className="mt-8 lg:mt-auto pt-6 lg:pt-10">
            {selectedRegion === 'DOMESTIC' && (
              <button 
                onClick={handleDomesticRedirect}
                className="w-full py-4 bg-amber-500 text-black font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-amber-400 transition-colors"
              >
                {ui.visitShop}
              </button>
            )}

            {selectedRegion === 'INTERNATIONAL' && (
              <div className="space-y-6 pb-10 lg:pb-0">
                <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-white/40 uppercase tracking-widest">{ui.price}</span>
                    <span className="text-xl lg:text-2xl text-amber-500 font-light">
                      {/* [修改此处] 价格 */}
                      $19.90 USD
                    </span>
                  </div>
                  <p className="text-[11px] text-white/30 leading-relaxed">{ui.paymentGuide}</p>
                </div>
                {/* PayPal 按钮已移除 */}
                <button disabled className="w-full py-4 bg-white/5 text-white/20 font-bold tracking-[0.2em] uppercase rounded-sm cursor-not-allowed border border-white/5">
                  {/* [修改此处] 维护中按钮文字 */}
                  Maintenance / 维护中
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopModal;
