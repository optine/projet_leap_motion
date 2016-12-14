// -------------------------------
// Création des variables globales
// -------------------------------

var game = new Phaser.Game(
  innerWidth,
  850,
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
var enemy;
var time;
var cursors;

// ---------
// Fonctions
// ---------

function preload()
{
  game.load.image('background','images/blue-sky.jpg');
  game.load.image('balloon', 'images/HotAirBalloon.png');
  game.load.image('bulle', 'images/helium.png')
  game.load.image('ennemi', 'images/oiseau.png' )
}


function create()
{
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
  item = game.add.sprite(game.world.upX, 100, 100, 'bulle');
  // Activation de la gravité sur le player
  game.physics.arcade.enable(player);
  player.body.collideWorldBounds = true;
  player.y = game.world.height;
  enemy = game.add.physicsGroup();
  var tween = game.add.tween(player).to( { x: 1000 }, 5000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  var enemy = game.create(Math.random() * (innerWidth - 100) + 100, 0, 'ennemi');
  enemy.body.velocity.x = game.rnd.between(100, 200);
  y += 48;

}

function update()
{
  player.body.velocity.y = -100;
  game.physics.arcade.overlap(player, enemy, null, this);
  enemy.forEach(checkPos, this);
/*  if (cursors.up.isDown)
  {
    player.body.velocity.y = MATH PI/8;
  }
  else if (cursors.down.isDown)
  {
    player.body.velocity.y = +300;
  }*/

  game.camera.follow(player);
}

function checkPos (enemy) {

    if (enemy.x > 800)
    {
        enemy.x = -100;
    }

}

function render()
{
  game.debug.cameraInfo(game.camera, 32, 32);
  game.debug.spriteCoords(player, 32, 500);
}