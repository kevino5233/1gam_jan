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
	this.manager.dialogue_obj = game.add.text(100, 100, this.dialogue[index]);
    this.manager.dialogue_obj.font = "Press Start 2P";
    this.manager.dialogue_obj.fontSize = this.manager.wordsize;
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
		text.font = "Press Start 2P";
		text.fontSize = (100 - a) * .20 + 5;
		text.inputEnabled = true;
		text.events.onInputUp.add(this.PushWordOnQuery, this);
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
		for (var j = 0; j < T; j++){
			var R = theta >= tau && theta < 3 * tau ? R1 : R2;
			var pos = [];
			pos["x"] = R * Math.cos(theta) - e_x;
			pos["y"] = b *
				Math.sqrt(Math.max(0, 1 - pos["x"] * pos["x"] / a / a)) *
				(theta >= 0 && theta < Math.PI ? 1 : -1);
			path.push(pos);
			theta += dtheta;
			theta %= circle;
		}
		this.manager.floating_text_paths.push(path);
	}
    return true;
}
Scene.prototype.PopWordFromQuery = function(item){
	var text = this.manager.query.words.pop();
    text.orig.visible = true;
    text.destroy();
	this.manager.query.len -= text.text.length + 1;
}
Scene.prototype.PushWordOnQuery = function(item){
	item.visible = false;
	var word = item.text;
	var manager = item.manager;
	var text = game.add.text(
		100 + manager.query.len * manager.wordsize,
		500,
		word);
    text.orig = item;
	text.manager = manager;
	text.font = "Press Start 2P";
	text.fontSize = manager.wordsize;
	text.inputEnabled = true;
	text.events.onInputUp.add(this.PopWordFromQuery, this);
	this.manager.query.words.push(text);
	this.manager.query.len += word.length + 1;
}
