'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import ReactPlayer from 'react-player';
import 'highlight.js/styles/github-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight, rehypeRaw]}
        components={{
          // Custom heading renderer with IDs for anchor links
          h2: ({ children, ...props }) => {
            const text = children?.toString() || '';
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return (
              <h2 id={id} {...props}>
                {children}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const text = children?.toString() || '';
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            return (
              <h3 id={id} {...props}>
                {children}
              </h3>
            );
          },
          
          // Custom link renderer for YouTube embeds
          a: ({ href, children, ...props }) => {
            // Check if it's a YouTube link
            const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
            const match = href?.match(youtubeRegex);
            
            if (match && match[1]) {
              return (
                <div className="my-8 rounded-lg overflow-hidden shadow-medium">
                  <ReactPlayer
                    url={href}
                    width="100%"
                    height="480px"
                    controls
                    className="react-player"
                  />
                </div>
              );
            }
            
            // Regular link
            return (
              <a href={href} {...props} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
                {children}
              </a>
            );
          },
          
          // Custom code block with copy button
          code: ({ node, inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language) {
              return (
                <div className="relative group">
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
                      }}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded transition-colors"
                      aria-label="Copier le code"
                    >
                      Copier
                    </button>
                  </div>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </div>
              );
            }
            
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          
          // Custom image renderer
          img: ({ src, alt, ...props }) => {
            return (
              <img
                src={src}
                alt={alt || ''}
                loading="lazy"
                className="rounded-lg shadow-soft"
                {...props}
              />
            );
          },
          
          // Custom table renderer
          table: ({ children, ...props }) => {
            return (
              <div className="overflow-x-auto my-6">
                <table {...props}>{children}</table>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}