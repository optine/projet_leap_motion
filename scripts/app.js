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

// ---------
// Fonctions
// ---------

function preload()
{
  game.load.image('balloon', 'images/HotAirBalloon.png');
}


function create()
{
  // Déclaration de la taille du world (800x6000 pixels)
  game.world.setBounds(0, 0, 800, 6000);

  // Démarrage du système de Physics : ARCADE
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.physics.arcade.gravity.y = -200;
  
  // Ajout du ballon
  player = game.add.sprite(100, 300, 'balloon');
  // Activation de la gravité sur le player
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
}

function update()
{

  player.position.y -= 3;

  game.camera.follow(player);
}

function render()
{

}