"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "../../css/02-react-intermediate/breadcrumb.css";

function formatLabel(segment: string) {
  return segment
    .replace(/^\d+-/, "") // remove numbers like 01-
    .replace(/-/g, " ") // convert dash to space
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize
}

export default function BreadCrumbsAuto() {
  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="breadcrumb" className="mb-3">
      <div className="breadcrumb-box"> 
        <ol className="breadcrumb">
          {/* Home */}
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>

          {segments.map((segment, idx) => {
            const href = "/" + segments.slice(0, idx + 1).join("/");
            const label = formatLabel(segment);

            const isLast = idx === segments.length - 1;

            return (
              <li
                key={href}
                className={`breadcrumb-item ${isLast ? "active" : ""}`}
              >
                {isLast ? label : <Link href={href}>{label}</Link>}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
