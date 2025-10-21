import Link from 'next/link';
import { getAllArticles } from '@/lib/markdown';
import ArticleList from '@/components/ArticleList';
import ChatInputPreview from '@/components/ChatInputPreview';

export default function HomePage() {
  const articles = getAllArticles().slice(0, 6); // Get latest 6 articles

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-soft py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-text-dark mb-6">
              Votre guide domotique
              <span className="block text-accent mt-2">Home Assistant</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-gray mb-8 leading-relaxed">
              Tutoriels, guides et conseils pour rendre votre maison intelligente.
              Découvrez comment automatiser votre quotidien avec Home Assistant.
            </p>
            
            {/* Chat Preview */}
            <ChatInputPreview />

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoriels" className="btn btn-primary text-lg no-underline">
                Voir les tutoriels
              </Link>
              <Link href="/chatbot" className="btn btn-secondary text-lg no-underline">
                Poser une question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 animate-fade-in">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Tutoriels détaillés</h3>
              <p className="text-text-gray">
                Guides pas-à-pas pour installer et configurer Home Assistant
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Automations</h3>
              <p className="text-text-gray">
                Créez des scénarios intelligents pour votre maison connectée
              </p>
            </div>

            <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-heading font-semibold mb-2">Chatbot IA</h3>
              <p className="text-text-gray">
                Obtenez des réponses instantanées à vos questions domotique
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-light-gray">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark">
              Derniers articles
            </h2>
            <Link 
              href="/tutoriels" 
              className="text-accent hover:underline font-medium hidden sm:inline-flex items-center gap-2"
            >
              Voir tous les articles
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <ArticleList articles={articles} showFeatured={false} />

          <div className="text-center mt-12 sm:hidden">
            <Link href="/tutoriels" className="btn btn-primary no-underline">
              Voir tous les articles
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-dark mb-6">
              Prêt à rendre votre maison intelligente ?
            </h2>
            <p className="text-xl text-text-gray mb-8">
              Explorez nos tutoriels ou posez vos questions à notre chatbot IA
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tutoriels" className="btn btn-primary text-lg no-underline">
                Commencer les tutoriels
              </Link>
              <Link href="/a-propos" className="btn btn-secondary text-lg no-underline">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}