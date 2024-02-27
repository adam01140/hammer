class Level2_Highres extends Phaser.Scene {
  constructor() {
    super("Level2_Highres");
  }

  create() {
    // Capture keyboard
    this.keys = this.input.keyboard.createCursorKeys();

    // Create map
    this.map = this.add.tilemap("level2_highres_JSON");

    // Add tileset 
    const grays_100px_tileset = this.map.addTilesetImage(
      "grays_100px",
      "grays_100px_img"
    );

    //-------------------------------------------------------------------------
    // BASE COLOR

    this.map.createLayer("BaseColor", grays_100px_tileset, 0, 0);

    //-------------------------------------------------------------------------
    // BACKGROUND LAYER

    this.backgroundObjectLayer = this.map.getObjectLayer("Background");

    this.backgroundObjectLayer.objects.forEach((object) => {
      const sprite = this.add.sprite(
        object.x,
        object.y,
        // 🌺 4. Get the saved image key from registry.
        getCollectionReference(this, "shapes_highres", object.gid)
      );
      sprite.setOrigin(0, 1);
    });

    //-------------------------------------------------------------------------
    // MIDGROUND  LAYER

    this.midgroundObjectLayer = this.map.getObjectLayer("Midground");

    this.midgroundObjectLayer.objects.forEach((object) => {
      const sprite = this.add.sprite(
        object.x,
        object.y,
        // 🌺 4. Get the saved image key from registry.
        getCollectionReference(this, "shapes_highres", object.gid)
      );
      sprite.setOrigin(0, 1);
      sprite.setTint(0xd4d4d4);
    });

    //-------------------------------------------------------------------------
    // FOREGROUND LAYER

    let foregroundLayerObjects = this.map.getObjectLayer("Foreground");

    foregroundLayerObjects.objects.forEach((object) => {
      const sprite = this.add.sprite(
        object.x,
        object.y,
        // 🌺 4. Get the saved image key from registry.
        getCollectionReference(this, "shapes_highres", object.gid)
      );
      sprite.setOrigin(0, 1);

      // Set a single tree to the green color

      // (Check out the object's "name" property in Tiled...)
      if (object.name === "greenTree") {
        sprite.setTint(0x8cee7c);
      }
    });

    //-------------------------------------------------------------------------
    // PLATFORM LAYER

    const platformLayer = this.map.createLayer(
      "Platforms",
      grays_100px_tileset,
      0,
      0
    );

    // Collide with all tiles in the platformLayer
    platformLayer.setCollisionByExclusion([-1]);

    //-------------------------------------------------------------------------
    // START POSITIONS LAYER

    // Add player at playerStart point from Tiled
    let startPos = this.map
      .getObjectLayer("Positions")
      .objects.find((obj) => obj.name === "playerStart");

    this.player = new PlayerHighres(this, startPos.x, startPos.y, "player", 0, "idle");

    // // Set up player collisions with platforms
    this.physics.add.collider(this.player, platformLayer);

    // Follow player with camera
    this.cameras.main.startFollow(this.player, true, 1, 1, 0, 0);
    this.cameras.main.startFollow(this.player, true, 1, 1, -100, 0);

    // Set zoom & pan camera
    // this.cameras.main.setZoom(0);
    this.cameras.main.setBounds(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    // set gravity and physics world bounds (so collideWorldBounds works)
    this.physics.world.gravity.y = 200;
    this.physics.world.bounds.setTo(
      0,
      0,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

  }

  update() {
    this.playerFSM.step();
  }
}
