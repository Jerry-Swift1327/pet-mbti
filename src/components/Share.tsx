// src/components/Share.tsx
import { Button } from '@/components/ui/button';
import { useQuizStore } from '@/stores/useQuizStore';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { PawPrint } from 'lucide-react';

export default function Share() {
  const { getResult, getPersonalityType, petType, goToStep } = useQuizStore();
  const result = getResult();
  const posterRef = useRef<HTMLDivElement>(null);

  const downloadPoster = async () => {
    if (!posterRef.current) return;
    const canvas = await html2canvas(posterRef.current, { 
      backgroundColor: '#f8f0e0',
      scale: 2.5,
      logging: false 
    });
    const link = document.createElement('a');
    link.download = `我的宠格-${result.name}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="py-12 px-6 text-center">
      <div 
        ref={posterRef} 
        className="mx-auto w-full max-w-[440px] bg-gradient-to-br from-[#f8f0e0] via-white to-[#c8e6d8] rounded-3xl p-12 shadow-2xl border-8 border-white relative overflow-hidden"
      >
        {/* 装饰元素 */}
        <div className="absolute top-6 right-6 text-6xl opacity-20">🐾</div>
        <div className="absolute bottom-8 left-8 text-5xl opacity-20 rotate-12">🦴</div>

        <div className="flex justify-center mb-6">
          <PawPrint className="w-24 h-24 text-morandi-pink drop-shadow-md" />
        </div>
        
        <h2 className="text-5xl font-bold mb-6 text-morandi-pink tracking-wider">我的宠格是</h2>
        <div className="text-6xl font-bold mb-10 text-gray-800 leading-none">{result.name}</div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 mb-10 text-left border border-morandi-pink/30">
          <p className="text-xl leading-relaxed text-gray-700">{result.fullDesc}</p>
        </div>

        <div className="flex justify-center gap-8 text-sm text-gray-500">
          <div>🐾 {petType === 'dog' ? '狗狗' : petType === 'cat' ? '猫猫' : '其他'}</div>
          <div>{getPersonalityType()} 类型</div>
          <div>PetMBTI 宠格测试</div>
        </div>

        <div className="mt-10 pt-6 border-t border-dashed border-gray-300 text-xs text-gray-400">
          愿你和宝贝的每一天都充满温暖与快乐 💕
        </div>
      </div>

      <Button 
        onClick={downloadPoster} 
        className="w-full h-16 text-2xl rounded-3xl mt-10 bg-gradient-to-r from-morandi-pink to-morandi-mint hover:brightness-110 shadow-soft font-medium"
      >
        📸 下载高清分享海报
      </Button>
      
      <Button 
        onClick={() => goToStep(3)} 
        variant="outline"
        className="w-full h-14 rounded-3xl mt-4 text-lg"
      >
        ← 返回结果页
      </Button>
    </div>
  );
}