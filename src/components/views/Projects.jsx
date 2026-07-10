import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FolderOpen, FileText, ExternalLink, Star, Wrench } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";

const PROJECTS = [
  {
    id: 'electromentor',
    name: 'ElectroMentor',
    description:
      'Multi-Agent Corrective RAG AI Tutoring System. Designed a pipeline using NLP, vector embeddings, and document-grounded retrieval to answer domain queries from academic PDFs. Implemented supervised evaluation loops, automatic MCQ generation, and adaptive tutoring. Research paper submitted (co-author). (Collab: Republic Polytechnic, Singapore)',
    tech: ['Python', 'FastAPI', 'Next.js', 'ChromaDB', 'Google Gemini API'],
    liveUrl: 'https://electromentor.vercel.app/',
    sourceUrl: 'https://github.com/Parikshat-118/AGENTIC-AI-CHATBOT-FOR-DLCD',
    featured: true,
  },
  {
    id: 'newseaglelive',
    name: 'Newseaglelive',
    description:
      'AI-powered news intelligence platform with real-time news aggregation, AI-generated summaries, article explanations, and personalized Telegram alerts. Engineered scalable backend services using Python, MySQL, Redis, asynchronous programming, and LLM APIs.',
    tech: ['Python', 'MySQL', 'Redis', 'LLM APIs', 'Async Programming'],
    liveUrl: 'https://newseaglelive.in/',
    sourceUrl: 'https://github.com/Parikshat-118/newseaglelive',
    featured: true,
  },
  {
    id: 'rgb_editor',
    name: 'RGB Image Processing / Photo Editor',
    description:
      'Full-stack image editor featuring a React frontend (Framer Motion UI, Three.js particle background) with a Flask REST backend. Implemented NumPy pixel-level algorithms for brightness/contrast, per-channel RGB modification, and inversion.',
    tech: ['Python', 'Flask', 'React.js', 'NumPy', 'Pillow', 'Three.js'],
    liveUrl: 'https://rgb-image-processing.vercel.app/',
    sourceUrl: 'https://github.com/Parikshat-118/RGB-Image-Processing',
    featured: true,
  },
  {
    id: 'weather_intel',
    name: 'Weather Intel',
    description:
      'ML-Based Weather Analysis & Risk Prediction. Applied IQR and Z-score anomaly detection on weather datasets; engineered multi-variable risk prediction model using temperature, humidity, rainfall, and wind features with interactive dashboards.',
    tech: ['Python', 'Flask', 'Pandas', 'NumPy', 'Matplotlib'],
    liveUrl: 'https://weather-intel-analyst.vercel.app/',
    sourceUrl: 'https://github.com/Parikshat-118/WEATHER-INTEL',
    featured: true,
  },
  {
    id: 'cbytes',
    name: 'CBytes Website',
    description:
      'CBytes Tech Solutions offers immersive AI & coding programs. The website utilizes Tailwind CSS, Font Awesome, and GSAP.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'GSAP', 'Font Awesome'],
    liveUrl: 'https://www.cbytes.in/',
    sourceUrl: 'https://github.com/Parikshat-118/CBYTES-FRONTEND',
    featured: false,
  },
  {
    id: 'birthday',
    name: 'Birthday Wish Website',
    description:
      'Interactive birthday greeting with confetti, floating balloons, memory gallery with photos and videos.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'Font Awesome', 'Google Fonts'],
    liveUrl: 'https://parikshat-118.github.io/birthday-to-sister/',
    sourceUrl: 'https://github.com/Parikshat-118/birthday-to-sister',
    featured: false,
  },
  {
    id: 'tictactoe',
    name: 'TICTACTOE-GAME',
    description:
      'C++ OOP console-based Tic-Tac-Toe game with multiple rounds. Uses three classes: player, board, tictactoegame.',
    tech: ['C++', 'OOP', 'iostream'],
    liveUrl: 'https://6bl6fy.jdoodle.io/',
    sourceUrl: 'https://github.com/Parikshat-118/TICTACTOE-GAME',
    featured: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const folderVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: 'easeOut' },
  },
};

const contentVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const TreeRow = ({ isLast, children }) => (
  <div className="flex items-start gap-2 ml-4 text-sm">
    <span
      className="select-none shrink-0"
      style={{ color: 'var(--theme-text-muted)' }}
    >
      {isLast ? '└──' : '├──'}
    </span>
    <span className="flex items-center gap-1.5 min-w-0">{children}</span>
  </div>
);

function ProjectFolder({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  const FolderIcon = isOpen ? FolderOpen : Folder;

  return (
    <motion.div variants={folderVariants} className="mb-3">
      {}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 w-full text-left text-sm py-1 px-2 rounded-md transition-colors duration-200 cursor-pointer group"
        style={{ color: 'var(--theme-primary)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background =
            'rgba(var(--theme-primary-rgb), 0.06)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <FolderIcon
          size={16}
          className="shrink-0 transition-transform duration-200"
          style={{ color: 'var(--theme-primary)' }}
        />
        <span className="font-semibold">📂 {project.name}</span>
        <span
          className="text-xs ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          {isOpen ? '[collapse]' : '[expand]'}
        </span>
      </button>

      {}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            {}
            <TreeRow isLast={false}>
              <FileText
                size={14}
                style={{ color: 'var(--theme-text-muted)' }}
                className="shrink-0"
              />
              <span style={{ color: 'var(--theme-text)' }}>
                <span style={{ color: 'var(--theme-text-muted)' }}>
                  Description:{' '}
                </span>
                {project.description}
              </span>
            </TreeRow>

            {}
            <TreeRow isLast={false}>
              <Wrench
                size={14}
                style={{ color: 'var(--theme-text-muted)' }}
                className="shrink-0"
              />
              <span>
                <span style={{ color: 'var(--theme-text-muted)' }}>Tech: </span>
                <span style={{ color: 'var(--theme-secondary)' }}>
                  {project.tech.join(', ')}
                </span>
              </span>
            </TreeRow>

            {}
            <TreeRow isLast={false}>
              <ExternalLink
                size={14}
                style={{ color: 'var(--theme-primary)' }}
                className="shrink-0"
              />
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="command-link text-sm px-1 rounded"
              >
                🔗 Live Demo
              </a>
            </TreeRow>

            {}
            <TreeRow isLast={!project.featured}>
              <Github
                size={14}
                style={{ color: 'var(--theme-primary)' }}
                className="shrink-0"
              />
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="command-link text-sm px-1 rounded"
              >
                📦 Source Code
              </a>
            </TreeRow>

            {}
            {project.featured && (
              <TreeRow isLast={true}>
                <Star
                  size={14}
                  style={{ color: '#fbbf24' }}
                  className="shrink-0"
                />
                <span className="text-yellow-400 text-xs font-medium">
                  ⭐ Featured Project
                </span>
              </TreeRow>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <motion.div
      className="py-2 pr-1 sm:ml-1 max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {}
      <motion.div variants={folderVariants} className="mb-8">
        <h2
          className="text-xl font-bold text-glow mb-1"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {'>'} Projects
        </h2>
        <p
          className="text-xs"
          style={{ color: 'var(--theme-text-muted)' }}
        >
          Click a folder to expand · Links open in new tabs
        </p>
      </motion.div>

      {}
      <motion.div
        variants={folderVariants}
        className="text-xs mb-4"
        style={{ color: 'var(--theme-primary)', opacity: 0.6 }}
      >
        ~/projects/
      </motion.div>

      {}
      {PROJECTS.map((project) => (
        <ProjectFolder key={project.id} project={project} />
      ))}

      {}
      <motion.p
        variants={folderVariants}
        className="text-xs mt-3"
        style={{ color: 'var(--theme-text-muted)' }}
      >
        {PROJECTS.length} projects listed · more coming soon...
      </motion.p>
    </motion.div>
  );
}
