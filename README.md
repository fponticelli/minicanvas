# minicanvas

Simple library to quickly generate canvas images (for the browser and for nodejs).

```haxe
new MiniCanvas(200, 200)
  .checkboard()
  .display("checkboard");
```

![checkboard](https://github.com/fponticelli/minicanvas/raw/master/images/checkboard.png?raw=true "checkboard")

```haxe
new MiniCanvas(200, 200)
  .checkboard()
  .box(function(x, y) : RGBA
    return HSLA.create(x * 360, 1, y, 0.75))
  .display("rainbowAlpha");
```

![rainbow alpha](https://github.com/fponticelli/minicanvas/raw/master/images/rainbowAlpha.png?raw=true "rainbow alpha")

```haxe
new MiniCanvas(200, 200)
  .box(function(x, y) : RGBA
    return HSL.create(x * 360, 1, y))
  .display("rainbow");
```

![rainbow](https://github.com/fponticelli/minicanvas/raw/master/images/rainbow.png?raw=true "rainbow")

```haxe
new MiniCanvas(200, 20)
  .gradientHorizontal(function(x) : RGBA
    return HSV.create(x * 360, 1, 1))
  .display("gradientHorizontal");
```

![gradient horizontal](https://github.com/fponticelli/minicanvas/raw/master/images/gradientHorizontal.png?raw=true "gradient horizontal")

```haxe
new MiniCanvas(20, 200)
  .gradientVertical(function(y) : RGBA
    return HSV.create(y * 360, 1, 1))
  .display("gradientVertical");
```

![gradient vertical](https://github.com/fponticelli/minicanvas/raw/master/images/gradientVertical.png?raw=true "gradient vertical")

```haxe
var red   = HSL.create(340, 0.5, 0.5),
    green = HSL.create(120, 0.5, 0.5);

new MiniCanvas(200, 90)
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
new MiniCanvas(200, 200)
  .grid()
  .cross()
  .display("grid");
```

![grid](https://github.com/fponticelli/minicanvas/raw/master/images/grid.png?raw=true "grid")