var office_state = {
    ellipse_center_x: 400,
    ellipse_center_y: 300,
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
                this.ellipse_center_x,
                this.ellipse_center_y,
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
