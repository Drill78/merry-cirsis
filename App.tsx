
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Dialogue, GameItem } from './types';
import { CHARACTERS, SPRITES, WORLD_LENGTH, BGM_URL } from './constants';
import Background from './components/Background';
import SnowOverlay from './components/SnowOverlay';
import DialogueBox from './components/DialogueBox';
import Backpack from './components/Backpack';
import Polaroid from './components/Polaroid';

const App: React.FC = () => {
  const [state, setState] = useState<GameState>({
    wooperY: 0,
    collectedFriends: [],
    inventory: [],
    activeDialogue: null,
    gameStatus: 'playing',
    currentTargetIndex: 0
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasStartedMusic, setHasStartedMusic] = useState(false);

  const handleScreenClick = useCallback(() => {
    // 首次点击时触发音频播放
    if (!hasStartedMusic && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      setHasStartedMusic(true);
    }

    if (state.activeDialogue || state.gameStatus !== 'playing') return;

    setState(prev => {
      const step = 60;
      const nextY = Math.min(prev.wooperY + step, WORLD_LENGTH);
      
      const nextChar = CHARACTERS[prev.currentTargetIndex];
      if (nextChar && nextY >= nextChar.triggerY) {
        return {
          ...prev,
          wooperY: nextChar.triggerY,
          activeDialogue: nextChar.dialogue,
        };
      }

      const nextStatus = nextY >= WORLD_LENGTH ? 'ending' : 'playing';
      return {
        ...prev,
        wooperY: nextY,
        gameStatus: nextStatus as any
      };
    });
  }, [state.activeDialogue, state.gameStatus, state.currentTargetIndex, hasStartedMusic]);

  const closeDialogue = () => {
    setState(prev => {
      const char = CHARACTERS[prev.currentTargetIndex];
      const newInventory = [...prev.inventory];
      const newFriends = [...prev.collectedFriends];
      
      if (char.gift) newInventory.push(char.gift);
      if (char.type === 'friend') newFriends.push(char.id);

      return {
        ...prev,
        activeDialogue: null,
        inventory: newInventory,
        collectedFriends: newFriends,
        currentTargetIndex: prev.currentTargetIndex + 1
      };
    });
  };

  useEffect(() => {
    if (state.gameStatus === 'ending') {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, gameStatus: 'polaroid' }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [state.gameStatus]);

  const restart = () => {
    setState({
      wooperY: 0,
      collectedFriends: [],
      inventory: [],
      activeDialogue: null,
      gameStatus: 'playing',
      currentTargetIndex: 0
    });
  };

  const scrollOffset = window.innerHeight * 0.3; 
  const currentBackgroundY = state.wooperY - scrollOffset;

  return (
    <div 
      className="relative w-screen h-screen overflow-hidden select-none cursor-pointer bg-[#0a1a2f]"
      onClick={handleScreenClick}
    >
      {/* 隐藏的音频播放器 */}
      <audio 
        ref={audioRef}
        src={BGM_URL}
        loop
        preload="auto"
      />

      <Background scrollY={currentBackgroundY} />
      
      <SnowOverlay />
      
      <Backpack items={state.inventory} />

      <div className="absolute inset-0 z-20 pointer-events-none">
        {CHARACTERS.map((char) => {
           const isMet = state.wooperY >= char.triggerY;
           const isFriend = char.type === 'friend';
           if (isMet && isFriend && state.collectedFriends.includes(char.id)) return null;

           const screenBottom = char.triggerY - state.wooperY + scrollOffset;

           return (
             <div 
               key={char.id}
               className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
               style={{ 
                 bottom: `${screenBottom}px`,
                 transform: `translateX(${char.type === 'stall' ? '70px' : '-110px'})`,
                 opacity: screenBottom > -200 && screenBottom < window.innerHeight + 200 ? 1 : 0,
                 transition: 'bottom 0.5s ease-out, opacity 0.5s'
               }}
             >
               <img src={char.sprite} className={`${char.type === 'friend' ? 'w-40 h-40' : 'w-16 h-16'} pixel-art object-contain`} />
               <div className={`${char.type === 'friend' ? 'w-12' : 'w-6'} h-1 bg-black/40 rounded-[100%] blur-[1px] mx-auto mt-[-18px]`} />
             </div>
           );
        })}

        <div 
          className="absolute left-1/2 -translate-x-1/2"
          style={{ bottom: `${scrollOffset}px` }} 
        >
          <div className="relative flex flex-col items-center">
             <div className="bobbing z-20 relative flex flex-col items-center">
               <img src={SPRITES.WOOPER} className="w-[200px] h-[200px] pixel-art object-contain" />
               <div className="w-[60px] h-2 bg-black/50 rounded-[100%] blur-[2px] mt-[-35px]" />
             </div>

             {state.collectedFriends.map((friendId, index) => {
               const char = CHARACTERS.find(c => c.id === friendId);
               const spacing = 70;
               const offset = (index - (state.collectedFriends.length - 1) / 2) * spacing;
               
               return (
                 <div 
                   key={friendId}
                   className="absolute transition-all duration-700 flex flex-col items-center"
                   style={{ 
                     left: '50%',
                     marginLeft: `${offset}px`,
                     transform: 'translateX(-50%)',
                     top: '150px', 
                     zIndex: 10 - index,
                     opacity: 0.95
                   }}
                 >
                   <div className="bobbing flex flex-col items-center">
                     <img src={char?.sprite} className="w-40 h-40 pixel-art object-contain" />
                     <div className="w-[40px] h-1.5 bg-black/40 rounded-[100%] mt-[-24px]" />
                   </div>
                 </div>
               );
             })}
          </div>
        </div>
      </div>

      {state.activeDialogue && (
        <DialogueBox 
          dialogue={state.activeDialogue} 
          onFinish={closeDialogue} 
        />
      )}

      {state.gameStatus === 'ending' && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="text-white text-2xl pixel-text animate-pulse">到达了巨大的圣诞树！</div>
        </div>
      )}

      {state.gameStatus === 'polaroid' && (
        <Polaroid onRestart={restart} friends={state.collectedFriends} />
      )}

      {state.wooperY === 0 && !state.activeDialogue && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 text-white text-[10px] animate-bounce text-center">
          <div className="bg-red-600/80 px-10 py-3 border-2 border-white rounded-md shadow-lg">
            点击屏幕，开启乌波大王的圣诞冒险吧！
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
