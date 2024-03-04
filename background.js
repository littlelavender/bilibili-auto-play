let bnp_options = {
  ck_enable: true,
  ck_multi_page: true,
  ck_sections: true,
  ck_reco: false,
  video_type: 0, // 01234
}

chrome.runtime.onInstalled.addListener(() => {  
  chrome.storage.sync.set({ bnp_options })
  console.log('保存配置: ', bnp_options)
})

// 打开新标签栏，地址栏直接输入
chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  if (url.indexOf('https://www.bilibili.com/video/') == -1) {
    return;
  }
  console.log('onDOMContentLoaded')
  console.log(url);
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['script.js']
  });
});

// 点击其他视频
chrome.webNavigation.onHistoryStateUpdated.addListener(async ({ tabId, url }) => {
  if (url.indexOf('https://www.bilibili.com/video/') == -1) {
    return;
  }
  console.log('onHistoryStateUpdated')
  console.log(tabId)
  console.log(url);
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['script.js']
  });
});
