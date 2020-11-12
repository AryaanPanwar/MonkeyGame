var PLAY = 1 ;
var END = 0 ;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup
var ground,invisibleGround;
var score;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,335,20,20);
  monkey.scale=0.1;
  monkey.addAnimation("running",monkey_running);
  
  ground = createSprite(400,345 ,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(80,345,600,10);
  invisibleGround.visible=false  ;
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  score = 0;
  
  monkey.setCollider("rectangle",0,0,monkey.weidth,monkey.height);
  monkey.debug=true;
}


function draw() {
  background("lightGreen");
  
  if(gameState===PLAY){
  
  if(ground.x < 0){
     ground.x=ground.width/2;
     }
  if(keyDown("space")){
     monkey.velocityY=-10;  
     }
    
    monkey.velocityY = monkey.velocityY + 0.8;
    
    monkey.collide(invisibleGround);
    obstacle();
    banana();
    
    stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+score,500,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate())
    text("survival Time:"+ survivalTime,100,50)
   
  }
  
    if(obstacleGroup.isTouching(monkey)){
     gameState = END;
    
     }
    
  
   
  
  drawSprites();
  
  if(gameState === END){
    monkey.velocityX=0;
    monkey.velocityY=0;
    obstacleGroup.velocityX=0;
    bananaGroup.velocityX=0;
    ground.velocityX=0;
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
     stroke("white");
    textSize(20);
    fill("white");
    text("Score:"+score,500,50);
    
    stroke("black");
    textSize(20);
    fill("black");
    text("survival Time:"+ survivalTime,100,50)

  }
}
function obstacle(){
  if(frameCount%120===0){
    var obstacle = createSprite(400,302,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX= -6;
    var rand = Math.round(random(120,400));
    obstacle.lifetime=200; 
    
    obstacleGroup.add(obstacle);
  }
}
function banana(){
  if(frameCount%60===0){
     var banana = createSprite(200,200,20,20);
     banana.addImage(bananaImage);
     banana.velocityX=-6;
     banana.scale=0.1;
     var rand = Math.round(random(120,400))
     banana.lifetime=300;
    
     bananaGroup.add(banana);
     
  }
}




