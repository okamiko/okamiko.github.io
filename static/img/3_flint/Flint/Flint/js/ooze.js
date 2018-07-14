function Ooze(game, key, distX, distY) {
		// call to Phaser.Sprite
		Phaser.Sprite.call(this, game, distX, distY, key);

		game.add.existing(this);

		// add properties
		this.anchor.set(0.5, 0.5);
		game.physics.enable(this);
		this.body.immovable = true;
		this.body.enable = true;
		this.animations.add('poo',[0,1,2,3,4], 2, true);
}

Ooze.prototype = Object.create(Phaser.Sprite.prototype);
Ooze.prototype.constructor = Ooze;

Ooze.prototype.update = function() {
	this.animations.play('poo');
}
