import { create } from 'zustand';
import questionsData from '../data/questions.json';
import resultsData from '../data/results.json';

type OptionIndex = 0 | 1 | 2 | 3;
type PetType = 'dog' | 'cat' | 'other';

interface QuizState {
  currentStep: number; // 0=home, 1=select, 2=quiz, 3=result, 4=share
  petType: PetType | null;
  currentQuestionIndex: number;
  answers: Record<number, OptionIndex>; // questionId -> optionIndex
  setPetType: (type: PetType) => void;
  answerQuestion: (qId: number, option: OptionIndex) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToStep: (step: number) => void;
  calculateScores: () => { ei: number; ca: number; lf: number; ps: number };
  getPersonalityType: () => string;
  getResult: () => any;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentStep: 0,
  petType: null,
  currentQuestionIndex: 0,
  answers: {},

  setPetType: (type) => set({ petType: type }),
  answerQuestion: (qId, option) => set((state) => ({
    answers: { ...state.answers, [qId]: option }
  })),
  nextQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex < questionsData.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      set({ currentStep: 3 }); // 进入结果页
    }
  },
  prevQuestion: () => {
    const { currentQuestionIndex } = get();
    if (currentQuestionIndex > 0) set({ currentQuestionIndex: currentQuestionIndex - 1 });
  },
  goToStep: (step) => set({ currentStep: step }),

  calculateScores: () => {
    const { answers } = get();
    let ei = 0, ca = 0, lf = 0, ps = 0;

    questionsData.forEach(q => {
      const selected = answers[q.id];
      if (selected !== undefined) {
        const score = q.scores[selected];
        if (q.dimension === 'ei') ei += score;
        else if (q.dimension === 'ca') ca += score;
        else if (q.dimension === 'lf') lf += score;
        else if (q.dimension === 'ps') ps += score;
      }
    });

    // 宠物种类轻微调整（增加趣味性）
    const pet = get().petType;
    if (pet === 'dog') lf += 3;
    if (pet === 'cat') lf -= 3;

    return { ei, ca, lf, ps };
  },

  getPersonalityType: () => {
    const scores = get().calculateScores();
    const eiLetter = scores.ei > 0 ? 'E' : 'I';
    const caLetter = scores.ca > 0 ? 'C' : 'A';
    const lfLetter = scores.lf > 0 ? 'L' : 'F';
    const psLetter = scores.ps > 0 ? 'P' : 'S';
    return eiLetter + caLetter + lfLetter + psLetter;
  },

  getResult: () => {
    const type = get().getPersonalityType();
    return (resultsData as any)[type] || { name: '未知类型', shortDesc: '测试数据加载中...' };
  },

  reset: () => set({
    currentStep: 0,
    petType: null,
    currentQuestionIndex: 0,
    answers: {}
  })
}));