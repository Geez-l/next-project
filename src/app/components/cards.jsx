"use client";
import Image from "next/image";
import "@/app/css/sidebar.css";
import { useState } from "react";
import Link from "next/link";
import React from "react";
import { Card } from "react-bootstrap";
import {Col, Row} from "react-bootstrap";


export default function HomeCards(){
    return (
      <section className="py-3 mb-5">
        <Row className="d-flex justify-content-evenly ">
          <Card
            className="mb-3"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "0.5rem",
              flexDirection: "column",
            }}
          >
            <Card.Body>
              {/* <Card.Title className="fs-3">
                        Web Development
                    </Card.Title> */}
              <div className="icon-wrapper mb-4 d-flex justify-content-center py-lg-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-bookmark-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4" />
                </svg>
              </div>
              <Card.Text className="service-title fs-4 text-center mb-3">
                Learning & Reference
              </Card.Text>
              <p className="service-text text-center mb-0 text-muted">
                {" "}
                Explore and quick reference material when developing websites.
              </p>
            </Card.Body>
          </Card>

          <Card
            className="mb-3"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "0.5rem",
              flexDirection: "column",
            }}
          >
            <Card.Body>
              {/* <Card.Title className="fs-3">
                        Web Development
                    </Card.Title> */}
              <div className="icon-wrapper mb-4 d-flex justify-content-center py-lg-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-calendar-event"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              </div>
              <Card.Text className="service-title fs-4 text-center mb-3">
                Save Time
              </Card.Text>
              <p className="service-text text-center mb-0 text-muted">
                {" "}
                Documentation saves time and energy by having quick access. 
              </p>
            </Card.Body>
          </Card>

          <Card
            className="mb-3"
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "0.5rem",
              flexDirection: "column",
            }}
          >
            <Card.Body>
              {/* <Card.Title className="fs-3">
                        Web Development
                    </Card.Title> */}
              <div className="icon-wrapper mb-4 d-flex justify-content-center py-lg-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="currentColor"
                  className="bi bi-laptop"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5" />
                </svg>
              </div>
              <Card.Text className="service-title fs-4 text-center mb-3">
                Web Development 
              </Card.Text>
              <p className="service-text text-center mb-0 text-muted">
                {" "}
                Compilation of frontend, backend and database knowledge. 
              </p>
            </Card.Body>
          </Card>
        </Row>
      </section>
    );
}