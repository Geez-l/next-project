"use client";
import "@/app/css/01-react-basics-css/01.css";
import { Row, Col } from "react-bootstrap";
import Image from "next/image";
import baguetteBox from "baguettebox.js";
import "baguettebox.js/dist/baguetteBox.min.css";
import { useEffect } from "react";

export default function ReactBasics() {

  const images = [
    "/assets/gallery/gallery3.jpg",
    "/assets/gallery/gallery3.jpg",
    "/assets/gallery/gallery3.jpg",
    "/assets/gallery/gallery4.jpg",
    "/assets/gallery/gallery3.jpg",
    "/assets/gallery/gallery3.jpg",
  ];
  useEffect(() => {
  import("baguettebox.js").then((baguetteBox) => {
    baguetteBox.default.run(".tz-gallery");
  });
}, []);

  return (
    <main className="container">
      <div className="header-title text-center py-xl-4 text-muted">
        <h1>React Basics</h1>
        <p>This section introduces the basics of React.</p>
      </div>

      <div className="material-section">
        <section className="section">
          <h2 className="py-1 align-content-start">1. Cards</h2>

          <div className="highlight py-md-4">
            <strong>Definition:</strong> a common UI component used to group
            related information into a single, visually distinct container.
          </div>

          <div className="container gallery-container">
            <div className="tz-gallery">
              {/* ROW 1 */}
              <Row className="g-1">
                <Col md={4}>
                  <a href="/assets/gallery/gallery3.jpg" className="lightbox">
                    <Image
                      src="/assets/gallery/gallery3.jpg"
                      alt="Image 1"
                      width={400}
                      height={300}
                      className="img-fluid"
                    />
                  </a>
                </Col>

                <Col md={4}>
                  <a href="/assets/gallery/gallery3.jpg" className="lightbox">
                    <Image
                      src="/assets/gallery/gallery3.jpg"
                      alt="Image 2"
                      width={400}
                      height={300}
                      className="img-fluid"
                    />
                  </a>
                </Col>

                <Col md={4}>
                  <a href="/assets/gallery/gallery3.jpg" className="lightbox">
                    <Image
                      src="/assets/gallery/gallery3.jpg"
                      alt="Image 3"
                      width={400}
                      height={300}
                      className="img-fluid"
                    />
                  </a>
                </Col>
              </Row>

              {/* ROW 2 */}
              <Row className="gx-1 align-items-stretch mt-1">
                {/* BIG IMAGE */}
                <Col md={8} className="d-flex">
                  <a
                    href="/assets/gallery/gallery4.jpg"
                    className="lightbox w-100"
                  >
                    <Image
                      src="/assets/gallery/gallery4.jpg"
                      alt="Image 4"
                      width={800}
                      height={600}
                      className="img-fluid h-100 object-fit-cover"
                    />
                  </a>
                </Col>

                {/* STACKED IMAGES */}
                <Col md={4} className="d-flex flex-column gap-1">
                  <a
                    href="/assets/gallery/gallery3.jpg"
                    className="lightbox flex-fill"
                  >
                    <Image
                      src="/assets/gallery/gallery3.jpg"
                      alt="Image 5"
                      width={400}
                      height={300}
                      className="img-fluid h-100 object-fit-cover"
                    />
                  </a>

                  <a
                    href="/assets/gallery/gallery3.jpg"
                    className="lightbox flex-fill"
                  >
                    <Image
                      src="/assets/gallery/gallery3.jpg"
                      alt="Image 6"
                      width={400}
                      height={300}
                      className="img-fluid h-100 object-fit-cover"
                    />
                  </a>
                </Col>
              </Row>
            </div>
          </div>
          {/* New section for mapping or using array*/}
          <section className="py-5">
            <h2 className="py-1 align-content-start">
              1.1. Cards using Mapping
            </h2>
            <div className="highlight py-md-4">
              <strong>Definition:</strong> In web development, particularly with
              frameworks like React, the .map() method is commonly used to
              dynamically render a list of images based on an array of data
              (e.g., an array of image source paths).
            </div>
            <div className="container gallery-container">
              <div className="tz-gallery">
                {/* ROW 1 */}
                <Row className="g-1">
                  {images.slice(0, 3).map((src, index) => (
                    <Col md={4} key={index}>
                      <a href={src} className="lightbox">
                        <Image
                          src={src}
                          alt={`Image ${index + 1}`}
                          width={400}
                          height={300}
                          className="img-fluid"
                        />
                      </a>
                    </Col>
                  ))}
                </Row>

                {/* ROW 2 */}
                <Row className="gx-1 align-items-stretch mt-1">
                  {/* BIG IMAGE */}
                  <Col md={8} className="d-flex">
                    <a href={images[3]} className="lightbox w-100">
                      <Image
                        src={images[3]}
                        alt="Image 4"
                        width={800}
                        height={600}
                        className="img-fluid h-100 object-fit-cover"
                      />
                    </a>
                  </Col>

                  {/* STACKED IMAGES */}
                  <Col md={4} className="d-flex flex-column gap-1">
                    {images.slice(4, 6).map((src, index) => (
                      <a key={index} href={src} className="lightbox flex-fill">
                        <Image
                          src={src}
                          alt={`Image ${index + 5}`}
                          width={400}
                          height={300}
                          className="img-fluid h-100 object-fit-cover"
                        />
                      </a>
                    ))}
                  </Col>
                </Row>
              </div>
            </div>
          </section>
        </section>
      </div>
      <section className="py-5">
        <div className="material-section">
          <h2 className="py-1 align-content-start">1. Carousel</h2>

          <div className="highlight py-md-4">
            <strong>Definition:</strong> a UI component used to display multiple
            pieces of content (images, text, etc.) within a single, space-saving
            section, allowing users to navigate through them sequentially.
          </div>

        </div>
      </section>
    </main>
  );
}
