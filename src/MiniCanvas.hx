import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Element;

import thx.color.*;
using thx.core.Floats;
using thx.core.Strings;

class MiniCanvas {
  public static var imagePath = 'images';
  public static var parentNode : Element = untyped __js__("typeof document != 'undefined' && document.body");

  public var width(default, null) : Int;
  public var height(default, null) : Int;
  public var canvas(default, null) : CanvasElement;
  public var ctx(default, null) : CanvasRenderingContext2D;
  public function new(width : Int, height : Int) {
    this.width = width;
    this.height = height;
    if(isNode()) {
      initNode();
    } else {
      initBrowser();
    }
  }

  function initNode() untyped {
    var Canvas =  require("canvas");
    canvas = __js__("new Canvas")(this.width, this.height);
    ctx = canvas.getContext2d();
  }

  function initBrowser() {
    canvas = js.Browser.document.createCanvasElement();
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext2d();
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

  // platform specific
  public function append(name : String) {
    var figure = js.Browser.document.createElement("figure"),
        caption = js.Browser.document.createElement("figcaption");
    figure.className = "minicanvas";
    figure.appendChild(canvas);
    caption.innerHTML = name.humanize();
    figure.appendChild(caption);
    parentNode.appendChild(figure);
  }

  public function save(name : String) untyped {
    var fs = require('fs'),
        out = fs.createWriteStream('$imagePath/$name.png'),
        stream = canvas.pngStream();

    stream.on('data', function(chunk) out.write(chunk));
    stream.on('end', function(_) console.log('saved $name.png'));
  }

  public static function isNode() : Bool
    return untyped __js__("typeof module !== 'undefined' && module.exports");
}