
import React, { useMemo } from 'react';

interface Props {
  url: string;
  onClose: () => void;
}

const VideoModal: React.FC<Props> = ({ url, onClose }) => {
  const isDirectVideo = /\.(mp4|webm|ogg)$/i.test(url);

  // 智能链接处理：让用户可以直接复制普通网页链接，代码自动转为嵌入式链接
  const embedUrl = useMemo(() => {
    if (isDirectVideo) return url;
    
    let processed = url;

    // Bilibili: 将普通视频链接转为嵌入式播放器 (高画质, 自动播放)
    // 示例: https://www.bilibili.com/video/BV1xx411c7mD -> https://player.bilibili.com/player.html?bvid=BV1xx411c7mD
    const b_match = url.match(/bilibili\.com\/video\/(BV\w+)/i);
    if (b_match) {
        processed = `https://player.bilibili.com/player.html?bvid=${b_match[1]}&high_quality=1&danmaku=0&autoplay=1`;
    }

    // YouTube: 将 watch?v= 转为 embed/
    const y_match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/i);
    if (y_match) {
        processed = `https://www.youtube.com/embed/${y_match[1]}?autoplay=1&rel=0`;
    }

    return processed;
  }, [url, isDirectVideo]);

  return (
    <div 
      className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center animate-fadeIn backdrop-blur-xl p-4 lg:p-10"
      onClick={onClose}
    >
      {/* 顶部关闭栏 */}
      <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-50 pointer-events-none">
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <div className="w-2 h-2 rounded-full bg-amber-500/80" />
            <div className="w-2 h-2 rounded-full bg-green-500/80" />
         </div>
         <button 
            onClick={onClose}
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all"
         >
            ✕
         </button>
      </div>

      {/* 主容器：模拟浏览器窗口，适应网页浏览 */}
      <div 
        className="relative w-full lg:w-[90vw] h-[80vh] lg:h-[85vh] bg-[#050505] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-md overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* 地址栏装饰 (仅视觉) */}
        <div className="h-10 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-4 shrink-0">
            <div className="text-white/20 text-xs">🔒 Secure Connection</div>
            <div className="flex-1 bg-black/20 h-6 rounded px-3 flex items-center">
                <span className="text-white/30 text-[10px] truncate max-w-[300px]">{url}</span>
            </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 relative bg-black">
            {isDirectVideo ? (
            <video 
                src={embedUrl} 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
            />
            ) : (
            <iframe 
                src={embedUrl} 
                className="w-full h-full border-none" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation"
                title="Portal View"
            />
            )}
        </div>
        
        {/* 底部回退栏：防止网站禁止 iframe 导致白屏 */}
        {!isDirectVideo && (
            <div className="h-8 bg-amber-500/10 border-t border-amber-500/20 flex items-center justify-center gap-4 shrink-0">
                <span className="text-[10px] text-amber-500/60 uppercase tracking-widest">External Portal Link</span>
                <a 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] text-white/60 hover:text-white underline decoration-white/30 hover:decoration-white transition-all"
                >
                    如果内容无法加载，请点击此处跳转浏览
                </a>
            </div>
        )}
      </div>

      {/* 底部背景装饰字 */}
      <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
        <p className="text-[10px] text-white/10 tracking-[1em] uppercase font-serif">
            Web Interface Projection
        </p>
      </div>
    </div>
  );
};

export default VideoModal;
