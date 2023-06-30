import React, { ErrorInfo, ReactNode } from "react";

import Button from "@components/common/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  handleRefresh() {
    window.location.replace("/");
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex-center">
          <h1>Something went wrong.</h1>
          <Button type="button" onClick={this.handleRefresh} theme="dark">
            Back to homepage
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
