import "@/app/css/01-react-basics-css/01.css";

export default function ReactBasics() {
  return (
    <main className="container">
      <div className="header-title text-center py-xl-4 text-muted">
        <h1>React Basics </h1>
        <p>This section introduces the basics of React.</p>
      </div>

      <div className="material-section">
        <section className="section">
          <h2 className="py-1 align-content-start">1. Cards </h2>
          <div className="highlight py-md-4">
            <strong>Definition:</strong> a common UI component used to group
            related information into a single, visually distinct container.{" "}
          </div>
        </section>
      </div>
    </main>
  );
}
