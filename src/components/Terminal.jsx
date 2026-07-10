import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const COMMANDS = [
  { cmd: 'about',      desc: 'Display information about me' },
  { cmd: 'projects',   desc: 'Browse my project portfolio' },
  { cmd: 'skills',     desc: 'View my technical skillset' },
  { cmd: 'experience', desc: 'See my professional timeline' },
  { cmd: 'videos',     desc: 'Watch my video edits' },
  { cmd: 'certs',      desc: 'View my certificates' },
  { cmd: 'resume',     desc: 'Preview and download my resume' },
  { cmd: 'contact',    desc: 'Get in touch with me' },
  { cmd: 'stats',      desc: 'View GitHub & LeetCode stats' },
  { cmd: 'clear',      desc: 'Clear terminal output' },
  { cmd: 'theme',      desc: 'Switch color themes [green|blue|amber|purple|white]' },
  { cmd: 'matrix',     desc: 'Toggle 3D background' },
  { cmd: 'crt',        desc: 'Toggle CRT scanline effect' },
  { cmd: 'whoami',     desc: 'Who is this visitor?' },
  { cmd: 'ls',         desc: 'List available sections' },
  { cmd: 'cat <file>', desc: 'Read a file (try: cat about.txt)' },
  { cmd: 'neofetch',   desc: 'Display system information' },
  { cmd: 'help',       desc: 'Show this help message' },
];

const AUTOCOMPLETE_COMMANDS = COMMANDS.map((c) => c.cmd.split(' ')[0]);

const EASTER_EGGS = {
  'sudo hire parikshat':
    '\n🎉 Permission Granted! Sending offer letter...\n   Just kidding. But you should definitely hire me! 😄',
  coffee:
    '\n☕ Brewing motivation...\n   [████████████████████] 100%\n   Energy restored! Ready to code.',
  'hack nasa':
    '\n🚫 Nice try, script kiddy.\n   NASA security has been notified. 🛸',
  'rm -rf /':
    "\n😱 Whoa there! Let's not destroy the portfolio...\n   Operation cancelled. Crisis averted.",
  exit:
    "\n👋 Thanks for visiting! But you can't escape that easily...\n   This terminal is forever. 💀",
};

const LOCAL_COMMANDS = new Set([
  'help', 'clear', 'whoami', 'ls',
]);

const VALID_THEMES = ['green', 'blue', 'amber', 'purple', 'white'];

const LS_SECTIONS = [
  { name: 'about.txt',       color: 'text-[var(--theme-primary)]' },
  { name: 'projects/',       color: 'text-[var(--theme-secondary)]' },
  { name: 'skills.json',     color: 'text-[var(--theme-primary)]' },
  { name: 'experience.log',  color: 'text-[var(--theme-primary)]' },
  { name: 'videos/',         color: 'text-[var(--theme-secondary)]' },
  { name: 'certs/',          color: 'text-[var(--theme-secondary)]' },
  { name: 'resume.pdf',      color: 'text-red-400' },
  { name: 'contact.sh',      color: 'text-green-400' },
  { name: 'stats.dat',       color: 'text-[var(--theme-primary)]' },
  { name: '.config/',        color: 'text-[var(--theme-text-muted)]' },
];

const Prompt = () => (
  <span className="select-none whitespace-pre">
    <span className="prompt-user font-bold">visitor@parikshat</span>
    <span className="text-[var(--theme-text)]">:</span>
    <span className="prompt-path">~</span>
    <span className="text-[var(--theme-text)]">$ </span>
  </span>
);

const WELCOME_BANNER = (
  <div className="mb-2">
    <p className="text-[var(--theme-primary)] font-bold text-glow">
      Welcome to Parikshat's Portfolio
    </p>
    <p className="text-[var(--theme-text-muted)]">
      Type "<span className="text-[var(--theme-primary)]">help</span>" for available commands.
    </p>
  </div>
);

