// src/components/Quiz.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import questionsData from '@/data/questions.json';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { preloadAllPetImags } from '@/utils/preloadImages';

export default function Quiz() {
  const { answers, answerQuestion, goToStep } = useQuizStore();
  const [, setSubmitted] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<any[]>([]);

  // 随机打乱题目顺序（每次进入Quiz页面都会重新打乱）
  useEffect(() => {
    useQuizStore.getState().resetAnswers();
    preloadAllPetImags();
    const shuffled = [...questionsData].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = shuffledQuestions.length;
  const isComplete = answeredCount === totalQuestions;

  const handleSubmit = () => {
    if (!isComplete) return;
    setSubmitted(true);

    setTimeout(() => {
      goToStep(3);
      window.scrollTo({
        top:0,
        behavior:'instant'
      });
    }, 400)
    
  };

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    const validIndex = optionIndex as 0 | 1 | 2 | 3 | 4;
    answerQuestion(questionId, validIndex);
  };

  return (
    <div className="min-h-screen cute-bg">

      {/* Quiz 主容器 */}
      <div className="max-w-full md:max-w-5xl mx-auto bg-white min-h-screen shadow-sm">

        {/* 顶部固定进度区域 */}
        <div className="sticky top-0 z-50 bg-white border-b px-4 md:px-8 py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-600">
              {answeredCount} / {totalQuestions}
            </div>
            <div className="text-xs text-gray-800">进度</div>
          </div>

          <Progress 
            value={(answeredCount / totalQuestions) * 100} 
            className="h-3 bg-gray-100" 
          />
        </div>

        {/* 题目列表区域 */}
        <div className="px-4 md:px-8 pt-6 pb-32 space-y-6">
          {shuffledQuestions.map((q, index) => {
            const selected = answers[q.id];

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-gray-400 rounded-2xl p-6 shadow-sm"
              >
                {/* 题号和题目同一行 */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="inline-block px-3 py-1.5 bg-orange-200 text-orange-700 text-sm font-bold rounded-full flex-shrink-0">
                    第 {index + 1} 题
                  </span>
                  <h2 className="text-1xl font-bold leading-relaxed text-gray-800">
                    {q.text}
                  </h2>
                </div>

                <div className="space-y-3">
                  {q.options.map((optionText: string, optionIndex: number) => (
                    <label
                      key={optionIndex}
                      className={`flex items-start gap-2.5 p-2.5 rounded-2xl border-2 transition-all cursor-pointer
                        ${selected === optionIndex 
                          ? 'border-orange-500 bg-orange-50 shadow-md' 
                          : 'border-gray-350 hover:border-gray-400 hover:bg-gray-200'
                        }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={selected === optionIndex}
                        onChange={() => handleOptionSelect(q.id, optionIndex)}
                        className="mt-1.5 accent-orange-500 w-4 h-4"
                      />
                      <span className="option-text font-meidum text-gray-800 flex-1 leading-relaxed text-[16px]">
                        {optionText}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 底部固定区域 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl p-4 max-w-[96%] md:max-w-5xl mx-auto">
        <div className="text-center text-sm mb-3 text-gray-500">
          {isComplete 
            ? "题目已全部回答完毕，准备好揭晓你的宠格了吗？🎉" 
            : "请完成所有题目后再提交哦～"}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!isComplete}
          className={`w-full h-14 text-xl rounded-3xl font-medium transition-all
            ${isComplete 
              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
        >
          提交答案 · 查看我的宠格结果
        </Button>
      </div>
    </div>
  );
}