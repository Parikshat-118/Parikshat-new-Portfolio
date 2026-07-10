import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Film } from 'lucide-react';

const videos = [
  { file: '/assets/videos/1.mp4', title: 'GTA 5 CAR EDIT' },
  { file: '/assets/videos/2.mp4', title: 'AUTOEXPO25' },
  { file: '/assets/videos/3.mp4', title: 'FORD VS FERRARI EDIT' },
  { file: '/assets/videos/4.mp4', title: 'HOTWHEELS CAR EDIT' },
  { file: '/assets/videos/5.mp4', title: 'EDUMINERVA HEADS EDIT' },
  { file: '/assets/videos/6.mp4', title: 'CAMPUS BLOCKS TEAM' },
  { file: '/assets/videos/8.mp4', title: 'SISTER EDIT' },
  { file: '/assets/videos/9.mp4', title: 'NEXON' },
  { file: '/assets/videos/10.mp4', title: 'REPUBLIC DAY' },
  { file: '/assets/videos/11.mp4', title: 'AUTOEXPO25 v2' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: { duration: 0.2 },
  },
};

import { createPortal } from 'react-dom';

function VideoCard({ video, index, onSelect }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        scale: 1.03,
        boxShadow: '0 0 25px rgba(var(--theme-primary-rgb), 0.3), 0 0 50px rgba(var(--theme-primary-rgb), 0.1)',
      }}
      whileTap={{ scale: 0.98 }}
      className="glass rounded-lg overflow-hidden cursor-pointer group relative"
      onClick={() => onSelect(video)}
    >
      {}
      <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
        <video 
          src={video.file} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
          preload="metadata"
          muted
          playsInline
        />

        {}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 p-4 pointer-events-none">
          <Film
            size={32}
            className="text-[var(--theme-primary)] drop-shadow-md opacity-0 group-hover:opacity-70 transition-opacity duration-300"
          />
        </div>

        {}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 border-[var(--theme-primary)]"
            style={{
              background: 'rgba(var(--theme-primary-rgb), 0.15)',
              boxShadow: '0 0 20px rgba(var(--theme-primary-rgb), 0.3)',
            }}
          >
            <Play size={24} className="text-[var(--theme-primary)] ml-0.5" fill="currentColor" />
          </motion.div>
        </motion.div>
      </div>

      {}
      <div className="px-3 py-2.5 border-t border-[var(--theme-border)]">
        <p className="text-[var(--theme-text)] text-xs font-[var(--font-mono)] font-medium truncate">
          <span className="text-[var(--theme-primary)] mr-1.5">▶</span>
          {video.title}
        </p>
      </div>
    </motion.div>
  );
}

function VideoModal({ video, onClose }) {
  // Use createPortal to attach the modal directly to document.body
  // This ensures it stays perfectly centered and isn't trapped by the terminal's glass backdrop filter!
  return createPortal(
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {}
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        onClick={onClose}
      />

      {}
      <motion.div
        className="relative glass rounded-xl overflow-hidden w-full max-w-5xl border-glow-animated shadow-2xl"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--theme-border)] bg-black/50">
          <div className="flex items-center gap-3">
            <Film size={20} className="text-[var(--theme-primary)]" />
            <h3 className="text-[var(--theme-primary)] text-base font-[var(--font-mono)] font-bold text-glow">
              {video.title}
            </h3>
          </div>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[rgba(var(--theme-primary-rgb),0.15)] transition-colors"
          >
            <X size={20} className="text-white hover:text-[var(--theme-primary)]" />
          </motion.button>
        </div>

        {}
        <div className="relative bg-black w-full flex justify-center items-center" style={{ minHeight: '50vh' }}>
          <video
            className="w-full max-h-[75vh] object-contain outline-none"
            controls
            autoPlay
            playsInline
            src={video.file}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {}
        <div className="px-5 py-3 border-t border-[var(--theme-border)] bg-black/50 flex items-center justify-between">
          <p className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)]">
            <span className="text-[var(--theme-primary)]">src:</span> {video.file}
          </p>
          <p className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)] hidden sm:block">
            Press <span className="text-[var(--theme-primary)] border border-[var(--theme-primary)] px-1 rounded">ESC</span> or click backdrop to close
          </p>
        </div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

    const handleKeyDown = (e) => {
    if (e.key === 'Escape') setSelectedVideo(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pr-1" onKeyDown={handleKeyDown} tabIndex={-1}>
      {}
      <div className="flex items-center gap-2 mb-1">
        <Film size={16} className="text-[var(--theme-primary)]" />
        <h2 className="text-[var(--theme-primary)] text-sm font-[var(--font-mono)] font-bold text-glow">
          ~/videos — Video Edits Gallery
        </h2>
      </div>
      <p className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)] ml-1">
        Click any card to watch • {videos.length} edits available
      </p>

      {}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {videos.map((video, index) => (
          <VideoCard
            key={video.file}
            video={video}
            index={index}
            onSelect={setSelectedVideo}
          />
        ))}
      </motion.div>

      {}
      <AnimatePresence>
        {selectedVideo && (
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
