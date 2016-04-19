SceneManager = function(state, scenes, speaker, nextscene){
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
		linewidths: [],
		len: 0,
		x: 0,
		y: 0
	};
	this.speaker = speaker;
	this.speechsound = game.add.audio("speech");
	this.errorsound = game.add.audio("error");
	this.pushpopsound = game.add.audio("pushpop");
    this.nextscene = nextscene;
    this.state = state;
	this.state.dialogue_ui_layer.add(
        game.add.sprite(dialogue_box_x, dialogue_box_1_y, "dialogue_box"));
	this.state.dialogue_ui_layer.add(
        game.add.sprite(dialogue_box_x, dialogue_box_2_y, "dialogue_box"));
	this.dialogue_obj = game.add.text(
		dialogue_box_x + text_offset,
		dialogue_box_1_y + text_offset, "");
    this.dialogue_obj.fill = "#FFFFFF";
    this.dialogue_obj.font = global_font;
    this.dialogue_obj.fontSize = global_font_size;
    this.state.dialogue_text_layer.add(this.dialogue_obj);
	// Initial x values of these buttons don't really matter
	// since they'll be invisible and the values will be
	// corrected as soon as words are pushed
	this.button_back = game.add.button(0, button_y, "backspace",
			this.PopWordFromQuery, this);
    this.state.general_ui_layer.add(this.button_back);
	this.button_submit = game.add.button(0, button_y, "submit",
			this.EvaluateQuery, this);
    this.state.general_ui_layer.add(this.button_submit);
    this.state.general_ui_layer.visible = false;
	this.error_timer_len = 60;
	this.error_timer_pos = 60;
    this.timer_sprites = [];
    this.timer_len = 20 * 60;
    this.timer_curr = this.timer_len;
    this.LoadScene(0, 100);
}
SceneManager.prototype.TriggerRetryDialogue = function(){
    this.currscene.retries--;
    if (this.currscene.retries >= 0) {
        this.currscene.LoadDialogueText(this.currscene.fallback);
    } else {
	}
}
SceneManager.prototype.Update = function(){
	if (this.dialogue_pos < this.dialogue_chars.length){
		if (this.dialogue_frames % 2 == 0){
			if (this.dialogue_pos == 0){
				this.dialogue_obj.setText(this.dialogue_chars[this.dialogue_pos]);
			} else {
				this.dialogue_obj.setText(
					this.dialogue_obj.text
					+ this.dialogue_chars[this.dialogue_pos]);
			}
			if (this.dialogue_pos % 4 == 0){
				this.speechsound.play();
			}
			this.dialogue_pos++;	
		}
		this.dialogue_frames++;
	} else if (!this.state.floating_text_layer.visible){
        this.state.floating_text_layer.visible = true;
        this.timer_curr = this.timer_len;
        for (var i = 0; i < 20; i++){
            var timer_sprite = game.add.sprite(
                timer_icon_x + timer_icon_w * i,
                timer_icon_y,
                "timer_ico");
            this.state.dialogue_ui_layer.add(timer_sprite);
            this.timer_sprites.push(timer_sprite);
        }
    } else {
        this.timer_curr--;
        if (this.timer_curr < this.timer_len
                && this.timer_curr % 60 == 0){
            this.timer_sprites.pop().destroy();
            if (this.timer_curr == 5 * 60){
                this.currscene.LoadDialogueText(
                    this.currscene.fallback);
            } else if (this.timer_curr <= 0
                    && !this.LoadScene(
                            this.currscene.fallback_scene, 0)){
                console.log("shit fucked up");
            }
        }
    }

	if (this.error_timer_pos < this.error_timer_len){
		this.error_timer_pos++;
		if (this.error_timer_pos == this.error_timer_len){
			this.button_submit.loadTexture("submit");
		}
	}
    if (game.input.activePointer.justPressed()){
        if (this.currscene.retries == -1){
        } else if (this.currscene.retries == -2){
            game.state.start(this.nextscene);
        }
    }
    for (var i = 0; i < this.floating_text.length; i++){
        var path = this.floating_text_paths[i];
        var pos = path[path["pos"]];
        path["pos"]++;
        path["pos"] %= path.length;
        this.floating_text[i].x = pos.x + this.floating_text[i].centerx;
        this.floating_text[i].y = pos.y + this.floating_text[i].centery;
    }
}
SceneManager.prototype.LoadScene = function(scene_num, correctness){
    if (this.currscene){
        while (this.query.words.length > 0){
            var text = this.query.words.pop();
            text.destroy();
        }
        this.query.x = 0;
        this.query.y = 0;
		this.button_back.y = button_y;
		this.button_submit.y = button_y;
        while (this.floating_text.length > 0){
            var text = this.floating_text.pop();
            text.destroy();
        }
    }
    if (this.scenes[scene_num].Load(correctness)){
        this.currscene = this.scenes[scene_num];
        this.state.general_ui_layer.visible = false;
        this.state.floating_text_layer.visible = false;
        if (this.currscene.retries < 0){
            var text = game.add.text(
				dialogue_box_x + text_offset,
				dialogue_box_2_y + text_offset,
				"Click anywhere to continue.");
			text.fill = "#FFFFFF";
			text.font = global_font;
			text.fontSize = global_font_size;
            this.state.dialogue_text_layer.add(text);
        } else {
            while (this.timer_sprites.length > 0){
                var timer_sprite = this.timer_sprites.pop();
                timer_sprite.destroy();
            }
        }
		return true;
    }
	return false;
}
SceneManager.prototype.EvaluateSentence = function(query, sentence) {
	var CUP = sentence.CUP;
	var EUP = sentence.EUP;
	var words = [];
	for (var i = 0; i < sentence.words.length; i++){
		words.push(sentence.words[i].toUpperCase());
	}
	var query_words = [];
	for (var i = 0; i < query.length; i++){
		query_words.push(query[i].toUpperCase());
	}
    // count crucial words
	var n_crucial_words = 0;
	var crucial_words = sentence.crucial_words;
	var crucial_words_pos = new Array(crucial_words.length);
	crucial_words_pos.fill(-1);
	for (var i = 0; i < query_words.length && crucial_words; i++) {
		for (var j = 0; j < crucial_words.length; j++) {
			if (query_words[i] == words[crucial_words[j]]) {
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
	for (var i = 0; i < query_words.length && non_crucial_words; i++) {
		for (var j = 0; j < non_crucial_words.length; j++) {
			if (query_words[i] == words[non_crucial_words[j]]) {
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
	for (var i = 0; i < query_words.length && trivial_words; i++) {
		for (var j = 0; j < trivial_words.length; j++) {
			if (query_words[i] == words[trivial_words[j]]) {
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
	for (var i = 0; i < query_words.length; i++) {
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
SceneManager.prototype.PushWordOnQuery = function(item){
	this.pushpopsound.play();
	item.visible = false;
	var word = item.text;
	if (this.query.x + word.length + 1 > query_text_w){
		this.query.linewidths.push(this.query.x);
		this.query.x = 0;
		this.query.y += 1;
		this.button_back.y += query_y_height;
		this.button_submit.y += query_y_height;
	}
	var text = game.add.text(
		dialogue_box_x + text_offset + this.query.x * global_font_size,
		dialogue_box_2_y + text_offset + this.query.y * query_y_height,
		word);
    text.orig = item;
    text.fill = "#FFFFFF";
	text.font = global_font;
	text.fontSize = global_font_size;
	text.inputEnabled = true;
    this.state.dialogue_text_layer.add(text);
	this.query.words.push(text);
	this.query.x += word.length + 1;
    this.state.general_ui_layer.visible = true;
	this.button_back.x = 
		dialogue_box_x + text_offset + this.query.x * global_font_size;
	this.button_submit.x =
		dialogue_box_x + text_offset + button_submit_x + this.query.x * global_font_size;
}
SceneManager.prototype.PopWordFromQuery = function(item){
	this.pushpopsound.play();
	var text = this.query.words.pop();
    var orig = text.orig;
	this.query.x -= text.text.length + 1;
    orig.visible = true;
    orig.fill = "#FFFFFF";
    text.destroy();
	if (this.query.x <= 0){
		if (this.query.words.length == 0){
            this.state.general_ui_layer.visible = false;
		} else {
			this.query.y -= 1;
			this.query.x = this.query.linewidths.pop();
			this.button_back.y -= query_y_height;
			this.button_submit.y -= query_y_height;
			this.button_back.x = 
				dialogue_box_x + text_offset +
				this.query.x * global_font_size;
			this.button_submit.x =
				dialogue_box_x + text_offset + button_submit_x +
				this.query.x * global_font_size;
		}
	} else {
		this.button_back.x = 
			dialogue_box_x + text_offset +
			this.query.x * global_font_size;
		this.button_submit.x =
			dialogue_box_x + text_offset + button_submit_x +
			this.query.x * global_font_size;
	}
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
    if (next_scene.correctness >= 60){
		if (sentences[next_scene.sentence].OnCorrect){
			sentences[next_scene.sentence].OnCorrect(next_scene.correctness);
		}
		this.next_scene_timer.Stop();
        this.LoadScene(next_scene.scene, next_scene.correctness);
    } else {
		this.retries--;
		this.errorsound.play();
		this.error_timer_pos = 0;
		this.button_submit.loadTexture("backspace");
		this.currscene.LoadDialogueText(this.currscene.fall_in);
	}
}
