// Snake constructor

var Snake = function(game, snakePosX, snakePosY, pelletVelX, pelletVelY, timing, pelletGroup, destroyTime){
	// Make a call to Sprite to create the snake enemy 
	Phaser.Sprite.call(this, game, snakePosX, snakePosY, 'atlas', 'Mob_Snake_F1');

	// Enable physics on the snake, change the anchor, make immovable, and adjust hitbox
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.body.immovable = true;
	this.body.setSize(90, 128, 18, 0);

	// Add float animation
	this.animations.add('float', Phaser.Animation.generateFrameNames('Mob_Snake_F', 1, 4, '', 1), 5, true);

	// This timer will fire a Pellet with the parameters specified when creating the Snake 
	this.pelletTimer = game.time.create(false);
	this.pelletTimer.loop(timing, firePellet, this, pelletGroup, game, pelletVelX, pelletVelY, snakePosX, snakePosY);
	this.pelletTimer.start();
	this.destroyTime = destroyTime;

};

// Set the constructor
Snake.prototype = Object.create(Phaser.Sprite.prototype);

Snake.prototype.constructor = Snake;

// Play the float animation in the Snake's own update function
Snake.prototype.update = function() {
	this.animations.play('float');

	if(timeRemaining == this.destroyTime) {
		this.destroy();
		this.pelletTimer.stop();
	}
}
