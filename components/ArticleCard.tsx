import Link from 'next/link';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Article } from '@/models/Article';

dayjs.locale('fr');

interface ArticleCardProps {
  article: Article;
  variant?: 'default' | 'featured';
}

export default function ArticleCard({ article, variant = 'default' }: ArticleCardProps) {
  const isFeatured = variant === 'featured';
  
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={`group block no-underline ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      <article className={`card h-full hover:-translate-y-1 ${
        isFeatured ? 'md:flex md:flex-row' : 'flex flex-col'
      }`}>
        {/* Image */}
        <div className={`relative overflow-hidden rounded-lg ${
          isFeatured 
            ? 'md:w-1/2 h-64 md:h-auto' 
            : 'w-full h-48'
        }`}>
          <Image
            src={article.coverImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-accent text-xs font-semibold rounded-full">
              {article.category === 'installation' && 'Installation'}
              {article.category === 'integration' && 'Intégration'}
              {article.category === 'automation' && 'Automation'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`flex flex-col ${
          isFeatured ? 'md:w-1/2 md:pl-6' : 'mt-4'
        }`}>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-sm text-text-gray mb-3">
            <time dateTime={article.date}>
              {dayjs(article.date).format('D MMMM YYYY')}
            </time>
            {article.readingTime && (
              <>
                <span>•</span>
                <span>{article.readingTime} min de lecture</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className={`font-heading font-bold text-text-dark group-hover:text-accent transition-colors ${
            isFeatured ? 'text-2xl md:text-3xl mb-4' : 'text-xl mb-3'
          }`}>
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className={`text-text-gray leading-relaxed ${
            isFeatured ? 'text-base mb-4' : 'text-sm mb-4 line-clamp-3'
          }`}>
            {article.excerpt}
          </p>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto">
              {article.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-light-gray text-text-gray text-xs rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More */}
          <div className="mt-4 inline-flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
            Lire l'article
            <svg
              className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}