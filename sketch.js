
var monkey , monkey_running;

var banana ,bananaImage, obstacle, obstacleImage;

var spawnfood, spawnobstacle;

var FoodGroup, obstacleGroup;

var ground;

var survivalTime;

function preload(){
  
monkey_running =     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
createCanvas(400, 400);
  
FoodGroup = new Group();
obstacleGroup = new Group();
  
survivalTime = 0;

monkey = createSprite(80,315,20,20);
monkey.addAnimation("running",monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(400,350,900,10);
  
monkey.setCollider("circle",0,0,240);
monkey.debug = false;
  
}


function draw() {
  
  background("white");

  ground.velocityX = -3;
  
  
  if(ground.x<0){
     ground.x = ground.width/2;
     }
  
  if(keyDown("space")){
  monkey.velocityY = -8;
  }
  
  if(monkey.y<200){
     monkey.velocityY = 8;
     }
  
  monkey.collide(ground);
  
  if(obstacleGroup.isTouching(monkey)){ 
    ground.velocityX = 0; 
    monkey.velocityY = 0; 
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    obstacleGroup.setLifetimeEach(-1); 
    FoodGroup.setLifetimeEach(-1);
    FoodGroup.destroyEach();
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: "+survivalTime,100,50);
    
  spawnfood();
  spawnobstacle();
  
  drawSprites();
  
}

function spawnfood(){
  
  if(frameCount%80 ===0){
  
    var banana = createSprite(300,165,20,20);
    
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
    
}
}
  
  function spawnobstacle(){
    
    if(frameCount%300 ===0){
  
    var obstacle = createSprite(300,165,20,20);
    
    obstacle.y = Math.round(random(320,320));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    obstacleGroup.add(obstacle);
      
}
  }
