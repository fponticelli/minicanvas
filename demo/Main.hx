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
  }
}