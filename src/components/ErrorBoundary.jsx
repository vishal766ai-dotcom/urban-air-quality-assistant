import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Enterprise-grade React Error Boundary
 * Catches runtime rendering exceptions and provides graceful user recovery
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full p-6 rounded-2xl bg-slate-900 border border-rose-500/40 text-center shadow-2xl space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-heading font-bold text-white">
              Component State Interrupted
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              A temporary rendering exception occurred in this module. Your settings and local sensor data are preserved safely.
            </p>
            {this.state.error && (
              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-rose-300 overflow-x-auto text-left font-mono">
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload AeroGuardian</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
