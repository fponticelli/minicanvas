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
import minicanvas.MiniCanvas;

class NodeCanvas extends MiniCanvas {
  public static var defaultScaleMode = NoScale;
  public static var imagePath = 'images';

  public static function create(width : Int, height : Int, ?scaleMode : ScaleMode) {
    return new MiniCanvas(width, height, scaleMode);
  }

  public function new(width : Int, height : Int, ?scaleMode : ScaleMode) {
    isNode = true;
    isBrowser = false;
    if(null == scaleMode)
      scaleMode = defaultScaleMode;
    super(width, height, scaleMode);
  }

  public function save(name : String) untyped {
    var fs = require('fs'),
        out = fs.createWriteStream('$imagePath/$name.png'),
        stream = canvas.pngStream();

    stream.on('data', function(chunk) out.write(chunk));
    stream.on('end', function(_) console.log('saved $name.png'));
  }

  // platform specific
  override function init() untyped {
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

  override function getDevicePixelRatio() return 1.0;
  override function getBackingStoreRatio() return 1.0;

  override function nativeDisplay(name : String)
    save(name);
}