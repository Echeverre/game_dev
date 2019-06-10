// Tutorial state

var Tutorial = function(game) {};
Tutorial.prototype = {
	create: function() {
		// Start Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE)

		// Add background as 4 different tileSprites, these will then be moved at different speeds
		// to acheive a parallax background in the 'update' function
		game.bg4 = this.add.tileSprite(0, 0, game.width + 200, game.height, 'atlas', 'BG4');
		game.bg3 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG3');
		game.bg2 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG2');
		game.bg1 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG1');

		// Set up ground\
		this.ground = game.add.group();
		for(let i = 0; i < game.width; i += 16) {
			var groundTile = game.add.sprite(i, game.height - 16, 'atlas', 'sandtile');
			game.physics.enable(groundTile, Phaser.Physics.ARCADE);
			groundTile.body.immovable = true;
			groundTile.body.allowGravity = false;
			this.ground.add(groundTile);
		}

		// Player, player physics, and player animations
		this.player = game.add.sprite(32, game.height/2, 'atlas', 'Player_Sprite_Idle_F1');
		this.player.anchor.set(0.5);
		this.player.destroyed = false;

		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.setSize(40, 100, 40, 20);
		this.player.body.maxVelocity.set(1000); //1500
		this.player.body.drag.set(800); //500
		this.player.body.collideWorldBounds = true;
		this.player.body.allowGravity = false; //2600

		this.player.animations.add('slow', Phaser.Animation.generateFrameNames('Player_Sprite_Idle_F', 1, 4, '', 1), 8, true);
		this.player.animations.add('walk', Phaser.Animation.generateFrameNames('Player_Sprite_Idle_F', 1, 4, '', 1), 9, true);
		this.player.animations.add('sprint', Phaser.Animation.generateFrameNames('Player_Sprite_Idle_F', 1, 4, '', 1), 10, true);

		this.jumping = false;
		this.jumps = 0;
		

		var tutorialText = game.add.text(game.width/2, game.height/3, 'Use the Arrow keys to jump and move around\n You can also double jump\n Try to avoid enemies and projectiles', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		tutorialText.anchor.set(0.5);

		var instructionText = game.add.text(game.width/2, game.height/3*2, 'Press SPACEBAR to begin', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		instructionText.anchor.set(0.5);

		var toggleText = game.add.text(game.width/2, game.height*99/100, 'Press C while playing to toggle Collision', {font: 'Helvetica', fontSize: '12px', fill: '#fff'});
		toggleText.anchor.set(0.5);

		
	},
	update: function() {
		// Update tileSprite background
		game.bg3.tilePosition.x -= 0.5;
		game.bg2.tilePosition.x -= 1;
		game.bg1.tilePosition.x -= 2;

		// Player stuff

		// Check collisions
		this.game.physics.arcade.collide(this.player, this.ground);
		
		this.player.body.velocity.x = 10;
		
		// Check if player is touching the ground;
		var onTheGround = this.player.body.touching.down;

        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.player.body.velocity.x += PLAYERVELOCITY;
            this.player.animations.play('sprint');
        } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.player.body.velocity.x -= PLAYERVELOCITY;
            this.player.animations.play('slow');
        } else {
            this.player.animations.play('walk');
        }

        if (onTheGround) {
            this.jumps = 2;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.jumps > 0 && this.jumping == false) {
            this.player.body.velocity.y = -800;
            this.jumping = true;
            this.jumps--;
        }

        //neutral fall
        else if (!game.input.keyboard.isDown(Phaser.Keyboard.UP) && !game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            if (this.player.body.velocity.y < 500)
                this.player.body.velocity.y += 50; //150
            this.jumping = false;
        }

        //fast fall
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            if (this.player.body.velocity.y < 760)
                this.player.body.velocity.y += 80;
        }

        //slow fall
        else {
            if (this.player.body.velocity.y >= 0)
                this.player.body.velocity.y = 230;
        }

		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.time.events.add(Phaser.Timer.SECOND * 1, function() { game.state.start('Play')});
		}
	}
};