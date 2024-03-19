

var health = 100
var go = 0
var punchright = 0
var punchleft = 0
var score = 0
var turn = 0
 var won = 0
// enemy2 class
class enemy2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, health) {
        super(scene, x, y, 'block2'); // Ensure 'block2' is the correct key for your sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.health = 100; // Initialize health
		this.body.setSize(this.width/2, this.height/2);
        // Create health text for this enemy2
        this.healthText = scene.add.text(50, 20, '' + this.health, { fontSize: '12px', fill: '#fff' });
    }

   
	
	
	
	update(player) {
    const speed = 40;
    this.healthText.setPosition(this.x-9, this.y - 20);
    const direction = new Phaser.Math.Vector2(player.x - this.x + 0, player.y - this.y + 0).normalize();
    this.body.setVelocity(direction.x * speed, direction.y * speed);
	
	//console.log(`Player position: ${player.x}, ${player.y}`);
	//console.log(`enemy2 position: ${this.x}, ${this.y}`);


}


	
	
	takeDamage(amount) {
        this.health -= amount;
        this.healthText.setText('' + this.health); // Update health text
    }
	
	
}








class Boss2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, health) {
        super(scene, x, y, 'block2'); // Ensure 'block2' is the correct key for your sprite
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true);

        this.health = 3; // Initialize health
        // Assuming you want to resize the physics body to half its original sprite size
        this.body.setSize(this.width*6, this.height*7);
        // Now adjust the offset to ensure the resized body is centered
        this.body.setOffset(this.width*2, this.height);
        
        // Create health text for this enemy2
        this.healthText = scene.add.text(50, 20, '' + this.health, { fontSize: '20px', fill: '#fff' });
    }

    update(player) {
    const speed = Math.floor(Math.random() * 120) + 80;
	
	
	if(this.health > 0){
		
	
    this.healthText.setPosition(this.x-9, this.y - 90);
    const direction = new Phaser.Math.Vector2(player.x - this.x + 0, player.y - this.y + 0).normalize();
    this.body.setVelocity(direction.x * (Math.floor(Math.random() * 120) + 80), direction.y * (Math.floor(Math.random() * 120) + 80));
	}
	//console.log(`Player position: ${player.x}, ${player.y}`);
	//console.log(`enemy2 position: ${this.x}, ${this.y}`);


}


	
	
	takeDamage(amount) {
        this.health -= amount;
        this.healthText.setText('' + this.health); // Update health text
		
		if (this.health <= 0) {
        this.healthText.setVisible(false); // Hide the health text
        this.setActive(false).setVisible(false); // Disable and hide the boss
		this.x = 0
		this.y = 0
		//alert(score + "/4 enemies killed");
		score = score + 1
    }
	
	
	if(score > 2){
	
alert("You have proven worthy of a mighty challenge");

alert("It is time to fight THE HAMMER");
won = 1	
		
	}
		
		
		
    }
	
}






class Play2 extends Phaser.Scene {
    constructor() {
        super("playScene2")
		this.enemies = []; // Array to hold all enemies
		this.bosses = [];
		this.lastHeroX = 0;
    }

    create() {
		
	alert("Defeat 3 opponents to prove your karate expetise");	
	
	

	const { width, height } = this.sys.game.config;

    // First, add the map to the scene
    this.map = this.add.image(-10,0,'grass').setOrigin(0)
   
	
	
       
		
		
        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
		
		this.keys.QKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
		this.keys.SPACEKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

		this.enemy2 = new enemy2(this, 0, 0); // Adjust position as needed
		
		
        this.enemy2.setActive(false).setVisible(false); // Disable and hide the boss
		this.enemy2.x = 0
		this.enemy2.y = 0
		
		
		this.boss2 = new Boss2(this, 750, 550); // Adjust position as needed
		this.boss2.setScale(0.5);
	

		
		
		
		this.playerHealth = 100;

	 // Add the hero to the scene
        this.hero = new Hero(this, 450, 300, 'hero', 0, 'down');
		this.hero.setScale(0.10);
		this.hero.body.setSize(this.hero.width/4, this.hero.height/4);
		this.lastHeroX = this.hero.x;
		
		this.hero.anims.play('walk-right');
		this.hero.setVisible(true);

		
		
		
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
            // Calculate a random position for each enemy2
            let x = Phaser.Math.Between(100, this.sys.game.config.width - 100);
            let y = Phaser.Math.Between(100, this.sys.game.config.height - 100);

            // Create a new enemy2 and add it to the enemies array
            let enemy2 = new enemy2(this, x, y);
            this.enemies.push(enemy2);

            // Optionally, add collision or overlap with other objects
            this.physics.add.collider(enemy2, this.platforms);
  
			
			this.physics.add.collider(this.boss2, this.platforms);
      
        }
    }

    

