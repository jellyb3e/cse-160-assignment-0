// DrawTriangle.js (c) 2012 matsuda
var canvas;
var ctx;

function main() {  
  // Retrieve <canvas> element
  canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  ctx = canvas.getContext('2d');
  clearScreen();

  var vecDrawButton = document.getElementById("vecDrawSubmit");
  vecDrawButton.addEventListener("click", handleDrawEvent);

  var opButton = document.getElementById("opSubmit");
  opButton.addEventListener("click", handleDrawOperationEvent);
}

function drawVector(v, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(0,0);
  ctx.lineTo(v.elements[0] * 20, v.elements[1] * 20);
  ctx.stroke();
}

function handleDrawEvent() {
  clearScreen();

  //v1
  let v1x = document.getElementById("v1x").value;
  let v1y = document.getElementById("v1y").value;
  let v1 = new Vector3([v1x,v1y,0]);
  drawVector(v1,"red");

  //v2
  let v2x = document.getElementById("v2x").value;
  let v2y = document.getElementById("v2y").value;
  let v2 = new Vector3([v2x,v2y,0]);
  drawVector(v2,"blue");
}

function clearScreen() {
  ctx.reset();

  // set canvas background
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
  ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);

  setCartesianCoords();
}

function setCartesianCoords() {
  ctx.translate(canvas.clientWidth/2,canvas.clientHeight/2);
  ctx.scale(1, -1);
}

function handleDrawOperationEvent() {
  clearScreen();

  //v1
  let v1x = document.getElementById("v1x").value;
  let v1y = document.getElementById("v1y").value;
  let v1 = new Vector3([v1x,v1y,0]);
  drawVector(v1,"red");

  //v2
  let v2x = document.getElementById("v2x").value;
  let v2y = document.getElementById("v2y").value;
  let v2 = new Vector3([v2x,v2y,0]);
  drawVector(v2,"blue");

  // check selected operation
  let op = document.getElementById("opSelect").value;
  if (op == "add" || op == "sub") {
    v1[op](v2);
    drawVector(v1,"green");
  } else if (op == "mul" || op == "div") {
    let scalar = document.getElementById("scalar").value;
    v1[op](scalar);
    v2[op](scalar);
    drawVector(v1,"green");
    drawVector(v2,"green");
  } else if (op == "ang") {
    console.log(`Angle: ${angleBetween(v1, v2)}`);
  } else if (op == "area") {
    console.log(`Area of the triangle: ${areaTriangle(v1,v2)}`);
  } else if (op == "mag") {
    console.log(`v1 mag: ${v1.magnitude()}`);
    console.log(`v2 mag: ${v2.magnitude()}`);
  } else {  // normalize operation
    v1.normalize();
    v2.normalize();
    drawVector(v1,"green");
    drawVector(v2,"green");
  }
}

function angleBetween(v1, v2) {
  // dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha)
  // dot / (magv1 * magv2) = cos(alpha)
  const dot = Vector3.dot(v1,v2);
  const mv1 = v1.magnitude();
  const mv2 = v2.magnitude();

  return Math.acos(dot / (mv1 * mv2)) * (180 / Math.PI);
}

function areaTriangle(v1, v2) {
  // ||v1 x v2]]  equals to the area of the parallelogram that the vectors span
  const cross = Vector3.cross(v1,v2);
  const m = cross.magnitude();
  return m / 2;
}