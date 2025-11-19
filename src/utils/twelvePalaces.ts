// 十二宫位系统 (Zi Wei Dou Shu - 12 Palaces System)
import { BaziResult } from './baziCalculator';

export interface Palace {
  name: string;
  nameEn: string;
  position: string; // 地支位置
  description: string;
  descriptionEn: string;
}

export interface TwelvePalacesResult {
  palaces: Palace[];
  lifePalacePosition: string; // 命宫地支
}

// 十二宫位名称（按顺序）
const PALACE_NAMES = [
  { zh: '命宫', en: 'Life Palace / Destiny Palace' },
  { zh: '兄弟宫', en: 'Siblings Palace' },
  { zh: '夫妻宫', en: 'Spouse / Marriage Palace' },
  { zh: '子女宫', en: 'Children Palace' },
  { zh: '财帛宫', en: 'Wealth / Finance Palace' },
  { zh: '疾厄宫', en: 'Health Palace' },
  { zh: '迁移宫', en: 'Travel / Movement Palace' },
  { zh: '交友宫', en: 'Friends / Social Palace' },
  { zh: '事业宫', en: 'Career / Profession Palace' },
  { zh: '田宅宫', en: 'Property / Real Estate Palace' },
  { zh: '福德宫', en: 'Mental State / Blessing Palace' },
  { zh: '父母宫', en: 'Parents Palace' }
];

// 地支顺序
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 宫位描述
const PALACE_DESCRIPTIONS: { [key: string]: { zh: string; en: string } } = {
  '命宫': {
    zh: '代表个人的先天命格、性格特质、外貌气质、人生格局和整体运势。是十二宫中最重要的宫位，影响一生的基本走向。',
    en: 'Represents innate destiny, personality traits, appearance, life pattern, and overall fortune. The most important palace among the twelve, influencing the fundamental direction of one\'s life.'
  },
  '兄弟宫': {
    zh: '代表与兄弟姐妹、朋友、同事的关系，以及合作伙伴关系。反映人际交往能力和社交圈子的状况。',
    en: 'Represents relationships with siblings, friends, and colleagues, as well as partnerships. Reflects interpersonal skills and social circle conditions.'
  },
  '夫妻宫': {
    zh: '代表婚姻状况、配偶特质、感情生活和婚姻关系的发展。影响恋爱、婚姻的和谐程度。',
    en: 'Represents marital status, spouse characteristics, romantic life, and marriage development. Influences the harmony of love and marriage.'
  },
  '子女宫': {
    zh: '代表子女缘分、子女性格、亲子关系，以及生育能力。也反映创造力和下属关系。',
    en: 'Represents children\'s destiny, their personalities, parent-child relationships, and fertility. Also reflects creativity and subordinate relationships.'
  },
  '财帛宫': {
    zh: '代表财运、理财能力、收入来源和财富积累。反映赚钱能力和财务状况。',
    en: 'Represents wealth fortune, financial management ability, income sources, and wealth accumulation. Reflects earning capacity and financial status.'
  },
  '疾厄宫': {
    zh: '代表健康状况、体质强弱、易患疾病和意外灾祸。反映身体素质和健康运势。',
    en: 'Represents health conditions, physical constitution, susceptibility to illness, and accidents. Reflects physical fitness and health fortune.'
  },
  '迁移宫': {
    zh: '代表外出运势、旅行机会、环境变动和人生转折。反映适应变化的能力和外出发展的机遇。',
    en: 'Represents travel fortune, opportunities for journeys, environmental changes, and life transitions. Reflects adaptability and opportunities for external development.'
  },
  '交友宫': {
    zh: '代表朋友关系、社交能力、人脉资源和贵人运。反映社交圈的质量和人际支持。',
    en: 'Represents friendships, social abilities, network resources, and benefactor luck. Reflects the quality of social circles and interpersonal support.'
  },
  '事业宫': {
    zh: '代表事业发展、工作状况、职业成就和社会地位。反映事业运势和职场表现。',
    en: 'Represents career development, work conditions, professional achievements, and social status. Reflects career fortune and workplace performance.'
  },
  '田宅宫': {
    zh: '代表不动产、家庭环境、居住状况和祖业。反映物质基础和家庭背景。',
    en: 'Represents real estate, family environment, living conditions, and ancestral property. Reflects material foundation and family background.'
  },
  '福德宫': {
    zh: '代表精神状态、心理健康、兴趣爱好和生活品质。反映内心世界和精神享受。',
    en: 'Represents mental state, psychological health, hobbies, and quality of life. Reflects inner world and spiritual enjoyment.'
  },
  '父母宫': {
    zh: '代表父母关系、长辈缘分、家庭教育和上司关系。反映与权威人物的互动。',
    en: 'Represents parental relationships, elder connections, family education, and superior relationships. Reflects interactions with authority figures.'
  }
};

/**
 * 计算十二宫位
 * 命宫起法：以生月和生时确定命宫位置
 * 从寅宫起正月，顺数至生月，再从生月起子时，逆数至生时，即为命宫
 */
export function calculateTwelvePalaces(bazi: BaziResult): TwelvePalacesResult {
  // 获取月支和时支
  const monthBranch = bazi.monthPillar.zhi;
  const hourBranch = bazi.hourPillar?.zhi || '子'; // 如果没有时辰，默认用子时
  
  // 月支索引（寅月为正月，从寅开始）
  const monthStartIndex = EARTHLY_BRANCHES.indexOf('寅');
  const monthBranchIndex = EARTHLY_BRANCHES.indexOf(monthBranch);
  
  // 计算生月在寅起正月中的位置
  let monthPosition = (monthBranchIndex - monthStartIndex + 12) % 12;
  
  // 从生月位置起子时，逆数至生时
  const hourBranchIndex = EARTHLY_BRANCHES.indexOf(hourBranch);
  const ziIndex = EARTHLY_BRANCHES.indexOf('子');
  
  // 计算命宫位置（逆数）
  const lifePalaceIndex = (monthBranchIndex - (ziIndex - hourBranchIndex) + 12) % 12;
  const lifePalacePosition = EARTHLY_BRANCHES[lifePalaceIndex];
  
  // 从命宫开始，顺时针排列十二宫
  const palaces: Palace[] = [];
  
  for (let i = 0; i < 12; i++) {
    const palaceIndex = (lifePalaceIndex + i) % 12;
    const position = EARTHLY_BRANCHES[palaceIndex];
    const palaceName = PALACE_NAMES[i];
    const description = PALACE_DESCRIPTIONS[palaceName.zh];
    
    palaces.push({
      name: palaceName.zh,
      nameEn: palaceName.en,
      position: position,
      description: description.zh,
      descriptionEn: description.en
    });
  }
  
  return {
    palaces,
    lifePalacePosition
  };
}

/**
 * 获取宫位的详细解释
 */
export function getPalaceInterpretation(palace: Palace, bazi: BaziResult): string {
  // 这里可以根据宫位中的星曜（如果有）进行更详细的解释
  // 目前先返回基本描述
  return palace.description;
}
