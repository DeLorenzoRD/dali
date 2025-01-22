let playerMap = {}; // 存储多个 YouTube 播放器实例

// 加载 YouTube Iframe API 后会调用此方法来创建播放器
function onYouTubeIframeAPIReady() {
  // 遍历所有具有 'videoPlayer' 类的 iframe 元素
  document.querySelectorAll('.video-container iframe').forEach(iframe => {
    const playerId = iframe.id;
    playerMap[playerId] = new YT.Player(playerId, {
      events: {
        'onReady': onPlayerReady,  // 播放器准备好时的回调
        'onStateChange': onPlayerStateChange  // 播放器状态变化时的回调
      }
    });
  });
}

// 播放器准备好时调用此方法
function onPlayerReady(event) {
  console.log(`Player ${event.target.getIframe().id} is ready.`);
}

// 播放器状态变化时调用此方法
function onPlayerStateChange(event) {
  console.log(`Player ${event.target.getIframe().id} state changed.`);
}

// 打开视频并自动播放
function openVideo(popupId, playerId) {
  const videoPopup = document.getElementById(popupId);
  const overlay = document.getElementById(`overlay${popupId.slice(-1)}`);
  
  // 显示视频弹窗和遮罩层
  videoPopup.style.display = 'block';
  overlay.style.display = 'block';

  // 自动播放视频
  if (playerMap[playerId] && playerMap[playerId].playVideo) {
    playerMap[playerId].playVideo();
  }

  // 启用 inert 防止焦点进入背景
  overlay.setAttribute('inert', 'true');
}

// 关闭视频并停止播放，将视频归位到最开始的位置
function closeVideo(popupId) {
  const videoPopup = document.getElementById(popupId);
  const overlay = document.getElementById(`overlay${popupId.slice(-1)}`);
  const playerId = videoPopup.querySelector('iframe').id;

  // 将视频回到最开始的位置
  if (playerMap[playerId] && playerMap[playerId].seekTo) {
    playerMap[playerId].seekTo(0);  // 将视频时间设置为 0 秒
  }

  // 停止视频
  if (playerMap[playerId] && playerMap[playerId].pauseVideo) {
    playerMap[playerId].pauseVideo();
  }

  // 隐藏视频弹窗和遮罩层
  videoPopup.style.display = 'none';
  overlay.style.display = 'none';

  // 移除 inert 以恢复交互
  overlay.removeAttribute('inert');
}


// back to top button
function scrollToSection(sectionId) {
 document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}