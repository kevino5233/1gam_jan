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

function EvaluateSentence(query, sentence, CUP, EUP) {
    // count crucial words
    // determine order
    // count non crucial words
    // determine order
    // count articles
    // count random words in between CW
    // count random words outside CW
}

function EvaluateQuery(key) {
	var state = key.state;
    var CUP = state.CUP;
    var EUP = state.EUP;
	var sentences = state.sentences;
    var query = [];
	for (var i = 0; i < state.query.words.length; i++){
        query.push(state.query.words[i].text);
    }
    for (var i = 0; i < sentences.length; i++){
        console.log(EvaluateSentence(query, sentences[i], CUP, EUP));
    }
}

var game_w = 800;
var game_h = 600;

var game = new Phaser.Game(game_w, game_h, Phaser.AUTO);

game.state.add("boot", boot_state);
game.state.add("load", load_state);
game.state.add("test", test_state);

game.state.start("boot");
