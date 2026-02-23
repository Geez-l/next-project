import Sidebar from "@/app/components/sidebar.jsx";

export default function Home() {
  return (
    <main className="mb-4 py-5">
      {/* <h1 className="mb-4">Hello World</h1> */}

      <section className="mb-4">
        <Sidebar />
      </section>
    </main>
  );
}
