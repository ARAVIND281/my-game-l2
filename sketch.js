var canvas2, backgroundImage;
var gameState = 2.0;
var enemyGroup;
var BulletGroup = [];
var back, back_img;
var playerPaddle, playerPaddle_img;
var count = 0;
var enemy, enemy_img;
var pos2Y = -5000, pos2X = -500;
var score2,rand2;
var Iwall2_1, Iwall2_2;
var laserSound;
var bullet;


function preload() {
  back_img = loadImage("image2/back.png");
  playerPaddle_img = loadImage("image2/gun90.png");
  enemy_img = loadImage("image2/enemy.png");
  laserSound = loadSound('laser.ogg');

}

function setup() {
  canvas2 = createCanvas(displayWidth, displayHeight - 170);

  playerPaddle = createSprite(displayWidth / 2, 2300, 40, 40);
  playerPaddle.addImage(playerPaddle_img);
  playerPaddle.scale = 2;

  Iwall2_1 = createSprite(displayWidth-995, displayHeight / 2, 40, displayHeight * 15);
  Iwall2_2 = createSprite(displayWidth-200, displayHeight / 2, 40, displayHeight * 15);

  enemyGroup = new Group();
  if (frameCount % 40 === 0) {
    enemy = createSprite(pos2X, pos2Y, 30, 30);
  }
}

console.log(gameState);

function draw() {

  if (keyDown(32) && frameCount % 3 === 0 && gameState === 2.0) {

    laserSound.play();
    bullet = createSprite(200, 200, 2, 8);
    bullet.shapeColor = "red";
    bullet.lifetime = 80;
    bullet.x = playerPaddle.x - 7;
    bullet.y = playerPaddle.y+5;
    bullet.velocityY = -30;
    BulletGroup.push(bullet);

  }

  if (keyDown(LEFT_ARROW) && gameState === 2.0) {
    playerPaddle.x -= 10;
  }
  if (keyDown(RIGHT_ARROW) && gameState === 2.0) {
    playerPaddle.x += 10;
  }

  background("#D8C7A9");
  image(back_img, 0, -displayHeight * 6, displayWidth + 100, displayHeight * 9);
  camera.position.x = displayWidth / 2;
  camera.position.y = playerPaddle.y - 100;

  if (gameState === 2.1) {
    fill("brown");
    noStroke();
    textSize(40);
    text("You Lose!!!", displayWidth / 4, playerPaddle.y - 300);
  }

  fill("brown");
  noStroke();
  textSize(20);
  text("Your Score: " + score2, 50, playerPaddle.y - 200);

  Iwall2_1.visible = false;
  Iwall2_2.visible = false;
  playerPaddle.collide(Iwall2_1);
  playerPaddle.collide(Iwall2_2);
  playerPaddle.velocityY = -10;




  if (playerPaddle.y === -4470) {
    gameState = 2.1;
    playerPaddle.velocityY = 0;
    enemyGroup.setVelocityXEach(0);
    
  }

  /*gameState = 2.2;
    playerPaddle.velocityY = 0;
    enemyGroup.setVelocityXEach(0);
    fill("brown");
    noStroke();
    textSize(40);
    text("You Win!!!", displayWidth / 4, playerPaddle.y - 300);*/


  if (frameCount % 50 === 0 && gameState === 2.0) {
    rand2 = random(displayWidth-995, displayWidth-200);
    enemy.y = playerPaddle.y - 800;
    enemy.x = rand2;
    enemy.depth = playerPaddle.depth;
    enemy.collide(Iwall2_1);
    enemy.collide(Iwall2_2);
    num2 = Math.round(random(1, 1));

    switch (num2) {
      case 1: enemy.addImage(enemy_img);
        break;
        default: break;
    }

    enemy.scale = 2;
    enemy.velocityY = 10;
    enemyGroup.add(enemy);
    enemy.lifetime = -100;
  }
  if (playerPaddle.isTouching(enemy)) {
    gameState = 2.1;
    playerPaddle.destroy();
    enemyGroup.destroyEach();
    score2 -= 5;
  }

  /*if (bullet.isTouching(enemy)){
    enemyGroup.destroyEach();
    score2 += 5;

  }*/
  drawSprites();
}




