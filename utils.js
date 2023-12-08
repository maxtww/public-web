// ==================== 通过宽度判断使用PC还是mobile样式 start ====================
// 是否是PC
let isPC = true;
// 屏幕可视宽度
let clientWidth = document.body.clientWidth;
/**
 * 通过宽度判断显示pc样式，还是移动端样式
 */
function checkWidth() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  let $el = document.querySelector("html");
  let isPcClass = $el.classList.contains("pc-style");
  let isMobileClass = $el.classList.contains("mobile-style");
  //
  // PC端
  if (clientWidth > (749 - scrollbarWidth)) {
    if (!isPcClass) {
      $el.classList.remove("mobile-style");
      $el.classList.add("pc-style");
    }
    isPC = true;
  }
  // 移动端
  else if (clientWidth <= 749) {
    if (!isMobileClass) {
      $el.classList.remove("pc-style");
      $el.classList.add("mobile-style");
    }
    isPC = false;
  }
  return isPC;
}
window.isPC = checkWidth();
/**
 * 监听页面尺寸发生变化
 */
window.addEventListener("resize", function () {
  // 实时监听浏览器窗口宽度
  clientWidth = document.body.clientWidth;
  window.isPC = checkWidth();
});
// ==================== 通过宽度判断使用PC还是mobile样式 end ====================

// ==================== 基于Jq的锚点平滑过渡 start ====================
$('a[href*="#"]:not([href="#"])').click(function () {
  if (
    location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      700
    );
    return false;
  }
});

// ==================== 基于Jq的锚点平滑过渡 end ====================

// ==================== 禁止IOS双击放大网页 start ====================
// 缩放
try {
  // 禁用双击缩放
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  var lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      var now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
  // 禁用双指手势操作
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
} catch (error) { }
// ==================== 禁止IOS双击放大网页 end ====================
// ==================== 通用数字滚动 start ====================
// 判断是否有要滚动的数字，有的话给每个元素添加 data-scroll 属性
// 该属性用于判断元素是否滚动过
if ($(".scrolling-numbers").length > 0) {
  // jq设置属性如果是布尔值的话，需要使用prop不能使用attr
  $(".scrolling-numbers").prop("data-scroll", true);
}
// 窗口滚动事件
$(window).scroll(function () {
  // 当前滚动条距离顶部的距离
  let scrollTop = $(window).scrollTop();
  // 如果有要滚动的数字
  if ($(".scrolling-numbers").length > 0) {
    // 遍历滚动的数字元素
    $(".scrolling-numbers").each(function () {
      // 如果屏幕滚动到该元素可视范围，且该元素 data-scroll 属性为true(数字未滚动过)，则执行滚动数字动画
      if (
        scrollTop > $(this).offset().top - 824 &&
        $(this).prop("data-scroll")
      ) {
        let num = parseInt($(this).text());
        $(this).animateNumber({ number: num }, 2000);
        // 数字只滚动一次，执行过滚动动画后，把元素 data-scroll 属性设置为 false
        $(this).prop("data-scroll", false);
      }
    });
  }
});
// ==================== 通用数字滚动 end ====================
// ==================== 置顶按钮 start ====================
$("#goto-top").click(function () {
  $("html,body").animate(
    {
      scrollTop: 0,
    },
    500
  );
});
$("#goto-top2").click(function () {
  $("html,body").animate(
    {
      scrollTop: 0,
    },
    500
  );
});
// 监听页面滚动
$(document).scroll(function () {
  //
  if ($(window).scrollTop() >= $(window).height()) {
    $("#goto-top").addClass("show");
  } else {
    $("#goto-top").removeClass("show");
  }
});
// ==================== 置顶按钮 end ====================
// ==================== 通用swiper切换初始化 start ====================
function initSwiperTab(id, el, pagination, option) {
  this.id = id;
  this.el = $(el);
  this.isPC = window.isPC;
  this.spaceBetween = this.isPC ? 20 : 10;
  this.pagination = pagination;
  this.option = option ? option : {};
  this.even = "click";

  this.init = function () {
    const option = this.option;
    const id = this.id;
    const el = this.el;
    const spaceBetween = this.spaceBetween;
    const pagination = this.pagination;
    const even = this.even;

    let swiperObj;

    if (!$(id).length) return this;

    if (Object.keys(option).length) {
      if (!option.on) {
        option.on = {
          slideChange: function () {
            el.removeClass("active");
            el.eq(this.activeIndex).addClass("active");
          },
          init: function () {
            el.eq(0).addClass("active");
          },
        };
      }
      swiperObj = new Swiper(id, option);
    } else {
      swiperObj = new Swiper(id, {
        preventClicks: false,
        allowTouchMove: false,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        autoHeight: true,
        spaceBetween:spaceBetween,
        speed: 1000,
        on: {
          slideChange: function () {
            el.removeClass("active");
            el.eq(this.activeIndex).addClass("active");
          },
          init: function () {
            el.eq(0).addClass("active");
          },
        },
        pagination: {
          el: pagination || "",
          clickable: true,
        },
      });
    }

    el.off();
    el.on(even, function () {
      el.removeClass("active");
      $(this).addClass("active");
      swiperObj.slideTo($(this).index());
    });

    return { data: this, swiper: swiperObj };
  };
}
// ==================== 通用swiper切换初始化 end ====================

