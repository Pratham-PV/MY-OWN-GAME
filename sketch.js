var bg,bg_img;
var mario,mario_img;
var mushroom,mushroom_img;
var ground,ground_img;
var invisible_ground;
var lives,score;
var gameState="PLAY";
var obstacleGroup;
var restart,restart_img;
var gamesound,ending;

function preload(){
 bg_img=loadImage("backgroumd.png");
 mario_img=loadImage("mario.png");
 mushroom_img=loadImage("mushroom.png");
 ground_img=loadImage("SM.png"); 
 restart_img=loadImage("restart.png");
 gamesound=loadSound("game sound.mp3");
 ending=loadSound("ending.mp3");
}

function setup() {
  createCanvas(700,500);

  bg=createSprite(350,190);
  bg.addImage(bg_img);
  bg.scale=0.5;

  ground=createSprite(690,450);
  ground.addImage(ground_img);

  mario=createSprite(200,340);
  mario.addImage(mario_img);
  mario.scale=0.11
  mario.debug=false;
  mario.setCollider("rectangle",0,0,60,850);

  restart=createSprite(640,40);
  restart.addImage(restart_img);
  restart.scale=0.1
  restart.visible=false;

  invisible_ground=createSprite(350,380,700,20);
  invisible_ground.visible=false;

  lives=3;
  score=0;

  gamesound.loop();

  obstacleGroup=new Group();
  
}

function draw() {
  background(0,0,0);
 
 if(gameState==="PLAY"){
    //to find the Y position of standing mario
    //console.log(mario.y);
    //ground moves to left and scrolls infinitely
     ground.velocityX=-4;
     if(ground.x<0){
        ground.x=690;
      }
      

      //score increases by one unit after every 15 frames
     if(frameCount%15===0){
       score=score+1;
      }

      // mario jumps when the space key is pressed
     if(keyDown("space") && mario.y>=200){
        mario.velocityY=-12;
      }

     //Gravity effect on mario
     //increasing the velocity(accleration) by 0.8 units in downward direction
      mario.velocityY=mario.velocityY+0.8;
     //mario should stand on invisible ground
      mario.collide(invisible_ground)
     //to spawn obstacles 
     obstacles();
     // gameState will change to end when mario touches a mushroom
     if(obstacleGroup.isTouching(mario)){
        gameState="END";
     }

     if(lives===0){
        score=0;
        lives=3;

     }
  }

  else if(gameState==="END"){
         mario.velocityY=0;
         mario.velocityX=0;
         ground.velocityX=0;
         obstacleGroup.setVelocityXEach(0);
         obstacleGroup.setLifetimeEach(-1);
         restart.visible=true;

         if(mousePressedOver(restart)){
            lives=lives-1;
            obstacleGroup.destroyEach();
            gameState="PLAY";
         }
        
  }
 
  
  drawSprites();

  //to display the number of lives and score
  textSize(20);
  stroke("red");
  fill("green")
  text("Lives: "+lives,20,20);
  text("Score: "+score,600,20);
  
}

function obstacles(){
 //one mushroom will be spawned after every 160 frames
 if(frameCount%160===0){
   mushroom=createSprite(800,340);
   mushroom.addImage(mushroom_img);
   mushroom.debug=false;
   mushroom.setCollider("rectangle",0,0,60,200);
   mushroom.velocityX=-2;

   //to spwan obstacles of different sizes
   var s=Math.round(random(1,3));

   switch(s){
      case 1:mushroom.scale=0.075;
            break;
      case 2:mushroom.scale=0.1;
            break;
      case 3:mushroom.scale=0.125;
            break;            

   }

   // to destroy variables in order to save computer memory
   //to avoid memory leak
   mushroom.lifetime=400;
   //mushroom will live for 350 frames  

   obstacleGroup.add(mushroom);

 }
}