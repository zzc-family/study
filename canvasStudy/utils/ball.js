function Ball(x, y, radius, color) {
  this.x = x || 0;
  this.y = y || 0;
  this.radius = radius || 12;
  this.color = color || "#69f";

  this.scaleX = 1;
  this.scaleY = 1;
}
Ball.prototype = {
  stroke: function (ctx) {
    ctx.save();
    ctx.scale(this.scaleX, this.scaleY);
    ctx.strokeStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke(C);
    ctx.restore();
  },
    fill: function(ctx){
        ctx.save();
        ctx.translate(this.x, this.y)

        ctx.scale(this.scaleX, this.scaleY);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
};
