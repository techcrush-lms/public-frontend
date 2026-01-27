import { Metadata, ResolvingMetadata } from 'next';
import BusinessPage from '@/app/(components)/page/BusinessPage';
import { reformatUnderscoreText } from '@/lib/utils';
import { BusinessInfo } from '@/types/onboard';

type Props = {
  params: Promise<{
    business_url: string;
  }>;
};

// ✅ Dynamically generate metadata based on business info
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { business_url } = await params; // ⚙️ Required in Next.js 15+

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/onboard/view-business-info/${business_url}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch business info for ${business_url}`);
    }

    const business = (await res.json()).data as BusinessInfo;

    if (!business || !business) {
      return {
        title: 'Business not found | Doexcess',
        description:
          'This business profile could not be found or has been removed.',
        openGraph: {
          title: 'Business not found | Doexcess',
          description:
            'This business profile could not be found or has been removed.',
          images: ['/images/default-business.png'],
        },
      };
    }

    // ✅ Dynamic title and description
    const businessTitle = `Explore ${business.business_name} on Doexcess`;
    const businessDesc = business.business_description
      ? reformatUnderscoreText(
          business.business_description
            .replace(/<[^>]*>/g, '') // remove HTML tags
            .replace(/&[a-z]+;/gi, '') // remove HTML entities.slice(0, 160))
            .slice(0, 150)
        )
      : `Discover ${business.business_name}'s offerings, products, and services on Doexcess.`;
    const businessImage = business.logo_url || '/images/default-business.png';

    return {
      title: businessTitle,
      description: businessDesc,
      openGraph: {
        title: businessTitle,
        description: businessDesc,
        type: 'website',
        url: `https://${business_url}.doexcess.store`,
        images: [
          {
            url: businessImage,
            width: 1200,
            height: 630,
            alt: business.business_name,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: businessTitle,
        description: businessDesc,
        images: [businessImage],
      },
    };
  } catch (error) {
    console.error('Error generating business metadata:', error);

    return {
      title: 'Business not found | Doexcess',
      description: 'This business could not be loaded at the moment.',
      openGraph: {
        title: 'Business not found | Doexcess',
        description: 'This business could not be loaded at the moment.',
        images: ['/images/default-business.png'],
      },
    };
  }
}

// ✅ Render the actual page
export default function Page() {
  return <BusinessPage />;
}
