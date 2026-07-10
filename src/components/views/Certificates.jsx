import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'C Language',
    issuer: 'CBytes Tech Solutions',
    description: 'Comprehensive certification covering fundamentals of C programming, data structures, pointers, memory management, and file handling.',
  },
  {
    id: 2,
    title: 'C++ (OOPs) Language',
    issuer: 'CBytes Tech Solutions',
    description: 'Object-Oriented Programming certification covering classes, inheritance, polymorphism, encapsulation, templates, and STL.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] },
  },
};

function CertificateCard({ cert, index }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 25px rgba(var(--theme-primary-rgb), 0.25), 0 0 50px rgba(var(--theme-primary-rgb), 0.08)',
      }}
      className="glass rounded-xl p-5 border-glow-animated group"
    >
      {}
      <div className="flex items-start justify-between mb-4">
        {}
        <motion.div
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{
            background: 'rgba(var(--theme-primary-rgb), 0.1)',
            border: '1px solid rgba(var(--theme-primary-rgb), 0.25)',
          }}
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          <Award
            size={24}
            className="text-[var(--theme-primary)] group-hover:drop-shadow-[0_0_8px_rgba(var(--theme-primary-rgb),0.6)]"
          />
        </motion.div>

        {}
        <span
          className="text-[10px] font-[var(--font-mono)] px-2 py-0.5 rounded-full"
          style={{
            color: 'var(--theme-primary)',
            background: 'rgba(var(--theme-primary-rgb), 0.08)',
            border: '1px solid rgba(var(--theme-primary-rgb), 0.2)',
          }}
        >
          #{String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {}
      <h3 className="text-[var(--theme-primary)] text-sm font-[var(--font-mono)] font-bold text-glow mb-1.5">
        {cert.title}
      </h3>

      {}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[var(--theme-text-muted)] text-[11px] font-[var(--font-mono)]">
          issued by:
        </span>
        <span className="text-[var(--theme-text)] text-[11px] font-[var(--font-mono)]">
          {cert.issuer}
        </span>
      </div>

      {}
      <p className="text-[var(--theme-text-muted)] text-[11px] font-[var(--font-mono)] leading-relaxed">
        {cert.description}
      </p>

      {}
      <div className="mt-4 pt-3 border-t border-[var(--theme-border)]">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: 'var(--theme-primary)',
              boxShadow: '0 0 6px rgba(var(--theme-primary-rgb), 0.5)',
            }}
          />
          <span className="text-[var(--theme-text-muted)] text-[10px] font-[var(--font-mono)]">
            verified • certificate of completion
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  return (
    <motion.div
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {}
      <motion.div className="flex items-center gap-2" variants={cardVariants}>
        <Award size={16} className="text-[var(--theme-primary)]" />
        <h2 className="text-[var(--theme-primary)] text-sm font-[var(--font-mono)] font-bold text-glow">
          ~/certs — Certificates & Achievements
        </h2>
      </motion.div>
      <motion.p
        className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)] ml-1"
        variants={cardVariants}
      >
        {certificates.length} certificates earned
      </motion.p>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert, index) => (
          <CertificateCard key={cert.id} cert={cert} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
