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
		game.add.text(110, 340, "@hbd_kevino", style);
		game.add.sprite(50, 250, "mail");
		game.add.sprite(50, 325, "twitter");
    },
    update: function(){
    },
    resize: function(){
    },
    shutdown: function(){
    }
}

