// src/components/Home.tsx
import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/useQuizStore';
import { PawPrint, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { goToStep } = useQuizStore();

  return (
    <div className="min-w-screen cute-bg flex items-center justify-center px-5 py-5 relative overflow-hidden">
      
      {/* 背景漂浮的宠格类型（包围主卡片） */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {["CLEAN", "BOSS", "SEXY", "SOUL", "GOGO", "MONK", "FOOD", "HUGS", "WOC", "LUCK", "OKBJ", "CTRL"].map((type, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0.15 }}
            animate={{ 
              opacity: [0.15, 0.35, 0.15],
              y: [0, -15, 0],
              x: [0, 8, 0]
            }}
            transition={{ 
              duration: 12 + i * 0.8, 
              repeat: Infinity,
              delay: i * 0.3 
            }}
            className="absolute text-5xl md:text-6xl font-black tracking-widest text-orange-300/70 select-none"
            style={{
              left: `${10 + (i % 6) * 14}%`,
              top: `${15 + Math.floor(i / 6) * 28}%`,
            }}
          >
            {type}
          </motion.div>
        ))}
      </div>

      {/* 主内容卡片 */}
      <div className="relative max-h-full w-full bg-white/75 backdrop-blur-md rounded-3xl shadow-2xl p-10 md:p-10 text-center border-5 border-white/65">

        {/* 爪印动画 */}
        <motion.div 
          animate={{ rotate: [0, 12, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
          className="mx-auto mb-8 flex justify-center"
        >
          <PawPrint className="w-28 h-28 text-pink-400 drop-shadow-xl" />
        </motion.div>

        {/* 主标题 - 加大加粗渐变 */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-6xl md:text-7xl font-black bg-gradient-to-r from-pink-500 via-orange-500 to-amber-500 bg-clip-text text-transparent tracking-tighter leading-none mb-6"
        >
          宠格测试
        </motion.h1>

        {/* 副标题 + 幽默问句 */}
        <div className="space-y-4 mb-12">
          <p className="text-2xl md:text-3xl font-medium text-gray-800">
            你的宠物到底是什么性格？
          </p>
          
          <p className="text-xl text-gray-600">
            20题 · 揭秘16种超级可爱宠格
          </p>

          {/* 幽默点睛句 - 红色高亮框风格 */}
          <div className="inline-block bg-gradient-to-r from-orange-100 to-pink-100 px-8 py-3 rounded-2xl border border-orange-200">
            <p className="text-orange-600 font-medium text-lg">
              它到底是洁癖星人、肚皮尤物、还是家里小祖宗？
            </p>
          </div>
        </div>

        {/* 开始测试按钮 - 加大更醒目 */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mb-12"
        >
          <Button
            onClick={() => goToStep(2)}
            className="w-full max-w-xs mx-auto bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 
                       text-white text-3xl py-8 rounded-full shadow-xl flex items-center justify-center gap-4 font-bold"
          >
            开始测试 
            <Sparkles className="w-9 h-9" />
            🐾
          </Button>
        </motion.div>

        {/* 底部文案 */}
        <div className="space-y-3 text-sm">
          <p className="flex items-center justify-center gap-2 text-gray-600">
            <Heart className="w-5 h-5 text-pink-400" />
            专为宠物主人打造 · 让陪伴更有温度
          </p>
          
          <p className="text-gray-500">
            测完后你可能会怀疑：我到底养的是宠物还是祖宗？😹
          </p>
        </div>

      </div>
    </div>
  );
}