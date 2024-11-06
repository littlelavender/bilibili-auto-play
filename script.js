(async function() {
  console.log('开始执行')
  let { bnp_options } = await chrome.storage.sync.get('bnp_options');
  console.log('获取配置', bnp_options);
  if (!bnp_options || !bnp_options.ck_enable) {
    return;
  }

  let multi_page = document.getElementsByClassName("video-pod__list multip list");
  let video_sections = document.getElementsByClassName("video-pod__list section");
  if (multi_page.length > 0) {
    console.log("接下来播放视频选集(分P)")
    bnp_options.video_type = 1;
    chrome.storage.sync.set({ bnp_options });
    chrome.runtime.sendMessage({ type: 'change_video_type', value: 1 })
    let cur_page = document.querySelector(".amt");
    let cur_page_text = cur_page.innerText; // "(13/27)"
    let sep_index = cur_page_text.indexOf('/')
    let cur_item = parseInt(cur_page_text.substring(1, sep_index));
    let total_item = parseInt(cur_page_text.substring(sep_index + 1, cur_page_text.length - 1));
    let is_last_item = cur_item == total_item;
    console.log("最否最后一集" + is_last_item)
    let next_auto_play = localStorage.getItem("recommend_auto_play"); // open或close
    console.log("自动播放是" + next_auto_play)
    if (is_last_item) {
      if (next_auto_play == "open") {
        // 仔细分析：
        // 当打开新标签栏时，这个代码在网站js之前执行，这是点击按钮没用，要通过修改localStorage
        // 当切换视频时，网站不会重新读取localStorage，需要通过点击按钮修改
        // 当点击按钮时，会修改localStorage
        // ...
        // 所以先点击按钮，再修改localStorage就可以了 yes
        console.log("设置为close")
        document.querySelector(".switch-btn").click()
        localStorage.setItem("recommend_auto_play", "close");
      }
    } else {
      let option = bnp_options.ck_multi_page ? "open" : "close";
      console.log("播放设置是" + option)
      if (next_auto_play != option) {
        console.log("设置为" + option)
        document.querySelector(".switch-btn").click()
        localStorage.setItem("recommend_auto_play", option);
      }
    }
  } else if (video_sections.length > 0) {
    console.log("接下来播放合集和视频列表");
    bnp_options.video_type = 2;
    chrome.storage.sync.set({ bnp_options });
    chrome.runtime.sendMessage({ type: 'change_video_type', value: 2 })
    let cur_page = document.querySelector(".amt");
    let cur_page_text = cur_page.innerText;
    let sep_index = cur_page_text.indexOf('/')
    let cur_item = parseInt(cur_page_text.substring(1, sep_index));
    let total_item = parseInt(cur_page_text.substring(sep_index + 1, cur_page_text.length - 1));
    let is_last_item = cur_item == total_item;
    console.log("最否最后一集" + is_last_item)
    let next_auto_play = localStorage.getItem("recommend_auto_play");
    console.log("自动播放是" + next_auto_play)
    if (is_last_item) {
      if (next_auto_play == "open") {
        console.log("设置为close")
        document.querySelector(".switch-btn").click()
        localStorage.setItem("recommend_auto_play", "close");
      }
    } else {
      let option = bnp_options.ck_sections ? "open" : "close";
      console.log("播放设置是" + option)
      if (next_auto_play != option) {
        console.log("设置为" + option)
        document.querySelector(".switch-btn").click()
        localStorage.setItem("recommend_auto_play", option);
      }
    }
  } else { // 推荐列表
    console.log("接下来播放推荐列表");
    bnp_options.video_type = 3;
    chrome.storage.sync.set({ bnp_options });
    chrome.runtime.sendMessage({ type: 'change_video_type', value: 3 })
    let next_auto_play = localStorage.getItem("recommend_auto_play");
    console.log("自动播放状态是" + next_auto_play)
    let option = bnp_options.ck_reco ? "open" : "close";
    console.log("播放设置是" + option)
    if (next_auto_play != option) {
      console.log("设置为" + option)
      document.querySelector(".switch-btn").click()
      localStorage.setItem("recommend_auto_play", option);
    }
  }
})()
