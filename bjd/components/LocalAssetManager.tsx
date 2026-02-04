
import React from 'react';
import { Goddess } from '../types';

interface Props {
  allGoddesses: Goddess[];
  onUpload: (id: string, url: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const LocalAssetManager: React.FC<Props> = ({ allGoddesses, onUpload, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleFileChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(id, url);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
      <div className="bg-[#1a1a1a] border border-white/10 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col rounded-lg shadow-2xl">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <div>
            <h2 className="font-brush text-3xl text-amber-500">素材装载器</h2>
            <p className="text-[10px] text-white/40 tracking-widest uppercase mt-1">Local Asset Mapping Manager</p>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 no-scrollbar">
          {allGoddesses.map(g => (
            <div key={g.id} className="relative group aspect-[3/4] bg-white/5 border border-white/5 rounded overflow-hidden flex flex-col items-center justify-center p-4 hover:border-amber-500/50 transition-all">
              {g.localUrl ? (
                <img src={g.localUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="" />
              ) : null}
              
              <span className="relative z-10 font-brush text-xl mb-2">{g.translations['zh']?.name || 'Unknown'}</span>
              <label className="relative z-10 cursor-pointer bg-amber-500/20 hover:bg-amber-500/40 px-3 py-1 rounded text-[10px] tracking-tighter transition-colors">
                {g.localUrl ? '更换图片' : '选择本地图'}
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={(e) => handleFileChange(g.id, e)} 
                />
              </label>
            </div>
          ))}
        </div>
        
        <div className="p-6 border-t border-white/5 text-center">
          <p className="text-white/30 text-[10px] tracking-[0.2em]">提示：此预览仅在当前浏览器会话有效。正式发布时请将图片放入项目根目录并命名为相应路径。</p>
        </div>
      </div>
    </div>
  );
};

export default LocalAssetManager;
