//Jeffrey Hui
//jechui,1395834
//Endless Runner
//game.sound.stopAll();
// var obstacleSpeed;
var playState= {
create: function(){
		// speed of objects flying on screen
	 	obstacleSpeed=-250;
	 	timeSpeed=-250;
	 	
		// Make the Space background a tilesprite, call it background
		background = this.add.tileSprite(0,0,700,500,'Space');
		
		// Prepare keyboard so human player can move player sprite
		this.keyboard = game.input.keyboard;

		// Create player and enable physics
		this.player = game.add.sprite(25, game.world.height - 150, 'base');
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.collideWorldBounds = true; // doesn't run off screen
	
		// animations, first [] is for which frames you want to animate, 10 = animation speed, set all to true
		this.player.animations.add('left', [9, 10], 10, true);
    	this.player.animations.add('right',[6, 7], 10, true);
    	this.player.animations.add('up', [3, 4], 10, true);
    	this.player.animations.add('down',[0, 1], 10, true);

    	// add 'distance' text on screen
    	scoreText = game.add.text(0,50,'placeholder text ', { font: '30px Times', fill: '#ffffff'});

    	// add 'time' text on screen
    	timeText = game.add.text(0,0,'placeholder text ', { font: '30px Times', fill: '#ffffff'});

		// make a group called obstacleGroup
		this.obstacleGroup = game.add.group();
		// add obstacles to obstacleGroup with addObstacle function
		this.addObstacle(this.obstacleGroup);		

		//make a group called timeGroup
		this.timeGroup = game.add.group();
		// add time to timeGroup with addTimeFunction
		this.addTime(this.timeGroup);	

		// add flute music and death sound to play.js, but not yet play it
		this.flute = game.add.audio('flute',0.1);
		this.death = game.add.audio('death');
		this.ding = game.add.audio('ding', 1000);
				
		// loop main music forever if perfect game and never die
		// until collide then stop music, press R, then music wil start from beginning
		this.flute.loopFull();
},

update: function(){
	//if player and obstacles overlap, call gameOver
	game.physics.arcade.overlap(this.player,this.obstacleGroup,this.gameOver,null,this);
	// if player and time overlap, add time
	game.physics.arcade.overlap(this.player, this.timeGroup , this.reallyaddTime, null, this);
	
	// left and right movement X-AXIS
	if(this.keyboard.isDown(Phaser.Keyboard.A)){
		this.player.body.velocity.x = -175;
		this.player.animations.play('left');
	}	else if (this.keyboard.isDown(Phaser.Keyboard.D)){
		this.player.body.velocity.x = 175;
		this.player.animations.play('right');
	}	else{
		this.player.body.velocity.x = 0;
	}

	// up and down movement Y-AXIS
	if (this.keyboard.isDown(Phaser.Keyboard.W)){
		this.player.body.velocity.y = -175;
		this.player.animations.play('up');
	}	else if (this.keyboard.isDown(Phaser.Keyboard.S)){
		this.player.body.velocity.y = 175;
		this.player.animations.play('down');
	}	else{
		this.player.body.velocity.y = 0;
	}

	// Moving Map
	background.tilePosition.x -= 10;

	// Status Text for Score, Score global inside maingame.js
  	score +=1;
    scoreText.text = 'Distance: ' + score;

	// Status Time for Time
    time -=1;
    timeText.text ='Time Remaining ' + time;

    // If no time left, gg
    if(time==0){
    	this.gameOver();
    }

},


// New Obstacle object, add to play screen -- referenced from prof's code
addObstacle: function(group){
	var obstacle = new Obstacle(game, obstacleSpeed);
	game.add.existing(obstacle);
	// add to group for collision detection
	group.add(obstacle);
	},

// New Time object, add to play screen
addTime: function(group){
	var time = new Time(game, timeSpeed);
	game.add.existing(time);
	group.add(time);
	},

reallyaddTime: function(){
	time += 10;
	this.ding.play('',1,1,false);
	timeText.text = 'Time : '+ time;

},

gameOver: function(){
	//  play the death sound, stop the looping music, stop the ding sound, go to gameover state
	this.death.play('',1,true);
	this.flute.stop();
	this.ding.stop();
	game.state.start('gameover');
	},

};
//----------------------------------------------------------------------------------------------//
// create Obstacle constructor
var Obstacle = function(game,speed) {
	// call Sprite constructor within this object
	// Spawns Either Stars or Rocks, randomly
	var s = Math.random();
		if(s < 0.5){
			Phaser.Sprite.call(this, game, game.width, game.rnd.integerInRange(10,game.height-10), 'stars');
		} else {
			Phaser.Sprite.call(this, game, game.width, game.rnd.integerInRange(10,game.height-10), 'rock');
		}
	game.physics.enable(this, Phaser.Physics.ARCADE);	// enable physics
	this.body.velocity.x = speed;						// make it move
	this.newObstacle = true;							// Allow for more than 1 Obstacle
};

// inherit from Phaser.Sprite and set constructor to Obstacle
// the Object.create method creates a new object w/ the specified prototype object and properties
Obstacle.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Obstacle.prototype.constructor = Obstacle;  

// override the Phaser.Sprite update function
Obstacle.prototype.update = function() {
	if(this.newObstacle && this.x < 650) {
		this.newObstacle = false;
		playState.addObstacle(this.parent);
	}
	// kill the paddle if it reaches the left edge of the screen
	if(this.y < -this.width) {
		this.kill();	
	}
}

//-----------------------------------------------------------------------------------------------//

// create Time constructor
var Time = function(game,speed) {
	// call Sprite constructor within this object
	// Spawns time randomly
	Phaser.Sprite.call(this, game, game.width, game.rnd.integerInRange(10,game.height-10), 'time');
	game.physics.enable(this, Phaser.Physics.ARCADE);	// enable physics
	this.body.velocity.x = speed;						// make it move
	this.newTime = true;							// Allow for more than 1 Obstacle
};

// Inherit from Phaser.Sprite and set constructor to Obstacle
// the Object.create method creates a new object w/ the specified prototype object and properties
Time.prototype = Object.create(Phaser.Sprite.prototype);
// since we used Object.create, we need to explicitly set the constructor
Time.prototype.constructor = Time;  

// override the Phaser.Sprite update function
Time.prototype.update = function() {
	if(this.newTime && this.x < 550){
		this.newTime= false;
		playState.addTime(this.parent);
	}
	// kill the paddle if it reaches the left edge of the screen
	if(this.y < -this.width) {
		this.kill();	
	}
}