import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Eye, ExternalLink } from 'lucide-react';

const RESUME_URL = '/assets/documents/Parikshat_Singh_Resume_f1.pdf';

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Resume() {
  const [iframeError, setIframeError] = useState(false);

  return (
    <motion.div
      className="page-shell page-shell-wide"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="page-header" variants={itemVariants}>
        <div className="flex items-center gap-2 mb-4">
          <Eye size={16} className="text-[var(--theme-primary)]" />
          <h2 className="page-title mb-0 text-sm font-[var(--font-mono)] font-bold text-glow">
            ~/resume.pdf — Resume Viewer
          </h2>
        </div>
        <p className="page-subtitle text-xs font-[var(--font-mono)]">
          Preview the resume inline or open the full PDF in a new tab.
        </p>
      </motion.div>

      <motion.div
        className="terminal-section flex flex-wrap gap-4"
        variants={itemVariants}
      >
        {}
        <motion.a
          href={RESUME_URL}
          download="Parikshat_Singh_Resume.pdf"
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 25px rgba(var(--theme-primary-rgb), 0.35), 0 0 50px rgba(var(--theme-primary-rgb), 0.12)',
          }}
          whileTap={{ scale: 0.97 }}
          className="glass rounded-lg px-5 py-3 flex items-center gap-3 cursor-pointer group border-glow-animated no-underline"
        >
          <FileDown
            size={20}
            className="text-[var(--theme-primary)] group-hover:animate-bounce"
          />
          <div className="font-[var(--font-mono)]">
            <p className="text-[var(--theme-text)] text-sm">
              <span className="text-[var(--theme-primary)]">$</span> wget resume.pdf
            </p>
            <p className="text-[var(--theme-text-muted)] text-[10px] mt-0.5">
              Download resume • PDF format
            </p>
          </div>
        </motion.a>

        {}
        <motion.a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 20px rgba(var(--theme-primary-rgb), 0.25)',
          }}
          whileTap={{ scale: 0.97 }}
          className="glass rounded-lg px-5 py-3 flex items-center gap-3 cursor-pointer group no-underline"
        >
          <ExternalLink
            size={20}
            className="text-[var(--theme-primary)]"
          />
          <div className="font-[var(--font-mono)]">
            <p className="text-[var(--theme-text)] text-sm">
              <span className="text-[var(--theme-primary)]">$</span> open --fullscreen
            </p>
            <p className="text-[var(--theme-text-muted)] text-[10px] mt-0.5">
              View in new tab • Full screen
            </p>
          </div>
        </motion.a>
      </motion.div>

      <motion.div
        className="terminal-section glass rounded-xl overflow-hidden border-glow-animated"
        variants={itemVariants}
      >
        {}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--theme-border)]">
          <Eye size={14} className="text-[var(--theme-primary)]" />
          <span className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)]">
            preview — {RESUME_URL}
          </span>
        </div>

        {}
        {!iframeError ? (
          <div className="relative bg-[var(--theme-bg)]">
            <iframe
              src={RESUME_URL}
              title="Parikshat Singh Resume"
              className="w-full border-none"
              style={{ height: '70vh', minHeight: '300px' }}
              onError={() => setIframeError(true)}
            />
          </div>
        ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <FileDown size={48} className="text-[var(--theme-text-muted)] mb-4 opacity-40" />
            <p className="text-[var(--theme-text)] text-sm font-[var(--font-mono)] mb-2">
              PDF preview unavailable in this browser
            </p>
            <p className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)] mb-4">
              Use the download button above or open in a new tab to view the resume.
            </p>
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="command-link text-sm font-[var(--font-mono)] px-4 py-2 rounded-lg glass"
            >
              Open Resume →
            </motion.a>
          </div>
        )}
      </motion.div>

      <motion.p
        className="text-[var(--theme-text-muted)] text-[10px] font-[var(--font-mono)] text-center"
        variants={itemVariants}
      >
        Last updated • Parikshat Singh • B.Tech CS, Bharati Vidyapeeth's College of Engineering
      </motion.p>
    </motion.div>
  );
}
