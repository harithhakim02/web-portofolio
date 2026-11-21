/** Original Harith Hakim artwork, split into its untouched highlights and an accent-tinted ink layer. */
export default function BrandLogo({ className = "", alt = "Harith Hakim" }) {
  return (
    <span className={`brand-logo ${className}`} role="img" aria-label={alt}>
      <img
        className="brand-logo-base"
        src="/logo-base.webp"
        alt=""
        aria-hidden="true"
      />
      <span className="brand-logo-ink" aria-hidden="true" />
    </span>
  );
}
