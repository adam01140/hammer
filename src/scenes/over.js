

var health = 100
var go = 0
var punchright = 0
var punchleft = 0
// Enemy class
class Enemy10 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, health) {
        super(scene, x, y, 'block2'); // Ensure 'block2' is the correct key for your sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.health = 100; // Initialize health
		this.body.setSize(this.width/2, this.height/2);
        // Create health text for this enemy
        this.healthText = scene.add.text(50, 20, '' + this.health, { fontSize: '20px', fill: '#fff' });
    }

   
	
	
	
	update(player) {
    const speed = 40;
	
	if(this.health > 0){
    this.healthText.setPosition(this.x-9, this.y - 150);
    const direction = new Phaser.Math.Vector2(player.x - this.x + 0, player.y - this.y + 0).normalize();
    this.body.setVelocity(direction.x * speed, direction.y * speed);
	}
	//console.log(`Play10er position: ${player.x}, ${player.y}`);
	//console.log(`Enemy position: ${this.x}, ${this.y}`);


}


	
	
	takeDamage(amount) {
        this.health -= amount;
        this.healthText.setText('' + this.health); // Update health text
		
		if (this.health < 1) {
        this.healthText.setVisible(false); // Hide the health text
        this.setActive(false).setVisible(false); // Disable and hide the boss
		this.x = 0
		this.y = 0
		
    }
	
	
    }
	
	
}








class Boss10 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, health) {
        super(scene, x, y, 'block2'); // Ensure 'block2' is the correct key for your sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.health = 0; // Initialize health
        // Assuming you want to resize the physics body to half its original sprite size
        this.body.setSize(this.width*6, this.height*7);
        // Now adjust the offset to ensure the resized body is centered
        this.body.setOffset(this.width*2, this.height);
        
        this.setActive(false).setVisible(false); // Disable and hide the boss
		this.x = 520
		this.y = 120
        
	
	}

    update(player) {
    const speed = 140;
	
	
		this.healthText.setVisible(false); // Hide the health text
        this.setActive(false).setVisible(false); // Disable and hide the boss
		this.x = 520
		this.y = 120
		//alert("You Have Won!!");
	
	//console.log(`Play10er position: ${player.x}, ${player.y}`);
	//console.log(`Enemy position: ${this.x}, ${this.y}`);


}


	
	
	takeDamage(amount) {
        this.health -= amount;
        this.healthText.setText('' + this.health); // Update health text
		
		if (this.health < 1) {
        this.healthText.setVisible(false); // Hide the health text
        this.setActive(false).setVisible(false); // Disable and hide the boss
		this.x = 530000
		this.y = 150
		alert("You Have Won!!");
		
    }
	
	
    }
	
	
}







class Play10 extends Phaser.Scene {
    constructor() {
        super("playScene10")
		this.enemies = []; // Array to hold all enemies
    }

    create() {

	

	const { width, height } = this.sys.game.config;

    this.map = this.add.image(0, 0, 'done').setOrigin(0);

        // Scale the map to fit the screen
       const scaleX = this.sys.game.config.width / this.map.width;
    const scaleY = this.sys.game.config.height / this.map.height;
    const scale = Math.max(scaleX, scaleY); // Use max to ensure coverage
    this.map.setScale(scale);
	
	
       
		
		
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
		
		this.keys.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
		this.keys.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)


		
		this.boss = new Boss10(this, 520, 120); // Adjust position as needed
		this.boss.setScale(0.5);
		
		this.playerHealth = 100;

	 // Add the hero to the scene
        this.hero = new Hero(this, 550, 550, 'hero', 0, 'down');
		this.hero.setScale(0.10);
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
            // Calculate a random position for each enemy
            let x = Phaser.Math.Between(100, this.sys.game.config.width - 100);
            let y = Phaser.Math.Between(100, this.sys.game.config.height - 100);

            // Create a new enemy and add it to the enemies array
            let enemy = new Enemy(this, x, y);
            this.enemies.push(enemy);

