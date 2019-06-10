// Pellet constructor

var Pellet = function(game, velX, velY, posX, posY) {
	Phaser.Sprite.call(this, game, posX, posY, 'atlas', 'Projectile_Snake1');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.body.immovable = true;

	this.body.velocity.x = velX;
	this.body.velocity.y = velY;

	// Add Pellet animation
	this.animations.add('pellet', Phaser.Animation.generateFrameNames('Projectile_Snake', 1, 4, '', 1), 5, true);
	 
};

Pellet.prototype = Object.create(Phaser.Sprite.prototype);

Pellet.prototype.constructor = Pellet;

Pellet.prototype.update = function() {
	this.animations.play('pellet');
	if(this.x < -this.width) {
		this.kill();
	}
}