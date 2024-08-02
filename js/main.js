var json;
var line, isDown, mode;
var selectedId;
var canvas;

var subScriptOn = false;
var superScriptOn = false;

jQuery(window).on("load", function() {
    canvas = new fabric.Canvas('a');
    canvas.perPixelTargetFind = true;
    canvas.targetFindTolerance = 4;
    document.getElementById('tofront').addEventListener("click", enviarFrente);
    document.getElementById('toback').addEventListener("click", enviarFondo);
    document.getElementById('toAdelante').addEventListener("click", moverAdelante);
    document.getElementById('toAtras').addEventListener("click", enviarAtras);
});

function addHex() {
    var mode = "shape";
    var id = Date.now();
    var points = regularPolygonPoints(6, 50);
    var myPoly = new fabric.Polygon(points, {
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        width: 100,
        height: 100,
        originX: 'center',
        originY: 'center',
        fill: 'rgba(0,0,0,0)',
        stroke: 'black',
        strokeWidth: 3
    }, false);
    canvas.add(myPoly);

}

function regularPolygonPoints(sideCount, radius) {
    var sweep = Math.PI * 2 / sideCount;
    var cx = radius;
    var cy = radius;
    var points = [];
    for (var i = 0; i < sideCount; i++) {
        var x = cx + radius * Math.cos(i * sweep);
        var y = cy + radius * Math.sin(i * sweep);
        points.push({
            x: x,
            y: y
        });
    }
    return (points);
}


function addRect() {
    mode = "shape";
    var id = Date.now();
    this.canvas.add(new fabric.Rect({
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        fill: 'rgba(0,0,0,0)',
        stroke: 'black',
        width: 50,
        height: 50,
        originX: 'center',
        originY: 'center',
        strokeWidth: 3

    }));
}

function addPent() {
    mode = "shape";
    var id = Date.now();
    var pathStr = getRegularPolygonPath(50, 25, 44, 5);

    var polygon = new fabric.Path(pathStr, {
        stroke: 'black',
        strokeWidth: 3,
        fill: 'rgba(0,0,0,0)',
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        originX: 'center',
        originY: 'center',
    });
    canvas.add(polygon);
}

function addTriangle() {
    mode = "shape";
    var id = Date.now();
    this.canvas.add(new fabric.Triangle({
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        fill: 'rgba(0,0,0,0)',
        stroke: 'black',
        width: 44,
        height: 44,
        originX: 'center',
        originY: 'center',
        strokeWidth: 3

    }));
}

function addLine() {
    mode = "draw";
}

jQuery('html').keyup(function(e) {
    if (e.keyCode == 46) {
        canvas.remove(canvas.getActiveObject());
    }
});

function startDraw() {
    if (mode != "pencil") {
    mode = "pencil";
    document.getElementById("button-draw").style.backgroundColor = "#707070";
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush.width = 3;
    console.log(canvas.freeDrawingBrush);
    fabric.PencilBrush.prototype.globalCompositeOperation = "source-over";
    canvas.renderAll();
    }
    else {
        document.getElementById("button-draw").style.backgroundColor = "#333333";
        mode = "select";
        select();
    }
}

function clearCanvas() {
    canvas.clear();
}

function select() {
    mode = "select";
    canvas.isDrawingMode = false;
    canvas.selection = true;
    canvas.renderAll();
}

function saveCanvas() {
    getResponse();
}

function enviarFrente() {
    var myObject = canvas.getActiveObject();
    canvas.bringToFront(myObject);
    canvas.discardActiveObject();
    canvas.renderAll();
}

function enviarFondo() {
    var myObject = canvas.getActiveObject();
    canvas.sendToBack(myObject);
    canvas.discardActiveObject();
    canvas.renderAll();
}

function moverAdelante() {
    var myObject = canvas.getActiveObject();
    canvas.bringForward(myObject);
    canvas.discardActiveObject();
    canvas.renderAll();
}

function enviarAtras() {
    var myObject = canvas.getActiveObject();
    canvas.sendBackwards(myObject);
    canvas.discardActiveObject();
    canvas.renderAll();
}

