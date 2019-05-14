// Pyrhythmid

// A rhythm based game about a futuristic civilization that was based off of Egypt.
// Created by Henry Lott, Teresa Chen, and Aidan Hope

// Very early prototype
// Note to self: remember to update location of assets when upgrading from temp to final assets

'use strict'

// Define Global Variables
var game;
var player = null;
var PLAYERVELOCITY = 150;
//var GRAVITY = 2600;

window.onload = function(){

	// Define game
	game = new Phaser.Game(900,600, Phaser.AUTO, 'phaser');

	// Define States (must add any new states to both here and to index.html)
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	//game.state.add('GameOver', GameOver);

	// Start game
	game.state.start('Boot');
}

