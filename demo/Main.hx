import thx.color.*;

class Main {
  public static function main() {
    new MiniCanvas(200, 200)
      .checkboard()
      .display("checkboard");

    new MiniCanvas(200, 200)
      .checkboard()
      .box(function(x, y) : RGBA {
        return HSLA.create(x * 360, 1, y, 0.75);
      })
      .display("rainbow-alpha");

    new MiniCanvas(200, 200)
      .box(function(x, y) : RGBA {
        return HSL.create(x * 360, 1, y);
      })
      .display("rainbow");
  }
}