import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode; title?: string };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      const title = this.props.title ?? "Algo salió mal";
      return (
        <div className="mx-auto w-full max-w-3xl p-6">
          <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900">
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="mt-2 text-sm">{this.state.error.message}</p>
            {this.state.error.stack && (
              <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap text-xs text-red-800/80">
                {this.state.error.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
