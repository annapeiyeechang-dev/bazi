// 八字计算核心算法
import { LunarDate } from './lunarCalendar';
import { Solar, Lunar } from 'lunar-javascript';

// 天干
export const TIANGAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
export const DIZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行
export const WUXING = ['木', '火', '土', '金', '水'];

// 天干五行
export const TIANGAN_WUXING: { [key: string]: string } = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行
export const DIZHI_WUXING: { [key: string]: string } = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木',
  '辰': '土', '巳': '火', '午': '火', '未': '土',
  '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 天干阴阳
export const TIANGAN_YINYANG: { [key: string]: string } = {
  '甲': '阳', '乙': '阴',
  '丙': '阳', '丁': '阴',
  '戊': '阳', '己': '阴',
  '庚': '阳', '辛': '阴',
  '壬': '阳', '癸': '阴'
};

// 地支阴阳
export const DIZHI_YINYANG: { [key: string]: string } = {
  '子': '阳', '丑': '阴', '寅': '阳', '卯': '阴',
  '辰': '阳', '巳': '阴', '午': '阳', '未': '阴',
  '申': '阳', '酉': '阴', '戌': '阳', '亥': '阴'
};

// 十神
export const SHISHEN = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'];

// 十二宫位
export const GONGWEI = ['命宫', '兄弟宫', '夫妻宫', '子女宫', '财帛宫', '疾厄宫', '迁移宫', '奴仆宫', '官禄宫', '田宅宫', '福德宫', '父母宫'];

export interface Pillar {
  gan: string;
  zhi: string;
  ganWuxing: string;
  zhiWuxing: string;
  ganYinyang: string;
  zhiYinyang: string;
  nayin: string;
}

export interface MingGong {
  gan: string;
  zhi: string;
  description: string;
}

export interface StarSpirit {
  name: string;
  pillar: string;
  description: string;
}

export interface BaziResult {
  yearPillar: Pillar;
  monthPillar: Pillar;
  dayPillar: Pillar;
  hourPillar: Pillar | null;
  dayGan: string;
  wuxingCount: { [key: string]: number };
  shishen: { [key: string]: string };
  gongwei: string;
  nayin: { [key: string]: string };
  mingGong: MingGong;
  starSpirits: StarSpirit[];
}

// 解析干支字符串（处理两个字符的干支）
function parseGanZhi(ganZhiStr: string): { gan: string; zhi: string } {
  if (!ganZhiStr || ganZhiStr.length < 2) {
    console.error('Invalid GanZhi string:', ganZhiStr);
    throw new Error(`Invalid GanZhi string: ${ganZhiStr}`);
  }
  
  const gan = ganZhiStr[0];
  const zhi = ganZhiStr[1];
  
  console.log('解析干支:', ganZhiStr, '-> 天干:', gan, '地支:', zhi);
  
  // 验证天干地支是否有效
  if (!TIANGAN.includes(gan)) {
    throw new Error(`Invalid Tiangan: ${gan}`);
  }
  if (!DIZHI.includes(zhi)) {
    throw new Error(`Invalid Dizhi: ${zhi}`);
  }
  
  return { gan, zhi };
}

// 使用 lunar-javascript 库直接获取年柱
function getYearPillar(solar: any): Pillar {
  const lunar = solar.getLunar();
  const yearGanZhi = lunar.getYearInGanZhiExact();
  
  console.log('Year GanZhi:', yearGanZhi);
  
  const { gan, zhi } = parseGanZhi(yearGanZhi);
  const nayin = getNayin(gan, zhi);
  
  return {
    gan,
    zhi,
    ganWuxing: TIANGAN_WUXING[gan],
    zhiWuxing: DIZHI_WUXING[zhi],
    ganYinyang: TIANGAN_YINYANG[gan],
    zhiYinyang: DIZHI_YINYANG[zhi],
    nayin
  };
}

