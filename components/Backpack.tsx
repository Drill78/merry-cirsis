
import React, { useState } from 'react';
import { GameItem } from '../types';

interface BackpackProps {
  items: GameItem[];
}

const Backpack: React.FC<BackpackProps> = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GameItem | null>(null);

  // Fill up to 9 slots
  const slots = Array(9).fill(null);
  items.forEach((item, idx) => {
    if (idx < 9) slots[idx] = item;
  });

  return (
    <div 
      className="fixed top-4 right-4 z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        /* 
           修改点：
           p-4: 增加按钮内边距，让点击区域更大
           text-4xl: 显著增大 🎒 图标
           border-4: 加粗边框，符合像素风格
        */
        className="bg-red-600 border-4 border-white p-4 text-white shadow-lg active:scale-95 transition-transform text-4xl"
      >
        🎒
      </button>

      {isOpen && (
        <div className="absolute top-20 right-0 bg-[#3a2e2e] border-4 border-[#fff] p-3 w-72 shadow-2xl animate-fade-in">
          <div className="text-white text-[10px] mb-3 text-center pixel-text">我的行囊</div>
          <div className="grid grid-cols-3 gap-2 mb-4">
            {slots.map((item, idx) => (
              <div 
                key={idx}
                onClick={() => item && setSelectedItem(item)}
                className={`w-20 h-20 border-2 flex items-center justify-center text-3xl cursor-pointer transition-all
                  ${item ? 'bg-amber-100 border-amber-400' : 'bg-gray-800 border-gray-600'}
                  ${selectedItem?.id === item?.id && item ? 'scale-105 border-white ring-2 ring-yellow-400' : ''}
                `}
              >
                {item?.icon}
              </div>
            ))}
          </div>
          {selectedItem && (
            <div className="bg-black p-3 border border-white text-white">
              <div className="text-yellow-400 text-[10px] mb-2 pixel-text">{selectedItem.name}</div>
              <div className="opacity-80 text-[8px] leading-relaxed">{selectedItem.description}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Backpack;
