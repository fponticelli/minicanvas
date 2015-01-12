import thx.math.random.PseudoRandom;

import thx.color.*;

using thx.core.Iterators;

class Main {
  public static function randomGraph(name : String, width : Int, height : Int, random : Void -> Float) {
    MiniCanvas.create(width, height)
      .fill(0xFFFFFFFF)
      .gridHorizontal(20)
      .border(1)
      .with(function(mini, w, h) {
        var max = 0, min = h, avg = 0.0,
            map = new Map(),
            tot = Math.round(w * h * 0.5),
            r, v;
        for(i in 0...tot) {
          r = Math.floor(random() * w);
          if(map.exists(r)) {
            map.set(r, v = map.get(r) + 1);
          } else {
            map.set(r, v = 1);
          }
          mini.dot(r + 0.5, h - v + 0.5, 0.5, (0.7 - v / h : Grey));
          if(i % 200 == 0)
            mini.storeFrame();
        }
        for(k in map.keys()) {
          v = map.get(k);
          avg += v;
          if(v < min)
            min = v;
          if(v > max)
            max = v;
        }
        avg = avg / w;
        mini
          .storeFrame()
          .lineHorizontal(Math.round(h-min) + 0.5, 1, Color.red)
          .storeFrame()
          .lineHorizontal(Math.round(h-max) + 0.5, 1, Color.green)
          .storeFrame()
          .lineHorizontal(Math.round(h-(max + min)/2) + 0.5, 1, Color.cyan)
          .storeFrame()
          .lineHorizontal(Math.round(h-avg) + 0.5, 1, Color.blue)
          .storeFrame(50);
      })
      .display(name);
  }

  public static function main() {
    MiniCanvas.displayGenerationTime = true;

    randomGraph("pseudoRandom", 200, 200, new PseudoRandom().float);
    //randomGraph("nativeRandom", 200, 200, Math.random);

    MiniCanvas.create(200, 200)
      .checkboard()
      .border(2, 0x000000FF)
      .rect(20, 20, 180, 180, 2, 0xCC7700CC, 0x00CC7766)
      .display("checkboard");

    MiniCanvas.create(200, 200)
      .checkboard(40)
      .dotGrid(10, 10, 1, 0xBBBBBBFF)
      .display("dotgrid");

    MiniCanvas.create(200, 200)
      .checkboard()
      .box(function(x, y) : RGBA
        return HSLA.create(x * 360, 1, y, 0.75))
      .display("rainbowAlpha");

    MiniCanvas.create(200, 200)
      .box(function(x, y) : RGBA
        return HSL.create(x * 360, 1, y))
      .display("rainbow");

    MiniCanvas.create(200, 20)
      .gradientHorizontal(function(x) : RGBA
        return HSV.create(x * 360, 1, 1))
      .display("gradientHorizontal");

    MiniCanvas.create(20, 200)
      .gradientVertical(function(y) : RGBA
        return HSV.create(y * 360, 1, 1))
      .display("gradientVertical");

    var red   = HSL.create(340, 0.5, 0.5),
        green = HSL.create(120, 0.5, 0.5);

    MiniCanvas.create(200, 90)
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

    MiniCanvas.create(201, 201)
      .grid()
      .cross()
      .display("grid");

    MiniCanvas.create(200, 200)
      .checkboard()
      .onDown(function(e)
        e.mini
          .dot(e.x, e.y, 6, "#0066CC")
          .onMove(function(e) e.mini.dot(e.x, e.y))
          .onTrail(function(e) e.mini.line(e.x0, e.y0, e.x1, e.y1)))
      .onUp(function(e)
        e.mini
          .dot(e.x, e.y, 8, "#33CC33")
          .offMove()
          .offTrail())
      .animate()
      .down(30, 170)
      .up(40, 30).sleep(10)
      .down(25, 25)
      .move(100, 90)
      .up(165, 20).sleep(10)
      .down(150, 30)
      .up(165, 170).sleep(40)
      .done()
      .display("events");
  }
}