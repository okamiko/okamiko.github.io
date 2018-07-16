// Modified landscape & world
// Added assets folder

'use strict';
let worldSeed;
let heightMultiplier;
let dbl, dbh, de, ldl, ldh, le;
let dbl_img, dbh_img, de_img, ldl_img, ldh_img, le_img;

//Implement this
function myPreload() {
    dbl = loadImage("assets/dark-boat-low.png"); // Dark boat low
    dbh= loadImage("assets/dark-boat-high.png"); // Dark boat high
    de = loadImage("assets/dark-empty.png"); // Dark empty
    ldl = loadImage("assets/light-dolphin-low.png"); // Light dolphin low
    ldh = loadImage("assets/light-dolphin-high.png"); // Light dolphin high
    le = loadImage("assets/light-empty.png"); // Light empty
}

//Implement this
function mySetup() {
    dbl_img = createGraphics(sprite_width, sprite_height);
    dbl_img.image(dbl,0,0);
    dbh_img = createGraphics(sprite_width, sprite_height);
    dbh_img.image(dbh,0,0);
    de_img = createGraphics(sprite_width, sprite_height);
    de_img.image(de,0,0);
    ldl_img = createGraphics(sprite_width, sprite_height);
    ldl_img.image(ldl,0,0);
    ldh_img = createGraphics(sprite_width, sprite_height);
    ldh_img.image(ldh,0,0);
    le_img = createGraphics(sprite_width, sprite_height);
    le_img.image(le,0,0);
    heightMultiplier = 6;
}

function myDraw() {
    background(25,25,120); //blue :)
}

//Implement this, draws all the tiles, no moving yet.
function myDrawTile(i, j, variation) {
    switch (variation) {
        case 0:
            image(dbl_img,0,0); //dark boat low
            break;
        case 1:
            image(dbh_img,0,0); //dark boat high
            break;
        case 2:
            image(de_img,0,0); // dark empty
            break;
        case 3:
            image(ldl_img,0,0); // light dolphin low
            break;
        case 4: 
            image(ldh_img,0,0); // light dolphin high
            break;
        case 5:
            image(le_img,0,0); //light empty
            break;
        default:
            break;
    }
}

function myTileDescription(i,j, variation) {
    return "Variation: " + variation;
}

let clickCounts = {};

function myHandleClick(i, j) {
    clickCounts[[i,j]] = 1 + (clickCounts[[i,j]]|0);
}

function getClickCount(i,j) {
    return clickCounts[[i,j]]|0;
}

//Implement this
//The height of a tile depends on time without user interaction via millis()
function myTileHeight(i, j) {
    return noise(5*sin(i/5), 5*sin(j/5), millis()/2000)*heightMultiplier;
}

//Implement this
function myTileVariation(i, j, height) {
    // dark water
    if (noise(i, j) < 0.5) {
        // inital state: empty
        if (noise (i, j) < 7 * (0.5 / 8)) {
            // click to add boat
            if (getClickCount(i, j) % 2) {
                // boat flying
                if (height > heightMultiplier/2) {
                    return 0;
                }
                return 1; // boat on water
            } 
            return 2; // otherwise return empty water
        }

        // inital state: boat
        else {
            // click to empty
            if (getClickCount(i, j) % 2) {
                return 2;
            }
            // boat flying
            else if (height > heightMultiplier/2) {
                return 0;
            }
            // boat on water
            return 1;
        }
    }

    // light water
    else {
        // initial state: empty
        if (noise (i, j) < 2 * (3 * (0.5 / 4))) {
            // click to add dolphin
            if (getClickCount(i, j) % 2) {
                // dolphin flying
                if (height > heightMultiplier/2) {
                    return 4;
                }
                // dolphin on water
                return 3;
            } 
            return 5; // otherwise empty
        }
        // initial state: dolphin
        else {
            // click to empty
            if (getClickCount(i, j) % 2) {
                return 5;
            }
            // dolphin flying
            else if (height > heightMultiplier/2) {
                return 4;
            }
            // dolphin on water
            return 3;
        }
    }
}

//Implement this
function myHandleWorldgenStringChange(key) {
    noiseSeed(key);    
}