// 使用 lunar-javascript 库直接获取月柱
function getMonthPillar(solar: any): Pillar {
  const lunar = solar.getLunar();
  const monthGanZhi = lunar.getMonthInGanZhiExact();
  
  console.log('Month GanZhi:', monthGanZhi);
  
  const { gan, zhi } = parseGanZhi(monthGanZhi);
  const nayin = getNayin(gan, zhi);
  
  return {
    gan,
    zhi,
    ganWuxing: TIANGAN_WUXING[gan],
    zhiWuxing: DIZHI_WUXING[zhi],
    ganYinyang: TIANGAN_YINYANG[gan],
    zhiYinyang: DIZHI_YINYANG[zhi],
    nayin
  };
}

// 使用 lunar-javascript 库直接获取日柱
function getDayPillar(solar: any): Pillar {
  const lunar = solar.getLunar();
  const dayGanZhi = lunar.getDayInGanZhi();
  
  console.log('Day GanZhi:', dayGanZhi);
  
  const { gan, zhi } = parseGanZhi(dayGanZhi);
  const nayin = getNayin(gan, zhi);
  
  return {
    gan,
    zhi,
    ganWuxing: TIANGAN_WUXING[gan],
    zhiWuxing: DIZHI_WUXING[zhi],
    ganYinyang: TIANGAN_YINYANG[gan],
    zhiYinyang: DIZHI_YINYANG[zhi],
    nayin
  };
}

// 使用 lunar-javascript 库直接获取时柱
function getHourPillar(solar: any, hour: number): Pillar {
  const lunar = solar.getLunar();
  
  const hourZhiIndex = Math.floor((hour + 1) / 2) % 12;
  const dayGanZhi = lunar.getDayInGanZhi();
  const { gan: dayGan } = parseGanZhi(dayGanZhi);
  const dayGanIndex = TIANGAN.indexOf(dayGan);
  
  const hourGanIndex = (dayGanIndex * 2 + hourZhiIndex) % 10;
  
  const gan = TIANGAN[hourGanIndex];
  const zhi = DIZHI[hourZhiIndex];
  const nayin = getNayin(gan, zhi);
  
  console.log('Hour Pillar:', gan + zhi);
  
  return {
    gan,
    zhi,
    ganWuxing: TIANGAN_WUXING[gan],
    zhiWuxing: DIZHI_WUXING[zhi],
    ganYinyang: TIANGAN_YINYANG[gan],
    zhiYinyang: DIZHI_YINYANG[zhi],
    nayin
  };
}

// 计算命宫
function calculateMingGong(monthZhi: string, hourZhi: string | null): MingGong {
  console.log('Calculating MingGong with monthZhi:', monthZhi, 'hourZhi:', hourZhi);
  
  if (!monthZhi) {
    throw new Error('monthZhi is required for MingGong calculation');
  }
  
  const monthZhiIndex = DIZHI.indexOf(monthZhi);
  
  if (monthZhiIndex === -1) {
    throw new Error(`Invalid monthZhi: ${monthZhi}`);
  }
  
  let mingGongZhiIndex: number;
  
  if (hourZhi) {
    const hourZhiIndex = DIZHI.indexOf(hourZhi);
    if (hourZhiIndex === -1) {
      throw new Error(`Invalid hourZhi: ${hourZhi}`);
    }
    mingGongZhiIndex = (14 - monthZhiIndex - hourZhiIndex) % 12;
  } else {
    mingGongZhiIndex = (monthZhiIndex + 6) % 12;
  }
  
  const mingGongZhi = DIZHI[mingGongZhiIndex];
  const mingGongGanIndex = mingGongZhiIndex % 10;
  const mingGongGan = TIANGAN[mingGongGanIndex];
  
  const descriptions: { [key: string]: string } = {
    '子': '聪明机智，善于思考，适合从事智力工作',
    '丑': '踏实稳重，勤劳务实，财运稳定',
    '寅': '勇敢进取，富有领导才能，事业有成',
    '卯': '温和善良，人缘好，艺术天赋高',
    '辰': '聪慧多才，善于变通，贵人运强',
    '巳': '智慧过人，口才好，适合经商',
    '午': '热情开朗，积极向上，事业运佳',
    '未': '温柔体贴，心地善良，家庭和睦',
    '申': '机智灵活，善于交际，财运亨通',
    '酉': '细致认真，追求完美，技艺精湛',
    '戌': '忠诚可靠，责任心强，晚年安康',
    '亥': '聪明善良，富有同情心，福禄双全'
  };
  
  console.log('MingGong result:', mingGongGan + mingGongZhi);
  
  return {
    gan: mingGongGan,
    zhi: mingGongZhi,
    description: descriptions[mingGongZhi] || '命宫特质独特'
  };
}

