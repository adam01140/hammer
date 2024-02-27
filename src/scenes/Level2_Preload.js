class Level2_Preload extends Phaser.Scene {
  constructor() {
    super("Level2_Preload");
  }

  preload() {

    let loadingBar = this.add.graphics();

    this.load.on("progress", (value) => {
      loadingBar.clear(); 
      loadingBar.fillStyle(0xffffff, 1); 
      loadingBar.fillRect(0,  this.cameras.main.centerY, value, 5); 
    });


    this.load.path = "./assets/level2_highres/";

    // 🌺 1. Save JSON path so we can use it for *both*  
    //       LoadJSON and this.load.tilemapTiledJSON()
    const JSONFilename = "level2_highres.json";

    // 🌺 2. Save relevant sections of JSON to the scene registry, 
    //       to be used later by loadSaveCollection()
    loadJSON(this, JSONFilename, this.load.path + JSONFilename);

    // Load tilemaps
    this.load.tilemapTiledJSON("level2_highres_JSON", JSONFilename);

    /* Preload tile map */
    this.load.image("grays_100px_img", "tilesets/grays_100px.png");

    // Preload spritesheet
    this.load.spritesheet("character", "spritesheets/MedievalRangerRun.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // 🌺 3. Use saved JSON data in the registry to load
    //       the individual files from an object collection and save
    //       the keys in their own new array.
    loadSaveCollection(this, "shapes_highres", this.registry.get(JSONFilename));

    this.load.on("complete", () => {
      loadingBar.destroy();
      this.scene.start("Level2_Highres");
    });
    
  }
}
