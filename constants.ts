
import { Goddess, Language } from './types';

export const UI_TRANSLATIONS: Record<Language, any> = {
  zh: {
    nav: ['造境', '契约', '灵筑', '传音'],
    viewGoddess: '花神卷',
    viewAngel: '天使卷',
    openArchive: '开启 · 芳华录',
    detailLabel: '芳华录',
    artifacts: '样品图鉴',
    enterRealm: '入梦 · 幻境', // 统一改为“入梦”，适应视频和网页
    visitShop: '结缘 · 旗舰店',
    close: '封存画卷',
    detect: '探测画卷之微毫',
    lang: '语源',
    shopSelectTitle: '选择结缘路径',
    shopSelectSub: '请根据您的所在地选择合适的通道',
    regionDomestic: '中土 · 溯源',
    regionInternational: '海外 · 远传',
    taobaoHint: '跳转至淘宝旗舰店',
    paypalHint: '使用 PayPal 开启国际支付通道',
    digitalPack: '数字典藏资产包',
    price: '结缘价',
    securePayment: '安全支付加密环境已开启',
    paymentGuide: '国际支付通道目前正在维护升级中，暂无法使用。请稍后重试或通过邮件联系我们。'
  },
  en: {
    nav: ['Origin', 'Pact', 'Build', 'Call'],
    viewGoddess: 'Goddess',
    viewAngel: 'Angel',
    openArchive: 'Open Archive',
    detailLabel: 'Celestial Bio',
    artifacts: 'Artifacts',
    enterRealm: 'Enter · Realm',
    visitShop: 'Sanctuary Shop',
    close: 'Close Archive',
    detect: 'Detect Micro Details',
    lang: 'Language',
    shopSelectTitle: 'Choose Your Realm',
    shopSelectSub: 'Select a portal based on your location',
    regionDomestic: 'Mainland Portal',
    regionInternational: 'Overseas Portal',
    taobaoHint: 'Redirect to Taobao Flagship',
    paypalHint: 'Secure Checkout via PayPal Gateway',
    digitalPack: 'Celestial Digital Asset Pack',
    price: 'Blessing Fee',
    securePayment: 'Encrypted Payment Environment',
    paymentGuide: 'The international payment channel is currently under maintenance. Please try again later or contact us.'
  },
  fr: {
    nav: ['Origine', 'Pacte', 'Bâtir', 'Appel'],
    viewGoddess: 'Déesse',
    viewAngel: 'Ange',
    openArchive: 'Ouvrir L\'Archive',
    detailLabel: 'Bio Céleste',
    artifacts: 'Artéfacts',
    enterRealm: 'Entrer · Royaume',
    visitShop: 'Boutique',
    close: 'Fermer L\'Archive',
    detect: 'Détecter Les Détails',
    lang: 'Langue',
    shopSelectTitle: 'Choisir votre royaume',
    shopSelectSub: 'Sélectionnez un portail selon votre lieu',
    regionDomestic: 'Portail National',
    regionInternational: 'Portail International',
    taobaoHint: 'Redirection vers Taobao',
    paypalHint: 'Paiement sécurisé via PayPal',
    digitalPack: 'Pack d\'Actifs Numériques',
    price: 'Prix de Bénédiction',
    securePayment: 'Environnement de paiement crypté',
    paymentGuide: 'Le canal de paiement international est actuellement en maintenance. Veuillez réessayer plus tard.'
  },
  ar: {
    nav: ['الأصل', 'العهد', 'البناء', 'النداء'],
    viewGoddess: 'لفافة الإلهة',
    viewAngel: 'لفافة الملاك',
    openArchive: 'فتح الأرشيف',
    detailLabel: 'السيرة السماوية',
    artifacts: 'التحف',
    enterRealm: 'دخول · العالم',
    visitShop: 'متجر الحرم',
    close: 'إإغلاق الأرشيف',
    detect: 'كشف التفاصيل',
    lang: 'اللغة',
    shopSelectTitle: 'اختر عالمك',
    shopSelectSub: 'اختر بوابة بناءً على موقعك',
    regionDomestic: 'البوابة المحلية',
    regionInternational: 'البوابة الدولية',
    taobaoHint: 'إعادة التوجيه إلى تاوباو',
    paypalHint: 'الدفع الآمن عبر باي بال',
    digitalPack: 'حزمة الأصول الرقمية',
    price: 'رسوم البركة',
    securePayment: 'بيئة دفع مشفرة',
    paymentGuide: 'قناة الدفع الدولية قيد الصيانة حالياً. يرجى المحاولة لاحقاً.'
  },
  ja: {
    nav: ['造境', '契約', '霊築', '伝音'],
    viewGoddess: '花神巻',
    viewAngel: '天使巻',
    openArchive: '芳華録を開く',
    detailLabel: '芳華録',
    artifacts: '见本図鑑',
    enterRealm: '入夢 · 幻境',
    visitShop: 'フラッグシップ店',
    close: '画巻を闭じる',
    detect: '细部を検知',
    lang: '言語',
    shopSelectTitle: '縁の道',
    shopSelectSub: 'お住まいの地域に合わせて選択',
    regionDomestic: '国内・源流',
    regionInternational: '海外・伝承',
    taobaoHint: '淘宝旗艦店へ移動',
    paypalHint: 'PayPalで国際決済',
    digitalPack: 'デジタルコレクション',
    price: '結縁価格',
    securePayment: '安全な決済環境が有効です',
    paymentGuide: '国際決済チャネルは現在メンテナンス中です。後でもう一度お試しください。'
  },
  ko: {
    nav: ['조경', '계약', '영축', '전음'],
    viewGoddess: '화신권',
    viewAngel: '천사권',
    openArchive: '방화록 열기',
    detailLabel: '방화록',
    artifacts: '샘플 도감',
    enterRealm: '입몽 · 환경',
    visitShop: '플래그십 스토어',
    close: '화권 닫기',
    detect: '미세 디테일 탐지',
    lang: '언어',
    shopSelectTitle: '인연의 경로',
    shopSelectSub: '거주 지역에 따라 선택해 주세요',
    regionDomestic: '국내 포털',
    regionInternational: '해외 포털',
    taobaoHint: '타오바오로 이동',
    paypalHint: 'PayPal 보안 결제',
    digitalPack: '디지털 컬렉션 팩',
    price: '인연가',
    securePayment: '암호화된 결제 환경',
    paymentGuide: '해외 결제 채널은 현재 점검 중입니다. 나중에 다시 시도해 주세요.'
  }
};

