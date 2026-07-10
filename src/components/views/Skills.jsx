import { motion } from 'framer-motion';

const SKILL_CATEGORIES = [
  {
    category: 'Languages',
    icon: '📝',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'C++', level: 100 },
      { name: 'C', level: 90 },
      { name: 'Java', level: 70 },
    ],
  },
  {
    category: 'ML & AI',
    icon: '🤖',
    skills: [
      { name: 'Machine Learning', level: 90 },
      { name: 'Deep Learning', level: 30 },
      { name: 'RAG Systems', level: 40 },
      { name: 'scikit-learn', level: 70 },
      { name: 'TensorFlow', level: 20 },
    ],
  },
  {
    category: 'Data & Math',
    icon: '📊',
    skills: [
      { name: 'NumPy & Pandas', level: 95 },
      { name: 'Statistics & Prob', level: 85 },
      { name: 'Linear Algebra', level: 85 },
      { name: 'Matplotlib', level: 90 },
    ],
  },
  {
    category: 'Web & Tools',
    icon: '🌐',
    skills: [
      { name: 'Flask & FastAPI', level: 85 },
      { name: 'Next.js & React', level: 80 },
      { name: 'ChromaDB', level: 85 },
      { name: 'Git & GitHub', level: 90 },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    skills: [
      { name: 'AWS EC2', level: 85 },
      { name: 'Docker', level: 80 },
      { name: 'Linux / Ubuntu', level: 90 },
      { name: 'SSH & PuTTY', level: 85 },
    ],
  },
  {
    category: 'Core CS',
    icon: '⚙️',
    skills: [
      { name: 'Data Structures & Algo', level: 90 },
      { name: 'Object Oriented Prog', level: 90 },
      { name: 'Problem Solving', level: 95 },
    ],
  },
];

const BAR_TOTAL_CHARS = 25; // total block characters in the bar

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
      staggerChildren: 0.06,
      delayChildren: 0.05,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

function SkillBar({ name, level }) {
  // Pad name to fixed width for alignment
  const paddedName = name.padEnd(16, ' ');
  const filledChars = Math.round((level / 100) * BAR_TOTAL_CHARS);
  const emptyChars = BAR_TOTAL_CHARS - filledChars;

  return (
    <motion.div
      variants={skillVariants}
      className="flex items-center gap-2 text-sm font-mono group"
    >
      {}
      <span
        className="shrink-0 whitespace-pre text-xs sm:text-sm"
        style={{ color: 'var(--theme-text)', width: '100px', maxWidth: '30vw' }}
      >
        {paddedName}
      </span>

      {}
      <div className="flex-1 flex items-center gap-2 min-w-0">
        <div
          className="relative h-4 rounded-sm overflow-hidden flex-1"
          style={{
            background: 'rgba(var(--theme-primary-rgb), 0.08)',
            border: '1px solid rgba(var(--theme-primary-rgb), 0.15)',
          }}
        >
          <motion.div
            className="h-full rounded-sm"
            style={{
              background: `linear-gradient(90deg, 
                var(--theme-primary), 
                rgba(var(--theme-primary-rgb), 0.7))`,
              boxShadow: '0 0 8px rgba(var(--theme-primary-rgb), 0.3)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${level}%` }}
            transition={{
              duration: 1.2,
              ease: 'easeOut',
              delay: 0.2,
            }}
          />
        </div>

        {}
        <motion.span
          className="text-xs font-bold shrink-0 w-[36px] text-right"
          style={{ color: 'var(--theme-primary)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {level}%
        </motion.span>
      </div>

      {}
      <span
        className="hidden lg:inline text-xs whitespace-pre select-none"
        style={{ color: 'var(--theme-text-muted)' }}
      >
        {'█'.repeat(filledChars)}{'░'.repeat(emptyChars)}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <motion.div
      className="py-2 pr-1 sm:ml-1 max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {}
      <motion.div variants={categoryVariants} className="mb-10 sm:mb-8">
        <h2
          className="text-xl font-bold text-glow mb-1"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {'>'} Skills
        </h2>
        <p className="text-xs" style={{ color: 'var(--theme-text-muted)' }}>
          cat skills.json | pretty-print
        </p>
      </motion.div>

      {}
      {SKILL_CATEGORIES.map(({ category, icon, skills }) => (
        <motion.div key={category} variants={categoryVariants} className="mb-10 sm:mb-8">
          {}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm select-none">{icon}</span>
            <span
              className="text-xs uppercase tracking-wider font-semibold"
              style={{ color: 'var(--theme-primary)' }}
            >
              ┌─ {category}
            </span>
            <span
              className="flex-1 h-px"
              style={{
                background:
                  'linear-gradient(90deg, rgba(var(--theme-primary-rgb), 0.3), transparent)',
              }}
            />
          </div>

          {}
          <div className="space-y-1.5 ml-2">
            {skills.map((skill) => (
              <SkillBar key={skill.name} {...skill} />
            ))}
          </div>

          <p
            className="text-xs mt-1.5"
            style={{ color: 'var(--theme-primary)', opacity: 0.4 }}
          >
            └{'─'.repeat(20)}
          </p>
        </motion.div>
      ))}

      {}
      <motion.p
        variants={skillVariants}
        className="text-xs mt-2"
        style={{ color: 'var(--theme-text-muted)' }}
      >
        {SKILL_CATEGORIES.reduce((sum, cat) => sum + cat.skills.length, 0)}{' '}
        skills loaded · proficiency based on project experience
      </motion.p>
    </motion.div>
  );
}
