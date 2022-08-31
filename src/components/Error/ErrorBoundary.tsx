/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    ErrorFallback: () => React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    public static getDerivedStateFromError(_: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ERROR BOUNDARY:', error, errorInfo);
    }

    ErrorComponent = () => {
        const { ErrorFallback } = this.props;
        return ErrorFallback();
    };

    public render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return this.ErrorComponent();
        }

        return children;
    }
}

export default ErrorBoundary;
