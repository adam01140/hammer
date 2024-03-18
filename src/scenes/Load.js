class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

 
	
	preload() {
    // load the visual goodz
    this.load.path = './assets/';
    this.load.spritesheet('hero', 'hero-sheet.png', {
        frameWidth: 1250,
        frameHeight: 1250,
    });
	
	this.load.spritesheet('enemy', 'hero-sheet.png', {
        frameWidth: 1250,
        frameHeight: 1250,
    });
	
	
	
	
	this.load.audio('swingSound', 'swing.mp3');
    this.load.image('map', 'map-scroll.jpg');
	this.load.image('grass', 'grass.jpg');
    this.load.image('block', 'block.png');
	this.load.image('rock', 'rock.jpg');
	
}


    create() {
		
		
		
		this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 4, end: 5 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 8, end: 11 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('enemy', { start: 12, end: 13 }),
        })
		
		
		/*
		this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 1 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('boss', { start: 0, end: 1 }),
        })
		*/
		
		
		
        // hero animations (walking)
        this.anims.create({
            key: 'walk-down',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'walk-right',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 5 }),
        })
        this.anims.create({
            key: 'walk-up',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
        })
        this.anims.create({
            key: 'walk-left',
            frameRate: 8,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 13 }),
        })

        // hero animations (swinging)
        this.anims.create({
            key: 'swing-down',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 16, end: 19 }),
        })
        this.anims.create({
            key: 'swing-up',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 20, end: 23 }),
        })
        this.anims.create({
            key: 'swing-right',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 24, end: 25 }),
        })
        this.anims.create({
            key: 'swing-left',
            frameRate: 8,
            repeat: 0,
            frames: this.anims.generateFrameNumbers('hero', { start: 28, end: 29 }),
        })



        // add circular attack
this.anims.create({
    key: 'circular-attack',
    frameRate: 24,
    repeat: 0,
    frames: this.anims.generateFrameNumbers('hero', {
      frames: [16, 16, 16, 17, 18, 25, 26, 21, 22, 30, 29, 18, 19, 19, 19]
    })
  });

  
  
        // proceed once loading completes
        this.scene.start('playScene')
    }
}