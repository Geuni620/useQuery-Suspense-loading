import React from 'react';

export interface SuspenseProps {
  fallback: React.ReactNode;
  children?: React.ReactNode;
}

interface SuspenseState {
  pending: boolean;
  error?: any;
}

function isPromise(promise: any): promise is Promise<any> {
  console.log('promise가 맞나요???');
  return promise && typeof promise.then === 'function';
}

export default class Suspense extends React.Component<
  SuspenseProps,
  SuspenseState
> {
  public state: SuspenseState = {
    pending: false,
  };

  // public componentDidCatch(catchedPromise: any) {
  //   console.log('catchedPromise', catchedPromise);
  //   if (isPromise(catchedPromise)) {
  //     this.setState({ pending: true });

  //     catchedPromise
  //       .then(() => {
  //         this.setState({ pending: false });
  //       })
  //       .catch((err) => {
  //         this.setState({ error: err || new Error('Suspense Error') });
  //       });
  //   } else {
  //     throw catchedPromise;
  //   }
  // }

  static getDerivedStateFromError(error: any) {
    console.log('getDerivedStateFromError error', error);
    if (isPromise(error)) {
      return { pending: true };
    }
    return { error };
  }

  public componentDidCatch(catchedPromise: any) {
    if (isPromise(catchedPromise)) {
      this.setState({ pending: true });

      catchedPromise
        .then(() => {
          console.log('여기 읽히니?');
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
