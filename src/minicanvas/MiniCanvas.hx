package minicanvas;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Element;

import thx.color.*;
using thx.core.Floats;
using thx.core.Strings;
import js.html.MouseEvent;
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
  var events : Map<String, { callback : MiniCanvasEvent -> Void, listener : MouseEvent -> Void }>;

  public static function create(width : Int, height : Int, ?scaleMode : ScaleMode) {
    return new MiniCanvas(width, height, scaleMode);
  }

  function new(width : Int, height : Int, ?scaleMode : ScaleMode) {
    this.scaleMode = scaleMode;
    this.width = width;
    this.height = height;
    processScale();
    if(isNode) {
      initNode();
    } else {
      initBrowser();
    }
    startTime = Timer.time();
    events = new Map();
  }

  function processScale() {
    scaleMode = null != scaleMode ? scaleMode : isNode ? defaultNodeScaleMode : defaultBrowserScaleMode;
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
    if(isNode) {
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

  // interaction
  public function onClick(callback : MiniCanvasEvent -> Void)
    return onMouseEvent("click", callback);

  public function onDown(callback : MiniCanvasEvent -> Void)
    return onMouseEvent("mousedown", callback);

  public function onMove(callback : MiniCanvasEvent -> Void)
    return onMouseEvent("mousemove", callback);

  public function onTrail(callback : TrailEvent -> Void) {
    var first = true,
        x0 = 0.0,
        y0 = 0.0,
        x1, y1,
        listener = function(e : MiniCanvas.MiniCanvasEvent) {
          if(first) {
            x0 = e.x;
            y0 = e.y;
            first = false;
          } else {
            x1 = e.x;
            y1 = e.y;
            callback({ mini : this, x0 : x0, y0 : y0, x1 : x1, y1 : y1 });
            x0 = x1;
            y0 = y1;
          }
        };
    return onMouseEvent("mousemove", "trail", listener);
  }

  public function onUp(callback : MiniCanvasEvent -> Void)
    return onMouseEvent("mouseup", callback);

  public function offClick()
    return offMouseEvent("click");

  public function offDown()
    return offMouseEvent("mousedown");

  public function offMove()
    return offMouseEvent("mousemove");

  public function offTrail()
    return offMouseEvent("mousemove", "trail");

  public function offUp()
    return offMouseEvent("mouseup");

  public function click(x : Float, y : Float)
    return trigger("click", x, y);

  public function down(x : Float, y : Float)
    return trigger("mousedown", x, y);

  public function move(x0 : Float, y0 : Float, x1 : Float, y1 : Float, ?delta = 9.0) {
    var dist  = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)),
        steps = Math.ceil(dist / delta),
        x, y, step;
    for(i in 0...steps) {
      step = i / steps;
      x = step.interpolate(x0, x1);
      y = step.interpolate(y0, y1);
      trigger("mousemove", x, y);
      trigger("trail", x, y);
    }
    return this;
  }

  public function up(x : Float, y : Float)
    return trigger("mouseup", x, y);

  // interaction internals
  function onMouseEvent(type : String, ?name : String, callback : MiniCanvasEvent -> Void) {
    if(null == name) name = type;
    offMouseEvent(type, name);
    var listener = function(e : MouseEvent) {
      var rect = canvas.getBoundingClientRect();
      trigger(name, e.clientX - rect.left, e.clientY - rect.top);
    };
    events.set(name, {
      callback : callback,
      listener : listener
    });
    if(isBrowser) {
      canvas.addEventListener(type, listener, false);
    }
    return this;
  }

  function offMouseEvent(type : String, ?name : String) {
    if(null == name) name = type;
    var item = events.get(name);
    if(null == item) return this;
    events.remove(name);
    if(isBrowser) {
      canvas.removeEventListener(type, item.listener, false);
    }
    return this;
  }

  function trigger(name : String, x : Float, y : Float) {
    var item = events.get(name);
    if(null == item) return this;
    item.callback({
      mini : this,
      x : x,
      y : y
    });
    return this;
  }

  // platform specific
  public static var isNode(default, null) : Bool = untyped __js__("typeof module !== 'undefined' && module.exports");
  public static var isBrowser(default, null) : Bool = !isNode;

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

typedef MiniCanvasEvent = {
  mini : MiniCanvas,
  x : Float,
  y : Float
}

typedef TrailEvent = {
  mini : MiniCanvas,
  x0 : Float,
  y0 : Float,
  x1 : Float,
  y1 : Float
}

enum ScaleMode {
  NoScale;
  Auto;
  Scaled(v : Float);
}