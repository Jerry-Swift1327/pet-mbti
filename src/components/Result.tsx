// src/components/Result.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { PawPrint, Sparkles, Heart, Share2 } from 'lucide-react';

export default function Result() {
  const { 
    getResult, 
    petType, 
    getPersonalityType, 
    goToStep,
    calculateScores 
  } = useQuizStore();

  const result = getResult();
  const typeKey = getPersonalityType();
  const scores = calculateScores();

  const normalize = (score: number) => Math.min(Math.max(((score + 12) / 24) * 100, 10), 90);

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="py-10 px-6 text-center min-h-screen cute-bg"
    >
      {/* 漂浮装饰 */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-12 right-8 text-5xl opacity-30 pointer-events-none"
      >
        🐾
      </motion.div>

      <motion.div 
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, repeatType: "reverse" }}
        className="text-8xl mb-6"
      >
        🐾
      </motion.div>

      {/* 标题区域 */}
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-morandi-pink mb-2 tracking-tight">
          {result.name}
        </h1>
        <p className="text-3xl font-medium text-gray-700 mb-1">
          {result.english}
        </p>
        <p className="text-lg text-gray-500">
          {typeKey} • {petType === 'dog' ? '狗狗专属' : petType === 'cat' ? '猫猫专属' : '通用类型'}
        </p>
      </div>

      {/* 可爱宠物图片占位（低多边形风格） */}
      <motion.div 
        initial={{ scale: 0.8, rotate: -8 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
        className="mx-auto mb-10 w-48 h-48 bg-gradient-to-br from-morandi-pink/10 to-morandi-mint/10 rounded-3xl flex items-center justify-center border-4 border-white shadow-2xl"
      >
        <span className="text-8xl">🐶</span>   {/* 这里后续可替换为低多边形图片 */}
      </motion.div>

      {/* 幽默性格描述 */}
      <Card className="p-8 mb-10 bg-white border-morandi-pink/20 text-left max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-morandi-pink" />
          <h3 className="text-2xl font-semibold text-gray-800">宝贝的真实性格</h3>
        </div>
        <p className="text-xl leading-relaxed text-gray-700">
          {result.fullDesc}
        </p>
      </Card>

      {/* 维度可视化 */}
      <Card className="p-8 mb-10 bg-white border-morandi-pink/20 max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-2 justify-center">
          <PawPrint className="w-6 h-6 text-morandi-pink" /> 
          性格维度一览
        </h3>
        <div className="space-y-8">
          {Object.entries(scores).map(([key, score]) => {
            const percent = normalize(score);
            const isPositive = score > 0;
            const labels: any = {
              ei: isPositive ? "外向活泼" : "内向安静",
              ca: isPositive ? "好奇冒险" : "安逸随和",
              lf: isPositive ? "忠诚守护" : "自由独立",
              ps: isPositive ? "顽皮灵活" : "稳重规律"
            };

            return (
              <div key={key} className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>{labels[key]}</span>
                  <span className={isPositive ? "text-morandi-pink" : "text-morandi-sky"}>
                    {score}
                  </span>
                </div>
                <div className="h-4 bg-morandi-cream rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className={`h-full rounded-full ${isPositive ? 'bg-morandi-pink' : 'bg-morandi-sky'}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* 建议卡片（更活泼） */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-2xl mx-auto">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-morandi-pink mb-4">🏠 养它小贴士</h4>
          <p className="text-gray-600 text-[15px] leading-relaxed">{result.suggestions}</p>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-morandi-pink mb-4">🧸 推荐玩具</h4>
          <p className="text-gray-600 text-[15px] leading-relaxed">{result.toys}</p>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-morandi-pink mb-4">💡 相处秘诀</h4>
          <p className="text-gray-600 text-[15px] leading-relaxed">{result.tips}</p>
        </Card>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
        <Button 
          onClick={() => goToStep(4)} 
          className="flex-1 h-16 text-xl rounded-3xl bg-gradient-to-r from-morandi-pink to-morandi-mint flex items-center justify-center gap-3"
        >
          <Share2 className="w-6 h-6" />
          生成分享海报
        </Button>
        <Button 
          onClick={() => { useQuizStore.getState().reset(); goToStep(0); }} 
          variant="outline"
          className="flex-1 h-16 text-xl rounded-3xl"
        >
          🔄 再测一次
        </Button>
      </div>

      <p className="text-xs text-gray-400 mt-12">
        愿你和宝贝的每一天都充满快乐与温暖 🐾
      </p>
    </motion.div>
  );
}