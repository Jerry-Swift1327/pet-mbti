// src/components/Home.tsx
import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/useQuizStore';
import { PawPrint, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { goToStep } = useQuizStore();

  return (
    <div className="min-w-screen cute-bg flex items-center justify-center px-6 py-10">
      <div className="max-w-2xl w-full text-center">

        {/* 漂浮的宠格类型背景文字 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
          {["CLEAN", "BOSS", "SEXY", "SOUL", "GOGO", "MONK", "FOOD", "HUGS", "WOC", "LUCK"].map((type, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 8 + i * 0.5, 
                repeat: Infinity,
                delay: i * 0.4 
              }}
              className="absolute text-6xl font-bold text-orange-300 tracking-widest"
              style={{
                left: `${15 + (i % 5) * 18}%`,
                top: `${20 + Math.floor(i / 3) * 25}%`,
              }}
            >
              {type}
            </motion.div>
          ))}
        </div>

        {/* 爪印动画 */}
        <motion.div 
          animate={{ 
            rotate: [0, 15, -15, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="mx-auto mb-6 flex justify-center"
        >
          <PawPrint className="w-32 h-32 text-morandi-pink drop-shadow-2xl" />
        </motion.div>

        {/* 主标题 */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-7xl md:text-8xl font-black bg-gradient-to-br from-orange-500 via-pink-500 to-amber-500 bg-clip-text text-transparent tracking-tighter leading-none mb-4"
        >
          宠格测试
        </motion.h1>

        {/* 幽默副标题 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-12"
        >
          <p className="text-3xl md:text-4xl font-medium text-gray-700">
            你的宠物到底是什么性格？
          </p>
          <p className="text-2xl text-gray-500">
            20题 · 揭秘16种超级可爱宠格
          </p>
          <p className="text-lg text-orange-600 font-medium">
            它到底是洁癖星人、肚皮尤物、还是家里小祖宗？
          </p>
        </motion.div>

        {/* 开始测试按钮 */}
        <motion.div 
          whileHover={{ scale: 1.06, rotate: 2 }}
          whileTap={{ scale: 0.96 }}
          className="mb-12"
        >
          <Button
            onClick={() => goToStep(2)}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 
                       text-white text-3xl px-20 py-10 rounded-full shadow-2xl flex items-center gap-5 mx-auto group font-bold"
          >
            开始测试 
            <motion.span 
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-4xl"
            >
              🐾
            </motion.span>
            <Sparkles className="w-10 h-10 group-hover:rotate-12 transition-transform" />
          </Button>
        </motion.div>

        {/* 底部幽默文案 */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-2"
        >
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            专为宠物主人打造 · 让陪伴更有温度
          </p>
          <p className="text-sm text-gray-400">
            （测完后你可能会怀疑：我到底养的是宠物还是祖宗？）
          </p>
        </motion.div>

      </div>
    </div>
  );
}