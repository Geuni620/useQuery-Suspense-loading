'use client';

import ErrorBoundary from './components/ErrorBoundary';
import Suspense from './components/Suspense';
import UserWelcome from './components/UserWelcome';

export default function Home() {
  return (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<p>...Loading</p>}>
          <UserWelcome />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
