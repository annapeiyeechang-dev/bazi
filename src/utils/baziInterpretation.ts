// 八字解析
import { BaziResult } from './baziCalculator';

export interface Interpretation {
  personality: string;
  career: string;
  wealth: string;
  health: string;
  relationship: string;
  wuxingAnalysis: string;
  shishenAnalysis: string;
  nayinAnalysis: string;
}

export function interpretBazi(bazi: BaziResult): Interpretation {
  const dayGan = bazi.dayGan;
  const wuxing = bazi.wuxingCount;
  
  // 找出最强和最弱的五行
  const sortedWuxing = Object.entries(wuxing).sort((a, b) => b[1] - a[1]);
  const strongestWuxing = sortedWuxing[0][0];
  const weakestWuxing = sortedWuxing[sortedWuxing.length - 1][0];
  
  // 性格分析
  const personality = getPersonalityByDayGan(dayGan, strongestWuxing);
  
  // 事业分析
  const career = getCareerAnalysis(dayGan, bazi.shishen);
  
  // 财运分析
  const wealth = getWealthAnalysis(wuxing, bazi.shishen);
  
  // 健康分析
  const health = getHealthAnalysis(wuxing, weakestWuxing);
  
  // 感情分析
  const relationship = getRelationshipAnalysis(dayGan, bazi.monthPillar.zhi);
  
  // 五行分析
  const wuxingAnalysis = getWuxingAnalysis(wuxing, strongestWuxing, weakestWuxing);
  
  // 十神分析
  const shishenAnalysis = getShishenAnalysis(bazi.shishen);
  
  // 纳音分析
  const nayinAnalysis = getNayinAnalysis(bazi.nayin);
  
  return {
    personality,
    career,
    wealth,
    health,
    relationship,
    wuxingAnalysis,
    shishenAnalysis,
    nayinAnalysis
  };
}

function getPersonalityByDayGan(dayGan: string, strongestWuxing: string): string {
  const ganPersonality: { [key: string]: string } = {
    '甲': '性格刚直，富有进取心，具有领导才能。为人正直不屈，有强烈的正义感。',
    '乙': '性格温和，善于适应环境，具有艺术天赋。为人柔顺，善解人意。',
    '丙': '性格热情，充满活力，具有创造力。为人豪爽，乐于助人。',
    '丁': '性格细腻，思维敏捷，具有洞察力。为人谨慎，注重细节。',
    '戊': '性格稳重，踏实可靠，具有包容心。为人诚实，值得信赖。',
    '己': '性格内敛，善于思考，具有耐心。为人谦和，善于倾听。',
    '庚': '性格果断，意志坚强，具有执行力。为人刚毅，不畏困难。',
    '辛': '性格细致，追求完美，具有审美能力。为人精致，注重品质。',
    '壬': '性格灵活，善于变通，具有智慧。为人聪慧，思维活跃。',
    '癸': '性格柔和，富有想象力，具有同情心。为人温柔，善良体贴。'
  };
  
  const wuxingTrait: { [key: string]: string } = {
    '木': '您的五行木旺，具有生发向上的特质，富有创造力和进取心。',
    '火': '您的五行火旺，具有热情奔放的特质，充满活力和激情。',
    '土': '您的五行土旺，具有稳重厚实的特质，踏实可靠。',
    '金': '您的五行金旺，具有刚毅果断的特质，意志坚定。',
    '水': '您的五行水旺，具有灵活智慧的特质，善于变通。'
  };
  
  return `${ganPersonality[dayGan] || '性格独特，具有个人魅力。'}\n\n${wuxingTrait[strongestWuxing]}`;
}

