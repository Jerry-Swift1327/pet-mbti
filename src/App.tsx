// src/App.tsx
import { useQuizStore } from '@/stores/useQuizStore';
import Home from '@/components/Home';
import Quiz from '@/components/Quiz';
import Result from '@/components/Result';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { currentStep } = useQuizStore();

  return (
    <div className="min-h-screen cute-bg flex items-center justify-center p-4 overflow-hidden relative">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full bg-white/95 backdrop-blur-xl rounded-3xl shadow-soft border border-morandi-pink/20 overflow-hidden relative z-10"
      >
        <AnimatePresence mode="wait">
          {currentStep === 0 && <Home key="home" />}
          {currentStep === 1 && <Quiz key="quiz" />}
          {currentStep === 2 && <Result key="result" />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default App;