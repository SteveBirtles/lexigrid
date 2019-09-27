let w = 0, h = 0;

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('lexiCanvas');
    canvas.width = w;
    canvas.height = h;
}

let grid = [];

let mousePosition = {x: 0, y: 0}, leftMouseDown = false, rightMouseDown = false;    // Also from JavaScript lesson 3

function pageLoad() {

    for (let i = 0; i < 8; i++) {     // Create the grid array, 8x8, initially all 'white';
      let row = [];
      for (let j = 0; j < 8; j++) {
        row.push('white');
      }
      grid.push(row);
    }

    window.addEventListener("resize", fixSize);
    fixSize();

    window.requestAnimationFrame(redraw);

    /* Code from JavaScript lesson 3 */

    const canvas = document.getElementById('lexiCanvas');

   canvas.addEventListener('mousemove', event => {
       mousePosition.x = event.clientX;
       mousePosition.y = event.clientY;
   }, false);

   canvas.addEventListener('mousedown', event => {
       if (event.button === 0) {
           leftMouseDown = true;
       } else {
           rightMouseDown = true;
       }
   }, false);

   canvas.addEventListener('mouseup', event => {
       if (event.button === 0) {
           leftMouseDown = false;
       } else {
           rightMouseDown = false;
       }
   }, false);

   canvas.oncontextmenu = function (e) {
       e.preventDefault();
   };

   /* End! */

}

function redraw() {

    const canvas = document.getElementById('lexiCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'navy';    // Clear the background
    context.fillRect(0,0,w,h);

    if (leftMouseDown || rightMouseDown) {      // If either mouse button clicked

      let clickI = Math.floor((mousePosition.x - w/2 + 512) / 128); // Work out where you clicked
      let clickJ = Math.floor((mousePosition.y - h/2 + 512) / 128);

      if (clickI >= 0 && clickJ >= 0 && clickI < 8 && clickJ < 8) {  // Did you click inside the grid?
        if (leftMouseDown) grid[clickI][clickJ] = 'red';
        if (rightMouseDown) grid[clickI][clickJ] = 'white';
      }

    }

    for (let i = 0; i < 1024; i += 128) {     // Two dimensional loop to draw the grid
      for (let j = 0; j < 1024; j += 128) {

        context.fillStyle = grid[i/128][j/128];     // Get the fill colour from the grid array

        let x = w/2 - 512 + i+8;      // Work out x and y pixel coordinate
        let y = h/2 - 512 + j+8;
        context.fillRect(x, y, 112, 112);     // Draw it!
      }
    }

    window.requestAnimationFrame(redraw);   // Do it again

}