function addWedgeDash() {
    mode = "shape";
    var id = Date.now();
    canvas.isDrawingMode = false;
    var rect0 = new fabric.Rect({
        left: 118,
        top: 80,
        width: 2,
        height: 8,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        scaleY: 0.4,
        centeredRotation: true
    });

    var rect1 = new fabric.Rect({
        left: 117,
        top: 88,
        width: 4,
        height: 8,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        scaleY: 0.4,
        centeredRotation: true
    });

    var rect2 = new fabric.Rect({
        left: 116,
        top: 96,
        width: 6,
        height: 8,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        scaleY: 0.4,
        centeredRotation: true
    });

    var rect3 = new fabric.Rect({
        left: 114,
        top: 104,
        width: 10,
        height: 8,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        scaleY: 0.4,
        centeredRotation: true
    });

    var rect4 = new fabric.Rect({
        left: 112,
        top: 112,
        width: 14,
        height: 8,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        scaleY: 0.4,
        centeredRotation: true
    });

    var rect5 = new fabric.Rect({
        left: 110,
        top: 120,
        width: 18,
        height: 8,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        scaleY: 0.4,
        centeredRotation: true
    });
    var rectGroup = new fabric.Group([rect0, rect1, rect2, rect3, rect4, rect5], {
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        left: 200,
        top: 200,
        angle: -135
    });

    this.canvas.add(rectGroup);
}

function addSingle() {
    mode = "shape";
    var id = Date.now();
    var rect2 = new fabric.Rect({
        left: 100,
        top: 140,
        width: 52,
        height: 3,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        centeredRotation: true
    });

    var rectGroup = new fabric.Group([rect2], {
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        angle: 0
    });

    this.canvas.add(rectGroup);
}

function addDouble() {
    mode = "shape";
    var id = Date.now();
    canvas.isDrawingMode = false;
    var rect2 = new fabric.Rect({
        left: 100,
        top: 140,
        width: 52,
        height: 3,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        centeredRotation: true
    });

    var rect3 = new fabric.Rect({
        left: 100,
        top: 148,
        width: 52,
        height: 3,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        centeredRotation: true
    });

    var rectGroup = new fabric.Group([rect2, rect3], {
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        left: 200,
        top: 200,
        angle: 0
    });
    this.canvas.add(rectGroup);
}

function addTriple() {
    mode = "shape";
    var id = Date.now();
    canvas.isDrawingMode = false;
    var rect2 = new fabric.Rect({
        left: 100,
        top: 140,
        width: 52,
        height: 3,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        centeredRotation: true
    });

    var rect3 = new fabric.Rect({
        left: 100,
        top: 148,
        width: 52,
        height: 3,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        centeredRotation: true
    });

    var rect4 = new fabric.Rect({
        left: 100,
        top: 156,
        width: 52,
        height: 3,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        centeredRotation: true
    });

    var rectGroup = new fabric.Group([rect2, rect3, rect4], {
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        left: 200,
        top: 200,
        angle: 0
    });

    this.canvas.add(rectGroup);
}

function addWedge() {
    mode = "shape";
    var id = Date.now();
    canvas.isDrawingMode = false;
    this.canvas.add(new fabric.Triangle({
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        fill: 'black',
        stroke: 'black',
        width: 15,
        height: 43,
        originX: 'center',
        originY: 'center',
        angle: 45,
        strokeWidth: 0
    }));
}

function addArrow() {
    mode = "shape";
    var id = Date.now();
    canvas.isDrawingMode = false;
    var triangle = new fabric.Triangle({
        width: 9,
        height: 15,
        fill: 'black',
        left: 150,
        top: 137,
        angle: 90
    });

    var line = new fabric.Rect({
        left: 100,
        top: 140,
        width: 40,
        height: 3,
        fill: 'black',
        originX: 'left',
        originY: 'top',
        centeredRotation: true
    });

    var arrow = new fabric.Group([line, triangle], {
        id: id,
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        left: 200,
        top: 200,
        angle: 0
    });
    this.canvas.add(arrow);
}

function addText() {
    let text = new fabric.IText('', {
        left: this.canvas.width / 2,
        top: this.canvas.height / 2,
        fill: 'black',
        fontFamily: 'sans-serif',
        fontSize: 30,
        hasRotatingPoint: false,
        centerTransform: true,
        originX: 'center',
        originY: 'center',
        lockUniScaling: true
    });
    this.canvas.add(text);
    text.enterEditing();
    this.canvas.setActiveObject(text);
}