export default function Terminal({ onCommandExecute, activeView, contentView }) {
  // ── State ──
  const [input, setInput]           = useState('');
  const [history, setHistory]       = useState([]);      // previous commands
  const [historyIdx, setHistoryIdx] = useState(-1);      // -1 = not navigating
  const [savedInput, setSavedInput] = useState('');       // stash current input when navigating
  const [outputLines, setOutputLines] = useState([       // rendered output blocks
    { id: 'welcome', content: WELCOME_BANNER },
  ]);

  // ── Refs ──
  const inputRef      = useRef(null);
  const outputRef     = useRef(null);
  const bottomRef     = useRef(null);
  const idCounter     = useRef(0);

    const nextId = () => `line-${++idCounter.current}`;

    useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [outputLines]);



    useEffect(() => {
    inputRef.current?.focus();
  }, []);

    const pushOutput = useCallback((content) => {
    setOutputLines((prev) => [...prev, { id: nextId(), content }]);
  }, []);

    const buildHelp = () => (
    <div className="ml-1">
      <p className="text-[var(--theme-primary)] font-bold mb-2 text-glow">
        Available Commands:
      </p>
      <div className="grid gap-y-0.5">
        {COMMANDS.map(({ cmd, desc }) => (
          <div key={cmd} className="flex gap-2">
            <span className="text-[var(--theme-primary)] w-[160px] shrink-0">{cmd}</span>
            <span className="text-[var(--theme-text-muted)]">- {desc}</span>
          </div>
        ))}
      </div>
    </div>
  );

    const buildWhoami = () => (
    <div className="ml-1">
      <p className="text-[var(--theme-text)]">
        visitor — Welcome to Parikshat Singh's Portfolio Terminal
      </p>
      <p className="text-[var(--theme-text)]">
        Role: Curious Explorer 🔍
      </p>
    </div>
  );

    const buildLs = () => (
    <div className="ml-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-1">
      {LS_SECTIONS.map(({ name, color }) => (
        <span key={name} className={`${color} whitespace-nowrap`}>
          {name}
        </span>
      ))}
    </div>
  );

    const processCommand = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      const lower   = trimmed.toLowerCase();

      // Echo the command line with prompt
      pushOutput(
        <div className="flex items-start">
          <Prompt />
          <span className="text-[var(--theme-text)]">{trimmed}</span>
        </div>
      );

      // Empty input — just echo a blank prompt
      if (!trimmed) return;

      // Save to history
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIdx(-1);
      setSavedInput('');

      // ── Easter eggs ──
      if (EASTER_EGGS[lower]) {
        pushOutput(
          <pre className="ml-4 text-[var(--theme-text)] whitespace-pre-wrap">
            {EASTER_EGGS[lower]}
          </pre>
        );
        return;
      }

      // ── Clear ──
      if (lower === 'clear') {
        setOutputLines([]);
        return;
      }

      // ── Help ──
      if (lower === 'help') {
        pushOutput(buildHelp());
        return;
      }

      // ── whoami ──
      if (lower === 'whoami') {
        pushOutput(buildWhoami());
        return;
      }

      // ── ls ──
      if (lower === 'ls') {
        pushOutput(buildLs());
        return;
      }

      // ── theme <name> ──
      if (lower.startsWith('theme')) {
        const parts = lower.split(/\s+/);
        if (parts.length < 2) {
          pushOutput(
            <p className="ml-4 text-[var(--theme-text-muted)]">
              Usage: theme {'<'}name{'>'} — options: {VALID_THEMES.join(', ')}
            </p>
          );
          return;
        }
        const themeName = parts[1];
        if (VALID_THEMES.includes(themeName)) {
          onCommandExecute?.(`theme:${themeName}`);
          pushOutput(
            <p className="ml-4 text-[var(--theme-primary)]">
              ✓ Theme switched to <span className="font-bold">{themeName}</span>
            </p>
          );
        } else {
          pushOutput(
            <p className="ml-4 text-red-400">
              Unknown theme "{themeName}". Available: {VALID_THEMES.join(', ')}
            </p>
          );
        }
        return;
      }

      // ── cat <file> ──
      if (lower.startsWith('cat ')) {
        const file = trimmed.slice(4).trim();
        if (file === 'about.txt') {
          onCommandExecute?.('about');
        } else if (file.endsWith('.txt')) {
          pushOutput(
            <p className="ml-4 text-red-400">
              cat: {file}: No such file or directory
            </p>
          );
        } else {
          pushOutput(
            <p className="ml-4 text-red-400">
              cat: {file}: No such file or directory
            </p>
          );
        }
        return;
      }

      // ── Known view commands (delegated to parent) ──
      const viewCommands = [
        'about', 'projects', 'skills', 'experience',
        'videos', 'certs', 'resume', 'contact', 'stats',
        'matrix', 'crt', 'neofetch',
      ];

      if (viewCommands.includes(lower)) {
        const result = onCommandExecute?.(lower);
        if (result) {
          pushOutput(<p className="ml-4 text-[var(--theme-text-muted)]">{result}</p>);
        }
        return;
      }

      // ── Unknown command ──
      pushOutput(
        <p className="ml-4 text-red-400">
          command not found: {trimmed}. Type "help" for available commands.
        </p>
      );
    },
    [onCommandExecute, pushOutput],
  );

    const handleKeyDown = (e) => {
    // ── Enter: submit ──
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(input);
      setInput('');
      return;
    }

    // ── ArrowUp: older history ──
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;

      if (historyIdx === -1) {
        // First press — stash current input
        setSavedInput(input);
        const idx = history.length - 1;
        setHistoryIdx(idx);
        setInput(history[idx]);
      } else if (historyIdx > 0) {
        const idx = historyIdx - 1;
        setHistoryIdx(idx);
        setInput(history[idx]);
      }
      return;
    }

    // ── ArrowDown: newer history ──
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx === -1) return;

      if (historyIdx < history.length - 1) {
        const idx = historyIdx + 1;
        setHistoryIdx(idx);
        setInput(history[idx]);
      } else {
        // Back to the stashed input
        setHistoryIdx(-1);
        setInput(savedInput);
      }
      return;
    }

    // ── Tab: autocomplete ──
    if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;

      const matches = AUTOCOMPLETE_COMMANDS.filter((c) => c.startsWith(partial));

      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Show all matching options
        pushOutput(
          <div className="flex items-start">
            <Prompt />
            <span className="text-[var(--theme-text)]">{input}</span>
          </div>
        );
        pushOutput(
          <div className="ml-4 flex flex-wrap gap-x-4 gap-y-1">
            {matches.map((m) => (
              <span key={m} className="text-[var(--theme-primary)]">{m}</span>
            ))}
          </div>
        );
      }
    }
  };

  const focusInput = (e) => {
    // On mobile, aggressive autofocus brings up the virtual keyboard unexpectedly.
    // Users can still tap the input directly if they want to type.
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return;
    }

    // Don't steal focus if the user is clicking on an interactive element inside the terminal
    if (e && e.target) {
      const tag = e.target.tagName.toLowerCase();
      if (['input', 'textarea', 'button', 'a', 'select'].includes(tag)) {
        return;
      }
    }
    
    // Don't steal focus if the user is selecting text
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      return;
    }

    inputRef.current?.focus();
  };

    return (
    <div
      className="glass rounded-xl border-glow-animated flex flex-col h-full w-full overflow-hidden cursor-text"
      onClick={focusInput}
    >
      {}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 md:px-5 md:py-5 font-[var(--font-mono)] text-sm md:text-base leading-relaxed space-y-2"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <AnimatePresence initial={false}>
          {outputLines.map(({ id, content }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {content}
            </motion.div>
          ))}
        </AnimatePresence>

        {}
        <div className="mt-6 md:mt-8 pb-16 md:pb-10">
          {contentView}
        </div>

        {}
        <div ref={bottomRef} />
      </div>

      {}
      <div className="relative px-3 py-4 md:px-5 md:py-5 pt-3 md:pt-4 font-[var(--font-mono)] text-sm md:text-base shrink-0 border-t border-[var(--theme-border)]">
        {}
        <div className="flex items-center" onClick={focusInput}>
          <Prompt />
          <span className="text-[var(--theme-text)]">{input}</span>
          <span
            className="cursor-blink inline-block w-[8px] h-[18px] ml-[1px] translate-y-[1px]"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          />
        </div>

        {}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            // Reset history navigation when user types
            if (historyIdx !== -1) {
              setHistoryIdx(-1);
            }
          }}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 opacity-0 w-full h-full cursor-text"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
        />
      </div>
    </div>
  );
}