// 计算星运（贵人、驿马等）
function calculateStarSpirits(yearPillar: Pillar, monthPillar: Pillar, dayPillar: Pillar, hourPillar: Pillar | null): StarSpirit[] {
  console.log('=== 开始计算星运神煞 ===');
  console.log('年柱:', yearPillar.gan + yearPillar.zhi);
  console.log('月柱:', monthPillar.gan + monthPillar.zhi);
  console.log('日柱:', dayPillar.gan + dayPillar.zhi);
  if (hourPillar) {
    console.log('时柱:', hourPillar.gan + hourPillar.zhi);
  }
  
  const spirits: StarSpirit[] = [];
  
  console.log('日干:', dayPillar.gan);
  console.log('年支:', yearPillar.zhi);
  console.log('日支:', dayPillar.zhi);
  
  // 天乙贵人（根据日干查找）
  const tianYiTable: { [key: string]: string[] } = {
    '甲': ['丑', '未'],
    '乙': ['子', '申'],
    '丙': ['亥', '酉'],
    '丁': ['亥', '酉'],
    '戊': ['丑', '未'],
    '己': ['子', '申'],
    '庚': ['丑', '未'],
    '辛': ['午', '寅'],
    '壬': ['卯', '巳'],
    '癸': ['子', '申']
  };
  
  const tianYiZhiList = tianYiTable[dayPillar.gan] || [];
  console.log('天乙贵人 - 日干', dayPillar.gan, '对应地支:', tianYiZhiList);
  
  tianYiZhiList.forEach(zhi => {
    spirits.push({
      name: '天乙贵人',
      pillar: zhi,
      description: '遇事有贵人相助，逢凶化吉，是最吉利的神煞之一'
    });
  });
  
  // 驿马星
  const yiMaTable: { [key: string]: string } = {
    '申': '寅', '子': '寅', '辰': '寅',
    '寅': '申', '午': '申', '戌': '申',
    '巳': '亥', '酉': '亥', '丑': '亥',
    '亥': '巳', '卯': '巳', '未': '巳'
  };
  
  const yiMaSet = new Set<string>();
  
  const yearYiMa = yiMaTable[yearPillar.zhi];
  if (yearYiMa) yiMaSet.add(yearYiMa);
  
  const dayYiMa = yiMaTable[dayPillar.zhi];
  if (dayYiMa) yiMaSet.add(dayYiMa);
  
  yiMaSet.forEach(zhi => {
    spirits.push({
      name: '驿马星',
      pillar: zhi,
      description: '主奔波走动，适合外出发展，利于旅行、迁移、变动'
    });
  });
  
  // 文昌贵人
  const wenChangTable: { [key: string]: string } = {
    '甲': '巳',
    '乙': '午',
    '丙': '申',
    '丁': '酉',
    '戊': '申',
    '己': '酉',
    '庚': '亥',
    '辛': '子',
    '壬': '寅',
    '癸': '卯'
  };
  
  const wenChangZhi = wenChangTable[dayPillar.gan];
  if (wenChangZhi) {
    spirits.push({
      name: '文昌贵人',
      pillar: wenChangZhi,
      description: '主聪明好学，利于学业、考试、文化事业'
    });
  }
  
  // 桃花星
  const taoHuaTable: { [key: string]: string } = {
    '申': '酉', '子': '酉', '辰': '酉',
    '寅': '卯', '午': '卯', '戌': '卯',
    '巳': '午', '酉': '午', '丑': '午',
    '亥': '子', '卯': '子', '未': '子'
  };
  
  const taoHuaSet = new Set<string>();
  
  const yearTaoHua = taoHuaTable[yearPillar.zhi];
  if (yearTaoHua) taoHuaSet.add(yearTaoHua);
  
  const dayTaoHua = taoHuaTable[dayPillar.zhi];
  if (dayTaoHua) taoHuaSet.add(dayTaoHua);
  
  taoHuaSet.forEach(zhi => {
    spirits.push({
      name: '桃花星',
      pillar: zhi,
      description: '主人缘好，异性缘佳，魅力强，利于社交和艺术'
    });
  });
  
  // 将军星
  const jiangJunTable: { [key: string]: string } = {
    '子': '酉',
    '丑': '酉',
    '寅': '午',
    '卯': '酉',
    '辰': '酉',
    '巳': '酉',
    '午': '酉',
    '未': '酉',
    '申': '酉',
    '酉': '酉',
    '戌': '酉',
    '亥': '酉'
  };
  
  const jiangJunZhi = jiangJunTable[yearPillar.zhi];
  if (jiangJunZhi) {
    spirits.push({
      name: '将军星',
      pillar: jiangJunZhi,
      description: '主权威、领导能力，适合管理、军警、执法等职业'
    });
  }
  
  console.log('=== 星运神煞计算完成 ===');
  console.log('计算结果数量:', spirits.length);
  console.log('最终结果:', spirits);
  
  return spirits;
}

