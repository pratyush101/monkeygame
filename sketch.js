
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;
var ground,invisibleground;
var gameState = PLAY;
var PLAY = 1;
var END = 0;
var score;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600, 200);
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  monkey = createSprite(30,146,20,50); 
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(200,180,800,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  //console.log(ground.x);
  
  
  invisibleGround = createSprite(200,180,400,10);
  invisibleGround.visible = false;
  invisibleGround.x=ground.width/2; 
  
  
  
  
  
}


function draw() {
background("red");

  
  
  
  
  if(gameState===PLAY){

   if(ground.x<0){
     
     ground.x=ground.width/2;
     
   }
  
  if(invisibleGround.x<0){
     
     invisibleGround.x=invisibleGround.width/2;
     
   }
  
  invisibleGround.velocityX=-6;
  
  
  if(keyDown("space")&&monkey.isTouching(ground)){
    
    monkey.velocitY=-20;
    
  }
    score=Math.round(frameCount/3);
    survivalTime=Math.ceil(frameCount/frameRate());
    ground.velocityX= -(5 + 2 * score / 100);
    
    
    if(monkey.isTouching(FoodGroup)){
      
      FoodGroup.destroyEach();
      
    }
    
    if(monkey.isTouching(obstacleGroup)){
      gameState=END;
      
      
    }
    
    
    
    }else if(gameState===END){
      ground.velocityX=0;
      invisibleground.velocityX=0;
      FoodGroup.setVelocityEach(0);
      obstacleGroup.setVelocityEach(0);
      
      FoodGroup.setlifetimeEach(-1);
      obstacleGroup.setlifetimeEach(-1);
      
    }
  
  monkey.velocityY=monkey.velocityY+0.9;
  monkey.collide(invisibleground);
  
   stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50);
  
  
    stroke("white");
  textSize(20);
  fill("white");
  survivalTime=Math.ceil(frameCount/frameRate());  
  text("survival Time: "+ survivalTime, 100,50);   
  
  
  
drawSprites(); 
}

function food(){
  if(frameCount%80===0){
    var banana=createSprite(500,10,10,20);
    banana.addImage(bananaImage);
    banana.velocityX= -(5+2*score/100);
    banana.y=Math.round(random(120,200));
    FoodGroup.add(banana);
    banana.scale=0.1;
    FoodGroup.setlifetimeEach(50);
    banana.setCollider("rectangle",0,0,400,400);
    
  }
  }

function obstacle(){
  if(frameCount%300===0){
    
   var obstacle=createSprite(500,365,23,32);
   obstacle.addImage(obstaceImage); 
   obstacle.velocityX= -(5+2*score/100);
   obstacleGroup.add(obstacle);
   obstacle.addImage(obstaceImage); 
   obstacleGroup.setlifetimeEach(50);
   obstacle.setCollider("circle",0,0,200); 
    }
    }
