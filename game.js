// See wikipedia entry for Comparison Sort
var minimum_sort = [0, 1, 3, 5, 7, 10, 13, 16, 19, 22, 26, 30, 34, 38, 42];

WebFontConfig = {
    activate: function() {
        game.time.events.add(Phaser.Timer.SECOND, createText, this);
    },
    google: {
        families: ['Press Start 2P']
    }
};

function RandomInt(min, max) {
	return Math.floor(RandomFloat(min, max));
}

function RandomFloat(min, max) {
	return Math.random() * (max - min + 1) + min
}

function PopWordFromQuery(text) {
	var state = text.state;
	var text = state.query.words.pop();
	state.query.len -= text.text.length + 1;
	text.destroy();
}

function PushWordOnQuery(state, word) {
	var text = game.add.text(
		100 + state.query.len * state.query.wordsize,
		500,
		word);
	text.state = state;
	text.font = "Press Start 2P";
	text.fontSize = state.query.wordsize;
	text.inputEnabled = true;
	text.events.onInputDown.add(function(text){ text.fill = "#FF0000"; }, this);
	text.events.onInputUp.add(PopWordFromQuery, this);
	state.query.words.push(text);
	state.query.len += word.length + 1;
}

function MouseOverTextDown(item) {
	item.fill = "#FF0000";
	PushWordOnQuery(item.state, item.text);
}

function MouseOverTextUp(item) {
	item.fill = "#000000";
}

function EvaluateSentence(query, sentence) {
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

function EvaluateQuery(key) {
	var state = key.state;
	var sentences = state.sentences;
    var query = [];
	for (var i = 0; i < state.query.words.length; i++){
        query.push(state.query.words[i].text);
    }
    for (var i = 0; i < sentences.length; i++){
		console.log(sentences[i].words);
        console.log(EvaluateSentence(query, sentences[i]));
    }
}

var game_w = 800;
var game_h = 600;

var game = new Phaser.Game(game_w, game_h, Phaser.AUTO);

game.state.add("boot", boot_state);
game.state.add("load", load_state);
game.state.add("test", test_state);

game.state.start("boot");
