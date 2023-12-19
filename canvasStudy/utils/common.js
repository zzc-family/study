function drawRoundedRect(x, y, width, height, r = 5, color = "#000") {
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
}
