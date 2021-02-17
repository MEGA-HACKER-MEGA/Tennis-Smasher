var playerPaddle, computerPaddle, ball, edges, speed
var gamestate = "serve";
var compscore = 0;
var playscore = 0;
function setup(){
  
  playerPaddle = createSprite(390, 200, 10, 70);
  playerPaddle.shapeColor="grey";
  computerPaddle = createSprite(10, 200, 10, 70);
  ball = createSprite(200,200,10,10);
  
  edges = createEdgeSprites(); 
}

function draw(){
  background("pink");
  fill("white")
  text(compscore, 170,20);
  fill("white")
  text(playscore, 230,20);
  if (gamestate === "serve"){
  fill("white");
  textFont("Monospace");
  text("Press space to serve",150,150);
  } ; 
  

  if(keyDown("space") && gamestate === "serve"){
    serve();
    gamestate = "play";
  }
  
  playerPaddle.y = mouseY;
  computerPaddle.y = ball.y;
  
  net();
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  
  if(ball.x > 400 || ball.x < 0){
    reset();
    gamestate = "serve";
    if(ball.x > 0){
      compscore = compscore + 1;
    }
    if(ball.x > 400){
      playscore = playscore + 1;
    }
  }
  if (playscore === 5 || compscore === 5){
    gamestate = "over";
    text("Game Over!", 170, 160);
    text("Press 'R' to restart", 150, 180);
  }
  if (keyDown("r") && gamestate === "over"){
    gamestate = "serve";
    compscore = 0;
    playscore = 0;
  }
  drawSprites();
}
function net(){
  for(var n=0; n<400; n=n+20){
    stroke("#ffffff");
    line(200,n,200,n+10);
  }}
function serve(){
  var speed = document.getElementById("pace").value;
    ball.velocityX = speed;
    ball.velocityY = 5;
}
function reset(){

  ball.velocityX = 0;
  ball.velocityY = 0;
  
  ball.x = 200;
  ball.y = 200;
}