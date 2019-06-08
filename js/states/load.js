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
		
		// Load temp graphics assets
		//game.load.path = 'temp_assets/temp_img/';
		//game.load.atlas('atlas', 'kevin_sheet.png', 'kevin_sheet.json');
		//game.load.image('enemy', 'enemy.png');
		//game.load.image('sandtile', 'sandtile.png');
		//game.load.image('background', 'background.png');

		// Load final graphics assets
		game.load.path = 'assets/img/'
		//game.load.image('sandtile', 'sandtile.png');
		//game.load.image('bg1', 'BG1.png');
		//game.load.image('bg2', 'BG2.png');
		//game.load.image('bg3', 'BG3.png');
		//game.load.image('bg4', 'BG4.png');
		//game.load.image('projectile', 'projectile.png');
		//game.load.atlas('atlas', 'playerspritesheet.png', 'playerspritesheet.json');
		//game.load.atlas('enemy_atlas', 'enemy1spritesheet.png', 'enemy1spritesheet.json');

		game.load.atlas('atlas', 'atlas.png', 'atlas.json');

		game.load.image('titleimg', 'titleimg.png');
		game.load.atlas('startatlas', 'start_button.png', 'start_button.json');

		// Load audio assets
		game.load.path = 'temp_assets/temp_audio/';
		//game.load.audio('tink', 'tink.mp3');
		game.load.audio('thump', 'thump.mp3');

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