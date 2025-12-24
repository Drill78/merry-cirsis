
import React, { useState } from 'react';
import { FINAL_POLAROID_IMAGE } from '../constants';

interface PolaroidProps {
  onRestart: () => void;
  friends: string[];
}

const Polaroid: React.FC<PolaroidProps> = ({ onRestart }) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // 处理图片路径
  const getImageUrl = () => {
    if (FINAL_POLAROID_IMAGE.startsWith('http')) {
      return FINAL_POLAROID_IMAGE;
    }
    return new URL(`./${FINAL_POLAROID_IMAGE}`, window.location.href).href;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black p-4">
      {loading && !error && (
        <div className="text-white/40 text-[10px] pixel-text animate-pulse mb-4">
          正在读取回忆图片...
        </div>
      )}

      {error ? (
        <div className="text-center p-6 border-2 border-red-500 bg-red-900/20">
          <p className="text-red-500 text-[10px] pixel-text leading-loose">
            图片读取失败<br/>
            请确认链接或文件正确
          </p>
        </div>
      ) : (
        <img 
          src={imageUrl} 
          className={`w-full h-auto max-h-[60vh] object-contain transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100 shadow-[0_0_30px_rgba(255,255,255,0.1)]'}`}
          alt="Christmas Adventure Result"
          onLoad={() => setLoading(false)}
          onError={() => {
            setError(true);
            setLoading(false);
          }}
        />
      )}

      {/* 玩家要求的文字部分 */}
      {!loading && !error && (
        <div className="mt-10 flex flex-col items-center gap-6 animate-fade-in">
          <div className="text-center px-8">
            <p className="text-white/80 text-[18px] leading-relaxed max-w-[280px] mx-auto pixel-text">
              你已经集齐了朋友们所有的祝福！
            </p>
          </div>
          
          <div className="mt-4">
            <button 
              onClick={onRestart}
              className="px-8 py-3 bg-red-600 text-white border-2 border-white shadow-[4px_4px_0px_#000] active:translate-y-0.5 active:shadow-none transition-all text-[12px] pixel-text"
            >
              再来一次冒险？
            </button>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 text-white/5 text-4xl select-none">❄</div>
      <div className="absolute bottom-6 right-6 text-white/5 text-4xl select-none">❄</div>
    </div>
  );
};

export default Polaroid;
