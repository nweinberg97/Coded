import { useEffect } from 'react';
import { useRoute, Link } from './router';
import { ProgressProvider } from './store';
import { ToastProvider } from './toast';
import { Shell } from '../components/Shell';
import { HomePage } from '../pages/Home';
import { LearnPage } from '../pages/Learn';
import { VaultPage } from '../pages/Vault';
import { CardPage } from '../pages/CardPage';
import { SetPage } from '../pages/SetPage';
import { BuildPage, ChallengePage } from '../pages/Build';
import { DemoPage } from '../pages/Demo';
import { ProfilePage } from '../pages/Profile';
import { EmptyState } from '../components/ui';
import { STORAGE_KEY } from '../engine/storage';

const TITLES: Record<string, string> = {
  '': 'Home', learn: 'Learn', vault: 'Vault', card: 'Card', set: 'Set', build: 'Build', demo: 'Demo', me: 'You',
};

export function App() {
  const route = useRoute();
  const [section, id] = route.parts;

  useEffect(() => {
    document.title = `${TITLES[section ?? ''] ?? 'Coded'} · Coded`;
    window.scrollTo({ top: 0 });
  }, [route.path, section]);

  let page;
  switch (section) {
    case undefined:
      page = <HomePage />;
      break;
    case 'learn':
      page = <LearnPage route={route} />;
      break;
    case 'vault':
      page = <VaultPage />;
      break;
    case 'card':
      page = <CardPage key={id} id={id ?? ''} />;
      break;
    case 'set':
      page = <SetPage key={id} id={id ?? ''} />;
      break;
    case 'build':
      page = id ? <ChallengePage key={id} id={id} /> : <BuildPage />;
      break;
    case 'demo':
      page = <DemoPage />;
      break;
    case 'me':
      page = <ProfilePage />;
      break;
    default:
      page = (
        <div className="page">
          <EmptyState icon="search" title="This page doesn’t exist" body="404 — a status code you’ll learn about in the APIs set." action={<Link className="btn btn-primary" to="/">Go home</Link>} />
        </div>
      );
  }

  return (
    <ToastProvider>
      <ProgressProvider storageKey={STORAGE_KEY}>
        <Shell path={route.path}>{page}</Shell>
      </ProgressProvider>
    </ToastProvider>
  );
}
