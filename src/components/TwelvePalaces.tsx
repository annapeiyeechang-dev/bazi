import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { TwelvePalacesResult, Palace } from '../utils/twelvePalaces';
import { Home, Users, Heart, Baby, DollarSign, Activity, Plane, UserPlus, Briefcase, Building, Sparkles, User } from 'lucide-react';

interface TwelvePalacesProps {
  palaces: TwelvePalacesResult;
}

const TwelvePalaces: React.FC<TwelvePalacesProps> = ({ palaces }) => {
  const { t, language } = useLanguage();
  const [selectedPalace, setSelectedPalace] = useState<number | null>(null);

  // 宫位图标映射
  const palaceIcons: { [key: string]: React.ReactNode } = {
    '命宫': <Home className="w-6 h-6" />,
    '兄弟宫': <Users className="w-6 h-6" />,
    '夫妻宫': <Heart className="w-6 h-6" />,
    '子女宫': <Baby className="w-6 h-6" />,
    '财帛宫': <DollarSign className="w-6 h-6" />,
    '疾厄宫': <Activity className="w-6 h-6" />,
    '迁移宫': <Plane className="w-6 h-6" />,
    '交友宫': <UserPlus className="w-6 h-6" />,
    '事业宫': <Briefcase className="w-6 h-6" />,
    '田宅宫': <Building className="w-6 h-6" />,
    '福德宫': <Sparkles className="w-6 h-6" />,
    '父母宫': <User className="w-6 h-6" />
  };

  // 宫位颜色映射
  const palaceColors: { [key: string]: string } = {
    '命宫': 'from-purple-500 to-indigo-600',
    '兄弟宫': 'from-blue-500 to-cyan-600',
    '夫妻宫': 'from-pink-500 to-rose-600',
    '子女宫': 'from-green-500 to-emerald-600',
    '财帛宫': 'from-yellow-500 to-amber-600',
    '疾厄宫': 'from-red-500 to-orange-600',
    '迁移宫': 'from-teal-500 to-cyan-600',
    '交友宫': 'from-indigo-500 to-blue-600',
    '事业宫': 'from-violet-500 to-purple-600',
    '田宅宫': 'from-emerald-500 to-green-600',
    '福德宫': 'from-amber-500 to-yellow-600',
    '父母宫': 'from-slate-500 to-gray-600'
  };

  const zhiTranslations: { [key: string]: string } = {
    '子': 'Zi (Rat)', '丑': 'Chou (Ox)', '寅': 'Yin (Tiger)', '卯': 'Mao (Rabbit)',
    '辰': 'Chen (Dragon)', '巳': 'Si (Snake)', '午': 'Wu (Horse)', '未': 'Wei (Goat)',
    '申': 'Shen (Monkey)', '酉': 'You (Rooster)', '戌': 'Xu (Dog)', '亥': 'Hai (Pig)'
  };

  const translateZhi = (zhi: string) => language === 'en' ? zhiTranslations[zhi] || zhi : zhi;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-6">
        <Home className="w-8 h-8 text-purple-600 mr-3" />
        <h2 className="text-3xl font-bold text-gray-800">
          {language === 'en' 
            ? '十二宫位 (Shí Èr Gōng Wèi) - The 12 Palaces (Zi Wei Dou Shu)'
            : '十二宫位（紫微斗数）'
          }
        </h2>
      </div>

      <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-sm text-purple-900">
          {language === 'en' 
            ? '命宫 (Life Palace) Position: '
            : '命宫位置：'
          }
          <span className="font-bold text-lg">
            {language === 'en' 
              ? `${palaces.lifePalacePosition} (${translateZhi(palaces.lifePalacePosition)})`
              : palaces.lifePalacePosition
            }
          </span>
        </p>
        <p className="text-xs text-purple-700 mt-2">
          {language === 'en'
            ? 'The 12 Palaces system is from Zi Wei Dou Shu (紫微斗数), representing different life aspects. Each palace is positioned at an Earthly Branch location.'
            : '十二宫位源自紫微斗数，代表人生的不同方面。每个宫位对应一个地支位置。'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {palaces.palaces.map((palace, index) => (
          <div
            key={index}
            onClick={() => setSelectedPalace(selectedPalace === index ? null : index)}
            className={`bg-gradient-to-br ${palaceColors[palace.name]} rounded-xl p-4 text-white cursor-pointer hover:shadow-lg transition-all transform hover:scale-105`}
          >
            <div className="flex items-center justify-between mb-2">
              {palaceIcons[palace.name]}
              <span className="text-sm font-semibold bg-white/20 px-2 py-1 rounded">
                {translateZhi(palace.position)}
              </span>
            </div>
            <h3 className="text-lg font-bold mb-1">
              {language === 'en' ? (
                <>
                  {palace.name}
                  <span className="block text-sm font-normal opacity-90 mt-1">
                    {palace.nameEn}
                  </span>
                </>
              ) : palace.name}
            </h3>
            {palace.name === '命宫' && (
              <div className="mt-2 text-xs bg-white/20 px-2 py-1 rounded">
                {language === 'en' ? 'Life Palace' : '命宫'}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedPalace !== null && (
        <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
          <div className="flex items-center mb-4">
            {palaceIcons[palaces.palaces[selectedPalace].name]}
            <h3 className="text-2xl font-bold text-gray-800 ml-3">
              {language === 'en' ? (
                <>
                  {palaces.palaces[selectedPalace].name}
                  <span className="block text-base font-normal text-gray-600 mt-1">
                    {palaces.palaces[selectedPalace].nameEn}
                  </span>
                </>
              ) : palaces.palaces[selectedPalace].name}
            </h3>
          </div>
          <div className="mb-3">
            <span className="inline-block bg-indigo-200 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold">
              {language === 'en' 
                ? `Position: ${palaces.palaces[selectedPalace].position} (${translateZhi(palaces.palaces[selectedPalace].position)})`
                : `位置：${palaces.palaces[selectedPalace].position}`
              }
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">
            {language === 'en' 
              ? palaces.palaces[selectedPalace].descriptionEn
              : palaces.palaces[selectedPalace].description
            }
          </p>
        </div>
      )}

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>{language === 'en' ? 'Note' : '说明'}：</strong>
          {language === 'en'
            ? 'The 12 Palaces system is a core component of Zi Wei Dou Shu (紫微斗数), one of the most important Chinese astrology systems. Each palace represents a specific life aspect and is calculated based on birth month and hour. Click on each palace to view detailed interpretations.'
            : '十二宫位是紫微斗数的核心组成部分，每个宫位代表人生的特定方面，根据出生月份和时辰计算得出。点击各宫位可查看详细解释。'
          }
        </p>
      </div>
    </div>
  );
};

export default TwelvePalaces;
