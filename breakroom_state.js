var breakroom_state = {
    color_light: "#ffeae5",
    color_medium: "#ff6944",
    color_heavy: "rgba(204, 41, 0, 1.0)",
    color_contrast: "#2a6199",
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        InitializeLayers(this);
		// this will be pre-defined per level state
        document.body.style.background = "#EB99FF";
        game.stage.backgroundColor = "#EB99FF";
        this.manager = new SceneManager(
                this,
                breakroom_scene,
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
