import { Metadata } from 'next';
import { CITY_SLUG_TO_NAME, CITY_CONTENT, CitySlug } from '@/lib/config';
import CityPageClient from './CityPageClient';

type Props = { params: { city: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cityName = CITY_SLUG_TO_NAME[params.city as CitySlug];
  const content = cityName ? CITY_CONTENT[cityName] : null;

  if (!cityName || !content) {
    return { title: 'City Not Found | Local Business Organizations' };
  }

  return {
    title: content.seoTitle,
    description: content.seoDescription,
    openGraph: {
      title: content.seoTitle,
      description: content.seoDescription,
      url: `https://www.localbusinessorganizations.com/${params.city}`,
      siteName: 'Local Business Organizations',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: content.seoTitle,
      description: content.seoDescription,
    },
    alternates: {
      canonical: `https://www.localbusinessorganizations.com/${params.city}`,
    },
  };
}

export default function CityPage() {
  return <CityPageClient />;
}
