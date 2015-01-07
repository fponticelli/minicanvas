import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Element;

import thx.color.*;
using thx.core.Floats;
using thx.core.Strings;
import thx.core.Timer;
using thx.core.Nulls;

class MiniCanvas {
  public static var defaultNodeScaleMode = NoScale;
  public static var defaultBrowserScaleMode = Auto;
  public static var displayGenerationTime = false;
  public static var imagePath = 'images';
  public static var parentNode : Element = untyped __js__("typeof document != 'undefined' && document.body");

  public var width(default, null) : Int;
  public var height(default, null) : Int;
  public var scaleMode(default, null) : ScaleMode;
  public var canvas(default, null) : CanvasElement;
  public var ctx(default, null) : CanvasRenderingContext2D;

  var startTime : Float;
  var deltaTime : Float;

  public function new(width : Int, height : Int, ?scaleMode : ScaleMode) {
    this.scaleMode = scaleMode;
    this.width = width;
    this.height = height;
    processScale();
    if(isNode()) {
      initNode();
    } else {
      initBrowser();
    }
    startTime = Timer.time();
  }

  function processScale() {
    scaleMode = null != scaleMode ? scaleMode : isNode() ? defaultNodeScaleMode : defaultBrowserScaleMode;
    switch scaleMode {
      case Auto:
        var ratio = devicePixelRatio() / backingStoreRatio();
        if(ratio != 1)
          scaleMode = Scaled(ratio);
        else
          scaleMode = NoScale;
      case _: // do nothing;
    };
  }

  public function clear() {
    ctx.clearRect(0, 0, width, height);
  }

  public function display(name : String) {
    deltaTime = Timer.time() - startTime;
    if(!displayGenerationTime)
      trace('generated "$name" in ${deltaTime.roundTo(2)}ms');
    if(isNode()) {
      save(name);
    } else {
      append(name);
    }
    return this;
  }

  public function fill(color : RGBA) {
    ctx.fillStyle = color.toCSS3();
    ctx.fillRect(0, 0, width, height);
  }

  // utilities
  public function box(handler : Float -> Float -> RGBA) {
    for(x in 0...width) {
      for(y in 0...height) {
        ctx.fillStyle = handler(x/width, y/height).toCSS3();
        ctx.fillRect(x, y, 1, 1);
      }
    }
    return this;
  }

