"use client"
import HomeCards from "./components/cards";
import "./css/cards.css";

import { useEffect, useState } from "react";

export default function Home() {

  const fullText = " This is a compilation of things to learn and explore in the world of web development, covering a wide range of topics from React basics to advanced concepts."
  const typingSpeed=50;
  const deletingSpeed=30;
  const pauseTime=1200;

  
  const [displayText, setDisplayedText] = useState("");
  const [isDeleting, setDeleting] = useState(false)
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let timeout;

    if (!isDeleting && index < text.length) {
      timeout = setTimeout()
    }
    if (index < fullText.length){
      const timeout = setTimeout(() =>{
        // setDisplayedText((prev) => prev + fullText[index]);
        setIndex((prev) => prev + 1);
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [index, fullText]);
  return (
        <div className="container-fluid align-content-center py-4">
          <h2 className="text-center fs-1" style={{ fontSize: "2.5rem" }}>
            Welcome
          </h2>
          <p className="home-description text-center text-muted fs-5">
            {displayText}
            <span className="cursor"></span>
          </p>
          <div>
            <HomeCards />
          </div>
        </div>
  );
}
