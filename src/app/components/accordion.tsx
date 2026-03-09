import { Accordion, AccordionBody } from "react-bootstrap";

type Props = {
    item : {
        key: string;
        title: string;
        body: string;
    };
    // activeKey: string | null;
    isOpen: boolean;
    onToggle: () => void;
};

export default function AccordionComponent({item, isOpen, onToggle}: Props) {

    return(
        <Accordion.Item
        eventKey={item.key}>
            <Accordion.Header onClick={onToggle}>
                <div>{item.title}
                    {!isOpen && (
                        <small style={{
                            display:"block",
                            fontWeight:"normal",
                            fontSize: "0.9rem"
                        }}>Press to see</small>
                    )}
                </div>
            </Accordion.Header>
            <Accordion.Body>
                {item.body}
            </Accordion.Body>
        </Accordion.Item>
    );
}
