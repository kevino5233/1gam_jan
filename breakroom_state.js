var breakroom_state = {
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        InitializeLayers(this);
		// this will be pre-defined per level state
        game.stage.backgroundColor = "#EB99FF";
        this.manager = new SceneManager(
                this,
                breakroom_scene,
				"Jeff",
                "end");
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