            // Optionally, add collision or overlap with other objects
            this.physics.add.collider(enemy, this.platforms);
  
			
			this.physics.add.collider(this.boss, this.platforms);
      
        }
    }

    











    
update() {
	
	 if (this.heroFSM.state === 'swing') {
				this.hero.body.setSize(this.hero.width/2, this.hero.height/4);
				
			}else{
				this.hero.body.setSize(this.hero.width/4, this.hero.height/4);
			}
	
	
	if(punchleft == 1){
		this.boss.anims.play('walk-down3', true);
		this.time.delayedCall(500, () => {
			punchleft = 0;
        });
	}
	
	if(punchright == 1){
		this.boss.anims.play('walk-up3', true);
		this.time.delayedCall(500, () => {
			punchright = 0;
        });
	}


if(this.hero.y < this.boss.y-10) {
        this.hero.setDepth(0); // Ensure hero is drawn above the boss
        this.boss.setDepth(1); // Ensure boss is drawn below the hero
    } else {
        //this.hero.setDepth(1); // Ensure hero is drawn below the boss
        //this.boss.setDepth(0); // Ensure boss is drawn above the hero
    }



if (this.physics.overlap(this.hero, this.boss)) {
	
	
	alert("Thank you for playing!");
	this.scene.start('playScene5')
	
	
            if (this.heroFSM.state === 'swing') {
				
                const direction = new Phaser.Math.Vector2(this.boss.x - this.hero.x, this.boss.y - this.hero.y).normalize().scale(75);
                this.boss.x = this.boss.x + direction.x
				this.boss.y = this.boss.y + direction.y
				this.boss.setVelocity(direction.x, direction.y);
                console.log(direction.x)
				
				
				this.boss.takeDamage(1);
                this.time.delayedCall(200, () => {
                    this.boss.setVelocity(0, 0);
					punchright = 0;
					punchleft = 0;
                });
            } else {
				
				if(this.boss.x > this.hero.x && this.boss.y < this.hero.y+10){
					
				
				this.boss.anims.play('walk-down3', true);
				this.hero.setDepth(1); // Ensure hero is drawn above the boss
				this.boss.setDepth(0); // Ensure boss is drawn below the hero
				const direction2 = new Phaser.Math.Vector2(this.boss.x - this.hero.x, this.boss.y - this.hero.y).normalize().scale(655);
				punchleft = 1;
				this.hero.setVelocity(-direction2.x, -direction2.y);
				
				this.time.delayedCall(200, () => {
                    this.hero.setVelocity(0, 0);
					punchleft = 0;
                });
				
				
				this.hero.x = this.hero.x - direction2.x/100
				this.hero.y = this.hero.y - direction2.y/100
				
				}
				
				if(this.boss.x < this.hero.x && this.boss.y < this.hero.y+10){
				
				this.boss.anims.play('walk-up3', true);
				this.hero.setDepth(1); // Ensure hero is drawn above the boss
				this.boss.setDepth(0); // Ensure boss is drawn below the hero	
				const direction2 = new Phaser.Math.Vector2(this.boss.x - this.hero.x, this.boss.y - this.hero.y).normalize().scale(655);
				punchright = 1;
				this.hero.setVelocity(-direction2.x, -direction2.y);
				
				this.time.delayedCall(200, () => {
                    this.hero.setVelocity(0, 0);
                });
				
				this.hero.x = this.hero.x - direction2.x/100
				this.hero.y = this.hero.y - direction2.y/100
				
				
				}
				

					
			}
        } else {
			
			if(punchleft == 0 && punchright == 0){
			if(this.boss.x > this.hero.x){
				this.boss.anims.play('walk-left3', true);
			} else {
				this.boss.anims.play('walk-right3', true);
	
			}
			}
  
		}


	
	
	if (Phaser.Input.Keyboard.JustDown(this.keys.QKey)) {
        
		this.spawnEnemies(10);
    }
	
	
	
  // make sure we step (update) the hero's state machine
  this.heroFSM.step();

}

}