import "../css/dot.css";
export default function LoadingPage() {
  return (
    <section>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="dots-spinner">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}
