
import React, { useState, useEffect, useRef } from 'react';
import { Issue, Language } from '../types';
import { UI_STRINGS } from '../translations';

interface IssueCardProps {
  issue: Issue;
  language: Language;
  onSwipeLeft: () => void;
  onSwipeRight: (isAbsurd: boolean) => void;
  onSwipeUp: () => void;
  onSwipeDown: () => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, language, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown }) => {
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isLongPressing, setIsLongPressing] = useState(false);
  const longPressTimer = useRef<number | null>(null);

  const t = UI_STRINGS[language];
  const SWIPE_THRESHOLD = 120;
  const ABSURD_PRESS_TIME = 800;

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
    
    longPressTimer.current = window.setTimeout(() => {
      setIsLongPressing(true);
    }, ABSURD_PRESS_TIME);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setDragOffset({ x: dx, y: dy });

    if (Math.abs(dx) > 10 || Math.abs(dy) > 10) {
      if (longPressTimer.current) {
        clearTimeout(longPressTimer.current);
        longPressTimer.current = null;
      }
    }
  };

  const handlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }

    const { x, y } = dragOffset;
    const absX = Math.abs(x);
    const absY = Math.abs(y);

    if (absX > absY && absX > SWIPE_THRESHOLD) {
      if (x > 0) {
        onSwipeRight(isLongPressing);
      } else {
        onSwipeLeft();
      }
    } else if (absY > absX && absY > SWIPE_THRESHOLD) {
      if (y > 0) {
        onSwipeDown();
      } else {
        onSwipeUp();
      }
    }

    setDragOffset({ x: 0, y: 0 });
    setIsDragging(false);
    setIsLongPressing(false);
  };

  const rotation = dragOffset.x / 20;

  const getOverlayLabel = () => {
    const { x, y } = dragOffset;
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    
    if (absX > absY && absX > 50) {
      if (x > 0) return isLongPressing ? t.absurd : t.disagree;
      return t.agree;
    }
    if (absY > absX && absY > 50) {
      if (y > 0) return t.comments;
      return t.skip;
    }
    return null;
  };

  const label = getOverlayLabel();

  return (
    <div 
      className="relative w-full h-[65vh] max-w-sm mx-auto select-none touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
        transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 10
      }}
    >
      <div className={`w-full h-full glass rounded-[3rem] p-8 flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300 ${isLongPressing ? 'ring-4 ring-orange-500/50' : 'ring-1 ring-white/10'}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent animate-pulse" />
        
        {label && (
          <div className={`absolute top-12 left-0 right-0 text-center z-20 transition-all transform scale-125 font-futuristic text-4xl font-bold pointer-events-none 
            ${label === t.agree ? 'text-emerald-400' : ''}
            ${label === t.disagree ? 'text-rose-500' : ''}
            ${label === t.absurd ? 'text-orange-500 animate-bounce' : ''}
            ${label === t.skip ? 'text-amber-400' : ''}
            ${label === t.comments ? 'text-cyan-400' : ''}
          `}>
            {label}
          </div>
        )}

        <div className="mb-4">
          <span className="text-[10px] font-futuristic text-cyan-400 tracking-[0.2em] border border-cyan-400/30 px-2 py-1 rounded">
            {issue.category[language]}
          </span>
        </div>

        <h2 className={`font-futuristic text-white mb-4 leading-tight ${language === 'zh' ? 'text-xl' : 'text-2xl'}`}>
          {issue.title[language]}
        </h2>

        <p className={`text-white/60 leading-relaxed flex-1 overflow-y-auto pr-2 mb-6 ${language === 'zh' ? 'text-sm' : 'text-xs'}`}>
          {issue.description[language]}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest">
            <span>{t.author}: {issue.author}</span>
            <span className={issue.urgency === 'Critical' ? 'text-rose-500' : 'text-white/30'}>{t.urgency}: {(t.urgencyLevels as any)[issue.urgency]}</span>
          </div>
          
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex">
            <div style={{ width: `${issue.stats.agree}%` }} className="h-full bg-emerald-500/60" />
            <div style={{ width: `${issue.stats.absurd}%` }} className="h-full bg-orange-500/60" />
            <div style={{ width: `${issue.stats.disagree}%` }} className="h-full bg-rose-500/60" />
          </div>
          
          <div className="flex justify-between text-[10px] text-white/40">
            <span>{issue.stats.agree}% {t.favor}</span>
            <span>{issue.stats.absurd}% {t.absurdLabel}</span>
            <span>{issue.stats.disagree}% {t.oppose}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
