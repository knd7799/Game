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
  //maze game
  thief_img1 = loadAnimation("thief1.png", "thief2.png", "thief3.png", "thief4.png", "thief5.png");

  //infinite game
  thief_img2 = loadAnimation("thief1.png", "thief2.png", "thief3.png", "thief4.png", "thief5.png");

   scene_img = loadImage("background.jpeg");

   treasure_img = loadAnimation("treasure3.png","treasure4.png");

   //button1_img = loadImage("startButton.png");

   police_img = loadAnimation("police1.png","police2.png","police3.png","police4.png");

   coin_img = loadAnimation ("coin1.png","coin2.png","coin3.png","coin4.png","coin5.png","coin6.png");
}


function setup() {

  createCanvas(800, 500)
  //defining the first level
  level = "level_1";
  edges = createEdgeSprites();
  edges1 = createEdgeSprites();

  //1st screen
  button1 = createSprite(700, 440, 50, 10)
  //button1.loadImage("button1_img");
  //maze game
  thief1 = createSprite(84, 398, 20, 20);
  thief1.addAnimation("stealing1", thief_img1);
  thief1.scale = 0.5;
  thief1.visible = false;
  //treasure
  treasure = createSprite(680, 50);
  treasure.addAnimation("money",treasure_img);
  treasure.visible = false;

  obGroup = new Group();
  wallGroup = new Group();

  //******************************* */
  thief2 = createSprite(50, 390, 20, 20);
  thief2.addAnimation("stealing2", thief_img2);
  thief2.scale = 0.5;
  thief2.visible = false;

  ground = createSprite(400, 460, 1600, 20);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  ground.visible = false;

  //ground.addImage("scene_img");

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
    walls();

    if (thief1.isTouching(obGroup)) {
      thief1.x = 84
      thief1.y = 394
    }
    /* if (thief1.isTouching(wallGroup)) {
       thief1.x = 84
       thief1.y = 394
     }*/
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
    // wallGroup.destroyEach();
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
    police = loadAnimation ("cathing",police_img);

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
function walls() {
  var wall1 = createSprite(197, 494, 20,85);
  wall1.shapeColor = "brown";

  var wall2 = createSprite(720, 501, 20, 750);
  wall2.shapeColor = "brown";


  var wall3 = createSprite(670, 440, 260,20);
  wall3.shapeColor = "brown";

  var wall4 = createSprite(775, 190, 90, 20);
  wall4.shapeColor = "brown";

  var wall5 = createSprite(602, 3, 20, 240);
  wall5.shapeColor = "brown";

  var wall6 = createSprite(295, 80, 620, 20);
  wall6.shapeColor = "brown";


  var wall7 = createSprite(470, 150, 20, 150);
  wall7.shapeColor = "brown";


   var wall8 = createSprite(10, 120, 20, 90);
  wall8.shapeColor = "brown";

   var wall9 = createSprite(510, 219, 90,20);
   wall9.shapeColor = "brown";


  var wall10 = createSprite(127, 190, 20, 90);
  wall10.shapeColor = "brown";

  var wall11 = createSprite(224, 228, 210,20);
  wall11.shapeColor = "brown";


  var wall12 = createSprite(0, 340, 280, 20);
  wall12.shapeColor = "brown";


  var wall13 = createSprite(552, 206,20, 40);
  wall13.shapeColor = "brown";

  var wall14 = createSprite(337,240, 20, 180);
  wall14.shapeColor = "brown";

  var wall15 = createSprite(400, 500, 20, 150);
  wall15.shapeColor = "brown";

  var wall16 = createSprite(550, 410, 20, 80);
  wall16.shapeColor = "brown";

  var wall17 = createSprite(25, 345, 40, 5);
  wall17.shapeColor = "brown";

  /*var wall18 = createSprite(25, 298, 5, 100);
  wall18.shapeColor = "brown";

  var wall19 = createSprite(45, 303, 80, 5);
  wall19.shapeColor = "brown";

  var wall20 = createSprite(85, 291, 5, 30);
  wall20.shapeColor = "brown";

  var wall21 = createSprite(5, 170, 150, 5);
  wall21.shapeColor = "brown";

  var wall22 = createSprite(57, 190, 5, 40);
  wall22.shapeColor = "brown";

  var wall23 = createSprite(55, 209, 80, 5);
  wall23.shapeColor = "brown";

  var wall24 = createSprite(15, 240, 5, 60);
  wall24.shapeColor = "brown";

  var wall25 = createSprite(92, 240, 5, 60);
  wall25.shapeColor = "brown";

  var wall26 = createSprite(70, 276, 30, 5);
  wall26.shapeColor = "brown";


  var wall27 = createSprite(23, 150, 5, 40);
  wall27.shapeColor = "brown";

  var wall28 = createSprite(20, 130, 90, 5);
  wall28.shapeColor = "brown";

  var wall29 = createSprite(62, 115, 5, 30);
  wall29.shapeColor = "brown";

  var wall30 = createSprite(78, 100, 40, 5);
  wall30.shapeColor = "brown";

  var wall31 = createSprite(25, 50, 5, 50);
  wall31.shapeColor = "brown";

  var wall32 = createSprite(190, 25, 330, 5);
  wall32.shapeColor = "brown";

  var wall33 = createSprite(55, 71, 60, 5);
  wall33.shapeColor = "brown";

  var wall34 = createSprite(83, 60, 5, 30);
  wall34.shapeColor = "brown";

  var wall35 = createSprite(110, 46, 50, 5);
  wall35.shapeColor = "brown";

  var wall36 = createSprite(134, 105, 5, 120);
  wall36.shapeColor = "brown";

  var wall37 = createSprite(175, 98, 90, 5);
  wall37.shapeColor = "brown";

  var wall38 = createSprite(181, 75, 5, 50);
  wall38.shapeColor = "brown";

  var wall39 = createSprite(220, 89, 5, 20);
  wall39.shapeColor = "brown";

  var wall40 = createSprite(244, 99, 5, 150);
  wall40.shapeColor = "brown";

  var wall41 = createSprite(270, 100, 60, 5);
  wall41.shapeColor = "brown";

  var wall42 = createSprite(298, 123, 5, 50);
  wall42.shapeColor = "brown";

  var wall43 = createSprite(310, 145, 20, 5);
  wall43.shapeColor = "brown";

  var wall44 = createSprite(318, 160, 5, 30);
  wall44.shapeColor = "brown";

  var wall45 = createSprite(258, 170, 30, 5);
  wall45.shapeColor = "brown";

  var wall46 = createSprite(270, 180, 5, 20);
  wall46.shapeColor = "brown";

  var wall47 = createSprite(245, 190, 50, 5);
  wall47.shapeColor = "brown";

  var wall48 = createSprite(220, 178, 5, 30);
  wall48.shapeColor = "brown";

  var wall49 = createSprite(270, 100, 50, 5);
  wall49.shapeColor = "brown";

  var wall50 = createSprite(312, 40, 5, 30);
  wall50.shapeColor = "brown";

  var wall51 = createSprite(310, 55, 60, 5);
  wall51.shapeColor = "brown";

  var wall52 = createSprite(270, 100, 20, 5);
  wall52.shapeColor = "brown";

  var wall53 = createSprite(340, 48, 5, 20);
  wall53.shapeColor = "brown";

  var wall54 = createSprite(280, 48, 5, 20);
  wall54.shapeColor = "brown";

  var wall55 = createSprite(120, 330, 30, 5);
  wall55.shapeColor = "brown";

  var wall57 = createSprite(120, 275, 5, 110);
  wall57.shapeColor = "brown";

  var wall58 = createSprite(150, 218, 60, 5);
  wall58.shapeColor = "brown";

  var wall59 = createSprite(180, 160, 5, 60);
  wall59.shapeColor = "brown";

  var wall60 = createSprite(371, 170, 5, 200);
  wall60.shapeColor = "brown";

  var wall61 = createSprite(280, 266, 183, 5);
  wall61.shapeColor = "brown";

  var wall62 = createSprite(355, 14, 5, 26);
  wall62.shapeColor = "brown";

  var wall63 = createSprite(150, 235, 5, 40);
  wall63.shapeColor = "brown";

  var wall64 = createSprite(180, 190, 5, 60);
  wall64.shapeColor = "brown";

  var wall65 = createSprite(168, 253, 40, 5);
  wall65.shapeColor = "brown";

  var wall66 = createSprite(186, 265, 5, 20);
  wall66.shapeColor = "brown";*/

  wallGroup.add(wall1);
  wallGroup.add(wall1);
  wallGroup.add(wall2);
  wallGroup.add(wall3);
  wallGroup.add(wall4);
  wallGroup.add(wall5);
  wallGroup.add(wall6);
  wallGroup.add(wall7);
  wallGroup.add(wall8);
  wallGroup.add(wall9);
  wallGroup.add(wall10);
  wallGroup.add(wall11);
  wallGroup.add(wall12);
  wallGroup.add(wall13);
  wallGroup.add(wall14);
  wallGroup.add(wall15);
  wallGroup.add(wall16);
  wallGroup.add(wall17);
  /*wallGroup.add(wall18);
  wallGroup.add(wall19);
  wallGroup.add(wall20);
  wallGroup.add(wall21);
  wallGroup.add(wall22);
  wallGroup.add(wall23);
  wallGroup.add(wall24);
  wallGroup.add(wall25);
  wallGroup.add(wall26);
  wallGroup.add(wall27);
  wallGroup.add(wall28);
  wallGroup.add(wall29);
  wallGroup.add(wall30);
  wallGroup.add(wall31);
  wallGroup.add(wall32);
  wallGroup.add(wall33);
  wallGroup.add(wall34);
  wallGroup.add(wall35);
  wallGroup.add(wall36);
  wallGroup.add(wall37);
  wallGroup.add(wall38);
  wallGroup.add(wall39);
  wallGroup.add(wall40);
  wallGroup.add(wall41);
  wallGroup.add(wall42);
  wallGroup.add(wall43);
  wallGroup.add(wall44);
  wallGroup.add(wall45);
  wallGroup.add(wall46);
  wallGroup.add(wall47);
  wallGroup.add(wall48);
  wallGroup.add(wall49);
  wallGroup.add(wall50);
  wallGroup.add(wall51);
  wallGroup.add(wall52);
  wallGroup.add(wall53);
  wallGroup.add(wall54);
  wallGroup.add(wall55);
  wallGroup.add(wall57);
  wallGroup.add(wall58);
  wallGroup.add(wall59);
  wallGroup.add(wall60);
  wallGroup.add(wall61);
  wallGroup.add(wall62);
  wallGroup.add(wall63);
  wallGroup.add(wall64);
  wallGroup.add(wall65);
  wallGroup.add(wall66);*/
}