// 计算五行统计
function countWuxing(pillars: Pillar[]): { [key: string]: number } {
  const count: { [key: string]: number } = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };
  
  pillars.forEach(pillar => {
    count[pillar.ganWuxing]++;
    count[pillar.zhiWuxing]++;
  });
  
  return count;
}

// 计算十神
function calculateShishen(dayGan: string, pillars: Pillar[]): { [key: string]: string } {
  const dayGanIndex = TIANGAN.indexOf(dayGan);
  const dayWuxing = TIANGAN_WUXING[dayGan];
  
  const shishenMap: { [key: string]: string } = {};
  
  ['年干', '月干', '日干', '时干'].forEach((position, index) => {
    if (index === 2) {
      shishenMap[position] = '日主';
      return;
    }
    
    const pillar = pillars[index];
    if (!pillar) return;
    
    const targetWuxing = pillar.ganWuxing;
    const relation = getWuxingRelation(dayWuxing, targetWuxing);
    
    shishenMap[position] = relation;
  });
  
  return shishenMap;
}

// 五行生克关系转十神
function getWuxingRelation(dayWuxing: string, targetWuxing: string): string {
  const wuxingCycle = ['木', '火', '土', '金', '水'];
  const dayIndex = wuxingCycle.indexOf(dayWuxing);
  const targetIndex = wuxingCycle.indexOf(targetWuxing);
  
  if (dayWuxing === targetWuxing) return '比肩';
  
  const diff = (targetIndex - dayIndex + 5) % 5;
  
  switch (diff) {
    case 1: return '食神';
    case 2: return '偏财';
    case 3: return '七杀';
    case 4: return '偏印';
    default: return '比肩';
  }
}

