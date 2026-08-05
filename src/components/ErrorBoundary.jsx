import { Component } from 'react';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('Unhandled render error:', error, errorInfo);
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12 text-foreground">
        <section className="w-full max-w-md text-center">
          <p className="text-sm font-medium uppercase tracking-wide text-muted">
            Có lỗi xảy ra
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Không thể hiển thị trang này
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted">
            Ứng dụng gặp sự cố không mong muốn. Vui lòng tải lại trang để tiếp
            tục.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="mt-6 inline-flex min-h-10 items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Tải lại trang
          </button>
        </section>
      </main>
    );
  }
}

export default ErrorBoundary;
