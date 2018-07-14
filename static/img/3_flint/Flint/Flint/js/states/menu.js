var menuState = {
	create: function() {
		game.add.image(0, 0, 'startScreen');
		// Listener for ENTER key pressed
		var enterKeyPressed = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
		// When player presses ENTER, call start function
		enterKeyPressed.onDown.addOnce(this.start,this);

		var playButton = game.add.button(game.width/2, game.height - 150, 'playbutton', this.start);
		playButton.anchor.set(0.5);
	},

	// go to play state
	start: function (){
		game.state.start('cut');
	},
};
