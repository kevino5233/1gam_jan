var office_state = {
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        game.stage.backgroundColor = "#3385ff";
        InitializeLayers(this);
        this.manager = new SceneManager(
                this,
				office_scene,
				"Tim",
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
