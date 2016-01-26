var test_state = {
	sample_text: [],
	text_paths: [],
	deadzone: 100,
	scene: {
		dialogue: ["Wassup mah nigguh"],
		retries: 3,
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
		sentences: [
			{
				CUP: 90,
				EUP: 10,
				crucial_words: [2],
				non_crucial_words: [1],
				trivial_words: [0],
				words: ["Oh", "Cool", "Thanks"]
			},
			{
				CUP: 70,
				EUP: 30,
				crucial_words: [0, 2],
				non_crucial_words: [1],
				trivial_words: [],
				words: ["What's", "In", "It"]
			},
			{
				CUP: 70,
				EUP: 30,
				crucial_words: [1, 2, 3],
				non_crucial_words: [0, 4],
				trivial_words: [5, 6],
				words: ["You", "Didn't", "Have", "To", "Do", "That", "It"]
			}
		]
	},
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
        game.stage.backgroundColor = "#ffff00"
		// this will be pre-defined per level state
        this.ellipse_center_x = game_w *.5 * Math.random() + game_w * .25;
        this.ellipse_center_y = game_h *.5 * Math.random() + game_h * .25;
		this.scene_test = new Scene(this, game, this.scene);
		this.scene_test.LoadScene(100);
		var key = game.input.keyboard.addKey(Phaser.Keyboard.E);
		key.state = this;
		key.onDown.add(this.scene_test.EvaluateQuery, this);
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
