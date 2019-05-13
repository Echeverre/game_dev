// Title state

var Title = function(game) {};
Title.prototype = {
	create: function() {
		// Add title screen text
		var titleText = game.add.text(game.width/2, game.height/2, 'Pyrhythmid', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*0.8, 'Press SPACEBAR to start\n ARROW keys to move', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set
	},
	update: function() {
		// Check for SPACEBAR input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};