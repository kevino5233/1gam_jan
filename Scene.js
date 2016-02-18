Scene = function(manager, scene_data){
	this.manager = manager;

	Phaser.Group.call(this, game);

	this.dialogue = scene_data.dialogue;
	this.retries = scene_data.retries;
    this.OnLoad = scene_data.OnLoad;
	this.fallback = scene_data.fallback;
	this.wordbank = scene_data.wordbank;
	this.sentences = scene_data.sentences;
}

Scene.prototype = Object.create(Phaser.Group.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.Load = function(correctness){
    if (correctness <= 50) return false;
	var index = 0;
    if (correctness < 70){
        index = 2;
    } else if (correctness < 90){
        index = 1;
    }
	var dialogue_words_array = this.dialogue[index].split(" ");
	var dialogue_chars_array = (this.manager.speaker + ": ").split("");
	var currlen = dialogue_chars_array.length;
	for (var i = 0; i < dialogue_words_array.length; i++){
		var newlen = currlen + dialogue_words_array[i].length + 1;
		if (newlen < dialogue_text_w){
			currlen = newlen;
		} else {
			dialogue_chars_array.push("\n");
			currlen = 0;
		}
		dialogue_chars_array =
			dialogue_chars_array.concat(dialogue_words_array[i].split(""));
		dialogue_chars_array.push(" ");
	}
	this.manager.dialogue_chars = dialogue_chars_array;
	this.manager.dialogue_frames = 0;
	this.manager.dialogue_pos = 0;
	// Make text objects
	var centerx = this.manager.ellipse_center_x;
	var centery = this.manager.ellipse_center_y;
	var deadzone = this.manager.deadzone;
	for (var i = 0; i < this.wordbank.length; i++){
		var word = this.wordbank[i];
		var a = word.anxiety;
		var randx = RandomFloat(-deadzone, deadzone);
		var randy = RandomFloat(-deadzone, deadzone);
		var text = game.add.text(
			this.ellipse_center_x +
				randx +
				Math.cos(tau * RandomFloat(0, 4)) * a * 2,
			this.ellipse_center_y +
				randy +
				Math.sin(tau * RandomFloat(0, 4)) * a * 2,
			word.text);
		text.manager = this.manager;
		text.centerx = centerx + randx;
		text.centery = centery + randy;
		text.font = global_font;
		text.fontSize = (100 - a) * .20 + 5;
		text.fill = "#FFFFFF";
		text.setShadow(1, 1, "rgba(0,0,0,0.3)", 10);
		text.inputEnabled = true;
		text.events.onInputUp.add(this.manager.PushWordOnQuery, this.manager);
		text.events.onInputOver.add(
			function(item){
				item.fill = "#FF1AFF";
			}, this);
		text.events.onInputOut.add(
			function(item){
				item.fill = "#FFFFFF";
			}, this);
		this.add(text);
		this.manager.floating_text.push(text);
		var b = Math.sqrt(a * a * a / 200);
		var e_x = Math.sqrt(a * a - b * b) * (2 * RandomInt(0, 1) - 1);
		var T = Math.ceil(Math.sqrt(3 * a / G) * Math.PI * a);
		var theta = (tau * i) % circle; //initialize as actual angle
		var dtheta = circle / T * (2 * RandomInt(0, 1) - 1);
		var R1 = a - e_x;
		var R2 = a + e_x;
		var path = [];
		path["pos"] = 0;
		path["dpos"] = 1;
		// Fix to use a matrices to do roatte around instead of 
		// the bullshit I'm doing.
		for (var j = 0; j < T; j++){
			var R = theta >= tau && theta < 3 * tau ? R1 : R2;
			var pos = [];
			var text_x = R * Math.cos(theta) - e_x;
			var text_y = b *
				Math.sqrt(Math.max(0, 1 - text_x * text_x / a / a)) *
				(theta >= 0 && theta < Math.PI ? 1 : -1);
			if (text_x + text.centerx < 0){
				text_x = -text.centerx;
			} else if (text_x + text.centerx >=
					game_w - word.text.length * global_font_size){
				text_x = game_w - word.text.length * global_font_size - text.centerx;
			}
			if (text_y + text.centery < dialogue_box_1_y + dialogue_box_h){
				text_y = dialogue_box_1_y + dialogue_box_h - text.centery;
			} else if (text_y - text.centery >= dialogue_box_2_y - global_font_size){
				text_y = dialogue_box_2_y - global_font_size - text.centery;
			}
			pos["x"] = text_x;
			pos["y"] = text_y;
			path.push(pos);
			theta += dtheta;
			theta %= circle;
		}
		this.manager.floating_text_paths.push(path);
	}
    return true;
}
