jQuery(window).on("load", function() {

    document.getElementById('filereader').onchange = function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                var image = new fabric.Image(imgObj);
                image.set({
                    angle: 0,
                    padding: 10,
                    cornersize: 10,
                });
                canvas.centerObject(image);
                canvas.add(image);
                canvas.renderAll();
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    canvas.on('mouse:down', function(o) {
        isDown = true;
        console.log(mode);
        var pointer = canvas.getPointer(o.e);
        var points = [pointer.x, pointer.y, pointer.x, pointer.y];
    
        if (mode == "draw") {
            line = new fabric.Line(points, {
                strokeWidth: 1,
                fill: 'black',
                stroke: 'black',
                originX: 'center',
                originY: 'center',

            });
            canvas.add(line);
        }
    });

    canvas.on('mouse:move', function(o) {
        if (!isDown) return;
        var pointer = canvas.getPointer(o.e);

        if (mode == "draw") {
            line.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function(o) {
        isDown = false;
        if (line) {
            line.setCoords();
        }
        updateToggle();
    
    });

    document.onkeyup = function(e) {
          switch (e.key) {
            case 'ArrowLeft':
                updateToggle();
            case 'ArrowRight':
                updateToggle(); 
          }
          if(canvas.getActiveObject() != undefined) {   
                if(canvas.getActiveObject().get('type')==="i-text") { 
                canvas.getActiveObject().enterEditing();
                    canvas.getActiveObject().hiddenTextarea.focus();
                }
            }
    }
    
    function updateToggle() {
        if(canvas.getActiveObject() != undefined) {   
            if(canvas.getActiveObject().get('type')==="i-text") { 
                var active = canvas.getActiveObject();
                let positionEnd = active.selectionEnd;
                console.log(positionEnd);
                var obj1 = canvas.getActiveObject().styles;
                let index = parseInt(positionEnd)-1;
                try {
                    if (obj1["0"][index]["fontSize"] == "15") {
                            subScriptOn = true;
                            document.getElementById("button-subscript").style.backgroundColor = "#707070"; 
                        }
                    else if (obj1["0"][index]["fontSize"] == "18") {
                            superScriptOn = true;
                            document.getElementById("button-superscript").style.backgroundColor = "#707070"; 
                    }
                    else {
                            subScriptOn = false;
                            document.getElementById("button-subscript").style.backgroundColor = "#333333"; 
                            document.getElementById("button-superscript").style.backgroundColor = "#333333"; 
                        }
                    }
                    catch {
                        subScriptOn = false;
                        document.getElementById("button-subscript").style.backgroundColor = "#333333";
                        document.getElementById("button-superscript").style.backgroundColor = "#333333"; 
                    }
                    
            }
        }
    }
/*
    canvas.on('text:changed', function(e) {
        console.log('text:changed', e.target, e.target.text);
        if (e.target) {
            let result = getDigits(e.target.text);
            e.target.set('styles', result);
            console.log('ActiveObject Styles', canvas.getActiveObject().styles)
        }
    });

    */


    function getDigits(string) {
        strArray = string.split('');
        var jsonString = '{ "0": {'
        for (let i = 0; i < strArray.length; i++) {
            if (subScriptOn) {
                jsonString += '"' + i.toString() + '"' + ': { "fontSize": "15" }, ';
            }
            else {
                jsonString += '"' + i.toString() + '"' + ': { "fontSize": "30" }, ';
            }
        }
        var objString = jsonString.slice(0, -2);
        result = objString + ' } }';
        return JSON.parse(result);
    }
});
