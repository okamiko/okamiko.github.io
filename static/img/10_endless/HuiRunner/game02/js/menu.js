//Jeffrey Hui
//jechui,1395834
//Endless Runner
var menuState = {

	create: function(){

		// Add the menu screen image into my menu screen, already loaded.
		background = this.add.tileSprite(0,0,700,500,'Menuu');
		
		//  Texts on the Menu Screen
		var startLabel = game.add.text(0,game.world.height-500,'Press "Q" key to start', {font: '25px Comic', fill: '#ffffff'});
		
		// add message instruction for player
		condition0 = game.add.text(0,25,'Goal: Dodge rocks and stars, collect alarm clocks to', { font:'25px Comic', fill: '#ffffff'});
		condition01 = game.add.text(0,45,'         increase time,', { font:'25px Comic', fill: '#ffffff'});
    	condition2 = game.add.text(0,85,'If Time is 0, You Lose! How long can you last?', { font:'25px Comic', fill: '#ffffff'});
		
		// Listener for Q key pressed
		var qKeyPressed = game.input.keyboard.addKey(Phaser.Keyboard.Q);
		// When player presses Q, call start function
		qKeyPressed.onDown.addOnce(this.start,this);

	},

	update: function(){
		// make map shift
		background.tilePosition.x -= 1;
	},

	// go to play state
	start: function (){
		game.state.start('play');
	},
};