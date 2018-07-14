var cutScene = {
create: function(){

	background = this.add.tileSprite(0,200,800,400,'City');
	game.stage.backgroundColor = "ffffff";
	this.sentence = game.add.sprite(0, 522, 'text1');
	// this.sentence.scale.setTo(0.5,0.5);

	this.sentence.animations.add('firstrow', [0,1,2,3], 1, false);
	//this.sentence.animations.add('secondrow', [4,5,6], 5, false);

	this.shrine = game.add.audio('shrine',0.6);
	this.shrine.loopFull();

},

update: function(){
	background.tilePosition.x -= 1;
	this.sentence.animations.play('firstrow');

	if (this.sentence.animations.frame == 3) {
 		this.sentence.animations.paused = true;
	}
	if (this.game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
		this.shrine.stop();
		this.start();
		//this.sentence.animations.play('secondrow');
	}
},

	// go to play state
	start: function (){
		game.state.start('play');
	},
};
