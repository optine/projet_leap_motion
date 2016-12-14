	let canvas 	= document.getElementById('drawzone');
	let ctx 		= canvas.getContext('2d');

	// Taille du Canvas
	canvas.width 	= window.innerWidth;
	canvas.height	= window.innerHeight;

// Leap
Leap.loop( (frame) => {

	// console.info(frame.hands.length, 'Mains détéctées!');

	ctx.fillStyle 	= 'black';
	ctx.clearRect(0,0, canvas.width, canvas.height);

	// Boucle parcourant chaque main détéctée dans l'espace leap
	frame.hands.forEach((hand) => {

		let palmPos 	= to2D(hand.stabilizedPalmPosition, frame);
		draw_circle(palmPos.x, palmPos.y, 30);

		// Boucle parcourant chaque doigts de cette main
		hand.fingers.forEach((finger) => {

			// Distal Phalange
			let tipPos	= 	to2D(finger.stabilizedTipPosition, frame);
			draw_circle(tipPos.x, tipPos.y, 10, '#e57373');

			// Intermédiaire Phalange
			let dipPos	= 	to2D(finger.dipPosition, frame);
			draw_circle(dipPos.x, dipPos.y, 10,'#64b5f6');

			// Proximal
			let pipPos	= 	to2D(finger.pipPosition, frame);
			draw_circle(pipPos.x, pipPos.y, 10, '#aed581');

			// Metacarpal
			let mcpPos	= 	to2D(finger.mcpPosition, frame);
			draw_circle(mcpPos.x, mcpPos.y, 10,'#ffd54f');
			
			// Carpal
			let carpPos	= 	to2D(finger.carpPosition, frame);
			draw_circle(carpPos.x, carpPos.y, 10,'#9575cd');			
			// console.log(finger);

			// Relier les points
			stroke(tipPos, dipPos);
			stroke(dipPos, pipPos);
			stroke(pipPos, mcpPos);
			stroke(mcpPos, carpPos);
		});
	});
});
	// Fonction mapping 3D to 2D
	function to2D(leapPoint, frame){

		let iBox = frame.interactionBox;
		let normalizedPoint = iBox.normalizePoint(leapPoint ,true);

		return{
			x : normalizedPoint[0] * canvas.width,
			y : (1 - normalizedPoint[1]) * canvas.height
		};
	}
	// Fonction pour dessiner les cercles des éléments des 	doigts
	function draw_circle(x, y, size, color='#0d47a1'){
		ctx.fillStyle 	= color;
		ctx.beginPath();
		ctx.arc(x, y, size, 0, Math.PI*2);
		ctx.fill();
		ctx.closePath();
	}
	// Fonction pour lier les cercles de chaque doigts
	function stroke(begin, end){
		ctx.moveTo(begin.x, begin.y);
		ctx.lineTo(end.x, end.y);
		ctx.stroke();
	}