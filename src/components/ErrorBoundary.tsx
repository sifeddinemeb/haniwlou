import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="m-4">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertTriangle className="ml-2 h-5 w-5" />
              حدث خطأ غير متوقع
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>خطأ في التطبيق</AlertTitle>
              <AlertDescription>
                عذراً، حدث خطأ أثناء تحميل هذا الجزء من التطبيق. يرجى المحاولة مرة أخرى.
              </AlertDescription>
            </Alert>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="p-4 bg-gray-100 rounded text-sm font-mono text-left overflow-auto">
                <strong>Error:</strong> {this.state.error.message}
                <br />
                <strong>Stack:</strong>
                <pre className="mt-2 text-xs">{this.state.error.stack}</pre>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button onClick={this.handleRetry} variant="outline">
                <RefreshCw className="ml-2 h-4 w-4" />
                المحاولة مرة أخرى
              </Button>
              <Button onClick={() => window.location.reload()} variant="default">
                إعادة تحميل الصفحة
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;