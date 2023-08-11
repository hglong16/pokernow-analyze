import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/Demo/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content");

const pageDiv = document.querySelector("#page")
const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
pageDiv.insertBefore(root, pageDiv.firstChild);

createRoot(root).render(<App />);
