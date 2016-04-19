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
		// this will be pre-defined per level state
        this.manager = new SceneManager(
                this,
                breakfast_scene,
				"Kevin",
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
