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
console.log(game);
const collider = new Phaser.Physics.Arcade.Collider(true, function test() {});
console.log("collider", collider);
let cursors;

// window.onresize = rescale;

// function rescale() {
//   game.config.width = window.innerWidth;
//   game.config.height = window.innerHeight;
// }

function preload() {
  this.load.image("background", "images-jeu/background.jpg");
  this.load.image("fish", "./images-jeu/main-character.png");
  this.load.image("trash", "images-jeu/trash/42567oildrum_98985.png");
  this.load.image(
    "trash1",
    "images-jeu/trash/Beer_Can_icon-icons.com_68781.png"
  );
  this.load.image("trash2", "images-jeu/trash/coffecuptotakeaway_122701.png");
  this.load.image("trash3", "images-jeu/trash/drinkpackage_122723.png");
}

function create() {
  this.add.image(1300, 1200, "background");
  fish = this.physics.add.image(100, 200, "fish");
  // bounds

  console.log("this", this);
  const trashs = ["trash2", "trash3", "trash", "trash"];

  setInterval(() => {
    let position = Math.floor(Math.random() * 2900);
    const randomIndex = Math.floor(Math.random() * Math.floor(trashs.length));
    random = this.physics.add.image(position, 0, trashs[randomIndex]);
    random.body.collideWorldBounds = true;
    random.body.setBounce(0.1);
  }, 7000);

  //   trashs.body.checkCollision.up = true;
  //   trashs.body.checkCollision.down = true;
  //   trashs.body.checkCollision.left = true;
  //   trashs.body.checkCollision.right = true;

  fish.body.collideWorldBounds = true;
  fish.body.checkCollision.up = true;
  fish.body.checkCollision.down = true;
  fish.body.checkCollision.left = true;
  fish.body.checkCollision.right = true;

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(trashs, function(trash) {
    console.log("yay win !!!!", trash);
  });
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
  //   game.physics.arcade.collide(fish, randomTrashs);
}

// function addTrash() {
//   var trash = this.add.image(400, 100, "trash");
//   this.trashs.add("trash");
// }
