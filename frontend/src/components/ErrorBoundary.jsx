import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cloud-dancer flex flex-col items-center justify-center p-20 text-center space-y-6">
          <h1 className="text-4xl font-serif text-red-500 uppercase tracking-widest">Fatal System Exception</h1>
          <div className="bg-white/40 border border-red-500/20 shadow-2xl p-10 max-w-2xl text-left overflow-auto">
            <p className="font-mono text-xs text-red-600 font-bold mb-4">{this.state.error && this.state.error.toString()}</p>
            <pre className="text-[9px] text-stone-gray font-mono break-all whitespace-pre-wrap">
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </pre>
          </div>
          <button 
            onClick={() => { localStorage.clear(); window.location.href = '/'; }} 
            className="px-8 py-4 bg-luxury-black text-white font-sans uppercase tracking-[0.3em] hover:bg-red-500 transition-colors"
          >
            Clear Caches & Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