function getCareerAnalysis(dayGan: string, shishen: { [key: string]: string }): string {
  const hasQisha = Object.values(shishen).includes('七杀');
  const hasZhengguan = Object.values(shishen).includes('正官');
  const hasShishen = Object.values(shishen).includes('食神');
  
  let career = '您适合从事';
  
  if (hasZhengguan) {
    career += '管理、行政、公务员等需要权威和责任的工作。';
  } else if (hasQisha) {
    career += '竞争性强的行业，如销售、创业、军警等。';
  } else if (hasShishen) {
    career += '创意、艺术、教育、餐饮等服务性行业。';
  } else {
    career += '技术、专业性强的工作，发挥您的专长。';
  }
  
  career += '\n\n建议您在职业发展中发挥自身优势，选择适合自己性格特点的领域。';
  
  return career;
}

function getWealthAnalysis(wuxing: { [key: string]: number }, shishen: { [key: string]: string }): string {
  const hasPiancai = Object.values(shishen).includes('偏财');
  const hasZhengcai = Object.values(shishen).includes('正财');
  
  let wealth = '财运方面，';
  
  if (hasZhengcai) {
    wealth += '您具有稳定的财运，适合通过正当职业和稳健投资积累财富。';
  } else if (hasPiancai) {
    wealth += '您具有偏财运，适合通过投资、创业等方式获取财富，但需注意风险控制。';
  } else {
    wealth += '您的财运较为平稳，建议通过勤奋工作和合理规划来积累财富。';
  }
  
  wealth += '\n\n理财建议：量入为出，适度储蓄，谨慎投资。';
  
  return wealth;
}

function getHealthAnalysis(wuxing: { [key: string]: number }, weakestWuxing: string): string {
  const healthAdvice: { [key: string]: string } = {
    '木': '肝胆系统，注意情绪调节，避免过度劳累。',
    '火': '心血管系统，注意心脏健康，保持良好作息。',
    '土': '脾胃系统，注意饮食规律，避免暴饮暴食。',
    '金': '肺部呼吸系统，注意呼吸道健康，避免吸烟。',
    '水': '肾脏泌尿系统，注意补充水分，避免过度劳累。'
  };
  
  return `健康方面，您的五行${weakestWuxing}较弱，需要特别关注${healthAdvice[weakestWuxing]}\n\n建议：保持规律作息，适度运动，均衡饮食，定期体检。`;
}

function getRelationshipAnalysis(dayGan: string, monthZhi: string): string {
  const relationship = '感情方面，';
  
  const advice = relationship + '您重视感情，对待伴侣真诚。建议在感情中保持沟通，相互理解，共同成长。\n\n婚姻建议：选择性格互补的伴侣，注重精神层面的交流，培养共同兴趣。';
  
  return advice;
}

function getWuxingAnalysis(wuxing: { [key: string]: number }, strongest: string, weakest: string): string {
  let analysis = '五行分析：\n\n';
  
  Object.entries(wuxing).forEach(([element, count]) => {
    analysis += `${element}：${count}个 `;
    if (element === strongest) {
      analysis += '（旺）';
    } else if (element === weakest) {
      analysis += '（弱）';
    }
    analysis += '\n';
  });
  
  analysis += `\n您的五行${strongest}最旺，${weakest}最弱。`;
  analysis += `\n\n建议：在日常生活中可以通过颜色、方位、饰品等方式补充${weakest}元素，以达到五行平衡。`;
  
  return analysis;
}

function getShishenAnalysis(shishen: { [key: string]: string }): string {
  let analysis = '十神分析：\n\n';
  
  Object.entries(shishen).forEach(([position, god]) => {
    analysis += `${position}：${god}\n`;
  });
  
  analysis += '\n十神代表了您与周围人事物的关系，反映了您的性格特点和人生际遇。';
  
  return analysis;
}

function getNayinAnalysis(nayin: { [key: string]: string }): string {
  let analysis = '纳音分析：\n\n';
  
  Object.entries(nayin).forEach(([pillar, sound]) => {
    if (sound) {
      analysis += `${pillar}：${sound}\n`;
    }
  });
  
  analysis += '\n纳音五行是对干支五行的补充，代表了更深层次的命理特征。';
  
  return analysis;
}
