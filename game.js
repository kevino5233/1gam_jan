// Global variables
// Make dynamic eventually
var game_w = 800;
var game_h = 600;
var game_fps = 60;
// Math
var tau = Math.PI / 2;
var circle = Math.PI * 2;
var G = 4;
// See wikipedia entry for Comparison Sort
// Wait am I using this lmao. This looks useful though
var minimum_sort = [0, 1, 3, 5, 7, 10, 13, 16, 19, 22, 26, 30, 34, 38, 42];
//font config stuff
var global_font = "press_start_2pregular";
var global_font_size = 15;
// Timer lengths 
var normal_timer_len = 15;
var pressure_timer_length = 10;
var backup_dialogue_time = 5;
// Timer positions
var timer_icon_x = 100;
var timer_icon_y = 415;
var timer_icon_w = 30;
var timer_icon_h = 30;
// dialogue box dimensions
var dialogue_box_w = 600;
var dialogue_box_h = 125;
var dialogue_text_w = 30;
// location of dialogue boxes
var dialogue_box_x = 100;
var dialogue_box_1_y = 25;
var dialogue_box_2_y = 450;
// In context of dialogue box dimensions
var text_offset = 20;
var query_text_w = 30;
var query_y_height = 25;
var button_y = 385;
var submit_button_x = 180;
var backspace_button_x = 140;
var clear_button_x = 100;
// Start the game!
function StartGame(){
	if(click_to_play){
		document.body.onmousedown = null;
		click_to_play = null;
		console.log("start game yay!");
		game.state.start("breakfast");
	}
}
// Functions for getting random numbers
function RandomInt(min, max) {
    // DOn't call another function. reduces function overhead.
	return Math.floor(Math.random() * (max - min + 1) + min);
}
function RandomFloat(min, max) {
	return Math.random() * (max - min + 1) + min
}
// Create layers
// Design protocol for background. Probably not very complicated.
// state.background = game.add.group();
function InitializeLayers(state){
    state.floating_text_layer = game.add.group();
    state.dialogue_ui_layer = game.add.group();
    state.dialogue_text_layer = game.add.group();
    state.general_ui_layer = game.add.group();
}
// Destroys layers. I think this increases memory performance.
// idk its fucking javascript
function DestroyLayers(state){
    state.floating_text_layer.destroy(true);
    state.dialogue_ui_layer.destroy(true);
    state.dialogue_text_layer.destroy(true);
    state.general_ui_layer.destroy(true);
}
// Global variable for player anxiety
var anxiety = 60;
// Other global variables for certain events.
// For example checking whether you accepted
// an invitation to a party.
// TODO ACTUALLY ADD THESE
var click_to_play = false;
var event_happened = false; //example

var game = new Phaser.Game(game_w, game_h, Phaser.AUTO, "Phaser-Game");

game.state.add("boot", boot_state);
game.state.add("test", test_state);
game.state.add("load", load_state);
game.state.add("intro", intro_state);
game.state.add("breakfast", breakfast_state);
game.state.add("office", office_state);
game.state.add("breakroom", breakroom_state);
game.state.add("end", end_state);

game.state.start("boot");
