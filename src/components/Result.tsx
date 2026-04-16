// src/components/Result.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import resultsData from '@/data/results.json';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';


export default function Result() {
  const { goToStep, reset, getPersonalityType, calculateScores } = useQuizStore();

  const typeKey = getPersonalityType() || "UNKNOWN";
  const coreScores = calculateScores(); // ← 必须调用！

  const keyMapping: Record<string, string> = {
    "ECLP": "GOGO", "ECLS": "HUGS", "ECFP": "WOC", "ECFS": "OKBJ",
    "EALP": "SEXY", "EALS": "SOUL", "EAFP": "FOOD", "EAFS": "MONK",
    "ICLP": "CLEAN", "ICLS": "MONK", "ICFP": "WOC", "ICFS": "OKBJ",
    "IALP": "SOUL", "IALS": "MONK", "IAFP": "LUCK", "IAFS": "MONK",
  };

  const mappedKey = keyMapping[typeKey] || typeKey;

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
  const absTotal = Math.abs(coreScores.ei) + Math.abs(coreScores.ca) + 
                   Math.abs(coreScores.lf) + Math.abs(coreScores.ps);
  
  const matchPercent = Math.min(Math.max(Math.round(55 + (absTotal / 22) * 40), 55), 92);

  const strongCount = [
    Math.abs(coreScores.ei) >= 4,
    Math.abs(coreScores.ca) >= 4,
    Math.abs(coreScores.lf) >= 4,
    Math.abs(coreScores.ps) >= 4,
  ].filter(Boolean).length;

  const hitDimensions = 7 + strongCount * 2;

  // ==================== 十五维度评分 ====================
  const dimensions = [
    { id: "S1", name: "自尊自信", desc: "自信随天气波动，顺风能飞，逆风先缩。", score: coreScores.ei > 0 ? "M / 4分" : "L / 2分" },
    { id: "S2", name: "自我清晰度", desc: "内心频道雪花较多，常在'我是谁'里循环缓存。", score: coreScores.ps > 0 ? "H / 5分" : "M / 3分" },
    { id: "S3", name: "核心价值", desc: "很容易被目标、成长或某种重要信念推着往前。", score: coreScores.lf > 0 ? "H / 5分" : "M / 3分" },
    { id: "E1", name: "依恋安全感", desc: "感情里警报器灵敏，已读不回都能脑补到大结局。", score: coreScores.lf > 0 ? "M / 4分" : "L / 2分" },
    { id: "E2", name: "情感投入度", desc: "感情投入偏克制，心门不是没开，是门禁太严。", score: coreScores.ei > 0 ? "M / 3分" : "L / 3分" },
    { id: "E3", name: "边界与依赖", desc: "空间感很重要，再爱也得留一块属于自己的地。", score: coreScores.ca > 0 ? "M / 4分" : "L / 3分" },
    { id: "A1", name: "世界观倾向", desc: "既不天真也不彻底阴谋论，观望是你的本能。", score: coreScores.ca > 0 ? "M / 4分" : "L / 3分" },
    { id: "A2", name: "规则与灵活度", desc: "秩序感较强，能按流程来就不爱即兴炸场。", score: coreScores.ps > 0 ? "H / 5分" : "L / 2分" },
    { id: "A3", name: "人生意义感", desc: "做事更有方向，知道自己大概要往哪边走。", score: coreScores.lf > 0 ? "H / 5分" : "M / 3分" },
    { id: "C1", name: "好奇心指数", desc: "看到新东西就两眼放光，探索欲拉满。", score: coreScores.ca > 0 ? "H / 5分" : "L / 2分" },
    { id: "C2", name: "冒险精神", desc: "新路线、新玩具、新环境都想试试。", score: coreScores.ca > 0 ? "M / 4分" : "L / 3分" },
    { id: "L1", name: "忠诚度", desc: "一旦认定你就很坚定，轻易不会换主人。", score: coreScores.lf > 0 ? "H / 5分" : "L / 2分" },
    { id: "L2", name: "守护欲", desc: "你不开心时它会主动过来安慰。", score: coreScores.lf > 0 ? "M / 4分" : "L / 3分" },
    { id: "P1", name: "顽皮指数", desc: "精力旺盛，喜欢突然搞事情。", score: coreScores.ps > 0 ? "M / 3分" : "L / 5分" },
    { id: "P2", name: "生活节奏", desc: "是喜欢规律还是随性而为。", score: coreScores.ps > 0 ? "H / 5分" : "L / 2分" },
  ];

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
                <img 
                  src={`/images/pets/${mappedKey}.png`} 
                  alt={result.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/pets/placeholder.png';
                  }}
                />
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
          <Card className="p-8 bg-white border-0 shadow-none">
            <div className="mb-6">
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

          {/* 十五维度评分 */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">十五维度评分</h3>
            <div className="space-y-3">
              {dimensions.map((dim) => (
                <div 
                  key={dim.id} 
                  className="flex items-center justify-between bg-white border-2 border-gray-300 hover:border-morandi-pink rounded-2xl px-6 py-5 transition-all shadow-sm"
                >
                  <div className="flex-1 pr-4">
                    <div className="font-medium text-gray-800">{dim.name}</div>
                    <div className="text-xs text-gray-500 mt-1 leading-tight">{dim.desc}</div>
                  </div>
                  <div className="text-right font-semibold text-gray-600 whitespace-nowrap">
                    {dim.score}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 小贴士 & 玩具 */}
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="p-6">
              <h4 className="font-semibold text-gray-700 mb-3">养它小贴士</h4>
              <p className="text-gray-600 text-[15px] leading-relaxed">{result.suggestions}</p>
            </Card>
            <Card className="p-6">
              <h4 className="font-semibold text-gray-700 mb-3">推荐玩具</h4>
              <p className="text-gray-600 text-[15px] leading-relaxed">{result.toys}</p>
            </Card>
          </div>

          {result.tips && (
            <Card className="p-6 mt-6">
              <h4 className="font-semibold text-gray-700 mb-3">相处小Tips</h4>
              <p className="text-gray-600 text-[15px] leading-relaxed">{result.tips}</p>
            </Card>
          )}
        </div>

        {/* 友情提示 */}
        <div className="mx-8 mb-12 text-center text-sm text-gray-500 leading-relaxed">
          无论它是哪种宠格，它都是你最独特、最可爱的宝贝。<br />
          享受和它相处的每一刻吧～
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-4 px-8 pb-10">
          <Button 
            onClick={() => { reset(); goToStep(2); }}
            variant="outline"
            className="flex-1 h-14 rounded-3xl text-lg"
          >
            重新测试
          </Button>
        </div>
      </div>
    </motion.div>   
  );
}