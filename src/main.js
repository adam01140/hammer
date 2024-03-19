// Code Practice: Scrolling States
// Name:
// Date: 

'use strict'


const config = {
    parent: 'phaser-game',  // for info text
    type: Phaser.WEBGL,     // for tinting
    width: 900,
    height: 450,
    pixelArt: true,
    zoom: 2,
	
	//this.physics.world.createDebugGraphic();

// Enhanced debugging options
	arcade: {
		debug: true,
		debugShowBody: true,
		debugShowVelocity: true
	},
	render: {
        pixelArt: true, // Enable this for pixel art games; it sets the scale mode to nearest filtering
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    scene: [Load, Play10, Play4, Play5, Play6, Play2,Play, Play3]
}

const game = new Phaser.Game(config)


