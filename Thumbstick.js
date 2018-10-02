// Thumbstick object
function Thumbstick(x, y, size, radius, deadzone) {

	this.x = x; this.y = y;
    this.size = size;
    this.radius = radius;
    this.deadzone = deadzone;
	this.input = new Vector(0, 0);

	this.update = function(delta) {

		var xAxis = yAxis = 0;

		// Get keyboard input
		xAxis += keyboard.KeyD ? 1 : 0;
		xAxis -= keyboard.KeyA ? 1 : 0;
		yAxis += keyboard.KeyS ? 1 : 0;
		yAxis -= keyboard.KeyW ? 1 : 0;

		// Get gamepad input
		for (var id in gamepads) {
			var gamepad = gamepads[id];
			if (gamepad !== null && gamepad.axes) {
				xAxis += gamepad.axes[0] || 0;
				yAxis += gamepad.axes[1] || 0;
			}
		}

		// Update input
		this.input.x = Math.max(Math.min(xAxis, 1), -1);
		this.input.y = Math.max(Math.min(yAxis, 1), -1);;

		// Update position
        if (this.input.length() > this.deadzone) {
            var normalInput = this.input.unit(1, 1);
            this.x += normalInput.x;
            this.y += normalInput.y;

			// Return true to indicate we need a frame update as well
			return true;
        }
	}

	this.draw = function(canvas, ctx) {

        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";

        // Max radius
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, 2*Math.PI);
        ctx.stroke();

        // Deadzone radius
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * this.deadzone, 0, 2*Math.PI);
        ctx.fillStyle="red";
        ctx.fill();



        // X line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "blue";
        ctx.moveTo(0, 0);
        ctx.lineTo(this.input.x * this.radius, 0);
        ctx.stroke();
        // Y line
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "red";
        ctx.moveTo(0, 0);
        ctx.lineTo(0, this.input.y * this.radius);
        ctx.stroke();

        if (this.input.length() > this.deadzone) {

            var normalInput = this.input.unit(1, 1);

            // Maxed out vector
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "black";
            canvas_arrow(ctx, 0, 0, normalInput.x * this.radius, normalInput.y * this.radius)

            ctx.stroke();


            // Direction vector
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "#AA0000";
            canvas_arrow(ctx, 0, 0, this.input.x * this.radius, this.input.y * this.radius)

            ctx.stroke();
        }
        ctx.closePath();

        // ctx.fillStyle="#FFFF00";
		// ctx.fillRect(0-this.size*.5, 0-this.size*.5, this.size, this.size);
        // ctx.fillStyle="#FF00FF";
		// ctx.fillRect((this.input.x * this.radius)-this.size*.5, (this.input.y * this.radius)-this.size*.5, this.size, this.size);
	}
}
