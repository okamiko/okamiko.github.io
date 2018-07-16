//Jeffrey Hui
//jechui,1395834
//Endless Runner

// Global Variables inside play.jss
var score = 0; 
var time = 500;

// Create my Phaser.Game object
var game = new Phaser.Game(700, 500, Phaser.AUTO);

// Add all states using key value pairs
game.state.add('boot',bootState);
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('gameover',gameOver);

// start game by first starting w/ the bootState
game.state.start('boot');
