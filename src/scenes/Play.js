

var health = 0

// Enemy class
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'block'); // Replace 'enemyTexture' with your loaded asset key
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);
    }

    update(player) {
        // Follow player logic
        this.scene.physics.moveToObject(this, player, 100); // Adjust speed as needed
    }
}





class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        // add background image
        

		// Create health display text
		
    
	
	
        this.map = this.add.image(0,0,'map').setOrigin(0)

        // add new Hero to scene (scene, x, y, key, frame, direction)
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
		this.keys.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		this.enemy = new Enemy(this, this.hero.x + 50, this.hero.y); // Adjust position as needed
		
		this.playerHealth = 100;
		this.healthText = this.add.text(200, 160, 'Health: 100', { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);

    // Setup keyboard input
    // Your existing keyboard setup code

    // Platform Group and collision setup should go here
    this.platforms = this.physics.add.staticGroup();
    const platform = this.platforms.create(this.hero.x + 264, this.hero.y + (this.hero.height / 2), 'block');
    platform.setSize(132, 32).setOrigin(0.5, 0.5);
    this.physics.add.collider(this.hero, this.platforms);
	
        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)

        // do camera stuff
this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
this.cameras.main.startFollow(this.hero, true, 0.5, 0.5);
this.physics.world.setBounds(0, 0, this.map.width, this.map.height);


        // update instruction text
        document.getElementById('info').innerHTML = "<strong>CharacterFSM.js</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)"

        }

    
update() {
	

	if(Math.abs(this.enemy.x - this.hero.x) > 20 && Math.abs(this.enemy.y - this.hero.y) > 20){
            this.enemy.update(this.hero);
        }
		
		
	if (this.physics.overlap(this.hero, this.enemy)) {
        if (this.heroFSM.state === 'swing') { // Assuming heroFSM is accessible and stores the current state
            const direction = new Phaser.Math.Vector2(this.enemy.x - this.hero.x, this.enemy.y - this.hero.y).normalize().scale(200);
            this.enemy.setVelocity(direction.x, direction.y);

            // Optional: Reset enemy velocity after a delay
            this.time.delayedCall(500, () => {
                this.enemy.setVelocity(0, 0);
            });
        }
    }
	
		
	//this.hero.y = this.hero.y + 10;
	
  // make sure we step (update) the hero's state machine
  this.heroFSM.step();
  
  this.enemy.anims.play('walk-down', true);
  
  this.healthText.setText('Health: ' + health);
  //alert("hello" + health);
  
}

}