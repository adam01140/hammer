

var health = 100
var go = 0
// Enemy class
class Enemy2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, health) {
        super(scene, x, y, 'block2'); // Ensure 'block2' is the correct key for your sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.health = 100; // Initialize health
		this.body.setSize(this.width/2, this.height/2);
        // Create health text for this enemy
        this.healthText = scene.add.text(50, 20, '' + this.health, { fontSize: '12px', fill: '#fff' });
    }

    update(player) {
        // Update the position of the health text to follow the enemy
        this.healthText.setPosition(this.x-9, this.y - 20);
		this.anims.play('walk-down', true);
        // Existing logic to move toward the player
        this.scene.physics.moveToObject(this, player, 10);
    }
	
	
	takeDamage(amount) {
        this.health -= amount;
        this.healthText.setText('' + this.health); // Update health text
    }
	
	
}










class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2")
		this.enemies = []; // Array to hold all enemies
    }

    create() {
        // add background image
        

		// Create health display text
		
    
	
        this.map = this.add.image(-10,-10,'grass').setOrigin(0)

        // add new Hero to scene (scene, x, y, key, frame, direction)
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down')

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
		this.keys.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
		this.keys.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		this.enemy2 = new Enemy2(this, this.hero.x + 50, this.hero.y); // Adjust position as needed
		
		this.playerHealth = 100;
		//this.healthText = this.add.text(this.enemy2.x, this.enemy2.y, 'Health: 100', { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);

    // Setup keyboard input
    // Your existing keyboard setup code

    // Platform Group and collision setup should go here
    this.platforms = this.physics.add.staticGroup();
    const platform = this.platforms.create(this.hero.x + 264, this.hero.y + (this.hero.height / 2), 'rock', 5, 5);
    platform.setSize(this.width/2, this.height/2).setOrigin(0.5, 0.5);
	
	
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




spawnEnemies(numberOfEnemies) {
        for (let i = 0; i < numberOfEnemies; i++) {
            // Calculate a random position for each enemy
            let x = Phaser.Math.Between(100, this.sys.game.config.width - 100);
            let y = Phaser.Math.Between(100, this.sys.game.config.height - 100);

            // Create a new enemy and add it to the enemies array
            let enemy2 = new Enemy2(this, x, y);
            this.enemies.push(enemy2);

            // Optionally, add collision or overlap with other objects
            this.physics.add.collider(enemy2, this.platforms);
            this.physics.add.overlap(this.hero, enemy2, this.handleHeroEnemyCollision, null, this);
        }
    }

    handleHeroEnemyCollision(hero, heroFSM, enemy2) {
    // Handle collision: damage the enemy, apply knockback, etc.
    if (heroFSM.state === 'swing') {
        const direction = new Phaser.Math.Vector2(enemy2.x - hero.x, enemy2.y - hero.y).normalize().scale(600);
        enemy2.setVelocity(direction.x, direction.y);
        enemy2.takeDamage(1);
        // Accessing time object from the scene
        hero.scene.time.delayedCall(500, () => {
            enemy2.setVelocity(0, 0);
        });
    }
}








    
update() {
	

this.enemies.forEach(enemy2 => {
        if (this.physics.overlap(this.hero, enemy2)) {
            this.handleHeroEnemyCollision(this.hero, this.heroFSM, enemy2); // Pass the individual enemy object
        }
        enemy2.update(this.hero);
    });

    if (Phaser.Input.Keyboard.JustDown(this.keys.QKey)) {
		
        this.spawnEnemies(10);
		//this.scene.start('playScene2');
    }

    this.enemies.forEach(enemy2 => {
        if (Math.abs(enemy2.x - this.hero.x) > 20 || Math.abs(enemy2.y - this.hero.y) > 20) {
            enemy2.update(this.hero);
        }
    });

    this.enemies.forEach(enemy2 => {
        if (this.physics.overlap(this.hero, enemy2)) {
            if (this.heroFSM.state === 'swing') {
                const direction = new Phaser.Math.Vector2(enemy2.x - this.hero.x, enemy2.y - this.hero.y).normalize().scale(600);
                enemy2.setVelocity(direction.x, direction.y);
                enemy2.takeDamage(1);
                this.time.delayedCall(500, () => {
                    enemy2.setVelocity(0, 0);
                });
            }
        }
    });



    this.enemies.forEach(enemy2 => {
        enemy2.anims.play('walk-down', true);
        enemy2.healthText.setPosition(enemy2.x - 9, enemy2.y - 20);
    });
	
	
	


	
	
	if (Phaser.Input.Keyboard.JustDown(this.keys.QKey)) {
        //this.scene.start('playScene2');
		this.spawnEnemies(10);
    }
	
	
	

	if(Math.abs(this.enemy2.x - this.hero.x) > 20 || Math.abs(this.enemy2.y - this.hero.y) > 20){
            this.enemy2.update(this.hero);
        }
		
		
	if (this.physics.overlap(this.hero, this.enemy2)) {
        if (this.heroFSM.state === 'swing') { // Assuming heroFSM is accessible and stores the current state
            const direction = new Phaser.Math.Vector2(this.enemy2.x - this.hero.x, this.enemy2.y - this.hero.y).normalize().scale(600);
            this.enemy2.setVelocity(direction.x, direction.y);

			this.enemy2.takeDamage(1);
			
			
            // Optional: Reset enemy velocity after a delay
            this.time.delayedCall(500, () => {
                this.enemy2.setVelocity(0, 0);
            });
        }
    }
	
		
	//this.hero.y = this.hero.y + 10;
	
  // make sure we step (update) the hero's state machine
  this.heroFSM.step();
  
  this.enemy2.anims.play('walk-down', true);
  
  
  this.enemy2.healthText.setPosition(this.enemy2.x-9, this.enemy2.y - 20);


}

}