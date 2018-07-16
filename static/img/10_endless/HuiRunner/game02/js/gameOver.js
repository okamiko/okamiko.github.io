//Jeffrey Hui
//jechui,1395834
//Endless Runner
var gameOver= {
	create: function(){
		// Add the gameover screen image into my gameover screen, already loaded.
		background = this.add.tileSprite(0,0,700,500,'endd');

		//  Texts on the Menu Screen
		var gameOverLabel = game.add.text(0,0, 'GameOver!',{font:'25px Comic', fill:'#ffffff'});
		var startLabel = game.add.text(80, game.world.height-80, 'Press R to Restart', {font:'25px Comic', fill:'#ffffff'});
		
		// Listener for R key pressed
		var rkey= game.input.keyboard.addKey(Phaser.Keyboard.R);

		// When player presses R, call start function, which sends me back to menu-screen
		rkey.onDown.addOnce(this.restart,this);

		//display scoretext
		scoreText = game.add.text(0,50,'placeholder text', { font: '25px Comic', fill: '#ffffff'});
		// display timeText
		timeText = game.add.text(0,100,'placeholder text', { font: '25px Comic', fill: '#ffffff'});
	},

	update: function(){
		// move the map 
		background.tilePosition.x -= 1;

		// show updated score
		scoreText.text = 'Distance Travelled: ' + score;
		timeText.text = 'Time Remaining: ' + time;
	},

	restart: function (){
		// Reset score back to 0, so when player presses R to reset, the score will start back at 0 already.
		score = 0;
		time = 500 ; // always have starting positive time at 500
		// go to menu state
		game.state.start('menu');
	},
};