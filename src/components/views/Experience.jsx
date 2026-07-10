import { motion } from 'framer-motion';

const TIMELINE = [
  {
    year: '2024',
    title: 'Started B.Tech CS',
    description:
      'Began B.Tech Computer Science at Bharati Vidyapeeth\'s College of Engineering, New Delhi.',
    icon: '🎓',
  },
  {
    year: '2024',
    title: 'Built Key Web Projects',
    description:
      'Developed CBytes Website and Birthday Wish Website using HTML, Tailwind CSS, and JavaScript.',
    icon: '🚀',
  },
  {
    year: '2025',
    title: 'Competitive Programming & DSA',
    description:
      'Started competitive programming journey — solved 200+ LeetCode problems, consistent DSA practice.',
    icon: '⚡',
  },
  {
    year: '2025',
    title: 'Video Editing & Content Creation',
    description:
      'Expanded into professional video editing and content creation with Premiere Pro, After Effects, and DaVinci Resolve.',
    icon: '🎬',
  },
  {
    year: '2025',
    title: 'AI Platform Collaboration (ElectroMentor)',
    description:
      'An AI-powered learning platform developed in collaboration with Republic Polytechnic, Singapore, to make electronics education more interactive and accessible. Integrates intelligent assistance and personalized learning experiences to simplify complex engineering concepts.',
    icon: '🌐',
  },
  {
    year: '2026',
    title: 'International ML Research',
    description:
      'Contributing to an AI & Deep Learning research project with Kennesaw University, USA. Co-authoring research paper on ElectroMentor (Multi-Agent Corrective RAG system).',
    icon: '🌐',
  },
  {
    year: 'June 2026 - Aug 2026',
    title: 'Research Intern - AI/ML | DRDO',
    description:
      'Developed an AI-powered news intelligence platform with real-time news aggregation, AI-generated summaries, and Telegram alerts at SSPL Lab, New Delhi.',
    icon: '🛡️',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

function TimelineItem({ item, index, total }) {
  // Alternate direction: even → left, odd → right (on desktop)
  const isLeft = index % 2 === 0;
  const isLast = index === total - 1;
  const isFuture = item.year === 'Future';

  // Slide-in direction variant (on mobile, always from left via responsive override)
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -40 : 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  // Mobile always slides from left
  const mobileItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="relative flex items-start">
      {}
      <div className="flex flex-col items-center shrink-0" style={{ width: '40px' }}>
        {}
        <motion.div
          className="relative z-10"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.18 + 0.3, type: 'spring', stiffness: 300 }}
        >
          <div
            className="w-3.5 h-3.5 rounded-full"
            style={{
              background: isFuture
                ? 'var(--theme-secondary)'
                : 'var(--theme-primary)',
              boxShadow: isFuture
                ? '0 0 10px rgba(var(--theme-primary-rgb), 0.3), 0 0 20px rgba(var(--theme-primary-rgb), 0.15)'
                : '0 0 10px rgba(var(--theme-primary-rgb), 0.5), 0 0 20px rgba(var(--theme-primary-rgb), 0.25)',
            }}
          />
          {}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid var(--theme-primary)',
            }}
            animate={{
              scale: [1, 2],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.3,
            }}
          />
        </motion.div>

        {}
        {!isLast && (
          <div
            className="w-px flex-1 min-h-[40px]"
            style={{
              background: `linear-gradient(
                to bottom,
                rgba(var(--theme-primary-rgb), 0.5),
                rgba(var(--theme-primary-rgb), 0.15)
              )`,
            }}
          />
        )}
      </div>

      {}
      <motion.div
        variants={itemVariants}
        className="flex-1 pb-10 ml-3"
      >
        <div
          className="p-3 rounded-lg transition-all duration-300 group"
          style={{
            background: 'rgba(var(--theme-primary-rgb), 0.03)',
            border: '1px solid rgba(var(--theme-primary-rgb), 0.1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              'rgba(var(--theme-primary-rgb), 0.07)';
            e.currentTarget.style.borderColor =
              'rgba(var(--theme-primary-rgb), 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              'rgba(var(--theme-primary-rgb), 0.03)';
            e.currentTarget.style.borderColor =
              'rgba(var(--theme-primary-rgb), 0.1)';
          }}
        >
          {}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="select-none text-base">{item.icon}</span>
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{
                color: isFuture ? 'var(--theme-bg)' : 'var(--theme-bg)',
                background: isFuture
                  ? 'var(--theme-secondary)'
                  : 'var(--theme-primary)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {item.year}
            </span>
          </div>

          {}
          <h3
            className="text-sm font-bold mb-1"
            style={{ color: 'var(--theme-primary)' }}
          >
            {item.title}
          </h3>

          {}
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'var(--theme-text-muted)' }}
          >
            {item.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <motion.div
      className="ml-1 py-2 max-w-2xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {}
      <motion.div variants={headerVariants} className="mb-4">
        <h2
          className="text-xl font-bold text-glow mb-1"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {'>'} Experience Timeline
        </h2>
        <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
          git log --oneline --graph --all
        </p>
      </motion.div>

      {}
      <div className="relative">
        {TIMELINE.map((item, index) => (
          <TimelineItem
            key={`${item.year}-${item.title}`}
            item={item}
            index={index}
            total={TIMELINE.length}
          />
        ))}
      </div>

      {}
      <motion.p
        variants={headerVariants}
        className="text-xs mt-2"
        style={{ color: 'var(--theme-text-muted)' }}
      >
        Timeline auto-updates · {TIMELINE.length} milestones tracked
      </motion.p>
    </motion.div>
  );
}
