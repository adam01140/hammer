// This demo is a mashup of several of Nathan's, primarily
// https://github.com/nathanaltice/Mappy - Tiled integration and physics setup
// https://github.com/nathanaltice/FSM - Player movement & animations

// =================================================
// Running sprite asset thanks to https://quin-n.itch.io/free-platformer-character



const config = {
  parent: "phaser-game",
  type: Phaser.WEBGL,
  width: 500,
  height: 500,
  pixelArt: true,
  physics: {
    default: "arcade",
    // arcade: {
    //   debug: true,
    // },
  },
  scene: [Level1_Preload, Level1_Pixel],
  // scene: [Level2_Preload, Level2_Highres],
};

const game = new Phaser.Game(config);
