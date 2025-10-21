import { getArticleBySlug, getAllArticleSlugs, extractHeadings } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import TableOfContents from '@/components/TableOfContents';

dayjs.locale('fr');

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const headings = extractHeadings(article.content);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero / Cover Image */}
      <div className="relative w-full h-[400px] bg-gradient-soft">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container text-center px-4">
            <div className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full mb-4">
              <span className="text-accent text-sm font-semibold">
                {article.category === 'installation' && '🏗️ Installation'}
                {article.category === 'integration' && '⚡ Intégration'}
                {article.category === 'automation' && '🤖 Automation'}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-dark max-w-4xl mx-auto">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-text-gray mb-8 pb-8 border-b border-border">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={article.date}>
                {dayjs(article.date).format('D MMMM YYYY')}
              </time>
            </div>
            
            {article.readingTime && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{article.readingTime} min de lecture</span>
                </div>
              </>
            )}

            {article.author && (
              <>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{article.author}</span>
                </div>
              </>
            )}
          </div>

          {/* Table of Contents */}
          {headings.length > 0 && (
            <TableOfContents headings={headings} />
          )}

          {/* Article Content */}
          <article className="mt-8">
            <MarkdownRenderer content={article.content} />
          </article>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-sm font-semibold text-text-gray mb-4">Tags :</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-light-gray text-text-dark text-sm rounded-full hover:bg-medium-gray transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex justify-between items-center">
              <Link
                href="/tutoriels"
                className="inline-flex items-center gap-2 text-accent hover:underline no-underline"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour aux tutoriels
              </Link>

              <Link
                href="/chatbot"
                className="btn btn-primary no-underline"
              >
                Poser une question
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}