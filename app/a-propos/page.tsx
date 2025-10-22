'use client';

import { useState } from 'react';
import axios from 'axios';

export default function AboutPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await axios.post('/api/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setErrorMessage('Une erreur est survenue. Veuillez réessayer.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-light-gray py-12">
      <div className="container max-w-4xl">
        {/* About Section */}
        <div className="bg-white rounded-lg shadow-soft p-8 md:p-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark mb-6">
            À Propos
          </h1>

          <div className="prose max-w-none">
            <div className="flex items-start gap-6 mb-8">
              <div className="w-24 h-24 bg-gradient-soft rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-heading font-bold text-text-dark mb-2">
                  Alexandre Lebegue
                </h2>
                <p className="text-text-gray">
                  Ingénieur logiciel embarqué & aérospatial
                </p>
              </div>
            </div>

            <div className="space-y-4 text-text-gray leading-relaxed">
              <p>
                Passionné de domotique depuis plusieurs années, j&apos;ai découvert Home Assistant et j&apos;ai été 
                immédiatement séduit par ses possibilités infinies. Ce projet open-source m&apos;a permis de 
                transformer ma maison en un véritable écosystème intelligent et interconnecté.
              </p>

              <p>
                Fort de mon expérience en tant qu&apos;<strong className="text-text-dark">ingénieur logiciel embarqué 
                et aérospatial</strong>, j&apos;ai développé une expertise approfondie dans les systèmes complexes, 
                l&apos;automatisation et l&apos;optimisation. Ces compétences, combinées à ma passion pour la domotique, 
                m&apos;ont permis de créer des solutions innovantes et fiables pour ma maison connectée.
              </p>

              <p>
                Ma mission avec ce blog est de <strong className="text-text-dark">rendre la domotique accessible 
                à tous</strong>. Je crois profondément en l&apos;avenir de la maison intelligente et je souhaite partager 
                mes connaissances pour aider chacun à créer son propre écosystème Home Assistant, sans avoir besoin 
                de compétences techniques avancées.
              </p>

              <p>
                Que vous soyez débutant ou utilisateur avancé, vous trouverez ici des tutoriels détaillés, 
                des guides pas-à-pas et des conseils pratiques pour tirer le meilleur parti de Home Assistant. 
                Mon objectif est de démystifier la domotique et de vous montrer qu&apos;il est possible de créer 
                une maison intelligente, sécurisée et efficace.
              </p>
            </div>

            <div className="mt-8 p-6 bg-light-gray rounded-lg">
              <h3 className="text-xl font-heading font-semibold text-text-dark mb-4">
                🎯 Mes Domaines d&apos;Expertise
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-text-dark">Ingénierie logicielle embarquée</p>
                    <p className="text-sm text-text-gray">Systèmes temps réel et optimisation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-text-dark">Systèmes aérospatiaux</p>
                    <p className="text-sm text-text-gray">Fiabilité et sécurité critiques</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-text-dark">Domotique & IoT</p>
                    <p className="text-sm text-text-gray">Home Assistant expert</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-accent flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <p className="font-semibold text-text-dark">Automatisation</p>
                    <p className="text-sm text-text-gray">Scénarios intelligents et efficaces</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div id="contact" className="bg-white rounded-lg shadow-soft p-8 md:p-12">
          <h2 className="text-3xl font-heading font-bold text-text-dark mb-6">
            Me Contacter
          </h2>
          <p className="text-text-gray mb-8">
            Vous avez une question, une suggestion ou vous souhaitez simplement échanger ? 
            N&apos;hésitez pas à me contacter via le formulaire ci-dessous.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-text-dark mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-text-dark mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="votre@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-text-dark mb-2">
                Sujet <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="input"
                placeholder="Sujet de votre message"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-text-dark mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="textarea"
                placeholder="Votre message..."
              />
            </div>

            {status === 'success' && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg text-success">
                ✅ Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                ❌ {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi en cours...
                </span>
              ) : (
                'Envoyer le message'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}