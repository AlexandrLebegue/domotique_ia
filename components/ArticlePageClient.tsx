'use client';

import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaUser, FaArrowLeft, FaRobot, FaTag, FaBook } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Article } from '@/models/Article';
import { Heading } from '@/lib/markdown';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';

dayjs.locale('fr');

interface ArticlePageClientProps {
  article: Article;
  headings: Heading[];
}

export default function ArticlePageClient({ article, headings }: ArticlePageClientProps) {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const getCategoryConfig = () => {
    switch (article.category) {
      case 'installation':
        return { emoji: '🏗️', label: 'Installation', color: 'from-green-500 to-green-600' };
      case 'integration':
        return { emoji: '⚡', label: 'Intégration', color: 'from-purple-500 to-purple-600' };
      case 'automation':
        return { emoji: '🤖', label: 'Automation', color: 'from-yellow-500 to-yellow-600' };
      default:
        return { emoji: '📝', label: 'Article', color: 'from-blue-500 to-blue-600' };
    }
  };

  const category = getCategoryConfig();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Cover Image */}
      <div className="relative w-full h-[400px] bg-gradient-soft overflow-hidden">
        {/* Animated Background */}
        <motion.div
          className="absolute top-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-80 h-80 bg-success/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />

        <div className="absolute inset-0 flex items-center justify-center relative z-10">
          <div className="container text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className={`inline-block px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-full mb-4 shadow-lg`}
            >
              <span className="text-sm font-semibold flex items-center gap-2">
                <span>{category.emoji}</span>
                <span>{category.label}</span>
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-heading font-bold text-text-dark max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {article.title}
            </motion.h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Information */}
          <motion.div 
            className="flex flex-wrap items-center gap-4 text-text-gray mb-8 pb-8 border-b border-border"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
          >
            <motion.div 
              variants={fadeInUp}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <FaCalendar className="w-5 h-5 text-accent" />
              <time dateTime={article.date}>
                {dayjs(article.date).format('D MMMM YYYY')}
              </time>
            </motion.div>
            
            {article.readingTime && (
              <>
                <span>•</span>
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaClock className="w-5 h-5 text-accent" />
                  <span>{article.readingTime} min de lecture</span>
                </motion.div>
              </>
            )}

            {article.author && (
              <>
                <span>•</span>
                <motion.div 
                  variants={fadeInUp}
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <FaUser className="w-5 h-5 text-accent" />
                  <span>{article.author}</span>
                </motion.div>
              </>
            )}
          </motion.div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <TableOfContents headings={headings} />
            </motion.div>
          )}

          {/* Article Content */}
          <motion.article 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <MarkdownRenderer content={article.content} />
          </motion.article>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <motion.div 
              className="mt-12 pt-8 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-text-gray mb-4 flex items-center gap-2">
                <FaTag className="text-accent" />
                Tags :
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1 bg-light-gray text-text-dark text-sm rounded-full hover:bg-accent hover:text-white transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div 
            className="mt-12 pt-8 border-t border-border"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <motion.div
                whileHover={{ x: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/tutoriels"
                  className="inline-flex items-center gap-2 text-accent hover:underline no-underline"
                >
                  <FaArrowLeft className="w-4 h-4" />
                  <FaBook className="w-4 h-4" />
                  Retour aux tutoriels
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/chatbot"
                  className="btn btn-primary no-underline inline-flex items-center gap-2"
                >
                  <FaRobot />
                  <span>Poser une question</span>
                  <HiSparkles />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}