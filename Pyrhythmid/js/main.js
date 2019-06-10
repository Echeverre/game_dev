// Pyrhythmid
// A rhythm based game about a futuristic civilization that was based off of Egypt.
// Created by Henry Lott, Teresa Chen, and Aidan Hope

// https://github.com/Echeverre/game_dev

'use strict'

var game;

window.onload = function(){

	// Define game
	game = new Phaser.Game(1600, 800, Phaser.AUTO, 'phaser');

	// Define States
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Title', Title);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.add('Victory', Victory);
	game.state.add('Tutorial', Tutorial);

	// Start game
	game.state.start('Boot');
}