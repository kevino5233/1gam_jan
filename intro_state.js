var intro_state = {
	MENU: 0,
	PLAY: 1,
	CREDITS: 2,
	menu_layers: [],
	floating_obj: [],
	floating_obj_paths: [],
	Menu: function(){
		this.menu_layers[this.MENU].visible = true;
		this.menu_layers[this.PLAY].visible = false;
		this.menu_layers[this.CREDITS].visible = false;
	},
	PlayGame: function(){
		click_to_play = true;
		this.menu_layers[this.MENU].visible = false;
		this.menu_layers[this.PLAY].visible = true;
		this.menu_layers[this.CREDITS].visible = false;
	},
	Credits: function(){
		this.menu_layers[this.MENU].visible = false;
		this.menu_layers[this.PLAY].visible = false;
		this.menu_layers[this.CREDITS].visible = true;
	},
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        document.body.style.background = "#ffff80";
        game.stage.backgroundColor = "#ffff80";
		this.menu_layers = [game.add.group(), game.add.group(), game.add.group()];
		var style = { font: global_font_size + "px " + global_font};
		// Menu layer
		//this.menu_layers[this.MENU].add(game.add.text(200, 250,
		//	"Eggs for Breakfast",
		//	{ font: 2 * global_font_size + "px " + global_font}));
		var centerx = game_w / 2;
		var centery = game_h / 2;
		for (var i = 0; i < 2; i++){
			var notrandx = Math.cos(tau * 2 * i) * 100;
			var notrandy = Math.sin(tau * 2 * i) * 100;
			var text = game.add.text(0, 0,
				i == 1 ? "Play" : "Credits");
			text.manager = this.manager;
			text.font = global_font;
			text.fontSize = global_font_size * 2;
			text.fill = "#000000";
			text.inputEnabled = true;
			text.events.onInputUp.add(i == 1 ? this.PlayGame : this.Credits, this);
			text.events.onInputOver.add(
				function(item){
					item.fill = "#FF1AFF";
				}, this);
			text.events.onInputOut.add(
				function(item){
					item.fill = "#000000";
				}, this);
			this.menu_layers[this.MENU].add(text);
			this.floating_obj.push(text);
			var T = Math.ceil(Math.sqrt(150 / G) * Math.PI * 150);
			var theta = (tau * i) % circle; //initialize as actual angle
			var dtheta = circle / T * (2 * RandomInt(0, 1) - 1);
			var h_radius = 25;
			var v_radius = Math.sqrt(50) * 5;
			var path = [];
			path["pos"] = 0;
			for (var j = 0; j < T; j++){
				var pos = [];
				var text_x = h_radius * Math.cos(theta) + centerx + notrandx;
				var text_y = v_radius * Math.sin(theta) + centery + notrandy;
				if (text_x < 0) {
					text_x = 0;
				} else if (text_x + 6 * text.fontsize > game_w) {
					text_x = game_w - 6 * text.fontsize;
				}
				if (text_y < dialogue_box_1_y + dialogue_box_h) {
					text_y = dialogue_box_1_y + dialogue_box_h + 10;
				} else if (text_y + text.fontSize + 10 > timer_icon_y) {
					text_y = timer_icon_y - text.fontSize - 10;
				}
				pos["x"] = text_x;
				pos["y"] = text_y;
				path.push(pos);
				theta += dtheta;
				theta %= circle;
			}
			this.floating_obj_paths.push(path);
		}
		// Play layer
		this.menu_layers[this.PLAY].add(game.add.text(50, 100,
			"In this game, you talk by clicking on\n" +
			"individual words that float around in\n" +
			"the middle of the screen to make sentences.\n\n" +
            "This game has explicit language.", style));
		// Play layer
		this.menu_layers[this.PLAY].add(game.add.text(100, 250,
			"If you add a word you didn't mean to, simply\n" +
			"click the delete button.", style));
		this.menu_layers[this.PLAY].add(game.add.text(100, 300,
			"If you've added a lot of words you didn't want to,\n" +
			"hit the clear button.", style));
		this.menu_layers[this.PLAY].add(game.add.text(100, 350, 
			"When you're ready to speak,\n" +
			"hit the submit button.", style));
		this.menu_layers[this.PLAY].add(game.add.text(50, 450,
			"Click anywhere to start.", style));
		this.menu_layers[this.PLAY].add(game.add.sprite(50, 250, "backspace"));
		this.menu_layers[this.PLAY].add(game.add.sprite(50, 300, "clear"));
		this.menu_layers[this.PLAY].add(game.add.sprite(50, 350, "submit"));
		game.add.audio("gnossiene_2", 1, true).play();
		// Credits layer
		for (var i = 0; i < 2; i++){
			var notrandx = Math.cos(tau * 2 * i) * 100;
			var notrandy = Math.sin(tau * 2 * i) * 100;
			var text = game.add.text(0, 0,
				i == 1 ? "@kevino_is_me" : "Back");
			text.manager = this.manager;
			text.font = global_font;
			text.fontSize = global_font_size * 2;
			text.fill = i == 1 ? "#1DA1F2" : "#000000";
			text.inputEnabled = true;
			if (i == 0) {
				text.events.onInputUp.add(this.Menu, this);
				text.events.onInputOver.add(
					function(item){
						item.fill = "#FF1AFF";
					}, this);
				text.events.onInputOut.add(
					function(item){
						item.fill = "#000000";
					}, this);
			}
			this.menu_layers[this.CREDITS].add(text);
			this.floating_obj.push(text);
			var T = Math.ceil(Math.sqrt(150 / G) * Math.PI * 150);
			var theta = (tau * i) % circle; //initialize as actual angle
			var dtheta = circle / T * (2 * i - 1);
			var h_radius = 25;
			var v_radius = Math.sqrt(50) * 5;
			var path = [];
			path["pos"] = 0;
			for (var j = 0; j < T; j++){
				var pos = [];
				var text_x = h_radius * Math.cos(theta) + centerx + notrandx;
				var text_y = v_radius * Math.sin(theta) + centery + notrandy;
				if (text_x < 0) {
					text_x = 0;
                } else if (text_x
                           + i * 100
                           + text.text.length * text.fontsize > game_w) {
                    text_x = game_w
                             - i * 100
                             - text.text.length * text.fontsize;
                }
				if (text_y < dialogue_box_1_y + dialogue_box_h) {
					text_y = dialogue_box_1_y + dialogue_box_h + 10;
				} else if (text_y + text.fontSize + 10 > timer_icon_y) {
					text_y = timer_icon_y - text.fontSize - 10;
				}
				pos["x"] = text_x;
				pos["y"] = text_y;
				path.push(pos);
				theta += dtheta;
				theta %= circle;
			}
			this.floating_obj_paths.push(path);
			if (i == 1){
				var icon = game.add.sprite(text.x - 60, text.y - 15, "twitter");
				var icon_path = [];
				icon_path["pos"] = 0;
				this.menu_layers[this.CREDITS].add(icon);
				this.floating_obj.push(icon);
				for (var j = 0; j < T; j++){
					var pos = [];
					pos["x"] = path[j]["x"] - 60;
					pos["y"] = path[j]["y"] - 14;
					icon_path.push(pos);
				}
				this.floating_obj_paths.push(icon_path);
			}
		}
		// Hide layers
		this.menu_layers[this.PLAY].visible = false;
		this.menu_layers[this.CREDITS].visible = false;
    },
    update: function(){
		for (var i = 0; i < this.floating_obj.length; i++){
			var path = this.floating_obj_paths[i];
			var pos = path[path["pos"]];
			path["pos"]++;
			path["pos"] %= path.length;
			this.floating_obj[i].x = pos.x;
			this.floating_obj[i].y = pos.y;
		}
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
