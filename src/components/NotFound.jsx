export default function NotFound() {
  return (
    <section className="not-found">
      <div className="shell">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <a className="btn btn-primary" href="/">Back to homepage</a>
      </div>
    </section>
  );
}
