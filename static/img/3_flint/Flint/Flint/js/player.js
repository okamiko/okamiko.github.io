function Player(game, px, py) {
	// call to Phaser.Sprite
	Phaser.Sprite.call(this, game, px, py, 'player');
	game.add.existing(this);

	// add animations
	this.animations.add('walkUp', [0, 1, 2, 3], 5, true);
	this.animations.add('walkSide', [4, 5, 6, 7], 5, true);
	this.animations.add('walkDown', [8, 9, 10, 11], 5, true);
	this.animations.add('vacuuming', [12, 13, 14], 5, true);

	// physics properties
	game.physics.enable(this);
	this.scaleVal = 0.5;
	this.scale.setTo(this.scaleVal, this.scaleVal);
	this.body.setSize(60, 50, 35, 60);
	this.anchor.set(0.5, 0.5);
	this.defaultVelocity = 300;
    this.velocityNormal = this.defaultVelocity;
	this.body.collideWorldBounds = true;

	// other properties
	this.lastKeyPressed;
	this.maxHealth = 3;
	this.health = this.maxHealth;
	this.gotHit = false;
	this.isStunned = false;
	this.knockbackTimer = 60;
	this.knockbackDistance = 0.5;
	this.vacuumAmmo = 0;

	// health bar
	var barConfig = {x: 250, y: 20, bar: {color: '#c41f1f'}};
	this.myHealthBar = new HealthBar(this.game, barConfig);
	barConfig = {x: this.myHealthBar.x, y: this.myHealthBar.y - 4, height: 8, bar: {color: '#fc7171'}};
	this.myHealthBarHighlight = new HealthBar(this.game, barConfig);
	heartIcon = game.add.sprite(this.myHealthBar.x - 245, this.myHealthBar.y - 15, 'heart');
	heartIcon.scale.setTo(0.75);
	heartIcon.fixedToCamera = true;

	// create group for player's atkHitboxes
	this.atkHitboxes = game.add.group();
	// give all atkHitboxes physics body
	this.atkHitboxes.enableBody = true;
	// make atkHitboxes children of the player so they will move with the player
	this.addChild(this.atkHitboxes);

	// create a hitbox (empty sprite)
	this.basicAtk = this.atkHitboxes.create(this.body.x, this.body.y, null);
	// set size of hitbox and positiong relative to player
	this.basicAtk.body.setSize(40, 40, this.width, 0);
	// properties of the hitbox
	this.basicAtk.name = "basicAtk";
	this.basicAtk.damage = 1;
	this.basicAtk.knockbackDirection = 0.5;
	this.basicAtk.knockbackAmt = 600;

	this.vacuum = this.atkHitboxes.create(this.body.x, this.body.y, null);
	this.vacuum.body.setSize(100, 60, this.width, -20);
	this.vacuum.name = "vacuum";
	this.basicAtk.damage = 1;

	this.text = false;
	this.text2 = false;
	this.text3 = false;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	disableAllHitboxes();
	// disable 8-direction (movement should be like Pokemon)
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;
	// game.debug.body(this.basicAtk);
	// game.debug.body(this.vacuum);
	// world collisions
	game.physics.arcade.collide(this, collideLayer1);
	if (game.physics.arcade.overlap(this, oozes, null, null, this)) {
		this.velocityNormal = 100;
	} else {
		this.velocityNormal = this.defaultVelocity;
	}
	game.physics.arcade.collide(this, pipes);
	game.physics.arcade.collide(this, steamMachine);
	// player gets hit by damaging element
	if (this.gotHit) {
		stunned();
		this.gotHit = false;
		this.damage(0.5);
		this.myHealthBar.setPercent(this.health / this.maxHealth * 100);
		this.myHealthBarHighlight.setPercent(this.health / this.maxHealth * 100);
	}

	// player mechanics enabled when not stunned
	if (this.isStunned == false) {
		// player can only get knocked back if not stunned, otherwise stun-lock possible
		game.physics.arcade.collide(this, enemies, knockback, null, this);
		game.physics.arcade.collide(this, steams, knockback, null, this);

		// attacks
		if (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			enableHitbox("basicAtk");
		}
		if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
			player.velocityNormal = 100;
			enableHitbox("vacuum");
			switch (this.lastKeyPressed) {
				case 'down':
					this.animations.frame = 12;
					break;
				case 'up':
					this.animations.frame = 13;
					break;
				case 'right':
					this.animations.frame = 14;
					break;
				case 'left':
					this.animations.frame = 14;
					this.scale.setTo(-this.scaleVal, this.scaleVal);
					break;
				default:
			}
		}

		// movement
		if (!game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
			if (cursors.up.isDown) {
				this.animations.play('walkUp');
		    	this.body.velocity.y = -this.velocityNormal;      // up
				this.lastKeyPressed = 'up';
			} else if (cursors.down.isDown) {
				this.animations.play('walkDown');
		    	this.body.velocity.y = this.velocityNormal;       // down
				this.lastKeyPressed = 'down';
			} else if (cursors.left.isDown) {
				this.scale.setTo(-this.scaleVal, this.scaleVal);
				this.animations.play('walkSide');
		    	this.body.velocity.x = -this.velocityNormal;      // left
				this.lastKeyPressed = 'left';
			} else if (cursors.right.isDown) {
				this.scale.setTo(this.scaleVal, this.scaleVal);
				this.animations.play('walkSide');
		    	this.body.velocity.x = this.velocityNormal;       // right
				this.lastKeyPressed = 'right';
			} else {
				this.animations.stop();
			}
		}
	}
}

