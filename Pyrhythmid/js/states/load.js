// Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		// Make the loading bar
		var loadingBar = this.add.sprite(game.width/2, game.height/2, 'loading');
		loadingBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadingBar);

		// Notes to self: update load path when upgrading from temp to final assets
		//                don't forget to update actual files either
		
		// Load graphics assets
		game.load.path = 'temp_assets/temp_img/';
		game.load.atlas('atlas', 'kevin_sheet.png', 'kevin_sheet.json');
		game.load.image('enemy', 'enemy.png');
		game.load.image('sandtile', 'sandtile.png');
		game.load.image('background', 'background.png');

		// Load audio assets
		game.load.path = 'temp_assets/temp_audio/';
		game.load.audio('tink', 'tink.mp3');
		game.load.audio('thump', 'thump.mp3');
	},
	create: function() {
		// Go to Title state
		game.state.start('Title');
	}
};