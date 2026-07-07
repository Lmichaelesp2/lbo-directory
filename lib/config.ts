export const CITIES = [
  { name: 'San Antonio', slug: 'san-antonio', count: 155 },
  { name: 'Houston',     slug: 'houston',     count: 190 },
  { name: 'Dallas',      slug: 'dallas',      count: 91  },
  { name: 'Austin',      slug: 'austin',      count: 91  },
] as const;

export type CitySlug = 'san-antonio' | 'houston' | 'dallas' | 'austin';

export const CITY_SLUG_TO_NAME: Record<CitySlug, string> = {
  'san-antonio': 'San Antonio',
  'houston':     'Houston',
  'dallas':      'Dallas',
  'austin':      'Austin',
};

export const PUBLIC_CATEGORIES = [
  { label: 'Community/Edu',     icon: 'ti-school',            color: 'blue'   },
  { label: 'Technology',        icon: 'ti-device-laptop',     color: 'blue'   },
  { label: 'Real Estate',       icon: 'ti-building',          color: 'orange' },
  { label: 'Networking',        icon: 'ti-users',             color: 'teal'   },
  { label: 'Chambers',          icon: 'ti-building-community',color: 'blue'   },
  { label: 'Const/Design/Mfg', icon: 'ti-tools',             color: 'orange' },
  { label: 'Co-Working',        icon: 'ti-home',              color: 'teal'   },
  { label: 'Other',             icon: 'ti-layout-grid',       color: 'purple' },
] as const;

export type PublicCategory = typeof PUBLIC_CATEGORIES[number]['label'];

// Maps backend `category` values to PUBLIC_CATEGORIES labels.
// Financial, Healthcare, Professional Svcs, Career/HR, Hospitality → Other for now.
export const CATEGORY_MAP: Record<string, PublicCategory> = {
  'Community/Edu':      'Community/Edu',
  'Technology':         'Technology',
  'Real Estate':        'Real Estate',
  'Networking':         'Networking',
  'Chambers':           'Chambers',
  'Const/Design/Mfg':  'Const/Design/Mfg',
  'Co-Working':         'Co-Working',
  'Fed/State/Local':    'Other',
  'Healthcare':         'Other',
  'Professional Svcs':  'Other',
  'Financial':          'Other',
  'Financial Services': 'Other',
  'Career/HR':          'Other',
  'Hospitality':        'Other',
  'Other':              'Other',
};

export const LBC_URL = process.env.NEXT_PUBLIC_LBC_URL || 'https://www.localbusinesscalendars.com';

export const CITY_CONTENT: Record<string, {
  tagline: string;
  heroText: string;
  intro: string;
  highlights: string[];
  seoTitle: string;
  seoDescription: string;
}> = {
  'San Antonio': {
    tagline: 'One of Texas\'s most active business networking scenes',
    heroText: 'San Antonio has a tightly connected business community built around chambers of commerce, veteran-owned networks, and strong professional associations across every major industry. This directory gives you a clear picture of who\'s active and where to plug in.',
    intro: 'San Antonio has a vibrant and tightly connected business community built around chambers of commerce, veteran-owned business networks, and a strong foundation of professional associations. Whether you\'re new to the market or a longtime local, this directory gives you a clear picture of who\'s active, who\'s organized, and where to plug in.',
    highlights: [
      'Strong chamber of commerce network across the metro',
      'Active veteran & military business associations',
      'Growing technology and startup community',
      'Deep roots in construction, real estate, and healthcare',
    ],
    seoTitle: 'San Antonio Business Organizations | Chambers, Networking & Associations',
    seoDescription: 'Browse 184+ business organizations in San Antonio, TX — chambers of commerce, professional associations, networking groups, real estate organizations, and more. Find your community.',
  },
  'Houston': {
    tagline: 'The largest and most diverse business ecosystem in Texas',
    heroText: 'Houston\'s professional organizations span energy, healthcare, real estate, technology, and beyond — making it one of the most complete business organization landscapes in the country. Find the right group for your industry, all in one place.',
    intro: 'Houston is home to one of the most expansive collections of business organizations in the country. From energy and oil & gas associations to one of the nation\'s largest medical center ecosystems, the city\'s professional organizations span virtually every industry. This directory brings them all together so you can find the right group for your field.',
    highlights: [
      'World-class energy & oil and gas industry associations',
      'Texas Medical Center — home to dozens of healthcare organizations',
      'Major chambers serving diverse communities across the metro',
      'Thriving technology, finance, and real estate networks',
    ],
    seoTitle: 'Houston Business Organizations | Chambers, Associations & Networking Groups',
    seoDescription: 'Browse 220+ business organizations in Houston, TX — energy associations, chambers of commerce, healthcare groups, professional networks, and more. The most complete Houston business directory.',
  },
  'Dallas': {
    tagline: 'A powerhouse of finance, real estate, and professional networks',
    heroText: 'Dallas-Fort Worth is one of the fastest-growing business markets in the country, with a deep infrastructure of chambers, finance associations, real estate groups, and technology networks spanning the entire metro. Whether you\'re in Dallas proper or the surrounding cities, this is where to find your community.',
    intro: 'Dallas-Fort Worth is one of the fastest-growing business markets in the country, and its professional organization landscape reflects that momentum. From some of Texas\'s largest chambers to nationally recognized finance and real estate associations, Dallas has a strong infrastructure for professionals looking to grow their network and deepen their industry ties.',
    highlights: [
      'Major chambers covering Dallas, Plano, Frisco, and surrounding cities',
      'Leading finance, banking, and investment professional groups',
      'One of Texas\'s strongest real estate association networks',
      'Active technology corridors and innovation-focused organizations',
    ],
    seoTitle: 'Dallas Business Organizations | Chambers, Professional Associations & Networking',
    seoDescription: 'Browse 92+ business organizations in Dallas, TX — chambers of commerce, finance associations, real estate groups, technology networks, and more. Find your place in the Dallas business community.',
  },
  'Austin': {
    tagline: 'Texas\'s fastest-growing business community, led by tech and innovation',
    heroText: 'Austin has become one of the top business destinations in the country, and its organization landscape reflects that — technology groups, startup networks, chambers, and professional associations are all thriving here. Whether you\'re building a company or growing a career, this is where connections happen.',
    intro: 'Austin has transformed into one of the top business destinations in the United States, attracting companies and talent from across the country. Its organization landscape reflects that energy — technology groups, startup networks, entrepreneur communities, and professional associations are all thriving here. Whether you\'re building a company or growing a career, Austin\'s business organizations are where connections happen.',
    highlights: [
      'Nationally recognized technology and startup ecosystem',
      'Active entrepreneur and founder communities',
      'Growing real estate and construction association network',
      'Strong chambers serving Austin, Round Rock, and surrounding areas',
    ],
    seoTitle: 'Austin Business Organizations | Chambers, Tech Groups & Professional Associations',
    seoDescription: 'Browse 92+ business organizations in Austin, TX — technology groups, startup networks, chambers of commerce, professional associations, and more. Connect with Austin\'s business community.',
  },
};
