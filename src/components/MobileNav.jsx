import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  FolderOpen,
  Wrench,
  Briefcase,
  Film,
  Award,
  FileText,
  Mail,
  BarChart3,
  Terminal,
} from 'lucide-react';

const NAV_ITEMS = [
  { command: 'about',      label: 'About',       icon: User },
  { command: 'projects',   label: 'Projects',    icon: FolderOpen },
  { command: 'skills',     label: 'Skills',      icon: Wrench },
  { command: 'experience', label: 'Experience',  icon: Briefcase },
  { command: 'videos',     label: 'Videos',      icon: Film },
  { command: 'certs',      label: 'Certificates', icon: Award },
  { command: 'resume',     label: 'Resume',      icon: FileText },
  { command: 'contact',    label: 'Contact',     icon: Mail },
  { command: 'stats',      label: 'Stats',       icon: BarChart3 },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.1 } },
};

const panelVariants = {
  hidden: { x: '100%', opacity: 0.5 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

export default function MobileNav({ isOpen, onClose, onNavigate, activeView }) {
    const handleItemClick = (command) => {
    onNavigate?.(command);
    onClose?.();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {}
          <motion.div
            key="mobile-nav-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60]"
            style={{
              backgroundColor: 'rgba(10, 10, 15, 0.8)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
            onClick={onClose}
          />

          {}
          <motion.div
            key="mobile-nav-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[61] w-[280px] max-w-[85vw] glass-strong flex flex-col"
            style={{
              borderLeft: '1px solid rgba(var(--theme-primary-rgb), 0.15)',
              boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.5)',
            }}
          >
            {}
            <div
              className="flex items-center justify-between px-5 py-4 shrink-0"
              style={{
                borderBottom: '1px solid rgba(var(--theme-primary-rgb), 0.12)',
              }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-[var(--theme-primary)]" />
                <span className="text-[var(--theme-primary)] font-bold text-sm font-[var(--font-mono)] text-glow">
                  Navigation
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors cursor-pointer p-1"
                aria-label="Close navigation"
              >
                <X size={20} />
              </button>
            </div>

            {}
            <motion.nav
              className="flex-1 overflow-y-auto px-3 py-4"
              variants={listVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="space-y-1">
                {NAV_ITEMS.map(({ command, label, icon: Icon }) => {
                  const isActive = activeView === command;

                  return (
                    <motion.button
                      key={command}
                      variants={itemVariants}
                      onClick={() => handleItemClick(command)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer font-[var(--font-mono)] text-sm ${
                        isActive
                          ? 'text-[var(--theme-primary)]'
                          : 'text-[var(--theme-text)] hover:text-[var(--theme-primary)]'
                      }`}
                      style={
                        isActive
                          ? {
                              background: 'rgba(var(--theme-primary-rgb), 0.1)',
                              border: '1px solid rgba(var(--theme-primary-rgb), 0.2)',
                              boxShadow: 'var(--theme-glow)',
                            }
                          : {
                              background: 'transparent',
                              border: '1px solid transparent',
                            }
                      }
                      whileTap={{ scale: 0.97 }}
                    >
                      <Icon
                        size={18}
                        className={
                          isActive
                            ? 'text-[var(--theme-primary)]'
                            : 'text-[var(--theme-text-muted)]'
                        }
                      />
                      <span>{label}</span>

                      {}
                      {isActive && (
                        <span className="ml-auto w-2 h-2 rounded-full bg-[var(--theme-primary)] animate-pulse" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.nav>

            {}
            <div
              className="shrink-0 px-5 py-3"
              style={{
                borderTop: '1px solid rgba(var(--theme-primary-rgb), 0.08)',
              }}
            >
              <p className="text-[var(--theme-text-muted)] text-[10px] font-[var(--font-mono)] text-center opacity-60">
                Parikshat's Portfolio — Parikshat Singh
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
