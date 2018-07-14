function Pipes(game, key, distX, distY) {
		// call to Phaser.Sprite

		Phaser.Sprite.call(this, game, distX, distY, key);

		game.add.existing(this);

		// add properties
		this.anchor.set(0.5, 0.5);
		game.physics.enable(this);
		this.body.immovable = true;
		this.body.enable = true;
}

Pipes.prototype = Object.create(Phaser.Sprite.prototype);
Pipes.prototype.constructor = Pipes;

Pipes.prototype.update = function() {
}
