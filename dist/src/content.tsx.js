import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--1078ade8.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/vendor/.vite-deps-react.js__v--1078ade8.js"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react;
import __vite__cjsImport2_reactDom_client from "/vendor/.vite-deps-react-dom_client.js__v--13fb8fd1.js"; const ReactDOM = __vite__cjsImport2_reactDom_client.__esModule ? __vite__cjsImport2_reactDom_client.default : __vite__cjsImport2_reactDom_client;
import "/src/index.css.js";
import ContentApp from "/src/components/ContentApp.tsx.js";
import { getChromeApi } from "/src/utils/chromeApiMock.ts.js";
import "/src/utils/mockContextMenu.ts.js";
const createAssistantContainer = () => {
  const existingContainer = document.getElementById("ai-assistant-container");
  if (!existingContainer) {
    const container2 = document.createElement("div");
    container2.id = "ai-assistant-container";
    document.body.appendChild(container2);
    container2.style.position = "fixed";
    container2.style.bottom = "20px";
    container2.style.right = "20px";
    container2.style.width = "350px";
    container2.style.height = "500px";
    container2.style.zIndex = "9999";
    container2.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)";
    container2.style.borderRadius = "8px";
    container2.style.overflow = "hidden";
    const root = ReactDOM.createRoot(container2);
    root.render(
      /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(ContentApp, {}, void 0, false, {
        fileName: "/Users/lanck/work/lf/chromPlugin/src/content.tsx",
        lineNumber: 34,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "/Users/lanck/work/lf/chromPlugin/src/content.tsx",
        lineNumber: 33,
        columnNumber: 7
      }, this)
    );
    return container2;
  }
  return existingContainer;
};
const container = createAssistantContainer();
const setupMessageListener = () => {
  const chromeApi = getChromeApi();
  chromeApi.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleAssistant") {
      if (container.style.display === "none") {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
      sendResponse({ success: true });
    } else if (message.action === "analyzeText" && message.text) {
      console.log("分析文本:", message.text);
      sendResponse({ success: true });
    }
    return true;
  });
};
if (typeof document !== "undefined") {
  setupMessageListener();
}
