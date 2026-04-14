// src/components/PetSelect.tsx
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/stores/useQuizStore';
import { Dog, Cat, Rabbit } from 'lucide-react';
import { motion } from 'framer-motion';

const pets = [
  { type: 'dog' as const, emoji: '🐶', label: '狗狗', icon: Dog, color: 'text-orange-500' },
  { type: 'cat' as const, emoji: '🐱', label: '猫猫', icon: Cat, color: 'text-purple-500' },
  { type: 'other' as const, emoji: '🐹', label: '其他小伙伴', icon: Rabbit, color: 'text-emerald-500' },
];

export default function PetSelect() {
  const { setPetType, goToStep } = useQuizStore();

  const handleSelect = (type: 'dog' | 'cat' | 'other') => {
    setPetType(type);
    goToStep(2);
  };

  return (
    <div className="py-8 px-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-morandi-sky mb-3">我的宠物是？</h2>
        <p className="text-gray-600">选择后结果会有轻微趣味调整哦～</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {pets.map((pet, index) => {
          const Icon = pet.icon;
          return (
            <motion.div
              key={pet.type}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                onClick={() => handleSelect(pet.type)}
                className="cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300 p-8 flex flex-col items-center gap-6 border-2 border-transparent hover:border-morandi-peach group"
              >
                <div className="text-7xl mb-2 transition-transform group-hover:scale-110">{pet.emoji}</div>
                <Icon className={`w-12 h-12 ${pet.color}`} />
                <p className="text-2xl font-medium text-gray-800">{pet.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}