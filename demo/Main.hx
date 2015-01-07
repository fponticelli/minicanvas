import thx.color.*;

class Main {
  public static function main() {
    MiniCanvas.displayGenerationTime = true;

    new MiniCanvas(200, 200)
      .checkboard()
      .display("checkboard");

    new MiniCanvas(200, 200)
      .checkboard()
      .box(function(x, y) : RGBA
        return HSLA.create(x * 360, 1, y, 0.75))
      .display("rainbowAlpha");

    new MiniCanvas(200, 200)
      .box(function(x, y) : RGBA
        return HSL.create(x * 360, 1, y))
      .display("rainbow");

    new MiniCanvas(200, 20)
      .gradientHorizontal(function(x) : RGBA
        return HSV.create(x * 360, 1, 1))
      .display("gradientHorizontal");

    new MiniCanvas(20, 200)
      .gradientVertical(function(y) : RGBA
        return HSV.create(y * 360, 1, 1))
      .display("gradientVertical");

    var red   = HSL.create(340, 0.5, 0.5),
        green = HSL.create(120, 0.5, 0.5);

    new MiniCanvas(200, 90)
      .palette([[
        red.analogous().left,
        red,
        red.analogous().right
      ], [
        green.split().left,
        green,
        green.split().right
      ]])
      .display("palette");

    new MiniCanvas(200, 200)
      .grid()
      .cross()
      .display("grid");

    new MiniCanvas(200, 200)
      .checkboard()
      .onMove(function(e) {
        e.mini.dot(e.x, e.y);
      })
      .onTrail(function(e) {
        e.mini.line(e.x0, e.y0, e.x1, e.y1);
      })
      .click(20, 30)
      .move(20, 30, 150, 10)
      .move(150, 10, 5, 190)
      .display("events");
  }
}