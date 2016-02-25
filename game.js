// See wikipedia entry for Comparison Sort
// Wait am I using this lmao. This looks useful though
var minimum_sort = [0, 1, 3, 5, 7, 10, 13, 16, 19, 22, 26, 30, 34, 38, 42];
//font config stuff
var global_font = "press_start_2pregular";
var global_font_size = 15;
// dialogue box dimensions
var dialogue_box_w = 600;
var dialogue_box_h = 100;
var dialogue_text_w = 30;
// location of dialogue boxes
var dialogue_box_x = 100;
var dialogue_box_1_y = 25;
var dialogue_box_2_y = 475;
// In context of dialogue box dimensions
var text_offset = 20;
var query_text_w = 30;
var query_y_height = 25;
var button_y = 490;
var button_submit_x = 40;

function RandomInt(min, max) {
	return Math.floor(RandomFloat(min, max));
}
function RandomFloat(min, max) {
	return Math.random() * (max - min + 1) + min
}
function InitializeLayers(state){
    // Create layers
    // Design protocol for background. Probably not very complicated.
    // state.background = game.add.group();
    state.floating_text_layer = game.add.group();
    state.dialogue_ui_layer = game.add.group();
    state.dialogue_text_layer = game.add.group();
    state.general_ui_layer = game.add.group();
}

function DestroyLayers(state){
    // Create layers
    // Design protocol for background. Probably not very complicated.
    // state.background.destroy(true);
    state.floating_text_layer.destroy(true);
    state.dialogue_ui_layer.destroy(true);
    state.dialogue_text_layer.destroy(true);
    state.general_ui_layer.destroy(true);
}

// Global variable for player anxiety
var anxiety = 60;
// Timer for submitting query. 10 seconds for now.
var timer = 10000;

// Other global variables for certain events.
// For example checking whether you accepted
// an invitation to a party.
var event_happened = false; //example

var tau = Math.PI / 2;
var circle = Math.PI * 2;
var G = 4;
var game_w = 800;
var game_h = 600;

var game = new Phaser.Game(game_w, game_h, Phaser.AUTO, "Phaser-Game");

game.state.add("boot", boot_state);
game.state.add("load", load_state);
game.state.add("intro", intro_state);
game.state.add("breakfast", breakfast_state);
game.state.add("office", office_state);
game.state.add("end", end_state);

game.state.start("boot");
