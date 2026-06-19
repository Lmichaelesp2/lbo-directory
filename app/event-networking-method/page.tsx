import { redirect } from 'next/navigation';

// Hidden until rollout — redirect to home
export default function Page() {
  redirect('/');
}
