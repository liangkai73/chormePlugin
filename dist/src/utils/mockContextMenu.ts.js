import { getChromeApi } from "/src/utils/chromeApiMock.ts.js";
export const setupMockContextMenu = () => {
  if (typeof chrome === "undefined" || !chrome.contextMenus) {
    console.log("Setting up mock context menu for development");
    document.addEventListener("mouseup", () => {
      const selection = window.getSelection()?.toString();
      if (selection && selection.length > 0) {
        showContextMenu(selection);
      }
    });
  }
};
const showContextMenu = (selectedText) => {
  const existingMenu = document.getElementById("mock-context-menu");
  if (existingMenu) {
    existingMenu.remove();
  }
  const menu = document.createElement("div");
  menu.id = "mock-context-menu";
  menu.style.position = "fixed";
  menu.style.zIndex = "10000";
  menu.style.backgroundColor = "white";
  menu.style.border = "1px solid #ccc";
  menu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  menu.style.borderRadius = "4px";
  menu.style.padding = "5px 0";
  const menuItem = document.createElement("div");
  menuItem.innerText = "使用 AI 助手分析选中内容";
  menuItem.style.padding = "8px 12px";
  menuItem.style.cursor = "pointer";
  menuItem.addEventListener("mouseover", () => {
    menuItem.style.backgroundColor = "#f5f5f5";
  });
  menuItem.addEventListener("mouseout", () => {
    menuItem.style.backgroundColor = "transparent";
  });
  menuItem.addEventListener("click", () => {
    const chrome2 = getChromeApi();
    chrome2.runtime.sendMessage({
      action: "analyzeText",
      text: selectedText
    });
    menu.remove();
  });
  menu.appendChild(menuItem);
  const mouseEvent = window.event;
  if (mouseEvent) {
    menu.style.left = `${mouseEvent.clientX}px`;
    menu.style.top = `${mouseEvent.clientY}px`;
  }
  document.body.appendChild(menu);
  const closeMenu = (e) => {
    if (!menu.contains(e.target)) {
      menu.remove();
      document.removeEventListener("click", closeMenu);
    }
  };
  setTimeout(() => {
    document.addEventListener("click", closeMenu);
  }, 100);
};
if (typeof window !== "undefined" && true) {
  setupMockContextMenu();
}
