var intro_state = {
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        game.stage.backgroundColor = "#EB99FF";
		var style = { font: global_font_size + "px " + global_font};
		game.add.text(50, 100,
			"In this game, you talk by clicking on\n" +
			"individual words that float around in\n" +
			"the middle of the screen to make sentences.", style);
		game.add.text(100, 200,
			"If you add a word you didn't mean to, simply\n" +
			"click the delete button.", style);
		game.add.text(100, 250, 
			"When you're ready to speak,\nhit the submit button.", style);
		game.add.text(50, 350,
			"Click anywhere to start.", style);
		game.add.sprite(50, 200, "backspace");
		game.add.sprite(50, 250, "submit");
		//game.add.audio("gnossiene_2", 1, true).play();
    },
    update: function(){
		if (game.input.activePointer.justPressed()){
			game.state.start("breakfast");
		}
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
