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

class BrowserCanvas extends MiniCanvas {
  public static var defaultScaleMode = Auto;
  public static var parentNode : Element = untyped __js__("typeof document != 'undefined' && document.body");

  public function new(width : Int, height : Int, ?scaleMode : ScaleMode) {
    isNode = false;
    isBrowser = true;
    if(null == scaleMode)
      scaleMode = defaultScaleMode;
    super(width, height, scaleMode);
  }

  // platform specific
  override function nativeDisplay(name : String)
    append(name);

  override function init() {
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

  public function append(name : String) {
    var figure = js.Browser.document.createElement("figure"),
        caption = js.Browser.document.createElement("figcaption");
    figure.className = "minicanvas";
    figure.appendChild(canvas);
    caption.innerHTML = name.humanize() + (MiniCanvas.displayGenerationTime ? ' <span class="info">(${deltaTime.roundTo(2)}ms)</span>' : '');
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

  override function getDevicePixelRatio() return devicePixelRatio();
  override function getBackingStoreRatio() return backingStoreRatio();
}