  public function checkboard(?size : Float = 8, ?light : RGBA, ?dark : RGBA) {
    var cols   = (width / size).ceil(),
        rows   = (height / size).ceil(),
        slight = (null == light ? (Color.white : RGBA) : light).toCSS3(),
        sdark  = (null == dark  ? (Color.lightgrey : RGBA) : dark).toCSS3();
    for(c in 0...cols) {
      for(r in 0...rows) {
        ctx.fillStyle = c % 2 != r % 2 ? slight : sdark;
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
    return this;
  }

  public function palette(colors : Array<Array<RGBA>>, ?padding = 2.0, ?margin = 0.0) {
    var rows = colors.length,
        h    = (height - 2 * margin - (rows - 1) * padding) / rows,
        py   = margin;
    for(row in colors) {
      var cols = row.length,
          w    = (width - 2 * margin - (cols - 1) * padding) / cols,
          px   = margin;
      for(col in row) {
        ctx.fillStyle = col.toCSS3();
        ctx.fillRect(px, py, w, h);
        px += w + padding;
      }
      py += h + padding;
    }
    return this;
  }

  public function cross(?ox : Float, ?oy : Float, ?weight = 1.0, ?color : RGBA) {
    if(null == ox) ox = width / 2;
    if(null == oy) oy = height / 2;
    lineHorizontal(oy, weight, color);
    lineVertical(ox, weight, color);
    return this;
  }

  public function dot(x : Float, y : Float, ?radius = 3.0, ?color : RGBA) {
    ctx.beginPath();
    ctx.fillStyle = color.or(("#cc3300" : RGBA)).toCSS3();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    return this;
  }

  public function line(x0 : Float, y0 : Float, x1 : Float, y1 : Float, ?weight = 1.0, ?color : RGBA) {
    ctx.lineWidth = weight;
    ctx.strokeStyle = color.or((Color.black : RGBA)).toCSS3();
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    return this;
  }

  public function lineHorizontal(offset : Float, ?weight = 1.0, ?color : RGBA)
    return line(0, offset, width, offset, weight, color);

  public function lineVertical(offset : Float, ?weight = 1.0, ?color : RGBA)
    return line(offset, 0, offset, height, weight, color);

  public function gridHorizontal(dy = 10.0, ?weight = 1.0, ?color : RGBA, oy = 0.0) {
    if(dy == 0) throw 'invalid argument dy, should be different from zero';
    if(null == color)
      color = (Color.lightgrey : RGBA);
    var py = oy % dy;
    while(py - weight / 2 <= height) {
      lineHorizontal(py, weight, color);
      py += dy;
    }
    return this;
  }

  public function gridVertical(dx = 10.0, ?weight = 1.0, ?color : RGBA, ox = 0.0) {
    if(dx == 0) throw 'invalid argument dx, should be different from zero';
    if(null == color)
      color = (Color.lightgrey : RGBA);
    var px = ox % dx;
    while(px - weight / 2 <= width) {
      lineVertical(px, weight, color);
      px += dx;
    }
    return this;
  }

  public function grid(dx = 10.0, dy = 10.0, ?weight = 1.0, ?color : RGBA, ox = 0.0, oy = 0.0) {
    gridHorizontal(dy, weight, color, oy);
    gridVertical(dx, weight, color, ox);
    return this;
  }

  public function gradientHorizontal(handler : Float -> RGBA) {
    for(x in 0...width) {
      ctx.fillStyle = handler(x/width).toCSS3();
      ctx.fillRect(x, 0, 1, height);
    }
    return this;
  }

  public function gradientVertical(handler : Float -> RGBA) {
    for(y in 0...height) {
      ctx.fillStyle = handler(y/height).toCSS3();
      ctx.fillRect(0, y, width, 1);
    }
    return this;
  }

  public function context(callback : CanvasRenderingContext2D -> Int -> Int -> Void) {
    callback(ctx, width, height);
    return this;
  }

  public function sample(name : String, callback : CanvasRenderingContext2D -> Int -> Int -> Void) {
    context(callback);
    display(name);
    return this;
  }

  // platform specific
  public static function isNode() : Bool
    return untyped __js__("typeof module !== 'undefined' && module.exports");

  function initBrowser() {
    canvas = js.Browser.document.createCanvasElement();
    switch scaleMode {
      case Scaled(v):
        canvas.width = (width * v).round();
        canvas.height = (height * v).round();
        canvas.style.width = '${width}px';
        canvas.style.height = '${height}px';
        ctx = canvas.getContext2d();
        ctx.scale(v, v);
      case _:
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext2d();
    };
  }

  // browser
  public function append(name : String) {
    var figure = js.Browser.document.createElement("figure"),
        caption = js.Browser.document.createElement("figcaption");
    figure.className = "minicanvas";
    figure.appendChild(canvas);
    caption.innerHTML = name.humanize() + (displayGenerationTime ? ' <span class="info">(${deltaTime.roundTo(2)}ms)</span>' : '');
    figure.appendChild(caption);
    parentNode.appendChild(figure);
  }

  public static function devicePixelRatio() : Float
    return untyped __js__("window.devicePixelRatio || 1");

  static var _backingStoreRatio : Float = 0;
  public static function backingStoreRatio() : Float {
    if(_backingStoreRatio == 0) {
      var canvas = js.Browser.document.createCanvasElement(),
          context = canvas.getContext2d();
      _backingStoreRatio =  untyped __js__("(function(c) {
        return c.webkitBackingStorePixelRatio ||
          c.mozBackingStorePixelRatio ||
          c.msBackingStorePixelRatio ||
          c.oBackingStorePixelRatio ||
          c.backingStorePixelRatio || 1;
        })")(context);
    }
    return _backingStoreRatio;
  }

  // canvas
  public function save(name : String) untyped {
    var fs = require('fs'),
        out = fs.createWriteStream('$imagePath/$name.png'),
        stream = canvas.pngStream();

    stream.on('data', function(chunk) out.write(chunk));
    stream.on('end', function(_) console.log('saved $name.png'));
  }

  function initNode() untyped {
    var Canvas =  require("canvas");
    switch scaleMode {
      case Scaled(v):
        canvas = __js__("new Canvas")(width * v, height * v);
        ctx = canvas.getContext2d();
        ctx.scale(v, v);
      case _:
        canvas = __js__("new Canvas")(width, height);
        ctx = canvas.getContext2d();
    };
  }
}

enum ScaleMode {
  NoScale;
  Auto;
  Scaled(v : Float);
}