function Steam(game, x, y, key) {

	var enableCollision = true;

	this.localX = x;
	this.localY = y;

	// call to Phaser.Sprite
	console.log('function Steam');
	Phaser.Sprite.call(this, game, x, y, 'steam');
	game.add.existing(this);
	console.log(key);
	if(key == 'steam00'){
		this.animations.add('blow00', [0, 1, 2, 4], 2, true);
		console.log(key);
	}
	if(key == 'steam01'){
		this.animations.add('blow01', [4, 2, 1, 0], 2, true);
		console.log(key);
	}

	// add properties
	game.physics.enable(this);
	this.anchor.set(0.5, 0.5);
	this.body.immovable = true;
	this.body.enable = true;
	this.body.setSize(20, 64, 4, 0);
}

Steam.prototype = Object.create(Phaser.Sprite.prototype);
Steam.prototype.constructor = Steam;

Steam.prototype.create = function() {
	console.log('Steam create');
},

Steam.prototype.update = function() {

	// if(this.key == 'steam00'){
		this.animations.play('blow00');
		this.animations.play('blow01');
	// }

	if(this.animations.frame == 2){
		this.body.setSize(16, 16, 4, 1000);
		this.body.enable = false;
	}
	if(this.animations.frame == 4){
		this.body.setSize(16, 16, 4, 1000);
		this.body.enable = false;
	}
	if(this.animations.frame == 0 || this.animations.frame == 1){
		this.body.setSize(16, 64, 4, 0);
		this.body.enable = true;
	}

}
