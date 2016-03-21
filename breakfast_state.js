var breakfast_state = {
    ellipse_center_x: 300,
    ellipse_center_y: 300,
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
                this.ellipse_center_x,
                this.ellipse_center_y,
				"Roommate",
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
