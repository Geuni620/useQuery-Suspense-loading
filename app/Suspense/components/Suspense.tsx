import React from 'react';

export interface SuspenseProps {
  fallback: React.ReactNode;
  children?: React.ReactNode;
}

interface SuspenseState {
  pending: boolean;
  error?: any;
}

function isPromise(i: any): i is Promise<any> {
  console.log('i', i);
  return i && typeof i.then === 'function';
}

export default class Suspense extends React.Component<
  SuspenseProps,
  SuspenseState
> {
  public state: SuspenseState = {
    pending: false,
  };

  public componentDidCatch(catchedPromise: any) {
    if (isPromise(catchedPromise)) {
      this.setState({ pending: true });

      catchedPromise
        .then(() => {
          this.setState({ pending: false });
        })
        .catch((err) => {
          this.setState({ error: err || new Error('Suspense Error') });
        });
    } else {
      throw catchedPromise;
    }
  }

  public componentDidUpdate() {
    if (this.state.pending && this.state.error) {
      throw this.state.error;
    }
  }

  public render() {
    return this.state.pending ? this.props.fallback : this.props.children;
  }
}
