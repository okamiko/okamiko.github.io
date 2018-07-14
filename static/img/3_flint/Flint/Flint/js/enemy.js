function Enemy(game, distX, distY) {
    Phaser.Sprite.call(this, game, distX, distY, 'enemy');
    game.add.existing(this);

    // animation
    this.animations.add('rawr', [0, 1], 5, true);

	// physics properties
	this.anchor.set(0.5, 0.5);
	game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.body.enable = true;

    // general properties
    this.maxHealth = 1;
    this.health = this.maxHealth;
    this.scale.setTo(1/8);
    this.SPEED = 200;
    this.TURN_RATE = 500;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

function hitByBasicAtk(e) {
    e.damage(1);
}

function hitByVacuum(e) {
    // calculate angle from ghost to player
    var targetAngle = game.math.angleBetween(
        e.x, e.y,
        player.body.x, player.body.y
    );

    // turn the enemy towards the target angle
    if (e.rotation !== targetAngle) {
        // calculate difference between current angle and target angle
        var delta = targetAngle - e.rotation;

        // chooses most efficient direction for turning
        if (delta > Math.PI) delta -= Math.PI * 2;
        if (delta < -Math.PI) delta += Math.PI * 2;

        // turning
        if (delta > 0) {
            e.angle += e.TURN_RATE;
        } else {
            e.angle -= e.TURN_RATE;
        }

        // set angle to target angle if they are close
        if (Math.abs(delta) < game.math.degToRad(e.TURN_RATE)) {
            e.rotation = targetAngle;
        }
    }

    // calculate velocity based on rotation and speed
    e.body.velocity.x = Math.cos(e.rotation) * e.SPEED;
    e.body.velocity.y = Math.sin(e.rotation) * e.SPEED;

    // damage enemy
    if (player.body.x < e.body.x) { // player on left
        if (e.body.x < player.vacuum.body.x + 10) {
            e.damage(1);
        }
    } else if (player.body.x > e.body.x) { // player on right
        if (e.body.x + e.body.width > player.vacuum.body.x + 90) {
            e.damage(1);
        }
    }

    if (player.body.y > e.body.y) { // player below
        if (e.body.y + e.body.height > player.vacuum.body.y + 90) {
            e.damage(1);
        }
    } else if (player.body.y < e.body.y) { // player above
        if (e.body.y < player.vacuum.body.y + 10) {
            e.damage(1);
        }
    }
}

Enemy.prototype.update = function() {
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;

    game.physics.arcade.collide(this, collideLayer1);
    game.physics.arcade.collide(this, player.basicAtk, function() {hitByBasicAtk(this);}, null, this);
    game.physics.arcade.collide(this, player.vacuum, function() {hitByVacuum(this);}, null, this);

    this.animations.play('rawr');
}
