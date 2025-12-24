
import React from 'react';

interface BackgroundProps {
  scrollY: number;
}

const Background: React.FC<BackgroundProps> = ({ scrollY }) => {
  return (
    <div 
      className="absolute inset-x-0 w-full bg-[#0a1a2f] transition-transform duration-500 ease-out origin-bottom"
      style={{ 
        height: '4500px', 
        transform: `translateY(${scrollY}px)`,
        bottom: 0 
      }}
    >
      {/* 鹅卵石街道 */}
      <div className="absolute inset-x-1/2 -translate-x-1/2 w-64 h-full bg-[#30343f] border-x-4 border-[#4a5061]">
        <div className="w-full h-full opacity-20" style={{ 
          backgroundImage: `repeating-linear-gradient(0deg, #000, #000 2px, transparent 2px, transparent 12px), repeating-linear-gradient(90deg, #000, #000 2px, transparent 2px, transparent 12px)`,
          backgroundSize: '16px 16px'
        }} />
      </div>

      {/* 斯特拉斯堡风格建筑 - 增加到 15 组以覆盖更长的路程 */}
      {[...Array(15)].map((_, i) => (
        <React.Fragment key={i}>
          {/* 左侧建筑 */}
          <div 
            className="absolute left-[5%] w-32 h-48 bg-[#4a3a2a] border-4 border-[#fff] shadow-lg"
            style={{ bottom: `${i * 300 + 100}px` }}
          >
            <div className="absolute -top-6 inset-x-0 h-8 bg-white rounded-t-lg" />
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, #000, #000 2px, transparent 2px, transparent 20px)'
            }} />
            <div className="grid grid-cols-2 gap-4 p-4 mt-8">
              <div className="w-8 h-10 bg-yellow-200 shadow-[0_0_15px_#fef08a]" />
              <div className="w-8 h-10 bg-yellow-200 shadow-[0_0_15px_#fef08a]" />
            </div>
          </div>

          {/* 右侧建筑 */}
          <div 
            className="absolute right-[5%] w-32 h-56 bg-[#3a4a3a] border-4 border-[#fff] shadow-lg"
            style={{ bottom: `${i * 300 + 250}px` }}
          >
            <div className="absolute -top-8 inset-x-0 h-10 bg-white rounded-t-lg" />
            <div className="w-10 h-16 bg-[#2a1a0a] border-2 border-white mx-auto mt-auto mb-0" />
            <div className="flex justify-center mt-4 gap-1">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              ))}
            </div>
          </div>

          {/* 路灯 */}
          <div 
            className="absolute left-[28%] w-2 h-24 bg-gray-900" 
            style={{ bottom: `${i * 300 + 150}px` }}
          >
            <div className="absolute -top-4 -left-3 w-8 h-8 bg-yellow-400 rounded-full opacity-20 blur-md" />
            <div className="absolute -top-2 -left-2 w-6 h-6 bg-yellow-100 rounded-full border-2 border-yellow-600" />
          </div>
        </React.Fragment>
      ))}

      {/* 终点：巨大的圣诞树 (调整到行程 3600px 处) */}
      <div className="absolute bottom-[3600px] left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="relative">
          {/* 放大版的圣诞树 */}
          <div className="text-[160px] filter drop-shadow-[0_0_50px_#fbbf24] animate-pulse">🎄</div>
          <div className="absolute top-8 left-1/3 -translate-x-1/2 text-7xl text-yellow-300 drop-shadow-[0_0_20px_#fcd34d] animate-bounce">⭐</div>
          
          {/* 树上的彩灯颗粒 */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className={`absolute w-3 h-3 rounded-full animate-pulse`}
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                backgroundColor: ['#ff0000', '#00ff00', '#ffff00', '#00ffff'][i % 4],
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* 终点标牌 */}
        <div className="bg-white/95 px-10 py-5 mt-4 border-4 border-black text-center shadow-[8px_8px_0px_#450a0a]">
           <div className="text-[14px] text-red-700 font-bold pixel-text tracking-widest">Giant Crisistree</div>
           <div className="text-[10px] text-gray-800 mt-2 font-bold">—— 圣诞快乐，小波！ ——</div>
        </div>
      </div>
    </div>
  );
};

export default Background;
