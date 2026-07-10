import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';

const qaData = [
  { keywords: ['resume', 'cv', 'download'], answer: 'Sure, I will open the resume section for you now!', action: 'resume' },
  { keywords: ['project', 'built', 'made', 'create'], answer: 'Parikshat has built several projects including the CBytes Website, a Birthday Wish Website, and a C++ Tic-Tac-Toe game. I am opening the projects view for you!', action: 'projects' },
  { keywords: ['skill', 'technology', 'tech', 'stack', 'language'], answer: 'Parikshat is skilled in C++, Python, JavaScript, React, Node.js, and more. Opening the skills module...', action: 'skills' },
  { keywords: ['education', 'college', 'study', 'university', 'degree', 'about'], answer: 'Parikshat is a CS student at BVCOE, New Delhi. I will open the About section for more details.', action: 'about' },
  { keywords: ['contact', 'email', 'reach', 'hire', 'connect'], answer: 'You can reach Parikshat via email or LinkedIn. Here is the contact info!', action: 'contact' },
  { keywords: ['video', 'edit', 'editing', 'content', 'creative'], answer: 'Parikshat is a skilled video editor. Opening the video gallery now...', action: 'videos' },
  { keywords: ['experience', 'work', 'intern', 'drdo'], answer: 'Opening the experience module to show you his professional background.', action: 'experience' },
  { keywords: ['cert', 'certificate'], answer: 'Opening the certificates module...', action: 'certs' },
  { keywords: ['stat', 'github'], answer: 'Loading GitHub stats...', action: 'stats' },
  { keywords: ['hello', 'hi', 'hey', 'greet'], answer: 'Hey there! 👋 I\'m Parikshat\'s AI assistant. I can answer questions or navigate the site for you (try asking to see projects or download the resume)!' },
];

const DEFAULT_RESPONSE = "I'm not sure about that. Try asking to see projects, skills, contact info, or download the resume!";

function findAnswer(input) {
  const lower = input.toLowerCase();
  for (const entry of qaData) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return { answer: entry.answer, action: entry.action };
    }
  }
  return { answer: DEFAULT_RESPONSE };
}

const panelVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.85,
    y: 20,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const messageVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export default function AIAssistant({ onAction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      text: "Hey! 👋 I'm Parikshat's AI assistant. I can answer questions or navigate the site for you (try asking to see projects or download the resume)!",
    },
  ]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const idCounter = useRef(0);

    const nextId = () => `msg-${++idCounter.current}`;

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

    useEffect(() => {
    if (isOpen) {
      // Small delay to let the animation start
      const timer = setTimeout(() => inputRef.current?.focus(), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

    const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    // Add user message
    const userMsg = { id: nextId(), role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulate a tiny "thinking" delay then respond
    setTimeout(() => {
      const { answer, action } = findAnswer(trimmed);
      const aiMsg = { id: nextId(), role: 'ai', text: answer };
      setMessages((prev) => [...prev, aiMsg]);
      
      // If there's an action, trigger it after a small delay so the user reads the text
      if (action && onAction) {
        setTimeout(() => {
          onAction(action);
        }, 800);
      }
    }, 400);
  }, [input, onAction]);

    const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 glass rounded-full px-4 py-3 flex items-center gap-2 cursor-pointer select-none"
        style={{
          boxShadow: 'var(--theme-glow)',
          border: '1px solid rgba(var(--theme-primary-rgb), 0.3)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      >
        {}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{
            border: '2px solid var(--theme-primary)',
            animationDuration: '3s',
          }}
        />

        <Bot size={18} className="text-[var(--theme-primary)]" />
        <span className="text-[var(--theme-primary)] text-sm font-[var(--font-mono)] font-bold">
          {isOpen ? 'Close' : 'Ask AI'}
        </span>
      </motion.button>

      {}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="ai-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-20 right-6 z-50 flex flex-col overflow-hidden rounded-xl"
            style={{
              width: '320px',
              height: '420px',
              boxShadow: 'var(--theme-glow-strong)',
            }}
          >
            {}
            <div className="glass-strong flex flex-col h-full rounded-xl overflow-hidden">
              {}
              <div
                className="flex items-center justify-between px-4 py-3 shrink-0"
                style={{
                  borderBottom: '1px solid rgba(var(--theme-primary-rgb), 0.15)',
                  background: 'rgba(var(--theme-primary-rgb), 0.03)',
                }}
              >
                <div className="flex items-center gap-2">
                  <Bot size={18} className="text-[var(--theme-primary)]" />
                  <span className="text-[var(--theme-primary)] font-bold text-sm font-[var(--font-mono)]">
                    AI Assistant
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[var(--theme-text-muted)] hover:text-[var(--theme-primary)] transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg px-3 py-2 text-sm font-[var(--font-mono)] leading-relaxed ${
                          msg.role === 'user'
                            ? 'text-[var(--theme-bg)]'
                            : 'text-[var(--theme-text)]'
                        }`}
                        style={
                          msg.role === 'user'
                            ? {
                                background: 'var(--theme-primary)',
                                borderBottomRightRadius: '4px',
                              }
                            : {
                                background: 'rgba(var(--theme-primary-rgb), 0.08)',
                                border: '1px solid rgba(var(--theme-primary-rgb), 0.12)',
                                borderBottomLeftRadius: '4px',
                              }
                        }
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {}
              <div
                className="shrink-0 px-3 py-3"
                style={{
                  borderTop: '1px solid rgba(var(--theme-primary-rgb), 0.12)',
                }}
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me anything..."
                    className="flex-1 bg-transparent text-[var(--theme-primary)] text-sm font-[var(--font-mono)] outline-none placeholder:text-[var(--theme-text-muted)] placeholder:opacity-80"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="text-[var(--theme-primary)] hover:text-glow transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
