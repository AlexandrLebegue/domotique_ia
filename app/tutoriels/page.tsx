import { getArticlesByCategory } from '@/lib/markdown';
import TutorielsPageClient from '@/components/TutorielsPageClient';

export default function TutorielsPage() {
  const installationArticles = getArticlesByCategory('installation');
  const integrationArticles = getArticlesByCategory('integration');
  const automationArticles = getArticlesByCategory('automation');

  return (
    <TutorielsPageClient
      installationArticles={installationArticles}
      integrationArticles={integrationArticles}
      automationArticles={automationArticles}
    />
  );
}