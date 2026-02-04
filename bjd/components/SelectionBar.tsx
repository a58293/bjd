
import React from 'react';
import { Goddess, Language } from '../types';

interface Props {
  selectedId: string;
  allGoddesses: Goddess[];
  onSelect: (goddess: Goddess) => void;
}

const SelectionBar: React.FC<Props> = ({ 
  selectedId, 
  allGoddesses, 
  onSelect 
}) => {
  return (
    <div className="fixed right-0 top-0 bottom-0 w-48 z-50 flex flex-col justify-center items-end pr-8">
      <div className="absolute right-12 top-24 bottom-24 w-[1px] bg-white/[0.03]" />
      
      <div className="flex flex-col gap-7 max-h-[80vh] overflow-y-auto no-scrollbar py-6 pr-4">
        {allGoddesses.map((g, index) => {
          const isActive = selectedId === g.id;
          // 获取中文名作为导航展示
          const displayName = g.translations['zh']?.name || 'Unknown';
          
          return (
            <div 
              key={g.id}
              onClick={() => onSelect(g)}
              className="group relative flex items-center justify-end gap-5 cursor-pointer"
            >
              <div className={`transition-all duration-1000 whitespace-nowrap ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                <span className={`text-[13px] font-medium tracking-[0.4em] ${isActive ? 'text-amber-500' : 'text-white/40 group-hover:text-white'}`}>
                  {displayName}
                </span>
              </div>

              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className={`absolute inset-0 rounded-sm border border-white/5 transition-all duration-1000 rotate-45 ${isActive ? 'border-amber-500/40 scale-110 opacity-100 bg-amber-500/5' : 'scale-50 opacity-0 group-hover:opacity-100 group-hover:scale-75'}`} />
                <span className={`text-[9px] font-bold transition-all duration-500 ${isActive ? 'text-amber-500' : 'text-white/10 group-hover:text-white/40'}`}>
                  {g.type === 'HUNDRED' ? '◈' : index.toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionBar;
