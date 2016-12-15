
// Leap
Leap.loop({enableGestures: true}, (frame) => {

	if (frame.valid && frame.gestures.length > 0) {
		frame.gestures.forEach( gesture =>  {
			if (gesture.type !== 'swipe')
				return;


			console.log('swipe détécté !', gesture);
		} );
	}
	
});

// Fonction mapping 3D to 2D
/*function to2D(leapPoint, frame){

	let iBox = frame.interactionBox;
	let normalizedPoint = iBox.normalizePoint(leapPoint ,true);

	return{
		x : normalizedPoint[0] * canvas.width,
		y : (1 - normalizedPoint[1]) * canvas.height
	};
}*/