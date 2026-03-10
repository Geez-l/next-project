import "../css/01-react-basics-css/01.css";
import "../css/dot.css";
import { Spinner } from "react-bootstrap";

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
        </div>
      </section>
    </main>
  );
}
