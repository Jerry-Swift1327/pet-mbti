// src/components/Quiz.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import questions from '@/data/questions.json';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Quiz() {
  const { answers, answerQuestion, goToStep } = useQuizStore();
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = Object.keys(answers).length;
  const totalQuestions = questions.length;
  const isComplete = answeredCount === totalQuestions;

  const handleSubmit = () => {
    if (!isComplete) return;
    setSubmitted(true);
    setTimeout(() => {
      goToStep(3);
    }, 600);
  };

  const handleOptionSelect = (questionId: number, optionIndex: number) => {
    const validIndex = optionIndex as 0 | 1 | 2 | 3 | 4;
    answerQuestion(questionId, validIndex);
  };

  return (
    <div className="min-h-screen cute-bg">

      {/* Quiz 主容器 - 加大宽度，减少左右边距 */}
      <div className="max-w-full md:max-w-5x mx-auto bg-white min-h-screen shadow-sm">   {/* 白色容器，左右留白更少 */}

        {/* 顶部固定进度区域 */}
        <div className="sticky top-0 z-50 bg-white border-b px-6 py-5">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-600">
              {answeredCount} / {totalQuestions}
            </div>
            <div className="text-xs text-gray-400">进度</div>
          </div>

          {/* 进度条：橙色填充，未答题时显示轮廓 */}
          <Progress 
            value={(answeredCount / totalQuestions) * 100} 
            className="h-3 bg-gray-100" 
          />
        </div>

        {/* 题目列表区域 */}
        <div className="px-6 pt-8 pb-32 space-y-10">
          {questions.map((q) => {
            const selected = answers[q.id];

            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-sm"
              >
                <div className="mb-5">
                  <span className="inline-block px-3 py-1.5 bg-orange-100 text-orange-600 text-sm font-medium rounded-full">
                    第 {q.id} 题
                  </span>
                </div>

                <h2 className="text-2xl font-medium leading-relaxed text-gray-800 mb-8">
                  {q.text}
                </h2>

                <div className="space-y-5">
                  {q.options.map((optionText, index) => (
                    <label
                      key={index}
                      className={`flex items-start gap-4 p-6 rounded-2xl border-2 transition-all cursor-pointer
                        ${selected === index 
                          ? 'border-orange-500 bg-orange-50 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                    >
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        checked={selected === index}
                        onChange={() => handleOptionSelect(q.id, index)}
                        className="mt-1.5 accent-orange-500 w-5 h-5"
                      />
                      <span className="font-medium text-gray-700 flex-1 leading-relaxed text-[17px]">
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
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-2xl p-4 max-w-3xl mx-auto">
        {/* 动态提示文字 */}
        <div className="text-center text-sm mb-3 text-gray-500">
          {isComplete 
            ? "题目已全部回答完毕，准备好揭晓你的宠格了吗？🎉" 
            : "请完成所有题目后再提交哦～"}
        </div>

        {/* 提交按钮：根据完成状态改变样式 */}
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