// 计算纳音
function getNayin(gan: string, zhi: string): string {
  const nayinTable: { [key: string]: string } = {
    '甲子': '海中金', '乙丑': '海中金',
    '丙寅': '炉中火', '丁卯': '炉中火',
    '戊辰': '大林木', '己巳': '大林木',
    '庚午': '路旁土', '辛未': '路旁土',
    '壬申': '剑锋金', '癸酉': '剑锋金',
    '甲戌': '山头火', '乙亥': '山头火',
    '丙子': '涧下水', '丁丑': '涧下水',
    '戊寅': '城头土', '己卯': '城头土',
    '庚辰': '白蜡金', '辛巳': '白蜡金',
    '壬午': '杨柳木', '癸未': '杨柳木',
    '甲申': '泉中水', '乙酉': '泉中水',
    '丙戌': '屋上土', '丁亥': '屋上土',
    '戊子': '霹雳火', '己丑': '霹雳火',
    '庚寅': '松柏木', '辛卯': '松柏木',
    '壬辰': '长流水', '癸巳': '长流水',
    '甲午': '砂中金', '乙未': '砂中金',
    '丙申': '山下火', '丁酉': '山下火',
    '戊戌': '平地木', '己亥': '平地木',
    '庚子': '壁上土', '辛丑': '壁上土',
    '壬寅': '金箔金', '癸卯': '金箔金',
    '甲辰': '覆灯火', '乙巳': '覆灯火',
    '丙午': '天河水', '丁未': '天河水',
    '戊申': '大驿土', '己酉': '大驿土',
    '庚戌': '钗钏金', '辛亥': '钗钏金',
    '壬子': '桑柘木', '癸丑': '桑柘木',
    '甲寅': '大溪水', '乙卯': '大溪水',
    '丙辰': '沙中土', '丁巳': '沙中土',
    '戊午': '天上火', '己未': '天上火',
    '庚申': '石榴木', '辛酉': '石榴木',
    '壬戌': '大海水', '癸亥': '大海水'
  };
  
  return nayinTable[gan + zhi] || '未知';
}

// 计算宫位
function calculateGongwei(monthZhi: string): string {
  const zhiIndex = DIZHI.indexOf(monthZhi);
  return GONGWEI[zhiIndex] || '命宫';
}

export function calculateBazi(
  lunarDate: LunarDate,
  solarYear: number,
  solarMonth: number,
  solarDay: number,
  hour?: number
): BaziResult {
  console.log('=== 开始计算八字 ===');
  console.log('Solar date:', { solarYear, solarMonth, solarDay, hour });
  console.log('Lunar date:', lunarDate);
  
  const solar = Solar.fromYmd(solarYear, solarMonth, solarDay);
  
  const yearPillar = getYearPillar(solar);
  const monthPillar = getMonthPillar(solar);
  const dayPillar = getDayPillar(solar);
  const hourPillar = hour !== undefined ? getHourPillar(solar, hour) : null;
  
  console.log('四柱计算完成:');
  console.log('年柱:', yearPillar.gan + yearPillar.zhi);
  console.log('月柱:', monthPillar.gan + monthPillar.zhi);
  console.log('日柱:', dayPillar.gan + dayPillar.zhi);
  if (hourPillar) {
    console.log('时柱:', hourPillar.gan + hourPillar.zhi);
  }
  
  const pillars = [yearPillar, monthPillar, dayPillar];
  if (hourPillar) pillars.push(hourPillar);
  
  const wuxingCount = countWuxing(pillars);
  const shishen = calculateShishen(dayPillar.gan, pillars);
  const gongwei = calculateGongwei(monthPillar.zhi);
  
  const nayin = {
    '年柱': yearPillar.nayin,
    '月柱': monthPillar.nayin,
    '日柱': dayPillar.nayin,
    '时柱': hourPillar ? hourPillar.nayin : ''
  };
  
  const mingGong = calculateMingGong(monthPillar.zhi, hourPillar?.zhi || null);
  
  console.log('准备计算星运神煞...');
  const starSpirits = calculateStarSpirits(yearPillar, monthPillar, dayPillar, hourPillar);
  console.log('星运神煞计算完成，数量:', starSpirits.length);
  console.log('星运神煞内容:', starSpirits);
  
  const result: BaziResult = {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayGan: dayPillar.gan,
    wuxingCount,
    shishen,
    gongwei,
    nayin,
    mingGong,
    starSpirits
  };
  
  console.log('=== 八字计算完成 ===');
  console.log('最终结果 starSpirits:', result.starSpirits);
  console.log('最终结果 starSpirits 长度:', result.starSpirits.length);
  
  return result;
}
