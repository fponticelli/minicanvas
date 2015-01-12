package minicanvas;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import thx.color.*;
using thx.core.Floats;
import js.html.MouseEvent;
import thx.core.Timer;
using thx.core.Nulls;
import thx.core.error.AbstractMethod;

#if expose @:expose #end
class MiniCanvas {
  public static var displayGenerationTime = false;

  public var isNode(default, null) : Bool;
  public var isBrowser(default, null) : Bool;
  public var width(default, null) : Int;
  public var height(default, null) : Int;
  public var scaleMode(default, null) : ScaleMode;
  public var canvas(default, null) : CanvasElement;
  public var ctx(default, null) : CanvasRenderingContext2D;

  var startTime : Float;
  var deltaTime : Float;
  var events : Map<String, { callback : MiniCanvasEvent -> Void, listener : MouseEvent -> Void }>;

  public static function envIsNode() : Bool
    return untyped __js__("typeof module !== 'undefined' && module.exports");

  public static function create(width : Int, height : Int, ?scaleMode : ScaleMode)
    return envIsNode() ?
      new NodeCanvas(width, height, scaleMode) :
      new BrowserCanvas(width, height, scaleMode);

  function new(width : Int, height : Int, ?scaleMode : ScaleMode) {
    this.scaleMode = scaleMode;
    this.width = width;
    this.height = height;
    processScale();
    startTime = Timer.time();
    events = new Map();
    init();
  }

  public function display(name : String) {
    deltaTime = Timer.time() - startTime;
    if(!displayGenerationTime)
      trace('generated "$name" in ${deltaTime.roundTo(2)}ms');
    nativeDisplay(name);
    return this;
  }

