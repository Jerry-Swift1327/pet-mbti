// src/components/Quiz.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import questions from '@/data/questions.json';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { ArrowLeft, PawPrint, CheckCircle } from 'lucide-react';

export default function Quiz() {
  const { 
    currentQuestionIndex, 
    answers, 
    answerQuestion, 
    nextQuestion, 
    prevQuestion,
    goToStep
  } = useQuizStore();

  const q = questions[currentQuestionIndex];
  const selected = answers[q.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  // 自动进入下一题
  const handleSelect = (optionIndex: number) => {
    const index = optionIndex as 0 | 1 | 2 | 3;
    answerQuestion(q.id, index);

    setTimeout(() => {
      if (isLastQuestion) {
        goToStep(3);           // 最后一题自动进入结果页
      } else {
        nextQuestion();
      }
    }, 420);
  };

  const options = [
    { label: '非常符合', emoji: '😍', value: 0 },
    { label: '比较符合', emoji: '🙂', value: 1 },
    { label: '有点符合', emoji: '😐', value: 2 },
    { label: '不太符合', emoji: '🤔', value: 3 },
  ];

  return (
    <div className="min-h-screen cute-bg py-8 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        {/* 顶部进度栏 */}
        <div className="flex items-center justify-between mb-8 px-2">
          <button 
            onClick={prevQuestion} 
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>

          <div className="flex items-center gap-3">
            <PawPrint className="w-5 h-5 text-morandi-pink" />
            <span className="font-medium text-gray-600">
              {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
        </div>

        <Progress 
          value={(currentQuestionIndex + 1) / questions.length * 100} 
          className="h-3 mb-8 bg-white/60" 
        />

        {/* 答题卡片 - 白色独立背景 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-soft border border-morandi-pink/10 p-8 mx-auto"
        >
          {/* 问题文字 */}
          <motion.h2 
            key={currentQuestionIndex}
            initial={{ opacity: , y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-semibold leading-relaxed text-center mb-12 text-gray-800 min-h-[110px]"
          >
            {q.text}
          </motion.h2>

          {/* 选项列表 */}
          <div className="space-y-4">
            {options.map((opt, i) => (
              <motion.label
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleSelect(i)}
                className={`
                  cursor-pointer border-2 rounded-3xl p-6 flex items-center gap-5 transition-all
                  ${selected === i 
                    ? 'border-morandi-pink bg-morandi-pink/15 shadow-xl shadow-morandi-pink/30' 
                    : 'border-gray-200 hover:border-morandi-mint hover:bg-morandi-mint/5'
                  }
                `}
              >
                <span className="text-5xl flex-shrink-0">{opt.emoji}</span>
                
                <div className="flex-1">
                  <span className="text-xl font-medium text-gray-800">{opt.label}</span>
                </div>

                {selected === i && (
                  <CheckCircle className="w-7 h-7 text-morandi-pink" />
                )}
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* 小提示 */}
        <p className="text-center text-xs text-gray-400 mt-8">
          选择答案后将自动进入下一题
        </p>
      </div>
    </div>
  );
}