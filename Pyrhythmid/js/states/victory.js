// Victory state

var Victory = function(game) {};
Victory.prototype = {
	create: function() {
		var victoryText = game.add.text(game.width/2, game.height/2,'You survived the onslaught!', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		victoryText.anchor.set(0.5);

		var replayGameText = game.add.text(game.width/2, game.height*0.8, 'Press SPACEBAR to restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		replayGameText.anchor.set(0.5);
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};