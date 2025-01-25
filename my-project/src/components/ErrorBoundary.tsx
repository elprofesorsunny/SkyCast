import React, { Component, ErrorInfo, ReactNode } from 'react';
import { ErrorHandler, CustomError } from '../services/ErrorHandler';
import ErrorDisplay from './ErrorDisplay';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  context?: string;
}

interface State {
  error: CustomError | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error: ErrorHandler.handle(error) };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    const handledError = ErrorHandler.handle(error);
    ErrorHandler.log(handledError, this.props.context || 'ErrorBoundary');
    console.error('Component Stack:', errorInfo.componentStack);
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    const { fallback, children } = this.props;

    if (error) {
      return fallback || (
        <ErrorDisplay error={error} onRetry={this.handleRetry} />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
