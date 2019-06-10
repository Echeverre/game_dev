// Fireball constructor

var Fireball = function(game, velX, velY, posX, posY) {
	Phaser.Sprite.call(this, game, posX, posY, 'atlas', 'Projectile_Scarab1');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.body.immovable = true;
	this.angle += 180;

	this.body.velocity.x = velX;
	this.body.velocity.y = velY;

	// Add Fireball animation
	this.animations.add('fireball', Phaser.Animation.generateFrameNames('Projectile_Scarab', 1, 4, '', 1), 5, true);
	 
};

Fireball.prototype = Object.create(Phaser.Sprite.prototype);

Fireball.prototype.constructor = Fireball;

Fireball.prototype.update = function() {
	this.animations.play('fireball');
	if(this.x < -this.width || this.x > game.width + this.width || this.y < -this.height || this.y > game.height + this.height) {
		this.kill();
	}
}