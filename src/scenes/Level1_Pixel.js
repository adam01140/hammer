class Level1_Pixel extends Phaser.Scene {
  constructor() {
    super("Level1_Pixel");
  }

  create() {
    // Capture keyboard
    this.keys = this.input.keyboard.createCursorKeys();

    // Create map
    this.map = this.add.tilemap("level1_pixel_JSON");

    // Add tileset 
    const grays_12px_tileset = this.map.addTilesetImage(
      "grays_12px",
      "grays_12px_img"
    );

    //-------------------------------------------------------------------------
    // BASE COLOR

    this.map.createLayer("BaseColor", grays_12px_tileset, 0, 0);

    //-------------------------------------------------------------------------
    // BACKGROUND LAYER

    this.backgroundObjectLayer = this.map.getObjectLayer("Background");

    this.backgroundObjectLayer.objects.forEach((object) => {
      const sprite = this.add.sprite(
        object.x,
        object.y,
        // 🌺 4. Get the saved image key from registry.
        getCollectionReference(this, "shapes", object.gid)
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
        getCollectionReference(this, "shapes", object.gid)
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
        getCollectionReference(this, "shapes", object.gid)
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
      grays_12px_tileset,
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

    this.player = new PlayerPixel(this, startPos.x, startPos.y, "player", 0, "idle");

    // // Set up player collisions with platforms
    this.physics.add.collider(this.player, platformLayer);

    // Follow player with camera
    this.cameras.main.startFollow(this.player, true, 1, 1, 0, 20);

    // Set zoom & pan camera
    this.cameras.main.setZoom(4);
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
    // Scroll the parallax layers

    this.midgroundObjectLayer.tilePositionX = this.cameras.main.scrollX * 0.3;
  }
}
