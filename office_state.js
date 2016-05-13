var office_state = {
    preload: function(){
    },
    loadUpdate: function(){
    },
    loadRender: function(){
    },
    create: function(){
        InitializeLayers(this);
        game.stage.backgroundColor = "#3385ff";
        document.body.style.background = "#3385ff";
        this.manager = new SceneManager(
                this,
				office_scene,
                "breakroom");
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
