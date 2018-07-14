var lvl4444= {
	preload: function() {
		console.log('Play: preload');
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() {
		this.tt1 = false;
		console.log('Play: create');
		game.stage.setBackgroundColor('#4f2412');

		this.transition = game.plugins.add(new Phaser.Plugin.StateTransition);

	    this.ll = game.add.audio('lastlevel',0.6);
        this.ll.loopFull();

		// add map
		map = game.add.tilemap('level44');
		map.addTilesetImage('wallFloor', 'tiles');
		bgLayer1 = map.createLayer('bgLayer');
		collideLayer1 = map.createLayer('collideLayer');
		map.setCollisionByExclusion([]);
		collideLayer1.resizeWorld();

		// world and camera properties
		//game.world.setBounds(0, 0, 1538, 1538);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 700, 500);

		// stage properties
		this.totalLeaks = 10;
		this.waterLevel = 100;

		cursors = game.input.keyboard.createCursorKeys();

		// pipes
		pipes = game.add.group();

		// oozes
		oozes = game.add.group();

		// steam
		steamMachine = game.add.sprite(704, 2000, 'steamMachine');
		// steam0 = new Steam(game, steamMachine.x + 32, steamMachine.y - 32);
		// steam1 = new Steam(game, steamMachine.x + 96, steamMachine.y - 32);

		// leaks
		leaks = game.add.group();
		leak = new Leak(game, 1024, 700,this);
		leaks.add(leak);
		leak1 = new Leak(game, 928, 992,this);
		leaks.add(leak1);
		leak2 = new Leak(game, 1408, 402,this);
		leaks.add(leak2);
		leak = new Leak(game, 604, 600,this);
		leaks.add(leak);
		leak3 = new Leak(game, 1028, 992,this);
		leaks.add(leak3);
		leak4 = new Leak(game, 1308, 802,this);
		leaks.add(leak4);
		leak5 = new Leak(game, 928, 692,this);
		leaks.add(leak5);
		leak6 = new Leak(game, 808, 432,this);
		leaks.add(leak6);
		leak7 = new Leak(game, 648, 342,this);
		leaks.add(leak7);
		leak8 = new Leak(game, 1308, 632,this);
		leaks.add(leak8);
		leak9 = new Leak(game, 1308, 402,this);
		leaks.add(leak9);
		leak10 = new Leak(game, 1508, 822,this);
		leaks.add(leak10);

		// oozes
		oozes = game.add.group();
		for (let i = 0; i < 30; i++) {
			ooze = new Ooze(game, 'ooze', game.rnd.integerInRange(10, 30) * 64, game.rnd.integerInRange(2, 20) * 64);
			oozes.add(ooze);
		}

		gate = new Gate(game, 1664, 800);

		steams = game.add.group();
		enemies = game.add.group();
		leaks = game.add.group();
		// add player
		player = new Player(game, 64, 150);

		game.camera.follow(player, null, 0.1, 0.1);

		// water bar
		var barConfig = {x: 250, y: 60};
		this.waterBar = new HealthBar(this.game, barConfig);
		barConfig = {x: this.waterBar.x, y: this.waterBar.y - 4, height: 8, bar: {color: '#75aaff'}};
		this.waterBarHighlight = new HealthBar(this.game, barConfig);
		waterIcon = game.add.sprite(this.waterBar.x - 245, this.waterBar.y - 15, 'water');
		waterIcon.scale.setTo(0.75);
		waterIcon.fixedToCamera = true;
	},

	fadeCompleteWin: function() {
		console.log("you win");
		game.state.start('win');
	},

	fadeCompleteLose: function() {
		console.log("you lose");
		this.ll.stop();
		game.state.start('gameOver');
	},

	fadePicture: function() {
  		this.sentencess.kill();
	},

	update: function() {
		if(player.body.x > 320 && this.tt1 == false){
			this.sentencess = game.add.image(player.x-55,player.y-90, 'finaltext');
			this.sentencess.scale.setTo(0.35,0.35);
			this.tt1= true;
			console.log('hi');
			game.time.events.add(Phaser.Timer.SECOND * 2, this.fadePicture, this);
		}

		// world updates
		this.waterLevel -= 0.03 * this.totalLeaks;
		this.waterBar.setPercent(this.waterLevel);
		this.waterBarHighlight.setPercent(this.waterLevel);

		// debug
		// game.debug.body(player);
		// game.debug.body(steam0);
		// game.debug.body(steam1);
		// game.debug.spriteBounds(steam2);
		// game.debug.spriteBounds(steam3);
		// game.debug.spriteBounds(steam4);

		// states change
		if (player.health == 0 || this.waterLevel <= 0) {
			this.camera.fade('#000000');
			this.camera.onFadeComplete.add(this.fadeCompleteLose, this);
			lastLevel = 'level4';
			console.log("you lose");
		}

		if (this.totalLeaks == 0 && game.physics.arcade.overlap(player, gate, null, null, this)) {
			this.camera.fade('#000000');
			this.camera.onFadeComplete.add(this.fadeCompleteWin, this);
			console.log("you win");
		}
	},
};
