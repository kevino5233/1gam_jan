// Time is in seconds
Timer = function(state, time, callback, context) {
	this.state = state;
    this.time = time;
    this.timer_sprites = [];

    for (var i = 0; i < time; i++){
        var timer_sprite = game.add.sprite(
            timer_icon_x + timer_icon_w * i,
            timer_icon_y,
            "timer_ico");
        this.state.dialogue_ui_layer.add(timer_sprite);
        this.timer_sprites.push(timer_sprite);
    }

	this.callback = callback;
	this.context = context;
    
	this.finished = false;
	this.timed_callback = game.time.events.add(Phaser.Timer.SECOND, this.PopImage, this);
}

Timer.prototype.constructor = Timer;

Timer.prototype.PopImage = function(){
    var timer_sprite = this.timer_sprites.pop();
    timer_sprite.destroy();
    if (this.timer_sprites.length > 0){
    	this.timed_callback = game.time.events.add(Phaser.Timer.SECOND, this.PopImage, this);
    } else {
		this.finished = true;
		this.timed_callback = null;
		this.callback.call(this.context);
	}
}

Timer.prototype.Reset = function(){
	if (this.timed_callback){
		game.time.events.remove(this.timed_callback);
	}
	if (this.user_callback){
		game.time.events.remove(this.user_callback);
	}
	while (this.timer_sprites.length < this.time){
        var timer_sprite = game.add.sprite(
            timer_icon_x + timer_icon_w * (this.timer_sprites.length),
            timer_icon_y,
            "timer_ico");
        this.state.dialogue_ui_layer.add(timer_sprite);
        this.timer_sprites.push(timer_sprite);
	}
	this.finished = false;
	this.timed_callback = game.time.events.add(Phaser.Timer.SECOND, this.PopImage, this);
}

Timer.prototype.Stop = function(){
	if (this.finished) return;
	this.finished = true;
	if (this.timed_callback)
		game.time.events.remove(this.timed_callback);
	while (this.timer_sprites.length > 0){
		var timer_sprite = this.timer_sprites.pop();
		timer_sprite.destroy();
	}
}
