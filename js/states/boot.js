// Boot state
// May come back to this later, but for now just adds a loading bar and starts the load state

var Boot = function(game) {};
Boot.prototype = {
	preload: function() {
		game.load.image('loading', 'temp_assets/temp_img/loading.png');
	},
	create: function() {
		// Go to Load state
		game.state.start('Load');
	}
};