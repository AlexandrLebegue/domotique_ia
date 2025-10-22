'use client';

import { motion } from 'framer-motion';
import { FaServer, FaBolt, FaLightbulb, FaRobot } from 'react-icons/fa';
import Link from 'next/link';
import { Article } from '@/models/Article';
import ArticleList from '@/components/ArticleList';

interface TutorielsPageClientProps {
  installationArticles: Article[];
  integrationArticles: Article[];
  automationArticles: Article[];
}

export default function TutorielsPageClient({
  installationArticles,
  integrationArticles,
  automationArticles
}: TutorielsPageClientProps) {
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

  const categories = [
    {
      id: 'installation',
      title: 'Installation',
      description: `${installationArticles.length} article${installationArticles.length > 1 ? 's' : ''}`,
      icon: FaServer,
      color: 'bg-green-500'
    },
    {
      id: 'integration',
      title: 'Intégrations',
      description: `${integrationArticles.length} article${integrationArticles.length > 1 ? 's' : ''}`,
      icon: FaBolt,
      color: 'bg-purple-500'
    },
    {
      id: 'automation',
      title: 'Automations',
      description: `${automationArticles.length} article${automationArticles.length > 1 ? 's' : ''}`,
      icon: FaLightbulb,
      color: 'bg-yellow-500'
    }
  ];

  return (
    <div className="min-h-screen bg-light-gray py-12">
      <div className="container">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4"
          >
            Tutoriels Home Assistant
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-text-gray"
          >
            Découvrez nos guides complets pour installer, configurer et automatiser votre maison connectée avec Home Assistant.
          </motion.p>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.a
                key={category.id}
                href={`#${category.id}`}
                className="card hover:-translate-y-1 no-underline group"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className={`w-12 h-12 ${category.color} bg-opacity-10 rounded-full flex items-center justify-center flex-shrink-0`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className={`w-6 h-6 ${category.color.replace('bg-', 'text-')}`} />
                  </motion.div>
                  <div>
                    <h3 className="font-heading font-semibold text-text-dark group-hover:text-accent mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-text-gray">
                      {category.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Installation Section */}
        {installationArticles.length > 0 && (
          <motion.section 
            id="installation" 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 bg-green-500 bg-opacity-10 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaServer className="w-5 h-5 text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-heading font-bold text-text-dark">
                Installation Home Assistant
              </h2>
            </div>
            <p className="text-text-gray mb-8">
              Guides pour installer Home Assistant sur différentes plateformes et configurations.
            </p>
            <ArticleList articles={installationArticles} />
          </motion.section>
        )}

        {/* Integration Section */}
        {integrationArticles.length > 0 && (
          <motion.section 
            id="integration" 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 bg-purple-500 bg-opacity-10 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaBolt className="w-5 h-5 text-purple-500" />
              </motion.div>
              <h2 className="text-3xl font-heading font-bold text-text-dark">
                Intégrations
              </h2>
            </div>
            <p className="text-text-gray mb-8">
              Connectez vos appareils et services à Home Assistant : Zigbee, Z-Wave, Wi-Fi et plus encore.
            </p>
            <ArticleList articles={integrationArticles} />
          </motion.section>
        )}

        {/* Automation Section */}
        {automationArticles.length > 0 && (
          <motion.section 
            id="automation" 
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="w-10 h-10 bg-yellow-500 bg-opacity-10 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <FaLightbulb className="w-5 h-5 text-yellow-500" />
              </motion.div>
              <h2 className="text-3xl font-heading font-bold text-text-dark">
                Scénarios & Automations
              </h2>
            </div>
            <p className="text-text-gray mb-8">
              Créez des automations intelligentes pour rendre votre maison réactive et autonome.
            </p>
            <ArticleList articles={automationArticles} />
          </motion.section>
        )}

        {/* CTA Section */}
        <motion.div 
          className="bg-white rounded-lg shadow-soft p-8 text-center mt-12"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FaRobot className="text-5xl text-accent" />
          </motion.div>
          <h3 className="text-2xl font-heading font-bold text-text-dark mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h3>
          <p className="text-text-gray mb-6">
            Posez votre question à notre chatbot IA pour obtenir des recommandations personnalisées
          </p>
          <Link href="/chatbot" className="btn btn-primary no-underline">
            <FaRobot className="inline mr-2" />
            Poser une question
          </Link>
        </motion.div>
      </div>
    </div>
  );
}