var load_state = {
    preload: function(){
        //load any assets
        game.load.image("submit", "assets/icons/submit.png");
        game.load.image("backspace", "assets/icons/backspace.png");
        game.load.image("dialogue_box", "assets/icons/dialogue_box.png");
        game.load.image("mail", "assets/icons/mail_ico.png");
        game.load.image("twitter", "assets/icons/tw_ico.png");
		game.load.audio("gnossiene_2", "assets/music/gnossiene_2.mp3");
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        game.state.start("intro");
    },
    update: function(){
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
