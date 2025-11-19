// 运柱（大运）计算
import { Pillar } from './baziCalculator';
import { TIANGAN, DIZHI, TIANGAN_WUXING, DIZHI_WUXING, TIANGAN_YINYANG, DIZHI_YINYANG } from './baziCalculator';

export interface LuckPillar extends Pillar {
  startAge: number;
  endAge: number;
}

export interface LuckPillarsResult {
  pillars: LuckPillar[];
  startAge: number;
  direction: 'forward' | 'backward';
}

// 计算起运岁数
function calculateStartAge(
  gender: 'male' | 'female',
  yearGanYinyang: string,
  birthYear: number,
  birthMonth: number,
  birthDay: number
): number {
  // 阳男阴女顺行，阴男阳女逆行
  const isForward = (gender === 'male' && yearGanYinyang === '阳') || 
                    (gender === 'female' && yearGanYinyang === '阴');
  
  // 计算到下一个节气的天数（简化算法）
  // 实际应该根据精确的节气时间计算
  // 这里使用简化方法：假设每月15日为节气
  
  let daysToNextJieqi: number;
  
  if (isForward) {
    // 顺行：计算到下一个节气的天数
    if (birthDay <= 15) {
      daysToNextJieqi = 15 - birthDay;
    } else {
      // 到下个月的节气
      const daysInMonth = new Date(birthYear, birthMonth, 0).getDate();
      daysToNextJieqi = daysInMonth - birthDay + 15;
    }
  } else {
    // 逆行：计算到上一个节气的天数
    if (birthDay >= 15) {
      daysToNextJieqi = birthDay - 15;
    } else {
      // 到上个月的节气
      daysToNextJieqi = birthDay + 15;
    }
  }
  
  // 三天折一年，计算起运岁数
  const startAge = Math.floor(daysToNextJieqi / 3);
  
  return startAge;
}

// 计算运柱
export function calculateLuckPillars(
  gender: 'male' | 'female',
  monthPillar: Pillar,
  yearGanYinyang: string,
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  numberOfPillars: number = 8
): LuckPillarsResult {
  // 计算起运岁数
  const startAge = calculateStartAge(gender, yearGanYinyang, birthYear, birthMonth, birthDay);
  
  // 判断顺逆
  const isForward = (gender === 'male' && yearGanYinyang === '阳') || 
                    (gender === 'female' && yearGanYinyang === '阴');
  
  const direction = isForward ? 'forward' : 'backward';
  
  // 获取月柱的天干地支索引
  const monthGanIndex = TIANGAN.indexOf(monthPillar.gan);
  const monthZhiIndex = DIZHI.indexOf(monthPillar.zhi);
  
  const pillars: LuckPillar[] = [];
  
  for (let i = 0; i < numberOfPillars; i++) {
    let ganIndex: number;
    let zhiIndex: number;
    
    if (isForward) {
      // 顺行：天干地支都递增
      ganIndex = (monthGanIndex + i + 1) % 10;
      zhiIndex = (monthZhiIndex + i + 1) % 12;
    } else {
      // 逆行：天干地支都递减
      ganIndex = (monthGanIndex - i - 1 + 10) % 10;
      zhiIndex = (monthZhiIndex - i - 1 + 12) % 12;
    }
    
    const gan = TIANGAN[ganIndex];
    const zhi = DIZHI[zhiIndex];
    
    pillars.push({
      gan,
      zhi,
      ganWuxing: TIANGAN_WUXING[gan],
      zhiWuxing: DIZHI_WUXING[zhi],
      ganYinyang: TIANGAN_YINYANG[gan],
      zhiYinyang: DIZHI_YINYANG[zhi],
      startAge: startAge + i * 10,
      endAge: startAge + (i + 1) * 10 - 1
    });
  }
  
  return {
    pillars,
    startAge,
    direction
  };
}

// 运柱解析
export function interpretLuckPillar(pillar: LuckPillar, dayGan: string): string {
  const { gan, zhi, startAge, endAge } = pillar;
  
  let interpretation = `${startAge}-${endAge}岁大运：${gan}${zhi}\n\n`;
  
  // 基于天干的解析
  const ganInterpretations: { [key: string]: string } = {
    '甲': '此运木气旺盛，利于发展、创新，事业有向上之势。',
    '乙': '此运木气柔和，利于人际关系，适合稳步发展。',
    '丙': '此运火气旺盛，热情高涨，利于开拓进取。',
    '丁': '此运火气温和，思维敏捷，利于文化事业。',
    '戊': '此运土气厚重，稳重踏实，利于积累财富。',
    '己': '此运土气温和，内敛沉稳，利于修身养性。',
    '庚': '此运金气刚强，果断坚毅，利于改革变动。',
    '辛': '此运金气柔和，精致细腻，利于技艺提升。',
    '壬': '此运水气旺盛，智慧灵活，利于学习进修。',
    '癸': '此运水气柔和，温润如玉，利于感情发展。'
  };
  
  // 基于地支的解析
  const zhiInterpretations: { [key: string]: string } = {
    '子': '水旺之地，智慧增长，适合学习和思考。',
    '丑': '土旺之地，稳重务实，适合积累和储蓄。',
    '寅': '木旺之地，生机勃勃，适合创业和发展。',
    '卯': '木旺之地，温和向上，适合人际交往。',
    '辰': '土旺之地，包容厚重，适合稳定发展。',
    '巳': '火旺之地，热情奔放，适合开拓进取。',
    '午': '火旺之地，光明热烈，适合展现才华。',
    '未': '土旺之地，温和包容，适合团队合作。',
    '申': '金旺之地，果断刚毅，适合改革创新。',
    '酉': '金旺之地，精致完美，适合技艺精进。',
    '戌': '土旺之地，忠诚可靠，适合稳定职业。',
    '亥': '水旺之地，智慧深邃，适合学术研究。'
  };
  
  interpretation += ganInterpretations[gan] || '此运特质独特。';
  interpretation += '\n';
  interpretation += zhiInterpretations[zhi] || '此运环境特殊。';
  
  // 添加建议
  interpretation += '\n\n建议：把握运势特点，顺势而为，积极进取。';
  
  return interpretation;
}
