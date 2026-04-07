'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaBook, FaLightbulb, FaRobot, FaHome, FaRocket, FaChevronLeft, FaChevronRight, FaArrowRight, FaClock, FaTag } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { Article } from '@/models/Article';
import ChatInputPreview from '@/components/ChatInputPreview';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';

dayjs.locale('fr');

interface HomePageClientProps {
  articles: Article[];
}

export default function HomePageClient({ articles }: HomePageClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  const totalSlides = articles.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    if (isAutoPlaying && totalSlides > 1) {
      autoPlayRef.current = setInterval(nextSlide, 4500);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentSlide, totalSlides]);

  const pauseAutoPlay = () => setIsAutoPlaying(false);
  const resumeAutoPlay = () => setIsAutoPlaying(true);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  };

  const stagger = {
    animate: { transition: { staggerChildren: 0.12 } }
  };

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

        {/* Animated mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '60px 60px'
            }}
          />
          {/* Glow orbs */}
          <motion.div
            className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          {/* Floating particles */}
          {[...Array(18)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: `${10 + (i * 5.2) % 80}%`,
                top: `${15 + (i * 7.3) % 70}%`,
                opacity: 0.3 + (i % 3) * 0.2
              }}
              animate={{
                y: [0, -20 - (i % 3) * 15, 0],
                opacity: [0.2, 0.7, 0.2],
              }}
              transition={{
                duration: 3 + (i % 4),
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <motion.div
          className="container relative z-10 text-center"
          style={{ y: heroY, opacity: heroOpacity }}
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 backdrop-blur-sm">
              <HiSparkles className="text-blue-400" />
              Assistant domotique intelligent
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 leading-[1.05] tracking-tight"
          >
            Votre maison,{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                intelligente
              </span>
              {/* Underline accent */}
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Tutoriels, guides et conseils pour maîtriser Home Assistant.
            Automatisez votre quotidien et prenez le contrôle de votre habitat.
          </motion.p>

          {/* Chat Preview */}
          <motion.div variants={fadeInUp} className="mb-10 max-w-2xl mx-auto">
            <ChatInputPreview />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tutoriels" className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 no-underline shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 hover:scale-[1.03]">
              <FaRocket className="text-blue-200" />
              Commencer maintenant
              <motion.span
                className="text-blue-200"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <FaArrowRight />
              </motion.span>
            </Link>
            <Link href="/chatbot" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 no-underline hover:scale-[1.03]">
              <FaRobot className="text-emerald-400" />
              Poser une question
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <span className="text-xs uppercase tracking-widest">Découvrir</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-slate-500 to-transparent"
              animate={{ scaleY: [0, 1, 0], originY: 0 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────── */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Pourquoi nous ?</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mt-3">
              Tout ce dont vous avez besoin
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
          >
            {[
              {
                icon: FaBook,
                color: 'blue',
                gradient: 'from-blue-50 to-blue-100/50',
                iconBg: 'bg-blue-600',
                title: 'Tutoriels détaillés',
                desc: 'Guides pas-à-pas pour installer et configurer Home Assistant, même sans expérience préalable.'
              },
              {
                icon: FaLightbulb,
                color: 'amber',
                gradient: 'from-amber-50 to-orange-100/50',
                iconBg: 'bg-amber-500',
                title: 'Automations intelligentes',
                desc: 'Créez des scénarios sur mesure : éclairage, chauffage, sécurité — tout piloté automatiquement.'
              },
              {
                icon: FaRobot,
                color: 'emerald',
                gradient: 'from-emerald-50 to-teal-100/50',
                iconBg: 'bg-emerald-600',
                title: 'Chatbot IA intégré',
                desc: 'Posez vos questions à notre assistant IA spécialisé en domotique, disponible 24h/24.'
              }
            ].map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`relative p-8 rounded-3xl bg-gradient-to-br ${feat.gradient} border border-slate-100 overflow-hidden group cursor-default`}
              >
                {/* Subtle glow on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(59,130,246,0.06), transparent 70%)' }}
                />
                <div className={`w-14 h-14 ${feat.iconBg} rounded-2xl flex items-center justify-center mb-5 shadow-lg`}>
                  <feat.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold text-text-dark mb-3">{feat.title}</h3>
                <p className="text-text-gray leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CAROUSEL ─────────────────────────────────────────── */}
      {articles.length > 0 && (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)' }}
            />
          </div>

          <div className="container">
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div>
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-widest">Articles récents</span>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mt-2">
                  Derniers contenus
                </h2>
              </div>
              <Link
                href="/tutoriels"
                className="shrink-0 inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 no-underline group"
              >
                Voir tout
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <FaArrowRight className="text-sm" />
                </motion.span>
              </Link>
            </motion.div>

            {/* Carousel track */}
            <div
              className="relative"
              onMouseEnter={pauseAutoPlay}
              onMouseLeave={resumeAutoPlay}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  {articles[currentSlide] && (
                    <Link
                      href={`/articles/${articles[currentSlide].slug}`}
                      className="group block no-underline"
                    >
                      <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-soft hover:shadow-large transition-all duration-500 md:flex">
                        {/* Image */}
                        <div className="relative md:w-1/2 h-64 md:h-auto min-h-[320px] overflow-hidden">
                          <Image
                            src={articles[currentSlide].coverImage}
                            alt={articles[currentSlide].title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
                          {/* Category badge */}
                          <span className="absolute top-5 left-5 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-blue-600 text-xs font-bold rounded-full inline-flex items-center gap-1.5 shadow-sm">
                            <FaTag className="text-xs" />
                            {articles[currentSlide].category === 'installation' && 'Installation'}
                            {articles[currentSlide].category === 'integration' && 'Intégration'}
                            {articles[currentSlide].category === 'automation' && 'Automation'}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                          <div className="flex items-center gap-3 text-sm text-text-gray mb-5">
                            <time dateTime={articles[currentSlide].date}>
                              {dayjs(articles[currentSlide].date).format('D MMMM YYYY')}
                            </time>
                            {articles[currentSlide].readingTime && (
                              <>
                                <span className="w-1 h-1 bg-slate-300 rounded-full" />
                                <span className="inline-flex items-center gap-1.5">
                                  <FaClock className="text-xs text-blue-400" />
                                  {articles[currentSlide].readingTime} min
                                </span>
                              </>
                            )}
                          </div>

                          <h3 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                            {articles[currentSlide].title}
                          </h3>

                          <p className="text-text-gray leading-relaxed mb-6 line-clamp-3">
                            {articles[currentSlide].excerpt}
                          </p>

                          {articles[currentSlide].tags && articles[currentSlide].tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {articles[currentSlide].tags.slice(0, 4).map((tag) => (
                                <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <span className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                            Lire l&apos;article
                            <FaArrowRight className="text-xs" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Nav buttons */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={() => { pauseAutoPlay(); prevSlide(); }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-medium flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-large transition-all duration-200 hover:scale-110 border border-slate-100"
                    aria-label="Article précédent"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={() => { pauseAutoPlay(); nextSlide(); }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-medium flex items-center justify-center text-slate-600 hover:text-blue-600 hover:shadow-large transition-all duration-200 hover:scale-110 border border-slate-100"
                    aria-label="Article suivant"
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
            </div>

            {/* Dots + progress */}
            {totalSlides > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                {articles.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { pauseAutoPlay(); setCurrentSlide(i); }}
                    className={`transition-all duration-300 rounded-full ${
                      i === currentSlide
                        ? 'w-8 h-2.5 bg-blue-600'
                        : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Aller à l'article ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── STATS STRIP ──────────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {[
              { value: '100%', label: 'Gratuit', sub: 'Toujours' },
              { value: 'HA', label: 'Home Assistant', sub: 'Spécialisé' },
              { value: 'IA', label: 'Chatbot intégré', sub: 'Disponible 24h/24' },
              { value: '∞', label: 'Automations', sub: 'Possibilités' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="group">
                <div className="text-4xl md:text-5xl font-heading font-bold text-blue-600 mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {stat.value}
                </div>
                <div className="font-semibold text-text-dark">{stat.label}</div>
                <div className="text-sm text-text-gray">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── CTA FINAL ────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="container relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-600/20 border border-blue-500/30 mb-8"
              animate={{ rotate: [0, 8, -8, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 4 }}
            >
              <FaHome className="text-4xl text-blue-400" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Prêt à transformer
              <span className="block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                votre habitat ?
              </span>
            </h2>

            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              Rejoignez des passionnés de domotique et commencez dès maintenant
              à automatiser votre maison intelligemment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tutoriels"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 no-underline shadow-xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-[1.04] text-lg"
              >
                <FaRocket />
                Commencer maintenant
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                >
                  <FaArrowRight className="text-blue-200" />
                </motion.span>
              </Link>
              <Link
                href="/chatbot"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 no-underline hover:scale-[1.04] text-lg"
              >
                <FaRobot className="text-emerald-400" />
                Essayer le chatbot
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
