package minicanvas;

#if expose @:keep #end
class Interaction {
  var mini : MiniCanvas;
  public function new(mini : MiniCanvas)
    this.mini = mini;

  public function click(x : Float, y : Float)
    return this;

  public function down(x : Float, y : Float)
    return this;

  public function move(x : Float, y : Float, ?delta : Float = 9)
    return this;

  public function up(x : Float, y : Float)
    return this;

  public function sleep(frames : Int)
    return this;

  public function done()
    return mini;

  public function frame(callback : MiniCanvas -> Void) {
    callback(mini);
    return this;
  }
}