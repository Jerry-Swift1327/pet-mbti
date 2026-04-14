// src/App.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import Home from '@/components/Home';
import PetSelect from '@/components/PetSelect';
import Quiz from '@/components/Quiz';
import Result from '@/components/Result';
import Share from '@/components/Share';
import FloatingDecor from '@/components/FloatingDecor';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { currentStep } = useQuizStore();

  return (
    <div className="min-h-screen cute-bg flex items-center justify-center p-4 overflow-hidden relative">
      {/* 全站可爱漂浮装饰 */}
      <FloatingDecor />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-soft border border-morandi-pink/20 overflow-hidden relative z-10"
      >
        <AnimatePresence mode="wait">
          {currentStep === 0 && <Home key="home" />}
          {currentStep === 1 && <PetSelect key="select" />}
          {currentStep === 2 && <Quiz key="quiz" />}
          {currentStep === 3 && <Result key="result" />}
          {currentStep === 4 && <Share key="share" />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;