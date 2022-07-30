
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var balls = [];
var score = 0;
  var gamestate = 0;


function preload(){
 orangepeel_img =loadImage("./Assets/Orangepeel.png");
 dryleaf_img = loadImage("./Assets/dryLeaf.png");
 carrot_img = loadImage("./Assets/Carrot.png");
 brokenBulb_img = loadImage("./Assets/bulb.png");
 plastic_img = loadImage("./Assets/plastic.png");
 can_img = loadImage("./Assets/can.png");
 BG_img = loadImage("./Assets/Capture.JPG");
 obstaclesGroup = new Group();
 fuelsGroup = new Group();
 orangeG = new Group();
}

function setup() {
  createCanvas(800,800);
 
  engine = Engine.create();
  world = engine.world;
  angleMode(DEGREES);
  angle = 15;
  cannon = new Cannon(170, 673, 105, 90, angle);
  


}

function draw(){
  background(BG_img);
  drawSprites();
  Engine.update(engine);

  fill("white");
   textSize(19);
    text("Hello player!!! in this game, you will have to shoot the non-biodegradable  ",width/2-360,height/2-300);
    text("waste before it reaches the ground and pollutes it ",width/2-280,height/2-250);
    text("To shoot you must press the down arrow key, to increase and decrease the angle of the",width/2-370,height/2-200);
    text(" canon,you need to press right and left arrow key respectively ",width/2-280,height/2-150);

  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
    }

     fill("white");
     textSize(30);
     text(`Score:${score}`, width - 200, 50);
     textAlign(CENTER, CENTER);
     cannon.display();
 spawnObstacles();
 spawnFuels();

 if(obstaclesGroup.collide(balls[i])){
   console.log("collided");
 }
  }




function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBall.trajectory = [];
    Matter.Body.setAngle(cannonBall.body, cannon.angle);
    balls.push(cannonBall);
  }
}

function showCannonBalls(ball) {
  if (ball) {
    ball.display();
    ball.animate(); 
    }
  }


function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

   function spawnObstacles(){
  if (frameCount % 150 === 0){
    var obstacle = createSprite(Math.round(random(400,750)),Math.round(random(320, 400)), 10, 10);
     
    
     //generate random obstacles
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: obstacle.addImage(can_img);
               break;
       case 2: obstacle.addImage(plastic_img);
               break;
       case 3: obstacle.addImage(brokenBulb_img);
               break;
       default: break;
     }
    
     //assign scale to the obstacle           
     obstacle.scale = 0.4;
     obstacle.velocityY = 2;
    
    //add each obstacle to the group
     obstaclesGroup.add(obstacle);
  }
   }

   function spawnFuels(){
    if (frameCount % 300 === 0){
      var fuel= createSprite(Math.round(random(400, 800)),Math.round(random(200, 300)), 10, 10);
      fuel.velocityY = 2;;
       //generate random obstacles
       var rand = Math.round(random(1,3));
       switch(rand) {
         case 1: fuel.addImage(carrot_img);
                 break;
         case 2: fuel.addImage(dryleaf_img);
                 break;
         case 3: fuel.addImage(orangepeel_img);
                 break;
         default: break;
       }
      
       //assign scale to the obstacle           
       fuel.scale = 0.3;
       
      
      //add each obstacle to the group
       fuelsGroup.add(fuel);
    }
     }

    


  


