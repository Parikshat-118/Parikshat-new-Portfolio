import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  FolderOpen,
  Briefcase,
  Mail,
  Menu,
  X,
  Wrench,
  Film,
  Award,
  FileText,
  BarChart3
} from 'lucide-react';

const PRIMARY_TABS = [
  { command: 'about',      label: 'About',      icon: User },
  { command: 'experience', label: 'Experience', icon: Briefcase },
  { command: 'projects',   label: 'Projects',   icon: FolderOpen },
  { command: 'contact',    label: 'Contact',    icon: Mail },
];

const MORE_TABS = [
  { command: 'skills',     label: 'Skills',      icon: Wrench },
  { command: 'videos',     label: 'Videos',      icon: Film },
  { command: 'certs',      label: 'Certificates', icon: Award },
  { command: 'resume',     label: 'Resume',      icon: FileText },
  { command: 'stats',      label: 'Stats',       icon: BarChart3 },
];

export default function MobileNav({ onNavigate, activeView }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const handleNavigate = (cmd) => {
    onNavigate?.(cmd);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar — in normal document flow, NOT fixed */}
      <div 
        className="glass-strong flex items-center justify-around px-2 pb-safe pt-2 rounded-xl"
        style={{
          borderTop: '1px solid var(--theme-border)',
          boxShadow: '0 -5px 20px rgba(0,0,0,0.3)',
          minHeight: '64px'
        }}
      >
        {PRIMARY_TABS.map(({ command, label, icon: Icon }) => {
          const isActive = activeView === command;
          return (
            <button
              key={command}
              onClick={() => handleNavigate(command)}
              className="flex flex-col items-center justify-center flex-1 py-1 transition-colors"
            >
              <div 
                className={`p-2 rounded-full mb-0.5 transition-all duration-300 ${isActive ? 'bg-[var(--theme-primary)] bg-opacity-20' : 'bg-transparent'}`}
                style={{ 
                  color: isActive ? 'var(--theme-primary)' : 'var(--theme-text-muted)',
                  boxShadow: isActive ? '0 0 10px rgba(var(--theme-primary-rgb), 0.3)' : 'none'
                }}
              >
                <Icon size={22} />
              </div>
              <span 
                className="text-[11px] font-[var(--font-sans)] font-medium"
                style={{ color: isActive ? 'var(--theme-primary)' : 'var(--theme-text-muted)' }}
              >
                {label}
              </span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          onClick={() => setIsMoreOpen(true)}
          className="flex flex-col items-center justify-center flex-1 py-1 transition-colors"
        >
          <div 
            className="p-2 rounded-full mb-0.5 bg-transparent"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            <Menu size={22} />
          </div>
          <span 
            className="text-[11px] font-[var(--font-sans)] font-medium"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            More
          </span>
        </button>
      </div>

      {/* More Menu (Bottom Sheet) — this one stays fixed as an overlay */}
      <AnimatePresence>
        {isMoreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[65] bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMoreOpen(false)}
            />
            
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[70] glass-strong rounded-t-2xl overflow-hidden"
              style={{
                borderTop: '1px solid var(--theme-border)',
                paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)'
              }}
            >
              <div className="px-5 py-4 border-b border-[var(--theme-border)] flex items-center justify-between">
                <span className="font-bold text-[var(--theme-primary)] text-glow">More Sections</span>
                <button onClick={() => setIsMoreOpen(false)} className="p-1 text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)]">
                  <X size={24} />
                </button>
              </div>
              <div className="p-4 grid grid-cols-2 gap-3">
                {MORE_TABS.map(({ command, label, icon: Icon }) => {
                  const isActive = activeView === command;
                  return (
                    <button
                      key={command}
                      onClick={() => handleNavigate(command)}
                      className="flex items-center gap-3 p-4 rounded-xl transition-colors text-left"
                      style={{
                        backgroundColor: isActive ? 'rgba(var(--theme-primary-rgb), 0.1)' : 'rgba(255,255,255,0.05)',
                        border: isActive ? '1px solid var(--theme-primary)' : '1px solid transparent'
                      }}
                    >
                      <Icon size={22} style={{ color: isActive ? 'var(--theme-primary)' : 'var(--theme-text-muted)' }} />
                      <span className="text-sm font-[var(--font-sans)]" style={{ color: isActive ? 'var(--theme-primary)' : 'var(--theme-text)' }}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
