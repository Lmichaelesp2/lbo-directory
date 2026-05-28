import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="lbo-breadcrumb">
      {items.map((item, i) => (
        <span key={i}>
          {i > 0 && <span className="lbo-breadcrumb-sep">›</span>}
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="lbo-breadcrumb-link">{item.label}</Link>
          ) : (
            <span className="lbo-breadcrumb-current">{item.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
