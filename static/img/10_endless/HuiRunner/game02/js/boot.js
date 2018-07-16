//Jeffrey Hui
//jechui,1395834
//Endless Runner

// Variable name must be same according to the official name I gave it
var bootState = {
	create: function() {
		// We're going to be using physics, so enable the Arcade Physics system
		game.physics.startSystem(Phaser.Physics.ARCADE);
		// Call load state, aka load.js
		game.state.start('load');

	}
}