import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const INTERESTS = [
  {
    emoji: '💻',
    title: 'Coding Enthusiast',
    desc: 'Loves solving problems, exploring algorithms, and building projects',
  },
  {
    emoji: '🎬',
    title: 'Creative Mind',
    desc: 'Skilled in video editing, combining creativity and precision',
  },
  {
    emoji: '📸',
    title: 'Photography Lover',
    desc: 'Passionate nature and scenic photographer',
  },
  {
    emoji: '🏐',
    title: 'Sports Enthusiast',
    desc: 'Volleyball player, stays active and focused',
  },
  {
    emoji: '🤝',
    title: 'Team Player & Helper',
    desc: 'Enjoys collaborating and growing through shared learning',
  },
];

const BADGES = [
  { emoji: '🛡️', label: 'DRDO Research Intern' },
  { emoji: '🤖', label: 'AI/ML Projects' },
  { emoji: '💻', label: '200+ LeetCode Problems' },
  { emoji: '🚀', label: 'Full-Stack Developer' },
  { emoji: '🎬', label: 'Video Editor & Creator' },
];

export default function About() {
  return (
    <motion.div
      className="page-shell"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="page-header">
        <h2
          className="page-title text-xl font-bold text-glow"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {'>'} About Me
        </h2>
        <p
          className="page-subtitle text-sm italic"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          Coder. Creator. Photographer. Explorer.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="terminal-section terminal-card flex flex-col sm:flex-row items-center sm:items-start gap-6 md:gap-8">
        <img 
          src="/assets/images/profile.jpg" 
          alt="Parikshat Singh" 
          className="w-24 h-24 sm:w-24 sm:h-24 shrink-0 rounded-full border-2 object-cover"
          style={{ borderColor: 'var(--theme-primary)', boxShadow: '0 0 10px rgba(var(--theme-primary-rgb), 0.3)' }}
        />
        <div className="terminal-copy text-sm">
          <p>
            Hi, I'm Parikshat Singh, a Computer Science student passionate about building intelligent software that solves real-world problems. I enjoy working at the intersection of AI, machine learning, full-stack development, and computer vision, turning ideas into practical applications. From developing RAG-powered systems and AI-driven platforms to contributing to deep learning research, I love exploring technologies that create meaningful impact. I'm always looking to learn, build, and collaborate on projects that push the boundaries of innovation.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="terminal-section">
        <p
          className="text-xs uppercase tracking-wider mb-4 font-semibold"
          style={{ color: 'var(--theme-primary)' }}
        >
          ┌─ Education
        </p>

        <div className="terminal-stack-md ml-2">
          <div
            className="terminal-card transition-colors duration-200"
            style={{ borderLeft: '2px solid rgba(var(--theme-primary-rgb), 0.3)' }}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold" style={{ color: 'var(--theme-primary)' }}>
                B.Tech Computer Science
              </span>
              <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>2024 - 2028 (Expected)</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--theme-text)' }}>Bharati Vidyapeeth's College of Engineering</p>
            <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>Current CGPA: 8.9/ 10</p>
          </div>
          <div
            className="terminal-card transition-colors duration-200"
            style={{ borderLeft: '2px solid rgba(var(--theme-primary-rgb), 0.3)' }}
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-semibold" style={{ color: 'var(--theme-primary)' }}>
                Senior Secondary (Class XII - Science)
              </span>
              <span className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>2024</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--theme-text)' }}>St. Colombo Public School</p>
            <p className="text-xs mt-1" style={{ color: 'var(--theme-text-muted)' }}>Percentage: 84.4%</p>
          </div>
        </div>

        <p
          className="text-xs mt-2"
          style={{ color: 'var(--theme-primary)', opacity: 0.5 }}
        >
          └──────────────────────────
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="terminal-section">
        <p
          className="text-xs uppercase tracking-wider mb-4 font-semibold"
          style={{ color: 'var(--theme-primary)' }}
        >
          ┌─ Interests & Passions
        </p>

        <div className="terminal-stack-md ml-2">
          {INTERESTS.map(({ emoji, title, desc }) => (
            <motion.div
              key={title}
              variants={itemVariants}
              className="terminal-card flex items-start gap-4 transition-colors duration-200"
              style={{
                borderLeft: '2px solid rgba(var(--theme-primary-rgb), 0.3)',
              }}
              whileHover={{
                backgroundColor: 'rgba(var(--theme-primary-rgb), 0.06)',
                x: 4,
              }}
            >
              <span className="text-lg select-none shrink-0">{emoji}</span>
              <div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--theme-primary)' }}
                >
                  {title}
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'var(--theme-text-muted)' }}
                >
                  {' '}
                  – {desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <p
          className="text-xs mt-4"
          style={{ color: 'var(--theme-primary)', opacity: 0.5 }}
        >
          └──────────────────────────
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="terminal-section terminal-card"
        style={{
          borderLeft: '3px solid var(--theme-primary)',
          background: 'rgba(var(--theme-primary-rgb), 0.04)',
        }}
      >
        <p
          className="text-sm italic"
          style={{ color: 'var(--theme-text)' }}
        >
          "Always learning, always creating, always striving to be a better
          version of myself."
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="terminal-section">
        <p
          className="text-xs uppercase tracking-wider mb-4 font-semibold"
          style={{ color: 'var(--theme-primary)' }}
        >
          ┌─ Achievements
        </p>

        <div className="flex flex-wrap gap-3 ml-2">
          {BADGES.map(({ emoji, label }) => (
            <motion.span
              key={label}
              variants={badgeVariants}
              className="achievement-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium cursor-default select-none"
              style={{ color: 'var(--theme-primary)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>{emoji}</span>
              <span>{label}</span>
            </motion.span>
          ))}
        </div>

        <p
          className="text-xs mt-2"
          style={{ color: 'var(--theme-primary)', opacity: 0.5 }}
        >
          └──────────────────────────
        </p>
      </motion.div>
    </motion.div>
  );
}
