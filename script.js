(function() {
  console.log('开始执行')
  let multi_page = document.getElementById("multi_page");
  let video_sections = document.getElementsByClassName("video-sections-v1");
  let base_video_sections = document.getElementsByClassName("base-video-sections-v1");
  if (multi_page) {
    console.log("接下来播放视频选集(分P)")
    let cur_pages = document.getElementsByClassName("cur-page");
    let cur_page = cur_pages[0];
    let cur_page_text = cur_page.innerText; // "(13/27)"
    let sep_index = cur_page_text.indexOf('/')
    let cur_item = parseInt(cur_page_text.substring(1, sep_index));
    let total_item = parseInt(cur_page_text.substring(sep_index + 1, cur_page_text.length - 1));
    let is_last_item = cur_item == total_item;
    console.log("最否后一集" + is_last_item)
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
        document.getElementsByClassName("switch-button")[0].click()
        localStorage.setItem("recommend_auto_play", "close");
      }
    } else {
      if (next_auto_play == "close") {
        console.log("设置为open")
        document.getElementsByClassName("switch-button")[0].click()
        localStorage.setItem("recommend_auto_play", "open");
      }
    }
  } else if (video_sections.length > 0 || base_video_sections.length > 0) {
    console.log("接下来播放系列视频");
    let cur_pages = document.getElementsByClassName("cur-page");
    let cur_page = cur_pages[0];
    let cur_page_text = cur_page.innerText;
    let sep_index = cur_page_text.indexOf('/')
    let cur_item = parseInt(cur_page_text.substring(1, sep_index));
    let total_item = parseInt(cur_page_text.substring(sep_index + 1, cur_page_text.length - 1));
    let is_last_item = cur_item == total_item;
    console.log("最否后一集" + is_last_item)
    let next_auto_play = localStorage.getItem("recommend_auto_play");
    console.log("自动播放是" + next_auto_play)
    if (is_last_item) {
      if (next_auto_play == "open") {
        console.log("设置为close")
        document.getElementsByClassName("switch-button")[0].click()
        localStorage.setItem("recommend_auto_play", "close");
      }
    } else {
      if (next_auto_play == "close") {
        console.log("设置为open")
        document.getElementsByClassName("switch-button")[0].click()
        localStorage.setItem("recommend_auto_play", "open");
      }
    }
  } else { // 推荐列表
    console.log("接下来播放推荐列表");
    let next_auto_play = localStorage.getItem("recommend_auto_play");
    console.log("自动播放是" + next_auto_play)
    if (next_auto_play == "open") {
      console.log("设置为close")
      document.getElementsByClassName("switch-button")[0].click()
      localStorage.setItem("recommend_auto_play", "close");
    }
  }
})()


