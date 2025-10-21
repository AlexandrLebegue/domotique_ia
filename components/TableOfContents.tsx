'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaChevronDown } from 'react-icons/fa';
import { Heading } from '@/lib/markdown';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (headings.length === 0) return null;

  return (
    <motion.div 
      className="mb-8 bg-gradient-to-br from-light-gray to-white rounded-lg p-6 border border-border shadow-soft"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left mb-4 group"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <h2 className="text-xl font-heading font-semibold text-text-dark flex items-center gap-2">
          <motion.div
            animate={{ rotate: isExpanded ? 0 : -10 }}
            transition={{ duration: 0.3 }}
          >
            <FaBook className="text-accent" />
          </motion.div>
          <span>Table des matières</span>
        </h2>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaChevronDown className="w-5 h-5 text-text-gray group-hover:text-accent transition-colors" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.nav
            className="space-y-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {headings.map((heading, index) => (
              <motion.a
                key={index}
                href={`#${heading.id}`}
                className={`block hover:text-accent transition-all no-underline group relative ${
                  heading.level === 2 
                    ? 'text-text-dark font-medium py-2' 
                    : 'text-text-gray text-sm pl-6 py-1'
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 5 }}
              >
                {heading.level === 2 && (
                  <motion.span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                )}
                {heading.level === 3 && (
                  <motion.span
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-text-gray rounded-full opacity-0 group-hover:opacity-100 group-hover:bg-accent"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                )}
                <span className="group-hover:translate-x-1 inline-block transition-transform">
                  {heading.text}
                </span>
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.div>
  );
}