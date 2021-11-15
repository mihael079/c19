var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  //ghost
  ghost = createSprite(300,300, 10,10);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3
  
  //creating door group
  doorsGroup = new Group();
  
  //creating climber group

  climbersGroup = new Group();
  
  //creating new invisbleblock group
  invisibleBlockGroup = new Group();

  
  
}

function draw() {
  background(200);
  
  if (gameState === "play") {

  //infinite tower
  if(tower.y > 400){
      tower.y = 300
    }

  if (keyDown("space")){
    ghost.velocityY = -5
    
  }
  ghost.velocityY = ghost.velocityY + 1; 

  if (keyDown(LEFT_ARROW)){
    ghost.x = ghost.x -3;
  }
  if (keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x +3;
  }
  spawnDoors();

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
    ghost.destroy();
    gameState = "end"
  }

}
  

    //calling doors
    
    drawSprites();


if (gameState === "end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("Game Over", 230,250)
}

}

function spawnDoors(){
  

  if (frameCount % 240 === 0){
    door = createSprite(100,100,30,30);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(100,500));
    //assign lifetime
    door.lifetime = 600;
    //add members
    doorsGroup.add(door);

    //climbers 

    climber = createSprite(100,160,30,30);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x

    //lifetime
    climber.lifetime = 600;
    // add members
    climbersGroup.add(climber);

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
    ghost.collide(climber);
   
   
     //invisble block 
    var invisibleBlock = createSprite(100,160,climber.width,2);
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.lifetime = 600;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

  }
  

}

