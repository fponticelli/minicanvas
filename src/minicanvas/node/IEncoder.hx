package minicanvas.node;

import js.html.CanvasRenderingContext2D;

interface IEncoder {
  public function addFrame(ctx : CanvasRenderingContext2D) : Void;
  public function save(name : String, callback : String -> Void) : Void;
}