// Time is in seconds
Timer = function(state, time, callback, context) {
    this.timer_sprites = [];
    this.time = time;

    for (var i = 0; i < time; i++){
        var timer_sprite = game.add.sprite(
            timer_icon_x + timer_icon_w * i,
            timer_icon_y,
            "timer_ico");
        state.dialogue_ui_layer.add(timer_sprite);
        this.timer_sprites.push(timer_sprite);
    }
    
    game.time.events.add(Phaser.Timer.SECOND, this.PopImage, this);
    game.time.events.add(Phaser.Timer.SECOND * time, callback, context);
}

Timer.prototype.constructor = Timer;

Timer.prototype.PopImage = function(){
    var timer_sprite = this.timer_sprites.pop();
    timer_sprite.destroy();
    if (this.timer_sprites.length > 0){
        game.time.events.add(Phaser.Timer.SECOND, this.PopImage, this);
    }
}