const commonLangs = (name: string, title: string, flower: string, desc: string, short: string, waiting: string) => ({
  name, title, flower, description: desc, shortDesc: short, waitingMessage: waiting
});

export const GODDESS_DATA: Goddess[] = [
  // --- Index 0: 百花女神 (天使卷) ---
  {
    id: 'hundred-flowers',
    image: './goddess-hundred.jpg', // 请在 public 文件夹放入名为 goddess-hundred.jpg 的图片
    samples: ['./sample-hundred-1.jpg', './sample-hundred-2.jpg', './sample-hundred-3.jpg'],
    color: '#D4B3FF', 
    type: 'HUNDRED',
    pvUrl: '', // 在此处填写您的网页链接，例如 'https://example.com'
    translations: {
      zh: commonLangs('百花女神', '众芳之首 · 司春元君', '万卉之灵', '端坐于紫藤瀑布之下的众灵之源。她青丝如瀑，手抚琉璃竖琴，天籁琴音化作万物复苏的敕令。', '琉璃拨弦，万卉齐开。', '琴音未起，万花静待。\n此篇章机缘未至，敬请静候春音。'),
      en: commonLangs('Goddess Flora', 'Prime of All · Spring Sovereign', 'Spirit of All Flora', 'The source of all spirits seated beneath the wisteria cascade. Her hair flows like a waterfall, her hands caress the glazed harp, and her heavenly melodies become the edict for the revival of all things.', 'Strings plucked, ten thousand flowers bloom.', 'The harp is silent, the flowers wait.\nThis chapter is not yet ready to bloom.'),
      fr: commonLangs('Déesse Flora', 'Souveraine du Printemps', 'Esprit de Toute Flore', 'La source de tous les esprits, assise sous la cascade de glycines. Ses cheveux coulent comme une chute d\'eau, ses mains caressent la harpe de cristal, et ses mélodies célestes ordonnent le renouveau de toutes choses.', 'Cordes pincées, dix mille fleurs éclosent.', 'La harpe est silencieuse, les fleurs attendent.\nCe chapitre n\'est pas encore prêt à éclore.'),
      ja: commonLangs('百花の女神', '衆芳の首 · 司春元君', '万卉の霊', '藤の滝の下に座す諸霊の源。黒髪は滝の如く、手は瑠璃の竪琴を奏で、その天籟は万物蘇生の勅令となる。', '瑠璃の弦が弾かれ、万花が一斉に開く。', '琴音未だ響かず、万花静かに待つ。\nこの章は未だ開かれず。'),
      ko: commonLangs('백화의 여신', '뭇 꽃의 으뜸 · 사춘원군', '만화의 영', '등나무 폭포 아래 앉아 있는 모든 영혼의 근원. 유리 하프를 연주하여 만물 소생의 칙령을 내린다.', '유리 현을 퉁기니 만 송이 꽃이 피어나네.', '거문고 소리 아직 들리지 않고, 꽃들은 조용히 기다리네.\n이 장은 아직 열리지 않았습니다.')
    } as any
  },
  // --- Index 1-12: 十二花神 ---
  {
    id: 'plum-blossom',
    image: './goddess-01.jpg',
    samples: ['./sample-01-1.jpg', './sample-01-2.jpg', './sample-01-3.jpg'],
    color: '#FFC1E3',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('梅花花神', '一月 · 傲雪', '梅花', '傲雪凌霜，独守孤傲。她是寒冬中最后一抹亮色，亦是新春第一缕幽香。', '一朵忽先变，百花皆后香。', '踏雪寻梅，时节未至。\n寒香尚在酝酿之中。'),
      en: commonLangs('Plum Blossom', 'Jan · Frost Pride', 'Prunus Mume', 'Standing proud amidst snow and frost, guarding her solitude. She is the last vibrance of deep winter and the first fragrance of the new spring.', 'One bloom changes the season.', 'Treading snow to find the plum, but the season has not come.\nThe cold fragrance is still brewing.'),
      fr: commonLangs('Fleur de Prunier', 'Jan · Fierté du Givre', 'Prunus Mume', 'Se dressant fièrement au milieu de la neige et du givre. Elle est la dernière vibration de l\'hiver profond et le premier parfum du nouveau printemps.', 'Une fleur change la saison.', 'Marchant dans la neige pour trouver la prune, mais la saison n\'est pas venue.\nLe parfum froid infuse encore.'),
      ja: commonLangs('梅花花神', '一月 · 傲雪', '梅花', '雪霜を凌ぎ、孤高を守る。彼女は寒冬の最後の彩りにして、新春の最初の幽香である。', '一輪が先じて変じ、百花が後に香る。', '雪を踏んで梅を尋ぬるも、時節未だ至らず。\n寒香は未だ醸成の中にあり。'),
      ko: commonLangs('매화의 신', '1월 · 오설', '매화', '눈과 서리를 이겨내고 고고함을 지킨다. 한겨울의 마지막 색채이자 새봄의 첫 그윽한 향기.', '한 송이가 먼저 피어나니 백 꽃이 뒤따르네.', '눈 밟으며 매화 찾으나, 때가 아직 이르네.\n그윽한 향기는 아직 깊어가는 중.')
    } as any
  },
  {
    id: 'apricot',
    image: './goddess-02.jpg',
    samples: ['./sample-02-1.jpg', './sample-02-2.jpg', './sample-02-3.jpg'],
    color: '#FFE4E1',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('杏花花神', '二月 · 暄风', '杏花', '沾衣欲湿杏花雨，吹面不寒杨柳风。她是早春的使者，带着温润的潮汐。', '杏子梢头香蕾破，淡红抹色。', '杏花雨未落，春风尚轻柔。\n故事的篇章还在烟雨深处。'),
      en: commonLangs('Apricot Blossom', 'Feb · Warm Breeze', 'Apricot Blossom', 'Misty rain wets the clothes, willow wind caresses the face. She is the herald of early spring, bringing gentle tides and awakening the dormant earth.', 'Pale red buds breaking on the branch.', 'The apricot rain has not fallen, the spring breeze is faint.\nThe story remains deep within the mist.'),
      fr: commonLangs('Fleur d\'Abricotier', 'Fév · Brise Chaude', 'Fleur d\'Abricotier', 'La pluie brumeuse mouille les vêtements, le vent des saules caresse le visage. Elle est la messagère du début du printemps, apportant des marées douces.', 'Bourgeons rouge pâle éclosant sur la branche.', 'La pluie d\'abricot n\'est pas tombée, la brise printanière est faible.\nL\'histoire reste au fond de la brume.'),
      ja: commonLangs('杏花花神', '二月 · 暄風', '杏花', '衣を濡らす杏花の雨、顔に吹く楊柳の風。彼女は早春の使者であり、温潤な潮汐を運んでくる。', '杏子の梢、淡紅の蕾がほころぶ。', '杏花の雨未だ落ちず、春風尚柔らかなり。\n物語は未だ煙雨の深き処にあり。'),
      ko: commonLangs('살구꽃의 신', '2월 · 훤풍', '살구꽃', '옷을 적실 듯한 살구꽃 비, 얼굴에 불어도 차지 않은 버드나무 바람. 초봄의 전령사.', '가지 끝에 붉은 꽃망울이 터지네.', '살구꽃 비 내리지 않고, 봄바람 아직 여리네.\n이야기는 안개비 깊은 곳에 머물러 있다.')
    } as any
  },
  {
    id: 'peach-blossom',
    image: './goddess-03.jpg',
    samples: ['./sample-03-1.jpg', './sample-03-2.jpg', './sample-03-3.jpg'],
    color: '#FF99AA',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('桃花花神', '三月 · 夭灼', '桃花', '桃之夭夭，灼灼其华。江南烟雨中的柔情化身。', '满树和娇烂漫红。', '桃源深处，迷雾未散。\n请待花开灼灼之时。'),
      en: commonLangs('Peach Blossom', 'Mar · Radiant Beauty', 'Peach Blossom', 'The peach trees are young and elegant, brilliant are their flowers. She is the embodiment of tenderness in the misty rain of Jiangnan.', 'A tree full of romantic red.', 'Deep in the peach source, the mist has not cleared.\nPlease wait for the brilliant bloom.'),
      fr: commonLangs('Fleur de Pêcher', 'Mar · Beauté Radieuse', 'Fleur de Pêcher', 'Les pêchers sont jeunes et élégants, brillantes sont leurs fleurs. Elle est l\'incarnation de la tendresse dans la pluie brumeuse de Jiangnan.', 'Un arbre plein de rouge romantique.', 'Au fond de la source aux pêchers, la brume ne s\'est pas dissipée.\nAttendez la floraison brillante.'),
      ja: commonLangs('桃花花神', '三月 · 夭灼', '桃花', '桃の夭夭たる、灼灼たるその華。江南の煙雨の中にある柔情の化身。', '満樹、爛漫たる紅に染まる。', '桃源の深き処、迷霧未だ散ぜず。\n花開き灼灼たる時を待たれよ。'),
      ko: commonLangs('복숭아꽃의 신', '3월 · 요작', '복숭아꽃', '복숭아나무는 싱싱하고 그 꽃은 화려하다. 강남 연무 속 부드러움의 화신.', '온 나무가 흐드러지게 붉구나.', '도원 깊은 곳, 안개 걷히지 않았으니.\n꽃이 화려하게 피어날 때를 기다리소서.')
    } as any
  },
  {
    id: 'peony',
    image: './goddess-04.jpg',
    samples: ['./sample-04-1.jpg', './sample-04-2.jpg', './sample-04-3.jpg'],
    color: '#FF5588',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('牡丹花神', '四月 · 国色', '牡丹', '唯有牡丹真国色，花开时节动京城。繁荣与高贵的象征。', '万花之王的气象。', '国色天香，尚在蕾中。\n盛世篇章，静候开启。'),
      en: commonLangs('Peony Goddess', 'Apr · National Grace', 'Peony', 'Only the peony bears the true color of the nation; its bloom moves the entire capital. A timeless symbol of prosperity, nobility, and honor.', 'The aura of the King of Flowers.', 'The national beauty is still in the bud.\nThe chapter of prosperity awaits its opening.'),
      fr: commonLangs('Déesse Pivoine', 'Avr · Grâce Nationale', 'Pivoine', 'Seule la pivoine porte la vraie couleur de la nation ; sa floraison émeut toute la capitale. Un symbole intemporel de prospérité et de noblesse.', 'L\'aura du Roi des Fleurs.', 'La beauté nationale est encore en bouton.\nLe chapitre de la prospérité attend son ouverture.'),
      ja: commonLangs('牡丹花神', '四月 · 国色', '牡丹', '牡丹のみが真の国色、花開く時節は京城を動かす。繁栄と高貴の象徴。', '万花の王たる気象。', '国色天香、尚ほ蕾の中にあり。\n盛世の章、静かに開くを待つ。'),
      ko: commonLangs('모란의 신', '4월 · 국색', '모란', '모란만이 진정한 나라の 색이니, 꽃이 피면 온 장안이 들썩인다. 번영과 고귀함의 상징.', '만화의 왕다운 기상.', '국색천향, 아직 꽃망울 속에 있네.\n태평성대의 장, 조용히 열리기를 기다립니다.')
    } as any
  },
  {
    id: 'pomegranate',
    image: './goddess-05.jpg',
    samples: ['./sample-05-1.jpg', './sample-05-2.jpg', './sample-05-3.jpg'],
    color: '#FF3300',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('石榴花神', '五月 · 榴红', '石榴', '微雨过，小荷翻。石榴花发照楼台。映红阶绿的炽火。', '五月石榴红似火。', '炽火未燃，红裙未舞。\n夏日的热情正在积蓄。'),
      en: commonLangs('Pomegranate', 'May · Fiery Bloom', 'Pomegranate', 'After a light rain, lotus leaves turn. Pomegranate blooms illuminate the terrace like a blazing fire reflecting on green steps.', 'May pomegranates, red as fire.', 'The fire is not yet lit, the red skirt has not danced.\nThe passion of summer is accumulating.'),
      fr: commonLangs('Grenadier', 'Mai · Floraison Ardente', 'Grenadier', 'Après une pluie légère, les feuilles de lotus tournent. Les fleurs de grenadier illuminent la terrasse comme un feu ardent se reflétant sur les marches vertes.', 'Grenades de mai, rouges comme le feu.', 'Le feu n\'est pas encore allumé, la jupe rouge n\'a pas dansé.\nLa passion de l\'été s\'accumule.'),
      ja: commonLangs('石榴花神', '五月 · 榴紅', '石榴', '微雨過ぎて、小荷翻る。石榴の花は楼台を照らす。緑階に映える紅き熾火。', '五月の石榴、紅きこと火の如し。', '熾火未だ燃えず、紅裙未だ舞わず。\n夏の情熱は今まさに蓄えられん。'),
      ko: commonLangs('석류의 신', '5월 · 유홍', '석류', '보슬비 지나고 연잎 뒤집히네. 석류꽃 피어 누대를 비춘다. 푸른 계단을 붉게 물들이는 불꽃.', '오월의 석류는 불같이 붉구나.', '불꽃 아직 타오르지 않고, 붉은 치마 춤추지 않았네.\n여름의 열정은 쌓여가고 있습니다.')
    } as any
  },
  {
    id: 'lotus',
    image: './goddess-06.jpg',
    samples: ['./sample-06-1.jpg', './sample-06-2.jpg', './sample-06-3.jpg'],
    color: '#AAFFD4',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('荷花花神', '六月 · 净植', '荷花', '出淤泥而不染，濯清涟而不妖。炎夏中的清凉。', '映日荷花别样红。', '清涟未起，荷风不兴。\n水面之下，故事静默。'),
      en: commonLangs('Lotus Goddess', 'Jun · Pure Radiance', 'Lotus', 'Rising unsullied from the mud, bathing in clear ripples without being seductive. The touch of coolness in the scorching summer.', 'Lotus reflecting the sun, uniquely red.', 'Ripples have not risen, the lotus wind is still.\nBeneath the water, the story is silent.'),
      fr: commonLangs('Déesse Lotus', 'Juin · Éclat Pur', 'Lotus', 'S\'élevant sans souillure de la boue, se baignant dans des ondulations claires sans être séductrice. La touche de fraîcheur dans l\'été brûlant.', 'Lotus reflétant le soleil, uniquement rouge.', 'Les ondulations ne se sont pas levées, le vent du lotus est calme.\nSous l\'eau, l\'histoire est silencieuse.'),
      ja: commonLangs('荷花花神', '六月 · 浄植', '蓮華', '泥より出でて染まらず、清漣に濯われて妖ならず。炎夏の中の一抹の清涼。', '日に映える荷花、別様に紅し。', '清漣未だ起たず、荷風興らず。\n水面の下、物語は静黙す。'),
      ko: commonLangs('연꽃의 신', '6월 · 정식', '연꽃', '진흙에서 나왔으나 물들지 않고, 맑은 물에 씻겨도 요염하지 않다. 무더위 속의 청량함.', '햇살 비친 연꽃 유난히 붉구나.', '맑은 물결 일지 않고, 연꽃 바람 불지 않네.\n수면 아래, 이야기는 침묵하고 있다.')
    } as any
  },
  {
    id: 'hollyhock',
    image: './goddess-07.jpg',
    samples: ['./sample-07-1.jpg', './sample-07-2.jpg', './sample-07-3.jpg'],
    color: '#FF00CC',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('蜀葵花神', '七月 · 凌霄', '蜀葵', '锦葵花开，直上云天。伴随骄阳起舞的骄傲。', '一丈红丝上碧霄。', '云天尚远，红丝未展。\n请待花茎直上碧霄。'),
      en: commonLangs('Hollyhock', 'Jul · Skyward Red', 'Hollyhock', 'Hollyhocks bloom, reaching straight for the azure sky. Dancing proudly with the blazing sun, a symbol of ambition.', 'Ten feet of red silk rising to the heavens.', 'The sky is far, the red silk unfurled.\nPlease wait for the stem to reach the heavens.'),
      fr: commonLangs('Rose Trémière', 'Juil · Rouge Céleste', 'Rose Trémière', 'Les roses trémières fleurissent, s\'élançant droit vers le ciel azur. Dansant fièrement avec le soleil ardent, symbole d\'ambition.', 'Dix pieds de soie rouge s\'élevant vers les cieux.', 'Le ciel est loin, la soie rouge non déployée.\nAttendez que la tige atteigne les cieux.'),
      ja: commonLangs('蜀葵花神', '七月 · 凌霄', '蜀葵', '錦葵の花開き、直ちに雲天に上る。驕陽と共に舞う誇り高き姿。', '一丈の紅糸、碧霄に上る。', '雲天尚ほ遠く、紅糸未だ展びず。\n花茎の碧霄に直上するを待たれよ。'),
      ko: commonLangs('접시꽃의 신', '7월 · 능소', '접시꽃', '접시꽃 피어나 곧바로 구름 뚫고 솟네. 태양과 함께 춤추는 당당함.', '한 길 붉은 비단 푸른 하늘로 오르네.', '하늘은 아직 멀고, 붉은 비단 펼쳐지지 않았네.\n꽃줄기가 푸른 하늘로 치솟을 때를 기다리소서.')
    } as any
  },
  {
    id: 'osmanthus',
    image: './goddess-08.jpg',
    samples: ['./sample-08-1.jpg', './sample-08-2.jpg', './sample-08-3.jpg'],
    color: '#FFE680',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('桂花花神', '八月 · 粟金', '桂花', '暗淡轻黄体性柔，情疏迹远只香留。中秋月色下的芬芳。', '金粟满枝，十里飘香。', '月色未满，金粟未香。\n中秋之约尚在途中。'),
      en: commonLangs('Osmanthus', 'Aug · Golden Dust', 'Osmanthus', 'Pale yellow and soft in nature, distant in emotion but leaving a lingering scent. The quintessential fragrance under the Mid-Autumn moon.', 'Golden dust fills the branches, scent traveling ten miles.', 'The moon is not full, the golden dust not fragrant.\nThe Mid-Autumn promise is on its way.'),
      fr: commonLangs('Osmanthus', 'Août · Poussière d\'Or', 'Osmanthus', 'Jaune pâle et doux de nature, distant en émotion mais laissant un parfum persistant. La fragrance quintessentielle sous la lune de la mi-automne.', 'La poussière d\'or remplit les branches.', 'La lune n\'est pas pleine, la poussière d\'or non parfumée.\nLa promesse de la mi-automne est en chemin.'),
      ja: commonLangs('桂花花神', '八月 · 粟金', '金木犀', '暗淡たる軽黄、体性は柔。情は疎にして跡は遠く、ただ香のみ留む。中秋の月色の下の芳香。', '金粟枝に満ち、十里に香る。', '月色未だ満ちず、金粟未だ香らず。\n中秋の約は尚ほ途上にあり。'),
      ko: commonLangs('계수나무의 신', '8월 · 속금', '계화', '은은한 연노랑 부드러운 자태, 정은 옅고 자취 멀어도 향기만 남네. 한가위 달빛 아래 그윽한 향.', '금 가루 가지 가득, 십 리에 향기 퍼지네.', '달은 아직 차지 않았고, 금가루 향기롭지 않네.\n한가위의 약속은 아직 오고 있습니다.')
    } as any
  },
  {
    id: 'chrysanthemum',
    image: './goddess-09.jpg',
    samples: ['./sample-09-1.jpg', './sample-09-2.jpg', './sample-09-3.jpg'],
    color: '#FFCC66',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('菊花花神', '九月 · 归隐', '菊花', '采菊东篱下，悠然见南山。秋风中的隐者。', '宁可枝头抱香死。', '东篱未筑，秋菊未黄。\n隐逸的故事请待西风起。'),
      en: commonLangs('Chrysanthemum', 'Sep · Autumn Recluse', 'Chrysanthemum', 'Picking chrysanthemums under the eastern fence, leisurely seeing the southern mountain. The noble hermit standing in the autumn wind.', 'Rather die fragrant on the branch than fall into dust.', 'The eastern fence is unbuilt, the chrysanthemum not yellow.\nWait for the west wind for the hermit\'s tale.'),
      fr: commonLangs('Chrysanthème', 'Sep · Reclus d\'Automne', 'Chrysanthème', 'Cueillant des chrysanthèmes sous la clôture est, voyant tranquillement la montagne du sud. Le noble ermite se tenant dans le vent d\'automne.', 'Mourir parfumé sur la branche plutôt que tomber.', 'La clôture est n\'est pas construite, le chrysanthème non jaune.\nAttendez le vent d\'ouest pour le conte de l\'ermite.'),
      ja: commonLangs('菊花花神', '九月 · 帰隠', '菊', '菊を採る東籬の下、悠然として南山を見る。秋風の中の隠者。', '寧ろ枝頭に香を抱いて死すとも。', '東籬未だ築かれず、秋菊未だ黄ならず。\n隠逸の物語、西風の起つを待たれよ。'),
      ko: commonLangs('국화의 신', '9월 · 귀은', '국화', '동쪽 울타리 아래 국화 꺾어 들고, 유유히 남산을 바라보네. 가을바람 속의 은자.', '차라리 가지 끝에서 향기 품고 시들지언정.', '동쪽 울타리 아직 없고, 가을 국화 노랗지 않네.\n은둔의 이야기는 서풍이 불 때를 기다리소서.')
    } as any
  },
  {
    id: 'cotton-rose',
    image: './goddess-10.jpg',
    samples: ['./sample-10-1.jpg', './sample-10-2.jpg', './sample-10-3.jpg'],
    color: '#FFB2D1',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('木芙蓉花神', '十月 · 霜降', '木芙蓉', '晓妆如玉暮如霞，独立秋江对晚花。深秋的绝响。', '只有芙蓉独自芳。', '秋江水寒，芙蓉未放。\n拒霜的英姿尚在沉睡。'),
      en: commonLangs('Cotton Rose', 'Oct · Frost Defiance', 'Cotton Rose', 'Jade-like at dawn, rosy at dusk. Standing alone by the autumn river facing the evening blooms. The last song of deep autumn.', 'Only the Cotton Rose blooms alone.', 'The autumn river is cold, the hibiscus unbloomed.\nThe frost-defying figure is still asleep.'),
      fr: commonLangs('Hibiscus', 'Oct · Défi au Givre', 'Hibiscus', 'Comme du jade à l\'aube, rosé au crépuscule. Se tenant seul près de la rivière d\'automne face aux fleurs du soir. Le dernier chant de l\'automne profond.', 'Seul l\'Hibiscus fleurit en solitaire.', 'La rivière d\'automne est froide, l\'hibiscus non éclos.\nLa figure défiant le givre dort encore.'),
      ja: commonLangs('木芙蓉花神', '十月 · 霜降', '木芙蓉', '暁の粧は玉の如く、暮れは霞の如し。秋江に独立して晩花に対す。深秋の絶唱。', 'ただ芙蓉のみ独り芳し。', '秋江の水寒く、芙蓉未だ放たず。\n霜を拒む英姿は尚ほ沈睡の中にあり。'),
      ko: commonLangs('부용의 신', '10월 · 상강', '부용', '아침 단장은 옥 같고 저녁엔 노을 같네. 가을 강에 홀로 서서 늦은 꽃 마주하네. 늦가을의 절창.', '오직 부용만이 홀로 향기롭구나.', '가을 강물 차갑고, 부용은 피지 않았네.\n서리를 거부하는 자태는 아직 잠들어 있다.')
    } as any
  },
  {
    id: 'camellia',
    image: './goddess-11.jpg',
    samples: ['./sample-11-1.jpg', './sample-11-2.jpg', './sample-11-3.jpg'],
    color: '#E60000',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('山茶花神', '十一月 · 晚翠', '山茶', '雪裹开花到春晓，独占三春首。寒冬中炽烈的红。', '笑看万卉独芳菲。', '春晓未至，冰雪封山。\n那抹炽烈的红还在孕育。'),
      en: commonLangs('Camellia', 'Nov · Winter Verdure', 'Camellia', 'Blooming wrapped in snow until spring dawn, dominating the early spring. The blazing red defying the cold winter.', 'Smiling at all flowers, blooming alone.', 'Spring dawn has not arrived, ice seals the mountain.\nThat blazing red is still nurturing.'),
      fr: commonLangs('Camélia', 'Nov · Verdure d\'Hiver', 'Camélia', 'Fleurissant enveloppé de neige jusqu\'à l\'aube du printemps, dominant le début du printemps. Le rouge ardent défiant l\'hiver froid.', 'Souriant à toutes les fleurs, fleurissant seul.', 'L\'aube du printemps n\'est pas arrivée, la glace scelle la montagne.\nCe rouge ardent est encore en gestation.'),
      ja: commonLangs('山茶花神', '十一月 · 晩翠', '椿', '雪に裹まれて花開き春暁に至り、独り三春の首を占む。寒冬の中の熾烈なる紅。', '万卉を笑い見て独り芳菲たり。', '春暁未だ至らず、氷雪山を封ず。\nあの一抹の熾烈なる紅は未だ孕育の中にあり。'),
      ko: commonLangs('동백의 신', '11월 · 만취', '동백', '눈 속에 꽃피워 봄 새벽까지, 홀로 초봄을 독차지하네. 한겨울의 치열한 붉음.', '만발한 꽃들 웃으며 홀로 향기롭네.', '봄 새벽 오지 않았고, 얼음과 눈이 산을 봉했네.\n그 치열한 붉음은 아직 잉태 중이다.')
    } as any
  },
  {
    id: 'narcissus',
    image: './goddess-12.jpg',
    samples: ['./sample-12-1.jpg', './sample-12-2.jpg', './sample-12-3.jpg'],
    color: '#FFFFFF',
    type: 'TWELVE',
    pvUrl: '', 
    translations: {
      zh: commonLangs('水仙花神', '十二月 · 凌波', '水仙', '凌波仙子生尘袜，水上轻盈步微月。清雅脱俗，不染尘埃。', '水沉为骨玉为肌。', '凌波微步，罗袜生尘。\n仙子尚在水云之间流连。'),
      en: commonLangs('Narcissus', 'Dec · Ripple Fairy', 'Narcissus', 'The Ripple Fairy treading on wavelets, stepping lightly on water under the moon. Elegant and refined, unstained by dust.', 'Water as bones, jade as skin.', 'Tiny steps on ripples, dust on silk socks.\nThe fairy still lingers between water and clouds.'),
      fr: commonLangs('Narcisse', 'Déc · Fée des Ondes', 'Narcisse', 'La Fée des Ondes marchant sur les vaguelettes, pas légers sur l\'eau sous la lune. Élégante et raffinée, sans tache de poussière.', 'L\'eau comme os, le jade comme peau.', 'Petits pas sur les ondulations, poussière sur les chaussettes de soie.\nLa fée s\'attarde encore entre l\'eau et les nuages.'),
      ja: commonLangs('水仙花神', '十二月 · 凌波', '水仙', '凌波の仙子、塵襪を生じ、水上軽やかに微月を歩む。清雅脱俗にして、塵埃に染まらず。', '水沈を骨と為し、玉を肌と為す。', '凌波の微歩、羅襪塵を生ず。\n仙子は尚ほ水雲の間に流連す。'),
      ko: commonLangs('수선의 신', '12월 · 능파', '수선화', '물결 위 신선, 먼지 없는 버선 신고 달빛 아래 물 위를 가볍게 걷네. 청아하고 속세 벗어나 티끌 하나 없구나.', '침향이 뼈가 되고 옥이 살이 되었네.', '물결 위 가벼운 걸음, 비단 버선에 먼지 이네.\n선녀는 아직 물과 구름 사이에 머물고 있다.')
    } as any
  }
];
