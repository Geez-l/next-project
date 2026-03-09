import { useState } from "react";
import { Accordion, AccordionItem } from "react-bootstrap";
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
     
        <section> 
            <Accordion
                activeKey={activeKey1} 
                onSelect={(key) => {
                    if (typeof key === "string" || key === null){
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
      </main>
    );
}