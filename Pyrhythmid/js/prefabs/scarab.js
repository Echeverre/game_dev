// Scarab constructor

var Scarab = function(game, scarabPosX, scarabPosY, fireballVelX, fireballVelY, scarabVel, fireballGroup){
	// Make a call to Sprite to create the scarab enemy 
	Phaser.Sprite.call(this, game, scarabPosX, scarabPosY, 'atlas', 'Mob_Scarab_F1');

	// Enable physics on the snake, change the anchor, make immovable, and adjust hitbox
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.body.immovable = true;
	this.body.setSize(100, 100, 14, 14);

	// Add float animation
	this.animations.add('float', Phaser.Animation.generateFrameNames('Mob_Scarab_F', 1, 4, '', 1), 5, true);

	this.fireballGroup = fireballGroup;
	this.game = game;
	this.fireballVelX = fireballVelX;
	this.fireballVelY = fireballVelY;
	this.scarabPosX = scarabPosX;
	this.scarabPosY = scarabPosY;

	this.body.velocity.x = scarabVel;
	this.fired = false;

};

// Set the constructor
Scarab.prototype = Object.create(Phaser.Sprite.prototype);

Scarab.prototype.constructor = Scarab;

// Play the float animation in the Snake's own update function
Scarab.prototype.update = function() {
	this.animations.play('float');

	if(this.x < this.width && !this.fired){
		fireFireball(this.fireballGroup, this.game, this.fireballVelX, this.fireballVelY, this.x + this.width, this.y);
		fireFireball(this.fireballGroup, this.game, this.fireballVelX, -this.fireballVelY, this.x + this.width, this.y);

		this.fired = true;
	}

	if(this.x < -this.width){
		this.kill();
	}
}