// Enemy Prefab

// Create Enemy constuctor
var Enemy = function(game, speed){
	// Call Sprite constructor within this object
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.width + 64,game.height-64, 'enemy');
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.body.immovable = true;
	this.body.velocity.x = speed;
	this.newEnemy = true;
};

// Inherit prototype from Phaser.Sprite and set constructor to enemy
// The Object.create method creates a new object w/ the specified prototype object and properties
Enemy.prototype = Object.create(Phaser.Sprite.prototype);

// Since we used Object.create we need to explicitly set the constructor
Enemy.prototype.constructor = Enemy;

// Override the Phaser.Sprite update function
Enemy.prototype.update = function() {
	if(this.newEnemy && this.x < game.width/1.4) {
		this.newEnemy = false;
		Play.prototype.addEnemy(this.parent);
		//this.tink.play('', 0, 1, false);
	}
	// Kill the enemy if it reaches the left edge of the screen
	if(this.x < -this.width) {
		this.kill();
	}
}