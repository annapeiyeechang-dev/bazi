// 特殊日分析
import { Pillar } from './baziCalculator';

export interface SpecialDay {
  name: string;
  type: 'auspicious' | 'inauspicious' | 'neutral';
  description: string;
  effects: string;
}

// 十灵日 - 十个吉利的日子
const TEN_SPIRITS_DAYS = [
  '甲辰', '乙巳', '丙辰', '丁巳', '戊午',
  '庚戌', '庚辰', '辛亥', '壬子', '癸丑'
];

// 九丑日 - 九个不吉利的日子
const NINE_UGLY_DAYS = [
  '戊子', '己丑', '庚寅', '辛卯', '壬辰',
  '癸巳', '丙申', '丁酉', '戊戌'
];

// 八专日 - 八个专旺的日子
const EIGHT_EXCLUSIVE_DAYS = [
  '甲寅', '乙卯', '己未', '丁未',
  '庚申', '辛酉', '戊戌', '癸丑'
];

// 六秀日 - 六个秀气的日子
const SIX_ELEGANT_DAYS = [
  '丙午', '丁未', '戊子', '戊午',
  '己丑', '己未'
];

// 四废日 - 四个废弃的日子（根据季节）
const FOUR_WASTE_DAYS: { [key: string]: string[] } = {
  '春': ['庚申', '辛酉'], // 春季（寅卯辰月）
  '夏': ['壬子', '癸亥'], // 夏季（巳午未月）
  '秋': ['甲寅', '乙卯'], // 秋季（申酉戌月）
  '冬': ['丙午', '丁巳']  // 冬季（亥子丑月）
};

// 根据月支判断季节
function getSeason(monthZhi: string): string {
  const springMonths = ['寅', '卯', '辰'];
  const summerMonths = ['巳', '午', '未'];
  const autumnMonths = ['申', '酉', '戌'];
  const winterMonths = ['亥', '子', '丑'];

  if (springMonths.includes(monthZhi)) return '春';
  if (summerMonths.includes(monthZhi)) return '夏';
  if (autumnMonths.includes(monthZhi)) return '秋';
  if (winterMonths.includes(monthZhi)) return '冬';
  
  return '春';
}

// 检测特殊日
export function detectSpecialDays(dayPillar: Pillar, monthZhi: string): SpecialDay[] {
  const specialDays: SpecialDay[] = [];
  const dayGanZhi = dayPillar.gan + dayPillar.zhi;

  console.log('检测特殊日 - 日柱:', dayGanZhi, '月支:', monthZhi);

  // 检测十灵日
  if (TEN_SPIRITS_DAYS.includes(dayGanZhi)) {
    console.log('检测到十灵日');
    specialDays.push({
      name: '十灵日',
      type: 'auspicious',
      description: '十灵日是十个特别吉利的日子，主聪明灵秀，才华横溢',
      effects: '生于此日者，天资聪颖，悟性极高，多才多艺。利于学业、考试、创作。性格机敏，反应快，善于学习新事物。在文化、艺术、科技领域容易有所成就。'
    });
  }

  // 检测九丑日
  if (NINE_UGLY_DAYS.includes(dayGanZhi)) {
    console.log('检测到九丑日');
    specialDays.push({
      name: '九丑日',
      type: 'inauspicious',
      description: '九丑日是九个不太吉利的日子，主波折坎坷，需谨慎行事',
      effects: '生于此日者，人生道路可能较为曲折，容易遇到阻碍和挫折。需要更加努力和坚持才能获得成功。建议：保持积极心态，遇事三思而后行，多积累经验，化解不利因素。通过后天努力可以改善运势。'
    });
  }

  // 检测八专日
  if (EIGHT_EXCLUSIVE_DAYS.includes(dayGanZhi)) {
    console.log('检测到八专日');
    specialDays.push({
      name: '八专日',
      type: 'neutral',
      description: '八专日是八个专旺的日子，主性格专一，执着坚定',
      effects: '生于此日者，性格专注执着，做事认真投入，不轻易放弃。对感情专一，对事业执着。优点是意志坚定，能够持之以恒；需注意避免过于固执，要学会灵活变通。适合从事需要专注和耐心的工作。'
    });
  }

  // 检测六秀日
  if (SIX_ELEGANT_DAYS.includes(dayGanZhi)) {
    console.log('检测到六秀日');
    specialDays.push({
      name: '六秀日',
      type: 'auspicious',
      description: '六秀日是六个秀气的日子，主气质优雅，才华出众',
      effects: '生于此日者，气质优雅，举止得体，具有艺术天赋和审美能力。性格温和，善于交际，人缘好。在文化、艺术、设计等领域容易有所建树。外表俊美，内在修养好，给人留下深刻印象。'
    });
  }

  // 检测四废日
  const season = getSeason(monthZhi);
  const wasteDays = FOUR_WASTE_DAYS[season] || [];
  console.log('季节:', season, '四废日列表:', wasteDays);
  
  if (wasteDays.includes(dayGanZhi)) {
    console.log('检测到四废日');
    specialDays.push({
      name: '四废日',
      type: 'inauspicious',
      description: `四废日是四个不利的日子（${season}季），主运势低迷，诸事不顺`,
      effects: '生于此日者，在某些方面可能会遇到较多困难和阻力。需要付出更多努力才能达成目标。建议：保持耐心，不要急于求成，稳扎稳打。多向他人学习，借助外力帮助。通过积累和沉淀，可以逐步改善运势。'
    });
  }

  console.log('检测到的特殊日数量:', specialDays.length);
  return specialDays;
}

// 获取特殊日综合分析
export function getSpecialDaysAnalysis(specialDays: SpecialDay[]): string {
  if (specialDays.length === 0) {
    return '您的出生日不属于特殊日，这是正常的情况。命运主要还是靠自己的努力和选择来创造。';
  }

  let analysis = '您的出生日具有以下特殊属性：\n\n';

  specialDays.forEach((day, index) => {
    analysis += `${index + 1}. ${day.name}\n`;
    analysis += `   ${day.description}\n`;
    analysis += `   ${day.effects}\n\n`;
  });

  // 如果同时有吉利和不吉利的日子
  const hasAuspicious = specialDays.some(d => d.type === 'auspicious');
  const hasInauspicious = specialDays.some(d => d.type === 'inauspicious');

  if (hasAuspicious && hasInauspicious) {
    analysis += '综合来看：您的命格既有吉利的一面，也有需要注意的方面。建议发挥优势，规避劣势，保持平衡心态，积极面对人生。';
  } else if (hasAuspicious) {
    analysis += '综合来看：您的出生日较为吉利，具有良好的先天条件。建议充分发挥自身优势，把握机遇，创造美好未来。';
  } else if (hasInauspicious) {
    analysis += '综合来看：您的出生日存在一些挑战。但请记住，命运掌握在自己手中，通过后天努力和正确选择，完全可以改善运势，创造精彩人生。';
  }

  return analysis;
}
