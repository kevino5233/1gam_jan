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

var tau = Math.PI / 2;
var circle = Math.PI * 2;
var G = 4;
var game_w = 800;
var game_h = 600;

var game = new Phaser.Game(game_w, game_h, Phaser.AUTO);

game.state.add("boot", boot_state);
game.state.add("load", load_state);
game.state.add("test", test_state);

game.state.start("boot");
