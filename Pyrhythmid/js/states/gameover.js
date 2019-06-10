// Gameover state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		var gameoverText = game.add.sprite(game.width/2, game.height/3, 'Game_Over');
		gameoverText.anchor.set(0.5);

		var instructionText = game.add.text(game.width/2, game.height/3*2, 'Press SPACEBAR to try again', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		instructionText.anchor.set(0.5);

		var toggleText = game.add.text(game.width/2, game.height*99/100, 'Press C while playing to toggle Collision', {font: 'Helvetica', fontSize: '12px', fill: '#fff'});
		toggleText.anchor.set(0.5);

		overMusic = game.add.audio('gameoverAudio');
		overMusic.play('', 0, 1, false); 
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			overMusic.fadeOut(500);
			game.time.events.add(Phaser.Timer.SECOND * 1, function() { game.state.start('Play')});
		}
	}
};