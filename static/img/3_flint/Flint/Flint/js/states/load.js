var loadState = {

	preload: function(){
		game.load.path = '../TEST/assets/music/';
		game.load.audio('shrine', ['Shrinee.mp3']);
		game.load.audio('Snowland',['Snowland.mp3']);
		game.load.audio('Crystal',['Crystal.mp3']);
		game.load.audio('MC',['MC.mp3']);
		game.load.audio('walk',['Walk.mp3']);
		game.load.audio('lastlevel',['lastlevel.mp3']);
		game.load.audio('sad', ['Sadness.mp3']);
		game.load.path = '../TEST/assets/img/';
		game.load.images(['pipe', 'steamOld', 'heartOld', 'enemyOld', 'wall', 'ooze', 'leakOld', 'instructions', 'steamMachine', 'text3','text2','text4','text5', 'startScreen', 'heart', 'water','finaltext'],
		['pipeProto.png', 'steamProto.png', 'heartProto.png', 'enemyProto.png', 'wallProto.png', 'oozeProto.png', 'leakProto.png', 'instructions.png', 'steammachine.png',  'text3.png', 'text22.png','text44.png','text55.png', 'startscreen.png', 'heart.png', 'water2.png','finaltext.png']);
		game.load.tilemap('level', 'flint1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.tilemap('level22', 'level2.json', null, Phaser.Tilemap.TILED_JSON); // lvl 2
		game.load.tilemap('level33', 'level3.json', null, Phaser.Tilemap.TILED_JSON); // lvl 3
		game.load.tilemap('level44', 'level4.json', null, Phaser.Tilemap.TILED_JSON); // lvl 4
		game.load.spritesheet('player', 'FlintSheet.png', 128, 128, 15);
		game.load.spritesheet('steam', 'steam_animation.png', 32, 64, 5);
		game.load.spritesheet('leak', 'waterSheet.png', 64, 64, 6);
		game.load.spritesheet('enemy', 'enemy.png', 496, 392, 2);
		game.load.spritesheet('ooze', 'oozeSheet.png', 64,64,6);
		game.load.spritesheet('gameOverScreen', 'gameOver.png', 800, 640, 6);
		game.load.image('tiles', 'wallFloor.png');
		game.load.image('playbutton', 'playButton2.png');
		game.load.spritesheet('text1', 'text1.png',800,118);
		game.load.image('City', 'shitty.png');
},
	create: function(){
		// go to menu state
		game.state.start('menu');
	},
};
