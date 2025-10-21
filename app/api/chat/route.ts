import { NextRequest, NextResponse } from 'next/server';
import { getAllArticleMetadata } from '@/lib/markdown';
import { generateCompletion, OpenRouterMessage } from '@/lib/ai_services';

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message invalide' },
        { status: 400 }
      );
    }

    // Load all article metadata for AI context
    const articles = getAllArticleMetadata();

    // Build system prompt with article metadata
    const systemPrompt = `Tu es un assistant virtuel expert en domotique Home Assistant, spécialisé dans l'aide aux utilisateurs francophones.

Ton rôle est d'aider les utilisateurs à trouver des solutions et des articles pertinents sur ce blog.

Articles disponibles sur le blog:
${articles.map((article, index) => `
${index + 1}. Titre: "${article.title}"
   Résumé: ${article.excerpt}
   Mots-clés: ${article.keywords.join(', ')}
   Slug: ${article.slug}
`).join('\n')}

IMPORTANT: Quand tu recommandes un article du blog, utilise EXACTEMENT ce format:
[ARTICLE:slug-de-article]

Par exemple: [ARTICLE:installation-home-assistant]

Instructions:
- Réponds en français de manière claire et concise
- Si la question concerne un sujet traité dans un article, recommande-le avec le format [ARTICLE:slug]
- Tu peux recommander plusieurs articles si pertinent
- Si aucun article ne correspond, donne des conseils généraux sur Home Assistant
- Sois amical et encourageant
- Utilise des émojis avec parcimonie pour rendre la conversation agréable

Commence toujours par saluer l'utilisateur chaleureusement si c'est le premier message.`;

    // Prepare messages for AI
    const messages: OpenRouterMessage[] = [
      { role: 'system', content: systemPrompt },
      ...history,
      { role: 'user', content: message }
    ];

    // Call OpenRouter API
    const aiResponse = await generateCompletion(messages, {
      maxTokens: 500,
      temperature: 0.7
    });

    // Parse article references from response
    const articlePattern = /\[ARTICLE:([^\]]+)\]/g;
    const matches = Array.from(aiResponse.matchAll(articlePattern));
    
    // Get referenced articles
    const referencedArticles = matches
      .map(match => articles.find(a => a.slug === match[1]))
      .filter((article): article is NonNullable<typeof article> => article !== null && article !== undefined);

    // Remove article markers from response for cleaner display
    const cleanedResponse = aiResponse.replace(articlePattern, '');

    return NextResponse.json({
      response: cleanedResponse,
      articles: referencedArticles,
      success: true
    });

  } catch (error) {
    console.error('Chatbot API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Erreur lors du traitement de votre message. Veuillez réessayer.',
        success: false
      },
      { status: 500 }
    );
  }
}