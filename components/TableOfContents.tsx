'use client';

import { useState } from 'react';
import { Heading } from '@/lib/markdown';

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (headings.length === 0) return null;

  return (
    <div className="mb-8 bg-light-gray rounded-lg p-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left mb-4"
      >
        <h2 className="text-xl font-heading font-semibold text-text-dark">
          📑 Table des matières
        </h2>
        <svg
          className={`w-5 h-5 text-text-gray transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isExpanded && (
        <nav className="space-y-2">
          {headings.map((heading, index) => (
            <a
              key={index}
              href={`#${heading.id}`}
              className={`block hover:text-accent transition-colors no-underline ${
                heading.level === 2 
                  ? 'text-text-dark font-medium' 
                  : 'text-text-gray text-sm pl-4'
              }`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}