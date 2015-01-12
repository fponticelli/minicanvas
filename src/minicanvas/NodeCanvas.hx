package minicanvas;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;
import js.html.Element;

import thx.color.*;
using thx.core.Floats;
using thx.core.Strings;
import js.html.MouseEvent;
import minicanvas.node.GifEncoder;
import minicanvas.node.IEncoder;
import minicanvas.node.PNGEncoder;
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

  public function save(name : String) {
    var encoder = ensureEncoder();
    encoder.addFrame(ctx);
    encoder.save(name, function(file) untyped console.log('saved $file'));
  }

  var hasFrames = false;
  override public function storeFrame(times : Int = 1) {
    hasFrames = true;
    if(times <= 0) times = 1;
    for(i in 0...times)
      ensureEncoder().addFrame(ctx);
    return this;
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

  var encoder : IEncoder;
  function ensureEncoder() : IEncoder {
    if(null != encoder)
      return encoder;
    if(hasFrames) {
      return encoder = new GifEncoder(width, height);
    } else {
      return encoder = new PNGEncoder(canvas);
    }
  }
}