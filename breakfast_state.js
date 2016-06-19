var breakfast_state = {
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        InitializeLayers(this);
        game.stage.backgroundColor = "#ff5c33";
        document.body.style.background ="#ff5c33"
        document.getElementById("twitter-link").style.color = "black";
        document.getElementById("twitter-img").src = "assets/icons/black_tw_ico.png";
		// this will be pre-defined per level state
        this.manager = new SceneManager(
                this,
                breakfast_scene,
                "office");
    },
    update: function(){
        this.manager.Update();
    },
    resize: function(){
    },
    shutdown: function(){
        DestroyLayers(this);
    }
}
