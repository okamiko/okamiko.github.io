var game;
var map;
var layer;
var mapLayer;
var cursors;
var scrollTrigger = false;
var lastLevel;

// Create my Phaser.Game object
game = new Phaser.Game(800, 640, Phaser.AUTO);

// Add all states using key value pairs
game.state.add('load',loadState);
game.state.add('menu',menuState);
game.state.add('play',playState);
game.state.add('level2', lvl2);
game.state.add('level3', lvl3);
game.state.add('level4', lvl4444);
game.state.add('gameOver',gameOver);
game.state.add('win', gameWin);
game.state.add('cut', cutScene);

// start game by first starting w/ the bootState
game.state.start('load');
