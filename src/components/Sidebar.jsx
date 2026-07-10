import { useState, useEffect, useRef } from 'react';

const ASCII_BANNER = `╔══════════════════════════════════╗
║  ____   ___   ___  _____         ║
║ |___ \\ / _ \\ / _ \\| ____|        ║
║   __) | | | | | | | |__          ║
║  / __/| |_| | |_| |___ \\         ║
║ |_____|\\___/ \\___/|____/         ║
║                                  ║
║   [ ASPIRING AI/ML ENGINEER ]    ║
║   [ VIDEO EDITOR & CREATOR  ]    ║
╚══════════════════════════════════╝`;

const INTRO_TEXT = "Welcome to my interactive portfolio. Type 'help' for commands.";
const TYPING_SPEED_MS = 50;

const NAV_ITEMS = [
  { label: './about_me.sh',        command: 'about' },
  { label: './list_projects.sh',   command: 'projects' },
  { label: './play_videos.sh',     command: 'videos' },
  { label: './show_skills.sh',     command: 'skills' },
  { label: './show_experience.sh', command: 'experience' },
  { label: './display_certs.sh',   command: 'certs' },
  { label: './download_cv.sh',     command: 'resume' },
  { label: './contact_me.sh',      command: 'contact' },
  { label: './view_stats.sh',      command: 'stats' },
];

function useTypewriter(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete]       = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset on text change
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    const timer = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current += 1;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

export default function Sidebar({ onNavigate, activeView }) {
  const { displayedText, isComplete } = useTypewriter(INTRO_TEXT, TYPING_SPEED_MS);

  return (
    <aside className="hidden md:flex flex-col h-full w-[280px] lg:w-[320px] shrink-0 overflow-y-auto p-4 glass rounded-xl border-glow-animated">

      {}
      <div className="mb-4">
        <pre
          className="text-[var(--theme-primary)] text-[0.55rem] lg:text-[0.6rem] leading-tight font-[var(--font-mono)] select-none text-glow whitespace-pre"
        >
          {ASCII_BANNER}
        </pre>
      </div>

      {}
      <div className="mb-5 px-1">
        <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed font-[var(--font-mono)]">
          <span className="text-[var(--theme-primary)] mr-1">{'>'}</span>
          {displayedText}
          {}
          <span
            className={`inline-block w-[7px] h-[14px] ml-[2px] translate-y-[2px] ${
              isComplete ? 'cursor-blink' : ''
            }`}
            style={{ backgroundColor: 'var(--theme-primary)' }}
          />
        </p>
      </div>

      {}
      <div className="border-t border-[var(--theme-border)] mb-3" />

      {}
      <p className="text-[0.65rem] uppercase tracking-widest text-[var(--theme-text-muted)] mb-2 px-1 select-none font-[var(--font-mono)]">
        Navigation
      </p>

      {}
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ label, command }) => {
          const isActive = activeView === command;

          return (
            <button
              key={command}
              onClick={() => onNavigate?.(command)}
              className={`
                command-link p-1.5 rounded text-left text-xs font-[var(--font-mono)]
                cursor-pointer select-none flex items-center gap-2
                ${isActive
                  ? 'bg-[rgba(var(--theme-primary-rgb),0.15)] text-[var(--theme-primary)] text-glow font-bold'
                  : 'text-[var(--theme-primary)] opacity-75 hover:opacity-100'
                }
              `}
            >
              {}
              <span
                className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--theme-primary)] shadow-[0_0_6px_var(--theme-primary)]'
                    : 'bg-transparent'
                }`}
              />
              {label}
            </button>
          );
        })}
      </nav>

      {}
      <div className="flex-1" />

      {}
      <div className="mt-4 pt-3 border-t border-[var(--theme-border)]">
        <p className="text-[0.6rem] text-[var(--theme-text-muted)] font-[var(--font-mono)] text-center select-none">
          <kbd className="px-1.5 py-0.5 rounded border border-[var(--theme-border)] bg-[rgba(var(--theme-primary-rgb),0.05)] text-[var(--theme-primary)]">
            Ctrl+K
          </kbd>
          {' '}Command Palette
        </p>
      </div>
    </aside>
  );
}
