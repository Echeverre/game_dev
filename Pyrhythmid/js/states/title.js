// Title state

var Title = function(game) {};
Title.prototype = {
	create: function() {
		game.bg = this.add.tileSprite(0, 0, 1600, game.height,'atlas', 'titleimg');

		button = game.add.sprite(game.width/2, game.height*2/3, 'atlas', 'start_button_F1');
		button.anchor.set(0.5);

		button.inputEnabled = true;

		game.input.mouse.capture = true;

		button.animations.add('flicker', Phaser.Animation.generateFrameNames('start_button_F', 1, 2, '', 1), 5, true);
		button.animations.add('stop', Phaser.Animation.generateFrameNames('start_button_F', 1, 1, '', 1), 5, false);

		menuMusic = game.add.audio('menuAudio');
		menuMusic.play('', 0, 1, false);
	},
	
	update: function() {

		if(button.input.pointerOver()) {
			button.animations.play('flicker');
		} else {
			button.animations.play('stop');
		}


		// Check for input
		if((game.input.activePointer.leftButton.isDown && button.input.pointerOver()) /*|| game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)*/) {
			menuMusic.fadeOut(500);
			game.time.events.add(Phaser.Timer.SECOND * 1, function() { game.state.start('Tutorial')});
		}
	}
};