
import React from 'react';

interface Props {
  message: string;
  onClose: () => void;
  color: string;
}

const WaitingModal: React.FC<Props> = ({ message, onClose, color }) => {
  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center animate-fadeIn cursor-pointer" 
      onClick={onClose}
    >
      <div 
        className="bg-[#0c0c10] border border-white/10 p-10 lg:p-16 max-w-lg text-center relative shadow-2xl rounded-sm mx-6" 
        style={{ boxShadow: `0 0 60px ${color}15`, borderColor: `${color}30` }}
        onClick={e => e.stopPropagation()}
      >
        {/* 装饰图标 */}
        <div className="mb-8 text-3xl opacity-80 animate-pulse" style={{ color: color }}>◈</div>
        
        {/* 文字内容 */}
        <p className="text-white/80 font-serif text-lg lg:text-xl leading-relaxed tracking-[0.15em] mb-10 whitespace-pre-line">
          {message}
        </p>
        
        {/* 装饰线 */}
        <div className="w-12 h-[1px] bg-white/20 mx-auto mb-10" />

        <button 
          onClick={onClose} 
          className="text-[10px] text-white/30 hover:text-white uppercase tracking-[0.3em] transition-colors border border-transparent hover:border-white/20 px-6 py-2 rounded-full"
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default WaitingModal;
