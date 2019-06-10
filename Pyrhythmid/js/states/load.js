// Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		
		// Make the loading bar
		var loadingBar = this.add.sprite(game.width/2, game.height/2, 'loading');
		loadingBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadingBar);

		// Load final graphics assets
		game.load.path = 'assets/img/'
		//game.load.atlas('atlas', 'atlas.png', 'atlas.json');
		//game.load.image('titleimg', 'titleimg.png');
		//game.load.image('loading', 'loading.png');
		//game.load.atlas('startatlas', 'start_button.png', 'start_button.json');
		//game.load.atlas('hourglassatlas', 'hourglass.png', 'hourglass.json');

		game.load.atlas('atlas', 'atlasFinal.png', 'atlasFinal.json');
		game.load.image('Game_Over', 'Game_Over.png')

		// Load final audio assets
		game.load.path = 'assets/audio/';
		game.load.audio('clickAudio', 'click.mp3');
		game.load.audio('deathAudio', 'death.wav');
		game.load.audio('gameoverAudio', 'GameOver.mp3');
		game.load.audio('laserAudio', 'laser.wav');
		game.load.audio('levelAudio', 'Level.wav');
		game.load.audio('menuAudio', 'menu.wav');
		game.load.audio('pewAudio', 'pew1.wav');
	},
	create: function() {
		// Go to Title state
		game.state.start('Title');
	}
};