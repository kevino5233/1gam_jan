var load_state = {
    preload: function(){
        //load any assets
        game.load.image("submit", "assets/icons/submit.png");
        game.load.image("backspace", "assets/icons/backspace.png");
        game.load.image("dialogue_box", "assets/icons/dialogue_box.png");
        game.load.image("mail", "assets/icons/mail_ico.png");
        game.load.image("twitter", "assets/icons/tw_ico.png");
		game.load.audio("gnossiene_2", "assets/music/gnossiene_2.mp3");
		game.load.audio("speech", "assets/SFX/speech.wav");
		game.load.audio("error", "assets/SFX/error.wav");
		game.load.audio("pushpop", "assets/SFX/push_pop_text.wav");
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
		this.sounds = [];
		this.sounds.push(game.add.audio("gnossiene_2"));
		this.sounds.push(game.add.audio("speech"));
		this.sounds.push(game.add.audio("error"));
		this.sounds.push(game.add.audio("pushpop"));
        game.stage.backgroundColor = "#EB99FF";
		var style = { font: global_font_size + "px " + global_font};
		game.add.text(100, 200, "Loading...", style);
    },
    update: function(){
		var i = 0;
		while (i < this.sounds.length){
			if (this.sounds[i].isDecoding){
				break;
			}
			i++;
		}
		if (i == this.sounds.length){
			game.state.start("intro");
		}
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
