// src/components/Home.tsx
import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/useQuizStore';
import { PawPrint, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { goToStep } = useQuizStore();

  return (
    <div className="text-center py-16 px-6">
      {/* 标题区域 */}
      <motion.div 
        animate={{ rotate: [0, 12, -12, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
        className="mx-auto mb-8 flex justify-center"
      >
        <PawPrint className="w-28 h-28 text-morandi-pink drop-shadow-2xl" />
      </motion.div>

      {/* 主标题 */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-7xl font-bold bg-gradient-to-r from-morandi-pink to-morandi-peach bg-clip-text text-transparent mb-4 tracking-tighter"
      >
        宠格测试
      </motion.h1>

      {/* 副标题 */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl text-gray-700 mb-1"
      >
        你的宠物到底是什么性格？
      </motion.p>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-gray-500"
      >
        21题 · 揭秘16种可爱宠格
      </motion.p>

      {/* 开始测试按钮 */}
      <motion.div 
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12"
      >
        <Button
          onClick={() => goToStep(1)}
          className="bg-morandi-pink hover:bg-morandi-peach text-white text-3xl px-20 py-9 rounded-3xl shadow-soft flex items-center gap-4 mx-auto group"
        >
          开始测试 
          <Sparkles className="w-9 h-9 group-hover:rotate-12 transition-transform" />
          🐾
        </Button>
      </motion.div>

      {/* 正式底部文案 */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-gray-400 mt-16 tracking-wide"
      >
        专为宠物主人打造 · 让陪伴更有温度
      </motion.p>
    </div>
  );
}