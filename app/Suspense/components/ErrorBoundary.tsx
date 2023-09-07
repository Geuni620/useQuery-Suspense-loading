import React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: { err?: any } = {};

  public componentDidCatch(err: any) {
    this.setState({ err });
  }
  render() {
    return this.state.err ? (
      <div>getError: {this.state.err.message}</div>
    ) : (
      this.props.children
    );
  }
}
