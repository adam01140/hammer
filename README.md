# Tiny World Builder

This is a simplest-possible demo to build tiny worlds with. Included is a character with basic movement control, a Tiled project file and a helper script (useImageCollections.js) to assist with the import of image collections that have been used in object layers.

##  🌺 useImageCollections.js

These helper functions allow the user to (1) load the Tiled JSON data in to the project registry, (2) load all of the associated images in to the project and (3) access the images keys when creating sprites.

Basic usage is laid out in the code itself, denoted by numbered 🌺 emojis. You'll see 1, 2 & 3 in Level1_Preload.js, alongside #4 in Level1_Pixel.js, when image keys are being accessed. 

## Pixel Res / High Res

There are two playable versions of the project : a pixel art version and a high-res version.  Pixel art is the default, but if you would like to use high-res images do the following : 

1. In the `<head>` of index.html comment out the pixel art lines and remove comments from the high-res lines : 

```html
  <!-- <script src="./src/prefabs/PlayerPixel.js"></script>
    <script src="./src/scenes/Level1_Preload.js"></script>
    <script src="./src/scenes/Level1_Pixel.js"></script>  -->

    <script src="./src/prefabs/PlayerHighres.js"></script>
    <script src="./src/scenes/Level2_Preload.js"></script>
    <script src="./src/scenes/Level2_Highres.js"></script>
```

2. In the main.js comment out the Pixel scenes and uncomment the high-res scenes

```js
  // scene: [Level1_Preload, Level1_Pixel],
  scene: [Level2_Preload, Level2_Highres],
```

## Credits
The main code is simply a mashup of [Nathan Altice's demos](https://github.com/nathanaltice), with special emphasis on [mappy](https://github.com/nathanaltice/Mappy) for the tiled integration and physics setup, alongside [FSM]( https://github.com/nathanaltice/FSM) for player movement & animations.

The running sprite was taken [Quin N's Free Platformer Character](https://quin-n.itch.io/free-platformer-character)


