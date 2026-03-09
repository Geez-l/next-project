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

