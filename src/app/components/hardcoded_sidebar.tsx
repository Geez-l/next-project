"use client";
import Image from "next/image";
import "@/app/css/sidebar.css";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar(){
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="layout-wrapper d-flex">
        <nav
          className={`sidebar d-flex flex-column ${collapsed ? "collapsed" : ""}`}
        >
          {/* TOGGLE */}
          <button
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i
              className={`fas ${collapsed ? "fa-chevron-right" : "fa-chevron-left"}`}
            ></i>
          </button>

          {/* LOGO */}
          <div className="sidebar-header p-4 flex-shrink-0">
            <h4 className="logo-text fw-bold mb-0">Next Project</h4>
            <p className="text-muted small hide-on-collapse">Dashboard</p>
          </div>

          {/* NAVIGATION & SCROLLABLE*/}
          <div className="sidebar-navigation">
            <Link
              href="/"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-home me-3"></i>
              <span className="hide-on-collapse">Home</span>
            </Link>
            {/* 01-react-basics */}
            <Link
              href="/01-react-basics"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-chart-bar me-3"></i>
              <span className="hide-on-collapse">React Basics</span>
            </Link>

            {/* 02-react-immediate */}
            <Link
              href="/02-react-intermediate"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-users me-3"></i>
              <span className="hide-on-collapse">React Intermediate</span>
            </Link>
            {/* 03-data-handling */}
            <Link
              href="/03-data-handling"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-database me-3"></i>
              <span className="hide-on-collapse">Data Handling </span>
            </Link>

            {/* 04-nexjs-rendering */}
            <Link
              href="/04-nextjs-rendering"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-server me-3"></i>
              <span className="hide-on-collapse">Next.js Rendering</span>
            </Link>

            {/* 05-backend basics */}
            <Link
              href="/05-backend-basics"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-code me-3"></i>
              <span className="hide-on-collapse">Backend Basics</span>
            </Link>

            {/* 06-database */}
            <Link
              href="/06-database"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-database me-3"></i>
              <span className="hide-on-collapse">Database</span>
            </Link>

            {/* 07-authentication */}
            <Link
              href="/07-authentication"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-lock me-3"></i>
              <span className="hide-on-collapse">Authentication</span>
            </Link>

            {/* 08-common-functionalities */}
            <Link
              href="/08-common-functionalities"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-cogs me-3"></i>
              <span className="hide-on-collapse">Common Functionalities</span>
            </Link>

            {/* 09-performance */}
            <Link
              href="/09-performance"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-tachometer-alt me-3"></i>
              <span className="hide-on-collapse">Performance</span>
            </Link>

            {/* 10-deployment */}
            <Link
              href="/10-deployment"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-rocket me-3"></i>
              <span className="hide-on-collapse">Deployment</span>
            </Link>

            {/* 11-bootstrap */}
            <Link
              href="/11-bootstrap"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-paint-brush me-3"></i>
              <span className="hide-on-collapse">Bootstrap</span>
            </Link>

            {/* 12-advanced */}
            <Link
              href="/12-advanced"
              className="sidebar-link active text-decoration-none p-3"
            >
              <i className="fas fa-graduation-cap me-3"></i>
              <span className="hide-on-collapse">Advanced Topics</span>
            </Link>
          </div>

          {/* Profile Section */}
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

