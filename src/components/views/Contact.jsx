import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub as Github, FaLinkedin as Linkedin, FaInstagram as Instagram } from 'react-icons/fa';

const FORMSPREE_URL = 'https://formspree.io/f/mrbanknk';

const SOCIAL_LINKS = [
  {
    icon: Mail,
    label: '📧 parikshatsingh18@gmail.com',
    href: 'mailto:parikshatsingh18@gmail.com',
    prefix: 'email',
  },
  {
    icon: Github,
    label: 'github.com/Parikshat-118',
    href: 'https://github.com/Parikshat-118',
    prefix: 'github',
  },
  {
    icon: Linkedin,
    label: 'linkedin.com/in/parikshat-singh',
    href: 'https://www.linkedin.com/in/parikshat-singh-5126b7325',
    prefix: 'linkedin',
  },
  {
    icon: Github, // Using Github icon as placeholder since Lucide/Fa might not have Leetcode
    label: 'leetcode.com/u/Parikshat_118/',
    href: 'https://leetcode.com/u/Parikshat_118/',
    prefix: 'leetcode',
  },
  {
    icon: Instagram,
    label: '@parikshat_singh18',
    href: 'https://www.instagram.com/parikshat_singh18/',
    prefix: 'instagram',
  },
  {
    icon: Instagram,
    label: '@shuttersavvy18 (Edits)',
    href: 'https://www.instagram.com/shuttersavvy18/',
    prefix: 'edits',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <motion.div
      className="space-y-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {}
      <motion.div className="flex items-center gap-2" variants={itemVariants}>
        <Send size={16} className="text-[var(--theme-primary)]" />
        <h2 className="text-[var(--theme-primary)] text-sm font-[var(--font-mono)] font-bold text-glow">
          ~/contact.sh — Establish Connection
        </h2>
      </motion.div>

      {}
      <motion.form
        onSubmit={handleSubmit}
        className="glass rounded-xl p-5 space-y-4 border-glow-animated"
        variants={itemVariants}
      >
        {}
        <div className="space-y-1.5">
          <label className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)] flex items-center gap-1.5">
            <Mail size={12} className="text-[var(--theme-primary)]" />
            email:
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-4 py-2.5 rounded-lg text-sm font-[var(--font-mono)]
              bg-[rgba(var(--theme-primary-rgb),0.04)] text-[var(--theme-text)]
              border border-[var(--theme-border)]
              placeholder:text-[var(--theme-text-muted)] placeholder:opacity-50
              outline-none transition-all duration-300
              focus:border-[var(--theme-primary)]
              focus:shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.2)]
              focus:bg-[rgba(var(--theme-primary-rgb),0.06)]"
          />
        </div>

        {}
        <div className="space-y-1.5">
          <label className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)] flex items-center gap-1.5">
            <Send size={12} className="text-[var(--theme-primary)]" />
            message:
          </label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
            rows={5}
            className="w-full px-4 py-2.5 rounded-lg text-sm font-[var(--font-mono)] resize-y min-h-[100px]
              bg-[rgba(var(--theme-primary-rgb),0.04)] text-[var(--theme-text)]
              border border-[var(--theme-border)]
              placeholder:text-[var(--theme-text-muted)] placeholder:opacity-50
              outline-none transition-all duration-300
              focus:border-[var(--theme-primary)]
              focus:shadow-[0_0_15px_rgba(var(--theme-primary-rgb),0.2)]
              focus:bg-[rgba(var(--theme-primary-rgb),0.06)]"
          />
        </div>

        {}
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          whileHover={{
            scale: 1.02,
            boxShadow: '0 0 25px rgba(var(--theme-primary-rgb), 0.35)',
          }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3 rounded-lg text-sm font-[var(--font-mono)] font-bold
            bg-[rgba(var(--theme-primary-rgb),0.12)] text-[var(--theme-primary)]
            border border-[var(--theme-primary)]
            transition-colors duration-300
            hover:bg-[rgba(var(--theme-primary-rgb),0.2)]
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center justify-center gap-2"
        >
          <Send size={14} />
          {status === 'sending' ? '$ sending...' : '$ transmit message'}
        </motion.button>

        {}
        {status === 'success' && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-green-400 text-xs font-[var(--font-mono)] text-center py-2"
          >
            Message transmitted successfully! ✓
          </motion.p>
        )}
        {status === 'error' && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 text-xs font-[var(--font-mono)] text-center py-2"
          >
            Transmission failed. Try alternative channels below.
          </motion.p>
        )}
      </motion.form>

      {}
      <motion.div className="space-y-2" variants={itemVariants}>
        <p className="text-[var(--theme-text-muted)] text-xs font-[var(--font-mono)] ml-1">
          Alternative channels:
        </p>

        <div className="space-y-1.5">
          {SOCIAL_LINKS.map(({ icon: Icon, label, href, prefix }) => (
            <motion.a
              key={prefix}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="command-link flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-[var(--font-mono)] group"
            >
              <Icon
                size={14}
                className="text-[var(--theme-primary)] shrink-0 group-hover:drop-shadow-[0_0_6px_rgba(var(--theme-primary-rgb),0.5)]"
              />
              <span className="text-[var(--theme-text-muted)] text-xs shrink-0">
                {prefix}:
              </span>
              <span className="text-[var(--theme-text)] text-xs truncate">
                {label}
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