function enableHitbox(hitboxName) {
	for (var i = 0; i < player.atkHitboxes.children.length; i++) {
		if (player.atkHitboxes.children[i].name === hitboxName) {
			switch (player.atkHitboxes.children[i].name) {
				case 'basicAtk':
					switch (player.lastKeyPressed) {
						case 'right':
							player.atkHitboxes.children[i].reset(player.body.x - 25, player.body.y - 10);
							break;
						case 'left':
							player.atkHitboxes.children[i].reset(player.body.x - 100, player.body.y - 10);
							break;
						case 'up':
							player.atkHitboxes.children[i].reset(player.body.x - 64, player.body.y - 50);
							break;
						case 'down':
							player.atkHitboxes.children[i].reset(player.body.x - 64, player.body.y + 20);
							break;
						default:
					}
					break;
				case 'vacuum':
					switch (player.lastKeyPressed) {
						case 'right':
							player.vacuum.body.setSize(100, 60, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 25, player.body.y - 10);
							break;
						case 'left':
							player.vacuum.body.setSize(100, 60, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 160, player.body.y - 10);
							break;
						case 'up':
							player.vacuum.body.setSize(60, 100, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 75, player.body.y - 90);
							break;
						case 'down':
							player.vacuum.body.setSize(60, 100, this.width, -20);
							player.atkHitboxes.children[i].reset(player.body.x - 75, player.body.y + 40);
							break;
						default:
					}
				default:
			}
		}
	}

	// will call disableAllatkHitboxes after a delay (letting the animation complete)
	game.time.events.add(Phaser.Timer.SECOND / 2, disableAllHitboxes, this);
}

function disableAllHitboxes() {
	player.atkHitboxes.forEachExists(function(hitbox) {hitbox.kill();});
}

function stunned() {
	console.log('stunned!');
	player.isStunned = true;
	player.body.velocity.x = 0;
	player.body.velocity.y = 0;
	game.time.events.add(1000, notStunned, this);
}

function notStunned() {
	console.log("un-stunned!");
	player.isStunned = false;
}

function knockback() {
	player.gotHit = true;
	console.log('knockback');

	if (player.lastKeyPressed == 'up') {
		for (let i = 0; i < player.knockbackTimer; i++) {
			player.body.position.y += player.knockbackDistance;
		}
	} else if (player.lastKeyPressed == 'down') {
		for (let i = 0; i < player.knockbackTimer; i++) {
			player.body.position.y -= player.knockbackDistance;
		}
	} else if (player.lastKeyPressed == 'left') {
		for (let i = 0; i < player.knockbackTimer; i++) {
			player.body.position.x += player.knockbackDistance;
		}
	} else if (player.lastKeyPressed == 'right') {
		for (let i = 0; i < player.knockbackTimer; i++) {
			player.body.position.x -= player.knockbackDistance;
		}
	}
}

function fadePicture() {
   this.sentence.kill();
}

function fadePicture1(){
	this.sentence2.kill();
}

function fadePicture2(){
	this.sentence3.kill();
}
