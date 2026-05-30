import type { Metadata } from 'next';
import { EventNetworkingMethodPage } from '../../components/EventNetworkingMethodPage';

export const metadata: Metadata = {
  title: 'The Event Networking Method | Local Business Organizations',
  description: 'A four-phase system that turns the organizations and events you discover into content, connections, and lasting relationships. People · Content · Events · Relationships.',
  alternates: { canonical: '/event-networking-method' },
};

export default function Page() {
  return <EventNetworkingMethodPage />;
}
