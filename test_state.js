var test_state = {
	sample_text: [],
	text_paths: [],
	wordbank: [
		{text: "Oh", 		anxiety: 50},
		{text: "Cool", 		anxiety: 50},
		{text: "Thanks", 	anxiety: 50},
		{text: "What's", 	anxiety: 50},
		{text: "In", 		anxiety: 50},
		{text: "It", 		anxiety: 50},
		{text: "You", 		anxiety: 50},
		{text: "Didn't", 	anxiety: 50},
		{text: "Have", 		anxiety: 50},
		{text: "To", 		anxiety: 50},
		{text: "Do", 		anxiety: 50},
		{text: "That", 		anxiety: 50}
	],
	deadzone: 100,
	sentences: [
		[
			{text: "Oh", 		crucial: false, trivial: true},
			{text: "Cool", 		crucial: false, trivial: false},
			{text: "Thanks", 	crucial: true, 	trivial: false}
		],
		[
			{text: "What's", 	crucial: true, 	trivial: false},
			{text: "In", 		crucial: false, trivial: false},
			{text: "It", 		crucial: true, 	trivial: false}
		],
		[
			{text: "You", 		crucial: false,	trivial: false},
			{text: "Didn't", 	crucial: true,  trivial: false},
			{text: "Have", 		crucial: true,  trivial: false},
			{text: "To", 		crucial: true,  trivial: false},
			{text: "Do", 		crucial: false, trivial: true},
			{text: "That", 		crucial: false,	trivial: true}
		]
	],
	query: {
		words: [],
		len: 0,
		wordsize: 15
	},
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
		var key = game.input.keyboard.addKey(Phaser.Keyboard.E);
		key.state = this;
		key.onDown.add(EvaluateSentence, this);
        game.stage.backgroundColor = "#ffff00"
        this.ellipse_center_x = game_w *.5 * Math.random() + game_w * .25;
        this.ellipse_center_y = game_h *.5 * Math.random() + game_h * .25;
        var graphics = game.add.graphics(
            this.ellipse_center_x, this.ellipse_center_y);
        graphics.beginFill(0xFF0000);
        graphics.drawCircle(0, 0, 10);
        graphics.endFill();
        var tau = Math.PI / 2;
		var circle = Math.PI * 2;
        for (var i = 0; i < this.wordbank.length; i++){
			var word = this.wordbank[i];
			var anxiety = word.anxiety;
			var randx = RandomFloat(-this.deadzone, this.deadzone);
			var randy = RandomFloat(-this.deadzone, this.deadzone);
            var text = game.add.text(
                this.ellipse_center_x +
					randx +
					Math.cos(tau * RandomFloat(0, 4)) * anxiety * 2,
                this.ellipse_center_y +
					randy +
					Math.sin(tau * RandomFloat(0, 4)) * anxiety * 2,
                word.text);
			text.centerx = this.ellipse_center_x + randx;
			text.centery = this.ellipse_center_y + randy;
            text.font = "Press Start 2P";
            text.fontSize = (100 - anxiety) * .20 + 9;
			text.state = this;
			text.inputEnabled = true;
			text.events.onInputUp.add(MouseOverTextUp, this);
			text.events.onInputDown.add(MouseOverTextDown, this);
            this.sample_text.push(text);
            var g = 4;
            var a = anxiety;
            var b = Math.sqrt(a * a * a / 200);
            var e_x = Math.sqrt(a * a - b * b) * (2 * RandomInt(0, 1) - 1);
            var T = Math.ceil(Math.sqrt(3 * a / g) * Math.PI * a);
            var theta = (tau * i) % circle; //initialize as actual angle
            var dtheta = circle / T * (2 * RandomInt(0, 1) - 1);
            var R1 = a - e_x;
            var R2 = a + e_x;
			var path = [];
			path["pos"] = 0;
			path["dpos"] = 1;
            for (var j = 0; j < T; j++){
                var R = theta >= tau && theta < 3 * tau ? R1 : R2;
				var pos = [];
				pos["x"] = R * Math.cos(theta) - e_x;
				if (pos["x"] > a || pos["x"] < -a){
					console.log("math fucked up");
					console.log(a);
					console.log(pos["x"]);
				}
				pos["y"] = b *
					Math.sqrt(Math.max(0, 1 - pos["x"] * pos["x"] / a / a)) *
					(theta >= 0 && theta < Math.PI ? 1 : -1);
				path.push(pos);
				theta += dtheta;
				theta %= circle;
            }
			this.text_paths.push(path);
        }
    },
    update: function(){
		for (var i = 0; i < this.sample_text.length; i++){
			var path = this.text_paths[i];
			var pos = path[path["pos"]];
			path["pos"] += path["dpos"];
			if (path["pos"] == 0 && path["dpos"] == -1){
				path["pos"] = 1;
				path["dpos"] = 1;
			} else if (path["pos"] == path.length){
				path["pos"] = path.length - 1;
				path["dpos"] = -1;
			}
			this.sample_text[i].x = pos.x + this.sample_text[i].centerx;
			this.sample_text[i].y = pos.y + this.sample_text[i].centery;
		}
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
