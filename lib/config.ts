export const CITIES = [
  { name: 'San Antonio', slug: 'san-antonio', count: 184 },
  { name: 'Houston',     slug: 'houston',     count: 220 },
  { name: 'Dallas',      slug: 'dallas',      count: 92  },
  { name: 'Austin',      slug: 'austin',      count: 92  },
] as const;

export type CitySlug = 'san-antonio' | 'houston' | 'dallas' | 'austin';

export const CITY_SLUG_TO_NAME: Record<CitySlug, string> = {
  'san-antonio': 'San Antonio',
  'houston':     'Houston',
  'dallas':      'Dallas',
  'austin':      'Austin',
};

export const PUBLIC_CATEGORIES = [
  { label: 'Chambers & Networking',   icon: 'ti-users',              color: 'blue'   },
  { label: 'Community & Education',   icon: 'ti-school',             color: 'teal'   },
  { label: 'Technology',              icon: 'ti-device-laptop',      color: 'blue'   },
  { label: 'Real Estate',             icon: 'ti-building',           color: 'orange' },
  { label: 'Construction & Industry', icon: 'ti-hammer',             color: 'orange' },
  { label: 'Healthcare',              icon: 'ti-heart-rate-monitor', color: 'teal'   },
  { label: 'Professional Organizations', icon: 'ti-briefcase',       color: 'purple' },
  { label: 'More Organizations',      icon: 'ti-layout-grid',        color: 'purple' },
] as const;

export type PublicCategory = typeof PUBLIC_CATEGORIES[number]['label'];

// Maps backend `category` values to public_category display labels
export const CATEGORY_MAP: Record<string, PublicCategory> = {
  'Chambers':        'Chambers & Networking',
  'Networking':      'Chambers & Networking',
  'Community/Edu':   'Community & Education',
  'Co-Working':      'Community & Education',
  'Technology':      'Technology',
  'Real Estate':     'Real Estate',
  'Const/Design/Mfg': 'Construction & Industry',
  'Healthcare':      'Healthcare',
  'Financial':       'Professional Organizations',
  'Professional Svcs': 'Professional Organizations',
  'Career/HR':       'Professional Organizations',
  'Fed/State/Local': 'Professional Organizations',
  'Hospitality':     'More Organizations',
  'Other':           'More Organizations',
};

export const LBC_URL = process.env.NEXT_PUBLIC_LBC_URL || 'https://www.localbusinesscalendars.com';
