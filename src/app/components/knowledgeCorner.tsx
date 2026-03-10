// Three Core UI State Patterns : boolean state, active key state and object state
import { useState } from "react";

// ACTIVE KEY STATE
// tracks which item is currently active (open/selected/expanded)
const [activeKey, setActiveKey] = useState<string | null>(null);

// overview as selected the active tab
const [activeTab, setActiveTab] = useState("overview")
/*
activeKey - [current state value] stores which item is active
setActiveKey - updates the state
<string | null> [typescript typing] - active key can be string or null
null -  at first, nothing is active

Applications:
Tabs - only one tab is selected
Accordion - only one section open
Sidebar menus - only one section expanded
FAQ toggles - one answer visible
Navigation highlight - current page active
Step wizard
Carousel slide
*/

// BOOLEAN
const [isMenuOpen, setIsMenuOpen] = useState(false);
// true or false  - something is on or off
/*
Applications:
Mobile menu open
Modal open 
Sidebar collapsed
Loading state
Dark mode toggles

*/

// MAPS

/*
(1) .map() with implicit return using () parenthesis  
-used when you don't need extra logic inside of them

{content.map((text, idx) => (
<Accordion.Item
    eventKey={ix.toString()} key=idx>
    <Accordion.Header>
    Accordion {idx + 1}
    </Accordion.Header>
    <Accordion.Body>
    {text}
    </Accordion.Body>
</Accordion.Item>
))}

() - means return JSX automatically 
 (text,idx) =>{
    return JSX;
}

(2) .map() with block body (curly braces)
{content.map ((text, idx1) => {
    const key=idx1.toString();
    const isOpen = activeKey1 === key;

    return (
    <Accordion.Item 
    eventKey={key} key={key}>
    </Accordion.Item>
    )
})}

map -> do something -> return JSX

// used the condition
{!isOpen && <small>Press to see</small>}


(3) 

*/
