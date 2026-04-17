// src/components/Result.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import resultsData from '@/data/results.json';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { PawPrint } from 'lucide-react';
import { petImages } from '@/utils/preloadImages';
import { useState } from 'react';

export default function Result() {
  const { goToStep, getPersonalityType, calculateScores, getDimensionScores } = useQuizStore();

  const mappedKey = getPersonalityType();
  const coreScores = calculateScores();
  const dimensions = getDimensionScores();

  const imageSrc = (petImages as any)[mappedKey];
  const [imageError, setImageError] = useState(false);

  const result = (resultsData as any)[mappedKey] || {
    name: "未知类型",
    english: "",
    nickname: "",
    fullDesc: "暂时无法匹配宠格，请检查测试逻辑",
    suggestions: "暂无建议",
    toys: "暂无推荐",
    tips: "暂无Tips"
  };

  // ==================== 动态匹配度 ====================
  const userVector = coreScores;
  const idealVector = result.vector || {ei: 0, ca: 0, lf: 0, ps: 0};

  const distance = Math.sqrt(
    Math.pow(userVector.ei - idealVector.ei, 2) +
    Math.pow(userVector.ca - idealVector.ca, 2) +
    Math.pow(userVector.lf - idealVector.lf, 2) +
    Math.pow(userVector.ps - idealVector.ps, 2)
  );

  const maxPossibleDistance = 30;
  const matchPercent = Math.max(62, Math.min(94, Math.round(94 - (distance / maxPossibleDistance) * 32)));

  // 动态计算命中维度数（与最终宠格的理想表现接近的维度）
  const hitDimensions = dimensions.filter((dim: any) => {
    const scoreStr = dim.score;
    return scoreStr.includes("H") || scoreStr.includes("M");
  }).length;

  // ==================== 十五维度评分 ====================

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen cute-bg"
    >
      <div className="max-w-full mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* 顶部标题 + 左右布局 */}
        <div className="pt-7 pb-0 px-10">
          <p className="text-3xl text-gray-600 mb-3 text-center font-bold">你的宠物的宠格是</p>

          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* 左侧文字 */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-5xl font-bold text-orange-500 mb-2">{result.name}</h1>
              <p className="text-3xl font-bold text-gray-700 mb-4">{result.english}</p>
              
              <div className="inline-block bg-green-100 text-green-700 text-sm px-5 py-1.5 rounded-full">
                匹配度 {matchPercent}% · 精准命中 {hitDimensions}/15 维
              </div>
            </div>

            {/* 右侧图片 + nickname */}
            <div className="flex flex-col items-center">
              <motion.div 
                initial={{ scale: 0.85, rotate: -8 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-52 h-52 bg-gradient-to-br from-morandi-pink/10 to-morandi-mint/10 rounded-2xl flex items-center justify-center border-8 border-pink shadow-2xl mb-5 overflow-hidden"
              >
                {!imageError ? (
                  <img 
                    src={imageSrc} 
                    alt={result.name}
                    loading = 'eager'
                    fetchPriority = 'high'
                    decoding ='sync'
                    className = "w-full h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-orange-400">
                    <PawPrint size={90} strokeWidth={1.5} />
                    <span className="mt-3 text-sm text-gray-400">图片加载失败</span>
                  </div>
                )}   
              </motion.div>
              
              {result.nickname && (
                <p className="text-xl text-orange-600 font-medium italic text-center">
                  「{result.nickname}」
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 宠格描述 */}
        <div className="px-8 py-10">
          <Card className="p-8 bg-gradient-to-br from-orange-50 to-pink-50 border-0 shadow-none">
            <div className="mb-2">
              <span className="text-2xl font-semibold text-gray-700">宠格：</span>
              <span className="text-2xl font-bold text-gray-700 ml-2">
                {result.english}
              </span>
              <span className="text-2xl font-bold text-gray-700 ml-2">
                ({result.name})
              </span>
            </div>
            <p className="text-xl leading-relaxed text-gray-700">{result.fullDesc}</p>
          </Card>

          {/* 动态十五维度评分 */}
          <Card className="mt-10 p-5 bg-gradient-to-br from-orange-50 to-pink-50 border border-green-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-left">十五维度评分</h3>
            
            <div className="space-y-3">
              {dimensions.map((dim, index) => (
                <div 
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 border border-green-800 rounded-2xl px-5 py-2 transition-all"
                >
                  <div className="flex justify-between items-baseline mb-2">
                    <div className="font-bold text-gray-800 text-lg">{dim.name}</div>
                    <div className="font-bold text-orange-600 text-lg whitespace-nowrap">
                      {dim.score}
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 leading-relaxed">
                    {dim.desc}
                  </div>

                </div>
              ))}
            </div>
          </Card>

        {/* 在这可补回tips + 玩具代码 */}

        </div>

        {/* 友情提示 */}
        <div className="mx-8 md:mx-15 mb-10">
          <Card className="p-5 bg-gradient-to-br from-orange-50 to-pink-50 border-3 border-orange-100">
            <h4 className="font-bold text-xl text-gray-800">友情提示</h4>
            <p className="text-gray-1100 leading-relaxed">
              无论它是哪种宠格，它都是你最独特、最可爱的宝贝。享受和它相处的每一刻吧～
            </p>
          </Card>
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-4 px-8 pb-10">
          <Button 
            onClick={() => { 
              useQuizStore.getState().resetAnswers(); 
              goToStep(2); 
              setTimeout(() => {
                window.scrollTo({
                  top:0,
                  behavior:'instant'
                });
              },80);
            }}
            variant="outline"
            className="flex-1 h-14 rounded-3xl text-lg font-bold 
               border-2 border-orange-400 text-orange-600 
               hover:bg-orange-300 hover:border-orange-500 
               active:bg-orange-100 transition-all duration-200
               shadow-sm hover:shadow-md bg-green-200"
          >
            🐾 再测一次
          </Button>
        </div>
      </div>
    </motion.div>   
  );
}