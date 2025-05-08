import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/ContentApp.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--1078ade8.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import * as RefreshRuntime from "/vendor/react-refresh.js";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--1078ade8.js"; const useState = __vite__cjsImport3_react["useState"]; const useEffect = __vite__cjsImport3_react["useEffect"];
import AIAssistant from "/src/components/AIAssistant.tsx.js";
import { getStorageApi } from "/src/utils/chromeApiMock.ts.js";
const ContentApp = () => {
  _s();
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const storage = getStorageApi();
  useEffect(() => {
    storage.sync.get(["enableAutoDisplay"], (result) => {
      setIsOpen(result.enableAutoDisplay !== false);
    });
  }, []);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-white w-full h-full flex flex-col rounded-lg overflow-hidden shadow-lg", children: [
    /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "bg-blue-600 text-white p-2 flex justify-between items-center cursor-move",
        onMouseDown: (e) => {
        },
        children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-medium", children: "AI 助手" }, void 0, false, {
            fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
            lineNumber: 48,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex space-x-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setIsMinimized(!isMinimized),
                className: "p-1 hover:bg-blue-500 rounded",
                children: isMinimized ? "□" : "_"
              },
              void 0,
              false,
              {
                fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
                lineNumber: 50,
                columnNumber: 11
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setIsOpen(false),
                className: "p-1 hover:bg-blue-500 rounded",
                children: "✕"
              },
              void 0,
              false,
              {
                fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
                lineNumber: 56,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
            lineNumber: 49,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
        lineNumber: 42,
        columnNumber: 7
      },
      this
    ),
    !isMinimized && /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-hidden p-4", children: /* @__PURE__ */ jsxDEV(AIAssistant, {}, void 0, false, {
      fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
      lineNumber: 67,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx",
    lineNumber: 41,
    columnNumber: 5
  }, this);
};
_s(ContentApp, "z9ZLxJwC09t58K385ft1raHca7o=");
_c = ContentApp;
export default ContentApp;
var _c;
$RefreshReg$(_c, "ContentApp");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/lanck/work/lf/chromPlugin/src/components/ContentApp.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
