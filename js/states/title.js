// Title state

var Title = function(game) {};
Title.prototype = {
	create: function() {
		// Add title screen text
		//var titleText = game.add.text(game.width/2, game.height/2, 'Pyrhythmid', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		//titleText.anchor.set(0.5);

		//var playText = game.add.text(game.width/2, game.height*0.8, 'Press SPACEBAR to start\n ARROW keys to move', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		//playText.anchor.set(0.5)
		//game.bg4 = this.add.tileSprite(0, 0, game.width + 200, game.height, 'atlas', 'BG4');
		//game.bg3 = this.add.tileSprite(0, 0, this.game.cache.getImage('bg3').width, game.height, 'bg3');
		//game.bg3 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG3');
		//game.bg2 = this.add.tileSprite(0, 0, this.game.cache.getImage('bg2').width, game.height, 'bg2');
		//game.bg2 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG2');
		//game.bg1 = this.add.tileSprite(0, 0, this.game.cache.getImage('bg1').width, game.height, 'bg1');
		//game.bg1 = this.add.tileSprite(0, 0, 3000, game.height, 'atlas', 'BG1');
		game.bg = this.add.tileSprite(0, 0, 1600, game.height, 'titleimg');

		button = game.add.sprite(game.width/2, game.height*2/3, 'startatlas', 'start_button_F1');
		button.anchor.set(0.5);

		button.inputEnabled = true;

		game.input.mouse.capture = true;

		//game.input.addMoveCallback(p, this);

		button.animations.add('flicker', Phaser.Animation.generateFrameNames('start_button_F', 1, 2, '', 1), 5, true);
		button.animations.add('stop', Phaser.Animation.generateFrameNames('start_button_F', 1, 1, '', 1), 5, false);

		menuMusic = game.add.audio('menuAudio');
		menuMusic.play('', 0, 1, false);
	},
	
	update: function() {

		//game.bg3.tilePosition.x -= 0.5;
		//game.bg2.tilePosition.x -= 1;
		//game.bg1.tilePosition.x -= 2;
		if(button.input.pointerOver()) {
			button.animations.play('flicker');
		} else {
			button.animations.play('stop');
		}


		// Check for input
		if(game.input.activePointer.leftButton.isDown && button.input.pointerOver()) {
			click = game.add.audio('clickAudio');
			click.play('', 0, 1, false);
			menuMusic.pause();
			game.state.start('Play');
		}
	}
};