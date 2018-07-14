var lvl2= {
	preload: function() {
		console.log('Play: preload');
		game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	create: function() {
		console.log('Play: create');
		game.stage.setBackgroundColor('#4f2412');

		this.transition = game.plugins.add(new Phaser.Plugin.StateTransition);

	    this.crystal = game.add.audio('Crystal',0.6);
        this.crystal.loopFull();

		// add map
		map = game.add.tilemap('level22');
		map.addTilesetImage('wallFloor', 'tiles');
		bgLayer1 = map.createLayer('bgLayer');
		collideLayer1 = map.createLayer('collideLayer');
		map.setCollisionByExclusion([]);
		collideLayer1.resizeWorld();

		// world and camera properties
		//game.world.setBounds(0, 0, 1538, 1538);
		game.camera.deadzone = new Phaser.Rectangle(100, 100, 700, 500);

		// stage properties
		this.totalLeaks = 3;
		this.waterLevel = 100;

		cursors = game.input.keyboard.createCursorKeys();

		// enemies
		enemies = game.add.group();

		// pipes
		pipes = game.add.group();

		// oozes
		oozes = game.add.group();

		// steam
		steamMachine = game.add.sprite(704, 1280, 'steamMachine');
		steams = game.add.group();

		steam0 = new Steam(game, steamMachine.x + 32, steamMachine.y +96, 'steam00');		// bot left steam
		steam0.rotation = 9.5;
		steams.add(steam0);

		steam00 = new Steam(game, steamMachine.x + 32, steamMachine.y -32, 'steam01');		// top left steam
		steams.add(steam00);

		steam1 = new Steam(game, steamMachine.x + 96, steamMachine.y +96, 'steam01');		// bot right steam
		steam1.rotation = 9.5;
		steams.add(steam1);

		steam11 = new Steam(game, steamMachine.x + 96, steamMachine.y -32, 'steam00');		//  top right steam
		steams.add(steam11);


		steamMachine1 = game.add.sprite(704,190, 'steamMachine');
		steam2 = new Steam(game, steamMachine1.x + 32, steamMachine1.y +96, 'steam00');		// bot left steam
		steam2.rotation = 9.5;
		steams.add(steam2);

		steam22 = new Steam(game, steamMachine1.x + 32, steamMachine1.y -32, 'steam01');		// top left steam
		steams.add(steam22);

		steam3 = new Steam(game, steamMachine1.x + 96, steamMachine1.y +96, 'steam01');		// bot right steam
		steam3.rotation = 9.5;
		steams.add(steam3);

		steam33 = new Steam(game, steamMachine1.x + 96, steamMachine1.y -32, 'steam00');		//  top right steam
		steams.add(steam33);


		game.physics.enable(steamMachine);
		steamMachine.body.immovable = true;

		game.physics.enable(steamMachine1);
		steamMachine1.body.immovable = true;

		// leaks
		leaks = game.add.group();
		leak = new Leak(game, 96, 768, this);
		leaks.add(leak);
		leak1 = new Leak(game, 768, 96, this);
		leaks.add(leak1);
		leak2 = new Leak(game, 768, 1440, this);
		leaks.add(leak2);

		gate = new Gate(game, 1500, 768);
		gate.scale.setTo(4);

		// add player
		player = new Player(game, 768, 768);

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
		this.crystal.stop();
		game.state.start('level3');
	},

	fadeCompleteLose: function() {
		console.log("you lose");
		this.crystal.stop();
		lastLevel = 'level2';
		game.state.start('gameOver');
	},

	update: function() {
		game.physics.arcade.collide(player, steamMachine);
		game.physics.arcade.collide(player, steamMachine1);

		// world updates
		this.waterLevel -= 0.02 * this.totalLeaks;
		this.waterBar.setPercent(this.waterLevel);
		this.waterBarHighlight.setPercent(this.waterLevel);

		// states change
		console.log(player.health);
		console.log(this.waterLevel);
		if (player.health == 0 || this.waterLevel <= 0) {
			this.camera.fade('#000000');
			this.camera.onFadeComplete.add(this.fadeCompleteLose, this);
			console.log("you lose");
		}

		if (this.totalLeaks == 0 && game.physics.arcade.overlap(player, gate, null, null, this)) {
			this.camera.fade('#000000');
			this.camera.onFadeComplete.add(this.fadeCompleteWin, this);
			console.log("you win");
		}
	},
};
