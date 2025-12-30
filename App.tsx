
import React, { useState, useCallback } from 'react';
import { FUTURISTIC_ISSUES } from './constants';
import { Issue, Language } from './types';
import { UI_STRINGS } from './translations';
import IssueCard from './components/IssueCard';
import CommentsDrawer from './components/CommentsDrawer';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentIssue = FUTURISTIC_ISSUES[currentIndex];
  const t = UI_STRINGS[language];

  const handleNext = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % FUTURISTIC_ISSUES.length);
      setIsAnimating(false);
    }, 400);
  }, []);

  const handleVote = (voteType: string) => {
    console.log(`Voted ${voteType} on ${currentIssue.title[language]}`);
    handleNext();
  };

  const handleSwipeLeft = () => handleVote('AGREE');
  const handleSwipeRight = (isAbsurd: boolean) => handleVote(isAbsurd ? 'ABSURD' : 'DISAGREE');
  const handleSwipeUp = () => handleVote('SKIPPED');
  const handleSwipeDown = () => setIsCommentsOpen(true);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  return (
    <div className="relative h-screen w-full bg-[#020617] overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-900/20 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[1px] bg-white/5 rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[1px] bg-white/5 -rotate-45" />
      </div>

      {/* Header */}
      <header className="absolute top-8 left-0 right-0 px-8 flex justify-between items-center z-30">
        <div className="flex flex-col">
          <h1 className="font-futuristic text-xl text-white tracking-[0.3em]">{t.header}</h1>
          <div className="h-0.5 w-12 bg-cyan-500 mt-1" />
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="px-3 py-1 rounded-full glass border border-white/20 text-[10px] text-white font-futuristic hover:bg-white/10 transition-colors"
          >
            {language === 'en' ? '中文' : 'EN'}
          </button>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{t.networkId}</span>
            <span className="text-[10px] text-cyan-400 font-mono">0x7F...22A</span>
          </div>
          <div className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center overflow-hidden">
             <img src="https://picsum.photos/seed/user/40" alt="User" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className={`relative w-full max-w-sm transition-opacity duration-300 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <IssueCard 
          key={currentIssue.id}
          issue={currentIssue}
          language={language}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
          onSwipeUp={handleSwipeUp}
          onSwipeDown={handleSwipeDown}
        />
      </main>

      {/* Controls / Hints */}
      <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-6 z-20 px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[9px] text-white/30 font-futuristic uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border border-white/20 rounded flex items-center justify-center">←</span>
            <span>{t.gestures.left}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border border-white/20 rounded flex items-center justify-center">→</span>
            <span>{t.gestures.right}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border border-white/20 rounded flex items-center justify-center">↑</span>
            <span>{t.gestures.up}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 border border-white/20 rounded flex items-center justify-center">↓</span>
            <span>{t.gestures.down}</span>
          </div>
        </div>
        <div className="text-[9px] text-orange-500/60 font-futuristic uppercase tracking-widest animate-pulse">
          {t.hintLongPress}
        </div>
      </div>

      <CommentsDrawer 
        issue={currentIssue}
        language={language}
        isOpen={isCommentsOpen}
        onClose={() => setIsCommentsOpen(false)}
      />

      {/* Nav */}
      <nav className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-8 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md z-40 shadow-xl">
        <button className="text-cyan-400">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </button>
        <button className="text-white/40 hover:text-white transition-colors">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
        </button>
        <button className="text-white/40 hover:text-white transition-colors">
           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
        </button>
      </nav>
    </div>
  );
};

export default App;
