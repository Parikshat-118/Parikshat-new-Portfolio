import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  User,
  FolderOpen,
  Code,
  Briefcase,
  Film,
  Award,
  FileDown,
  Mail,
  BarChart3,
} from 'lucide-react';

const ICON_MAP = {
  User,
  FolderOpen,
  Code,
  Briefcase,
  Film,
  Award,
  FileDown,
  Mail,
  BarChart3,
};

const PALETTE_ITEMS = [
  { id: 'about',      label: 'About Me',      desc: 'Learn about Parikshat',       icon: 'User' },
  { id: 'projects',   label: 'Projects',       desc: 'Browse portfolio projects',   icon: 'FolderOpen' },
  { id: 'skills',     label: 'Skills',         desc: 'View technical skillset',     icon: 'Code' },
  { id: 'experience', label: 'Experience',     desc: 'Professional timeline',       icon: 'Briefcase' },
  { id: 'videos',     label: 'Video Edits',    desc: 'Watch video creations',       icon: 'Film' },
  { id: 'certs',      label: 'Certificates',   desc: 'View certifications',         icon: 'Award' },
  { id: 'resume',     label: 'Resume',         desc: 'Preview and download CV',     icon: 'FileDown' },
  { id: 'contact',    label: 'Contact',        desc: 'Get in touch',                icon: 'Mail' },
  { id: 'stats',      label: 'Stats',          desc: 'GitHub & LeetCode stats',     icon: 'BarChart3' },
];

const backdropVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1 },
  exit:    { opacity: 0 },
};

const panelVariants = {
  hidden:  { opacity: 0, y: -30, scale: 0.95 },
  visible: { opacity: 1, y: 0,   scale: 1, transition: { type: 'spring', damping: 25, stiffness: 300 } },
  exit:    { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.15 } },
};

export default function CommandPalette({ isOpen, onClose, onSelect }) {
  const [query, setQuery]         = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef   = useRef(null);
  const listRef    = useRef(null);

    const filtered = query.trim()
    ? PALETTE_ITEMS.filter(
        (item) =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          item.desc.toLowerCase().includes(query.toLowerCase()) ||
          item.id.toLowerCase().includes(query.toLowerCase())
      )
    : PALETTE_ITEMS;

    useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveIdx(0);
      // Focus the input after animation starts
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

    useEffect(() => {
    if (activeIdx >= filtered.length) {
      setActiveIdx(Math.max(0, filtered.length - 1));
    }
  }, [filtered.length, activeIdx]);

    useEffect(() => {
    const activeEl = listRef.current?.children[activeIdx];
    activeEl?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

    const selectItem = useCallback(
    (item) => {
      onSelect?.(item.id);
      onClose?.();
    },
    [onSelect, onClose]
  );

    const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose?.();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[activeIdx]) {
        selectItem(filtered[activeIdx]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
                <motion.div
          className="fixed inset-0 z-[9000] flex items-start justify-center pt-[15vh]"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          {}
          <motion.div
            className="w-full max-w-[520px] mx-4 glass-strong rounded-xl overflow-hidden shadow-2xl"
            style={{ boxShadow: 'var(--theme-glow-strong)' }}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--theme-border)]">
              <Search
                size={18}
                className="text-[var(--theme-primary)] opacity-60 shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIdx(0);
                }}
                placeholder="Search commands..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--theme-text)] font-[var(--font-mono)] placeholder:text-[var(--theme-text-muted)]"
                spellCheck={false}
                autoComplete="off"
              />
              {}
              <kbd className="text-[0.6rem] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text-muted)] font-[var(--font-mono)] select-none">
                ESC
              </kbd>
            </div>

            {}
            <div
              ref={listRef}
              className="max-h-[340px] overflow-y-auto p-2"
              role="listbox"
            >
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-sm text-[var(--theme-text-muted)] font-[var(--font-mono)]">
                  No commands found for "{query}"
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const IconComponent = ICON_MAP[item.icon];
                  const isActive = idx === activeIdx;

                  return (
                    <button
                      key={item.id}
                      role="option"
                      aria-selected={isActive}
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      className={`
                        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer
                        transition-colors duration-100 text-left
                        ${isActive
                          ? 'bg-[rgba(var(--theme-primary-rgb),0.12)]'
                          : 'hover:bg-[rgba(var(--theme-primary-rgb),0.06)]'
                        }
                      `}
                    >
                      {}
                      <div
                        className={`
                          w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                          ${isActive
                            ? 'bg-[rgba(var(--theme-primary-rgb),0.2)]'
                            : 'bg-[rgba(var(--theme-primary-rgb),0.08)]'
                          }
                        `}
                      >
                        {IconComponent && (
                          <IconComponent
                            size={16}
                            className={`
                              ${isActive ? 'text-[var(--theme-primary)]' : 'text-[var(--theme-text-muted)]'}
                            `}
                          />
                        )}
                      </div>

                      {}
                      <div className="flex-1 min-w-0">
                        <p
                          className={`
                            text-sm font-[var(--font-mono)] truncate
                            ${isActive ? 'text-[var(--theme-primary)] font-semibold' : 'text-[var(--theme-text)]'}
                          `}
                        >
                          {item.label}
                        </p>
                        <p className="text-xs text-[var(--theme-text-muted)] truncate mt-0.5">
                          {item.desc}
                        </p>
                      </div>

                      {}
                      {isActive && (
                        <kbd className="text-[0.55rem] px-1.5 py-0.5 rounded border border-[var(--theme-border)] text-[var(--theme-text-muted)] font-[var(--font-mono)] select-none shrink-0">
                          ↵
                        </kbd>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {}
            <div className="flex items-center justify-center gap-4 px-4 py-2 border-t border-[var(--theme-border)]">
              <span className="text-[0.6rem] text-[var(--theme-text-muted)] font-[var(--font-mono)] flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-[var(--theme-border)]">↑↓</kbd>
                Navigate
              </span>
              <span className="text-[0.6rem] text-[var(--theme-text-muted)] font-[var(--font-mono)] flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-[var(--theme-border)]">↵</kbd>
                Select
              </span>
              <span className="text-[0.6rem] text-[var(--theme-text-muted)] font-[var(--font-mono)] flex items-center gap-1">
                <kbd className="px-1 py-0.5 rounded border border-[var(--theme-border)]">Esc</kbd>
                Close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
