import { useState } from "react";
import { Accordion, AccordionItem } from "react-bootstrap";
import "../css/01-react-basics-css/01.css";
import { title } from "process";
import AccordionComponent from "../components/accordion";

export default function ConditionalRendering(){

    const content = [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    ];
//    const showSubtitle: boolean = true;
      const showSubtitle = true;

    // for the state-based conditional rendering
    const [activeKey, setActiveKey] = useState<string | null>(null);
    // const [activeKey1, setActiveKey1] = useState<string | null | undefined>(
    //   undefined,
    // );
    const [activeKey1, setActiveKey1] = useState<string | null>(null);

    const [openKeys, setOpenKeys] = useState<string[]>([]);

    const toggleKeys = (key:string) => {
      setOpenKeys((prev: string[]) => 
      prev.includes(key) ? prev.filter((k) => k !==key) : [...prev, key]
    );
    };

    // for the step 3 of .map()
    const accordionItems = content.map((text1, idx1) => ({
      key: idx1.toString(),
      title: `Accordion ${idx1 + 1}`,
      body: text1
    }) );

    return (
      <main>
        {/* Accordion Design*/}
        <section>
          <Accordion>
            {content.map((text, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>
                  <div>
                    <div>Accordion {idx + 1}</div>
                    {/* Conditional rendering: if subtitle is true, render the div and if false: render nothing */}
                    {showSubtitle && (
                      <small style={{ display: "block", fontWeight: "normal" }}>
                        Press to see
                      </small>
                    )}
                    <Accordion.Body>{text}</Accordion.Body>
                  </div>
                </Accordion.Header>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>
        {/* Conditional rendering where the press to see disappears */}
        <section>
          <Accordion>
            {content.map((text, idx) => (
              <Accordion.Item eventKey={idx.toString()} key={idx}>
                <Accordion.Header>
                  <div>
                    <div>Accordion {idx + 1}</div>
                    {/* Conditional rendering: if subtitle is true, render the div and if false: render nothing */}
                    {showSubtitle && (
                      <small style={{ display: "block", fontWeight: "normal" }}>
                        Press to see
                      </small>
                    )}
                    <Accordion.Body>{text}</Accordion.Body>
                  </div>
                </Accordion.Header>
              </Accordion.Item>
            ))}
          </Accordion>
        </section>

        <section className="py-5">
          <h2 className="py-1 align-content-start">3. Accordion optimized</h2>
          <div className="highlight py-md-4">
            <strong>Definition:</strong> utilized .map wih implicit return.
          </div>
          <Accordion
            activeKey={activeKey1}
            onSelect={(key) => {
              if (typeof key === "string" || key === null) {
                setActiveKey1(key);
              }
            }}
          >
            {content.map((text1, idx1) => {
              const key = idx1.toString();
              const isOpen = activeKey1 === key;

              return (
                <Accordion.Item eventKey={key} key={key}>
                  <Accordion.Header>
                    <div>
                      Accordion {idx1 + 1}{" "}
                      {/* Show subtitle only when closed */}
                      {!isOpen && (
                        <small
                          style={{
                            display: "block",
                            // marginLeft: "10px",
                            fontWeight: "normal",
                            fontSize: "0.9rem",
                          }}
                        >
                          Press to see
                        </small>
                      )}
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>{text1}</Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </section>

        {/* Preparing the data before mapping */}
        <section className="py-5">
          <h2 className="py-1 align-content-start">3. Accordion optimized </h2>
          <div className="highlight py-md-4">
            <strong>Definition:</strong> Accordion optimized by preparing the
            data before the map
          </div>

          <Accordion
            activeKey={activeKey1}
            onSelect={(key) => {
              if (typeof key === "string" || key === null) {
                setActiveKey1(key);
              }
            }}
          >
            {accordionItems.map((item) => {
              const isOpen = activeKey1 === item.key;

              return (
                <Accordion.Item eventKey={item.key} key={item.key}>
                  <Accordion.Header>
                    <div>
                      {item.title}
                      {/* Show subtitle only when closed */}
                      {!isOpen && (
                        <small
                          style={{
                            display: "block",
                            // marginLeft: "10px",
                            fontWeight: "normal",
                            fontSize: "0.9rem",
                          }}
                        >
                          Press to see
                        </small>
                      )}
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>{item.body}</Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </section>

        {/* Cleanest way to display accordion */}
        <section className="py-5">
          <h2 className="py-1 align-content-start">3. Accordion optimized and used as component</h2>
          <div className="highlight py-md-4">
            <strong>Definition:</strong> Accordion optimized having it as a component and be called in this code.
          </div>
          <Accordion flush>
            {accordionItems.map((item) => (
              <AccordionComponent
              key={item.key}
              item={item}
              // activeKey={activeKey}
              isOpen={openKeys.includes(item.key)}
              onToggle={() => toggleKeys(item.key)}
              />
            ))
          }
          </Accordion>      
        </section>
      </main>
    );
}