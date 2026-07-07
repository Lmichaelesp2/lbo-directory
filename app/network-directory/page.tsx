import { redirect } from 'next/navigation';

// /network-directory duplicated the TBOA page content under a second URL.
// Permanently forward to the canonical page instead (site audit 2026-07-07, item 10).
export default function NetworkDirectoryPage() {
  redirect('/texas-business-organizations-alliance');
}
