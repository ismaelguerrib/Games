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
let cursors;
var fish;
var trashs;
var timeNow;
var timeBefore = Date.now();
// window.onresize = rescale;

// function rescale() {
//   game.config.width = window.innerWidth;
//   game.config.height = window.innerHeight;
// }

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
}

function create() {
  this.add.image(1300, 1200, "background");
  trashs = ["trash1", "trash2", "trash3", "trash4"];
  fish = this.physics.add.group({
    key: "fish",
    collideWorldBounds: true
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update() {
  const trashs = ["trash1", "trash2", "trash3", "trash4"];

  timeNow = Date.now();
  if (timeNow - timeBefore >= 100000) {
    const randomIndex = Math.floor(Math.random() * Math.floor(trashs.length));
    let position = Math.floor(Math.random() * 2900);
    let seaTrashs = this.physics.add.group({
      key: trashs[randomIndex],
      setXY: { x: position, y: 0 },
      bounceX: 0.1,
      bounceY: 0.2,
      collideWorldBounds: true
    });

    this.physics.add.collider(fish, seaTrashs);
    timeBefore = timeNow;
  }
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
  //console.log(game);
}
