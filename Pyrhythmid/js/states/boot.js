// Boot state

var Boot = function(game) {};
Boot.prototype = {
	preload: function() {
		game.load.image('loading', 'assets/img/loading.png');
	},
	create: function() {
		// Go to Load state
		game.state.start('Load');
	}
};