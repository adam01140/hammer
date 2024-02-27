// 🌺 useImageCollections.js
// -------------------------------
// Automate the use of image collections with Tiled
//
// Created Feb 17, 2024 by Nate Laffan


// loadJSON
// ----------------------------
// Synchronously load JSON in to the scene registry.

function loadJSON(scene, key, filePath) {
  
  // Create a synchronous (blocking) request to get JSON
  var request = new XMLHttpRequest();
  request.open("GET", filePath, false); // false for synchronous request
  request.send(null);

  // If there's a response, load the full JSON in to the registry
  if (request.status === 200) {
    scene.registry.set(key, JSON.parse(request.responseText));
  } else {
    throw new Error("Failed to load file");
  }
}


// loadSaveCollection
// ----------------------------
// Saves the tile array for the collection in question and loads
// all images from that array in to the scene.

function loadSaveCollection(scene, collectionName, JSON) {
  
  // Get the correct tileset
  const tileset = JSON.tilesets.find(
    (tileset) => tileset.name === collectionName
  );

  if ( !tileset) {
    console.error(`loadSaveCollection.js cannot find "${collectionName}" tileset`)
  }

  // Save the collection to the global registry
  scene.registry.set(collectionName, tileset);

  // Load each image in the tileset to scene 
  // with the filename as the key
  tileset.tiles.map((tile) => {
    const key = tile.image.split("/").pop().split(".")[0];
    const url = tile.image;
    scene.load.image(key, url);
  });

}


// getCollectionReference
// ----------------------------
// Returns the key of the image stored by loadSaveCollection()
// so it can be used in the scene.


function getCollectionReference(scene, collectionName, gid) {
  
  // Get the collection from the registry
  const collection = scene.registry.get(collectionName);
  // Figure out what the ID is
  const targetId = gid - collection.firstgid;
  // Get the correct tile object.
  const imgObj = collection.tiles.find((tile, i) => tile.id === targetId );
  // Return the key, which is the filename.
  return imgObj.image.split("/").pop().split(".")[0]
  
}