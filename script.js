









// Main framework
window.addEventListener("load",function () {

		//Index
		var canvas = document.getElementById("canvas");
		var ctx = canvas.getContext("2d");

		var objects = [
			new Thumbstick(
                100*.5, 100*.5,
                10,
                Math.min(100*.5, 100*.5)-5,
                0.1
            ),
		];

		// Set render function
		var frameUpdate = function() {

			// Clear
            ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.clearRect(0,0,canvas.width,canvas.height);

			// Draw
			for (var i = 0; i < objects.length; i++) {
				var object = objects[i];

                ctx.setTransform(1, 0, 0, 1, object.x, object.y);
				object.draw.call(object, canvas, ctx);
			}
		}


		// Set render function
		var updateLoop = function(delta) {

			var updateScreen = false;

			// Update
			gamepads = navigator.getGamepads();
			for (var i = 0; i < objects.length; i++) {
				var object = objects[i];

				if (object.update.call(object, delta) === true) {

					updateScreen = true;
				}
			}

			// Update screen
			if (updateScreen) {
				frameUpdate();
			}

			// Next loop
			window.requestAnimationFrame(updateLoop);
		}
		window.requestAnimationFrame(updateLoop);


},false)
