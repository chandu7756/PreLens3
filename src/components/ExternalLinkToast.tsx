import React, { useState, useEffect } from 'react';
import { ExternalLink, Check, Copy, X } from 'lucide-react';
import { ExternalLinkEventDetail } from '../utils/linkOpener';

export const ExternalLinkToast: React.FC = () => {
  const [activeNotice, setActiveNotice] = useState<ExternalLinkEventDetail | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const handleLinkEvent = (e: Event) => {
      const customEvent = e as CustomEvent<ExternalLinkEventDetail>;
      if (customEvent.detail) {
        setActiveNotice(customEvent.detail);
        setCopied(false);
      }
    };

    window.addEventListener('preplens:open-link', handleLinkEvent);
    return () => {
      window.removeEventListener('preplens:open-link', handleLinkEvent);
    };
  }, []);

  useEffect(() => {
    if (!activeNotice) return;
    const timer = setTimeout(() => {
      setActiveNotice(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [activeNotice]);

  if (!activeNotice) return null;

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(activeNotice.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-[calc(100vw-3rem)] bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700/80 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Redirecting to Official Government Portal</span>
          </div>
          <h4 className="text-xs font-semibold text-slate-100 line-clamp-1">
            {activeNotice.title}
          </h4>
          <p className="text-[11px] font-mono text-slate-400 truncate max-w-xs">
            {activeNotice.url}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setActiveNotice(null)}
          className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
        <a
          href={activeNotice.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            window.open(activeNotice.url, '_blank', 'noopener,noreferrer');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors cursor-pointer"
        >
          <span>Open Link Directly</span>
          <ExternalLink className="w-3 h-3" />
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy URL</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
