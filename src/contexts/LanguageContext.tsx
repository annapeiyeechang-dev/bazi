import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  zh: {
    // 页面标题
    'app.title': '八字命理分析',
    'app.subtitle': '基于五行易经算法的专业八字生成系统',
    'app.dateNote': '使用阳历（公历）日期自动转换计算',
    'app.footer': '© 2024 八字生成系统 | 传承中华传统文化',
    
    // 表单
    'form.title': '八字生成系统',
    'form.subtitle': '请输入您的阳历（公历）生日信息',
    'form.gender': '性别',
    'form.gender.required': '性别',
    'form.gender.male': '男',
    'form.gender.female': '女',
    'form.gender.note': '性别影响大运的顺逆排列',
    'form.solarDate': '阳历生日',
    'form.solarDate.required': '阳历生日',
    'form.solarDate.note': '请选择您的公历出生日期（1900-2100年）',
    'form.hour': '出生时辰（可选）',
    'form.hour.select': '请选择时辰',
    'form.hour.note': '时辰影响时柱，不确定可不填',
    'form.birthplace': '出生地（可选）',
    'form.birthplace.placeholder': '例如：北京市',
    'form.birthplace.note': '出生地信息用于参考，可不填',
    'form.submit': '生成八字命盘',
    'form.disclaimer': '本系统基于传统五行易经算法，使用阳历日期自动转换为农历进行八字计算。结果仅供参考娱乐，命运掌握在自己手中。',
    
    // 时辰
    'hour.zi': '子时 (23:00-01:00)',
    'hour.chou': '丑时 (01:00-03:00)',
    'hour.yin': '寅时 (03:00-05:00)',
    'hour.mao': '卯时 (05:00-07:00)',
    'hour.chen': '辰时 (07:00-09:00)',
    'hour.si': '巳时 (09:00-11:00)',
    'hour.wu': '午时 (11:00-13:00)',
    'hour.wei': '未时 (13:00-15:00)',
    'hour.shen': '申时 (15:00-17:00)',
    'hour.you': '酉时 (17:00-19:00)',
    'hour.xu': '戌时 (19:00-21:00)',
    'hour.hai': '亥时 (21:00-23:00)',
    
    // 结果页面
    'result.back': '重新测算',
    'result.lunarDate': '对应农历：',
    'result.bazi.title': '您的八字命盘',
    'result.pillar.year': '年柱',
    'result.pillar.month': '月柱',
    'result.pillar.day': '日柱（日主）',
    'result.pillar.hour': '时柱',
    'result.pillar.unknown': '未知',
    'result.pillar.gan': '天干：',
    'result.pillar.zhi': '地支：',
    'result.mingGong': '命宫：',
    
    // 特殊日
    'specialDays.title': '特殊日分析',
    'specialDays.none': '您的出生日不属于特殊日（十灵日、九丑日、八专日、六秀日、四废日），这是正常的情况。命运主要还是靠自己的努力和选择来创造。',
    'specialDays.summary': '综合分析',
    
    // 大运
    'luckPillars.title': '大运（运柱）',
    'luckPillars.startAge': '起运年龄：',
    'luckPillars.age': '岁',
    'luckPillars.direction': '运势方向：',
    'luckPillars.forward': '顺行',
    'luckPillars.backward': '逆行',
    'luckPillars.step': '第{n}步大运',
    'luckPillars.detail': '第{n}步大运详解',
    'luckPillars.note': '大运每十年一换，代表人生不同阶段的运势走向。点击各运柱可查看详细解析。',
    
    // 命宫
    'mingGong.title': '命宫详解',
    'mingGong.note': '命宫是命理学中最重要的宫位之一，代表一个人的先天禀赋和人生格局',
    
    // 星运神煞
    'starSpirits.title': '星运神煞',
    'starSpirits.none': '暂无特殊星运神煞',
    'starSpirits.note': '星运神煞是命理学中的重要概念，代表命中的吉凶祸福。贵人星主助力，驿马星主变动，文昌星主学业，桃花星主人缘。这些神煞会影响人生的不同方面。',
    
    // 五行
    'wuxing.title': '五行分布',
    'wuxing.count': '{n}个',
    
    // 十神
    'shishen.title': '十神关系',
    
    // 详细解析
    'interpretation.personality': '性格特征',
    'interpretation.career': '事业发展',
    'interpretation.wealth': '财运分析',
    'interpretation.health': '健康建议',
    'interpretation.relationship': '感情婚姻',
    'interpretation.nayin': '纳音五行',
    
    // 免责声明
    'disclaimer.title': '免责声明',
    'disclaimer.content': '本八字分析结果基于传统命理学理论，仅供参考娱乐。人生命运受多种因素影响，包括个人努力、环境变化、机遇等。请理性看待命理分析，积极面对生活，通过自身努力创造美好未来。',
  },
  en: {
    // Page titles
    'app.title': 'BaZi Destiny Analysis',
    'app.subtitle': 'Professional BaZi Calculator Based on Five Elements and I-Ching Algorithms',
    'app.dateNote': 'Using Solar Calendar with Automatic Lunar Conversion',
    'app.footer': '© 2024 BaZi Calculator | Preserving Chinese Traditional Culture',
    
    // Form
    'form.title': 'BaZi Calculator',
    'form.subtitle': 'Please Enter Your Solar Calendar Birth Information',
    'form.gender': 'Gender',
    'form.gender.required': 'Gender',
    'form.gender.male': 'Male',
    'form.gender.female': 'Female',
    'form.gender.note': 'Gender affects the direction of Luck Pillars',
    'form.solarDate': 'Solar Birth Date',
    'form.solarDate.required': 'Solar Birth Date',
    'form.solarDate.note': 'Please select your Gregorian birth date (1900-2100)',
    'form.hour': 'Birth Hour (Optional)',
    'form.hour.select': 'Select Hour',
    'form.hour.note': 'Hour affects the Hour Pillar, can be left blank if uncertain',
    'form.birthplace': 'Birthplace (Optional)',
    'form.birthplace.placeholder': 'e.g., Beijing',
    'form.birthplace.note': 'Birthplace information is for reference only',
    'form.submit': 'Generate BaZi Chart',
    'form.disclaimer': 'This system is based on traditional Five Elements and I-Ching algorithms, using solar dates with automatic lunar conversion for BaZi calculation. Results are for reference and entertainment only. Your destiny is in your own hands.',
    
    // Hours
    'hour.zi': 'Zi Hour (23:00-01:00)',
    'hour.chou': 'Chou Hour (01:00-03:00)',
    'hour.yin': 'Yin Hour (03:00-05:00)',
    'hour.mao': 'Mao Hour (05:00-07:00)',
    'hour.chen': 'Chen Hour (07:00-09:00)',
    'hour.si': 'Si Hour (09:00-11:00)',
    'hour.wu': 'Wu Hour (11:00-13:00)',
    'hour.wei': 'Wei Hour (13:00-15:00)',
    'hour.shen': 'Shen Hour (15:00-17:00)',
    'hour.you': 'You Hour (17:00-19:00)',
    'hour.xu': 'Xu Hour (19:00-21:00)',
    'hour.hai': 'Hai Hour (21:00-23:00)',
    
    // Result page
    'result.back': 'Recalculate',
    'result.lunarDate': 'Lunar Date: ',
    'result.bazi.title': 'Your BaZi Chart',
    'result.pillar.year': 'Year Pillar',
    'result.pillar.month': 'Month Pillar',
    'result.pillar.day': 'Day Pillar (Day Master)',
    'result.pillar.hour': 'Hour Pillar',
    'result.pillar.unknown': 'Unknown',
    'result.pillar.gan': 'Heavenly Stem: ',
    'result.pillar.zhi': 'Earthly Branch: ',
    'result.mingGong': 'Life Palace: ',
    
    // Special Days
    'specialDays.title': 'Special Days Analysis',
    'specialDays.none': 'Your birth date is not a special day (Ten Spirit Days, Nine Ugly Days, Eight Exclusive Days, Six Beautiful Days, Four Waste Days). This is normal. Your destiny is mainly created by your own efforts and choices.',
    'specialDays.summary': 'Comprehensive Analysis',
    
    // Luck Pillars
    'luckPillars.title': 'Luck Pillars (Da Yun)',
    'luckPillars.startAge': 'Starting Age: ',
    'luckPillars.age': ' years old',
    'luckPillars.direction': 'Direction: ',
    'luckPillars.forward': 'Forward',
    'luckPillars.backward': 'Backward',
    'luckPillars.step': 'Luck Pillar {n}',
    'luckPillars.detail': 'Luck Pillar {n} Details',
    'luckPillars.note': 'Luck Pillars change every ten years, representing different life stages. Click each pillar for detailed interpretation.',
    
    // Life Palace
    'mingGong.title': 'Life Palace Details',
    'mingGong.note': 'The Life Palace is one of the most important palaces in destiny analysis, representing innate endowments and life patterns',
    
    // Star Spirits
    'starSpirits.title': 'Star Spirits (Shen Sha)',
    'starSpirits.none': 'No special star spirits',
    'starSpirits.note': 'Star Spirits are important concepts in destiny analysis, representing fortune and misfortune. Noble Stars bring assistance, Travel Stars indicate movement, Literary Stars favor academics, and Peach Blossom Stars enhance relationships. These spirits influence different aspects of life.',
    
    // Five Elements
    'wuxing.title': 'Five Elements Distribution',
    'wuxing.count': '{n}',
    
    // Ten Gods
    'shishen.title': 'Ten Gods Relationships',
    
    // Detailed Interpretation
    'interpretation.personality': 'Personality Traits',
    'interpretation.career': 'Career Development',
    'interpretation.wealth': 'Wealth Analysis',
    'interpretation.health': 'Health Advice',
    'interpretation.relationship': 'Relationships & Marriage',
    'interpretation.nayin': 'Nayin Five Elements',
    
    // Disclaimer
    'disclaimer.title': 'Disclaimer',
    'disclaimer.content': 'This BaZi analysis is based on traditional Chinese metaphysics theories and is for reference and entertainment only. Life destiny is influenced by many factors including personal effort, environmental changes, and opportunities. Please view destiny analysis rationally, face life positively, and create a better future through your own efforts.',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  const t = (key: string): string => {
    const translation = translations[language][key];
    return translation || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
