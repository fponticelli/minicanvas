#!/bin/sh
rm minicanvas.zip
zip -r minicanvas.zip src extraParams.hxml haxelib.json README.md -x "*/\.*"
haxelib submit minicanvas.zip
