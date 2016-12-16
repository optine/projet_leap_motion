
// Leap
Leap.loop({enableGestures: true}, (frame) => {

	if (frame.valid && frame.gestures.length > 0) {
		frame.gestures.forEach( gesture =>  {
			if (gesture.type !== 'swipe')
				return;


			console.log('swipe détécté !', gesture);
		} );
	}

if (gesture.type == "swipe") {
          //Classify swipe as either horizontal or vertical
          var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
          //Classify as right-left or up-down
          if(isHorizontal){
              if(gesture.direction[0] > 0){
                  swipeDirection = "right";
                  console.log("swipe right !");
              } else {
                  swipeDirection = "left";
                  console.log("swipe left !");
              }
          } else { //vertical
              if(gesture.direction[1] > 0){
                  swipeDirection = "up";
                  console.log("swipe up !");
              } else {
                  swipeDirection = "down";
                  console.log("swipe down !");
              }                  
          }
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