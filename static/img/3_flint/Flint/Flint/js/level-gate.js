function Gate(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, null);

    game.add.existing(this);

    this.anchor.set(0.5, 0.5);
    game.physics.enable(this);
    this.body.immovable = true;
}

Gate.prototype = Object.create(Phaser.Sprite.prototype);
Gate.prototype.constructor = Gate;

Gate.prototype.update = function() {

}
