'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArticleMetadata } from '@/models/Article';
import axios from 'axios';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  articles?: ArticleMetadata[];
  timestamp: Date;
}

export default function ChatbotPage() {
  const searchParams = useSearchParams();
  const questionFromUrl = searchParams.get('question');
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Bonjour ! 👋 Je suis votre assistant domotique spécialisé en Home Assistant. Posez-moi vos questions sur l'installation, la configuration, les intégrations ou les automations !",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const hasAutoSubmittedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-submit question from URL parameter
  useEffect(() => {
    if (questionFromUrl && !hasAutoSubmittedRef.current) {
      hasAutoSubmittedRef.current = true;
      setInput(questionFromUrl);
      
      // Auto-submit the question
      const submitQuestion = async () => {
        const userMessage: Message = {
          id: Date.now().toString(),
          role: 'user',
          content: questionFromUrl,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
          const response = await axios.post('/api/chat', {
            message: questionFromUrl,
            history: []
          });

          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: response.data.response,
            articles: response.data.articles || [],
            timestamp: new Date(),
          };

          setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
          console.error('Chat error:', error);
          const errorMessage: Message = {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, errorMessage]);
        } finally {
          setIsLoading(false);
        }
      };

      submitQuestion();
    }
  }, [questionFromUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post('/api/chat', {
        message: input,
        history: messages.slice(1).map(m => ({
          role: m.role,
          content: m.content
        }))
      });

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.data.response,
        articles: response.data.articles || [],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-gray py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-soft p-6 mb-6">
          <h1 className="text-3xl font-heading font-bold text-text-dark mb-2">
            Chatbot IA Assistant
          </h1>
          <p className="text-text-gray">
            Posez vos questions sur Home Assistant et obtenez des recommandations d'articles personnalisées
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white rounded-lg shadow-soft flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  {/* Message Bubble */}
                  <div
                    className={`rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-light-gray text-text-dark'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>

                  {/* Recommended Articles */}
                  {message.articles && message.articles.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <p className="text-sm font-semibold text-text-gray">
                        📚 Articles recommandés :
                      </p>
                      {message.articles.map((article) => (
                        <Link
                          key={article.slug}
                          href={`/articles/${article.slug}`}
                          className="block bg-white border border-border rounded-lg p-4 hover:shadow-medium transition-all no-underline group"
                        >
                          <h3 className="font-heading font-semibold text-text-dark group-hover:text-accent mb-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-text-gray line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-accent text-sm font-medium">
                            Lire l'article
                            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Timestamp */}
                  <p className="text-xs text-text-gray mt-1">
                    {message.timestamp.toLocaleTimeString('fr-FR', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-light-gray rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-text-gray rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-text-gray rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-text-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="input flex-1"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn btn-primary px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Suggestions */}
        <div className="mt-6 bg-white rounded-lg shadow-soft p-6">
          <h3 className="font-heading font-semibold text-text-dark mb-3">
            💡 Questions fréquentes :
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Comment installer Home Assistant ?",
              "Comment configurer Zigbee ?",
              "Qu'est-ce que Nabu Casa ?",
              "Comment créer une automation ?"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInput(suggestion)}
                className="text-left p-3 bg-light-gray hover:bg-medium-gray rounded-lg transition-colors text-sm"
                disabled={isLoading}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}