// -------------------------------
// Création des variables globales
// -------------------------------

var game = new Phaser.Game(
  innerWidth,
  innerHeight,
  Phaser.CANVAS,
  'montgolfiere',
  {
    preload: preload,
    create: create,
    update: update,
    render : render
  }
);
var player;
var item;
var ennemies;
var time;
var cursors;

// ---------
// Fonctions
// ---------

function preload()
{
  game.load.image('background','images/blue-sky.jpg');
  game.load.image('balloon', 'images/HotAirBalloon.png');
  game.load.image('balloon2', 'images/HotAirBalloon2.png');
  // game.load.image('bulle', 'images/helium.png')
  game.load.image('ennemi', 'images/oiseau_v2.png' )
}


function create()
{
  // game.create.texture('ennemi', 2, 2, 0);
  // Déclaration de la taille du world (800x6000 pixels)
  game.add.tileSprite(0, 0, innerWidth, 20000, 'background');

  game.world.setBounds(0, 0, innerWidth, 20000);

  // Démarrage du système de Physics : ARCADE
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = 0;

  // Création des curseur pour le controle clavier
  cursors = game.input.keyboard.createCursorKeys();
  
  // Ajout du ballon
  player = game.add.sprite(100, 300, 'balloon');
  // item = game.add.sprite(game.world.upX, 100, 100, 'bulle');
  // Activation de la gravité sur le player
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.y = game.world.height;
  var tween = game.add.tween(player).to( { x: 1000 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);

  // // Ennemies
  ennemies = game.add.physicsGroup();
  for (var i = 0; i < 50; i++)
  {
      var ennemy = ennemies.create(game.world.randomX, game.world.randomY - game.camera.height, 'ennemi');
      ennemy.body.velocity.x = game.rnd.between(200, 400);
  }

}

function update()
{
  player.body.velocity.y = -200;
  game.physics.arcade.overlap(player, ennemies, collision);
  ennemies.forEach(checkPos, this);
/*  if (leap.up.isDown)
  {
    player.body.velocity.y = -400 ;
    setTimeout(1000);
  }
  else if (leap.down.isDown)
  {
    this.slowMotion  =  2,0 ;
  }else if (leap.right.isDown)
  {
    player.body.velocity.x = -400; "???"
    player.body.velocity.y = -250;
  }else if (leap.left.isDown)
  {
    player.body.velocity.x = -300;
    player.body.velocity.y = -100;
    this.slowMotion  =  1,5 ;
  }*/

  game.camera.follow(player);
}

function checkPos (enemy) {

    if (enemy.x > game.world.width)
    {
        enemy.x = -100;
    }

}

function render()
{
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(player, 32, 500);
}

function collision(player, enemy) {
  enemy.kill();
  player.loadTexture('balloon2', 0, true);
  setTimeout(function create() {player.loadTexture('balloon', 0, true);}, 1200);
  console.log('TOUCHÉ');
}
