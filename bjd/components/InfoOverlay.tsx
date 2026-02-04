
import React from 'react';

type InfoSection = 'NONE' | 'ABOUT' | 'NOTICE' | 'CUSTOM' | 'CONTACT';

interface Props {
  section: InfoSection;
  onClose: () => void;
}

const InfoOverlay: React.FC<Props> = ({ section, onClose }) => {
  if (section === 'NONE') return null;

  const contentMap = {
    ABOUT: {
      title: { zh: '关于“幻境”', en: 'Origin', ar: 'حول "الرؤية"', ja: '「幻境」について', ko: '“환경”에 대하여' },
      body: {
        zh: '我们是“幻境”数字艺术实验室。在二进制的洪流中，我们试图为日渐模糊的传统美学寻回一处锚点。每一个系列，都是对东方浪漫主义与神性意象的重构。',
        en: 'We are the "Visionary" digital art lab. In the flood of binary, we seek an anchor for the blurring traditional aesthetics.',
        ar: 'نحن مختبر "الرؤية" للفنون الرقمية. في طوفان الأرقام، نسعى لإيجاد مرساة للجماليات التقليدية التي تتلاشى تدريجياً.',
        ja: '私たちは「幻境」デジタルアート研究所です。バイナリの潮流の中で、伝統的な美学のアンカーを見つけることを試みています。',
        ko: '우리는 “환경” 디지털 아트 연구소입니다. 이진법의 흐름 속에서 점차 흐릿해지는 전통 미학의 정박지를 찾고자 합니다.'
      }
    },
    // ... 其他部分可以按需扩展多语言
    NOTICE: { title: { zh: '收藏须知', en: 'Notice', ar: 'تنبيه', ja: '収蔵の注意', ko: '수집 안내' }, body: { zh: '数字艺术品具有独特性与不可逆性，资产一旦交割，幻境之门将不再逆转。', en: 'Digital assets are unique and irreversible once delivered.', ar: 'الأصول الرقمية فريدة وغير قابلة للاسترداد بمجرد التسليم.', ja: 'デジタル資産は独自のものであり、納品後のキャンセルはできません。', ko: '디지털 자산은 고유하며 인도 후에는 되돌릴 수 없습니다.' } },
    CUSTOM: { title: { zh: '定做服务', en: 'Custom', ar: 'تخصيص', ja: 'オーダーメイド', ko: '주문 제작' }, body: { zh: '幻境支持深度私人定制。您可以提交您的生辰或偏爱的草木之灵。', en: 'We support deep private customization based on your spirit totem.', ar: 'نحن ندعم التخصيص الخاص العميق بناءً على تفضيلاتك.', ja: '深いプライベートカスタマイズをサポートしています。', ko: '심층적인 개인 맞춤형 서비스를 지원합니다.' } },
    CONTACT: { title: { zh: '联系方式', en: 'Portal Access', ar: 'اتصال', ja: '連絡先', ko: '연락처' }, body: { zh: '寻访幻境之门：studio@visionary.art', en: 'Visit our portal: studio@visionary.art', ar: 'تواصل معنا: studio@visionary.art', ja: 'お問い合わせ: studio@visionary.art', ko: '문의처: studio@visionary.art' } },
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
          <p className="text-base lg:text-xl text-white/70 leading-relaxed lg:leading-[2.5] tracking-wide font-light font-serif">
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
