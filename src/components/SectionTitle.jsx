export default function SectionTitle({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description && <p className="muted mt-4 leading-7">{description}</p>}
    </div>
  );
}
