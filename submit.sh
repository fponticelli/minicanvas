#!/bin/sh
rm minicanvas.zip
zip -r minicanvas.zip src extraParams.hxml haxelib.json README.md
haxelib submit minicanvas.zip