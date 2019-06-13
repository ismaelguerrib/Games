var config = {
  width: 2900,
  height: 2450,
  //  width: window.innerWidth,
  //   height: window.innerHeight,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 900 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var game = new Phaser.Game(config);
const collider = new Phaser.Physics.Arcade.Collider(
  true,
  function collision() {}
);
var cursors;
var fish;
var timeNow;
var timeBefore = Date.now();
var timer1;
var timer2;
var death;
var score;
var smallTrashs;
var smallTrash4;
var gfx;

function preload() {
  this.load.image("background", "images-jeu/background.jpg");
  this.load.image("fish", "./images-jeu/main-character.png");
  this.load.image("trash1", "images-jeu/trash/42567oildrum_98985.png");
  this.load.image(
    "trash2",
    "images-jeu/trash/Beer_Can_icon-icons.com_68781.png"
  );
  this.load.image("trash3", "images-jeu/trash/coffecuptotakeaway_122701.png");
  this.load.image("trash4", "images-jeu/trash/drinkpackage_122723.png");
  this.load.image("death", "images-jeu/407052_1.jpg");
}

function getRandomPosition() {
  return Math.floor(Math.random() * 2900);
}

function create() {
  this.add.image(1300, 1200, "background");
  cursors = this.input.keyboard.createCursorKeys();
  death = this.add.image(1300, 1200, "death");
  death.y = 3450;
  timer1 = randomTiming(2000, 4000);
  timer2 = randomTiming(4000, 6000);
  trash3 = this.add.image(1300, 1200, "trash3");
  trash4 = this.add.image(1300, 1200, "trash4");
  trash1 = this.add.image(1300, 1200, "trash1");
  trash2 = this.add.image(1300, 1200, "trash2");

  fish = this.physics.add.group({
    key: "fish",
    setXY: { x: 1400, y: 1400 },
    collideWorldBounds: true
  });

  var position = Math.floor(Math.random() * 2900);

  smallTrash4 = this.physics.add.group({
    key: "trash4",
    setXY: { x: position, y: 0 },
    bounceX: 0.1,
    bounceY: 0.2,
    collideWorldBounds: true
  });
  smallTrash3 = this.physics.add.group({
    key: "trash3",
    setXY: { x: position, y: 0 },
    bounceX: 0.1,
    bounceY: 0.2,
    collideWorldBounds: true
  });
  bigTrash2 = this.physics.add.group({
    key: "trash2",
    setXY: { x: position, y: 0 },
    bounceX: 0,
    bounceY: 0.2,
    collideWorldBounds: true
  });
  bigTrash1 = this.physics.add.group({
    key: "trash1",
    setXY: { x: position, y: 0 },
    bounceX: 0,
    bounceY: 0.2,
    collideWorldBounds: true
  });

  smallTrash4.create(getRandomPosition(), 0);
  smallTrash3.create(getRandomPosition(), 0);
  bigTrash2.create(getRandomPosition(), 0);
  bigTrash1.create(getRandomPosition(), 0);

  score = this.add.text(100, 100, "", {
    font: "64px Courier",
    fill: "#000000"
  });
  this.data.set("lives", 3);
  this.data.set("level", 5);
  this.data.set("score", null);
  score.setText([
    "Lives: " + this.data.get("lives"),
    "Level: " + this.data.get("level"),
    "Pollution: " + this.data.get("score") + "%"
  ]);

  function amoncellement() {
    death.y += -484;
  }
  timedEvent = this.time.addEvent({
    delay: 2000,
    callback: amoncellement(),
    callbackScope: this,
    repeat: 4
  });

  function randomTiming(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

function update() {
  fish.setVelocityX(50, 50);
  if (cursors.up.isDown) {
    fish.setVelocity(0, -1000);
  }
  if (cursors.left.isDown) {
    fish.setVelocity(-1500, 0);
  }
  if (cursors.right.isDown) {
    fish.setVelocity(1500, 0);
  }
  if (cursors.down.isDown) {
    fish.setVelocity(0, 1000);
  }

  if (timeNow - timeBefore >= timer1) {
    smallTrash4.create(position, 0);
  }
  this.physics.add.collider(fish);

  if (timeNow - timeBefore >= timer2) {
    bigTrash2.create(position, 0);
  }

  if (timeNow - timeBefore >= timer1) {
    smallTrash3.create(position, 0);
  }
  if (timeNow - timeBefore >= timer2) {
    bigTrash1.create(position, 0);
  }

  //   this.physics.add.collider(fish, seaBigTrashs);

  //   this.physics.add.collider(fish, );
  //   this.physics.add.collider( );

  function amoncellement() {
    death.y += -800;
  }

  // text.setText(Event.prototype + timedEvent.getProgress().toString()+);

  // window.onresize = rescale;

  // function rescale() {
  //   game.config.width = window.innerWidth;
  //   game.config.height = window.innerHeight;
  // }

  // console.log(game);
}
