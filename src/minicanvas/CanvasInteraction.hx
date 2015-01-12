package minicanvas;

using thx.core.Floats;

class CanvasInteraction extends Interaction {
  var x : Float;
  var y : Float;
  var stack : Array<Void -> Void>;
  var _done : Array<Void -> Void> -> Void;
  public function new(mini : MiniCanvas, x : Float, y : Float, done : Array<Void -> Void> -> Void) {
    super(mini);
    this.x = x;
    this.y = y;
    this.stack = [];
    this._done = done;
  }

  override public function click(x : Float, y : Float) {
    if(this.x != x || this.y != y)
      move(x, y);
    stack.push(mini.click.bind(x,y));
    return this;
  }

  override public function down(x : Float, y : Float) {
    if(this.x != x || this.y != y)
      move(x, y);
    stack.push(mini.down.bind(x,y));
    return this;
  }

  override public function frame(callback : MiniCanvas -> Void) {
    stack.push(callback.bind(mini));
    return this;
  }

  override public function move(x : Float, y : Float, ?delta : Float = 9) {
    var dist  = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y)),
        steps = Math.ceil(dist / delta),
        dx, dy, step;
    for(i in 0...steps) {
      step = i / steps;
      dx = Math.round(step.interpolate(this.x, x));
      dy = Math.round(step.interpolate(this.y, y));
      stack.push(mini.move.bind(dx,dy));
    }

    this.x = x;
    this.y = y;
    return this;
  }

  override public function up(x : Float, y : Float) {
    if(this.x != x || this.y != y)
      move(x, y);
    stack.push(mini.up.bind(x,y));
    return this;
  }

  override public function sleep(frames : Int) {
    for(i in 0...frames)
      stack.push(function(){});
    return this;
  }

  override public function done() {
    _done(stack);
    return mini;
  }
}