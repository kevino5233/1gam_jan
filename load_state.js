var load_state = {
    preload: function(){
        //load any assets
        game.load.image("submit", "icons/submit.png");
        game.load.image("backspace", "icons/backspace.png");
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        game.state.start("test");
    },
    update: function(){
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
