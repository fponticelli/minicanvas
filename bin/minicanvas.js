(function () { "use strict";
var console = (1,eval)('this').console || {log:function(){}};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw "EReg::matched";
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var HxOverrides = function() { };
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Main = function() { };
Main.randomGraph = function(name,width,height,random) {
	minicanvas.MiniCanvas.create(width,height).fill(-1).gridHorizontal(20).border(1)["with"](function(mini,w,h) {
		var max = 0;
		var min = h;
		var avg = 0.0;
		var map = new haxe.ds.IntMap();
		var tot = Math.round(w * h * 0.5);
		var r;
		var v;
		var _g = 0;
		while(_g < tot) {
			var i = _g++;
			r = Math.floor(random() * w);
			if(map.h.hasOwnProperty(r)) {
				var value = v = map.h[r] + 1;
				map.h[r] = value;
			} else {
				var value1 = v = 1;
				map.h[r] = value1;
			}
			mini.dot(r + 0.5,h - v + 0.5,0.5,thx.color._Grey.Grey_Impl_.toRGBA(0.7 - v / h));
			if(i % 200 == 0) mini.storeFrame();
		}
		var $it0 = map.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			v = map.h[k];
			avg += v;
			if(v < min) min = v;
			if(v > max) max = v;
		}
		avg = avg / w;
		mini.storeFrame().lineHorizontal(Math.round(h - min) + 0.5,1,thx.color._RGB.RGB_Impl_.toRGBA(thx.color.Color.red)).storeFrame().lineHorizontal(Math.round(h - max) + 0.5,1,thx.color._RGB.RGB_Impl_.toRGBA(thx.color.Color.green)).storeFrame().lineHorizontal(Math.round(h - (max + min) / 2) + 0.5,1,thx.color._RGB.RGB_Impl_.toRGBA(thx.color.Color.cyan)).storeFrame().lineHorizontal(Math.round(h - avg) + 0.5,1,thx.color._RGB.RGB_Impl_.toRGBA(thx.color.Color.blue)).storeFrame(50);
	}).display(name);
};
Main.main = function() {
	minicanvas.MiniCanvas.displayGenerationTime = true;
	Main.randomGraph("pseudoRandom",200,200,($_=new thx.math.random.PseudoRandom(),$bind($_,$_["float"])));
	minicanvas.MiniCanvas.create(200,200).checkboard().border(2,255).rect(20,20,180,180,2,-864616244,13399910).display("checkboard");
	minicanvas.MiniCanvas.create(200,200).checkboard(40).dotGrid(10,10,1,-1145324545).display("dotgrid");
	minicanvas.MiniCanvas.create(200,200).checkboard().box(function(x,y) {
		return thx.color._HSLA.HSLA_Impl_.toRGBA(thx.color._HSLA.HSLA_Impl_.create(x * 360,1,y,0.75));
	}).display("rainbowAlpha");
	minicanvas.MiniCanvas.create(200,200).box(function(x1,y1) {
		return thx.color._HSL.HSL_Impl_.toRGBA(thx.color._HSL.HSL_Impl_.create(x1 * 360,1,y1));
	}).display("rainbow");
	minicanvas.MiniCanvas.create(200,20).gradientHorizontal(function(x2) {
		return thx.color._HSV.HSV_Impl_.toRGBA(thx.color._HSV.HSV_Impl_.create(x2 * 360,1,1));
	}).display("gradientHorizontal");
	minicanvas.MiniCanvas.create(20,200).gradientVertical(function(y2) {
		return thx.color._HSV.HSV_Impl_.toRGBA(thx.color._HSV.HSV_Impl_.create(y2 * 360,1,1));
	}).display("gradientVertical");
	var red = thx.color._HSL.HSL_Impl_.create(340,0.5,0.5);
	var green = thx.color._HSL.HSL_Impl_.create(120,0.5,0.5);
	minicanvas.MiniCanvas.create(200,90).palette([[thx.color._HSL.HSL_Impl_.toRGBA((function($this) {
		var $r;
		var this1 = thx.color._HSL.HSL_Impl_.analogous(red);
		$r = this1._0;
		return $r;
	}(this))),thx.color._HSL.HSL_Impl_.toRGBA(red),thx.color._HSL.HSL_Impl_.toRGBA((function($this) {
		var $r;
		var this11 = thx.color._HSL.HSL_Impl_.analogous(red);
		$r = this11._1;
		return $r;
	}(this)))],[thx.color._HSL.HSL_Impl_.toRGBA((function($this) {
		var $r;
		var this12 = thx.color._HSL.HSL_Impl_.split(green);
		$r = this12._0;
		return $r;
	}(this))),thx.color._HSL.HSL_Impl_.toRGBA(green),thx.color._HSL.HSL_Impl_.toRGBA((function($this) {
		var $r;
		var this13 = thx.color._HSL.HSL_Impl_.split(green);
		$r = this13._1;
		return $r;
	}(this)))]]).display("palette");
	minicanvas.MiniCanvas.create(200,200).grid().cross().display("grid");
	minicanvas.MiniCanvas.create(200,200).checkboard().onDown(function(e) {
		e.mini.dot(e.x,e.y,6,thx.color._RGBA.RGBA_Impl_.fromString("#0066CC")).onMove(function(e1) {
			e1.mini.dot(e1.x,e1.y);
		}).onTrail(function(e2) {
			e2.mini.line(e2.x0,e2.y0,e2.x1,e2.y1);
		});
	}).onUp(function(e3) {
		e3.mini.dot(e3.x,e3.y,8,thx.color._RGBA.RGBA_Impl_.fromString("#33CC33")).offMove().offTrail();
	}).animate().down(30,170).up(40,30).sleep(10).down(25,25).move(100,90).up(165,20).sleep(10).down(150,30).up(165,170).sleep(40).done().display("events");
};
var Std = function() { };
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringBuf = function() {
	this.b = "";
};
var StringTools = function() { };
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe = {};
haxe.StackItem = { __constructs__ : ["CFunction","Module","FilePos","Method","LocalFunction"] };
haxe.StackItem.CFunction = ["CFunction",0];
haxe.StackItem.CFunction.__enum__ = haxe.StackItem;
haxe.StackItem.Module = function(m) { var $x = ["Module",1,m]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.FilePos = function(s,file,line) { var $x = ["FilePos",2,s,file,line]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.Method = function(classname,method) { var $x = ["Method",3,classname,method]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.StackItem.LocalFunction = function(v) { var $x = ["LocalFunction",4,v]; $x.__enum__ = haxe.StackItem; return $x; };
haxe.CallStack = function() { };
haxe.CallStack.callStack = function() {
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = function(error,callsites) {
		var stack = [];
		var _g = 0;
		while(_g < callsites.length) {
			var site = callsites[_g];
			++_g;
			var method = null;
			var fullName = site.getFunctionName();
			if(fullName != null) {
				var idx = fullName.lastIndexOf(".");
				if(idx >= 0) {
					var className = HxOverrides.substr(fullName,0,idx);
					var methodName = HxOverrides.substr(fullName,idx + 1,null);
					method = haxe.StackItem.Method(className,methodName);
				}
			}
			stack.push(haxe.StackItem.FilePos(method,site.getFileName(),site.getLineNumber()));
		}
		return stack;
	};
	var a = haxe.CallStack.makeStack(new Error().stack);
	a.shift();
	Error.prepareStackTrace = oldValue;
	return a;
};
haxe.CallStack.exceptionStack = function() {
	return [];
};
haxe.CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		b.b += "\nCalled from ";
		haxe.CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe.CallStack.itemToString = function(b,s) {
	switch(s[1]) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var m = s[2];
		b.b += "module ";
		if(m == null) b.b += "null"; else b.b += "" + m;
		break;
	case 2:
		var line = s[4];
		var file = s[3];
		var s1 = s[2];
		if(s1 != null) {
			haxe.CallStack.itemToString(b,s1);
			b.b += " (";
		}
		if(file == null) b.b += "null"; else b.b += "" + file;
		b.b += " line ";
		if(line == null) b.b += "null"; else b.b += "" + line;
		if(s1 != null) b.b += ")";
		break;
	case 3:
		var meth = s[3];
		var cname = s[2];
		if(cname == null) b.b += "null"; else b.b += "" + cname;
		b.b += ".";
		if(meth == null) b.b += "null"; else b.b += "" + meth;
		break;
	case 4:
		var n = s[2];
		b.b += "local function #";
		if(n == null) b.b += "null"; else b.b += "" + n;
		break;
	}
};
haxe.CallStack.makeStack = function(s) {
	if(typeof(s) == "string") {
		var stack = s.split("\n");
		var m = [];
		var _g = 0;
		while(_g < stack.length) {
			var line = stack[_g];
			++_g;
			m.push(haxe.StackItem.Module(line));
		}
		return m;
	} else return s;
};
haxe.IMap = function() { };
haxe.ds = {};
haxe.ds.IntMap = function() {
	this.h = { };
};
haxe.ds.IntMap.__interfaces__ = [haxe.IMap];
haxe.ds.IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
};
haxe.ds.StringMap = function() {
	this.h = { };
};
haxe.ds.StringMap.__interfaces__ = [haxe.IMap];
haxe.ds.StringMap.prototype = {
	remove: function(key) {
		key = "$" + key;
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
};
var minicanvas = {};
minicanvas.MiniCanvas = function(width,height,scaleMode) {
	this.scaleMode = scaleMode;
	this.width = width;
	this.height = height;
	this.processScale();
	this.startTime = performance.now();
	this.events = new haxe.ds.StringMap();
	this.init();
};
minicanvas.MiniCanvas.envIsNode = function() {
	return typeof module !== 'undefined' && module.exports;
};
minicanvas.MiniCanvas.create = function(width,height,scaleMode) {
	if(minicanvas.MiniCanvas.envIsNode()) return new minicanvas.NodeCanvas(width,height,scaleMode); else return new minicanvas.BrowserCanvas(width,height,scaleMode);
};
minicanvas.MiniCanvas.prototype = {
	display: function(name) {
		this.deltaTime = performance.now() - this.startTime;
		if(!minicanvas.MiniCanvas.displayGenerationTime) console.log("generated \"" + name + "\" in " + thx.core.Floats.roundTo(this.deltaTime,2) + "ms");
		this.nativeDisplay(name);
		return this;
	}
	,border: function(weight,color,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
		if(color == null) color = 255;
		if(weight == null) weight = 1.0;
		return this.rect(weight / 2,weight / 2,this.width - weight / 2,this.height - weight / 2,weight,color);
	}
	,box: function(handler,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
		var _g1 = 0;
		var _g = this.width;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = 0;
			var _g2 = this.height;
			while(_g3 < _g2) {
				var y = _g3++;
				this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toCSS3(handler(x / this.width,y / this.height));
				this.ctx.fillRect(x + ox,y + oy,1,1);
			}
		}
		return this;
	}
	,checkboard: function(size,light,dark,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
		if(size == null) size = 8;
		var cols = Math.ceil(this.width / size);
		var rows = Math.ceil(this.height / size);
		var slight = thx.color._RGBA.RGBA_Impl_.toCSS3(null == light?-1:light);
		var sdark = thx.color._RGBA.RGBA_Impl_.toCSS3(null == dark?-858993409:dark);
		var _g = 0;
		while(_g < cols) {
			var c = _g++;
			var _g1 = 0;
			while(_g1 < rows) {
				var r = _g1++;
				if(c % 2 != r % 2) this.ctx.fillStyle = slight; else this.ctx.fillStyle = sdark;
				this.ctx.fillRect(c * size + ox,r * size + oy,size,size);
			}
		}
		return this;
	}
	,cross: function(ox,oy,weight,color) {
		if(weight == null) weight = 1.0;
		if(null == ox) ox = this.width / 2 + 0.5;
		if(null == oy) oy = this.height / 2 + 0.5;
		this.lineHorizontal(oy,weight,color);
		this.lineVertical(ox,weight,color);
		return this;
	}
	,dot: function(x,y,radius,color) {
		if(radius == null) radius = 3.0;
		this.ctx.beginPath();
		this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toCSS3((function($this) {
			var $r;
			var t;
			{
				var _0 = color;
				if(null == _0) t = null; else t = _0;
			}
			$r = t != null?t:-869072641;
			return $r;
		}(this)));
		this.ctx.arc(x,y,radius,0,Math.PI * 2,true);
		this.ctx.fill();
		return this;
	}
	,dotGrid: function(dx,dy,radius,color,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
		if(radius == null) radius = 1.0;
		if(dy == null) dy = 10.0;
		if(dx == null) dx = 10.0;
		if(dx == 0) throw "invalid argument dx, should be different from zero";
		if(dy == 0) throw "invalid argument dy, should be different from zero";
		if(null == color) color = -1431655681;
		var py = oy % dy;
		while(py - radius <= this.height) {
			var px = ox % dx;
			while(px - radius <= this.height) {
				this.dot(px + 0.5,py + 0.5,radius,color);
				px += dx;
			}
			py += dy;
		}
		return this;
	}
	,fill: function(color) {
		this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toCSS3(color);
		this.ctx.fillRect(0,0,this.width,this.height);
		return this;
	}
	,grid: function(dx,dy,weight,color,ox,oy) {
		if(oy == null) oy = 0.5;
		if(ox == null) ox = 0.5;
		if(weight == null) weight = 1.0;
		if(dy == null) dy = 10.0;
		if(dx == null) dx = 10.0;
		this.gridHorizontal(dy,weight,color,oy);
		this.gridVertical(dx,weight,color,ox);
		return this;
	}
	,gridHorizontal: function(dy,weight,color,oy) {
		if(oy == null) oy = 0.5;
		if(weight == null) weight = 1.0;
		if(dy == null) dy = 10.0;
		if(dy == 0) throw "invalid argument dy, should be different from zero";
		if(null == color) color = -858993409;
		var py = oy % dy;
		while(py - weight / 2 <= this.height) {
			this.lineHorizontal(py,weight,color);
			py += dy;
		}
		return this;
	}
	,gridVertical: function(dx,weight,color,ox) {
		if(ox == null) ox = 0.5;
		if(weight == null) weight = 1.0;
		if(dx == null) dx = 10.0;
		if(dx == 0) throw "invalid argument dx, should be different from zero";
		if(null == color) color = -858993409;
		var px = ox % dx;
		while(px - weight / 2 <= this.width) {
			this.lineVertical(px,weight,color);
			px += dx;
		}
		return this;
	}
	,gradientHorizontal: function(handler) {
		var _g1 = 0;
		var _g = this.width;
		while(_g1 < _g) {
			var x = _g1++;
			this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toCSS3(handler(x / this.width));
			this.ctx.fillRect(x + 0.5,0,1,this.height);
		}
		return this;
	}
	,gradientVertical: function(handler) {
		var _g1 = 0;
		var _g = this.height;
		while(_g1 < _g) {
			var y = _g1++;
			this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toCSS3(handler(y / this.height));
			this.ctx.fillRect(0,y + 0.5,this.width,1);
		}
		return this;
	}
	,line: function(x0,y0,x1,y1,weight,color) {
		if(weight == null) weight = 1.0;
		this.ctx.lineWidth = weight;
		this.ctx.strokeStyle = thx.color._RGBA.RGBA_Impl_.toCSS3((function($this) {
			var $r;
			var t;
			{
				var _0 = color;
				if(null == _0) t = null; else t = _0;
			}
			$r = t != null?t:255;
			return $r;
		}(this)));
		this.ctx.beginPath();
		this.ctx.moveTo(x0,y0);
		this.ctx.lineTo(x1,y1);
		this.ctx.stroke();
		return this;
	}
	,lineHorizontal: function(offset,weight,color) {
		if(weight == null) weight = 1.0;
		return this.line(0,offset,this.width,offset,weight,color);
	}
	,lineVertical: function(offset,weight,color) {
		if(weight == null) weight = 1.0;
		return this.line(offset,0,offset,this.height,weight,color);
	}
	,palette: function(colors,padding,margin) {
		if(margin == null) margin = 0.0;
		if(padding == null) padding = 2.0;
		var rows = colors.length;
		var h = (this.height - 2 * margin - (rows - 1) * padding) / rows;
		var py = margin + 0.5;
		var _g = 0;
		while(_g < colors.length) {
			var row = colors[_g];
			++_g;
			var cols = row.length;
			var w = (this.width - 2 * margin - (cols - 1) * padding) / cols;
			var px = margin + 0.5;
			var _g1 = 0;
			while(_g1 < row.length) {
				var col = row[_g1];
				++_g1;
				this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toCSS3(col);
				this.ctx.fillRect(px,py,w,h);
				px += w + padding;
			}
			py += h + padding;
		}
		return this;
	}
	,rect: function(x0,y0,x1,y1,weight,lineColor,fillColor) {
		if(weight == null) weight = 1.0;
		if(null != fillColor) {
			this.ctx.fillStyle = thx.color._RGBA.RGBA_Impl_.toCSS3(fillColor);
			this.ctx.fillRect(x0,y0,x1 - x0,y1 - y0);
		}
		if(null != lineColor) {
			this.ctx.lineWidth = weight;
			this.ctx.strokeStyle = thx.color._RGBA.RGBA_Impl_.toCSS3(lineColor);
			this.ctx.strokeRect(x0,y0,x1 - x0,y1 - y0);
		}
		return this;
	}
	,storeFrame: function(times) {
		if(times == null) times = 1;
		return this;
	}
	,animate: function(x,y) {
		var _g = this;
		var interaction = new minicanvas.CanvasInteraction(this,(function($this) {
			var $r;
			var t;
			{
				var _0 = x;
				if(null == _0) t = null; else t = _0;
			}
			$r = t != null?t:$this.width / 2;
			return $r;
		}(this)),(function($this) {
			var $r;
			var t1;
			{
				var _01 = y;
				if(null == _01) t1 = null; else t1 = _01;
			}
			$r = t1 != null?t1:$this.height;
			return $r;
		}(this)),function(stack) {
			_g.resolveStack(stack,$bind(_g,_g.afterAnimate));
			_g.storeFrame();
		});
		this.beforeAnimate();
		return interaction;
	}
	,'with': function(callback) {
		callback(this,this.width,this.height);
		return this;
	}
	,beforeAnimate: function() {
	}
	,afterAnimate: function() {
	}
	,resolveStack: function(stack,done) {
		if(stack.length == 0) return done();
		(stack.shift())();
		this.storeFrame();
		this.resolveStack(stack,done);
	}
	,onDown: function(callback) {
		return this.onMouseEvent("mousedown",null,callback);
	}
	,onMove: function(callback) {
		return this.onMouseEvent("mousemove",null,callback);
	}
	,onTrail: function(callback) {
		var _g = this;
		var first = true;
		var x0 = 0.0;
		var y0 = 0.0;
		var x1;
		var y1;
		var listener = function(e) {
			if(first) {
				x0 = e.x;
				y0 = e.y;
				first = false;
			} else {
				x1 = e.x;
				y1 = e.y;
				callback({ mini : _g, x0 : x0, y0 : y0, x1 : x1, y1 : y1});
				x0 = x1;
				y0 = y1;
			}
		};
		return this.onMouseEvent("mousemove","trail",listener);
	}
	,onUp: function(callback) {
		return this.onMouseEvent("mouseup",null,callback);
	}
	,offMove: function() {
		return this.offMouseEvent("mousemove");
	}
	,offTrail: function() {
		return this.offMouseEvent("mousemove","trail");
	}
	,down: function(x,y) {
		return this.trigger("mousedown",x,y);
	}
	,move: function(x,y) {
		if(x < 0 || x > this.width || y < 0 || y > this.height) return this;
		this.trigger("mousemove",x,y);
		this.trigger("trail",x,y);
		return this;
	}
	,up: function(x,y) {
		return this.trigger("mouseup",x,y);
	}
	,onMouseEvent: function(type,name,callback) {
		var _g = this;
		if(null == name) name = type;
		this.offMouseEvent(type,name);
		var listener = function(e) {
			var rect = _g.canvas.getBoundingClientRect();
			_g.trigger(name,e.clientX - rect.left,e.clientY - rect.top);
		};
		this.events.h["$" + name] = { callback : callback, listener : listener};
		if(this.isBrowser) this.canvas.addEventListener(type,listener,false);
		return this;
	}
	,offMouseEvent: function(type,name) {
		if(null == name) name = type;
		var item = this.events.h["$" + name];
		if(null == item) return this;
		this.events.remove(name);
		if(this.isBrowser) this.canvas.removeEventListener(type,item.listener,false);
		return this;
	}
	,trigger: function(name,x,y) {
		var item = this.events.h["$" + name];
		if(null == item) return this;
		item.callback({ mini : this, x : x, y : y});
		return this;
	}
	,getDevicePixelRatio: function() {
		throw new thx.core.error.AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 406, className : "minicanvas.MiniCanvas", methodName : "getDevicePixelRatio"});
	}
	,getBackingStoreRatio: function() {
		throw new thx.core.error.AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 409, className : "minicanvas.MiniCanvas", methodName : "getBackingStoreRatio"});
	}
	,init: function() {
		throw new thx.core.error.AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 412, className : "minicanvas.MiniCanvas", methodName : "init"});
	}
	,nativeDisplay: function(name) {
		throw new thx.core.error.AbstractMethod({ fileName : "MiniCanvas.hx", lineNumber : 415, className : "minicanvas.MiniCanvas", methodName : "nativeDisplay"});
	}
	,processScale: function() {
		var _g = this.scaleMode;
		switch(_g[1]) {
		case 1:
			var ratio = this.getDevicePixelRatio() / this.getBackingStoreRatio();
			if(ratio != 1) this.scaleMode = minicanvas.ScaleMode.Scaled(ratio); else this.scaleMode = minicanvas.ScaleMode.NoScale;
			break;
		default:
		}
	}
};
minicanvas.ScaleMode = { __constructs__ : ["NoScale","Auto","Scaled"] };
minicanvas.ScaleMode.NoScale = ["NoScale",0];
minicanvas.ScaleMode.NoScale.__enum__ = minicanvas.ScaleMode;
minicanvas.ScaleMode.Auto = ["Auto",1];
minicanvas.ScaleMode.Auto.__enum__ = minicanvas.ScaleMode;
minicanvas.ScaleMode.Scaled = function(v) { var $x = ["Scaled",2,v]; $x.__enum__ = minicanvas.ScaleMode; return $x; };
minicanvas.BrowserCanvas = function(width,height,scaleMode) {
	this.isNode = false;
	this.isBrowser = true;
	if(null == scaleMode) scaleMode = minicanvas.BrowserCanvas.defaultScaleMode;
	minicanvas.MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas.BrowserCanvas.devicePixelRatio = function() {
	return window.devicePixelRatio || 1;
};
minicanvas.BrowserCanvas.backingStoreRatio = function() {
	if(minicanvas.BrowserCanvas._backingStoreRatio == 0) {
		var canvas;
		var _this = window.document;
		canvas = _this.createElement("canvas");
		var context = canvas.getContext("2d");
		minicanvas.BrowserCanvas._backingStoreRatio = (function(c) {
        return c.webkitBackingStorePixelRatio ||
          c.mozBackingStorePixelRatio ||
          c.msBackingStorePixelRatio ||
          c.oBackingStorePixelRatio ||
          c.backingStorePixelRatio || 1;
        })(context);
	}
	return minicanvas.BrowserCanvas._backingStoreRatio;
};
minicanvas.BrowserCanvas.__super__ = minicanvas.MiniCanvas;
minicanvas.BrowserCanvas.prototype = $extend(minicanvas.MiniCanvas.prototype,{
	append: function(name) {
		var figure = window.document.createElement("figure");
		var caption = window.document.createElement("figcaption");
		figure.className = "minicanvas";
		figure.appendChild(this.canvas);
		caption.innerHTML = thx.core.Strings.humanize(name) + (minicanvas.MiniCanvas.displayGenerationTime?" <span class=\"info\">(" + thx.core.Floats.roundTo(this.deltaTime,2) + "ms)</span>":"");
		figure.appendChild(caption);
		minicanvas.BrowserCanvas.parentNode.appendChild(figure);
	}
	,init: function() {
		var _this = window.document;
		this.canvas = _this.createElement("canvas");
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas.width = Math.round(this.width * v);
				this.canvas.height = Math.round(this.height * v);
				this.canvas.style.width = "" + this.width + "px";
				this.canvas.style.height = "" + this.height + "px";
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,getDevicePixelRatio: function() {
		return minicanvas.BrowserCanvas.devicePixelRatio();
	}
	,getBackingStoreRatio: function() {
		return minicanvas.BrowserCanvas.backingStoreRatio();
	}
	,nativeDisplay: function(name) {
		this.append(name);
	}
	,beforeAnimate: function() {
		this.canvas.style.pointerEvents = "none";
	}
	,afterAnimate: function() {
		this.canvas.style.pointerEvents = "auto";
	}
	,resolveStack: function(stack,done) {
		if(stack.length == 0) return done();
		(stack.shift())();
		this.storeFrame();
		thx.core.Timer.delay((function(f,a1,a2) {
			return function() {
				f(a1,a2);
			};
		})($bind(this,this.resolveStack),stack,done),50);
	}
});
minicanvas.Interaction = function(mini) {
	this.mini = mini;
};
minicanvas.Interaction.prototype = {
	down: function(x,y) {
		return this;
	}
	,move: function(x,y,delta) {
		if(delta == null) delta = 9;
		return this;
	}
	,up: function(x,y) {
		return this;
	}
	,sleep: function(frames) {
		return this;
	}
	,done: function() {
		return this.mini;
	}
};
minicanvas.CanvasInteraction = function(mini,x,y,done) {
	minicanvas.Interaction.call(this,mini);
	this.x = x;
	this.y = y;
	this.stack = [];
	this._done = done;
};
minicanvas.CanvasInteraction.__super__ = minicanvas.Interaction;
minicanvas.CanvasInteraction.prototype = $extend(minicanvas.Interaction.prototype,{
	down: function(x,y) {
		if(this.x != x || this.y != y) this.move(x,y);
		this.stack.push((function(f,x1,y1) {
			return function() {
				return f(x1,y1);
			};
		})(($_=this.mini,$bind($_,$_.down)),x,y));
		return this;
	}
	,move: function(x,y,delta) {
		if(delta == null) delta = 9;
		var dist = Math.sqrt((x - this.x) * (x - this.x) + (y - this.y) * (y - this.y));
		var steps = Math.ceil(dist / delta);
		var dx;
		var dy;
		var step;
		var _g = 0;
		while(_g < steps) {
			var i = _g++;
			step = i / steps;
			dx = Math.round(thx.core.Floats.interpolate(step,this.x,x));
			dy = Math.round(thx.core.Floats.interpolate(step,this.y,y));
			this.stack.push((function(f,x1,y1) {
				return function() {
					return f(x1,y1);
				};
			})(($_=this.mini,$bind($_,$_.move)),dx,dy));
		}
		this.x = x;
		this.y = y;
		return this;
	}
	,up: function(x,y) {
		if(this.x != x || this.y != y) this.move(x,y);
		this.stack.push((function(f,x1,y1) {
			return function() {
				return f(x1,y1);
			};
		})(($_=this.mini,$bind($_,$_.up)),x,y));
		return this;
	}
	,sleep: function(frames) {
		var _g = 0;
		while(_g < frames) {
			var i = _g++;
			this.stack.push(function() {
			});
		}
		return this;
	}
	,done: function() {
		this._done(this.stack);
		return this.mini;
	}
});
minicanvas.NodeCanvas = function(width,height,scaleMode) {
	this.hasFrames = false;
	this.isNode = true;
	this.isBrowser = false;
	if(null == scaleMode) scaleMode = minicanvas.NodeCanvas.defaultScaleMode;
	minicanvas.MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas.NodeCanvas.create = function(width,height,scaleMode) {
	return new minicanvas.MiniCanvas(width,height,scaleMode);
};
minicanvas.NodeCanvas.__super__ = minicanvas.MiniCanvas;
minicanvas.NodeCanvas.prototype = $extend(minicanvas.MiniCanvas.prototype,{
	save: function(name) {
		var encoder = this.ensureEncoder();
		encoder.addFrame(this.ctx);
		encoder.save(name,function(file) {
			console.log("saved " + file);
		});
	}
	,storeFrame: function(times) {
		if(times == null) times = 1;
		this.hasFrames = true;
		if(times <= 0) times = 1;
		var _g = 0;
		while(_g < times) {
			var i = _g++;
			this.ensureEncoder().addFrame(this.ctx);
		}
		return this;
	}
	,init: function() {
		var Canvas = require("canvas");
		{
			var _g = this.scaleMode;
			switch(_g[1]) {
			case 2:
				var v = _g[2];
				this.canvas = new Canvas(this.width * v,this.height * v);
				this.ctx = this.canvas.getContext("2d");
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas = new Canvas(this.width,this.height);
				this.ctx = this.canvas.getContext("2d");
			}
		}
	}
	,getDevicePixelRatio: function() {
		return 1.0;
	}
	,getBackingStoreRatio: function() {
		return 1.0;
	}
	,nativeDisplay: function(name) {
		this.save(name);
	}
	,ensureEncoder: function() {
		if(null != this.encoder) return this.encoder;
		if(this.hasFrames) return this.encoder = new minicanvas.node.GifEncoder(this.width,this.height); else return this.encoder = new minicanvas.node.PNGEncoder(this.canvas);
	}
});
minicanvas.node = {};
minicanvas.node.IEncoder = function() { };
minicanvas.node.GifEncoder = function(width,height) {
	this.frames = 0;
	this.encoder = (function(w, h, self) {
      var GIFEncoder = require('gifencoder'),
          encoder = new GIFEncoder(w, h);
      self.stream = encoder.createReadStream();
      encoder.start();
      encoder.setRepeat(0);
      encoder.setDelay(50);
      encoder.setQuality(10);
      return encoder;
    })(width,height,this);
};
minicanvas.node.GifEncoder.__interfaces__ = [minicanvas.node.IEncoder];
minicanvas.node.GifEncoder.prototype = {
	addFrame: function(ctx) {
		this.encoder.addFrame(ctx);
		this.frames++;
	}
	,save: function(name,callback) {
		this.stream.pipe(require("fs").createWriteStream("" + minicanvas.NodeCanvas.imagePath + "/" + name + ".gif"));
		callback("" + name + ".gif (frames " + this.frames + ")");
	}
};
minicanvas.node.PNGEncoder = function(canvas) {
	this.canvas = canvas;
};
minicanvas.node.PNGEncoder.__interfaces__ = [minicanvas.node.IEncoder];
minicanvas.node.PNGEncoder.prototype = {
	addFrame: function(ctx) {
	}
	,save: function(name,callback) {
		var fs = require("fs");
		var out = fs.createWriteStream("" + minicanvas.NodeCanvas.imagePath + "/" + name + ".png");
		var stream = this.canvas.pngStream();
		stream.on("data",function(chunk) {
			out.write(chunk);
		});
		stream.on("end",function(_) {
			callback("" + name + ".png");
		});
	}
};
var thx = {};
thx.color = {};
thx.color.Color = function() { };
thx.color._Grey = {};
thx.color._Grey.Grey_Impl_ = {};
thx.color._Grey.Grey_Impl_.toRGBA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toRGBA(thx.color._Grey.Grey_Impl_.toRGBXA(this1));
};
thx.color._Grey.Grey_Impl_.toRGBX = function(this1) {
	return [this1,this1,this1];
};
thx.color._Grey.Grey_Impl_.toRGBXA = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toRGBXA(thx.color._Grey.Grey_Impl_.toRGBX(this1));
};
thx.color._HSL = {};
thx.color._HSL.HSL_Impl_ = {};
thx.color._HSL.HSL_Impl_.create = function(hue,saturation,lightness) {
	var channels = [thx.core.Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness];
	return channels;
};
thx.color._HSL.HSL_Impl_.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var _0 = thx.color._HSL.HSL_Impl_.rotate(this1,-spread);
	var _1 = thx.color._HSL.HSL_Impl_.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx.color._HSL.HSL_Impl_.rotate = function(this1,angle) {
	return thx.color._HSL.HSL_Impl_.withHue(this1,this1[0] + angle);
};
thx.color._HSL.HSL_Impl_.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var _0 = thx.color._HSL.HSL_Impl_.rotate(this1,-spread);
	var _1 = thx.color._HSL.HSL_Impl_.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx.color._HSL.HSL_Impl_.withHue = function(this1,newhue) {
	var channels = [thx.core.Floats.wrapCircular(newhue,360),this1[1],this1[2]];
	return channels;
};
thx.color._HSL.HSL_Impl_.toRGBA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toRGBA(thx.color._HSL.HSL_Impl_.toRGBXA(this1));
};
thx.color._HSL.HSL_Impl_.toRGBX = function(this1) {
	var channels = [thx.color._HSL.HSL_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSL.HSL_Impl_._c(this1[0] - 120,this1[1],this1[2])];
	return channels;
};
thx.color._HSL.HSL_Impl_.toRGBXA = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toRGBXA(thx.color._HSL.HSL_Impl_.toRGBX(this1));
};
thx.color._HSL.HSL_Impl_._c = function(d,s,l) {
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx.core.Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
thx.color._HSLA = {};
thx.color._HSLA.HSLA_Impl_ = {};
thx.color._HSLA.HSLA_Impl_.create = function(hue,saturation,lightness,alpha) {
	var channels = [thx.core.Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness,alpha < 0?0:alpha > 1?1:alpha];
	return channels;
};
thx.color._HSLA.HSLA_Impl_.toRGBA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toRGBA(thx.color._HSLA.HSLA_Impl_.toRGBXA(this1));
};
thx.color._HSLA.HSLA_Impl_.toRGBXA = function(this1) {
	var channels = [thx.color._HSLA.HSLA_Impl_._c(this1[0] + 120,this1[1],this1[2]),thx.color._HSLA.HSLA_Impl_._c(this1[0],this1[1],this1[2]),thx.color._HSLA.HSLA_Impl_._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	return channels;
};
thx.color._HSLA.HSLA_Impl_._c = function(d,s,l) {
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx.core.Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
thx.color._HSV = {};
thx.color._HSV.HSV_Impl_ = {};
thx.color._HSV.HSV_Impl_.create = function(hue,saturation,lightness) {
	var channels = [thx.core.Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness];
	return channels;
};
thx.color._HSV.HSV_Impl_.toRGBA = function(this1) {
	return thx.color._RGBXA.RGBXA_Impl_.toRGBA(thx.color._HSV.HSV_Impl_.toRGBXA(this1));
};
thx.color._HSV.HSV_Impl_.toRGBX = function(this1) {
	if(this1[1] == 0) return [this1[2],this1[2],this1[2]];
	var r;
	var g;
	var b;
	var i;
	var f;
	var p;
	var q;
	var t;
	var h = this1[0] / 60;
	i = Math.floor(h);
	f = h - i;
	p = this1[2] * (1 - this1[1]);
	q = this1[2] * (1 - f * this1[1]);
	t = this1[2] * (1 - (1 - f) * this1[1]);
	switch(i) {
	case 0:
		r = this1[2];
		g = t;
		b = p;
		break;
	case 1:
		r = q;
		g = this1[2];
		b = p;
		break;
	case 2:
		r = p;
		g = this1[2];
		b = t;
		break;
	case 3:
		r = p;
		g = q;
		b = this1[2];
		break;
	case 4:
		r = t;
		g = p;
		b = this1[2];
		break;
	default:
		r = this1[2];
		g = p;
		b = q;
	}
	return [r,g,b];
};
thx.color._HSV.HSV_Impl_.toRGBXA = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.toRGBXA(thx.color._HSV.HSV_Impl_.toRGBX(this1));
};
thx.color._RGB = {};
thx.color._RGB.RGB_Impl_ = {};
thx.color._RGB.RGB_Impl_.create = function(red,green,blue) {
	return (red & 255) << 16 | (green & 255) << 8 | blue & 255;
};
thx.color._RGB.RGB_Impl_.fromInts = function(arr) {
	thx.core.ArrayInts.resize(arr,3);
	return thx.color._RGB.RGB_Impl_.create(arr[0],arr[1],arr[2]);
};
thx.color._RGB.RGB_Impl_.withAlpha = function(this1,alpha) {
	return thx.color._RGBA.RGBA_Impl_.fromInts([thx.color._RGB.RGB_Impl_.get_red(this1),thx.color._RGB.RGB_Impl_.get_green(this1),thx.color._RGB.RGB_Impl_.get_blue(this1),alpha]);
};
thx.color._RGB.RGB_Impl_.toRGBA = function(this1) {
	return thx.color._RGB.RGB_Impl_.withAlpha(this1,255);
};
thx.color._RGB.RGB_Impl_.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx.color._RGB.RGB_Impl_.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx.color._RGB.RGB_Impl_.get_blue = function(this1) {
	return this1 & 255;
};
thx.color._RGBA = {};
thx.color._RGBA.RGBA_Impl_ = {};
thx.color._RGBA.RGBA_Impl_.create = function(red,green,blue,alpha) {
	return (red & 255) << 24 | (green & 255) << 16 | (blue & 255) << 8 | alpha & 255;
};
thx.color._RGBA.RGBA_Impl_.fromFloats = function(arr) {
	var ints = thx.core.ArrayFloats.resize(arr,4).map(function(_) {
		return Math.round(_ * 255);
	});
	return thx.color._RGBA.RGBA_Impl_.create(ints[0],ints[1],ints[2],ints[3]);
};
thx.color._RGBA.RGBA_Impl_.fromInts = function(arr) {
	thx.core.ArrayInts.resize(arr,4);
	return thx.color._RGBA.RGBA_Impl_.create(arr[0],arr[1],arr[2],arr[3]);
};
thx.color._RGBA.RGBA_Impl_.fromString = function(color) {
	var info = thx.color.parse.ColorParser.parseHex(color);
	if(null == info) info = thx.color.parse.ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx.color._RGB.RGB_Impl_.toRGBA(thx.color._RGB.RGB_Impl_.fromInts(thx.color.parse.ColorParser.getInt8Channels(info.channels,3)));
		case "rgba":
			return thx.color._RGBA.RGBA_Impl_.create(thx.color.parse.ColorParser.getInt8Channel(info.channels[0]),thx.color.parse.ColorParser.getInt8Channel(info.channels[1]),thx.color.parse.ColorParser.getInt8Channel(info.channels[2]),Math.round(thx.color.parse.ColorParser.getFloatChannel(info.channels[3]) * 255));
		default:
			return null;
		}
	} catch( e ) {
		return null;
	}
};
thx.color._RGBA.RGBA_Impl_.toCSS3 = function(this1) {
	return thx.color._RGBA.RGBA_Impl_.toString(this1);
};
thx.color._RGBA.RGBA_Impl_.toString = function(this1) {
	return "rgba(" + (this1 >> 24 & 255) + "," + (this1 >> 16 & 255) + "," + (this1 >> 8 & 255) + "," + (this1 & 255) / 255 + ")";
};
thx.color._RGBX = {};
thx.color._RGBX.RGBX_Impl_ = {};
thx.color._RGBX.RGBX_Impl_.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha < 0?0:alpha > 1?1:alpha]);
	return channels;
};
thx.color._RGBX.RGBX_Impl_.toRGBXA = function(this1) {
	return thx.color._RGBX.RGBX_Impl_.withAlpha(this1,1.0);
};
thx.color._RGBXA = {};
thx.color._RGBXA.RGBXA_Impl_ = {};
thx.color._RGBXA.RGBXA_Impl_.toRGBA = function(this1) {
	return thx.color._RGBA.RGBA_Impl_.fromFloats([this1[0],this1[1],this1[2],this1[3]]);
};
thx.color.parse = {};
thx.color.parse.ColorParser = function() {
	this.pattern_color = new EReg("^\\s*([^(]+)\\s*\\(([^)]*)\\)\\s*$","i");
	this.pattern_channel = new EReg("^\\s*(\\d*.\\d+|\\d+)(%|deg|rad)?\\s*$","i");
};
thx.color.parse.ColorParser.parseColor = function(s) {
	return thx.color.parse.ColorParser.parser.processColor(s);
};
thx.color.parse.ColorParser.parseHex = function(s) {
	return thx.color.parse.ColorParser.parser.processHex(s);
};
thx.color.parse.ColorParser.getInt8Channels = function(channels,length) {
	if(length != channels.length) throw "invalid number of channels, expected " + length + " but it is " + channels.length;
	return channels.map(thx.color.parse.ColorParser.getInt8Channel);
};
thx.color.parse.ColorParser.getFloatChannel = function(channel,useInt8) {
	if(useInt8 == null) useInt8 = true;
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) return 1; else return 0;
		break;
	case 1:
		var v1 = channel[2];
		return v1;
	case 4:
		var v2 = channel[2];
		return v2;
	case 2:
		var v3 = channel[2];
		return v3;
	case 3:
		var v4 = channel[2];
		if(useInt8) return v4 / 255; else {
			var v5 = channel[2];
			return v5;
		}
		break;
	case 0:
		var v6 = channel[2];
		return v6 / 100;
	}
};
thx.color.parse.ColorParser.getInt8Channel = function(channel) {
	switch(channel[1]) {
	case 5:
		var v = channel[2];
		if(v) return 1; else return 0;
		break;
	case 3:
		var v1 = channel[2];
		return v1;
	case 0:
		var v2 = channel[2];
		return Math.round(255 * v2 / 100);
	default:
		throw "unable to extract a valid int8 value";
	}
};
thx.color.parse.ColorParser.prototype = {
	processHex: function(s) {
		if(!thx.color.parse.ColorParser.isPureHex.match(s)) {
			if(HxOverrides.substr(s,0,1) == "#") {
				if(s.length == 4) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3); else if(s.length == 5) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3) + s.charAt(4) + s.charAt(4); else s = HxOverrides.substr(s,1,null);
			} else if(HxOverrides.substr(s,0,2) == "0x") s = HxOverrides.substr(s,2,null); else return null;
		}
		var channels = [];
		while(s.length > 0) {
			channels.push(thx.color.parse.ChannelInfo.CIInt8(Std.parseInt("0x" + HxOverrides.substr(s,0,2))));
			s = HxOverrides.substr(s,2,null);
		}
		if(channels.length == 4) return new thx.color.parse.ColorInfo("rgba",channels.slice(1).concat([channels[0]])); else return new thx.color.parse.ColorInfo("rgb",channels);
	}
	,processColor: function(s) {
		if(!this.pattern_color.match(s)) return null;
		var name = this.pattern_color.matched(1);
		if(null == name) return null;
		name = name.toLowerCase();
		var m2 = this.pattern_color.matched(2);
		var s_channels;
		if(null == m2) s_channels = []; else s_channels = m2.split(",");
		var channels = [];
		var channel;
		var _g = 0;
		while(_g < s_channels.length) {
			var s_channel = s_channels[_g];
			++_g;
			channel = this.processChannel(s_channel);
			if(null == channel) return null;
			channels.push(channel);
		}
		return new thx.color.parse.ColorInfo(name,channels);
	}
	,processChannel: function(s) {
		if(!this.pattern_channel.match(s)) return null;
		var value = this.pattern_channel.matched(1);
		var unit = this.pattern_channel.matched(2);
		if(unit == null) unit = "";
		try {
			switch(unit) {
			case "%":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIPercent(thx.core.Floats.parse(value)); else return null;
				break;
			case "deg":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value)); else return null;
				break;
			case "DEG":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value)); else return null;
				break;
			case "rad":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "RAD":
				if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIDegree(thx.core.Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "":
				if(thx.core.Ints.canParse(value)) {
					var i = thx.core.Ints.parse(value);
					if(i == 0) return thx.color.parse.ChannelInfo.CIBool(false); else if(i == 1) return thx.color.parse.ChannelInfo.CIBool(true); else if(i < 256) return thx.color.parse.ChannelInfo.CIInt8(i); else return thx.color.parse.ChannelInfo.CIInt(i);
				} else if(thx.core.Floats.canParse(value)) return thx.color.parse.ChannelInfo.CIFloat(thx.core.Floats.parse(value)); else return null;
				break;
			default:
				return null;
			}
		} catch( e ) {
			return null;
		}
	}
};
thx.color.parse.ColorInfo = function(name,channels) {
	this.name = name;
	this.channels = channels;
};
thx.color.parse.ChannelInfo = { __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx.color.parse.ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.color.parse.ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx.color.parse.ChannelInfo; return $x; };
thx.core = {};
thx.core.ArrayFloats = function() { };
thx.core.ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.ArrayInts = function() { };
thx.core.ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
thx.core.Error = function(message,stack,pos) {
	Error.call(this,message);
	this.message = message;
	if(null == stack) {
		try {
			stack = haxe.CallStack.exceptionStack();
		} catch( e ) {
			stack = [];
		}
		if(stack.length == 0) try {
			stack = haxe.CallStack.callStack();
		} catch( e1 ) {
			stack = [];
		}
	}
	this.stackItems = stack;
	this.pos = pos;
};
thx.core.Error.__super__ = Error;
thx.core.Error.prototype = $extend(Error.prototype,{
	toString: function() {
		return this.message + "\nfrom: " + this.pos.className + "." + this.pos.methodName + "() at " + this.pos.lineNumber + "\n\n" + haxe.CallStack.toString(this.stackItems);
	}
});
thx.core.Floats = function() { };
thx.core.Floats.canParse = function(s) {
	return thx.core.Floats.pattern_parse.match(s);
};
thx.core.Floats.interpolate = function(f,a,b) {
	return (b - a) * f + a;
};
thx.core.Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx.core.Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
thx.core.Floats.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
thx.core.Ints = function() { };
thx.core.Ints.canParse = function(s) {
	return thx.core.Ints.pattern_parse.match(s);
};
thx.core.Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
thx.core.Strings = function() { };
thx.core.Strings.humanize = function(s) {
	return StringTools.replace(thx.core.Strings.underscore(s),"_"," ");
};
thx.core.Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
thx.core.Timer = function() { };
thx.core.Timer.delay = function(callback,delayms) {
	return (function(f,id) {
		return function() {
			f(id);
		};
	})(thx.core.Timer.clear,setTimeout(callback,delayms));
};
thx.core.Timer.clear = function(id) {
	clearTimeout(id);
	return;
};
thx.core.error = {};
thx.core.error.AbstractMethod = function(posInfo) {
	thx.core.Error.call(this,"method " + posInfo.className + "." + posInfo.methodName + "() is abstract",null,posInfo);
};
thx.core.error.AbstractMethod.__super__ = thx.core.Error;
thx.core.error.AbstractMethod.prototype = $extend(thx.core.Error.prototype,{
});
thx.math = {};
thx.math.random = {};
thx.math.random.PseudoRandom = function(seed) {
	if(seed == null) seed = 1;
	this.seed = seed;
};
thx.math.random.PseudoRandom.prototype = {
	'float': function() {
		return ((this.seed = this.seed * 48271.0 % 2147483647.0 | 0) & 1073741823) / 1073741823.0;
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
thx.color.Color.names = new haxe.ds.StringMap();
var value = thx.color.Color.aliceblue = 15792383;
thx.color.Color.names.h["$" + "aliceblue"] = value;
thx.color.Color.names.h["$" + "alice blue"] = thx.color.Color.aliceblue;
var value1 = thx.color.Color.antiquewhite = 16444375;
thx.color.Color.names.h["$" + "antiquewhite"] = value1;
thx.color.Color.names.h["$" + "antique white"] = thx.color.Color.antiquewhite;
var value2 = thx.color.Color.aqua = 65535;
thx.color.Color.names.h["$" + "aqua"] = value2;
var value3 = thx.color.Color.aquamarine = 8388564;
thx.color.Color.names.h["$" + "aquamarine"] = value3;
var value4 = thx.color.Color.azure = 15794175;
thx.color.Color.names.h["$" + "azure"] = value4;
var value5 = thx.color.Color.beige = 16119260;
thx.color.Color.names.h["$" + "beige"] = value5;
var value6 = thx.color.Color.bisque = 16770244;
thx.color.Color.names.h["$" + "bisque"] = value6;
var value7 = thx.color.Color.black = 0;
thx.color.Color.names.h["$" + "black"] = value7;
var value8 = thx.color.Color.blanchedalmond = 16772045;
thx.color.Color.names.h["$" + "blanchedalmond"] = value8;
thx.color.Color.names.h["$" + "blanched almond"] = thx.color.Color.blanchedalmond;
var value9 = thx.color.Color.blue = 255;
thx.color.Color.names.h["$" + "blue"] = value9;
var value10 = thx.color.Color.blueviolet = 9055202;
thx.color.Color.names.h["$" + "blueviolet"] = value10;
thx.color.Color.names.h["$" + "blue violet"] = thx.color.Color.blueviolet;
var value11 = thx.color.Color.brown = 10824234;
thx.color.Color.names.h["$" + "brown"] = value11;
var value12 = thx.color.Color.burlywood = 14596231;
thx.color.Color.names.h["$" + "burlywood"] = value12;
thx.color.Color.names.h["$" + "burly wood"] = thx.color.Color.burlywood;
var value13 = thx.color.Color.cadetblue = 6266528;
thx.color.Color.names.h["$" + "cadetblue"] = value13;
thx.color.Color.names.h["$" + "cadet blue"] = thx.color.Color.cadetblue;
var value14 = thx.color.Color.chartreuse = 8388352;
thx.color.Color.names.h["$" + "chartreuse"] = value14;
thx.color.Color.names.h["$" + "chart reuse"] = thx.color.Color.chartreuse;
var value15 = thx.color.Color.chocolate = 13789470;
thx.color.Color.names.h["$" + "chocolate"] = value15;
var value16 = thx.color.Color.coral = 16744272;
thx.color.Color.names.h["$" + "coral"] = value16;
var value17 = thx.color.Color.cornflowerblue = 6591981;
thx.color.Color.names.h["$" + "cornflowerblue"] = value17;
thx.color.Color.names.h["$" + "corn flower blue"] = thx.color.Color.cornflowerblue;
var value18 = thx.color.Color.cornsilk = 16775388;
thx.color.Color.names.h["$" + "cornsilk"] = value18;
thx.color.Color.names.h["$" + "corn silk"] = thx.color.Color.cornsilk;
var value19 = thx.color.Color.crimson = 14423100;
thx.color.Color.names.h["$" + "crimson"] = value19;
var value20 = thx.color.Color.cyan = 65535;
thx.color.Color.names.h["$" + "cyan"] = value20;
var value21 = thx.color.Color.darkblue = 139;
thx.color.Color.names.h["$" + "darkblue"] = value21;
thx.color.Color.names.h["$" + "dark blue"] = thx.color.Color.darkblue;
var value22 = thx.color.Color.darkcyan = 35723;
thx.color.Color.names.h["$" + "darkcyan"] = value22;
thx.color.Color.names.h["$" + "dark cyan"] = thx.color.Color.darkcyan;
var value23 = thx.color.Color.darkgoldenrod = 12092939;
thx.color.Color.names.h["$" + "darkgoldenrod"] = value23;
thx.color.Color.names.h["$" + "dark golden rod"] = thx.color.Color.darkgoldenrod;
var value24 = thx.color.Color.darkgray = thx.color.Color.darkgrey = 11119017;
thx.color.Color.names.h["$" + "darkgray"] = value24;
thx.color.Color.names.h["$" + "dark gray"] = thx.color.Color.darkgray;
thx.color.Color.names.h["$" + "darkgrey"] = thx.color.Color.darkgrey;
thx.color.Color.names.h["$" + "dark grey"] = thx.color.Color.darkgrey;
var value25 = thx.color.Color.darkgreen = 25600;
thx.color.Color.names.h["$" + "darkgreen"] = value25;
thx.color.Color.names.h["$" + "dark green"] = thx.color.Color.darkgreen;
var value26 = thx.color.Color.darkkhaki = 12433259;
thx.color.Color.names.h["$" + "darkkhaki"] = value26;
thx.color.Color.names.h["$" + "dark khaki"] = thx.color.Color.darkkhaki;
var value27 = thx.color.Color.darkmagenta = 9109643;
thx.color.Color.names.h["$" + "darkmagenta"] = value27;
thx.color.Color.names.h["$" + "dark magenta"] = thx.color.Color.darkmagenta;
var value28 = thx.color.Color.darkolivegreen = 5597999;
thx.color.Color.names.h["$" + "darkolivegreen"] = value28;
thx.color.Color.names.h["$" + "dark olive green"] = thx.color.Color.darkolivegreen;
var value29 = thx.color.Color.darkorange = 16747520;
thx.color.Color.names.h["$" + "darkorange"] = value29;
thx.color.Color.names.h["$" + "dark orange"] = thx.color.Color.darkorange;
var value30 = thx.color.Color.darkorchid = 10040012;
thx.color.Color.names.h["$" + "darkorchid"] = value30;
thx.color.Color.names.h["$" + "dark orchid"] = thx.color.Color.darkorchid;
var value31 = thx.color.Color.darkred = 9109504;
thx.color.Color.names.h["$" + "darkred"] = value31;
thx.color.Color.names.h["$" + "dark red"] = thx.color.Color.darkred;
var value32 = thx.color.Color.darksalmon = 15308410;
thx.color.Color.names.h["$" + "darksalmon"] = value32;
thx.color.Color.names.h["$" + "dark salmon"] = thx.color.Color.darksalmon;
var value33 = thx.color.Color.darkseagreen = 9419919;
thx.color.Color.names.h["$" + "darkseagreen"] = value33;
thx.color.Color.names.h["$" + "dark sea green"] = thx.color.Color.darkseagreen;
var value34 = thx.color.Color.darkslateblue = 4734347;
thx.color.Color.names.h["$" + "darkslateblue"] = value34;
thx.color.Color.names.h["$" + "dark slate blue"] = thx.color.Color.darkslateblue;
var value35 = thx.color.Color.darkslategray = thx.color.Color.darkslategrey = 3100495;
thx.color.Color.names.h["$" + "darkslategray"] = value35;
thx.color.Color.names.h["$" + "dark slate gray"] = thx.color.Color.darkslategray;
thx.color.Color.names.h["$" + "darkslategrey"] = thx.color.Color.darkslategrey;
thx.color.Color.names.h["$" + "dark slate grey"] = thx.color.Color.darkslategrey;
var value36 = thx.color.Color.darkturquoise = 52945;
thx.color.Color.names.h["$" + "darkturquoise"] = value36;
thx.color.Color.names.h["$" + "dark turquoise"] = thx.color.Color.darkturquoise;
var value37 = thx.color.Color.darkviolet = 9699539;
thx.color.Color.names.h["$" + "darkviolet"] = value37;
thx.color.Color.names.h["$" + "dark violet"] = thx.color.Color.darkviolet;
var value38 = thx.color.Color.deeppink = 16716947;
thx.color.Color.names.h["$" + "deeppink"] = value38;
thx.color.Color.names.h["$" + "deep pink"] = thx.color.Color.deeppink;
var value39 = thx.color.Color.deepskyblue = 49151;
thx.color.Color.names.h["$" + "deepskyblue"] = value39;
thx.color.Color.names.h["$" + "deep sky blue"] = thx.color.Color.deepskyblue;
var value40 = thx.color.Color.dimgray = thx.color.Color.dimgrey = 6908265;
thx.color.Color.names.h["$" + "dimgray"] = value40;
thx.color.Color.names.h["$" + "dim gray"] = thx.color.Color.dimgray;
thx.color.Color.names.h["$" + "dimgrey"] = thx.color.Color.dimgrey;
thx.color.Color.names.h["$" + "dim grey"] = thx.color.Color.dimgrey;
var value41 = thx.color.Color.dodgerblue = 2003199;
thx.color.Color.names.h["$" + "dodgerblue"] = value41;
thx.color.Color.names.h["$" + "dodger blue"] = thx.color.Color.dodgerblue;
var value42 = thx.color.Color.firebrick = 11674146;
thx.color.Color.names.h["$" + "firebrick"] = value42;
thx.color.Color.names.h["$" + "fire brick"] = thx.color.Color.firebrick;
var value43 = thx.color.Color.floralwhite = 16775920;
thx.color.Color.names.h["$" + "floralwhite"] = value43;
thx.color.Color.names.h["$" + "floral white"] = thx.color.Color.floralwhite;
var value44 = thx.color.Color.forestgreen = 2263842;
thx.color.Color.names.h["$" + "forestgreen"] = value44;
thx.color.Color.names.h["$" + "forest green"] = thx.color.Color.forestgreen;
var value45 = thx.color.Color.fuchsia = 16711935;
thx.color.Color.names.h["$" + "fuchsia"] = value45;
var value46 = thx.color.Color.gainsboro = 14474460;
thx.color.Color.names.h["$" + "gainsboro"] = value46;
var value47 = thx.color.Color.ghostwhite = 16316671;
thx.color.Color.names.h["$" + "ghostwhite"] = value47;
thx.color.Color.names.h["$" + "ghost white"] = thx.color.Color.ghostwhite;
var value48 = thx.color.Color.gold = 16766720;
thx.color.Color.names.h["$" + "gold"] = value48;
var value49 = thx.color.Color.goldenrod = 14329120;
thx.color.Color.names.h["$" + "goldenrod"] = value49;
thx.color.Color.names.h["$" + "golden rod"] = thx.color.Color.goldenrod;
var value50 = thx.color.Color.gray = thx.color.Color.grey = 8421504;
thx.color.Color.names.h["$" + "gray"] = value50;
thx.color.Color.names.h["$" + "grey"] = thx.color.Color.grey;
var value51 = thx.color.Color.green = 32768;
thx.color.Color.names.h["$" + "green"] = value51;
var value52 = thx.color.Color.greenyellow = 11403055;
thx.color.Color.names.h["$" + "greenyellow"] = value52;
thx.color.Color.names.h["$" + "green yellow"] = thx.color.Color.greenyellow;
var value53 = thx.color.Color.honeydew = 15794160;
thx.color.Color.names.h["$" + "honeydew"] = value53;
thx.color.Color.names.h["$" + "honey dew"] = thx.color.Color.honeydew;
var value54 = thx.color.Color.hotpink = 16738740;
thx.color.Color.names.h["$" + "hotpink"] = value54;
thx.color.Color.names.h["$" + "hot pink"] = thx.color.Color.hotpink;
var value55 = thx.color.Color.indianred = 13458524;
thx.color.Color.names.h["$" + "indianred"] = value55;
thx.color.Color.names.h["$" + "indian red"] = thx.color.Color.indianred;
var value56 = thx.color.Color.indigo = 4915330;
thx.color.Color.names.h["$" + "indigo"] = value56;
var value57 = thx.color.Color.ivory = 16777200;
thx.color.Color.names.h["$" + "ivory"] = value57;
var value58 = thx.color.Color.khaki = 15787660;
thx.color.Color.names.h["$" + "khaki"] = value58;
var value59 = thx.color.Color.lavender = 15132410;
thx.color.Color.names.h["$" + "lavender"] = value59;
var value60 = thx.color.Color.lavenderblush = 16773365;
thx.color.Color.names.h["$" + "lavenderblush"] = value60;
thx.color.Color.names.h["$" + "lavender blush"] = thx.color.Color.lavenderblush;
var value61 = thx.color.Color.lawngreen = 8190976;
thx.color.Color.names.h["$" + "lawngreen"] = value61;
thx.color.Color.names.h["$" + "lawn green"] = thx.color.Color.lawngreen;
var value62 = thx.color.Color.lemonchiffon = 16775885;
thx.color.Color.names.h["$" + "lemonchiffon"] = value62;
thx.color.Color.names.h["$" + "lemon chiffon"] = thx.color.Color.lemonchiffon;
var value63 = thx.color.Color.lightblue = 11393254;
thx.color.Color.names.h["$" + "lightblue"] = value63;
thx.color.Color.names.h["$" + "light blue"] = thx.color.Color.lightblue;
var value64 = thx.color.Color.lightcoral = 15761536;
thx.color.Color.names.h["$" + "lightcoral"] = value64;
thx.color.Color.names.h["$" + "light coral"] = thx.color.Color.lightcoral;
var value65 = thx.color.Color.lightcyan = 14745599;
thx.color.Color.names.h["$" + "lightcyan"] = value65;
thx.color.Color.names.h["$" + "light cyan"] = thx.color.Color.lightcyan;
var value66 = thx.color.Color.lightgoldenrodyellow = 16448210;
thx.color.Color.names.h["$" + "lightgoldenrodyellow"] = value66;
thx.color.Color.names.h["$" + "light golden rod yellow"] = thx.color.Color.lightgoldenrodyellow;
var value67 = thx.color.Color.lightgray = thx.color.Color.lightgrey = 13882323;
thx.color.Color.names.h["$" + "lightgray"] = value67;
thx.color.Color.names.h["$" + "light gray"] = thx.color.Color.lightgray;
thx.color.Color.names.h["$" + "lightgrey"] = thx.color.Color.lightgrey;
thx.color.Color.names.h["$" + "light grey"] = thx.color.Color.lightgrey;
var value68 = thx.color.Color.lightgreen = 9498256;
thx.color.Color.names.h["$" + "lightgreen"] = value68;
thx.color.Color.names.h["$" + "light green"] = thx.color.Color.lightgreen;
var value69 = thx.color.Color.lightpink = 16758465;
thx.color.Color.names.h["$" + "lightpink"] = value69;
thx.color.Color.names.h["$" + "light pink"] = thx.color.Color.lightpink;
var value70 = thx.color.Color.lightsalmon = 16752762;
thx.color.Color.names.h["$" + "lightsalmon"] = value70;
thx.color.Color.names.h["$" + "light salmon"] = thx.color.Color.lightsalmon;
var value71 = thx.color.Color.lightseagreen = 2142890;
thx.color.Color.names.h["$" + "lightseagreen"] = value71;
thx.color.Color.names.h["$" + "light sea green"] = thx.color.Color.lightseagreen;
var value72 = thx.color.Color.lightskyblue = 8900346;
thx.color.Color.names.h["$" + "lightskyblue"] = value72;
thx.color.Color.names.h["$" + "light sky blue"] = thx.color.Color.lightskyblue;
var value73 = thx.color.Color.lightslategray = thx.color.Color.lightslategrey = 7833753;
thx.color.Color.names.h["$" + "lightslategray"] = value73;
thx.color.Color.names.h["$" + "light slate gray"] = thx.color.Color.lightslategray;
thx.color.Color.names.h["$" + "lightslategrey"] = thx.color.Color.lightslategrey;
thx.color.Color.names.h["$" + "light slate grey"] = thx.color.Color.lightslategrey;
var value74 = thx.color.Color.lightsteelblue = 11584734;
thx.color.Color.names.h["$" + "lightsteelblue"] = value74;
thx.color.Color.names.h["$" + "light steel blue"] = thx.color.Color.lightsteelblue;
var value75 = thx.color.Color.lightyellow = 16777184;
thx.color.Color.names.h["$" + "lightyellow"] = value75;
thx.color.Color.names.h["$" + "light yellow"] = thx.color.Color.lightyellow;
var value76 = thx.color.Color.lime = 65280;
thx.color.Color.names.h["$" + "lime"] = value76;
var value77 = thx.color.Color.limegreen = 3329330;
thx.color.Color.names.h["$" + "limegreen"] = value77;
thx.color.Color.names.h["$" + "lime green"] = thx.color.Color.limegreen;
var value78 = thx.color.Color.linen = 16445670;
thx.color.Color.names.h["$" + "linen"] = value78;
var value79 = thx.color.Color.magenta = 16711935;
thx.color.Color.names.h["$" + "magenta"] = value79;
var value80 = thx.color.Color.maroon = 8388608;
thx.color.Color.names.h["$" + "maroon"] = value80;
var value81 = thx.color.Color.mediumaquamarine = 6737322;
thx.color.Color.names.h["$" + "mediumaquamarine"] = value81;
thx.color.Color.names.h["$" + "mediuma quamarine"] = thx.color.Color.mediumaquamarine;
var value82 = thx.color.Color.mediumblue = 205;
thx.color.Color.names.h["$" + "mediumblue"] = value82;
thx.color.Color.names.h["$" + "medium blue"] = thx.color.Color.mediumblue;
var value83 = thx.color.Color.mediumorchid = 12211667;
thx.color.Color.names.h["$" + "mediumorchid"] = value83;
thx.color.Color.names.h["$" + "medium orchid"] = thx.color.Color.mediumorchid;
var value84 = thx.color.Color.mediumpurple = 9662683;
thx.color.Color.names.h["$" + "mediumpurple"] = value84;
thx.color.Color.names.h["$" + "medium purple"] = thx.color.Color.mediumpurple;
var value85 = thx.color.Color.mediumseagreen = 3978097;
thx.color.Color.names.h["$" + "mediumseagreen"] = value85;
thx.color.Color.names.h["$" + "medium sea green"] = thx.color.Color.mediumseagreen;
var value86 = thx.color.Color.mediumslateblue = 8087790;
thx.color.Color.names.h["$" + "mediumslateblue"] = value86;
thx.color.Color.names.h["$" + "medium slate blue"] = thx.color.Color.mediumslateblue;
var value87 = thx.color.Color.mediumspringgreen = 64154;
thx.color.Color.names.h["$" + "mediumspringgreen"] = value87;
thx.color.Color.names.h["$" + "medium spring green"] = thx.color.Color.mediumspringgreen;
var value88 = thx.color.Color.mediumturquoise = 4772300;
thx.color.Color.names.h["$" + "mediumturquoise"] = value88;
thx.color.Color.names.h["$" + "medium turquoise"] = thx.color.Color.mediumturquoise;
var value89 = thx.color.Color.mediumvioletred = 13047173;
thx.color.Color.names.h["$" + "mediumvioletred"] = value89;
thx.color.Color.names.h["$" + "medium violet red"] = thx.color.Color.mediumvioletred;
var value90 = thx.color.Color.midnightblue = 1644912;
thx.color.Color.names.h["$" + "midnightblue"] = value90;
thx.color.Color.names.h["$" + "midnight blue"] = thx.color.Color.midnightblue;
var value91 = thx.color.Color.mintcream = 16121850;
thx.color.Color.names.h["$" + "mintcream"] = value91;
thx.color.Color.names.h["$" + "mint cream"] = thx.color.Color.mintcream;
var value92 = thx.color.Color.mistyrose = 16770273;
thx.color.Color.names.h["$" + "mistyrose"] = value92;
thx.color.Color.names.h["$" + "misty rose"] = thx.color.Color.mistyrose;
var value93 = thx.color.Color.moccasin = 16770229;
thx.color.Color.names.h["$" + "moccasin"] = value93;
var value94 = thx.color.Color.navajowhite = 16768685;
thx.color.Color.names.h["$" + "navajowhite"] = value94;
thx.color.Color.names.h["$" + "navajo white"] = thx.color.Color.navajowhite;
var value95 = thx.color.Color.navy = 128;
thx.color.Color.names.h["$" + "navy"] = value95;
var value96 = thx.color.Color.oldlace = 16643558;
thx.color.Color.names.h["$" + "oldlace"] = value96;
thx.color.Color.names.h["$" + "old lace"] = thx.color.Color.oldlace;
var value97 = thx.color.Color.olive = 8421376;
thx.color.Color.names.h["$" + "olive"] = value97;
var value98 = thx.color.Color.olivedrab = 7048739;
thx.color.Color.names.h["$" + "olivedrab"] = value98;
thx.color.Color.names.h["$" + "olive drab"] = thx.color.Color.olivedrab;
var value99 = thx.color.Color.orange = 16753920;
thx.color.Color.names.h["$" + "orange"] = value99;
var value100 = thx.color.Color.orangered = 16729344;
thx.color.Color.names.h["$" + "orangered"] = value100;
thx.color.Color.names.h["$" + "orange red"] = thx.color.Color.orangered;
var value101 = thx.color.Color.orchid = 14315734;
thx.color.Color.names.h["$" + "orchid"] = value101;
var value102 = thx.color.Color.palegoldenrod = 15657130;
thx.color.Color.names.h["$" + "palegoldenrod"] = value102;
thx.color.Color.names.h["$" + "pale golden rod"] = thx.color.Color.palegoldenrod;
var value103 = thx.color.Color.palegreen = 10025880;
thx.color.Color.names.h["$" + "palegreen"] = value103;
thx.color.Color.names.h["$" + "pale green"] = thx.color.Color.palegreen;
var value104 = thx.color.Color.paleturquoise = 11529966;
thx.color.Color.names.h["$" + "paleturquoise"] = value104;
thx.color.Color.names.h["$" + "pale turquoise"] = thx.color.Color.paleturquoise;
var value105 = thx.color.Color.palevioletred = 14381203;
thx.color.Color.names.h["$" + "palevioletred"] = value105;
thx.color.Color.names.h["$" + "pale violet red"] = thx.color.Color.palevioletred;
var value106 = thx.color.Color.papayawhip = 16773077;
thx.color.Color.names.h["$" + "papayawhip"] = value106;
thx.color.Color.names.h["$" + "papaya whip"] = thx.color.Color.papayawhip;
var value107 = thx.color.Color.peachpuff = 16767673;
thx.color.Color.names.h["$" + "peachpuff"] = value107;
thx.color.Color.names.h["$" + "peach puff"] = thx.color.Color.peachpuff;
var value108 = thx.color.Color.peru = 13468991;
thx.color.Color.names.h["$" + "peru"] = value108;
var value109 = thx.color.Color.pink = 16761035;
thx.color.Color.names.h["$" + "pink"] = value109;
var value110 = thx.color.Color.plum = 14524637;
thx.color.Color.names.h["$" + "plum"] = value110;
var value111 = thx.color.Color.powderblue = 11591910;
thx.color.Color.names.h["$" + "powderblue"] = value111;
thx.color.Color.names.h["$" + "powder blue"] = thx.color.Color.powderblue;
var value112 = thx.color.Color.purple = 8388736;
thx.color.Color.names.h["$" + "purple"] = value112;
var value113 = thx.color.Color.red = 16711680;
thx.color.Color.names.h["$" + "red"] = value113;
var value114 = thx.color.Color.rosybrown = 12357519;
thx.color.Color.names.h["$" + "rosybrown"] = value114;
thx.color.Color.names.h["$" + "rosy brown"] = thx.color.Color.rosybrown;
var value115 = thx.color.Color.royalblue = 4286945;
thx.color.Color.names.h["$" + "royalblue"] = value115;
thx.color.Color.names.h["$" + "royal blue"] = thx.color.Color.royalblue;
var value116 = thx.color.Color.saddlebrown = 9127187;
thx.color.Color.names.h["$" + "saddlebrown"] = value116;
thx.color.Color.names.h["$" + "saddle brown"] = thx.color.Color.saddlebrown;
var value117 = thx.color.Color.salmon = 16416882;
thx.color.Color.names.h["$" + "salmon"] = value117;
var value118 = thx.color.Color.sandybrown = 16032864;
thx.color.Color.names.h["$" + "sandybrown"] = value118;
thx.color.Color.names.h["$" + "sandy brown"] = thx.color.Color.sandybrown;
var value119 = thx.color.Color.seagreen = 3050327;
thx.color.Color.names.h["$" + "seagreen"] = value119;
thx.color.Color.names.h["$" + "sea green"] = thx.color.Color.seagreen;
var value120 = thx.color.Color.seashell = 16774638;
thx.color.Color.names.h["$" + "seashell"] = value120;
thx.color.Color.names.h["$" + "sea shell"] = thx.color.Color.seashell;
var value121 = thx.color.Color.sienna = 10506797;
thx.color.Color.names.h["$" + "sienna"] = value121;
var value122 = thx.color.Color.silver = 12632256;
thx.color.Color.names.h["$" + "silver"] = value122;
var value123 = thx.color.Color.skyblue = 8900331;
thx.color.Color.names.h["$" + "skyblue"] = value123;
thx.color.Color.names.h["$" + "sky blue"] = thx.color.Color.skyblue;
var value124 = thx.color.Color.slateblue = 6970061;
thx.color.Color.names.h["$" + "slateblue"] = value124;
thx.color.Color.names.h["$" + "slate blue"] = thx.color.Color.slateblue;
var value125 = thx.color.Color.slategray = thx.color.Color.slategrey = 7372944;
thx.color.Color.names.h["$" + "slategray"] = value125;
thx.color.Color.names.h["$" + "slate gray"] = thx.color.Color.slategray;
thx.color.Color.names.h["$" + "slategrey"] = thx.color.Color.slategrey;
thx.color.Color.names.h["$" + "slate grey"] = thx.color.Color.slategrey;
var value126 = thx.color.Color.snow = 16775930;
thx.color.Color.names.h["$" + "snow"] = value126;
var value127 = thx.color.Color.springgreen = 65407;
thx.color.Color.names.h["$" + "springgreen"] = value127;
thx.color.Color.names.h["$" + "spring green"] = thx.color.Color.springgreen;
var value128 = thx.color.Color.steelblue = 4620980;
thx.color.Color.names.h["$" + "steelblue"] = value128;
thx.color.Color.names.h["$" + "steel blue"] = thx.color.Color.steelblue;
var value129 = thx.color.Color.tan = 13808780;
thx.color.Color.names.h["$" + "tan"] = value129;
var value130 = thx.color.Color.teal = 32896;
thx.color.Color.names.h["$" + "teal"] = value130;
var value131 = thx.color.Color.thistle = 14204888;
thx.color.Color.names.h["$" + "thistle"] = value131;
var value132 = thx.color.Color.tomato = 16737095;
thx.color.Color.names.h["$" + "tomato"] = value132;
var value133 = thx.color.Color.turquoise = 4251856;
thx.color.Color.names.h["$" + "turquoise"] = value133;
var value134 = thx.color.Color.violet = 15631086;
thx.color.Color.names.h["$" + "violet"] = value134;
var value135 = thx.color.Color.wheat = 16113331;
thx.color.Color.names.h["$" + "wheat"] = value135;
var value136 = thx.color.Color.white = 16777215;
thx.color.Color.names.h["$" + "white"] = value136;
var value137 = thx.color.Color.whitesmoke = 16119285;
thx.color.Color.names.h["$" + "whitesmoke"] = value137;
thx.color.Color.names.h["$" + "white smoke"] = thx.color.Color.whitesmoke;
var value138 = thx.color.Color.yellow = 16776960;
thx.color.Color.names.h["$" + "yellow"] = value138;
var value139 = thx.color.Color.yellowgreen = 10145074;
thx.color.Color.names.h["$" + "yellowgreen"] = value139;
thx.color.Color.names.h["$" + "yellow green"] = thx.color.Color.yellowgreen;
var scope = ("undefined" !== typeof window && window) || ("undefined" !== typeof global && global) || this;
if(!scope.setImmediate) scope.setImmediate = function(callback) {
	scope.setTimeout(callback,0);
};
var lastTime = 0;
var vendors = ["webkit","moz"];
var x = 0;
while(x < vendors.length && !scope.requestAnimationFrame) {
	scope.requestAnimationFrame = scope[vendors[x] + "RequestAnimationFrame"];
	scope.cancelAnimationFrame = scope[vendors[x] + "CancelAnimationFrame"] || scope[vendors[x] + "CancelRequestAnimationFrame"];
	x++;
}
if(!scope.requestAnimationFrame) scope.requestAnimationFrame = function(callback1) {
	var currTime = new Date().getTime();
	var timeToCall = Math.max(0,16 - (currTime - lastTime));
	var id = scope.setTimeout(function() {
		callback1(currTime + timeToCall);
	},timeToCall);
	lastTime = currTime + timeToCall;
	return id;
};
if(!scope.cancelAnimationFrame) scope.cancelAnimationFrame = function(id1) {
	scope.clearTimeout(id1);
};
if(typeof(scope.performance) == "undefined") scope.performance = { };
if(typeof(scope.performance.now) == "undefined") {
	var nowOffset = new Date().getTime();
	if(scope.performance.timing && scope.performance.timing.navigationStart) nowOffset = scope.performance.timing.navigationStart;
	var now = function() {
		return new Date() - nowOffset;
	};
	scope.performance.now = now;
}
minicanvas.MiniCanvas.displayGenerationTime = false;
minicanvas.BrowserCanvas._backingStoreRatio = 0;
minicanvas.BrowserCanvas.defaultScaleMode = minicanvas.ScaleMode.Auto;
minicanvas.BrowserCanvas.parentNode = typeof document != 'undefined' && document.body;
minicanvas.NodeCanvas.defaultScaleMode = minicanvas.ScaleMode.NoScale;
minicanvas.NodeCanvas.imagePath = "images";
thx.color.parse.ColorParser.parser = new thx.color.parse.ColorParser();
thx.color.parse.ColorParser.isPureHex = new EReg("^([0-9a-f]{2}){3,4}$","i");
thx.core.Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx.core.Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
Main.main();
})();
