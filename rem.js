// 当前是否是PC访问
$(function () {
  // const isPC = window.isPC;
  /**
   * 自动计算rem方法
   */
  function remRefresh() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    var clientWidth = document.documentElement.clientWidth;
    if (window.isPC) {
      document.documentElement.style.fontSize = "";
      document.querySelector("body").style.fontSize = "";
      if (clientWidth < 1680 && clientWidth > 749 - scrollbarWidth) {
        let rem = clientWidth / 32;
        document.documentElement.style.fontSize = rem + "px";
      }
    } else {
      // if (clientWidth < 1100) {
      // }
      let rem = clientWidth / 6.25;
      document.documentElement.style.fontSize = rem + "px";
    }
  }
  // 立即执行一遍
  remRefresh();

  window.addEventListener("pageshow", function () {
    remRefresh();
  });

  // 函数防抖
  // let timeoutId;
  window.addEventListener("resize", function () {
    // timeoutId && clearTimeout(timeoutId);
    // timeoutId = setTimeout(() => {
    //     remRefresh()
    // }, 300)
    remRefresh();
  });
});
