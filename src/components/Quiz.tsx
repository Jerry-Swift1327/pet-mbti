// src/components/Quiz.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import questions from '@/data/questions.json';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, PawPrint } from 'lucide-react';
import { useState } from 'react';

export default function Quiz() {
  const { 
    currentQuestionIndex, 
    answers, 
    answerQuestion, 
    nextQuestion, 
    prevQuestion 
  } = useQuizStore();

  const q = questions[currentQuestionIndex];
  const selected = answers[q.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const [showCelebration, setShowCelebration] = useState(false);

  const handleNext = () => {
    if (isLastQuestion) {
      setShowCelebration(true);
      setTimeout(() => {
        nextQuestion(); // 进入结果页
        setShowCelebration(false);
      }, 1800);
    } else {
      nextQuestion();
    }
  };

  const options = [
    { label: '非常符合', value: 0, emoji: '😍' },
    { label: '比较符合', value: 1, emoji: '🙂' },
    { label: '有点符合', value: 2, emoji: '😐' },
    { label: '不太符合', value: 3, emoji: '🤔' },
  ];

  return (
    <div className="py-8 px-6 relative">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={prevQuestion} 
          disabled={currentQuestionIndex === 0}
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> 返回
        </Button>
        
        <div className="flex items-center gap-3">
          <PawPrint className="w-5 h-5 text-morandi-pink" />
          <span className="font-medium">{currentQuestionIndex + 1} / {questions.length}</span>
        </div>
      </div>

      <Progress value={(currentQuestionIndex + 1) / questions.length * 100} className="h-3 mb-10" />

      <motion.h2 
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-medium leading-relaxed text-center mb-12 min-h-[110px]"
      >
        {q.text}
      </motion.h2>

      <div className="grid gap-4">
        {options.map((opt, i) => (
          <motion.label
            key={i}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`cursor-pointer border-2 rounded-3xl p-6 transition-all flex items-center gap-5
              ${selected === i ? 'border-morandi-pink bg-morandi-pink/10 shadow-md' : 'border-gray-200 hover:border-morandi-mint hover:bg-morandi-mint/5'}`}
          >
            <input
              type="radio"
              name="option"
              checked={selected === i}
              onChange={() => answerQuestion(q.id, i as any)}
              className="hidden"
            />
            <span className="text-5xl flex-shrink-0">{opt.emoji}</span>
            <span className="text-xl font-medium">{opt.label}</span>
          </motion.label>
        ))}
      </div>

      <Button
        onClick={handleNext}
        disabled={selected === undefined}
        className="w-full mt-10 h-16 text-xl rounded-3xl bg-gradient-to-r from-morandi-mint to-morandi-pink font-medium"
      >
        {isLastQuestion ? '完成测试，看看我的宠格吧！🎉' : '下一题 →'}
      </Button>

      {/* 完成答题庆祝动画 */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.6, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.6 }}
              className="text-center"
            >
              <div className="text-8xl mb-6">🎉🐾✨</div>
              <h2 className="text-5xl font-bold text-white mb-4">测试完成！</h2>
              <p className="text-2xl text-white/90">正在生成你的专属宠格报告...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}