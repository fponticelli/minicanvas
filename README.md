# minicanvas

Simple library to quickly generate canvas images (for the browser and for nodejs).

```haxe
MiniCanvas.create(200, 200)
  .checkboard()
  .border(2, 0x000000FF)
  .rect(20, 20, 180, 180, 2, 0xCC7700CC, 0x00CC7766)
  .display("checkboard");
```

![checkboard](https://github.com/fponticelli/minicanvas/raw/master/images/checkboard.png?raw=true "checkboard")

```haxe
MiniCanvas.create(200, 200)
  .checkboard()
  .box(function(x, y) : Rgba
    return Hsla.create(x * 360, 1, y, 0.75))
  .display("rainbowAlpha");
```

![rainbow alpha](https://github.com/fponticelli/minicanvas/raw/master/images/rainbowAlpha.png?raw=true "rainbow alpha")

```haxe
MiniCanvas.create(200, 200)
  .box(function(x, y) : Rgba
    return Hsl.create(x * 360, 1, y))
  .display("rainbow");
```

![rainbow](https://github.com/fponticelli/minicanvas/raw/master/images/rainbow.png?raw=true "rainbow")

```haxe
MiniCanvas.create(200, 20)
  .gradientHorizontal(function(x) : Rgba
    return Hsv.create(x * 360, 1, 1))
  .display("gradientHorizontal");
```

![gradient horizontal](https://github.com/fponticelli/minicanvas/raw/master/images/gradientHorizontal.png?raw=true "gradient horizontal")

```haxe
MiniCanvas.create(20, 200)
  .gradientVertical(function(y) : Rgba
    return Hsv.create(y * 360, 1, 1))
  .display("gradientVertical");
```

![gradient vertical](https://github.com/fponticelli/minicanvas/raw/master/images/gradientVertical.png?raw=true "gradient vertical")

```haxe
var red   = Hsl.create(340, 0.5, 0.5),
    green = Hsl.create(120, 0.5, 0.5);

MiniCanvas.create(200, 90)
  .palette([[
    red.analogous().left,
    red,
    red.analogous().right
  ], [
    green.split().left,
    green,
    green.split().right
  ]])
  .display("palette");
```

![color palette](https://github.com/fponticelli/minicanvas/raw/master/images/palette.png?raw=true "color palette")

```haxe
MiniCanvas.create(200, 200)
  .grid()
  .cross()
  .display("grid");
```

![grid](https://github.com/fponticelli/minicanvas/raw/master/images/grid.png?raw=true "grid")

```haxe
MiniCanvas.create(200, 200)
  .checkboard()
  .onDown(function(e)
    e.mini
      .dot(e.x, e.y, 6, Color.blue)
      .onMove(function(e) e.mini.dot(e.x, e.y))
      .onTrail(function(e) e.mini.line(e.x0, e.y0, e.x1, e.y1)))
  .onUp(function(e)
    e.mini
      .dot(e.x, e.y, 8, Color.aquamarine)
      .offMove()
      .offTrail())
  .animate()
  .down(30, 170)
  .up(40, 30).sleep(10)
  .down(25, 25)
  .move(100, 90)
  .up(165, 20).sleep(10)
  .down(150, 30)
  .up(165, 170).sleep(40)
  .done()
  .display("events");
```

![events](https://github.com/fponticelli/minicanvas/raw/master/images/events.gif?raw=true "events")