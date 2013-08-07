var DRUM_TEXTURE = "http://keithclark.co.uk/labs/css3-fps/textures/drum.png";
// Assembiles are for grouping faces and other assembiles

function createAssembly() {
    var assembly = document.createElement("div");
    assembly.className = "threedee assembly";
    return assembly;
}
function createFace(w, h, x, y, z, rx, ry, rz, mod, tx, ty) {
    var face = document.createElement("div");
	// face.onclick = "something()"
	// face.style.cursor = "pointer";
	var op = 1.0;
	face.id = mod;
    face.className = "threedee "+mod;
    face.style.cssText = PrefixFree.prefixCSS(
        // "background: url(" + tsrc + ") -" + tx.toFixed(2) + "px " + ty.toFixed(2) + "px;" +
		// "background-color: #CECECE;" +
		// "background-color: rgba(255, 255, 0, 0.9);"
        "width:" + w.toFixed(2) + "px;" +
        "height:" + h.toFixed(2) + "px;" +
        "margin-top: -" + (h / 2).toFixed(2) + "px;" +
        "margin-left: -" + (w / 2).toFixed(2) + "px;" +
        "transform: translate3d(" + x.toFixed(2)*op + "px," + y.toFixed(2)*op + "px," + z.toFixed(2)*op + "px)" +
        "rotateX(" + rx.toFixed(2) + "rad) rotateY(" + ry.toFixed(2) + "rad) rotateY(" + rz.toFixed(2) + "rad);");
    return face;
}
function createTube(dia, height, sides, mod) {
    var tube = createAssembly();
    var sideAngle = (Math.PI / sides) * 2;
    var sideLen = dia * Math.tan(Math.PI/sides);
    for (var c = 0; c < sides; c++) {
        var x = Math.sin(sideAngle * c) * dia / 2;
        var z = Math.cos(sideAngle * c) * dia / 2;
        var ry = Math.atan2(x, z);
        tube.appendChild(createFace(sideLen + 1, height, x, 0, z, 0, ry, 0, mod, sideLen * c, 0));
    }
    return tube;
}
function createBarrel(x, mod) {
	
	var size = 30 * x;
    var barrel = createTube(size, size, 4, mod);
    barrel.appendChild(createFace(size, size, 0, size/2, 0, -Math.PI / 2, 0, 0, mod, 0, 100));
    barrel.appendChild(createFace(size, size, 0, -size/2, 0, Math.PI / 2, 0, 0, mod, 0, 100));
    return barrel;
}