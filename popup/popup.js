console.log('popup run')
let options = {}
let ck_enable = document.getElementById('ck_enable');
let ck_multi_page = document.getElementById('ck_multi_page');
let ck_sections = document.getElementById('ck_sections');
let ck_reco = document.getElementById('ck_reco');
let video_type = document.getElementById('video_type');

chrome.storage.sync.get('bnp_options', ({ bnp_options }) => { 
  console.log('popup获取配置', bnp_options)
  options = bnp_options;
  ck_enable.checked = options.ck_enable;
  ck_multi_page.checked = options.ck_multi_page;
  ck_sections.checked = options.ck_sections;
  ck_reco.checked = options.ck_reco;
  handleVideoType(options.video_type);
  if (!ck_enable.checked) {
    ck_multi_page.disabled = true;
    ck_sections.disabled = true;
    ck_reco.disabled = true;
  }
})

function handleVideoType (video_type_option) {
  let video_type_desc = '';
  if (video_type_option == 1) {
    video_type_desc = '视频选集(分P)'
  } else if (video_type_option == 2) {
    video_type_desc = '视频合集'
  } else if (video_type_option == 3) {
    video_type_desc = '推荐视频'
  } else {
    video_type_desc = '当前不是视频页'
  }
  video_type.innerText = video_type_desc
}

ck_enable.addEventListener('change', () => {
  console.log('改变启用状态, checked=' + ck_enable.checked);
  if (!ck_enable.checked) {
    ck_multi_page.disabled = true;
    ck_sections.disabled = true;
    ck_reco.disabled = true;
  } else {
    ck_multi_page.disabled = false;
    ck_sections.disabled = false;
    ck_reco.disabled = false;
  }
  options.ck_enable = ck_enable.checked;
  chrome.storage.sync.set({ 
    bnp_options: options,
  })
});

ck_multi_page.addEventListener('change', async () => {
  console.log('改变视频选集状态, checked=' + ck_multi_page.checked);
  options.ck_multi_page = ck_multi_page.checked;
  chrome.storage.sync.set({ 
    bnp_options: options
  })
  await runScript();
});

ck_sections.addEventListener('change', async () => {
  console.log('改变视频合集状态, checked=' + ck_sections.checked);
  options.ck_sections = ck_sections.checked;
  chrome.storage.sync.set({ 
    bnp_options: options
  })
  await runScript();
});

ck_reco.addEventListener('change', async () => {
  console.log('改变推荐视频状态, checked=' + ck_reco.checked);
  options.ck_reco = ck_reco.checked;
  chrome.storage.sync.set({ 
    bnp_options: options
  })
  await runScript();
});

async function runScript() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['script.js']
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendMessage) => {
  console.log('popup.js receive message', request);
  console.log(request)
  if (request.type == 'change_video_type') {
    handleVideoType(request.value)
  }
});
