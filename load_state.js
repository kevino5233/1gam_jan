var load_state = {
    preload: function(){
        //load any assets
        game.load.script("webfont",
            "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        game.state.start("office");
    },
    update: function(){
    },
    resize: function(){
    },
    shutdown: function(){
    }
}
