"use client";

import Link from "next/link";
import { Children, ReactNode } from "react";

type BreadCrumbsItemsProps = {
  children: ReactNode;
  href: string;
};

type BreadCrumbsContainerProps = {
  children: ReactNode;
  separator?: string;
};

export default function BreadCrumbsUI() {
  const BreadCrumbsItem = ({
    children,
    href,
    ...props
  }: BreadCrumbsItemsProps) => {
    return (
      <li {...props} className="list-unstyled">
        <Link href={href}>{children}</Link>
      </li>
    );
  };

  const BreadCrumbsContainer = ({
    children,
    separator = "/",
  }: BreadCrumbsContainerProps) => (
    <nav className="pb-4" style={{ minHeight: "1.5rem" }}>
      <ol className="d-flex align-items-center gap-2">
        {Children.map(children, (child, idx) => (
          <span key={idx} className="d-flex align-items-center gap-2">
            {child}

            {idx < Children.count(children) - 1 && (
              <span className="text-muted">{separator}</span>
            )}
          </span>
        ))}
      </ol>
    </nav>
  );

  return (
    <BreadCrumbsContainer>
      <BreadCrumbsItem href="/">Home</BreadCrumbsItem>
      <BreadCrumbsItem href="/docs">Docs</BreadCrumbsItem>
      <BreadCrumbsItem href="/docs/react">React</BreadCrumbsItem>
    </BreadCrumbsContainer>
  );
}
