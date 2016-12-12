// -------------------------------
// Création des variables globales
// -------------------------------

var game = new Phaser.Game(
  800,
  600,
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
var cursors;

// ---------
// Fonctions
// ---------

function preload()
{
  game.load.image('background','images/blue-sky.jpg');
  game.load.image('balloon', 'images/HotAirBalloon.png');
}


function create()
{
  // Déclaration de la taille du world (800x6000 pixels)
  game.add.tileSprite(0, 0, 800, 20000, 'background');

  game.world.setBounds(0, 0, 800, 20000);

  // Démarrage du système de Physics : ARCADE
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = -10;

  // Création des curseur pour le controle clavier
  cursors = game.input.keyboard.createCursorKeys();
  
  // Ajout du ballon
  player = game.add.sprite(100, 300, 'balloon');
  // Activation de la gravité sur le player
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.y = game.world.height;
}

function update()
{

/*  if (cursors.up.isDown)
  {
    player.body.velocity.y = -300;
  }
  else if (cursors.down.isDown)
  {
    player.body.velocity.y = +300;
  }*/

  game.camera.follow(player);
}

function render()
{
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(player, 32, 500);
}