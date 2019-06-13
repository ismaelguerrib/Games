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
var smallTrashs;
var bigTrashs;
var timeNow;
var timeBefore = Date.now();
var timer1;
var timer2;
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
  cursors = this.input.keyboard.createCursorKeys();
  timer1 = randomTiming(1000, 2000);
  timer2 = randomTiming(2000, 4000);
  this.add.image(1300, 1200, "background");
  smallTrashs = ["trash3", "trash4"];
  bigtrashs = ["trash1", "trash2"];
  fish = this.physics.add.group({
    key: "fish",
    collideWorldBounds: true
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
    fish.setVelocity(-2500, 0);
  }
  if (cursors.right.isDown) {
    fish.setVelocity(2500, 0);
  }
  if (cursors.down.isDown) {
    fish.setVelocity(0, 1000);
  }

  const smallTrashs = ["trash3", "trash4"];

  timeNow = Date.now();
  if (timeNow - timeBefore >= timer1) {
    const randomIndex = Math.floor(
      Math.random() * Math.floor(smallTrashs.length)
    );
    let position = Math.random() * 2900;
    let seaSmallTrashs = this.physics.add.group({
      key: smallTrashs[randomIndex],
      setXY: { x: position, y: 0 },
      bounceX: 0.1,
      bounceY: 0.2,
      collideWorldBounds: true
    });

    this.physics.add.collider(fish, seaSmallTrashs);

    const bigTrashs = ["trash1", "trash2"];
    timeNow = Date.now();
    if (timeNow - timeBefore >= timer2) {
      const randomIndex = Math.floor(
        Math.random() * Math.floor(bigTrashs.length)
      );
      let position = Math.floor(Math.random() * 2900);
      let seaBigTrashs = this.physics.add.group({
        key: bigTrashs[randomIndex],
        setXY: { x: position, y: 0 },
        bounceX: 0.1,
        bounceY: 0.2,
        collideWorldBounds: true
      });
      this.physics.add.collider(fish, seaBigTrashs);
      this.physics.add.collider(seaSmallTrashs, seaBigTrashs);
    }

    timeBefore = timeNow;

    //   const trashs = ["trash1", "trash2", "trash3", "trash4"];

    //   timeNow = Date.now();
    //   if (timeNow - timeBefore >= 100000) {
    //     const randomIndex = Math.floor(Math.random() * Math.floor(trashs.length));
    //     let position = Math.floor(Math.random() * 2900);
    //     let seaTrashs = this.physics.add.group({
    //       key: trashs[randomIndex],
    //       setXY: { x: position, y: 0 },
    //       bounceX: 0.1,
    //       bounceY: 0.2,
    //       collideWorldBounds: true
    //     });

    // this.physics.add.collider(fish, seaTrashs);
    console.log(game);

    function collect(player, star) {
      star.disableBody(true, true);
    }
  }
}
