

var health = 100
var go = 0
// Enemy class
class Enemy extends Phaser.Physics.Arcade.Sprite {
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
        this.scene.physics.moveToObject(this, player, 40);
    }
	
	
	takeDamage(amount) {
        this.health -= amount;
        this.healthText.setText('' + this.health); // Update health text
    }
	
	
}










class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
		this.enemies = []; // Array to hold all enemies
    }

    create() {


	

	

	const { width, height } = this.sys.game.config;

    // First, add the map to the scene
    this.map = this.add.image(0, 0, 'map').setOrigin(0);

    // Now that this.map is defined, you can access its properties
    const scaleX = width / this.map.displayWidth; // Use displayWidth/displayHeight because the map might be scaled
    const scaleY = height / this.map.displayHeight;
    const scale = Math.max(scaleX, scaleY); // Use 'max' to ensure the image covers the whole screen

    // Apply scale to the map
    this.map.setScale(scale);

    // Assuming the original size of the map, you may need these if you're setting world bounds based on the original map size
    const boundsWidth = this.map.displayWidth * scale;
    const boundsHeight = this.map.displayHeight * scale;
    this.physics.world.setBounds(0, 0, boundsWidth, boundsHeight);

    // The camera viewport should match the game's width and height
    this.cameras.main.setViewport(0, 0, width, height);

	
	
	
	
        // Add the hero to the scene
        this.hero = new Hero(this, 200, 150, 'hero', 0, 'down');

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
		
		this.keys.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
		this.keys.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		this.enemy = new Enemy(this, this.hero.x + 50, this.hero.y); // Adjust position as needed
		
		this.playerHealth = 100;


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
//this.cameras.main.startFollow(this.hero, true, 0.5, 0.5);
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
            let enemy = new Enemy(this, x, y);
            this.enemies.push(enemy);

            // Optionally, add collision or overlap with other objects
            this.physics.add.collider(enemy, this.platforms);
            this.physics.add.overlap(this.hero, enemy, this.handleHeroEnemyCollision, null, this);
        }
    }

    handleHeroEnemyCollision(hero, heroFSM, enemy) {
    // Handle collision: damage the enemy, apply knockback, etc.
    if (heroFSM.state === 'swing') {
        const direction = new Phaser.Math.Vector2(enemy.x - hero.x, enemy.y - hero.y).normalize().scale(600);
        enemy.setVelocity(direction.x, direction.y);
        enemy.takeDamage(1);
        // Accessing time object from the scene
        hero.scene.time.delayedCall(500, () => {
            enemy.setVelocity(0, 0);
        });
    }
}








    
update() {
	

this.enemies.forEach(enemy => {
        if (this.physics.overlap(this.hero, enemy)) {
            this.handleHeroEnemyCollision(this.hero, this.heroFSM, enemy); // Pass the individual enemy object
        }
        enemy.update(this.hero);
    });

    if (Phaser.Input.Keyboard.JustDown(this.keys.QKey)) {
		
        this.spawnEnemies(10);
		this.scene.start('playScene2');
    }

    this.enemies.forEach(enemy => {
        if (Math.abs(enemy.x - this.hero.x) > 20 || Math.abs(enemy.y - this.hero.y) > 20) {
            enemy.update(this.hero);
        }
    });

    this.enemies.forEach(enemy => {
        if (this.physics.overlap(this.hero, enemy)) {
            if (this.heroFSM.state === 'swing') {
                const direction = new Phaser.Math.Vector2(enemy.x - this.hero.x, enemy.y - this.hero.y).normalize().scale(600);
                enemy.setVelocity(direction.x, direction.y);
                enemy.takeDamage(1);
                this.time.delayedCall(500, () => {
                    enemy.setVelocity(0, 0);
                });
            }
        }
    });



    this.enemies.forEach(enemy => {
        enemy.anims.play('walk-down', true);
        enemy.healthText.setPosition(enemy.x - 9, enemy.y - 20);
    });
	
	
	


	
	
	if (Phaser.Input.Keyboard.JustDown(this.keys.QKey)) {
        //this.scene.start('playScene2');
		this.spawnEnemies(10);
    }
	
	
	

	if(Math.abs(this.enemy.x - this.hero.x) > 20 || Math.abs(this.enemy.y - this.hero.y) > 20){
            this.enemy.update(this.hero);
        }
		
		
	if (this.physics.overlap(this.hero, this.enemy)) {
        if (this.heroFSM.state === 'swing') { // Assuming heroFSM is accessible and stores the current state
            const direction = new Phaser.Math.Vector2(this.enemy.x - this.hero.x, this.enemy.y - this.hero.y).normalize().scale(600);
            this.enemy.setVelocity(direction.x, direction.y);

			this.enemy.takeDamage(1);
			
			
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
  
  
  this.enemy.healthText.setPosition(this.enemy.x-9, this.enemy.y - 20);


}

}