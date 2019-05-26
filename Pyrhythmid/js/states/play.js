// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		// Add background as tileSprite
		//game.background = this.add.tileSprite(0,0, game.width, game.height, 'background');

		//game.bg4 = this.add.tileSprite(0, 0, game.width +200, game.height, 'bg4');
		game.bg4 = this.add.tileSprite(0, 0, game.width + 200, game.height, 'atlas' 'BG4');
		//game.bg3 = this.add.tileSprite(0, 0, this.game.cache.getImage('bg3').width, game.height, 'bg3');
		game.bg3 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG3');
		//game.bg2 = this.add.tileSprite(0, 0, this.game.cache.getImage('bg2').width, game.height, 'bg2');
		game.bg2 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG2');
		//game.bg1 = this.add.tileSprite(0, 0, this.game.cache.getImage('bg1').width, game.height, 'bg1');
		game.bg1 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG1');

		score = 0;
		enemySpeed = -600;

		// Set up world physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		//game.physics.arcade.gravity.y = 2600;
		
		// Add audio
		//this.tink = game.add.audio('tink');
		this.thump = game.add.audio('thump');

		// Add player
		this.player = game.add.sprite(32, game.height/2, 'atlas', 'Player_Sprite_Idle_F1');
		this.player.anchor.set(0.5);
		this.player.destroyed = false;

		

		// Player physics
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.maxVelocity.set(1500);
		this.player.body.drag.set(500);
		this.player.body.collideWorldBounds = true;
		this.player.body.gravity.y = 2600;
		//this.player.body.immovable = true;

		// Set up player animations
		//this.player.animations.add('walk', [0, 1, 2, 3], 9, true);
		this.player.animations.add('walk', Phaser.Animation.generateFrameNames('Player_Sprite_Idle_F', 1, 4, '', 1), 9, true);
		//this.player.animations.add('sprint', [0, 1, 2, 3], 10, true);
		this.player.animations.add('sprint', Phaser.Animation.generateFrameNames('Player_Sprite_Idle_F', 1, 4, '', 1), 10, true);
		//this.player.animations.add('slow', [0, 1, 2, 3], 8, true);
		this.player.animations.add('slow', Phaser.Animation.generateFrameNames('Player_Sprite_Idle_F', 1, 4, '', 1), 8, true);

		// Set up enemy group
		this.enemyGroup = game.add.group()
		this.addEnemy(this.enemyGroup);

		// Set up ground
		this.ground = game.add.group();
		for(let i = 0; i < game.width; i += 16) {
			//var groundTile = game.add.sprite(i, game.height - 16, 'sandtile');
			var groundTile = game.add.sprite(i, game.height - 16, 'atlas', 'sandtile');
			game.physics.enable(groundTile, Phaser.Physics.ARCADE);
			groundTile.body.immovable = true;
			groundTile.body.allowGravity = false;
			this.ground.add(groundTile);
		}

		// Create our timer
		//timer = game.time.create(false);

		// Set a TimerEvent to occur every 1 seconds
		//game.time.events.loop(1000, Play.updateScore, this);

		// Start the timer
		//timer.start();

		// Add enemysprite
		//this.enemy = game.add.sprite(game.width-128, game.height-64,'enemy_atlas', 'Mob_Snake_F1');
		this.enemy = game.add.sprite(game.width-128, game.height-64,'atlas', 'Mob_Snake_F1');
		this.enemy.anchor.set(0.5);
		// Set up enemy animations
		//this.enemy.animations.add('float', [0,1,2,3], 5, true);
		this.enemy.animations.add('float', Phaser.Animation.generateFrameNames('Mob_Snake_F', 1, 4, '', 1), 5, true);
	},
	update: function(){
		score++;
		
		// Check collisions
		this.game.physics.arcade.collide(this.player, this.ground);

		// Update tileSprite background
		//game.background.tilePosition.x -= 4;
		game.bg3.tilePosition.x -= 0.5;
		game.bg2.tilePosition.x -= 1;
		game.bg1.tilePosition.x -= 2;

		// update groundTile position to acheive parallax (need to figure out a way to destroy them once they go off screen and to spawn them off-screen)
		//this.ground.x -= 4;

		// Player walk
		//this.player.animations.play('walk');
		this.player.body.velocity.x = 0;

		// Enemy float
		this.enemy.animations.play('float');

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

		if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.touching.down) {
			this.player.body.velocity.y = -1500;
		}

		if(!this.player.destroyed) {
			game.physics.arcade.collide(this.player, this.enemyGroup, this.playerCollision, null, this);
		}

		if(score >= 2000) {
			game.state.start('Victory');
		}


	},
	addEnemy: function(group) {
		// Construct new enemy object, add it to the game world, and add it to the group
		var enemy = new Enemy(game, enemySpeed);
		game.add.existing(enemy);
		group.add(enemy); 
		//this.tink = game.add.audio('tink');
		//this.tink.play('', 0, 1, false);
		this.pew = game.add.audio('pew');
		this.pew.play('', 0, 1, false);
	},
	playerCollision: function(player, group) {
		this.player.destroyed = true;

		this.thump.play('', 0, 1, false);

		this.player.kill();

		game.state.start('GameOver');
	}
	//updateScore: function(){
		//score++;
	//}
	
};