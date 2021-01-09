var fruit,fruit1,frut2,fruit3,fruit4,sword,swordImage,fruitGroup,monster,enemyGroup,monsterImage; 
var gameState = "play";

function preload(){
  fruit1 = loadImage("fruit1.png");
   fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
 fruit4 = loadImage("fruit4.png");
  swordImage = loadImage("sword.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameover= loadImage("gameover.png");
  gameOverSound = loadSound("gameover.mp3");
  swordSound = loadSound("knifeSwooshSound.mp3");
}

function setup(){
  createCanvas(500,500);
  sword = createSprite(250,250);
  sword.addImage(swordImage);
  sword.scale= 0.7;
  fruitGroup= new Group();
  enemyGroup= new Group();
  
  score= 0;
}

function draw(){
background("lightblue");
  if(gameState==="play"){
     sword.x = mouseX;
    sword.y = mouseY;
     fruits();
  enemy();
    if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
      score=score+2;
      swordSound.play();
       }
      else{ if(enemyGroup.isTouching(sword)){
               gameState = "end";
        gameOverSound.play();
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        sword.addImage(gameover);
        sword.x=200;
        sword.y=200;
       
               }
          }
  }
  drawSprites();
  text("Score: "+score,400,50);
}

function fruits(){
  if(frameCount%80===0){
    position=Math.round(random(1,2));
     fruit=createSprite(500,Math.round(random(50,440)),20,20);
    r = Math.round(random(1,4));
    if(position===1){
       fruit.x=500;
      fruit.velocityX= -(7+score/4);
       }else {
      if(position===2){
         fruit.x= 0;
        fruit.velocityX =7+score/4;
         }
    }
    fruit.scale = 0.2;
    fruitGroup.add(fruit);
    if(r===1){
       fruit.addImage(fruit1);
       } else if(r===2){
                 fruit.addImage(fruit2);
                 } else if(r===3){
                   fruit.addImage(fruit3);
                           } else{
      fruit.addImage(fruit4);
    }
     }
}

function enemy(){
  if(frameCount%200===0){
    monster=createSprite(500,Math.round(random(50,440)),20,20);
    monster.addAnimation("moving",monsterImage);
    monster.velocityX = -(7+score/4);
    enemyGroup.add(monster);

     }
}