// src/components/Result.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { PawPrint, Sparkles, Heart} from 'lucide-react';

const dimensionLabels = {
  ei: { name: "能量来源", positive: "外向活泼 E", negative: "内向安静 I" },
  ca: { name: "探索欲", positive: "好奇冒险 C", negative: "安逸随和 A" },
  lf: { name: "情感倾向", positive: "忠诚守护 L", negative: "自由独立 F" },
  ps: { name: "生活态度", positive: "顽皮灵活 P", negative: "稳重规律 S" },
};

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

  // 将分数映射到 0-100 的可视化比例（基础范围 -12 到 +12）
  const normalize = (score: number) => Math.min(Math.max(((score + 12) / 24) * 100, 10), 90);

  return (
    <motion.div 
      initial={{ scale: 0.92, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="py-10 px-8 text-center relative overflow-hidden"
    >
      {/* 漂浮装饰 */}
      <motion.div 
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-8 right-8 text-4xl opacity-30"
      >
        🐾
      </motion.div>
      <motion.div 
        animate={{ rotate: [0, 20, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-12 left-8 text-5xl opacity-20"
      >
        🦴
      </motion.div>

      <motion.div 
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-8xl mb-6 inline-block"
      >
        🐾
      </motion.div>
      
      <h1 className="text-5xl font-bold text-morandi-pink mb-3 tracking-tight">{result.name}</h1>
      <p className="text-xl text-gray-600 mb-8">
        {typeKey} • {petType === 'dog' ? '🐶 狗狗专属' : petType === 'cat' ? '🐱 猫猫专属' : '🐹 通用类型'}
      </p>

      {/* 详细性格描述 */}
      <Card className="p-10 mb-10 bg-gradient-to-br from-morandi-cream to-white border-morandi-pink/30 text-left">
        <div className="flex items-center gap-3 mb-6">
          <Heart className="w-8 h-8 text-morandi-pink" />
          <h3 className="text-2xl font-semibold text-gray-800">性格详解</h3>
        </div>
        <p className="text-xl leading-relaxed text-gray-700 whitespace-pre-line">
          {result.fullDesc}
        </p>
      </Card>

      {/* 维度可视化柱状图 */}
      <Card className="p-8 mb-10 bg-white border-morandi-pink/20">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-2 justify-center">
          <PawPrint className="w-6 h-6 text-morandi-pink" /> 性格维度分析
        </h3>
        <div className="space-y-8">
          {Object.entries(scores).map(([key, score]) => {
            const dim = dimensionLabels[key as keyof typeof dimensionLabels];
            const percent = normalize(score);
            const isPositive = score > 0;
            
            return (
              <div key={key} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{dim.name}</span>
                  <span className={isPositive ? "text-morandi-pink" : "text-morandi-sky"}>
                    {isPositive ? dim.positive : dim.negative} ({score})
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

      {/* 建议卡片 */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-morandi-pink mb-4 flex items-center gap-2">
            🏠 生活建议
          </h4>
          <p className="text-gray-600 text-[15px] leading-relaxed">{result.suggestions}</p>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-morandi-pink mb-4 flex items-center gap-2">
            🧸 推荐玩具
          </h4>
          <p className="text-gray-600 text-[15px] leading-relaxed">{result.toys}</p>
        </Card>
        <Card className="p-6 hover:shadow-md transition-shadow">
          <h4 className="font-semibold text-morandi-pink mb-4 flex items-center gap-2">
            💡 相处Tips
          </h4>
          <p className="text-gray-600 text-[15px] leading-relaxed">{result.tips}</p>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button 
          onClick={() => goToStep(4)} 
          className="flex-1 h-16 text-xl rounded-3xl bg-morandi-pink hover:bg-morandi-peach flex items-center justify-center gap-3 text-white shadow-soft"
        >
          生成分享海报 <Sparkles className="w-6 h-6" />
        </Button>
        <Button 
          onClick={() => { useQuizStore.getState().reset(); goToStep(0); }} 
          variant="outline"
          className="flex-1 h-16 text-xl rounded-3xl"
        >
          🔄 重新测试
        </Button>
      </div>
    </motion.div>
  );
}