  // drawing
  public function border(weight = 1.0, ?color : RGBA = 0x000000ff, ?ox = 0.5, ?oy = 0.5)
    return rect(weight / 2, weight / 2, width - weight / 2, height - weight / 2, weight, color);

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
        slight = (null == light ? (0xFFFFFFFF : RGBA) : light).toCSS3(),
        sdark  = (null == dark  ? (0xCCCCCCFF : RGBA) : dark).toCSS3();
    for(c in 0...cols) {
      for(r in 0...rows) {
        ctx.fillStyle = c % 2 != r % 2 ? slight : sdark;
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
    return this;
  }

  public function circle(x : Float, y : Float, radius : Float, ?weight = 1.0, ?lineColor : RGBA, ?fillColor : RGBA) {
    if(null != fillColor || null != lineColor)
      ctx.beginPath();
    if(null != fillColor)
      ctx.fillStyle = fillColor.toCSS3();
    if(null != lineColor) {
      ctx.strokeStyle = lineColor.toCSS3();
      ctx.lineWidth = weight;
    }

    ctx.arc(x, y, radius, 0, Math.PI * 2, true);

    if(null != fillColor)
      ctx.fill();
    if(null != lineColor)
      ctx.stroke();
  }

  public function clear() {
    ctx.clearRect(0, 0, width, height);
    return this;
  }

  public function cross(?ox : Float, ?oy : Float, ?weight = 1.0, ?color : RGBA) {
    if(null == ox) ox = width / 2 + 0.5;
    if(null == oy) oy = height / 2 + 0.5;
    lineHorizontal(oy, weight, color);
    lineVertical(ox, weight, color);
    return this;
  }

  public function dot(x : Float, y : Float, ?radius = 3.0, ?color : RGBA) {
    ctx.beginPath();
    ctx.fillStyle = color.or((0xCC3300FF : RGBA)).toCSS3();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    return this;
  }

  public function dotGrid(?dx = 10.0, ?dy = 10.0, ?radius = 1.0, ?color : RGBA, ?ox = 0.5, ?oy = 0.5) {
    if(dx == 0) throw 'invalid argument dx, should be different from zero';
    if(dy == 0) throw 'invalid argument dy, should be different from zero';
    if(null == color)
      color = (0xAAAAAAFF : RGBA);
    var py = oy % dy;
    while(py - radius <= height) {
      var px = ox % dx;
      while(px - radius <= height) {
        dot(px + 0.5, py + 0.5, radius, color);
        px += dx;
      }
      py += dy;
    }
    return this;
  }

  public function fill(color : RGBA) {
    ctx.fillStyle = color.toCSS3();
    ctx.fillRect(0, 0, width, height);
    return this;
  }

  public function grid(?dx = 10.0, ?dy = 10.0, ?weight = 1.0, ?color : RGBA, ?ox = 0.5, ?oy = 0.5) {
    gridHorizontal(dy, weight, color, oy);
    gridVertical(dx, weight, color, ox);
    return this;
  }

  public function gridHorizontal(?dy = 10.0, ?weight = 1.0, ?color : RGBA, ?oy = 0.5) {
    if(dy == 0) throw 'invalid argument dy, should be different from zero';
    if(null == color)
      color = (0xCCCCCCFF : RGBA);
    var py = oy % dy;
    while(py - weight / 2 <= height) {
      lineHorizontal(py, weight, color);
      py += dy;
    }
    return this;
  }

  public function gridVertical(?dx = 10.0, ?weight = 1.0, ?color : RGBA, ?ox = 0.5) {
    if(dx == 0) throw 'invalid argument dx, should be different from zero';
    if(null == color)
      color = (0xCCCCCCFF : RGBA);
    var px = ox % dx;
    while(px - weight / 2 <= width) {
      lineVertical(px, weight, color);
      px += dx;
    }
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

  public function line(x0 : Float, y0 : Float, x1 : Float, y1 : Float, ?weight = 1.0, ?color : RGBA) {
    ctx.lineWidth = weight;
    ctx.strokeStyle = color.or((0x000000FF : RGBA)).toCSS3();
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

  public function rect(x0 : Float, y0 : Float, x1 : Float, y1 : Float, ?weight = 1.0, ?lineColor : RGBA, ?fillColor : RGBA) {
    if(null != fillColor) {
      ctx.fillStyle = fillColor.toCSS3();
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    }
    if(null != lineColor) {
      ctx.lineWidth = weight;
      ctx.strokeStyle = lineColor.toCSS3();
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    }
    return this;
  }

  public function sample(name : String, callback : CanvasRenderingContext2D -> Int -> Int -> Void) {
    context(callback);
    display(name);
    return this;
  }

  // animation
  public function storeFrame(times : Int = 1) return this;

  public function animate(?x : Float, ?y : Float) : Interaction {
    var interaction = new CanvasInteraction(
      this,
      (x).or(width / 2),
      (y).or(height),
      function(stack) {
        resolveStack(stack, afterAnimate);
        storeFrame();
      });
    beforeAnimate();
    return interaction;
  }

  public function animateNode(?x : Float, ?y : Float) {
    if(isNode)
      return animate(x, y);
    else
      return new Interaction(this);
  }

  public function animateBrowser(?x : Float, ?y : Float) {
    if(isBrowser)
      return animate(x, y);
    else
      return new Interaction(this);
  }

  // utility
  public function context(callback : CanvasRenderingContext2D -> Int -> Int -> Void) {
    callback(ctx, width, height);
    return this;
  }

  public function with(callback : MiniCanvas -> Int -> Int -> Void) {
    callback(this, width, height);
    return this;
  }

  // protected
  function beforeAnimate() {}
  function afterAnimate() {}

  function resolveStack(stack : Array<Void -> Void>, done : Void -> Void) {
    if(stack.length == 0) return done();
    stack.shift()();
    storeFrame();
    resolveStack(stack, done);
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

  public function move(x : Float, y : Float) {
    if(x < 0 || x > width || y < 0 || y > height)
      return this;
    trigger("mousemove", x, y);
    trigger("trail", x, y);
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

  // protected methods that need override
  function getDevicePixelRatio() : Float
    return throw new AbstractMethod();

  function getBackingStoreRatio() : Float
    return throw new AbstractMethod();

  function init()
    throw new AbstractMethod();

  function nativeDisplay(name : String)
    throw new AbstractMethod();

  // private methods
  function processScale() {
    switch scaleMode {
      case Auto:
        var ratio = getDevicePixelRatio() / getBackingStoreRatio();
        if(ratio != 1)
          scaleMode = Scaled(ratio);
        else
          scaleMode = NoScale;
      case _: // do nothing;
    };
  }

#if expose
  static function __init__() {
    untyped $hx_exports.MiniCanvas = minicanvas.MiniCanvas;
  }
#end
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