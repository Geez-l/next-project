import HomeCards from "./components/cards";
import "./css/cards.css";

export default function Home() {
  return (
        <div className="container-fluid align-content-center py-4">
          <h2 className="text-center fs-1" style={{ fontSize: "2.5rem" }}>
            Welcome
          </h2>
          <p className="text-muted text-center" style={{ fontSize: "1.2rem" }}>
            This is a compilation of things to learn and explore in the world of
            web development, covering a wide range of topics from React basics
            to advanced concepts.
          </p>
          <div>
            <HomeCards />
          </div>
        </div>
  );
}
