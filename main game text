//create all the variables here

//all the levels and edges
var level, edges, edges1;
//for the first gamestate there is a button and text
var button1, button1_img;

//next game is the maze game
var treasure, treasure_img, thief1, thief_img1, obGroup;

//next game is the infinte runner game
var police, policeGroup, police_img, ground, scene_img, coin, coinGroup, coin_img, button2, button2_img, PLAY, END, score, gameState, gameOver, gameOver_img, restart, restart_img, thief2, thief_img2;














function preload() {

  //animation of thief
  thief_img1 = loadAnimation("thief1.png", "thief2.png", "thief3.png", "thief4.png", "thief5.png");

  thief_img2 = loadAnimation("thief1.png", "thief2.png", "thief3.png", "thief4.png", "thief5.png");



}


function setup() {

  createCanvas(800, 500)
  //defining the first level
  level = "level_1";
  edges = createEdgeSprites();
  edges1 = createEdgeSprites();

  //1st screen
  button1 = createSprite(700, 440, 50, 10)
  //maze game
  thief1 = createSprite(84, 398, 20, 20);
  thief1.addAnimation("stealing1", thief_img1);
  thief1.scale = 0.5;
  thief1.visible = false;
  //treasure
  treasure = createSprite(680, 50);
  treasure.visible = false;

  obGroup = new Group();

  //******************************* */
  thief2 = createSprite(50, 390, 20, 20);
  thief2.addAnimation("stealing2", thief_img2);
  thief2.scale = 0.5;
  thief2.visible = false;

  ground = createSprite(400, 460, 1600, 20);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  PLAY = 1;
  END = 0;
  gameState = PLAY;
  score = 0;

  gameOver = createSprite(300, 100);
  gameOver.visible = false;
  restart = createSprite(300, 140);
  restart.shapeColor = "green"
  restart.visible = false;

  policeGroup = new Group();
  coinGroup = new Group();

  button2 = createSprite(300, 20, 100, 10);
  button2.shapeColor = "black";
  button2.visible = false;

  //********************************************* */






}





function draw() {
  background(255);

  if (mousePressedOver(button1)) {
    level = "level_2"
  }

  //maze game

  if (level === "level_2") {

    thief1.visible = true;
    button1.visible = false;
    treasure.visible = true;

    obs();

    if (thief1.isTouching(obGroup)) {
      thief1.x = 84
      thief1.y = 394
    }
    thief1.collide(edges[0]);
    thief1.collide(edges[1]);
    thief1.collide(edges[2]);
    thief1.collide(edges[3]);

    //movement of thief
    if (keyDown("up")) {
      thief1.y += -5;
    }
    if (keyDown("down")) {
      thief1.y += 5;
    }
    if (keyDown("left")) {
      thief1.x += -4;
    }
    if (keyDown("right")) {
      thief1.x += 4;
    }

    //thief touches treasure

    if (thief1.isTouching(treasure)) {
      level = "level_3";
    }
  }

  //********************************************* */
  //infinte runner game

  if (level === "level_3") {
    treasure.visible = false;
    ground.visible = true;
    obGroup.destroyEach();
    thief1.visible = false;
    thief2.visible = true;



    textSize(20)
    text("Score: " + score, 600, 50);

    if (gameState === PLAY) {



      if (coinGroup.isTouching(thief2)) {
        score = score + 1;
        coinGroup.destroyEach();
      }

      ground.velocityX = -(6 + 3 * score / 100);

      if (keyDown("space")) {
        thief2.velocityY = -12;
      }

      thief2.velocityY = thief2.velocityY + 0.8

      if (ground.x < 0) {
        ground.x = ground.width / 2;
      }

      thief2.collide(ground);

      spawnCoins();
      spawnPolice();

      if (policeGroup.isTouching(thief2)) {
        gameState = END;
      }
    }
    else if (gameState === END) {
      // button2.visible = true;

      gameOver.visible = true;
      restart.visible = true;

      //set velcity of each game object to 0
      ground.velocityX = 0;
      thief2.velocityY = 0;
      policeGroup.setVelocityXEach(0);
      coinGroup.setVelocityXEach(0);

      //change the thief animation
      //thief.changeAnimation("collided", thief_collided);

      //set lifetime of the game objects so that they are never destroyed
      policeGroup.setLifetimeEach(-1);
      coinGroup.setLifetimeEach(-1);

      if (mousePressedOver(restart)) {
        reset();
      }


    }


  }
  drawSprites();
  text(mouseX + "," + mouseY, mouseX, mouseY);

}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;

  coinGroup.destroyEach();
  policeGroup.destroyEach();

  // thief.changeAnimation("running",thief_running);


  score = 0;

}
function spawnCoins() {

  if (frameCount % 200 === 0) {
    coin = createSprite(800, 320, 40, 10);
    coin.y = Math.round(random(180, 320));
    //coin.addImage(cloudImage);
    //coin.scale = 0.5;
    coin.velocityX = -3;

    //assign lifetime to the variable
    coin.lifetime = 270;

    //adjust the depth
    //coin.depth = thief2.depth;
    //thief2.depth = thief2.depth + 1;

    //add each cloud to the group
    coinGroup.add(coin);
  }

}

function spawnPolice() {
  if (frameCount % 160 === 0) {
    var police = createSprite(800, 465, 10, 40);
    //obstacle.debug = true;
    police.velocityX = -(6 + 3 * score / 100);


    //assign scale and lifetime to the obstacle           
    // obstacle.scale = 0.5;
    police.lifetime = 600;
    //add each obstacle to the group
    policeGroup.add(police);
  }
}


function obs() {
  var ob1 = createSprite(100, 20, 100, 30)

  obGroup.add(ob1);
}