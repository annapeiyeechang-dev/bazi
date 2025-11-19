import { ArrowLeft, Sparkles, Calendar, User, Heart, Briefcase, Coins, Activity } from 'lucide-react';

interface BaziResultProps {
  bazi: any;
  interpretation: any;
  luckPillars: any;
  onBack: () => void;
}

function BaziResult({ bazi, interpretation, luckPillars, onBack }: BaziResultProps) {
  console.log('🎯 BaziResult 渲染成功！');
  console.log('八字数据:', bazi);
  console.log('星运神煞:', bazi?.starSpirits);

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>返回</span>
      </button>

      <div className="space-y-6">
        {/* 四柱八字 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            四柱八字
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* 年柱 */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">年柱</div>
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {bazi.yearPillar.gan}{bazi.yearPillar.zhi}
              </div>
              <div className="text-xs text-gray-400">
                {bazi.yearPillar.ganWuxing} {bazi.yearPillar.zhiWuxing}
              </div>
            </div>

            {/* 月柱 */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">月柱</div>
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {bazi.monthPillar.gan}{bazi.monthPillar.zhi}
              </div>
              <div className="text-xs text-gray-400">
                {bazi.monthPillar.ganWuxing} {bazi.monthPillar.zhiWuxing}
              </div>
            </div>

            {/* 日柱 */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">日柱（日主）</div>
              <div className="text-3xl font-bold text-pink-600 mb-1">
                {bazi.dayPillar.gan}{bazi.dayPillar.zhi}
              </div>
              <div className="text-xs text-gray-400">
                {bazi.dayPillar.ganWuxing} {bazi.dayPillar.zhiWuxing}
              </div>
            </div>

            {/* 时柱 */}
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-2">时柱</div>
              {bazi.hourPillar ? (
                <>
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {bazi.hourPillar.gan}{bazi.hourPillar.zhi}
                  </div>
                  <div className="text-xs text-gray-400">
                    {bazi.hourPillar.ganWuxing} {bazi.hourPillar.zhiWuxing}
                  </div>
                </>
              ) : (
                <div className="text-gray-400">未提供</div>
              )}
            </div>
          </div>
        </div>

        {/* 命宫 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            命宫：{bazi.mingGong.gan}{bazi.mingGong.zhi}
          </h3>
          <p className="text-gray-700">{bazi.mingGong.description}</p>
        </div>

        {/* 星运神煞 */}
        {bazi.starSpirits && bazi.starSpirits.length > 0 && (
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              星运神煞
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bazi.starSpirits.map((spirit: any, index: number) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-800">{spirit.name}</h3>
                        <span className="px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded-full">
                          {spirit.pillar}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{spirit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 五行统计 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">五行统计</h2>
          <div className="space-y-3">
            {Object.entries(bazi.wuxingCount).map(([element, count]: [string, any]) => (
              <div key={element} className="flex items-center gap-4">
                <span className="w-12 font-semibold text-gray-700">{element}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-6 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-end pr-2"
                    style={{ width: `${(count / 8) * 100}%` }}
                  >
                    <span className="text-white text-xs font-bold">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 性格分析 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-indigo-600" />
            性格分析
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {interpretation.personality}
          </p>
        </div>

        {/* 事业分析 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-600" />
            事业分析
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {interpretation.career}
          </p>
        </div>

        {/* 财运分析 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Coins className="w-6 h-6 text-yellow-600" />
            财运分析
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {interpretation.wealth}
          </p>
        </div>

        {/* 健康分析 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6 text-green-600" />
            健康分析
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {interpretation.health}
          </p>
        </div>

        {/* 感情分析 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-600" />
            感情分析
          </h2>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {interpretation.relationship}
          </p>
        </div>

        {/* 大运流年 */}
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">大运流年</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">年龄段</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">干支</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">五行</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">纳音</th>
                </tr>
              </thead>
              <tbody>
                {luckPillars.pillars.map((pillar: any, index: number) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {pillar.startAge}-{pillar.endAge}岁
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-lg font-bold text-indigo-600">
                        {pillar.gan}{pillar.zhi}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {pillar.ganWuxing} {pillar.zhiWuxing}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {pillar.nayin}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaziResult;
