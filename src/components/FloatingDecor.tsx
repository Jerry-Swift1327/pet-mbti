// src/components/FloatingDecor.tsx
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const decorations = ['🐾', '🦴', '✨', '💕', '🌟'];

export default function FloatingDecor() {
  const [items, setItems] = useState<Array<{ id: number; emoji: string; left: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem = {
        id: Date.now(),
        emoji: decorations[Math.floor(Math.random() * decorations.length)],
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 8 + Math.random() * 7,
      };
      setItems(prev => [...prev.slice(-5), newItem]); // 最多同时显示6个

      // 自动清理
      setTimeout(() => {
        setItems(prev => prev.filter(item => item.id !== newItem.id));
      }, newItem.duration * 1000 + 1000);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {items.map(item => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -100 }}
          animate={{ 
            opacity: [0, 0.7, 0],
            y: [ -100, window.innerHeight + 100 ]
          }}
          transition={{ 
            duration: item.duration, 
            delay: item.delay,
            ease: "linear" 
          }}
          className="absolute text-4xl"
          style={{ left: `${item.left}%` }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
}