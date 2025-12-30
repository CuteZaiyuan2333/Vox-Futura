
import React from 'react';
import { Issue, Language } from '../types';
import { UI_STRINGS } from '../translations';

interface CommentsDrawerProps {
  issue: Issue;
  language: Language;
  isOpen: boolean;
  onClose: () => void;
}

const CommentsDrawer: React.FC<CommentsDrawerProps> = ({ issue, language, isOpen, onClose }) => {
  const t = UI_STRINGS[language];

  return (
    <div 
      className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute bottom-0 left-0 right-0 h-[80vh] bg-[#0f172a]/90 backdrop-blur-xl rounded-t-[3rem] border-t border-white/20 p-6 flex flex-col shadow-2xl">
        <div className="w-12 h-1.5 bg-white/20 rounded-full mx-auto mb-6" />
        
        <h3 className="font-futuristic text-xl text-white mb-2 uppercase tracking-widest">{t.publicDiscourse}</h3>
        <p className="text-white/40 text-sm mb-6">{t.topic}: {issue.title[language]}</p>
        
        <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
          {issue.comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <img src={comment.avatar} alt={comment.user} className="w-10 h-10 rounded-full border border-white/10" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-cyan-400 text-sm font-semibold">@{comment.user}</span>
                  <span className="text-white/20 text-xs">{comment.timestamp}</span>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">{comment.content[language]}</p>
                <div className="flex items-center gap-4 mt-2">
                  <button className="flex items-center gap-1 text-white/30 text-xs hover:text-cyan-400 transition-colors">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.704a1 1 0 01.94 1.315l-2.288 8.122A1 1 0 0116.417 21H5a1 1 0 01-1-1v-8a1 1 0 01.293-.707l7-7a1 1 0 011.414 0l1.586 1.586a1 1 0 01.293.707V10z" />
                    </svg>
                    {comment.likes}
                  </button>
                  <button className="text-white/30 text-xs hover:text-white transition-colors">Reply</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-2">
          <input 
            type="text" 
            placeholder={t.placeholder}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500/50"
          />
          <button className="bg-cyan-500/20 text-cyan-400 w-12 h-12 rounded-full flex items-center justify-center border border-cyan-500/30 hover:bg-cyan-500/30 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsDrawer;
