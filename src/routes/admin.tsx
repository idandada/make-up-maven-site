import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  beforeLoad: () => {
    throw redirect({ to: '/admin/pages' });
  },
  head: () => ({ meta: [{ title: 'ניהול' }, { name: 'robots', content: 'noindex,nofollow' }] }),
});
