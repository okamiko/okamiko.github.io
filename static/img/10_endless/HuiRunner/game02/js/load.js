//Jeffrey Hui
//jechui,1395834
//Endless Runner
var loadState = {

	preload: function(){
		// add text loading... on screen
		var loadingLabel = game.add.text(80,150,'loading...', {font: '30px Comic', fill: '#ffffff'});
		
		// load the image assets, first var points to image, seond var is the location
		game.load.spritesheet('base','assets/img/base.png', 32, 48);
		// game.load.image('Menuu','assets/img/Screen.png');
		game.load.image('Menuu','assets/img/Screen.jpg');
		// game.load.image('Space','assets/img/Space.png');
		game.load.image('Space','assets/img/Space.jpg');
		game.load.image('endd','assets/img/end.png');
		game.load.image('stars', 'assets/img/smallStar.png');
		game.load.image('rock', 'assets/img/rock.png');
		game.load.image('time', 'assets/img/time.png');

		// load the audio assets
		game.load.path = 'assets/audio/';
		game.load.audio('flute', ['flute.mp3']);
		game.load.audio('death', ['death.mp3']);
		game.load.audio('ding', ['ding.mp3']);
	
},
	create: function(){
		// go to menu state
		game.state.start('menu');
	},
};



