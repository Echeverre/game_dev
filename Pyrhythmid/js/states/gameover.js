// GameOver state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		var scoreText = game.add.text(game.width/2, game.height/2,'Score: ' + score, {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		scoreText.anchor.set(0.5);

		var replayText = game.add.text(game.width/2, game.height*0.8, 'Press SPACEBAR to restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		replayText.anchor.set(0.5);
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};