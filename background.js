chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    if (current_tab_info.url == "https://bunicorn.game/battle") {
      chrome.tabs.executeScript(null, { file: "./content.js" });
    }
  });
});
