
import React, { useState, useEffect } from 'react';
import { Dialogue } from '../types';

interface DialogueBoxProps {
  dialogue: Dialogue;
  onFinish: () => void;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ dialogue, onFinish }) => {
  const [currentLine, setCurrentLine] = useState(0);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentLine < dialogue.lines.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      onFinish();
    }
  };

  return (
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50 animate-bounce-in">
      {/* 减少内边距以降低高度 */}
      <div className="bg-[#1a1a1a] border-4 border-white px-6 py-3 text-white leading-relaxed shadow-[10px_10px_0px_rgba(0,0,0,0.8)]">
        {/* 字号调大一点 */}
        <div className="text-yellow-400 text-[20px] mb-1 border-b-2 border-dashed border-white/30 pb-1 uppercase tracking-widest pixel-text" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          {dialogue.speaker}
        </div>
        {/* 降低最小高度 */}
        <div className="min-h-[32px] text-[18px] leading-snug pixel-art" style={{ fontFamily: "'Press Start 2P', cursive" }}>
          {dialogue.lines[currentLine]}
        </div>
        <div className="mt-3 flex justify-end">
          <button 
            onClick={handleNext}
            className="px-4 py-1.5 bg-white text-black hover:bg-red-500 hover:text-white transition-all transform active:scale-95 text-[14px] border-2 border-black font-bold"
            style={{ fontFamily: "'Press Start 2P', cursive" }}
          >
            继续 ▼
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
