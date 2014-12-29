import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Element;

import thx.color.*;
using thx.core.Floats;
using thx.core.Strings;
import thx.core.Timer;

class MiniCanvas {
  public static var defaultNodeScaleMode = NoScale;
  public static var defaultBrowserScaleMode = Auto;
  public static var imagePath = 'images';
  public static var parentNode : Element = untyped __js__("typeof document != 'undefined' && document.body");

  public var width(default, null) : Int;
  public var height(default, null) : Int;
  public var scaleMode(default, null) : ScaleMode;
  public var canvas(default, null) : CanvasElement;
  public var ctx(default, null) : CanvasRenderingContext2D;
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

  public function display(name : String) {
    if(isNode()) {
      save(name);
    } else {
      append(name);
    }
    return this;
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

  public function checkboard(?size : Float = 8, ?light : RGB, ?dark : RGB) {
    var cols   = (width / size).ceil(),
        rows   = (height / size).ceil(),
        slight = (null == light ? Color.white : light).toCSS3(),
        sdark  = (null == dark ? Color.lightgrey : dark).toCSS3();
    for(c in 0...cols) {
      for(r in 0...rows) {
        ctx.fillStyle = c % 2 != r % 2 ? slight : sdark;
        ctx.fillRect(c * size, r * size, size, size);
      }
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
    caption.innerHTML = name.humanize();
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