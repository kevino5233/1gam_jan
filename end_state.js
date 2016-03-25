var end_state = {
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
			"Thanks for playing my game! I hope you\n" +
			"enjoyed it. Please keep in mind this project\n" +
			"is still in the middle of development so\n" +
			"any suggestions or criticism is highly\n" +
			"encouraged. I need it to make better games!\n", style);
		game.add.text(110, 270, "hello@kevino-is.me", style);
		game.add.text(110, 340, "@kevino_is_me", style);
		game.add.sprite(50, 250, "mail");
		game.add.sprite(50, 325, "twitter");
		var style_2 = { font: global_font_size + "px " + global_font, fill: "green"};
		var play_again_text = game.add.text(50, 430, "Play again?", style_2);
		play_again_text.inputEnabled = true;
		play_again_text.events.onInputUp.add(
			function(item){
				game.state.start("breakfast");
			}, this);
    },
    update: function(){
    },
    resize: function(){
    },
    shutdown: function(){
    }
}

