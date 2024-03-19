

var health = 100
var go = 0
var punchright = 0
var punchleft = 0






class Play5 extends Phaser.Scene {
    constructor() {
        super("playScene5")
		this.enemies = []; // Array to hold all enemies
    }

    create() {

	

	const { width, height } = this.sys.game.config;

    // First, add the map to the scene
		this.map = this.add.image(0, 0, 'menu3').setOrigin(0);

        // Scale the map to fit the screen
       const scaleX = this.sys.game.config.width / this.map.width;
    const scaleY = this.sys.game.config.height / this.map.height;
    const scale = Math.max(scaleX, scaleY); // Use max to ensure coverage
    this.map.setScale(scale);

        // Adjusting the camera if necessary
        //this.cameras.main.setBounds(0, 0, this.sys.game.config.width+100, this.sys.game.config.height);
        //this.physics.world.setBounds(0, 0, this.sys.game.config.width+100, this.sys.game.config.height);

	
	
       
		
		
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
		
		this.keys.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
		this.keys.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		//this.enemy3 = new Enemy3(this, 2500000000000, 150000000); // Adjust position as needed
		
	
		this.playerHealth = 100;

	 // Add the hero to the scene
        this.hero = new Hero(this, 250000000000, 150000000, 'hero', 0, 'down');
		this.hero.setScale(0.00010);
		this.hero.body.setSize(this.hero.width/4, this.hero.height/4);
	


    this.platforms = this.physics.add.staticGroup();
    const platform = this.platforms.create(this.hero.x + 264, this.hero.y + (this.hero.height / 2), 'block');
    platform.setSize(132, 32).setOrigin(0.5, 0.5);
    this.physics.add.collider(this.hero, this.platforms);
	
        // debug key listener (assigned to D key)
        this.input.keyboard.on('keydown-D', function() {
            this.physics.world.drawDebug = this.physics.world.drawDebug ? false : true
            this.physics.world.debugGraphic.clear()
        }, this)



        // update instruction text
        document.getElementById('info').innerHTML = "<strong>CharacterFSM.js</strong> Arrows: move | SPACE: attack | SHIFT: dash attack | F: spin attack | H: hurt (knockback) | D: debug (toggle)"




}





spawnEnemies(numberOfEnemies) {
        for (let i = 0; i < numberOfEnemies; i++) {
            // Calculate a random position for each enemy3
            let x = Phaser.Math.Between(100, this.sys.game.config.width - 100);
            let y = Phaser.Math.Between(100, this.sys.game.config.height - 100);

            // Create a new enemy3 and add it to the enemies array
            let enemy3 = new Enemy3(this, x, y);
            this.enemies.push(enemy3);

            // Optionally, add collision or overlap with other objects
            this.physics.add.collider(enemy3, this.platforms);
  
			
			this.physics.add.collider(this.boss3, this.platforms);
      
        }
    }

    











    
update() {
	
	
	if (Phaser.Input.Keyboard.JustDown(this.keys.SPACEKey)) {
		
		//this.map = this.add.image(0, 0, 'menu2').setOrigin(0);

        this.scene.start('playScene4');
		//this.spawnEnemies(10);
    }
	
	
	
	//this.hero.y = this.hero.y + 10;
	
  // make sure we step (update) the hero's state machine
  this.heroFSM.step();
  scene.sound.play('swingSound');
  
  
}

}