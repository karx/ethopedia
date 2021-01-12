document.addEventListener("keypress", function(e) {
  if (e.key === 'f') {
    console.log('Toggle FS');
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.getElementById('page-model').requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}