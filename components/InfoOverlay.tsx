
import React from 'react';

type InfoSection = 'NONE' | 'ABOUT' | 'NOTICE' | 'CUSTOM' | 'CONTACT';

interface Props {
  section: InfoSection;
  onClose: () => void;
}

const InfoOverlay: React.FC<Props> = ({ section, onClose }) => {
  if (section === 'NONE') return null;

  const contentMap = {
    // ------------------------------------------
    // [修改此处] "关于我们" 弹窗内容 (对应左下角按钮 01)
    // ------------------------------------------
    ABOUT: {
      title: { zh: '此间花境，四时有序。', en: 'Origin', ar: 'حول "الرؤية"', ja: '「幻境」について', ko: '“환경”에 대하여' },
      body: {
        zh: '花境，并非一处所在。\n它是四时轮转的秩序，是万卉生灭的源流。\n\n十二月各守其花。\n百花女神执花令而立。\n\n以东方神性为骨，\n以花为形，\n以时间为序。\n\n此间所呈现的，\n是一卷关于花与岁月的长诗。\n\n花境，由隐于幕后的守护者静静维系。',
        en: 'We are the "Visionary" digital art lab. In the flood of binary, we seek an anchor for the blurring traditional aesthetics.',
        ar: 'نحن مختبر "الرؤية" للفنون الرقمية. في طوفان الأرقام، نسعى لإيجاد مرساة للجماليات التقليدية التي تتلاشى تدريجياً.',
        ja: '私たちは「幻境」デジタルアート研究所です。バイナリの潮流の中で、伝統的な美学のアンカーを見つけることを試みています。',
        ko: '우리는 “환경” 디지털 아트 연구소입니다. 이진법의 흐름 속에서 점차 흐릿해지는 전통 미학의 정박지를 찾고자 합니다.'
      }
    },
    // ------------------------------------------
    // [修改此处] "收藏须知" 弹窗内容 (对应左下角按钮 02)
    // ------------------------------------------
    NOTICE: { 
      title: { zh: '结缘说明', en: 'Notice', ar: 'تنبيه', ja: '収蔵の注意', ko: '수집 안내' }, 
      body: { 
        zh: '花神典藏为限量之作。\n每一次结缘，皆为唯一。\n\n一旦完成确认与交付，\n此段花期将不再逆转。\n\n请在进入花境之前，\n确认你的选择。', 
        en: 'Digital assets are unique and irreversible once delivered.', 
        ar: 'الأصول الرقمية فريدة وغير قابلة للاسترداد بمجرد التسليم.', 
        ja: 'デジタル資産は独自のものであり、納品後のキャンセルはできません。', 
        ko: '디지털 자산은 고유하며 인도 후에는 되돌릴 수 없습니다.' 
      } 
    },
    // ------------------------------------------
    // [修改此处] "定制服务" 弹窗内容 (对应左下角按钮 03)
    // ------------------------------------------
    CUSTOM: { 
      title: { zh: '定制花灵', en: 'Custom', ar: 'تخصيص', ja: 'オーダーメイド', ko: '주문 제작' }, 
      body: { 
        zh: '若你愿意，\n可将你的生辰、偏爱的花木，\n或一段属于你的时序交予花境。\n\n我们将循四时之理，\n为你构筑独属的花灵形象。\n\n每一次灵筑，\n都是一段私人花期的诞生。', 
        en: 'We support deep private customization based on your spirit totem.', 
        ar: 'نحن ندعم التخصيص الخاص العميق بناءً على تفضيلاتك.', 
        ja: '深いプライベートカスタマイズをサポートしています。', 
        ko: '심층적인 개인 맞춤형 서비스를 지원합니다.' 
      } 
    },
    // ------------------------------------------
    // [修改此处] "联系方式" 弹窗内容 (对应左下角按钮 04)
    // ------------------------------------------
    CONTACT: { 
      title: { zh: '联系花境', en: 'Portal Access', ar: 'اتصال', ja: '連絡先', ko: '연락처' }, 
      body: { 
        zh: '寻访幻境之门：studio@visionary.art', 
        en: 'Visit our portal: studio@visionary.art', 
        ar: 'تواصل معنا: studio@visionary.art', 
        ja: 'お問い合わせ: studio@visionary.art', 
        ko: '문의처: studio@visionary.art' 
      } 
    },
    NONE: { title: {}, body: {} }
  };

  const data = contentMap[section];
  // 简易语言回退逻辑
  const getLangText = (obj: any) => obj['zh'] || 'Text missing';

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-3xl flex items-center justify-center p-6 lg:p-12 animate-fadeIn" onClick={onClose}>
      <div 
        className="bg-[#0c0c10]/95 border border-white/10 w-full max-w-3xl p-10 lg:p-20 relative overflow-hidden shadow-2xl rounded-sm"
        onClick={e => e.stopPropagation()}
      >
        <header className="mb-10 lg:mb-16">
          <h2 className="font-brush text-4xl lg:text-6xl text-white mb-4">{getLangText(data.title)}</h2>
          <div className="w-12 h-1 bg-amber-500/40" />
        </header>

        <div className="max-h-[50vh] overflow-y-auto no-scrollbar">
          <p className="text-base lg:text-xl text-white/70 leading-relaxed lg:leading-[2.5] tracking-wide font-light font-serif whitespace-pre-line">
            {getLangText(data.body)}
          </p>
        </div>

        <button onClick={onClose} className="mt-12 text-[10px] tracking-[0.5em] text-white/20 hover:text-white uppercase transition-all">
          Exit Overlay
        </button>
      </div>
    </div>
  );
};

export default InfoOverlay;
