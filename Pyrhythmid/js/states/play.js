// Play state

// Variables

// initialize the timer that will keep track of the song length 
var timer;

// (Set to 64 because level song is 1:04, or 64 seconds)
var timeRemaining;

// Hourglass that appears to help player know what the number represents
var hourglass;

// Player Variables
var player = null;
var PLAYERVELOCITY = 450;

var collisionDisabled = false;

var collisionDisabledText;

var Play = function(game) {};
Play.prototype = {
	create: function() {

		// Start Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE)

		// Add background as 4 different tileSprites, these will then be moved at different speeds
		// to acheive a parallax background in the 'update' function
		game.bg4 = this.add.tileSprite(0, 0, game.width + 200, game.height, 'atlas', 'BG4');
		game.bg3 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG3');
		game.bg2 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG2');
		game.bg1 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG1');

		timeRemaining = 64;

		// Create a timer for the song length
		timer = game.time.create(false);

		// Set a TimerEvent to occur every second that will count down the time left
		timer.loop(1000, updateTime, this);

		// Start the timer
		timer.start(); //<-- enabled while inDev, might change depending on how tutorial is implemented

		// Create a group for the pellets (The projectiles fired by the snake enemies)
		this.pelletGroup = game.add.group();

		// Create a group for the fireballs (The projectiles fired by the scarab enemies)
		this.fireballGroup = game.add.group();
		
		// Create timeText (Displays the time remaining in the upper left hand corner. Is not visible until tutorial is completed)
		timeText = game.add.text(48, 30, timeRemaining, { fontSize: '24px', fill: '#FFF' });
		timeText.anchor.set(0.5);
		timeText.visible = true; //<--

		// Create hourglass sprite
		hourglass = game.add.sprite(18, 26, 'atlas', 'hourglass_f1');
		hourglass.visible = true; //<-- was false
		hourglass.anchor.set(0.5);
		hourglass.animations.add('rotate', Phaser.Animation.generateFrameNames('hourglass_f', 1, 9, '', 1), 2, true);

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

		// audio
		this.deathAudio = game.add.audio('deathAudio');
		levelMusic = game.add.audio('levelAudio'); //<--
		levelMusic.play('', 0, 1, false); //<--

		// This will make a group for the snake enemies
		this.snakeGroup = game.add.group();

		this.scarabGroup = game.add.group();

		/*
		This is the new updated way to create a Snake enemy: (If a parameter has <> around it, substitute it with the appropriate value)

		Step 1: Create a timer (Probably best to name them in order of when they appear so that you know which is which)
				this.snake<#>Timer = game.time.create(autoDestroy)
				autoDestroy is a boolean that will determine whether or not the timer will destroy itself after it completes its task. Since we're spawning one enemy, set that to true
		
		Step 2: Add an event to the timer that you just created
				This.snake<#>Timer.add(<time to spawn enemy in milliseconds>, addSnake, this, this.snakeGroup, game, <xPosition of snake>, <yPosition of snake>, <the xVelocity of the projectile being fired>, <the yVelocity of the projectile being fired>, <The interval between the pellets being fired in milliseconds>, this.pelletGroup, <the time remaining in the song of when this enemy destroys itself>);

		Step 3: Start the timer
				this.snake<#>Timer.start();
		
		*/
		this.snake3Timer = game.time.create(true);
        this.scarab1Timer = game.time.create(true);

        //phase 1 first 4 seconds

        this.snake3Timer.add(1000, addSnake, this, this.snakeGroup, game, game.width-50, game.height-100, -600, 0, 1000, this.pelletGroup, 45);

        //phase 2

        this.snake3Timer.add(5500, addSnake, this, this.snakeGroup, game, 50           , 100,              300, 200, 1000, this.pelletGroup, 45);
        this.snake3Timer.add(5500, addSnake, this, this.snakeGroup, game, game.width-50, 100,             -300, 200, 1000, this.pelletGroup, 45);
        //this.snake3Timer.add(6000, addSnake, this, this.snakeGroup, game, game.width-500, game.height-200, -300, 0, 1750, this.pelletGroup, 45);

        //phase 3

        this.snake3Timer.add(21000, addSnake, this, this.snakeGroup, game, game.width - 150, game.height - 100, -600, 0, 1000, this.pelletGroup, 30);
        this.snake3Timer.add(21000, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 100, -600, -200, 1000, this.pelletGroup, 30);
        this.snake3Timer.add(21000, addSnake, this, this.snakeGroup, game, 50, game.height - 100, 600, -200, 1000, this.pelletGroup, 30);

        //this.scarab1Timer.add(27000, addScarab, this, this.scarabGroup, game, game.width, game.height - 400, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(32000, addScarab, this, this.scarabGroup, game, game.width, game.height - 170, 300, 200, -500, this.fireballGroup);

        //phase 4

        this.scarab1Timer.add(40000, addScarab, this, this.scarabGroup, game, 0, game.height - 100, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(40000, addScarab, this, this.scarabGroup, game, 0, game.height - 400, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(40000, addScarab, this, this.scarabGroup, game, 0, game.height - 600, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(40000, addScarab, this, this.scarabGroup, game, game.width, game.height - 250, 300, 200, -500, this.fireballGroup);
        this.snake3Timer.add(40000, addSnake, this, this.snakeGroup, game, game.width - 50, 100, -300, 1000, 500, this.pelletGroup, 18);

        //phase 5 (death time)
        var miliad = 41000;
        var secssub = 41;

        this.snake3Timer.add(1250 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 100, -600, 0, 1000, this.pelletGroup, 61 - secssub);
        //this.snake3Timer.add(1500 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 120, -600, 0, 1000, this.pelletGroup, 61 - secssub);
        //this.snake3Timer.add(1750 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 140, -600, 0, 1000, this.pelletGroup, 61 - secssub);

        this.snake3Timer.add(2250 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 160, -600, 0, 1000, this.pelletGroup, 60 - secssub);
        //this.snake3Timer.add(2500 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 180, -600, 0, 1000, this.pelletGroup, 60 - secssub);
        //this.snake3Timer.add(2750 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 200, -600, 0, 1000, this.pelletGroup, 60 - secssub);

        this.snake3Timer.add(1250 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 100, 600, 0, 1000, this.pelletGroup, 61 - secssub);
        //this.snake3Timer.add(1500 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 120, 600, 0, 1000, this.pelletGroup, 61 - secssub);
        //this.snake3Timer.add(1750 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 140, 600, 0, 1000, this.pelletGroup, 61 - secssub);

        this.snake3Timer.add(2250 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 160, 600, 0, 1000, this.pelletGroup, 60 - secssub);
        //this.snake3Timer.add(2500 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 180, 600, 0, 1000, this.pelletGroup, 60 - secssub);
        //this.snake3Timer.add(2750 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 200, 600, 0, 1000, this.pelletGroup, 60 - secssub);

        this.snake3Timer.add(4750 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 160, 600, 0, 1000, this.pelletGroup, 60 - secssub);
        //this.snake3Timer.add(4500 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 180, 600, 0, 1000, this.pelletGroup, 60 - secssub);
        //this.snake3Timer.add(4250 + miliad, addSnake, this, this.snakeGroup, game, 50, game.height - 200, 600, 0, 1000, this.pelletGroup, 60 - secssub);

        this.snake3Timer.add(3250 + miliad, addSnake, this, this.snakeGroup, game, 50, 220, 600, 350, 1000, this.pelletGroup, 59 - secssub);
        //this.snake3Timer.add(3500 + miliad, addSnake, this, this.snakeGroup, game, 50, 240, 600, 350, 1000, this.pelletGroup, 59 - secssub);
        //this.snake3Timer.add(3750 + miliad, addSnake, this, this.snakeGroup, game, 50, 260, 600, 350, 1000, this.pelletGroup, 59 - secssub);

        this.snake3Timer.add(3250 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, 220, -600, 350, 1000, this.pelletGroup, 59 - secssub);
        //this.snake3Timer.add(3500 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, 240, -600, 350, 1000, this.pelletGroup, 59 - secssub);
        //this.snake3Timer.add(3750 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, 260, -600, 350, 1000, this.pelletGroup, 59 - secssub);

        this.scarab1Timer.add(3500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 300, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(3750 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 300, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(3250 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 300, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(3500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 300, 300, 200, -500, this.fireballGroup);
        this.scarab1Timer.add(4000 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 300, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(4250 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 300, -200, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(3500 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 300, -200, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(3250 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 300, -200, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(3750 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 300, -200, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(4000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 300, -200, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(4250 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 300, -200, 200, 500, this.fireballGroup);
        //WALL
        this.scarab1Timer.add(4750 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 100, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(4750 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 125, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(4750 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 700, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(4750 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 450, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(4750 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 550, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(4750 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 650, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(4750 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 250, 300, 200, -500, this.fireballGroup);

        this.scarab1Timer.add(7500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 100, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(7500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 125, 300, 200, -500, this.fireballGroup);
        this.scarab1Timer.add(7500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 700, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(7500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 450, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(7500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 550, 300, 200, -500, this.fireballGroup);
        //this.scarab1Timer.add(7500 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 650, 300, 200, -500, this.fireballGroup);
        this.scarab1Timer.add(7500 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 250, 300, 200, 500, this.fireballGroup);

        this.scarab1Timer.add(10000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 100, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(10000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 125, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(10000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 700, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(10000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 450, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(10000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 550, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(10000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 650, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(10000 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 250, 300, 200, -500, this.fireballGroup);

        this.snake3Timer.add(11250 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 100, -600, 0, 1000, this.pelletGroup, 50 - secssub);
        //this.snake3Timer.add(11500 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 120, -600, 0, 1000, this.pelletGroup, 50 - secssub);
        this.snake3Timer.add(11750 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 140, -600, 0, 1000, this.pelletGroup, 50 - secssub);

        //this.snake3Timer.add(12250 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 160, -600, 0, 1000, this.pelletGroup, 49 - secssub);
        //this.snake3Timer.add(12500 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 180, -600, 0, 1000, this.pelletGroup, 49 - secssub);
        this.snake3Timer.add(12750 + miliad, addSnake, this, this.snakeGroup, game, game.width - 50, game.height - 200, -600, 0, 1000, this.pelletGroup, 49 - secssub);

        this.scarab1Timer.add(14000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 100, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(14000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 125, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(14000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 700, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(14000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 450, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(14000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 550, 300, 200, 500, this.fireballGroup);
        //this.scarab1Timer.add(14000 + miliad, addScarab, this, this.scarabGroup, game, 0, game.height - 650, 300, 200, 500, this.fireballGroup);
        this.scarab1Timer.add(14000 + miliad, addScarab, this, this.scarabGroup, game, game.width, game.height - 250, 300, 200, -500, this.fireballGroup);


        this.snake3Timer.start();
        this.scarab1Timer.start();

		collisionDisabledText = game.add.text(game.width/2, 50,'Collision Disabled', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		collisionDisabledText.anchor.set(0.5);
		collisionDisabledText.alpha = 0;

	},
	update: function() {

		// Code for toggleable collision
		if (game.input.keyboard.justPressed(Phaser.Keyboard.C)){
			collisionDisabled = !collisionDisabled;
		}

		if(collisionDisabled == true){
			collisionDisabledText.alpha = 1;
		}else{
			collisionDisabledText.alpha = 0;
		}

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
		
		hourglass.animations.play('rotate');
		
		if(timeRemaining < 1) {
			timer.stop();
			levelMusic.fadeOut(500);
			game.time.events.add(Phaser.Timer.HALF, function() { game.state.start('Victory')});
		}

		// Note for me: Remember to add a check here that will turn off collision if necessary
		if(!this.player.destroyed && !collisionDisabled) {
			game.physics.arcade.collide(this.player, this.pelletGroup, this.playerCollision, null, this);
			game.physics.arcade.collide(this.player, this.snakeGroup, this.playerCollision, null, this);
			game.physics.arcade.collide(this.player, this.fireballGroup, this.playerCollision, null, this);
			game.physics.arcade.collide(this.player, this.scarabGroup, this.playerCollision, null, this);
		}
		
	},
	playerCollision: function(player, group) {
		levelMusic.fadeOut(500);
		this.player.destroyed = true;
		this.deathAudio.play('', 0, 1, false);
		this.player.kill();

		game.time.events.add(Phaser.Timer.SECOND * 1, function() { game.state.start('GameOver')});

	}
	
}

// Helper functions
function updateTime() {
	timeRemaining--;
	timeText.text = timeRemaining;
}

function firePellet(group, game, velX, velY, posX, posY) {
	var pellet = new Pellet(game, velX, velY, posX, posY);
	game.add.existing(pellet);
	group.add(pellet);

	this.pew = game.add.audio('pewAudio');
	this.pew.play('', 0, 0.3, false);

}

function fireFireball(group, game, velX, velY, posX, posY) {
	var fireball = new Fireball(game, velX, velY, posX, posY);
	game.add.existing(fireball);
	group.add(fireball);

	//this.pew = game.add.audio('pewAudio');
	//this.pew.play('', 0, 0.3, false);
}

function addSnake(snakeGroup, game, snakePosX, snakePosY, pelletVelX, pelletVelY, timing, pelletGroup, destroyTime){
	var snake = new Snake(game, snakePosX, snakePosY, pelletVelX, pelletVelY, timing, pelletGroup, destroyTime);
	game.add.existing(snake);
	snakeGroup.add(snake);

	// No audio for when snake materializes into existence lul
}

function addScarab(scarabGroup, game, scarabPosX, scarabPosY, fireballVelX, fireballVelY, scarabVel, fireballGroup){
	var scarab = new Scarab(game, scarabPosX, scarabPosY, fireballVelX, fireballVelY, scarabVel, fireballGroup);
	game.add.existing(scarab);
	scarabGroup.add(scarab);
}

// v These were to test some things, Don't need them anymore, but I have them in here just in case
function test() {
	console.log('test');
}

function test2() {
	console.log('test2');
}
