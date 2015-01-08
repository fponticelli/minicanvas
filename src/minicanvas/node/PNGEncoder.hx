package minicanvas.node;

import js.html.CanvasElement;
import js.html.CanvasRenderingContext2D;

class PNGEncoder implements IEncoder {
  var canvas : CanvasElement;
  public function new(canvas : CanvasElement)
    this.canvas = canvas;

  public function addFrame(ctx : CanvasRenderingContext2D) : Void {
    // do nothing
  }

  public function save(name : String, callback : String -> Void) : Void untyped {
    var fs = require('fs'),
        out = fs.createWriteStream('${minicanvas.NodeCanvas.imagePath}/$name.png'),
        stream = canvas.pngStream();

    stream.on('data', function(chunk) out.write(chunk));
    stream.on('end', function(_) callback('$name.png'));
  }
}