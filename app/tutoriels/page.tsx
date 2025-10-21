import { getAllArticles, getArticlesByCategory } from '@/lib/markdown';
import ArticleList from '@/components/ArticleList';
import Link from 'next/link';

export default function TutorielsPage() {
  const installationArticles = getArticlesByCategory('installation');
  const integrationArticles = getArticlesByCategory('integration');
  const automationArticles = getArticlesByCategory('automation');
  const allArticles = getAllArticles();

  return (
    <div className="min-h-screen bg-light-gray py-12">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-4">
            Tutoriels Home Assistant
          </h1>
          <p className="text-xl text-text-gray">
            Découvrez nos guides complets pour installer, configurer et automatiser votre maison connectée avec Home Assistant.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <a
            href="#installation"
            className="card hover:-translate-y-1 no-underline group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text-dark group-hover:text-accent mb-1">
                  Installation
                </h3>
                <p className="text-sm text-text-gray">
                  {installationArticles.length} article{installationArticles.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </a>

          <a
            href="#integration"
            className="card hover:-translate-y-1 no-underline group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text-dark group-hover:text-accent mb-1">
                  Intégrations
                </h3>
                <p className="text-sm text-text-gray">
                  {integrationArticles.length} article{integrationArticles.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </a>

          <a
            href="#automation"
            className="card hover:-translate-y-1 no-underline group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-text-dark group-hover:text-accent mb-1">
                  Automations
                </h3>
                <p className="text-sm text-text-gray">
                  {automationArticles.length} article{automationArticles.length > 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Installation Section */}
        {installationArticles.length > 0 && (
          <section id="installation" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h2 className="text-3xl font-heading font-bold text-text-dark">
                Installation Home Assistant
              </h2>
            </div>
            <p className="text-text-gray mb-8">
              Guides pour installer Home Assistant sur différentes plateformes et configurations.
            </p>
            <ArticleList articles={installationArticles} />
          </section>
        )}

        {/* Integration Section */}
        {integrationArticles.length > 0 && (
          <section id="integration" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-heading font-bold text-text-dark">
                Intégrations
              </h2>
            </div>
            <p className="text-text-gray mb-8">
              Connectez vos appareils et services à Home Assistant : Zigbee, Z-Wave, Wi-Fi et plus encore.
            </p>
            <ArticleList articles={integrationArticles} />
          </section>
        )}

        {/* Automation Section */}
        {automationArticles.length > 0 && (
          <section id="automation" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-3xl font-heading font-bold text-text-dark">
                Scénarios & Automations
              </h2>
            </div>
            <p className="text-text-gray mb-8">
              Créez des automations intelligentes pour rendre votre maison réactive et autonome.
            </p>
            <ArticleList articles={automationArticles} />
          </section>
        )}

        {/* CTA Section */}
        <div className="bg-white rounded-lg shadow-soft p-8 text-center mt-12">
          <h3 className="text-2xl font-heading font-bold text-text-dark mb-4">
            Vous ne trouvez pas ce que vous cherchez ?
          </h3>
          <p className="text-text-gray mb-6">
            Posez votre question à notre chatbot IA pour obtenir des recommandations personnalisées
          </p>
          <Link href="/chatbot" className="btn btn-primary no-underline">
            Poser une question
          </Link>
        </div>
      </div>
    </div>
  );
}