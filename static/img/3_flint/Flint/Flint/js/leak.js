function Leak(game, distX, distY, st) {
    Phaser.Sprite.call(this, game, distX, distY, 'leak');

    game.add.existing(this);

    this.animations.add('flow', [0, 1, 2, 3, 4, 5], 5, true);

    // add properties
    this.anchor.set(0.5, 0.5);
    game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.enable = true;
    this.state = st;
}

Leak.prototype = Object.create(Phaser.Sprite.prototype);
Leak.prototype.constructor = Leak;

Leak.prototype.update = function() {
    game.physics.arcade.overlap(this, player.basicAtk, function() {fixLeak(this, this.state);}, null, this);
    this.animations.play('flow');
}

function fixLeak(l, s) {
    console.log('fix leak');
    l.kill();
    s.totalLeaks -= 1;
}
