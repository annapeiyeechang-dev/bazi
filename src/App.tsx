import React, { useState } from 'react';
import BaziForm, { FormData } from './components/BaziForm';
import BaziResult from './components/BaziResult';
import LanguageSwitcher from './components/LanguageSwitcher';
import { solarToLunar, formatLunarDate } from './utils/lunarCalendar';
import { calculateBazi, BaziResult as BaziData } from './utils/baziCalculator';
import { interpretBazi, Interpretation } from './utils/baziInterpretation';
import { calculateLuckPillars, LuckPillarsResult } from './utils/luckPillars';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

function AppContent() {
  const { t } = useLanguage();
  const [result, setResult] = useState<{ 
    bazi: BaziData; 
    interpretation: Interpretation; 
    luckPillars: LuckPillarsResult;
    lunarDate: string;
  } | null>(null);

  const handleFormSubmit = (formData: FormData) => {
    try {
      const lunarDate = solarToLunar(formData.solarYear, formData.solarMonth, formData.solarDay);
      
      if (!lunarDate) {
        throw new Error('Lunar date conversion failed');
      }
      
      const bazi = calculateBazi(
        lunarDate, 
        formData.solarYear, 
        formData.solarMonth, 
        formData.solarDay, 
        formData.hour
      );
      
      const luckPillars = calculateLuckPillars(
        formData.gender,
        bazi.monthPillar,
        bazi.yearPillar.ganYinyang,
        formData.solarYear,
        formData.solarMonth,
        formData.solarDay,
        8
      );
      
      const interpretation = interpretBazi(bazi);
      const lunarDateStr = formatLunarDate(lunarDate);

      setResult({ bazi, interpretation, luckPillars, lunarDate: lunarDateStr });
    } catch (error) {
      console.error('Error calculating bazi:', error);
      alert(`计算八字时出错：${error instanceof Error ? error.message : '未知错误'}`);
    }
  };

  const handleBack = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* 主内容 */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* 语言切换器 */}
        <div className="flex justify-end mb-6">
          <LanguageSwitcher />
        </div>

        {/* 头部 */}
        {!result && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-12 h-12 text-indigo-600 mr-3" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {t('app.title')}
              </h1>
            </div>
            <p className="text-xl text-gray-600">{t('app.subtitle')}</p>
            <p className="text-sm text-gray-500 mt-2">{t('app.dateNote')}</p>
          </div>
        )}

        {/* 表单或结果 */}
        {!result ? (
          <BaziForm onSubmit={handleFormSubmit} />
        ) : (
          <div>
            <div className="text-center mb-6">
              <p className="text-gray-600">
                {t('result.lunarDate')}<span className="font-semibold text-indigo-600">{result.lunarDate}</span>
              </p>
            </div>
            <BaziResult 
              bazi={result.bazi}
              interpretation={result.interpretation}
              luckPillars={result.luckPillars}
              onBack={handleBack}
            />
          </div>
        )}

        {/* 页脚 */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>{t('app.footer')}</p>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
