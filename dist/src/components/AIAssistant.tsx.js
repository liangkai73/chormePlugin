import { createHotContext as __vite__createHotContext } from "/vendor/vite-client.js";import.meta.hot = __vite__createHotContext("/src/components/AIAssistant.tsx.js");import __vite__cjsImport0_react_jsxDevRuntime from "/vendor/.vite-deps-react_jsx-dev-runtime.js__v--1078ade8.js"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
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
  window.$RefreshReg$ = RefreshRuntime.getRefreshReg("/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx");
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
var _s = $RefreshSig$();
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--1078ade8.js"; const useState = __vite__cjsImport3_react["useState"];
import { callAIService } from "/src/services/aiService.ts.js";
const AIAssistant = () => {
  _s();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = {
      role: "user",
      content: input
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await callAIService(input);
      const assistantMessage = {
        role: "assistant",
        content: response
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: "抱歉，发生了错误，请稍后再试。"
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-auto mb-4 p-2 bg-white rounded border", children: messages.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center text-gray-400 mt-4", children: "向 AI 助手提问，获取即时帮助" }, void 0, false, {
      fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
      lineNumber: 71,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: messages.map(
      (msg, index) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `p-2 rounded-lg ${msg.role === "user" ? "bg-blue-100 ml-4" : "bg-gray-100 mr-4"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-semibold", children: [
              msg.role === "user" ? "您" : "AI 助手",
              ":"
            ] }, void 0, true, {
              fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
              lineNumber: 85,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "whitespace-pre-wrap", children: msg.content }, void 0, false, {
              fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
              lineNumber: 88,
              columnNumber: 17
            }, this)
          ]
        },
        index,
        true,
        {
          fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
          lineNumber: 77,
          columnNumber: 11
        },
        this
      )
    ) }, void 0, false, {
      fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
      lineNumber: 75,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("form", { onSubmit: handleSubmit, className: "flex", children: [
      /* @__PURE__ */ jsxDEV(
        "input",
        {
          type: "text",
          value: input,
          onChange: (e) => setInput(e.target.value),
          placeholder: "输入您的问题...",
          className: "flex-1 px-4 py-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500",
          disabled: isLoading
        },
        void 0,
        false,
        {
          fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
          lineNumber: 96,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          type: "submit",
          className: "bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300",
          disabled: isLoading || !input.trim(),
          children: isLoading ? "..." : "发送"
        },
        void 0,
        false,
        {
          fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
          lineNumber: 104,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
      lineNumber: 95,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx",
    lineNumber: 68,
    columnNumber: 5
  }, this);
};
_s(AIAssistant, "sVGGnSpJyr44tGn0fmOMIwNVzbg=");
_c = AIAssistant;
export default AIAssistant;
var _c;
$RefreshReg$(_c, "AIAssistant");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/lanck/work/lf/chromPlugin/src/components/AIAssistant.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
