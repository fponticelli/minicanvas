(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
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
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
Main.__name__ = true;
Main.randomGraph = function(name,width,height,random) {
	var w = width;
	var h = height;
	var max = 0;
	var min = h;
	var avg = 0.0;
	var map = new haxe_ds_IntMap();
	var tot = Math.round(w * h * 0.5);
	var rounds = Math.round(tot / 200);
	var perRound = Math.round(tot / rounds);
	var r;
	var v;
	var interaction = minicanvas_MiniCanvas.create(width,height).fill(thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInt(-1)).gridHorizontal(20).border(1).animate();
	var _g = 0;
	while(_g < rounds) {
		var i = _g++;
		interaction.frame(function(mini) {
			var _g1 = 0;
			while(_g1 < perRound) {
				var j = _g1++;
				r = Math.floor(random() * w);
				if(map.h.hasOwnProperty(r)) {
					var value = v = map.h[r] + 1;
					map.h[r] = value;
				} else {
					var value1 = v = 1;
					map.h[r] = value1;
				}
				mini.dot(r + 0.5,h - v + 0.5,0.5,thx_color__$Grey_Grey_$Impl_$.toRgbxa(0.7 - v / h));
			}
		});
	}
	interaction.frame(function(mini1) {
		var $it0 = map.keys();
		while( $it0.hasNext() ) {
			var k = $it0.next();
			v = map.h[k];
			avg += v;
			if(v < min) min = v;
			if(v > max) max = v;
		}
		avg = avg / w;
		mini1.storeFrame().lineHorizontal(Math.round(h - min) + 0.5,1,thx_color__$Rgb_Rgb_$Impl_$.toRgbxa(thx_color_Color.red)).storeFrame().lineHorizontal(Math.round(h - max) + 0.5,1,thx_color__$Rgb_Rgb_$Impl_$.toRgbxa(thx_color_Color.green)).storeFrame().lineHorizontal(Math.round(h - (max + min) / 2) + 0.5,1,thx_color__$Rgb_Rgb_$Impl_$.toRgbxa(thx_color_Color.cyan)).storeFrame().lineHorizontal(Math.round(h - avg) + 0.5,1,thx_color__$Rgb_Rgb_$Impl_$.toRgbxa(thx_color_Color.blue)).storeFrame(50);
	});
	interaction.done().display(name);
};
Main.main = function() {
	minicanvas_MiniCanvas.displayGenerationTime = true;
	Main.randomGraph("pseudoRandom",200,200,($_=new thx_math_random_PseudoRandom(),$bind($_,$_["float"])));
	minicanvas_MiniCanvas.create(200,200).checkboard().border(2,thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInt(255)).rect(20,20,180,180,2,thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInt(-864616244),thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInt(13399910)).display("checkboard");
	minicanvas_MiniCanvas.create(200,200).checkboard(40).dotGrid(10,10,1,thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInt(-1145324545)).display("dotgrid");
	minicanvas_MiniCanvas.create(200,200).checkboard().box(function(x,y) {
		return thx_color__$Hsla_Hsla_$Impl_$.toRgbxa(thx_color__$Hsla_Hsla_$Impl_$.create(x * 360,1,y,0.75));
	}).display("rainbowAlpha");
	minicanvas_MiniCanvas.create(200,200).box(function(x1,y1) {
		return thx_color__$Hsl_Hsl_$Impl_$.toRgbxa(thx_color__$Hsl_Hsl_$Impl_$.create(x1 * 360,1,y1));
	}).display("rainbow");
	minicanvas_MiniCanvas.create(200,20).gradientHorizontal(function(x2) {
		return thx_color__$Hsv_Hsv_$Impl_$.toRgbxa(thx_color__$Hsv_Hsv_$Impl_$.create(x2 * 360,1,1));
	}).display("gradientHorizontal");
	minicanvas_MiniCanvas.create(20,200).gradientVertical(function(y2) {
		return thx_color__$Hsv_Hsv_$Impl_$.toRgbxa(thx_color__$Hsv_Hsv_$Impl_$.create(y2 * 360,1,1));
	}).display("gradientVertical");
	var red = thx_color__$Hsl_Hsl_$Impl_$.create(340,0.5,0.5);
	var green = thx_color__$Hsl_Hsl_$Impl_$.create(120,0.5,0.5);
	minicanvas_MiniCanvas.create(200,90).palette([[thx_color__$Hsl_Hsl_$Impl_$.toRgbxa((function($this) {
		var $r;
		var this1 = thx_color__$Hsl_Hsl_$Impl_$.analogous(red);
		$r = this1._0;
		return $r;
	}(this))),thx_color__$Hsl_Hsl_$Impl_$.toRgbxa(red),thx_color__$Hsl_Hsl_$Impl_$.toRgbxa((function($this) {
		var $r;
		var this2 = thx_color__$Hsl_Hsl_$Impl_$.analogous(red);
		$r = this2._1;
		return $r;
	}(this)))],[thx_color__$Hsl_Hsl_$Impl_$.toRgbxa((function($this) {
		var $r;
		var this3 = thx_color__$Hsl_Hsl_$Impl_$.split(green);
		$r = this3._0;
		return $r;
	}(this))),thx_color__$Hsl_Hsl_$Impl_$.toRgbxa(green),thx_color__$Hsl_Hsl_$Impl_$.toRgbxa((function($this) {
		var $r;
		var this4 = thx_color__$Hsl_Hsl_$Impl_$.split(green);
		$r = this4._1;
		return $r;
	}(this)))]]).display("palette");
	minicanvas_MiniCanvas.create(201,201).grid().cross().display("grid");
	minicanvas_MiniCanvas.create(200,200).checkboard().onDown(function(e) {
		e.mini.dot(e.x,e.y,6,thx_color__$Rgbxa_Rgbxa_$Impl_$.fromString("#0066CC")).onMove(function(e1) {
			e1.mini.dot(e1.x,e1.y);
		}).onTrail(function(e2) {
			e2.mini.line(e2.x0,e2.y0,e2.x1,e2.y1);
		});
	}).onUp(function(e3) {
		e3.mini.dot(e3.x,e3.y,8,thx_color__$Rgbxa_Rgbxa_$Impl_$.fromString("#33CC33")).offMove().offTrail();
	}).animate().down(30,170).up(40,30).sleep(10).down(25,25).move(100,90).up(165,20).sleep(10).down(150,30).up(165,170).sleep(40).done().display("events");
	minicanvas_MiniCanvas.create(200,200).checkboard().onKeyDown(function(e4) {
		var _g = e4.keyCode;
		var c = _g;
		switch(_g) {
		case 13:
			e4.mini.dot(100,100,50);
			break;
		case 32:case 27:
			e4.mini.checkboard();
			break;
		default:
			console.log(c);
		}
	}).animateNode().keyDown(13).done().display("keyevents");
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_IntMap = function() {
	this.h = { };
};
haxe_ds_IntMap.__name__ = true;
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var minicanvas_MiniCanvas = function(width,height,scaleMode) {
	this.scaleMode = scaleMode;
	this.width = width;
	this.height = height;
	this.processScale();
	this.startTime = performance.now();
	this.events = new haxe_ds_StringMap();
	this.init();
};
minicanvas_MiniCanvas.__name__ = true;
minicanvas_MiniCanvas.envIsNode = function() {
	return typeof module !== 'undefined' && module.exports;
};
minicanvas_MiniCanvas.create = function(width,height,scaleMode) {
	if(minicanvas_MiniCanvas.envIsNode()) return new minicanvas_NodeCanvas(width,height,scaleMode); else return new minicanvas_BrowserCanvas(width,height,scaleMode);
};
minicanvas_MiniCanvas.prototype = {
	display: function(name) {
		this.deltaTime = performance.now() - this.startTime;
		if(!minicanvas_MiniCanvas.displayGenerationTime) console.log("generated \"" + name + "\" in " + thx_Floats.roundTo(this.deltaTime,2) + "ms");
		this.nativeDisplay(name);
		return this;
	}
	,border: function(weight,color) {
		if(weight == null) weight = 1.0;
		if(null == color) color = thx_color__$Rgbxa_Rgbxa_$Impl_$.create(0,0,0,1);
		return this.rect(weight / 2,weight / 2,this.width - weight / 2,this.height - weight / 2,weight,color);
	}
	,box: function(handler) {
		var _g1 = 0;
		var _g = this.width;
		while(_g1 < _g) {
			var x = _g1++;
			var _g3 = 0;
			var _g2 = this.height;
			while(_g3 < _g2) {
				var y = _g3++;
				var color = handler(x / this.width,y / this.height);
				if(thx_color__$Rgbxa_Rgbxa_$Impl_$.get_inSpace(color)) {
					this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(color);
					this.ctx.fillRect(x,y,1,1);
				}
			}
		}
		return this;
	}
	,checkboard: function(size,light,dark) {
		if(size == null) size = 8;
		var cols = Math.ceil(this.width / size);
		var rows = Math.ceil(this.height / size);
		var slight;
		if(null == light) slight = thx_color__$Rgbxa_Rgbxa_$Impl_$.create(1,1,1,1); else slight = light;
		var sdark;
		if(null == dark) sdark = thx_color__$Rgbxa_Rgbxa_$Impl_$.create(0.5,0.5,0.5,1); else sdark = dark;
		var _g = 0;
		while(_g < cols) {
			var c = _g++;
			var _g1 = 0;
			while(_g1 < rows) {
				var r = _g1++;
				if(c % 2 != r % 2) this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(slight); else this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(sdark);
				this.ctx.fillRect(c * size,r * size,size,size);
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
		var t;
		var _0 = color;
		if(null == _0) t = null; else t = _0;
		if(t != null) this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(t); else this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(thx_color__$Rgbxa_Rgbxa_$Impl_$.create(0.8,0.2,0,1));
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
		if(dx == 0) throw new js__$Boot_HaxeError("invalid argument dx, should be different from zero");
		if(dy == 0) throw new js__$Boot_HaxeError("invalid argument dy, should be different from zero");
		if(null == color) color = thx_color__$Rgbxa_Rgbxa_$Impl_$.create(0.675,0.675,0.678,1);
		var py = oy % dy;
		while(py - radius <= this.height) {
			var px = ox % dx;
			while(px - radius <= this.width) {
				this.dot(px + 0.5,py + 0.5,radius,color);
				px += dx;
			}
			py += dy;
		}
		return this;
	}
	,fill: function(color) {
		this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(color);
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
		if(dy == 0) throw new js__$Boot_HaxeError("invalid argument dy, should be different from zero");
		if(null == color) color = thx_color__$Rgbxa_Rgbxa_$Impl_$.create(0.8,0.8,0.8,1);
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
		if(dx == 0) throw new js__$Boot_HaxeError("invalid argument dx, should be different from zero");
		if(null == color) color = thx_color__$Rgbxa_Rgbxa_$Impl_$.create(0.8,0.8,0.8,1);
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
			var color = handler(x / this.width);
			if(thx_color__$Rgbxa_Rgbxa_$Impl_$.get_inSpace(color)) {
				this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(color);
				this.ctx.fillRect(x,0,1,this.height);
			}
		}
		return this;
	}
	,gradientVertical: function(handler) {
		var _g1 = 0;
		var _g = this.height;
		while(_g1 < _g) {
			var y = _g1++;
			var color = handler(y / this.height);
			if(thx_color__$Rgbxa_Rgbxa_$Impl_$.get_inSpace(color)) {
				this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(color);
				this.ctx.fillRect(0,y,this.width,1);
			}
		}
		return this;
	}
	,line: function(x0,y0,x1,y1,weight,color) {
		if(weight == null) weight = 1.0;
		this.ctx.lineWidth = weight;
		var t;
		var _0 = color;
		if(null == _0) t = null; else t = _0;
		if(t != null) this.ctx.strokeStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(t); else this.ctx.strokeStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(thx_color__$Rgbxa_Rgbxa_$Impl_$.fromString("Rgbxa(0,0,0,1)"));
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
		var py = margin;
		var _g = 0;
		while(_g < colors.length) {
			var row = colors[_g];
			++_g;
			var cols = row.length;
			var w = (this.width - 2 * margin - (cols - 1) * padding) / cols;
			var px = margin;
			var _g1 = 0;
			while(_g1 < row.length) {
				var color = row[_g1];
				++_g1;
				if(thx_color__$Rgbxa_Rgbxa_$Impl_$.get_inSpace(color)) {
					this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(color);
					this.ctx.fillRect(px,py,w,h);
				}
				px += w + padding;
			}
			py += h + padding;
		}
		return this;
	}
	,rect: function(x0,y0,x1,y1,weight,lineColor,fillColor) {
		if(weight == null) weight = 1.0;
		if(null != fillColor) {
			this.ctx.fillStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(fillColor);
			this.ctx.fillRect(x0,y0,x1 - x0,y1 - y0);
		}
		if(null != lineColor) {
			this.ctx.lineWidth = weight;
			this.ctx.strokeStyle = thx_color__$Rgbxa_Rgbxa_$Impl_$.toString(lineColor);
			this.ctx.strokeRect(x0,y0,x1 - x0,y1 - y0);
		}
		return this;
	}
	,animate: function(x,y) {
		var _g = this;
		var interaction = new minicanvas_CanvasInteraction(this,(function($this) {
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
	,animateNode: function(x,y) {
		if(this.isNode) return this.animate(x,y); else return new minicanvas_Interaction(this);
	}
	,storeFrame: function(times) {
		if(times == null) times = 1;
		return this;
	}
	,onKeyDown: function(callback) {
		var _g = this;
		this._keyDown = { listener : function(e) {
			_g.keyDown(e.keyCode);
		}, callback : callback};
		if(this.isBrowser) {
			if(minicanvas_BrowserCanvas.attachKeyEventsToCanvas) {
				this.canvas.setAttribute("tabIndex","1");
				this.canvas.addEventListener("keydown",this._keyDown.listener);
			} else window.addEventListener("keydown",this._keyDown.listener);
		}
		return this;
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
	,keyDown: function(keyCode) {
		if(null != this._keyDown) this._keyDown.callback({ mini : this, keyCode : keyCode});
		return this;
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
		this.events.set(name,{ callback : callback, listener : listener});
		if(this.isBrowser) this.canvas.addEventListener(type,listener,false);
		return this;
	}
	,offMouseEvent: function(type,name) {
		if(null == name) name = type;
		var item = this.events.get(name);
		if(null == item) return this;
		this.events.remove(name);
		if(this.isBrowser) this.canvas.removeEventListener(type,item.listener,false);
		return this;
	}
	,trigger: function(name,x,y) {
		var item = this.events.get(name);
		if(null == item) return this;
		item.callback({ mini : this, x : x, y : y});
		return this;
	}
	,getDevicePixelRatio: function() {
		throw new js__$Boot_HaxeError("abstract method getDevicePixelRatio()");
	}
	,getBackingStoreRatio: function() {
		throw new js__$Boot_HaxeError("abstract method getBackingStoreRatio()");
	}
	,init: function() {
		throw new js__$Boot_HaxeError("abstract method init()");
		return;
	}
	,nativeDisplay: function(name) {
		throw new js__$Boot_HaxeError("abstract method nativeDisplay()");
		return;
	}
	,processScale: function() {
		var _g = this.scaleMode;
		switch(_g[1]) {
		case 1:
			var ratio = this.getDevicePixelRatio() / this.getBackingStoreRatio();
			if(ratio != 1) this.scaleMode = minicanvas_ScaleMode.Scaled(ratio); else this.scaleMode = minicanvas_ScaleMode.NoScale;
			break;
		default:
		}
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
};
var minicanvas_ScaleMode = { __ename__ : true, __constructs__ : ["NoScale","Auto","Scaled"] };
minicanvas_ScaleMode.NoScale = ["NoScale",0];
minicanvas_ScaleMode.NoScale.toString = $estr;
minicanvas_ScaleMode.NoScale.__enum__ = minicanvas_ScaleMode;
minicanvas_ScaleMode.Auto = ["Auto",1];
minicanvas_ScaleMode.Auto.toString = $estr;
minicanvas_ScaleMode.Auto.__enum__ = minicanvas_ScaleMode;
minicanvas_ScaleMode.Scaled = function(v) { var $x = ["Scaled",2,v]; $x.__enum__ = minicanvas_ScaleMode; $x.toString = $estr; return $x; };
var minicanvas_BrowserCanvas = function(width,height,scaleMode) {
	this.isNode = false;
	this.isBrowser = true;
	if(null == scaleMode) scaleMode = minicanvas_BrowserCanvas.defaultScaleMode;
	minicanvas_MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas_BrowserCanvas.__name__ = true;
minicanvas_BrowserCanvas.devicePixelRatio = function() {
	return window.devicePixelRatio || 1;
};
minicanvas_BrowserCanvas.backingStoreRatio = function() {
	if(minicanvas_BrowserCanvas._backingStoreRatio == 0) {
		var canvas;
		var _this = window.document;
		canvas = _this.createElement("canvas");
		var context = canvas.getContext("2d",null);
		minicanvas_BrowserCanvas._backingStoreRatio = (function(c) {
        return c.webkitBackingStorePixelRatio ||
          c.mozBackingStorePixelRatio ||
          c.msBackingStorePixelRatio ||
          c.oBackingStorePixelRatio ||
          c.backingStorePixelRatio || 1;
        })(context);
	}
	return minicanvas_BrowserCanvas._backingStoreRatio;
};
minicanvas_BrowserCanvas.__super__ = minicanvas_MiniCanvas;
minicanvas_BrowserCanvas.prototype = $extend(minicanvas_MiniCanvas.prototype,{
	append: function(name) {
		var figure = window.document.createElement("figure");
		var caption = window.document.createElement("figcaption");
		figure.className = "minicanvas";
		figure.appendChild(this.canvas);
		caption.innerHTML = thx_Strings.humanize(name) + (minicanvas_MiniCanvas.displayGenerationTime?" <span class=\"info\">(" + thx_Floats.roundTo(this.deltaTime,2) + "ms)</span>":"");
		figure.appendChild(caption);
		minicanvas_BrowserCanvas.parentNode.appendChild(figure);
		if(null != this._keyUp || null != this._keyDown) this.canvas.focus();
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
				this.ctx = this.canvas.getContext("2d",null);
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas.width = this.width;
				this.canvas.height = this.height;
				this.ctx = this.canvas.getContext("2d",null);
			}
		}
	}
	,getDevicePixelRatio: function() {
		return minicanvas_BrowserCanvas.devicePixelRatio();
	}
	,getBackingStoreRatio: function() {
		return minicanvas_BrowserCanvas.backingStoreRatio();
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
		thx_Timer.delay((function(f,a1,a2) {
			return function() {
				f(a1,a2);
			};
		})($bind(this,this.resolveStack),stack,done),50);
	}
});
var minicanvas_Interaction = function(mini) {
	this.mini = mini;
};
minicanvas_Interaction.__name__ = true;
minicanvas_Interaction.prototype = {
	down: function(x,y) {
		return this;
	}
	,keyDown: function(keyCode) {
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
	,frame: function(callback) {
		callback(this.mini);
		return this;
	}
};
var minicanvas_CanvasInteraction = function(mini,x,y,done) {
	minicanvas_Interaction.call(this,mini);
	this.x = x;
	this.y = y;
	this.stack = [];
	this._done = done;
};
minicanvas_CanvasInteraction.__name__ = true;
minicanvas_CanvasInteraction.__super__ = minicanvas_Interaction;
minicanvas_CanvasInteraction.prototype = $extend(minicanvas_Interaction.prototype,{
	down: function(x,y) {
		if(this.x != x || this.y != y) this.move(x,y);
		this.stack.push((function(f,x1,y1) {
			return function() {
				return f(x1,y1);
			};
		})(($_=this.mini,$bind($_,$_.down)),x,y));
		return this;
	}
	,frame: function(callback) {
		this.stack.push((function(f,a1) {
			return function() {
				f(a1);
			};
		})(callback,this.mini));
		return this;
	}
	,keyDown: function(keyCode) {
		this.stack.push((function(f,a1) {
			return function() {
				return f(a1);
			};
		})(($_=this.mini,$bind($_,$_.keyDown)),keyCode));
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
			dx = Math.round(thx_Floats.interpolate(step,this.x,x));
			dy = Math.round(thx_Floats.interpolate(step,this.y,y));
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
var minicanvas_NodeCanvas = function(width,height,scaleMode) {
	this.hasFrames = false;
	this.isNode = true;
	this.isBrowser = false;
	if(null == scaleMode) scaleMode = minicanvas_NodeCanvas.defaultScaleMode;
	minicanvas_MiniCanvas.call(this,width,height,scaleMode);
};
minicanvas_NodeCanvas.__name__ = true;
minicanvas_NodeCanvas.create = function(width,height,scaleMode) {
	return new minicanvas_MiniCanvas(width,height,scaleMode);
};
minicanvas_NodeCanvas.__super__ = minicanvas_MiniCanvas;
minicanvas_NodeCanvas.prototype = $extend(minicanvas_MiniCanvas.prototype,{
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
				this.ctx = this.canvas.getContext("2d",null);
				this.ctx.scale(v,v);
				break;
			default:
				this.canvas = new Canvas(this.width,this.height);
				this.ctx = this.canvas.getContext("2d",null);
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
		if(this.hasFrames) return this.encoder = new minicanvas_node_GifEncoder(this.width,this.height); else return this.encoder = new minicanvas_node_PNGEncoder(this.canvas);
	}
});
var minicanvas_node_IEncoder = function() { };
minicanvas_node_IEncoder.__name__ = true;
var minicanvas_node_GifEncoder = function(width,height) {
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
minicanvas_node_GifEncoder.__name__ = true;
minicanvas_node_GifEncoder.__interfaces__ = [minicanvas_node_IEncoder];
minicanvas_node_GifEncoder.prototype = {
	addFrame: function(ctx) {
		this.encoder.addFrame(ctx);
		this.frames++;
	}
	,save: function(name,callback) {
		this.stream.pipe(require("fs").createWriteStream("" + minicanvas_NodeCanvas.imagePath + "/" + name + ".gif"));
		callback("" + name + ".gif (frames " + this.frames + ")");
	}
};
var minicanvas_node_PNGEncoder = function(canvas) {
	this.canvas = canvas;
};
minicanvas_node_PNGEncoder.__name__ = true;
minicanvas_node_PNGEncoder.__interfaces__ = [minicanvas_node_IEncoder];
minicanvas_node_PNGEncoder.prototype = {
	addFrame: function(ctx) {
	}
	,save: function(name,callback) {
		var fs = require("fs");
		var out = fs.createWriteStream("" + minicanvas_NodeCanvas.imagePath + "/" + name + ".png");
		var stream = this.canvas.pngStream();
		stream.on("data",function(chunk) {
			out.write(chunk);
		});
		stream.on("end",function(_) {
			callback("" + name + ".png");
		});
	}
};
var thx_ArrayFloats = function() { };
thx_ArrayFloats.__name__ = true;
thx_ArrayFloats.resize = function(array,length,fill) {
	if(fill == null) fill = 0.0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
var thx_ArrayInts = function() { };
thx_ArrayInts.__name__ = true;
thx_ArrayInts.resize = function(array,length,fill) {
	if(fill == null) fill = 0;
	while(array.length < length) array.push(fill);
	array.splice(length,array.length - length);
	return array;
};
var thx_Floats = function() { };
thx_Floats.__name__ = true;
thx_Floats.canParse = function(s) {
	return thx_Floats.pattern_parse.match(s);
};
thx_Floats.interpolate = function(f,a,b) {
	return (b - a) * f + a;
};
thx_Floats.parse = function(s) {
	if(s.substring(0,1) == "+") s = s.substring(1);
	return parseFloat(s);
};
thx_Floats.roundTo = function(f,decimals) {
	var p = Math.pow(10,decimals);
	return Math.round(f * p) / p;
};
thx_Floats.wrapCircular = function(v,max) {
	v = v % max;
	if(v < 0) v += max;
	return v;
};
var thx_Ints = function() { };
thx_Ints.__name__ = true;
thx_Ints.canParse = function(s) {
	return thx_Ints.pattern_parse.match(s);
};
thx_Ints.parse = function(s,base) {
	var v = parseInt(s,base);
	if(isNaN(v)) return null; else return v;
};
var thx_Strings = function() { };
thx_Strings.__name__ = true;
thx_Strings.humanize = function(s) {
	return StringTools.replace(thx_Strings.underscore(s),"_"," ");
};
thx_Strings.underscore = function(s) {
	s = new EReg("::","g").replace(s,"/");
	s = new EReg("([A-Z]+)([A-Z][a-z])","g").replace(s,"$1_$2");
	s = new EReg("([a-z\\d])([A-Z])","g").replace(s,"$1_$2");
	s = new EReg("-","g").replace(s,"_");
	return s.toLowerCase();
};
var thx_Timer = function() { };
thx_Timer.__name__ = true;
thx_Timer.delay = function(callback,delayms) {
	return (function(f,id) {
		return function() {
			f(id);
		};
	})(thx_Timer.clear,setTimeout(callback,delayms));
};
thx_Timer.clear = function(id) {
	clearTimeout(id);
	return;
};
var thx_color_Color = function() { };
thx_color_Color.__name__ = true;
var thx_color__$Grey_Grey_$Impl_$ = {};
thx_color__$Grey_Grey_$Impl_$.__name__ = true;
thx_color__$Grey_Grey_$Impl_$.toRgbx = function(this1) {
	return [this1,this1,this1];
};
thx_color__$Grey_Grey_$Impl_$.toRgbxa = function(this1) {
	return thx_color__$Rgbx_Rgbx_$Impl_$.toRgbxa(thx_color__$Grey_Grey_$Impl_$.toRgbx(this1));
};
var thx_color__$Hsl_Hsl_$Impl_$ = {};
thx_color__$Hsl_Hsl_$Impl_$.__name__ = true;
thx_color__$Hsl_Hsl_$Impl_$.create = function(hue,saturation,lightness) {
	var channels = [thx_Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness];
	return channels;
};
thx_color__$Hsl_Hsl_$Impl_$.analogous = function(this1,spread) {
	if(spread == null) spread = 30.0;
	var _0 = thx_color__$Hsl_Hsl_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$Hsl_Hsl_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$Hsl_Hsl_$Impl_$.rotate = function(this1,angle) {
	return thx_color__$Hsl_Hsl_$Impl_$.withHue(this1,this1[0] + angle);
};
thx_color__$Hsl_Hsl_$Impl_$.split = function(this1,spread) {
	if(spread == null) spread = 144.0;
	var _0 = thx_color__$Hsl_Hsl_$Impl_$.rotate(this1,-spread);
	var _1 = thx_color__$Hsl_Hsl_$Impl_$.rotate(this1,spread);
	return { _0 : _0, _1 : _1};
};
thx_color__$Hsl_Hsl_$Impl_$.withHue = function(this1,newhue) {
	var channels = [thx_Floats.wrapCircular(newhue,360),this1[1],this1[2]];
	return channels;
};
thx_color__$Hsl_Hsl_$Impl_$.toRgbx = function(this1) {
	var channels = [thx_color__$Hsl_Hsl_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$Hsl_Hsl_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$Hsl_Hsl_$Impl_$._c(this1[0] - 120,this1[1],this1[2])];
	return channels;
};
thx_color__$Hsl_Hsl_$Impl_$.toRgbxa = function(this1) {
	return thx_color__$Rgbx_Rgbx_$Impl_$.toRgbxa(thx_color__$Hsl_Hsl_$Impl_$.toRgbx(this1));
};
thx_color__$Hsl_Hsl_$Impl_$._c = function(d,s,l) {
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$Hsla_Hsla_$Impl_$ = {};
thx_color__$Hsla_Hsla_$Impl_$.__name__ = true;
thx_color__$Hsla_Hsla_$Impl_$.create = function(hue,saturation,lightness,alpha) {
	var channels = [thx_Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness,alpha < 0?0:alpha > 1?1:alpha];
	return channels;
};
thx_color__$Hsla_Hsla_$Impl_$.toRgbxa = function(this1) {
	var channels = [thx_color__$Hsla_Hsla_$Impl_$._c(this1[0] + 120,this1[1],this1[2]),thx_color__$Hsla_Hsla_$Impl_$._c(this1[0],this1[1],this1[2]),thx_color__$Hsla_Hsla_$Impl_$._c(this1[0] - 120,this1[1],this1[2]),this1[3]];
	return channels;
};
thx_color__$Hsla_Hsla_$Impl_$._c = function(d,s,l) {
	var m2;
	if(l <= 0.5) m2 = l * (1 + s); else m2 = l + s - l * s;
	var m1 = 2 * l - m2;
	d = thx_Floats.wrapCircular(d,360);
	if(d < 60) return m1 + (m2 - m1) * d / 60; else if(d < 180) return m2; else if(d < 240) return m1 + (m2 - m1) * (240 - d) / 60; else return m1;
};
var thx_color__$Hsv_Hsv_$Impl_$ = {};
thx_color__$Hsv_Hsv_$Impl_$.__name__ = true;
thx_color__$Hsv_Hsv_$Impl_$.create = function(hue,saturation,lightness) {
	var channels = [thx_Floats.wrapCircular(hue,360),saturation < 0?0:saturation > 1?1:saturation,lightness < 0?0:lightness > 1?1:lightness];
	return channels;
};
thx_color__$Hsv_Hsv_$Impl_$.toRgbx = function(this1) {
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
thx_color__$Hsv_Hsv_$Impl_$.toRgbxa = function(this1) {
	return thx_color__$Rgbx_Rgbx_$Impl_$.toRgbxa(thx_color__$Hsv_Hsv_$Impl_$.toRgbx(this1));
};
var thx_color__$Rgb_Rgb_$Impl_$ = {};
thx_color__$Rgb_Rgb_$Impl_$.__name__ = true;
thx_color__$Rgb_Rgb_$Impl_$.withAlpha = function(this1,alpha) {
	return thx_color__$Rgba_Rgba_$Impl_$.fromInts([thx_color__$Rgb_Rgb_$Impl_$.get_red(this1),thx_color__$Rgb_Rgb_$Impl_$.get_green(this1),thx_color__$Rgb_Rgb_$Impl_$.get_blue(this1),alpha]);
};
thx_color__$Rgb_Rgb_$Impl_$.toRgba = function(this1) {
	return thx_color__$Rgb_Rgb_$Impl_$.withAlpha(this1,255);
};
thx_color__$Rgb_Rgb_$Impl_$.toRgbxa = function(this1) {
	return thx_color__$Rgba_Rgba_$Impl_$.toRgbxa(thx_color__$Rgb_Rgb_$Impl_$.toRgba(this1));
};
thx_color__$Rgb_Rgb_$Impl_$.get_red = function(this1) {
	return this1 >> 16 & 255;
};
thx_color__$Rgb_Rgb_$Impl_$.get_green = function(this1) {
	return this1 >> 8 & 255;
};
thx_color__$Rgb_Rgb_$Impl_$.get_blue = function(this1) {
	return this1 & 255;
};
var thx_color__$Rgba_Rgba_$Impl_$ = {};
thx_color__$Rgba_Rgba_$Impl_$.__name__ = true;
thx_color__$Rgba_Rgba_$Impl_$.create = function(red,green,blue,alpha) {
	return (red & 255) << 24 | (green & 255) << 16 | (blue & 255) << 8 | alpha & 255;
};
thx_color__$Rgba_Rgba_$Impl_$.fromInts = function(arr) {
	thx_ArrayInts.resize(arr,4);
	return thx_color__$Rgba_Rgba_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$Rgba_Rgba_$Impl_$.toRgbxa = function(this1) {
	return thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInts([this1 >> 24 & 255,this1 >> 16 & 255,this1 >> 8 & 255,this1 & 255]);
};
var thx_color__$Rgbx_Rgbx_$Impl_$ = {};
thx_color__$Rgbx_Rgbx_$Impl_$.__name__ = true;
thx_color__$Rgbx_Rgbx_$Impl_$.create = function(red,green,blue) {
	return [red,green,blue];
};
thx_color__$Rgbx_Rgbx_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,3);
	return thx_color__$Rgbx_Rgbx_$Impl_$.create(arr[0],arr[1],arr[2]);
};
thx_color__$Rgbx_Rgbx_$Impl_$.withAlpha = function(this1,alpha) {
	var channels = this1.concat([alpha < 0?0:alpha > 1?1:alpha]);
	return channels;
};
thx_color__$Rgbx_Rgbx_$Impl_$.toRgbxa = function(this1) {
	return thx_color__$Rgbx_Rgbx_$Impl_$.withAlpha(this1,1.0);
};
var thx_color__$Rgbxa_Rgbxa_$Impl_$ = {};
thx_color__$Rgbxa_Rgbxa_$Impl_$.__name__ = true;
thx_color__$Rgbxa_Rgbxa_$Impl_$.create = function(red,green,blue,alpha) {
	return [red < 0?0:red > 1?1:red,green < 0?0:green > 1?1:green,blue < 0?0:blue > 1?1:blue,alpha < 0?0:alpha > 1?1:alpha];
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.fromFloats = function(arr) {
	thx_ArrayFloats.resize(arr,4);
	return thx_color__$Rgbxa_Rgbxa_$Impl_$.create(arr[0],arr[1],arr[2],arr[3]);
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInts = function(arr) {
	thx_ArrayInts.resize(arr,4);
	return thx_color__$Rgbxa_Rgbxa_$Impl_$.create(arr[0] / 255,arr[1] / 255,arr[2] / 255,arr[3] / 255);
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.fromInt = function(value) {
	return thx_color__$Rgbxa_Rgbxa_$Impl_$.create(((thx_color__$Rgbxa_Rgbxa_$Impl_$.get_red() & 255) << 24) / 255,((thx_color__$Rgbxa_Rgbxa_$Impl_$.get_green() & 255) << 16) / 255,((thx_color__$Rgbxa_Rgbxa_$Impl_$.get_blue() & 255) << 8) / 255,(thx_color__$Rgbxa_Rgbxa_$Impl_$.get_alpha() & 255) / 255);
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.fromString = function(color) {
	var info = thx_color_parse_ColorParser.parseHex(color);
	if(null == info) info = thx_color_parse_ColorParser.parseColor(color);
	if(null == info) return null;
	try {
		var _g = info.name;
		switch(_g) {
		case "rgb":
			return thx_color__$Rgbx_Rgbx_$Impl_$.toRgbxa(thx_color__$Rgbx_Rgbx_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,3)));
		case "rgba":
			return thx_color__$Rgbxa_Rgbxa_$Impl_$.fromFloats(thx_color_parse_ColorParser.getFloatChannels(info.channels,4));
		default:
			return null;
		}
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.toString = function(this1) {
	return "rgba(" + thx_Floats.roundTo(this1[0] * 100,6) + "%," + thx_Floats.roundTo(this1[1] * 100,6) + "%," + thx_Floats.roundTo(this1[2] * 100,6) + "%," + thx_Floats.roundTo(this1[3],6) + ")";
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.get_red = function(this1) {
	return Math.round(this1[0] * 255);
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.get_green = function(this1) {
	return Math.round(this1[1] * 255);
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.get_blue = function(this1) {
	return Math.round(this1[2] * 255);
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.get_alpha = function(this1) {
	return Math.round(this1[3] * 255);
};
thx_color__$Rgbxa_Rgbxa_$Impl_$.get_inSpace = function(this1) {
	return this1[0] >= 0 && this1[0] <= 1 && this1[1] >= 0 && this1[1] <= 1 && this1[2] >= 0 && this1[2] <= 1 && this1[3] >= 0 && this1[3] <= 1;
};
var thx_color_parse_ColorParser = function() {
	this.pattern_color = new EReg("^\\s*([^(]+)\\s*\\(([^)]*)\\)\\s*$","i");
	this.pattern_channel = new EReg("^\\s*(\\d*.\\d+|\\d+)(%|deg|rad)?\\s*$","i");
};
thx_color_parse_ColorParser.__name__ = true;
thx_color_parse_ColorParser.parseColor = function(s) {
	return thx_color_parse_ColorParser.parser.processColor(s);
};
thx_color_parse_ColorParser.parseHex = function(s) {
	return thx_color_parse_ColorParser.parser.processHex(s);
};
thx_color_parse_ColorParser.getFloatChannels = function(channels,length,useInt8) {
	if(useInt8 == null) useInt8 = true;
	if(length != channels.length) throw new js__$Boot_HaxeError("invalid number of channels, expected " + length + " but it is " + channels.length);
	return channels.map((function(f,a2) {
		return function(a1) {
			return f(a1,a2);
		};
	})(thx_color_parse_ColorParser.getFloatChannel,useInt8));
};
thx_color_parse_ColorParser.getFloatChannel = function(channel,useInt8) {
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
thx_color_parse_ColorParser.prototype = {
	processHex: function(s) {
		if(!thx_color_parse_ColorParser.isPureHex.match(s)) {
			if(HxOverrides.substr(s,0,1) == "#") {
				if(s.length == 4) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3); else if(s.length == 5) s = s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3) + s.charAt(4) + s.charAt(4); else s = HxOverrides.substr(s,1,null);
			} else if(HxOverrides.substr(s,0,2) == "0x") s = HxOverrides.substr(s,2,null); else return null;
		}
		var channels = [];
		while(s.length > 0) {
			channels.push(thx_color_parse_ChannelInfo.CIInt8(Std.parseInt("0x" + HxOverrides.substr(s,0,2))));
			s = HxOverrides.substr(s,2,null);
		}
		if(channels.length == 4) return new thx_color_parse_ColorInfo("rgba",channels.slice(1).concat([channels[0]])); else return new thx_color_parse_ColorInfo("rgb",channels);
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
		return new thx_color_parse_ColorInfo(name,channels);
	}
	,processChannel: function(s) {
		if(!this.pattern_channel.match(s)) return null;
		var value = this.pattern_channel.matched(1);
		var unit = this.pattern_channel.matched(2);
		if(unit == null) unit = "";
		try {
			switch(unit) {
			case "%":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIPercent(thx_Floats.parse(value)); else return null;
				break;
			case "deg":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value)); else return null;
				break;
			case "DEG":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value)); else return null;
				break;
			case "rad":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "RAD":
				if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIDegree(thx_Floats.parse(value) * 180 / Math.PI); else return null;
				break;
			case "":
				if(thx_Ints.canParse(value)) {
					var i = thx_Ints.parse(value);
					if(i == 0) return thx_color_parse_ChannelInfo.CIBool(false); else if(i == 1) return thx_color_parse_ChannelInfo.CIBool(true); else if(i < 256) return thx_color_parse_ChannelInfo.CIInt8(i); else return thx_color_parse_ChannelInfo.CIInt(i);
				} else if(thx_Floats.canParse(value)) return thx_color_parse_ChannelInfo.CIFloat(thx_Floats.parse(value)); else return null;
				break;
			default:
				return null;
			}
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return null;
		}
	}
};
var thx_color_parse_ColorInfo = function(name,channels) {
	this.name = name;
	this.channels = channels;
};
thx_color_parse_ColorInfo.__name__ = true;
var thx_color_parse_ChannelInfo = { __ename__ : true, __constructs__ : ["CIPercent","CIFloat","CIDegree","CIInt8","CIInt","CIBool"] };
thx_color_parse_ChannelInfo.CIPercent = function(value) { var $x = ["CIPercent",0,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIFloat = function(value) { var $x = ["CIFloat",1,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIDegree = function(value) { var $x = ["CIDegree",2,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIInt8 = function(value) { var $x = ["CIInt8",3,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIInt = function(value) { var $x = ["CIInt",4,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
thx_color_parse_ChannelInfo.CIBool = function(value) { var $x = ["CIBool",5,value]; $x.__enum__ = thx_color_parse_ChannelInfo; $x.toString = $estr; return $x; };
var thx_math_random_PseudoRandom = function(seed) {
	if(seed == null) seed = 1;
	this.seed = seed;
};
thx_math_random_PseudoRandom.__name__ = true;
thx_math_random_PseudoRandom.prototype = {
	'int': function() {
		return (this.seed = this.seed * 48271.0 % 2147483647.0 | 0) & 1073741823;
	}
	,'float': function() {
		return this["int"]() / 1073741823.0;
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
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
var __map_reserved = {}
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
thx_color_Color.names = new haxe_ds_StringMap();
var value = thx_color_Color.aliceblue = 15792383;
thx_color_Color.names.set("aliceblue",value);
thx_color_Color.names.set("alice blue",thx_color_Color.aliceblue);
var value1 = thx_color_Color.antiquewhite = 16444375;
thx_color_Color.names.set("antiquewhite",value1);
thx_color_Color.names.set("antique white",thx_color_Color.antiquewhite);
var value2 = thx_color_Color.aqua = 65535;
thx_color_Color.names.set("aqua",value2);
var value3 = thx_color_Color.aquamarine = 8388564;
thx_color_Color.names.set("aquamarine",value3);
var value4 = thx_color_Color.azure = 15794175;
thx_color_Color.names.set("azure",value4);
var value5 = thx_color_Color.beige = 16119260;
thx_color_Color.names.set("beige",value5);
var value6 = thx_color_Color.bisque = 16770244;
thx_color_Color.names.set("bisque",value6);
var value7 = thx_color_Color.black = 0;
thx_color_Color.names.set("black",value7);
var value8 = thx_color_Color.blanchedalmond = 16772045;
thx_color_Color.names.set("blanchedalmond",value8);
thx_color_Color.names.set("blanched almond",thx_color_Color.blanchedalmond);
var value9 = thx_color_Color.blue = 255;
thx_color_Color.names.set("blue",value9);
var value10 = thx_color_Color.blueviolet = 9055202;
thx_color_Color.names.set("blueviolet",value10);
thx_color_Color.names.set("blue violet",thx_color_Color.blueviolet);
var value11 = thx_color_Color.brown = 10824234;
thx_color_Color.names.set("brown",value11);
var value12 = thx_color_Color.burlywood = 14596231;
thx_color_Color.names.set("burlywood",value12);
thx_color_Color.names.set("burly wood",thx_color_Color.burlywood);
var value13 = thx_color_Color.cadetblue = 6266528;
thx_color_Color.names.set("cadetblue",value13);
thx_color_Color.names.set("cadet blue",thx_color_Color.cadetblue);
var value14 = thx_color_Color.chartreuse = 8388352;
thx_color_Color.names.set("chartreuse",value14);
thx_color_Color.names.set("chart reuse",thx_color_Color.chartreuse);
var value15 = thx_color_Color.chocolate = 13789470;
thx_color_Color.names.set("chocolate",value15);
var value16 = thx_color_Color.coral = 16744272;
thx_color_Color.names.set("coral",value16);
var value17 = thx_color_Color.cornflowerblue = 6591981;
thx_color_Color.names.set("cornflowerblue",value17);
thx_color_Color.names.set("corn flower blue",thx_color_Color.cornflowerblue);
var value18 = thx_color_Color.cornsilk = 16775388;
thx_color_Color.names.set("cornsilk",value18);
thx_color_Color.names.set("corn silk",thx_color_Color.cornsilk);
var value19 = thx_color_Color.crimson = 14423100;
thx_color_Color.names.set("crimson",value19);
var value20 = thx_color_Color.cyan = 65535;
thx_color_Color.names.set("cyan",value20);
var value21 = thx_color_Color.darkblue = 139;
thx_color_Color.names.set("darkblue",value21);
thx_color_Color.names.set("dark blue",thx_color_Color.darkblue);
var value22 = thx_color_Color.darkcyan = 35723;
thx_color_Color.names.set("darkcyan",value22);
thx_color_Color.names.set("dark cyan",thx_color_Color.darkcyan);
var value23 = thx_color_Color.darkgoldenrod = 12092939;
thx_color_Color.names.set("darkgoldenrod",value23);
thx_color_Color.names.set("dark golden rod",thx_color_Color.darkgoldenrod);
var value24 = thx_color_Color.darkgray = thx_color_Color.darkgrey = 11119017;
thx_color_Color.names.set("darkgray",value24);
thx_color_Color.names.set("dark gray",thx_color_Color.darkgray);
thx_color_Color.names.set("darkgrey",thx_color_Color.darkgrey);
thx_color_Color.names.set("dark grey",thx_color_Color.darkgrey);
var value25 = thx_color_Color.darkgreen = 25600;
thx_color_Color.names.set("darkgreen",value25);
thx_color_Color.names.set("dark green",thx_color_Color.darkgreen);
var value26 = thx_color_Color.darkkhaki = 12433259;
thx_color_Color.names.set("darkkhaki",value26);
thx_color_Color.names.set("dark khaki",thx_color_Color.darkkhaki);
var value27 = thx_color_Color.darkmagenta = 9109643;
thx_color_Color.names.set("darkmagenta",value27);
thx_color_Color.names.set("dark magenta",thx_color_Color.darkmagenta);
var value28 = thx_color_Color.darkolivegreen = 5597999;
thx_color_Color.names.set("darkolivegreen",value28);
thx_color_Color.names.set("dark olive green",thx_color_Color.darkolivegreen);
var value29 = thx_color_Color.darkorange = 16747520;
thx_color_Color.names.set("darkorange",value29);
thx_color_Color.names.set("dark orange",thx_color_Color.darkorange);
var value30 = thx_color_Color.darkorchid = 10040012;
thx_color_Color.names.set("darkorchid",value30);
thx_color_Color.names.set("dark orchid",thx_color_Color.darkorchid);
var value31 = thx_color_Color.darkred = 9109504;
thx_color_Color.names.set("darkred",value31);
thx_color_Color.names.set("dark red",thx_color_Color.darkred);
var value32 = thx_color_Color.darksalmon = 15308410;
thx_color_Color.names.set("darksalmon",value32);
thx_color_Color.names.set("dark salmon",thx_color_Color.darksalmon);
var value33 = thx_color_Color.darkseagreen = 9419919;
thx_color_Color.names.set("darkseagreen",value33);
thx_color_Color.names.set("dark sea green",thx_color_Color.darkseagreen);
var value34 = thx_color_Color.darkslateblue = 4734347;
thx_color_Color.names.set("darkslateblue",value34);
thx_color_Color.names.set("dark slate blue",thx_color_Color.darkslateblue);
var value35 = thx_color_Color.darkslategray = thx_color_Color.darkslategrey = 3100495;
thx_color_Color.names.set("darkslategray",value35);
thx_color_Color.names.set("dark slate gray",thx_color_Color.darkslategray);
thx_color_Color.names.set("darkslategrey",thx_color_Color.darkslategrey);
thx_color_Color.names.set("dark slate grey",thx_color_Color.darkslategrey);
var value36 = thx_color_Color.darkturquoise = 52945;
thx_color_Color.names.set("darkturquoise",value36);
thx_color_Color.names.set("dark turquoise",thx_color_Color.darkturquoise);
var value37 = thx_color_Color.darkviolet = 9699539;
thx_color_Color.names.set("darkviolet",value37);
thx_color_Color.names.set("dark violet",thx_color_Color.darkviolet);
var value38 = thx_color_Color.deeppink = 16716947;
thx_color_Color.names.set("deeppink",value38);
thx_color_Color.names.set("deep pink",thx_color_Color.deeppink);
var value39 = thx_color_Color.deepskyblue = 49151;
thx_color_Color.names.set("deepskyblue",value39);
thx_color_Color.names.set("deep sky blue",thx_color_Color.deepskyblue);
var value40 = thx_color_Color.dimgray = thx_color_Color.dimgrey = 6908265;
thx_color_Color.names.set("dimgray",value40);
thx_color_Color.names.set("dim gray",thx_color_Color.dimgray);
thx_color_Color.names.set("dimgrey",thx_color_Color.dimgrey);
thx_color_Color.names.set("dim grey",thx_color_Color.dimgrey);
var value41 = thx_color_Color.dodgerblue = 2003199;
thx_color_Color.names.set("dodgerblue",value41);
thx_color_Color.names.set("dodger blue",thx_color_Color.dodgerblue);
var value42 = thx_color_Color.firebrick = 11674146;
thx_color_Color.names.set("firebrick",value42);
thx_color_Color.names.set("fire brick",thx_color_Color.firebrick);
var value43 = thx_color_Color.floralwhite = 16775920;
thx_color_Color.names.set("floralwhite",value43);
thx_color_Color.names.set("floral white",thx_color_Color.floralwhite);
var value44 = thx_color_Color.forestgreen = 2263842;
thx_color_Color.names.set("forestgreen",value44);
thx_color_Color.names.set("forest green",thx_color_Color.forestgreen);
var value45 = thx_color_Color.fuchsia = 16711935;
thx_color_Color.names.set("fuchsia",value45);
var value46 = thx_color_Color.gainsboro = 14474460;
thx_color_Color.names.set("gainsboro",value46);
var value47 = thx_color_Color.ghostwhite = 16316671;
thx_color_Color.names.set("ghostwhite",value47);
thx_color_Color.names.set("ghost white",thx_color_Color.ghostwhite);
var value48 = thx_color_Color.gold = 16766720;
thx_color_Color.names.set("gold",value48);
var value49 = thx_color_Color.goldenrod = 14329120;
thx_color_Color.names.set("goldenrod",value49);
thx_color_Color.names.set("golden rod",thx_color_Color.goldenrod);
var value50 = thx_color_Color.gray = thx_color_Color.grey = 8421504;
thx_color_Color.names.set("gray",value50);
thx_color_Color.names.set("grey",thx_color_Color.grey);
var value51 = thx_color_Color.green = 32768;
thx_color_Color.names.set("green",value51);
var value52 = thx_color_Color.greenyellow = 11403055;
thx_color_Color.names.set("greenyellow",value52);
thx_color_Color.names.set("green yellow",thx_color_Color.greenyellow);
var value53 = thx_color_Color.honeydew = 15794160;
thx_color_Color.names.set("honeydew",value53);
thx_color_Color.names.set("honey dew",thx_color_Color.honeydew);
var value54 = thx_color_Color.hotpink = 16738740;
thx_color_Color.names.set("hotpink",value54);
thx_color_Color.names.set("hot pink",thx_color_Color.hotpink);
var value55 = thx_color_Color.indianred = 13458524;
thx_color_Color.names.set("indianred",value55);
thx_color_Color.names.set("indian red",thx_color_Color.indianred);
var value56 = thx_color_Color.indigo = 4915330;
thx_color_Color.names.set("indigo",value56);
var value57 = thx_color_Color.ivory = 16777200;
thx_color_Color.names.set("ivory",value57);
var value58 = thx_color_Color.khaki = 15787660;
thx_color_Color.names.set("khaki",value58);
var value59 = thx_color_Color.lavender = 15132410;
thx_color_Color.names.set("lavender",value59);
var value60 = thx_color_Color.lavenderblush = 16773365;
thx_color_Color.names.set("lavenderblush",value60);
thx_color_Color.names.set("lavender blush",thx_color_Color.lavenderblush);
var value61 = thx_color_Color.lawngreen = 8190976;
thx_color_Color.names.set("lawngreen",value61);
thx_color_Color.names.set("lawn green",thx_color_Color.lawngreen);
var value62 = thx_color_Color.lemonchiffon = 16775885;
thx_color_Color.names.set("lemonchiffon",value62);
thx_color_Color.names.set("lemon chiffon",thx_color_Color.lemonchiffon);
var value63 = thx_color_Color.lightblue = 11393254;
thx_color_Color.names.set("lightblue",value63);
thx_color_Color.names.set("light blue",thx_color_Color.lightblue);
var value64 = thx_color_Color.lightcoral = 15761536;
thx_color_Color.names.set("lightcoral",value64);
thx_color_Color.names.set("light coral",thx_color_Color.lightcoral);
var value65 = thx_color_Color.lightcyan = 14745599;
thx_color_Color.names.set("lightcyan",value65);
thx_color_Color.names.set("light cyan",thx_color_Color.lightcyan);
var value66 = thx_color_Color.lightgoldenrodyellow = 16448210;
thx_color_Color.names.set("lightgoldenrodyellow",value66);
thx_color_Color.names.set("light golden rod yellow",thx_color_Color.lightgoldenrodyellow);
var value67 = thx_color_Color.lightgray = thx_color_Color.lightgrey = 13882323;
thx_color_Color.names.set("lightgray",value67);
thx_color_Color.names.set("light gray",thx_color_Color.lightgray);
thx_color_Color.names.set("lightgrey",thx_color_Color.lightgrey);
thx_color_Color.names.set("light grey",thx_color_Color.lightgrey);
var value68 = thx_color_Color.lightgreen = 9498256;
thx_color_Color.names.set("lightgreen",value68);
thx_color_Color.names.set("light green",thx_color_Color.lightgreen);
var value69 = thx_color_Color.lightpink = 16758465;
thx_color_Color.names.set("lightpink",value69);
thx_color_Color.names.set("light pink",thx_color_Color.lightpink);
var value70 = thx_color_Color.lightsalmon = 16752762;
thx_color_Color.names.set("lightsalmon",value70);
thx_color_Color.names.set("light salmon",thx_color_Color.lightsalmon);
var value71 = thx_color_Color.lightseagreen = 2142890;
thx_color_Color.names.set("lightseagreen",value71);
thx_color_Color.names.set("light sea green",thx_color_Color.lightseagreen);
var value72 = thx_color_Color.lightskyblue = 8900346;
thx_color_Color.names.set("lightskyblue",value72);
thx_color_Color.names.set("light sky blue",thx_color_Color.lightskyblue);
var value73 = thx_color_Color.lightslategray = thx_color_Color.lightslategrey = 7833753;
thx_color_Color.names.set("lightslategray",value73);
thx_color_Color.names.set("light slate gray",thx_color_Color.lightslategray);
thx_color_Color.names.set("lightslategrey",thx_color_Color.lightslategrey);
thx_color_Color.names.set("light slate grey",thx_color_Color.lightslategrey);
var value74 = thx_color_Color.lightsteelblue = 11584734;
thx_color_Color.names.set("lightsteelblue",value74);
thx_color_Color.names.set("light steel blue",thx_color_Color.lightsteelblue);
var value75 = thx_color_Color.lightyellow = 16777184;
thx_color_Color.names.set("lightyellow",value75);
thx_color_Color.names.set("light yellow",thx_color_Color.lightyellow);
var value76 = thx_color_Color.lime = 65280;
thx_color_Color.names.set("lime",value76);
var value77 = thx_color_Color.limegreen = 3329330;
thx_color_Color.names.set("limegreen",value77);
thx_color_Color.names.set("lime green",thx_color_Color.limegreen);
var value78 = thx_color_Color.linen = 16445670;
thx_color_Color.names.set("linen",value78);
var value79 = thx_color_Color.magenta = 16711935;
thx_color_Color.names.set("magenta",value79);
var value80 = thx_color_Color.maroon = 8388608;
thx_color_Color.names.set("maroon",value80);
var value81 = thx_color_Color.mediumaquamarine = 6737322;
thx_color_Color.names.set("mediumaquamarine",value81);
thx_color_Color.names.set("mediuma quamarine",thx_color_Color.mediumaquamarine);
var value82 = thx_color_Color.mediumblue = 205;
thx_color_Color.names.set("mediumblue",value82);
thx_color_Color.names.set("medium blue",thx_color_Color.mediumblue);
var value83 = thx_color_Color.mediumorchid = 12211667;
thx_color_Color.names.set("mediumorchid",value83);
thx_color_Color.names.set("medium orchid",thx_color_Color.mediumorchid);
var value84 = thx_color_Color.mediumpurple = 9662683;
thx_color_Color.names.set("mediumpurple",value84);
thx_color_Color.names.set("medium purple",thx_color_Color.mediumpurple);
var value85 = thx_color_Color.mediumseagreen = 3978097;
thx_color_Color.names.set("mediumseagreen",value85);
thx_color_Color.names.set("medium sea green",thx_color_Color.mediumseagreen);
var value86 = thx_color_Color.mediumslateblue = 8087790;
thx_color_Color.names.set("mediumslateblue",value86);
thx_color_Color.names.set("medium slate blue",thx_color_Color.mediumslateblue);
var value87 = thx_color_Color.mediumspringgreen = 64154;
thx_color_Color.names.set("mediumspringgreen",value87);
thx_color_Color.names.set("medium spring green",thx_color_Color.mediumspringgreen);
var value88 = thx_color_Color.mediumturquoise = 4772300;
thx_color_Color.names.set("mediumturquoise",value88);
thx_color_Color.names.set("medium turquoise",thx_color_Color.mediumturquoise);
var value89 = thx_color_Color.mediumvioletred = 13047173;
thx_color_Color.names.set("mediumvioletred",value89);
thx_color_Color.names.set("medium violet red",thx_color_Color.mediumvioletred);
var value90 = thx_color_Color.midnightblue = 1644912;
thx_color_Color.names.set("midnightblue",value90);
thx_color_Color.names.set("midnight blue",thx_color_Color.midnightblue);
var value91 = thx_color_Color.mintcream = 16121850;
thx_color_Color.names.set("mintcream",value91);
thx_color_Color.names.set("mint cream",thx_color_Color.mintcream);
var value92 = thx_color_Color.mistyrose = 16770273;
thx_color_Color.names.set("mistyrose",value92);
thx_color_Color.names.set("misty rose",thx_color_Color.mistyrose);
var value93 = thx_color_Color.moccasin = 16770229;
thx_color_Color.names.set("moccasin",value93);
var value94 = thx_color_Color.navajowhite = 16768685;
thx_color_Color.names.set("navajowhite",value94);
thx_color_Color.names.set("navajo white",thx_color_Color.navajowhite);
var value95 = thx_color_Color.navy = 128;
thx_color_Color.names.set("navy",value95);
var value96 = thx_color_Color.oldlace = 16643558;
thx_color_Color.names.set("oldlace",value96);
thx_color_Color.names.set("old lace",thx_color_Color.oldlace);
var value97 = thx_color_Color.olive = 8421376;
thx_color_Color.names.set("olive",value97);
var value98 = thx_color_Color.olivedrab = 7048739;
thx_color_Color.names.set("olivedrab",value98);
thx_color_Color.names.set("olive drab",thx_color_Color.olivedrab);
var value99 = thx_color_Color.orange = 16753920;
thx_color_Color.names.set("orange",value99);
var value100 = thx_color_Color.orangered = 16729344;
thx_color_Color.names.set("orangered",value100);
thx_color_Color.names.set("orange red",thx_color_Color.orangered);
var value101 = thx_color_Color.orchid = 14315734;
thx_color_Color.names.set("orchid",value101);
var value102 = thx_color_Color.palegoldenrod = 15657130;
thx_color_Color.names.set("palegoldenrod",value102);
thx_color_Color.names.set("pale golden rod",thx_color_Color.palegoldenrod);
var value103 = thx_color_Color.palegreen = 10025880;
thx_color_Color.names.set("palegreen",value103);
thx_color_Color.names.set("pale green",thx_color_Color.palegreen);
var value104 = thx_color_Color.paleturquoise = 11529966;
thx_color_Color.names.set("paleturquoise",value104);
thx_color_Color.names.set("pale turquoise",thx_color_Color.paleturquoise);
var value105 = thx_color_Color.palevioletred = 14381203;
thx_color_Color.names.set("palevioletred",value105);
thx_color_Color.names.set("pale violet red",thx_color_Color.palevioletred);
var value106 = thx_color_Color.papayawhip = 16773077;
thx_color_Color.names.set("papayawhip",value106);
thx_color_Color.names.set("papaya whip",thx_color_Color.papayawhip);
var value107 = thx_color_Color.peachpuff = 16767673;
thx_color_Color.names.set("peachpuff",value107);
thx_color_Color.names.set("peach puff",thx_color_Color.peachpuff);
var value108 = thx_color_Color.peru = 13468991;
thx_color_Color.names.set("peru",value108);
var value109 = thx_color_Color.pink = 16761035;
thx_color_Color.names.set("pink",value109);
var value110 = thx_color_Color.plum = 14524637;
thx_color_Color.names.set("plum",value110);
var value111 = thx_color_Color.powderblue = 11591910;
thx_color_Color.names.set("powderblue",value111);
thx_color_Color.names.set("powder blue",thx_color_Color.powderblue);
var value112 = thx_color_Color.purple = 8388736;
thx_color_Color.names.set("purple",value112);
var value113 = thx_color_Color.red = 16711680;
thx_color_Color.names.set("red",value113);
var value114 = thx_color_Color.rosybrown = 12357519;
thx_color_Color.names.set("rosybrown",value114);
thx_color_Color.names.set("rosy brown",thx_color_Color.rosybrown);
var value115 = thx_color_Color.royalblue = 4286945;
thx_color_Color.names.set("royalblue",value115);
thx_color_Color.names.set("royal blue",thx_color_Color.royalblue);
var value116 = thx_color_Color.saddlebrown = 9127187;
thx_color_Color.names.set("saddlebrown",value116);
thx_color_Color.names.set("saddle brown",thx_color_Color.saddlebrown);
var value117 = thx_color_Color.salmon = 16416882;
thx_color_Color.names.set("salmon",value117);
var value118 = thx_color_Color.sandybrown = 16032864;
thx_color_Color.names.set("sandybrown",value118);
thx_color_Color.names.set("sandy brown",thx_color_Color.sandybrown);
var value119 = thx_color_Color.seagreen = 3050327;
thx_color_Color.names.set("seagreen",value119);
thx_color_Color.names.set("sea green",thx_color_Color.seagreen);
var value120 = thx_color_Color.seashell = 16774638;
thx_color_Color.names.set("seashell",value120);
thx_color_Color.names.set("sea shell",thx_color_Color.seashell);
var value121 = thx_color_Color.sienna = 10506797;
thx_color_Color.names.set("sienna",value121);
var value122 = thx_color_Color.silver = 12632256;
thx_color_Color.names.set("silver",value122);
var value123 = thx_color_Color.skyblue = 8900331;
thx_color_Color.names.set("skyblue",value123);
thx_color_Color.names.set("sky blue",thx_color_Color.skyblue);
var value124 = thx_color_Color.slateblue = 6970061;
thx_color_Color.names.set("slateblue",value124);
thx_color_Color.names.set("slate blue",thx_color_Color.slateblue);
var value125 = thx_color_Color.slategray = thx_color_Color.slategrey = 7372944;
thx_color_Color.names.set("slategray",value125);
thx_color_Color.names.set("slate gray",thx_color_Color.slategray);
thx_color_Color.names.set("slategrey",thx_color_Color.slategrey);
thx_color_Color.names.set("slate grey",thx_color_Color.slategrey);
var value126 = thx_color_Color.snow = 16775930;
thx_color_Color.names.set("snow",value126);
var value127 = thx_color_Color.springgreen = 65407;
thx_color_Color.names.set("springgreen",value127);
thx_color_Color.names.set("spring green",thx_color_Color.springgreen);
var value128 = thx_color_Color.steelblue = 4620980;
thx_color_Color.names.set("steelblue",value128);
thx_color_Color.names.set("steel blue",thx_color_Color.steelblue);
var value129 = thx_color_Color.tan = 13808780;
thx_color_Color.names.set("tan",value129);
var value130 = thx_color_Color.teal = 32896;
thx_color_Color.names.set("teal",value130);
var value131 = thx_color_Color.thistle = 14204888;
thx_color_Color.names.set("thistle",value131);
var value132 = thx_color_Color.tomato = 16737095;
thx_color_Color.names.set("tomato",value132);
var value133 = thx_color_Color.turquoise = 4251856;
thx_color_Color.names.set("turquoise",value133);
var value134 = thx_color_Color.violet = 15631086;
thx_color_Color.names.set("violet",value134);
var value135 = thx_color_Color.wheat = 16113331;
thx_color_Color.names.set("wheat",value135);
var value136 = thx_color_Color.white = 16777215;
thx_color_Color.names.set("white",value136);
var value137 = thx_color_Color.whitesmoke = 16119285;
thx_color_Color.names.set("whitesmoke",value137);
thx_color_Color.names.set("white smoke",thx_color_Color.whitesmoke);
var value138 = thx_color_Color.yellow = 16776960;
thx_color_Color.names.set("yellow",value138);
var value139 = thx_color_Color.yellowgreen = 10145074;
thx_color_Color.names.set("yellowgreen",value139);
thx_color_Color.names.set("yellow green",thx_color_Color.yellowgreen);
minicanvas_MiniCanvas.displayGenerationTime = false;
minicanvas_BrowserCanvas._backingStoreRatio = 0;
minicanvas_BrowserCanvas.attachKeyEventsToCanvas = false;
minicanvas_BrowserCanvas.defaultScaleMode = minicanvas_ScaleMode.Auto;
minicanvas_BrowserCanvas.parentNode = typeof document != 'undefined' && document.body;
minicanvas_NodeCanvas.defaultScaleMode = minicanvas_ScaleMode.NoScale;
minicanvas_NodeCanvas.imagePath = "images";
thx_Floats.pattern_parse = new EReg("^(\\+|-)?\\d+(\\.\\d+)?(e-?\\d+)?$","");
thx_Ints.pattern_parse = new EReg("^[+-]?(\\d+|0x[0-9A-F]+)$","i");
thx_color_parse_ColorParser.parser = new thx_color_parse_ColorParser();
thx_color_parse_ColorParser.isPureHex = new EReg("^([0-9a-f]{2}){3,4}$","i");
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
