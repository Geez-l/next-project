"use client";

import Image from "next/image";
import "@/app/css/sidebar.css";
import { useState } from "react";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="layout-wrapper d-flex">
      <nav
        className={`sidebar d-flex flex-column ${collapsed ? "collapsed" : ""}`}
      >
        {/* Toggle */}
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          <i
            className={`fas ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`}
          ></i>
        </button>

        {/* Logo */}
        <div className="sidebar-header p-4 flex-shrink-0">
          <h4 className="logo-text fw-bold mb-0">Next Project</h4>
          <p className="text-muted small hide-on-collapse">Dashboard</p>
        </div>

        {/* Navigation */}
        <div className="sidebar-navigation">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`sidebar-link text-decoration-none p-3 ${
                pathname === item.href ? "active" : ""
              }`}
            >
              <i className={`fas ${item.icon} me-3`}></i>
              <span className="hide-on-collapse">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Profile */}
        <div className="profile-section mt-auto p-4 flex-shrink-0">
          <div className="d-flex align-items-center">
            <Image
              src="/assets/CS16.jpg"
              alt="Profile Picture"
              width={40}
              height={40}
              className="rounded-circle me-2"
              style={{ objectFit: "cover" }}
            />
            <div className="hide-on-collapse">
              <div className="text-white mb-0">Username</div>
              <small className="text-muted">Authority</small>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
