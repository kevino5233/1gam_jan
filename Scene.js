Scene = function(state, game, scene_data){
	this.state = state;
	this.game = game;

	Phaser.Group.call(this, game);

	this.dialogue = scene_data.dialogue;
	this.retries = scene_data.retries;
	this.fallback = scene_data.fallback;
	this.wordbank = scene_data.wordbank;
	this.sentences = scene_data.sentences;
}

Scene.prototype = Object.create(Phaser.Group.prototype);
Scene.prototype.constructor = Scene;

Scene.prototype.LoadScene = function(correctness){
	var index = 3 - (correctness - 50) / 25;
	this.state.dialogue = this.dialogue[index];
	// Make text objects
	var centerx = this.state.ellipse_center_x;
	var centery = this.state.ellipse_center_y;
	var deadzone = this.state.deadzone;
	for (var i = 0; i < this.wordbank.length; i++){
		var word = this.wordbank[i];
		var anxiety = word.anxiety;
		var randx = RandomFloat(-deadzone, deadzone);
		var randy = RandomFloat(-deadzone, deadzone);
		var text = game.add.text(
			this.ellipse_center_x +
				randx +
				Math.cos(tau * RandomFloat(0, 4)) * anxiety * 2,
			this.ellipse_center_y +
				randy +
				Math.sin(tau * RandomFloat(0, 4)) * anxiety * 2,
			word.text);
		text.state = this.state;
		text.centerx = centerx + randx;
		text.centery = centery + randy;
		text.font = "Press Start 2P";
		text.fontSize = (100 - anxiety) * .20 + 9;
		text.inputEnabled = true;
		text.events.onInputUp.add(this.PushWordOnQuery, this);
		this.add(text);
		this.state.sample_text.push(text);
		var a = anxiety;
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
		this.state.text_paths.push(path);
	}
}
Scene.prototype.PushWordOnQuery = function(item){
	item.visible = false;
	var word = item.text;
	var state = item.state;
	var text = game.add.text(
		100 + state.query.len * state.query.wordsize,
		500,
		word);
	text.state = state;
	text.font = "Press Start 2P";
	text.fontSize = state.query.wordsize;
	text.inputEnabled = true;
	//text.events.onInputUp.add(PopWordFromQuery, this);
	this.state.query.words.push(text);
	this.state.query.len += word.length + 1;
}
Scene.prototype.EvaluateSentence = function(query, sentence) {
	var CUP = sentence.CUP;
	var EUP = sentence.EUP;
	var words = sentence.words;
    // count crucial words
	var n_crucial_words = 0;
	var crucial_words = sentence.crucial_words;
	var crucial_words_pos = new Array(crucial_words.length);
	crucial_words_pos.fill(-1);
	for (var i = 0; i < query.length && crucial_words; i++) {
		for (var j = 0; j < crucial_words.length; j++) {
			if (query[i] == words[crucial_words[j]]) {
				crucial_words_pos[j] = i;
				n_crucial_words++;
			}
		}
	}
	var k = 0;
	while (k < crucial_words_pos.length) {
		if (crucial_words_pos[k] == -1) {
			crucial_words_pos.splice(k, 1);
		} else {
			k++;
		}
	}
    // determine order
	var crucial_words_order = crucial_words_pos.sort();
	var n_crucial_wo3 = 0;
	for (var i = 0; i < crucial_words_pos.length; i++) {
		if (crucial_words_pos[i] != crucial_words_order[i]) {
			n_crucial_wo3++;
		}
	}
	n_crucial_wo3 *= 2;
    // count non crucial words
	var n_non_crucial_words = 0;
	var non_crucial_words = sentence.non_crucial_words;
	var non_crucial_words_pos = new Array(non_crucial_words.length);
	non_crucial_words_pos.fill(-1);
	for (var i = 0; i < query.length && non_crucial_words; i++) {
		for (var j = 0; j < non_crucial_words.length; j++) {
			if (query[i] == words[non_crucial_words[j]]) {
				non_crucial_words_pos[j] = i;
				n_non_crucial_words++;
			}
		}
	}
	k = 0;
	while (k < non_crucial_words_pos.length) {
		if (non_crucial_words_pos[k] == -1) {
			non_crucial_words_pos.splice(k, 1);
		} else {
			k++;
		}
	}
    // determine order
	var non_crucial_words_order = non_crucial_words_pos.sort();
	var n_non_crucial_wo3 = 0;
	for (var i = 0; i < non_crucial_words_pos.length; i++) {
		if (non_crucial_words_pos[i] != non_crucial_words_order[i]) {
			n_non_crucial_wo3++;
		}
	}
	n_non_crucial_wo3 *= 2;
    // count articles and trivial words
	var n_trivial_words = 0;
	var trivial_words = sentence.trivial_words;
	var trivial_words_pos = new Array(trivial_words.length);
	for (var i = 0; i < query.length && trivial_words; i++) {
		for (var j = 0; j < trivial_words.length; j++) {
			if (query[i] == words[trivial_words[j]]) {
				n_trivial_words++;
				trivial_words_pos[j] = i;
			}
		}
	}
	k = 0;
	while (k < trivial_words_pos.length) {
		if (trivial_words_pos[k] == -1) {
			trivial_words_pos.splice(k, 1);
		} else {
			k++;
		}
	}
    // count random words in between CW and outside CW
	var non_random_words = crucial_words_order.concat(
		non_crucial_words_order.concat(trivial_words_pos)).sort();
	var random_words_in = 0;
	var random_words_out = 0;
	k = 0;
	for (var i = 0; i < query.length; i++) {
		if (i == non_random_words[k]){
			k++;
		} else if (i < crucial_words_order[0] ||
			i > crucial_words_order[crucial_words_order.length - 1]) {
			random_words_out++;
		} else {
			random_words_in++;
		}
	}
	// calculate final correctness
	var crucial_error =
		(crucial_words.length - n_crucial_words + n_crucial_wo3 * 3 / 10)
		* CUP / crucial_words.length;
	var extra_error =
		(non_crucial_words.length - n_non_crucial_words + n_non_crucial_wo3 * 3 / 10)
		* EUP / non_crucial_words.length;
	var trivial_error = trivial_words.length - n_trivial_words;
	var random_error = 
		(random_words_in * CUP / crucial_words.length +
		random_words_out * EUP / non_crucial_words.length)
		/ 2;
	return 100 - crucial_error - extra_error - trivial_error - random_error;
}
Scene.prototype.EvaluateQuery = function(key){
	var state = key.state;
	var sentences = state.sentences;
    var query = [];
	for (var i = 0; i < state.query.words.length; i++){
        query.push(state.query.words[i].text);
    }
	var next_state = {scene: -1, correctness: -1};
    for (var i = 0; i < sentences.length; i++){
        var correctness = EvaluateSentence(query, sentences[i]);
		if (correctness > next_state.correctness){
			next_state.scene = sentences[i].response;
			next_state.correctness = correctness;
		}
    }
}
