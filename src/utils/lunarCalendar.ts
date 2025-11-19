// 使用 lunar-javascript 库进行农历转换
import { Solar, Lunar } from 'lunar-javascript';

export interface LunarDate {
  year: number;
  month: number;
  day: number;
  isLeap: boolean;
}

export function solarToLunar(year: number, month: number, day: number): LunarDate {
  console.log('Converting solar to lunar:', { year, month, day });
  
  try {
    // 使用 lunar-javascript 库进行转换
    const solar = Solar.fromYmd(year, month, day);
    console.log('Solar object created:', solar);
    
    if (!solar) {
      throw new Error('Failed to create Solar object');
    }
    
    const lunar = solar.getLunar();
    console.log('Lunar object:', lunar);
    
    if (!lunar) {
      throw new Error('Failed to get Lunar object');
    }
    
    const lunarYear = lunar.getYear();
    const lunarMonth = lunar.getMonth();
    const lunarDay = lunar.getDay();
    
    console.log('Lunar date components:', { lunarYear, lunarMonth, lunarDay });
    
    return {
      year: lunarYear,
      month: Math.abs(lunarMonth), // 取绝对值，负数表示闰月
      day: lunarDay,
      isLeap: lunarMonth < 0 // 负数表示闰月
    };
  } catch (error) {
    console.error('Error in solarToLunar:', error);
    throw error;
  }
}

// 农历日期格式化
export function formatLunarDate(lunarDate: LunarDate): string {
  const monthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  const dayNames = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
  ];

  const absMonth = Math.abs(lunarDate.month);
  const monthName = absMonth <= 12 ? monthNames[absMonth - 1] : '正';
  const dayName = lunarDate.day <= 30 ? dayNames[lunarDate.day - 1] : '初一';

  return `农历${lunarDate.year}年${lunarDate.isLeap ? '闰' : ''}${monthName}月${dayName}`;
}
