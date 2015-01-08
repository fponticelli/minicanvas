package minicanvas.node;

import js.html.CanvasRenderingContext2D;
using thx.core.Arrays;

class GifEncoder implements IEncoder {
  var encoder : Dynamic;
  var stream : Dynamic;
  public function new(width : Int, height : Int) {
    encoder = untyped __js__("(function(w, h, self) {
      var GIFEncoder = require('gifencoder'),
          encoder = new GIFEncoder(w, h);
      self.stream = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(50);
      encoder.setQuality(10);
      return encoder;
    })")(width, height, this);
  }

  public function addFrame(ctx : CanvasRenderingContext2D) : Void {
    encoder.addFrame(ctx);
  }

  public function save(name : String, callback : String -> Void) : Void {
    //stream.on('end', function(_) callback('$name.gif'));
    stream.pipe(untyped require('fs')
      .createWriteStream('${minicanvas.NodeCanvas.imagePath}/$name.gif'));
    // TODO wire asynchronously
    callback('$name.gif');
  }
}