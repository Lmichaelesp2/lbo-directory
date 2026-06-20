import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Local Business Organizations — Texas Business Directory',
  description: 'Browse 588 business organizations across San Antonio, Dallas, Houston, and Austin. Chambers, networking groups, professional associations, and more.',
  openGraph: {
    title: 'Local Business Organizations',
    description: 'Every local business organization in Texas, all in one place.',
    url: 'https://www.localbusinessorganizations.com',
    siteName: 'Local Business Organizations',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Sitebehavior analytics */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  if (window.location && window.location.search && window.location.search.indexOf('capture-sitebehaviour-heatmap') !== -1) {
                    sessionStorage.setItem('capture-sitebehaviour-heatmap', '_');
                  }

                  var sbSiteSecret = '576234fd-9610-43a2-bdb5-b36bd9f53b50';
                  window.sitebehaviourTrackingSecret = sbSiteSecret;
                  var scriptElement = document.createElement('script');
                  scriptElement.defer = true;
                  scriptElement.id = 'site-behaviour-script-v2';
                  scriptElement.src = 'https://sitebehaviour-cdn.fra1.cdn.digitaloceanspaces.com/index.min.js?sitebehaviour-secret=' + sbSiteSecret;
                  document.head.appendChild(scriptElement);
                } catch (e) { console.error(e); }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