spawnBosses(numberOfBosses) {
    for (let i = 0; i < numberOfBosses; i++) {
		
		
        let x = this.hero.x + 500//Phaser.Math.Between(100, this.sys.game.config.width - 100);
        let y = 550
        let boss = new Boss2(this, x, y); // Use the class name directly
        this.bosses.push(boss); // Add the new boss to the array
        this.physics.add.collider(boss, this.platforms);
		boss.setScale(0.5);
//boss.body.setSize(this.boss2.width*6, this.boss2.height*7); // Set to match the original boss



        // Setup other interactions as needed
    }
}










    
update() {
	
	if(won == 1){
	this.scene.start('playScene');	
	}
	//this.boss2.healthText.setPosition(this.boss2.x-9, this.boss2.y - 20);
	
	const xDifference = Math.abs(this.hero.x - this.lastHeroX);

    // Check if the hero has moved 100 units or more
    if (xDifference >= 200 && turn < 3) {
		
		turn = turn + 1
        this.spawnBosses(1); // Spawn one new boss
        this.lastHeroX = this.hero.x; // Update the last x position to the current position
    }

	
	 this.bosses.forEach(boss => {
        boss.update(this.hero);
		
       
    });
	
            if (this.heroFSM.state === 'swing') {
				this.hero.body.setSize(this.hero.width/2, this.hero.height/4);
				//this.spawnBosses(1);
				
			}else{
				this.hero.body.setSize(this.hero.width/4, this.hero.height/4);
			}
	
	
	
	
	
	if(punchleft == 1){
		this.boss2.anims.play('walk-down5', true);
		this.time.delayedCall(500, () => {
			punchleft = 0;
        });
	}
	
	if(punchright == 1){
		this.boss2.anims.play('walk-up5', true);
		this.time.delayedCall(500, () => {
			punchright = 0;
        });
	}


if(this.hero.y < this.boss2.y-10) {
        this.hero.setDepth(0); // Ensure hero is drawn above the boss2
        this.boss2.setDepth(1); // Ensure boss2 is drawn below the hero
    } else {
        //this.hero.setDepth(1); // Ensure hero is drawn below the boss2
        //this.boss2.setDepth(0); // Ensure boss2 is drawn above the hero
    }



if (this.physics.overlap(this.hero, this.boss2)) {
	
            if (this.heroFSM.state === 'swing') {
				
                const direction = new Phaser.Math.Vector2(this.boss2.x - this.hero.x, this.boss2.y - this.hero.y).normalize().scale(75);
                this.boss2.x = this.boss2.x + direction.x
				this.boss2.y = this.boss2.y + direction.y
				this.boss2.setVelocity(direction.x, direction.y);
                console.log(direction.x)
				
				
				this.boss2.takeDamage(1);
                this.time.delayedCall(200, () => {
                    this.boss2.setVelocity(0, 0);
					punchright = 0;
					punchleft = 0;
                });
            } else {
				
				if(this.boss2.x > this.hero.x && this.boss2.y < this.hero.y+10){
					
				
				this.boss2.anims.play('walk-down5', true);
				this.hero.setDepth(1); // Ensure hero is drawn above the boss2
				this.boss2.setDepth(0); // Ensure boss2 is drawn below the hero
				const direction2 = new Phaser.Math.Vector2(this.boss2.x - this.hero.x, this.boss2.y - this.hero.y).normalize().scale(655);
				punchleft = 1;
				this.hero.setVelocity(-direction2.x, -direction2.y);
				
				this.time.delayedCall(200, () => {
                    this.hero.setVelocity(0, 0);
					punchleft = 0;
                });
				
				
				this.hero.x = this.hero.x - direction2.x/100
				this.hero.y = this.hero.y - direction2.y/100
				
				}
				
				if(this.boss2.x < this.hero.x && this.boss2.y < this.hero.y+10){
				
				this.boss2.anims.play('walk-up5', true);
				this.hero.setDepth(1); // Ensure hero is drawn above the boss2
				this.boss2.setDepth(0); // Ensure boss2 is drawn below the hero	
				const direction2 = new Phaser.Math.Vector2(this.boss2.x - this.hero.x, this.boss2.y - this.hero.y).normalize().scale(655);
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
			if(this.boss2.x > this.hero.x){
				this.boss2.anims.play('walk-left5', true);
			} else {
				this.boss2.anims.play('walk-right5', true);
	
			}
			}
  
		}


this.enemies.forEach(enemy2 => {
	
	
        
        enemy2.update(this.hero);
    });


this.bosses.forEach(boss => {
	
	boss.update(this.hero);
        
        boss.update(this.hero);
    });



    if (Phaser.Input.Keyboard.JustDown(this.keys.QKey)) {

		this.scene.start('playScene2');
		alert("You are about to restart the level");
    }

    this.enemies.forEach(enemy2 => {
        if (Math.abs(enemy2.x - this.hero.x) > 20 || Math.abs(enemy2.y - this.hero.y) > 20) {
            //enemy2.update(this.hero);
        }
    });

    this.enemies.forEach(enemy2 => {
        if (this.physics.overlap(this.hero, enemy2)) {
            if (this.heroFSM.state === 'swing') {
                //const direction = new Phaser.Math.Vector2(enemy2.x - this.hero.x, enemy2.y - this.hero.y).normalize().scale(600);
                //enemy2.setVelocity(direction.x, direction.y);
                //enemy2.takeDamage(1);
                this.time.delayedCall(500, () => {
                    //enemy2.setVelocity(0, 0);
                });
            }
        }
    });
	
	
	
	



    this.enemies.forEach(enemy2 => {
        //enemy2.anims.play('walk-down2', true);
        //enemy2.healthText.setPosition(enemy2.x - 9, enemy2.y - 20);
    });
	
	
	this.bosses.forEach(boss => {
		
		
		
        if (this.physics.overlap(this.hero, boss)) {
	
            if (this.heroFSM.state === 'swing') {
				
                const direction = new Phaser.Math.Vector2(boss.x - this.hero.x, boss.y - this.hero.y).normalize().scale(75);
                boss.x = boss.x + direction.x
				boss.y = boss.y + direction.y
				boss.setVelocity(direction.x, direction.y);
                console.log(direction.x)
				
				
				boss.takeDamage(1);
                this.time.delayedCall(200, () => {
                    boss.setVelocity(0, 0);
					punchright = 0;
					punchleft = 0;
                });
            } else {
				
				if(boss.x > this.hero.x && boss.y < this.hero.y+10){
					
				
				boss.anims.play('walk-down5', true);
				this.hero.setDepth(1); // Ensure hero is drawn above the boss2
				boss.setDepth(0); // Ensure boss2 is drawn below the hero
				const direction2 = new Phaser.Math.Vector2(boss.x - this.hero.x, boss.y - this.hero.y).normalize().scale(655);
				punchleft = 1;
				this.hero.setVelocity(-direction2.x, -direction2.y);
				
				this.time.delayedCall(200, () => {
                    this.hero.setVelocity(0, 0);
					punchleft = 0;
                });
				
				
				this.hero.x = this.hero.x - direction2.x/100
				this.hero.y = this.hero.y - direction2.y/100
				
				}
				
				if(boss.x < this.hero.x && boss.y < this.hero.y+10){
				
				boss.anims.play('walk-up5', true);
				this.hero.setDepth(1); // Ensure hero is drawn above the boss2
				boss.setDepth(0); // Ensure boss2 is drawn below the hero	
				const direction2 = new Phaser.Math.Vector2(boss.x - this.hero.x, boss.y - this.hero.y).normalize().scale(655);
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
			if(boss.x > this.hero.x){
				boss.anims.play('walk-left5', true);
			} else {
				boss.anims.play('walk-right5', true);
	
			}
			}
  
		}
        boss.healthText.setPosition(boss.x - 9, boss.y - 90);
    });
	
	
	


	
	
	if (Phaser.Input.Keyboard.JustDown(this.keys.QKey)) {
        //this.scene.start('playScene2');
		this.spawnEnemies(10);
    }
	
	
	

	if(Math.abs(this.enemy2.x - this.hero.x) > 20 || Math.abs(this.enemy2.y - this.hero.y) > 20){
            //this.enemy2.update(this.hero);
        }
		
		
	if(Math.abs(this.boss2.x - this.hero.x) > 20 || Math.abs(this.boss2.y - this.hero.y) > 20){
            this.boss2.update(this.hero);
        }
		
		
	if (this.physics.overlap(this.hero, this.enemy2)) {
        if (this.heroFSM.state === 'swing') {
        // Calculate knockback direction based on the enemy2's current velocity
        //let knockbackDirection = this.enemy2.body.velocity.clone();

        // If the enemy2 is not currently moving, default to pushing them directly away from the player
        if (knockbackDirection.x === 0 && knockbackDirection.y === 0) {
            //knockbackDirection = new Phaser.Math.Vector2(enemy2.x - this.hero.x, this.enemy2.y - this.hero.y).normalize();
        } else {
            // Otherwise, reverse the direction
            //knockbackDirection.negate();
        }

        const knockbackSpeed = 600; // Adjust the speed to your liking
        //this.enemy2.body.setVelocity(knockbackDirection.x * knockbackSpeed, knockbackDirection.y * knockbackSpeed);

        // Apply damage to the enemy2
        //this.enemy2.takeDamage(1);

        // Optional: Reset enemy2 velocity after a delay to simulate recovery
        this.time.delayedCall(500, () => {
            //this.enemy2.body.setVelocity(0, 0);
        });

        // Accessing time object from the scene
        this.hero.scene.time.delayedCall(500, () => {
            //this.enemy2.setVelocity(0, 0); // You might not need this line since it's already in the delayed call above
        });
    }
    }
	
		
	//this.hero.y = this.hero.y + 10;
	
  // make sure we step (update) the hero's state machine
  this.heroFSM.step();
  
  this.enemy2.anims.play('walk-down2', true);
  
  
  
  
  
  
  this.enemy2.healthText.setPosition(this.enemy2.x-9, this.enemy2.y - 20);


}

}