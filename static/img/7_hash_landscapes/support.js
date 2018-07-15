'use strict';

// Define a bunch of global settings. If you want to use a different tile size, adjust these numbers.
let tile_width_step = 32; // A width step is half a tile's width
let tile_height_step = 14.5; // A height step is half a tile's height
let sprite_width = 96;
let sprite_height = 194;
let sprite_margin_left = 16;
let sprite_margin_top = 82;

//Larger tile dimensions...
//let tile_width_step = 64; // A width step is half a tile's width
//let tile_height_step = 28.5; // A height step is half a tile's height
//let sprite_width = 192;
//let sprite_height = 387;
//let sprite_margin_left = 32;
//let sprite_margin_top = 164;

// Global variables. These will mostly be overwritten in setup().
let tile_rows, tile_columns;
let camera_offset;
let camera_velocity;

/////////////////////////////
// Transforms between coordinate systems
// These are actually slightly weirder than in full 3d...
/////////////////////////////
function worldToScreen([world_x, world_y], [camera_x, camera_y]) {
    let i = (world_x - world_y) * tile_width_step;
    let j = (world_x + world_y) * tile_height_step;
    return [i + camera_x, j + camera_y];
}

function worldToCamera([world_x, world_y], [camera_x, camera_y]) {
    let i = (world_x - world_y) * tile_width_step;
    let j = (world_x + world_y) * tile_height_step;
    return [i, j];
}

function tileRenderingOrder(offset) {
    return [offset[1] - offset[0], (offset[0] + offset[1])];
}

function screenToWorld([screen_x, screen_y], [camera_x, camera_y]) {
    screen_x -= camera_x;
    screen_y -= camera_y;
    screen_x /= tile_width_step * 2;
    screen_y /= tile_height_step * 2;
    screen_x += 0.5;
    return [Math.floor((screen_y + (screen_x))),
    Math.floor((screen_y - (screen_x)))];
}

function cameraToWorldOffset([camera_x, camera_y]) {
    let world_x = camera_x / (tile_width_step * 2);
    let world_y = camera_y / (tile_height_step * 2);
    return {x: Math.round(world_x), y: Math.round(world_y)};
}

function preload() {
    myPreload();
}

function setup() {
    let canvas = createCanvas(800,600);
    canvas.parent("container");

    let label = createP();
    label.html("Worldgen key:")
    label.parent("container");
    let input = createInput();
    input.parent("container");
    input.changed(function() {
        myHandleWorldgenStringChange(input.value());
    });

    myHandleWorldgenStringChange("");

    camera_offset = new p5.Vector(0,0);
    camera_velocity = new p5.Vector(0,5);
    
    // Dynamically set the number of tiles that will display on our canvas at once, based on the canvas size.
    tile_columns = Math.ceil( width / (tile_width_step * 2)) + 1;
    tile_rows = Math.ceil( height / (tile_height_step * 2)) + 3; // The +3 is to keep drawing rows after the screen because tall tiles may protrude into the screen area

    mySetup();
}


// mouseClicked is one of the callback handler functions in p5.js. We
// redefine it here to do what we want it to do.
function mouseClicked() {
    let world_pos = screenToWorld([0 - mouseX, mouseY], [camera_offset.x, camera_offset.y]);
    myHandleClick(world_pos[0], world_pos[1]);
}

// And now for the core loop...
function draw() {

    myDraw();

    // Keyboard controls!
    if(keyIsDown(LEFT_ARROW)) {
        camera_velocity.x -= 1;
    }
    if(keyIsDown(RIGHT_ARROW)) {
        camera_velocity.x += 1;
    }
    if(keyIsDown(DOWN_ARROW)) {
        camera_velocity.y -= 1;
    }
    if(keyIsDown(UP_ARROW)) {
        camera_velocity.y += 1;
    }
    
    camera_offset.add(camera_velocity);
    camera_velocity.mult(0.95); // cheap easing
    if(camera_velocity.mag() < 0.01) { camera_velocity.setMag(0);}
    
    let world_pos = screenToWorld([0 - mouseX, mouseY], [camera_offset.x, camera_offset.y]);
    let world_offset = cameraToWorldOffset([camera_offset.x, camera_offset.y]);
    
    for(let y = -3; y < tile_rows; y++) { // Start at negative to draw offscreen
      for (let x = -1; x < tile_columns; x++) {
        drawTile(tileRenderingOrder([x + world_offset.x, y - world_offset.y]), [camera_offset.x, camera_offset.y], world_pos); // odd row
      }
      for (let x = -1; x < tile_columns; x++) {
        drawTile(tileRenderingOrder([x+0.5+world_offset.x,y+0.5-world_offset.y]), [camera_offset.x, camera_offset.y], world_pos); // even rows are offset horizontally
      }
    }

    describeMouseTile(world_pos, [camera_offset.x, camera_offset.y]);

}

function describeMouseTile([world_x, world_y], [camera_x, camera_y]) {
    let [screen_x, screen_y] = worldToScreen([world_x, world_y], [camera_x, camera_y]);
    screen_x -= sprite_margin_left;
    screen_y -= sprite_margin_top;
    screen_x += tile_width_step;
    let height = myTileHeight(world_x, world_y);
    let variation = myTileVariation(world_x, world_y, height);
    let height_offset = height * tile_height_step;
    drawTileDescription(world_x, world_y, variation, [(0 - screen_x), (screen_y - height_offset)]);

}

function drawTileDescription(world_x, world_y, variation, [screen_x, screen_y]) {
    stroke(255, 60);
    fill(255,0,0,60);
    beginShape();
    vertex((screen_x) + sprite_margin_left, (screen_y + (sprite_height/2) - 1));
    vertex((screen_x) + (sprite_width/2), (screen_y + sprite_margin_top));
    vertex((screen_x) + sprite_width - sprite_margin_left, (screen_y + (sprite_height/2) - 1));
    vertex((screen_x)  + (sprite_width/2), (screen_y + sprite_margin_top + tile_height_step + tile_height_step));
    endShape(CLOSE);
    
    textAlign(CENTER);
    textSize(18);
    textStyle(BOLD);
    fill(255,255,255,255);
    text([world_x,world_y], (screen_x) + (sprite_width/2), screen_y + (sprite_height/2) - 1);
    textSize(12);
    textStyle(NORMAL);
    let description_offset = 18;
    text(myTileDescription(world_x,world_y,variation), (screen_x) + (sprite_width/2), screen_y + (sprite_height/2) - 1 + description_offset);
    
}


function drawTile([world_x, world_y], [camera_x, camera_y], [mouse_world_x, mouse_world_y]) {
    let [screen_x, screen_y] = worldToScreen([world_x, world_y], [camera_x, camera_y]);

    screen_x -= sprite_margin_left;
    screen_y -= sprite_margin_top;
    screen_x += tile_width_step;

    let height = myTileHeight(world_x, world_y);
    let variation = myTileVariation(world_x, world_y, height);

    let height_offset = height * tile_height_step;
    
    translate((0 - screen_x), (screen_y - height_offset));
    myDrawTile(world_x, world_y, variation);

    translate(-(0 - screen_x), -(screen_y - height_offset));
}

