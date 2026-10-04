import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  private handleResetCache = () => {
    try {
      localStorage.removeItem('asai_academy_courses');
      localStorage.removeItem('asai_academy_enrollments');
      localStorage.removeItem('asai_academy_certificates');
      localStorage.removeItem('asai_user_unlocked_courses');
      localStorage.removeItem('asai_current_logged_in_student');
      localStorage.removeItem('asai_exam_results_history');
    } catch (e) {
      console.warn('Cache clear error:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="pt-28 pb-20 px-4 max-w-3xl mx-auto text-center">
          <div className="p-8 rounded-3xl bg-white border border-red-200 shadow-xl space-y-5">
            <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle className="w-8 h-8" />
            </div>
            
            <h2 className="text-2xl font-black text-gray-900">
              {this.props.fallbackTitle || 'Something went wrong loading this view'}
            </h2>

            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              A local browser storage conflict or unexpected value occurred. You can reload the page or reset local storage defaults to recover instantly.
            </p>

            {this.state.error && (
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-left font-mono text-[11px] text-red-600 overflow-x-auto max-h-36">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetCache}
                className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset Local Cache & Recover</span>
              </button>

              <a
                href="/"
                className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 flex items-center gap-2 transition-all"
              >
                <Home className="w-4 h-4" />
                <span>Return Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
