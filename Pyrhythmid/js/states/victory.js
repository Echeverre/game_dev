// Victory state
var thanks;

var Victory = function(game) {};
Victory.prototype = {
	create: function() {
		game.bg5 = this.add.tileSprite(0, 0, 1600, game.height,'atlas', 'End1');
		thanks = game.add.sprite(game.width/2, game.height/3, 'atlas', 'Thanks');
		thanks.anchor.set(0.5);
		thanks.alpha = 0;
	},
	update: function() {
		while(thanks.alpha < 1){
			thanks.alpha += 0.01;
		}
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};