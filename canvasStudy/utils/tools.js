// TODO：获取鼠标指针位置
window.$ = (id) => document.getElementById(id) || "";
window.tools = {
  drawRoundedRect: function (
    context,
    x,
    y,
    width,
    height,
    r = 5,
    color = "#000"
  ) {
    context.beginPath();
    context.storkeStyle = color;
    context.moveTo(x + r, y);
    context.lineTo(x + width - r, y);
    context.arc(x + width - r, y + r, r, Math.PI * (3 / 2), Math.PI * 2, false);
    context.lineTo(x + width, y + height - r);
    context.arc(x + width - r, y + height - r, r, 0, Math.PI * (1 / 2), false);
    context.lineTo(x + r, y + height);
    context.arc(x + r, y + height - r, r, Math.PI * (1 / 2), Math.PI, false);
    context.lineTo(x, y + r);
    context.arc(x + r, y + r, r, Math.PI, Math.PI * (3 / 2), false);
    context.stroke();
    context.restore();
  },
  getMouse: function (element) {
    let mouse = { x: 0, y: 0 };
    element.addEventListener("mousemove", (e) => {
      let x = (y = 0);
      var e = e || window.event;
      if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
      } else {
        x =
          e.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft;
        y =
          e.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop;
      }

      x = x - element.offsetLeft + 1;
      y = y - element.offsetTop + 1;

      mouse.x = x;
      mouse.y = y;
    });

    return mouse;
  },
  getKey: function () {
    let key = {};
    window.addEventListener("keydown", (e) => {});
  },
  getRandomColor: function () {
    const r = () => Math.floor(Math.random() * 256);
    return `rgb(${r()},${r()},${r()})`;
  },
};

window.requestAnimationFrame =
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callBack) {
    return window.setTimeout(callBack, 1000 / 60);
  };
