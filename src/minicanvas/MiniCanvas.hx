package minicanvas;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.MouseEvent;
using thx.Floats;
using thx.Nulls;
import thx.Set;
import thx.Timer;
#if !jslib
import thx.color.*;
#else
typedef Rgbxa = String;
#end

#if expose @:expose @:keep #end
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
  public function border(weight = 1.0, ?color : Rgbxa) {
    if(null == color) color = Rgbxa.create(0,0,0,1);
    return rect(weight / 2, weight / 2, width - weight / 2, height - weight / 2, weight, color);
  }

  public function box(handler : Float -> Float -> Rgbxa) {
    for(x in 0...width) {
      for(y in 0...height) {
        var color = handler(x / width, y / height);
        if(color.inSpace) {
          ctx.fillStyle = (color : String);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
    return this;
  }

  public function checkboard(?size : Float = 8, ?light : Rgbxa, ?dark : Rgbxa) {
    var cols   = (width / size).ceil(),
        rows   = (height / size).ceil(),
        slight = (null == light ? Rgbxa.create(1,1,1,1) : light),
        sdark  = (null == dark  ? Rgbxa.create(0.5,0.5,0.5,1) : dark);
    for(c in 0...cols) {
      for(r in 0...rows) {
        ctx.fillStyle = ((c % 2 != r % 2 ? slight : sdark) : String);
        ctx.fillRect(c * size, r * size, size, size);
      }
    }
    return this;
  }

  public function circle(x : Float, y : Float, radius : Float, ?weight = 1.0, ?lineColor : Rgbxa, ?fillColor : Rgbxa) {
    if(null != fillColor || null != lineColor)
      ctx.beginPath();
    if(null != fillColor)
      ctx.fillStyle = (fillColor : String);
    if(null != lineColor) {
      ctx.strokeStyle = (lineColor : String);
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

  public function cross(?ox : Float, ?oy : Float, ?weight = 1.0, ?color : Rgbxa) {
    if(null == ox) ox = width / 2 + 0.5;
    if(null == oy) oy = height / 2 + 0.5;
    lineHorizontal(oy, weight, color);
    lineVertical(ox, weight, color);
    return this;
  }

  public function dot(x : Float, y : Float, ?radius = 3.0, ?color : Rgbxa) {
    ctx.beginPath();
    ctx.fillStyle = (color.or(Rgbxa.create(0.8,0.2,0,1)) : String);
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
    return this;
  }

  public function dotGrid(?dx = 10.0, ?dy = 10.0, ?radius = 1.0, ?color : Rgbxa, ?ox = 0.5, ?oy = 0.5) {
    if(dx == 0) throw 'invalid argument dx, should be different from zero';
    if(dy == 0) throw 'invalid argument dy, should be different from zero';
    if(null == color)
      color = Rgbxa.create(0.675,0.675,0.678,1);
    var py = oy % dy;
    while(py - radius <= height) {
      var px = ox % dx;
      while(px - radius <= width) {
        dot(px + 0.5, py + 0.5, radius, color);
        px += dx;
      }
      py += dy;
    }
    return this;
  }

  public function fill(color : Rgbxa) {
    ctx.fillStyle = (color : String);
    ctx.fillRect(0, 0, width, height);
    return this;
  }

  public function grid(?dx = 10.0, ?dy = 10.0, ?weight = 1.0, ?color : Rgbxa, ?ox = 0.5, ?oy = 0.5) {
    gridHorizontal(dy, weight, color, oy);
    gridVertical(dx, weight, color, ox);
    return this;
  }

  public function gridHorizontal(?dy = 10.0, ?weight = 1.0, ?color : Rgbxa, ?oy = 0.5) {
    if(dy == 0) throw 'invalid argument dy, should be different from zero';
    if(null == color)
      color = Rgbxa.create(0.8,0.8,0.8,1);
    var py = oy % dy;
    while(py - weight / 2 <= height) {
      lineHorizontal(py, weight, color);
      py += dy;
    }
    return this;
  }

  public function gridVertical(?dx = 10.0, ?weight = 1.0, ?color : Rgbxa, ?ox = 0.5) {
    if(dx == 0) throw 'invalid argument dx, should be different from zero';
    if(null == color)
      color = Rgbxa.create(0.8,0.8,0.8,1);
    var px = ox % dx;
    while(px - weight / 2 <= width) {
      lineVertical(px, weight, color);
      px += dx;
    }
    return this;
  }

  public function gradientHorizontal(handler : Float -> Rgbxa) {
    for(x in 0...width) {
      var color = handler(x/width);
      if(color.inSpace) {
        ctx.fillStyle = (color : String);
        ctx.fillRect(x, 0, 1, height);
      }
    }
    return this;
  }

  public function gradientVertical(handler : Float -> Rgbxa) {
    for(y in 0...height) {
      var color = handler(y/height);
      if(color.inSpace) {
        ctx.fillStyle = (color : String);
        ctx.fillRect(0, y, width, 1);
      }
    }
    return this;
  }

  public function line(x0 : Float, y0 : Float, x1 : Float, y1 : Float, ?weight = 1.0, ?color : Rgbxa) {
    ctx.lineWidth = weight;
    ctx.strokeStyle = (color.or(("Rgbxa(0,0,0,1)" : Rgbxa)) : String);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
    return this;
  }

  public function lineHorizontal(offset : Float, ?weight = 1.0, ?color : Rgbxa)
    return line(0, offset, width, offset, weight, color);

  public function lineVertical(offset : Float, ?weight = 1.0, ?color : Rgbxa)
    return line(offset, 0, offset, height, weight, color);

  public function palette(colors : Array<Array<Rgbxa>>, ?padding = 2.0, ?margin = 0.0) {
    var rows = colors.length,
        h    = (height - 2 * margin - (rows - 1) * padding) / rows,
        py   = margin;
    for(row in colors) {
      var cols = row.length,
          w    = (width - 2 * margin - (cols - 1) * padding) / cols,
          px   = margin;
      for(color in row) {
        if(color.inSpace) {
          ctx.fillStyle = (color : String);
          ctx.fillRect(px, py, w, h);
        }
        px += w + padding;
      }
      py += h + padding;
    }
    return this;
  }

  public function rect(x0 : Float, y0 : Float, x1 : Float, y1 : Float, ?weight = 1.0, ?lineColor : Rgbxa, ?fillColor : Rgbxa) {
    if(null != fillColor) {
      ctx.fillStyle = (fillColor : String);
      ctx.fillRect(x0, y0, x1 - x0, y1 - y0);
    }
    if(null != lineColor) {
      ctx.lineWidth = weight;
      ctx.strokeStyle = (lineColor : String);
      ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    }
    return this;
  }

  // animation
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

  public function storeFrame(times : Int = 1) return this;

  // utility
  public function context(callback : CanvasRenderingContext2D -> Int -> Int -> Void) {
    callback(ctx, width, height);
    return this;
  }

  public function with(callback : MiniCanvas -> Void) {
    callback(this);
    return this;
  }

  // interaction
  public function onClick(callback : MiniCanvasEvent -> Void)
    return onMouseEvent("click", callback);

  public function onKeyDown(callback : MiniCanvasKeyEvent -> Void) {
    _keyDown = {
      listener : function(e) {
        this.keyDown(e.keyCode);
      },
      callback : callback
    };
    if(isBrowser) {
      if(minicanvas.BrowserCanvas.attachKeyEventsToCanvas) {
        canvas.setAttribute("tabIndex", "1");
        canvas.addEventListener("keydown", _keyDown.listener);
      } else {
        js.Browser.window.addEventListener("keydown", _keyDown.listener);
      }
    }
    return this;
  }

  public function onKeyRepeat(callback : MiniCanvasKeyRepeatEvent -> Void) {
    var threshold = 40,
        keys = Set.create();
    _keyRepeat = {
      listener : function(e) {
        var isEmpty = keys.length == 0;
        keys.add(e.keyCode);
        if(!isEmpty) return;

        var cancel = thx.Timer.repeat(function() {
              this.keyRepeat(keys);
            }, threshold),
            keyupListener = null,
            keyupListener = function(e) {
              keys.remove(e.keyCode);
              if(keys.length > 0) return; // there are still keys pressed
              cancel();
              if(minicanvas.BrowserCanvas.attachKeyEventsToCanvas) {
                canvas.removeEventListener("keyup", keyupListener);
              } else {
                js.Browser.window.removeEventListener("keyup", keyupListener);
              }
            };
        if(minicanvas.BrowserCanvas.attachKeyEventsToCanvas) {
          canvas.addEventListener("keyup", keyupListener);
        } else {
          js.Browser.window.addEventListener("keyup", keyupListener);
        }
      },
      callback : callback
    };
    if(isBrowser) {
      if(minicanvas.BrowserCanvas.attachKeyEventsToCanvas) {
        canvas.setAttribute("tabIndex", "1");
        canvas.addEventListener("keydown", _keyRepeat.listener);
      } else {
        js.Browser.window.addEventListener("keydown", _keyRepeat.listener);
      }
    }
    return this;
  }

  public function onKeyUp(callback : MiniCanvasKeyEvent -> Void) {
    _keyUp = {
      listener : function(e) {
        this.keyUp(e.keyCode);
      },
      callback : callback
    };
    if(isBrowser) {
      if(minicanvas.BrowserCanvas.attachKeyEventsToCanvas) {
        canvas.setAttribute("tabIndex", "1");
        canvas.addEventListener("keyup", _keyUp.listener);
      } else {
        js.Browser.window.addEventListener("keyup", _keyUp.listener);
      }
    }
    return this;
  }

  public function offKeyDown() {
    if(isBrowser && null != _keyDown) {
      if(minicanvas.BrowserCanvas.attachKeyEventsToCanvas) {
        canvas.removeAttribute("tabIndex");
        canvas.removeEventListener("keydown", _keyDown.listener);
      } else {
        js.Browser.window.removeEventListener("keydown", _keyDown.listener);
      }
    }
    _keyDown = null;
    return this;
  }

  public function offKeyUp() {
    if(isBrowser && null != _keyUp) {
      if(minicanvas.BrowserCanvas.attachKeyEventsToCanvas) {
        canvas.removeAttribute("tabIndex");
        canvas.removeEventListener("keyup", _keyUp.listener);
      } else {
        js.Browser.window.removeEventListener("keyup", _keyUp.listener);
      }
    }
    _keyUp = null;
    return this;
  }

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

  public function keyDown(keyCode : Int) {
    if(null != _keyDown)
      _keyDown.callback({ mini : this, keyCode : keyCode });
    return this;
  }

  public function keyRepeat(keyCodes : Array<Int>) {
    if(null != _keyRepeat)
      _keyRepeat.callback({ mini : this, keyCodes : keyCodes });
    return this;
  }

  public function keyUp(keyCode : Int) {
    if(null != _keyUp)
      _keyUp.callback({ mini : this, keyCode : keyCode });
    return this;
  }

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
    return throw 'abstract method getDevicePixelRatio()';

  function getBackingStoreRatio() : Float
    return throw 'abstract method getBackingStoreRatio()';

  function init()
    return throw 'abstract method init()';

  function nativeDisplay(name : String)
    return throw 'abstract method nativeDisplay()';

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

  var _keyUp : {
    listener : js.html.KeyboardEvent -> Void,
    callback : MiniCanvasKeyEvent -> Void
  };

  var _keyDown : {
    listener : js.html.KeyboardEvent -> Void,
    callback : MiniCanvasKeyEvent -> Void
  };

  var _keyRepeat : {
    listener : js.html.KeyboardEvent -> Void,
    callback : MiniCanvasKeyRepeatEvent -> Void
  };

  // protected
  function beforeAnimate() {}
  function afterAnimate() {}

  function resolveStack(stack : Array<Void -> Void>, done : Void -> Void) {
    if(stack.length == 0) return done();
    stack.shift()();
    storeFrame();
    resolveStack(stack, done);
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

typedef MiniCanvasKeyEvent = {
  mini : MiniCanvas,
  keyCode : Int
}

typedef MiniCanvasKeyRepeatEvent = {
  mini : MiniCanvas,
  keyCodes : Array<Int>
}

typedef TrailEvent = {
  mini : MiniCanvas,
  x0 : Float,
  y0 : Float,
  x1 : Float,
  y1 : Float
}

#if expose @:expose #end
enum ScaleMode {
  NoScale;
  Auto;
  Scaled(v : Float);
}
