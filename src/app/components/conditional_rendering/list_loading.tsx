"use client";
// import "../../css/01-react-basics-css/01.css";
import "../../css/01-react-basics-css/01.css";
import { Row, Card } from "react-bootstrap";

// For lazy loading and real data
import { useEffect, useState } from "react";

export default function Loading() {

  // For real data
  const [content, setContent] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(true);

  // Simulate API request
  useEffect(() => {

    setTimeout(() => {
      setContent([
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      ]);
      setLoading(false);
    }, 2000)
  }, []);

  return (
    <main>
      <section className="py-5">
        <div className="container py-4">
          {/* Title skeleton */}
          <h1 className="mb-4 placeholder-glow">
            <span className="placeholder col-3"></span>
          </h1>

          {/* List skeleton */}
          <ul className="list-group">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="list-group-item placeholder-glow">
                <span className="placeholder col-10"></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-5">
        <h2 className="py-1 align-content-start">
          3.1. Loading with real data{" "}
        </h2>
        <div className="highlight py-md-4">
          <strong>Definition:</strong> Implementing loading states and lazy
          loading in Next.js offers significant benefits for both user
          experience (UX) and performance, primarily through the use of
          streaming with React Suspense and automatic code-splitting.
        </div>
        <div className="container py-4">
          <h2 className="mb-4">Content</h2>
          <ul className="list-group">
            {isLoading
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <li key={idx} className="list-group-item placeholder-glow">
                    <span className="placeholder col-12 d-block mb-2"></span>
                    <span className="placeholder col-10 d-block mb-2"></span>
                    <span className="placeholder col-8 d-block mb-2"></span>
                    <span className="placeholder col-6 d-block"></span>
                  </li>
                ))
              : content.map((text, idx) => (
                  <li key={idx} className="list-group-item">
                    {text}
                  </li>
                ))}
          </ul>
        </div>
      </section>
      <section className="py-5">
        <h2 className="py-1 align-content-start">3.1. Loading generic </h2>
        <div className="highlight py-md-4">
          <strong>Definition:</strong> Implementing loading states and lazy
          loading in Next.js offers significant benefits for both user
          experience (UX) and performance, primarily through the use of
          streaming with React Suspense and automatic code-splitting.
        </div>

        <div className="container py-4">
          <h2 className="py-1 align-content-start">Page Title </h2>
          {/* Page title */}
          <h2 className="placeholder-glow mb-4">
            <span className="placeholder col-4"></span>
          </h2>
        </div>
      </section>

      {/* Stats cards */}
      <section className="py-5">
        <h2 className="py-1 align-content-start">Stat Cards</h2>
        <div className="row mb-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div className="col-md-3 mb-3" key={idx}>
              <div className="card">
                <div className="card-body placeholder-glow">
                  <h5>
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p>
                    <span className="placeholder col-4 d-block"></span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5">
        <div className="container py-4">
          <h2 className="py-1 align-content-start">Chart </h2>
          {/* Chart skeleton */}
          <div className="card mb-4">
            <div className="card-body placeholder-glow">
              <span
                className="placeholder col-12"
                style={{ height: "200px", display: "block" }}
              ></span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <h2 className="py-1 align-content-start">Table </h2>
        {/* Table skeleton */}
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, idx) => (
              <tr key={idx} className="placeholder-glow">
                <td>
                  <span className="placeholder col-8"></span>
                </td>
                <td>
                  <span className="placeholder col-10"></span>
                </td>
                <td>
                  <span className="placeholder col-6"></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Cards */}
      <section className="py-3 mb-5">
        <h2 className="py-1 align-content-start">Cards </h2>
        <Row className="d-flex justify-content-evenly">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="service-card mb-3"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "0.5rem",
                flexDirection: "column",
              }}
            >
              <Card.Body className="placeholder-glow">
                {/* icon placeholder */}
                <div className="d-flex justify-content-center mb-4 py-lg-3">
                  <span
                    className="placeholder rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  ></span>
                </div>

                {/* title placeholder */}
                <div className="text-center mb-3">
                  <span className="placeholder col-6"></span>
                </div>

                {/* text placeholder */}
                <p className="text-center">
                  <span className="placeholder col-10 d-block mb-2"></span>
                  <span className="placeholder col-8 d-block"></span>
                </p>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </section>
    </main>
  );
}
