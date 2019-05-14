// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		// Add background as tileSprite
		game.background = this.add.tileSprite(0,0, game.width, game.height, 'background');

		// Set up world physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.gravity.y = 2600;
		
		// Add audio
		this.tink = game.add.audio('tink');
		this.thump = game.add.audio('thump');

		// Add player
		this.player = game.add.sprite(32, game.height/2, 'atlas', 'idle');
		this.player.anchor.set(0.5);
		this.player.destroyed = false;

		// Player physics
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.maxVelocity.set(400);
		this.player.body.drag.set(500);
		this.player.body.collideWorldBounds = true;
		//this.player.body.immovable = true;

		// Set up player animations
		this.player.animations.add('walk', [0, 1, 2], 10, true);
		this.player.animations.add('sprint', [0, 1, 2], 20, true);
		this.player.animations.add('slow', [0, 1, 2], 5, true);

		// Set up ground
		this.ground = game.add.group();
		for(let i = 0; i < game.width; i += 64) {
			var groundTile = game.add.sprite(i, game.height - 64, 'sandtile');
			game.physics.enable(groundTile, Phaser.Physics.ARCADE);
			groundTile.body.immovable = true;
			groundTile.body.allowGravity = false;
			this.ground.add(groundTile);
		}
	},
	update: function(){
		// Check collisions
		this.game.physics.arcade.collide(this.player, this.ground);

		// Update tileSprite background
		game.background.tilePosition.x -= 4;

		// Player walk
		//this.player.animations.play('walk');
		this.player.body.velocity.x = 0;

		if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.player.body.velocity.x += PLAYERVELOCITY;
			this.player.animations.play('sprint');
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.player.body.velocity.x -= PLAYERVELOCITY;
			this.player.animations.play('slow');
		}
		else {
			this.player.animations.play('walk');
		}


	}
};