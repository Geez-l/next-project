"use client";
import "../css/01-react-basics-css/01.css";
import "../css/dot.css";
import BreadCrumbsUI from "../components/conditional_rendering/breadcrumb";
import { Spinner } from "react-bootstrap";
import CheckBoxUI from "../components/conditional_rendering/02-react-intermediate/checkbox";
import PaginationUI from "../components/conditional_rendering/02-react-intermediate/pagination";

export default function ReactIntermediate() {
  return (
    <main className="container py-4">
      <div className="header-title text-center py-xl-4 text-muted">
        <h1>React Intermediate</h1>
        <p>This section introduces the intermediate aspects of React.</p>
      </div>
      <section>
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="dots-spinner">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </section>
      <section>
        <div className="d-flex flex-wrap gap-4 justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <Spinner animation="grow" variant="secondary" />
          <Spinner animation="border" variant="success" />
          <Spinner animation="grow" variant="warning" />
        </div>
      </section>
      <section>
        <div className="material-section">
          <h2 className="py-1 align-content-start">1. Breadcrumbs</h2>
          <div className="highlight py-md-4">
            <strong>Definition:</strong> In web development, particularly with
            frameworks like React, the .map() method is commonly used to
            dynamically render a list of images based on an array of data (e.g.,
            an array of image source paths).
          </div>
          <BreadCrumbsUI />
        </div>
      </section>
      <section className="py-5">
        <div className="material-section">
          <h2 className="py-1 align-content-start">2. Checkbox</h2>
          <div className="highlight py-md-4">
            <strong>Definition:</strong> A checkbox in Next.js is a standard
            HTML form control, typically implemented as a React component that
            leverages React's state management for interactivity. It allows
            users to select one or more options from a list or toggle a binary
            (yes/no, on/off) setting.
          </div>
          <CheckBoxUI />
        </div>
      </section>
      <section className="py-5">
        <div className="material-section">
          <h2 className="py-1 align-content-start">3. Pagination</h2>
          <div className="highlight py-md-4">
            <strong>Definition:</strong> Implementing pagination in Next.js
            typically involves using URL query parameters to manage the current
            page and fetching data on the server side for better performance and
            SEO. This approach allows users to share and bookmark specific pages
          </div>
          <PaginationUI />
        </div>
      </section>
    </main>
  );
}
