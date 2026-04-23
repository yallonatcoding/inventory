import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = (await cookies()).get('session');

  if (session) redirect('/dashboard');

  redirect('/login');
}