function superScript() {
    var active = canvas.getActiveObject();
    if (!superScriptOn) {
        superScriptOn = true;
        document.getElementById("button-superscript").style.backgroundColor = "#707070"; 
        if (!active) return;
        active.setSuperscript();
        canvas.requestRenderAll();
        console.log('ActiveObject Styles', canvas.getActiveObject().styles)
    } else {
        superScriptOn = false;
        document.getElementById("button-superscript").style.backgroundColor = "#333333";
        removeScript();  
    }
}

function subScript() {
    var active = canvas.getActiveObject();
    if (!subScriptOn) {
        subScriptOn = true;
        document.getElementById("button-subscript").style.backgroundColor = "#707070";  
        let positionStart = active.selectionStart;
        let positionEnd = active.selectionEnd;
        let result = setSize(positionStart, positionEnd, '15');
        active.set('styles', JSON.parse(result));
        canvas.requestRenderAll();
        active.enterEditing();
    } else {
        subScriptOn = false;
        document.getElementById("button-subscript").style.backgroundColor = "#333333";
        let positionStart = active.selectionStart;
        let positionEnd = active.selectionEnd;
        let result = setSize(positionStart, positionEnd, '30');
        active.set('styles', JSON.parse(result));
        canvas.requestRenderAll();
        active.enterEditing();
    }
}

function setSize(start, end, size) {
    var obj1 = canvas.getActiveObject().styles;
        var jsonString = '{ "0": {';
        for (let i = start; i < end; i++) {
            jsonString += '"' + i.toString() + '"' + ': { "fontSize": "' + size + '" }, ';
        }
        var objString = jsonString.slice(0, -2);
        result = objString + ' } }';
        var obj2 = JSON.parse(result);
        var a = JSON.stringify(obj1["0"]);
        var b = JSON.stringify(obj2["0"]);
        if (a !== undefined) {
            var startString = '{ "0": ';
            var resultStart = startString + a + "," + b;
            var objStringNew = resultStart.slice(0, -2);
            var resultNew = objStringNew + ' } } }';
        } else {
            var startString = '{ "0": ';
            var resultStart = startString + b;
            var objStringNew = resultStart.slice(0, -2);
            var resultNew = objStringNew + ' } } }';
        }   
        resultNew = resultNew.replace("},{",",");
        return resultNew;
}

function removeScript() {
    var active = canvas.getActiveObject();
    if (!active) return;
    active.setSelectionStyles({
        fontSize: undefined,
        deltaY: undefined,
    });
    canvas.requestRenderAll();
}


/* context menu 

const contextMenu = document.getElementById("context-menu");
const scope = document.querySelector("body");

scope.addEventListener("contextmenu", (event) => {
    event.preventDefault();

    const { clientX: mouseX, clientY: mouseY } = event;

    contextMenu.style.top = `${mouseY}px`;
    contextMenu.style.left = `${mouseX}px`;

    contextMenu.classList.add("visible");
});

scope.addEventListener("click", (e) => {
    if (e.target.offsetParent != contextMenu) {
        contextMenu.classList.remove("visible");
    }
});
*/

/* create polygon */

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    /* converts polar coordinates to cartesian coordinates */

    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
}

function getRegularPolygonPath(x, y, radius, numVertexes) {
    /* Return a path for a regular polygon centered at x,y with a radius specified with numVertexes sides */

    var interiorAngle = 360 / numVertexes;

    /* rotationAdjustment rotates the path by 1/2 the interior angle so that the polygon always has a flat side on the bottom */
    var rotationAdjustment = 0;
    if (numVertexes % 2 == 0) {
        rotationAdjustment = interiorAngle / 2;
    }

    var d = [];
    for (var i = 0; i < numVertexes; i++) {
        /* var coord = coordList[i]; */
        var coord = polarToCartesian(x, y, radius, i * interiorAngle + rotationAdjustment);

        if (i == 0) {
            d.push('M ');

            /* If an odd number of vertexes, add an additional point at the top of the polygon-- this will shift the calculated center */
            if (numVertexes % 2 == 1) {
                d.push(0);
                d.push(radius);
            }

            d.push('M');

        } else {
            d.push(" L ");
        }

        d.push(coord.x);
        d.push(coord.y);
    }

    d.join(" ");

    d += " Z";

    return d;

}