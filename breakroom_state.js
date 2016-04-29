var breakroom_state = {
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        InitializeLayers(this);
        game.stage.backgroundColor = "#ffff80";
		// this will be pre-defined per level state
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
