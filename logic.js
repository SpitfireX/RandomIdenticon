function generate(){
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	
	var width = c.width;
	var height = c.height;
	
	var fgColor = chroma.random();
	var bgColor = fgColor.brighten(4);
	var fColor = fgColor;
	
	while(chroma.contrast(fColor, bgColor) < 4.5){
		fColor = fColor.darken();
	}
	
	document.body.style.background = bgColor;
	document.body.style.color = fColor;
	
	var buttons = document.getElementsByClassName("mybutton");
	for (i = 0; i < buttons.length; i++){
		buttons[i].style.color = fColor;
	}
	
	var pattern = generatePattern();
	
	var tileW = Math.ceil(width/6);
	var tileH = Math.ceil(width/6);
	
	var ox = tileW/2;
	var oy = tileH/2;
	
	ctx.fillStyle = chroma("white");
    ctx.fillRect(0, 0, width, height);
	
	ctx.fillStyle = fgColor;
	for (y = 0; y < 5; y++){
		for (x = 0; x < 5; x++){
			var xp = ox + (x*tileW);
			var yp = oy + (y*tileH)
			if (pattern[y][x]){
				ctx.fillRect(xp, yp, tileW, tileH);
			}
		}
	}
}

function generatePattern(){
	var pattern = [];
	for (y = 0; y < 5; y++){
		var line = [];
		
		for (x = 0; x < 5; x++){
			if (x < 3){
				line[x] = randBool();
			} else if (x == 3){
				line[x] = line[1];
			} else {
				line[x] = line[0]
			}
		}
		
		pattern[y] = line;
	}
	return pattern;
}

function randBool() {
	return Math.random() >= 0.5;
}