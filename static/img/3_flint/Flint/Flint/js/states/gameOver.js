var gameOver= {
	create: function(){
		this.bg = game.add.sprite(0, 0, 'gameOverScreen');
		this.bg.animations.add('background', [0, 1, 2, 3, 4, 5], 2, false);

		// Listener for R key pressed
		var rkey= game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

		// When player presses R, call start function, which sends me back to menu-screen
		rkey.onDown.addOnce(this.restart,this);
		this.bg.animations.play('background');
		this.pp = game.add.audio('sad',0.6);
        this.pp.loopFull();

	},

	update: function(){
		if (this.bg.animations.frame == 5) {
			this.bg.animations.paused = true;
		}
	},

	restart: function (){
		this.pp.stop();
		if (lastLevel != 'level4') {
			game.state.start(lastLevel);
		}
		else {
			game.state.start('menu');
		}
	},
};
