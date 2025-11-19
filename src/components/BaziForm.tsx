import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, Clock, MapPin, User } from 'lucide-react';

interface BaziFormProps {
  onSubmit: (data: FormData) => void;
}

export interface FormData {
  solarYear: number;
  solarMonth: number;
  solarDay: number;
  hour?: number;
  birthplace?: string;
  gender: 'male' | 'female';
}

const BaziForm: React.FC<BaziFormProps> = ({ onSubmit }) => {
  const { t } = useLanguage();
  const [solarDate, setSolarDate] = useState<string>('');
  const [hour, setHour] = useState<string>('');
  const [birthplace, setBirthplace] = useState<string>('');
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!solarDate) {
      alert(t('form.solarDate.required'));
      return;
    }

    const [year, month, day] = solarDate.split('-').map(Number);

    const formData: FormData = {
      solarYear: year,
      solarMonth: month,
      solarDay: day,
      hour: hour ? parseInt(hour) : undefined,
      birthplace: birthplace || undefined,
      gender
    };

    onSubmit(formData);
  };

  const today = new Date().toISOString().split('T')[0];
  const minDate = '1900-01-01';
  const maxDate = '2100-12-31';

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t('form.title')}</h2>
        <p className="text-gray-600">{t('form.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 性别选择 */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <User className="w-5 h-5 mr-2 text-indigo-600" />
            {t('form.gender')} <span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === 'male'}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">{t('form.gender.male')}</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === 'female'}
                onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-gray-700">{t('form.gender.female')}</span>
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">{t('form.gender.note')}</p>
        </div>

        {/* 阳历生日 */}
        <div className="space-y-4">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
            {t('form.solarDate')} <span className="text-red-500 ml-1">*</span>
          </label>
          
          <input
            type="date"
            value={solarDate}
            onChange={(e) => setSolarDate(e.target.value)}
            min={minDate}
            max={maxDate}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition text-lg"
            required
          />
          <p className="text-xs text-gray-500">{t('form.solarDate.note')}</p>
        </div>

        {/* 出生时辰 */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            {t('form.hour')}
          </label>
          <select
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          >
            <option value="">{t('form.hour.select')}</option>
            <option value="0">{t('hour.zi')}</option>
            <option value="1">{t('hour.chou')}</option>
            <option value="3">{t('hour.yin')}</option>
            <option value="5">{t('hour.mao')}</option>
            <option value="7">{t('hour.chen')}</option>
            <option value="9">{t('hour.si')}</option>
            <option value="11">{t('hour.wu')}</option>
            <option value="13">{t('hour.wei')}</option>
            <option value="15">{t('hour.shen')}</option>
            <option value="17">{t('hour.you')}</option>
            <option value="19">{t('hour.xu')}</option>
            <option value="21">{t('hour.hai')}</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">{t('form.hour.note')}</p>
        </div>

        {/* 出生地 */}
        <div>
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
            {t('form.birthplace')}
          </label>
          <input
            type="text"
            placeholder={t('form.birthplace.placeholder')}
            value={birthplace}
            onChange={(e) => setBirthplace(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
          <p className="text-xs text-gray-500 mt-1">{t('form.birthplace.note')}</p>
        </div>

        {/* 提交按钮 */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all shadow-lg"
        >
          {t('form.submit')}
        </button>
      </form>

      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>{t('disclaimer.title')}：</strong>{t('form.disclaimer')}
        </p>
      </div>
    </div>
  );
};

export default BaziForm;
