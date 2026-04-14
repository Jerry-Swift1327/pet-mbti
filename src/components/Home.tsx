// src/components/Home.tsx
import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/useQuizStore';
import { PawPrint, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { goToStep } = useQuizStore();

  return (
    <div className="text-center py-16 px-6">
      <motion.div 
        animate={{ rotate: [0, 12, -12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        className="mx-auto mb-8 flex justify-center"
      >
        <PawPrint className="w-28 h-28 text-morandi-pink drop-shadow-xl" />
      </motion.div>

      <h1 className="text-7xl font-bold text-morandi-pink mb-4 tracking-tighter">宠格测试</h1>
      <p className="text-2xl text-gray-700 mb-2">你的宠物到底是什么性格？</p>
      <p className="text-lg text-gray-500">21题 · 揭秘16种可爱人格</p>

      <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => goToStep(1)}
          className="mt-12 bg-morandi-pink hover:bg-morandi-peach text-white text-3xl px-20 py-9 rounded-3xl shadow-soft flex items-center gap-4 mx-auto group"
        >
          开始测试 
          <Sparkles className="w-9 h-9 group-hover:rotate-12 transition-transform" />
          🐾
        </Button>
      </motion.div>

      <p className="text-xs text-gray-400 mt-16">纯前端 · 治愈风 · 移动端完美适配</p>
    </div>
  );
}