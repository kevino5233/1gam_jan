SceneManager = function(scenes, ellipse_center_x, ellipse_center_y, nextscene){
    this.scenes = [];
    for (var i = 0; i < scenes.length; i++){
        this.scenes.push(new Scene(this, scenes[i]));
    }
    // make global?
	this.deadzone = 100;
	this.floating_text = [];
	this.floating_text_paths = [];
	this.query = {
		words: [],
		len: 0
	};
    this.wordsize = 15;
    this.ellipse_center_x = ellipse_center_x;
    this.ellipse_center_y = ellipse_center_y;
    this.nextscene = nextscene;
    this.LoadScene(0, 100);
}
SceneManager.prototype.Update = function(){
    if (this.currscene.retries == -1 && game.input.activePointer.justPressed()){
        game.state.start(this.nextscene);
    }
    for (var i = 0; i < this.floating_text.length; i++){
        var path = this.floating_text_paths[i];
        var pos = path[path["pos"]];
        path["pos"] += path["dpos"];
        if (path["pos"] == 0 && path["dpos"] == -1){
            path["pos"] = 1;
            path["dpos"] = 1;
        } else if (path["pos"] == path.length){
            path["pos"] = path.length - 1;
            path["dpos"] = -1;
        }
        this.floating_text[i].x = pos.x + this.floating_text[i].centerx;
        this.floating_text[i].y = pos.y + this.floating_text[i].centery;
    }
}
SceneManager.prototype.LoadScene = function(scene_num, correctness){
    if (this.currscene){
        this.dialogue_obj.destroy();
        while (this.query.words.length > 0){
            var text = this.query.words.pop();
            text.destroy();
        }
        this.query.len = 0;
        while (this.floating_text.length > 0){
            var text = this.floating_text.pop();
            text.destroy();
        }
    }
    if (this.scenes[scene_num].Load(correctness)){
        this.currscene = this.scenes[scene_num];
        if (this.currscene.retries == -1){
            var text = game.add.text(
                100,
                500,
                "Click anywhere to continue."
            );
			text.font = global_font;
			text.fontsize = this.wordsize;
        }
    }
}
SceneManager.prototype.EvaluateSentence = function(query, sentence) {
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
        (crucial_words.length - n_crucial_words + n_crucial_wo3)
        / 2 / crucial_words.length;
	var extra_error = non_crucial_words.length == 0 ?
        0 :
        (non_crucial_words.length - n_non_crucial_words + n_non_crucial_wo3)
        / 2 / non_crucial_words.length;
	var trivial_error = trivial_words.length == 0 ?
        0 :
        trivial_words.length - n_trivial_words;
	var random_error = 
		(random_words_in * CUP / crucial_words.length)
         + (non_crucial_words.length == 0 ?
               0 :
               random_words_out * CUP / 2 / non_crucial_words.length)
		 //divide by two is tentative solution to EUP = 0
		/ 2; //balance out later
	return Math.max(100
                    - crucial_error * CUP
                    - extra_error * EUP
                    - trivial_error
                    - random_error, 0);
}
SceneManager.prototype.PopWordFromQuery = function(item){
	var text = this.query.words.pop();
    text.orig.visible = true;
    text.destroy();
	this.query.len -= text.text.length + 1;
}
SceneManager.prototype.EvaluateQuery = function(key){
	var sentences = this.currscene.sentences;
    var query = [];
	for (var i = 0; i < this.query.words.length; i++){
        query.push(this.query.words[i].text);
    }
	var next_scene = {sentence: -1, scene: -1, correctness: -1};
    for (var i = 0; i < sentences.length; i++){
        var correctness = this.EvaluateSentence(query, sentences[i]);
		if (correctness > next_scene.correctness){
			next_scene.sentence = i;
			next_scene.scene = sentences[i].response;
			next_scene.correctness = correctness;
		}
    }
    if (next_scene.correctness > 50){
		if (sentences[next_scene.sentence].OnCorrect){
			sentences[next_scene.sentence].OnCorrect(next_scene.correctness);
		}
        this.LoadScene(next_scene.scene, next_scene.correctness);
    }
}
