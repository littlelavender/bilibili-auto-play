let bnp_options = {
  ck_enable: true,
  ck_multi_page: true,
  ck_sections: true,
  ck_reco: false,
  video_type: 0, //0123
  last_tab_id: '',
}

chrome.runtime.onInstalled.addListener(() => {  
  chrome.storage.sync.set({ bnp_options })
  console.log('保存配置: ', bnp_options)
})

// 打开新标签栏，地址栏直接输入
chrome.webNavigation.onDOMContentLoaded.addListener(async ({ tabId, url }) => {
  console.log('onDOMContentLoaded')
  console.log(tabId)
  console.log(url);

  // 重置video_type，每个tab只重置一次
  let { bnp_options } = await chrome.storage.sync.get('bnp_options');
  if (!bnp_options.last_tab_id || bnp_options.last_tab_id != tabId) {
    console.log('重置video_type')
    bnp_options.video_type = 0;
    bnp_options.last_tab_id = tabId;
    chrome.storage.sync.set({ bnp_options });
    chrome.runtime.sendMessage({ type: 'change_video_type', value: 0 })
  }

  if (url.indexOf('https://www.bilibili.com/video/') == -1) {
    return;
  }
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['script.js']
  });
});

// 点击其他视频
chrome.webNavigation.onHistoryStateUpdated.addListener(async ({ tabId, url }) => {
  console.log('onHistoryStateUpdated')
  console.log(tabId)
  console.log(url);

  let { bnp_options } = await chrome.storage.sync.get('bnp_options');
  if (!bnp_options.last_tab_id || bnp_options.last_tab_id != tabId) {
    console.log('重置video_type')
    bnp_options.video_type = 0;
    bnp_options.last_tab_id = tabId;
    chrome.storage.sync.set({ bnp_options });
    chrome.runtime.sendMessage({ type: 'change_video_type', value: 0 })
  }

  if (url.indexOf('https://www.bilibili.com/video/') == -1) {
    return;
  }
  chrome.scripting.executeScript({
    target: { tabId },
    files: ['script.js']
  });
});
