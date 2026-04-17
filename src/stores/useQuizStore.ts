import { create } from 'zustand';
import questionsData from '@/data/questions.json';
import resultsData from '@/data/results.json';

type OptionIndex = 0 | 1 | 2 | 3 | 4;

interface QuizState {
  currentStep: number; // home, select, quiz, result, share
  answers: Record<number, OptionIndex>;
  answerQuestion: (qId: number, option: OptionIndex) => void;
  goToStep: (step: number) => void;
  calculateScores: () => { ei: number; ca: number; lf: number; ps: number };
  getPersonalityType: () => string;
  getDimensionScores: () => Array<{
    id: string;
    name: string;
    desc: string;
    score: string;
  }>;
  resetAnswers: () => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  currentStep: 0,
  answers: {},

  answerQuestion: (qId, option) => set((state) => ({
    answers: { ...state.answers, [qId]: option }
  })),

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

    return { ei, ca, lf, ps };
  },

  // ==================== 新增：向量相似度匹配 ====================
  getPersonalityType: () => {
    const userScores = get().calculateScores();
    let bestMatch = "CLEAN";
    let minDistance = Infinity;

    Object.entries(resultsData as any).forEach(([key, data]: [string, any]) => {
      const vec = data.vector;
      if (!vec) return;

      // 欧几里得距离
      const distance = Math.sqrt(
        Math.pow(userScores.ei - vec.ei, 2) +
        Math.pow(userScores.ca - vec.ca, 2) +
        Math.pow(userScores.lf - vec.lf, 2) +
        Math.pow(userScores.ps - vec.ps, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = key;
      }
    });

    return bestMatch;
  },

  // ==================== 新增：动态 15 维度计算 ====================
  getDimensionScores: () =>{
    const userScores = get().calculateScores();
    const mappedKey = get().getPersonalityType();
    const petData = (resultsData as any)[mappedKey];
    const profiles = petData?.dimensionProfiles || {};

    const baseDimensions = [
      { id: "S1", name: "自尊自信", desc: "自信随天气波动，顺风能飞，逆风先缩。", main: "ei" },
      { id: "S2", name: "自我清晰度", desc: "内心频道雪花较多，常在'我是谁'里循环缓存。", main: "ps" },
      { id: "S3", name: "核心价值", desc: "很容易被目标、成长或某种重要信念推着往前。", main: "lf" },
      { id: "E1", name: "依恋安全感", desc: "感情里警报器灵敏，已读不回都能脑补到大结局。", main: "lf" },
      { id: "E2", name: "情感投入度", desc: "感情投入偏克制，心门不是没开，是门禁太严。", main: "ei" },
      { id: "E3", name: "边界与依赖", desc: "空间感很重要，再爱也得留一块属于自己的地。", main: "ca" },
      { id: "A1", name: "世界观倾向", desc: "既不天真也不彻底阴谋论，观望是你的本能。", main: "ca" },
      { id: "A2", name: "规则与灵活度", desc: "秩序感较强，能按流程来就不爱即兴炸场。", main: "ps" },
      { id: "A3", name: "人生意义感", desc: "做事更有方向，知道自己大概要往哪边走。", main: "lf" },
      { id: "C1", name: "好奇心指数", desc: "看到新东西就两眼放光，探索欲拉满。", main: "ca" },
      { id: "C2", name: "冒险精神", desc: "新路线、新玩具、新环境都想试试。", main: "ca" },
      { id: "L1", name: "忠诚度", desc: "一旦认定你就很坚定，轻易不会换主人。", main: "lf" },
      { id: "L2", name: "守护欲", desc: "你不开心时它会主动过来安慰。", main: "lf" },
      { id: "P1", name: "顽皮指数", desc: "精力旺盛，喜欢突然搞事情。", main: "ps" },
      { id: "P2", name: "生活节奏", desc: "是喜欢规律还是随性而为。", main: "ps" },
    ];

    return baseDimensions.map(dim => {
      const profile = profiles[dim.id] || { main: dim.main, weight: 0.6 };
      const mainScore = userScores[profile.main as keyof typeof userScores] || 0;

      // 计算归一化分数（-12 ~ 12 → 0 ~ 10）
      let scoreValue = Math.max(0, Math.min(10, (mainScore + 12) / 2.4));
      scoreValue = scoreValue * profile.weight + (10 - profile.weight) * 5; // 加权平滑

      let level = "M";
      let point = 3;
      if (scoreValue >= 7.5) { level = "H"; point = 5; }
      else if (scoreValue <= 3.5) { level = "L"; point = 2; }

      return {
        id: dim.id,
        name: dim.name,
        desc: dim.desc,
        score: `${level} / ${point}分`
      };
    });
  },

  resetAnswers: () => set({ answers: {} }),

  reset: () => set({
    currentStep: 0,
    answers: {}
  }),
}));