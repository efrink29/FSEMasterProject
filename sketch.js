function setup() {
  createCanvas(1080, 720);
  background(220);
  DrawMenu();
  preload();
  frameRate(60);
}
var soundStart = true;
var timeSec;
var timeMin;
var borderDim = 720;
var squareDim = 36;
var currentX;
var currentY;
var curLevel = 0;
var score = 0;
var playGame = false;
var startGame = false;
var numUsed;
var Levels = [];
var invalidSquares = [];
var usedSquares = [];
var numGoal;
var numLeft;
var accuracy;
var previousAccuracy = [];
var previousSec = [];
var previousMin = [];

function preload() {
  spaceExterior = loadImage("/Pictures/HologramExterior.png");
  SpaceInterior = loadImage("/Pictures/hologrambackground.jpg");
  howToImage = loadImage("/Pictures/DrawingGameHowTo.png");
  lvl1 = loadImage("/levels/level1.png");
  Levels[0] = lvl1;
  lvl2 = loadImage("/levels/level2.png");
  Levels[1] = lvl2;
  lvl3 = loadImage("/levels/level3.png");
  Levels[2] = lvl3;
  lvl4 = loadImage("/levels/level4.png");
  Levels[3] = lvl4;
  lvl5 = loadImage("/levels/level5.png");
  Levels[4] = lvl5;
  lvl6 = loadImage("/levels/level6.png");
  Levels[5] = lvl6;
  lvl7 = loadImage("/levels/level7.png");
  Levels[6] = lvl7;
  lvl8 = loadImage("/levels/level8.png");
  Levels[7] = lvl8;
  lvl9 = loadImage("/levels/level9.png");
  Levels[8] = lvl9;
  lvl10 = loadImage("/levels/level10.png");
  Levels[9] = lvl10;
  clickSound = loadSound("/Sound Effects/ClickSound.mp3");
  badBeep = loadSound("/Sound Effects/BadBeep.mp3");
  gameWin = loadSound("/Sound Effects/GameWin.mp3")
  backgroundSound = loadSound("/Sound Effects/AmbientSpace.mp3")
  var j;
  for (j=0; j < 10; j++) {
    previousAccuracy[j] = 0;
    previousMin[j] = 100;
    previousSec[j] = 100;
  }
}
function startSounds(){
  backgroundSound.setVolume(0.25);
  backgroundSound.loop();
}

function draw() {
  
  if (startGame == true) {
    drawGrid();
    endGame();
    drawLevel(curLevel);
    wait(1000);
    playGame = true;
    startGame = false;
  }
  if (playGame == true) {
    drawLevel(curLevel);
    timerCount();
    //print("Score :" + score);
    //print("Blocks Used : " + numUsed)
  }
  if (numLeft < 1) {
    strokeWeight(0);
    fill(255);
    playGame = false;
    accuracy = (score/numGoal) * 100;
    accuracy = round(accuracy);
    if (timeMin < previousMin[curLevel]){
      previousMin[curLevel] = timeMin;
      previousSec[curLevel] = timeSec;
    }
    else if ((timeMin == previousMin[curLevel]) && (timeSec < previousSec[curLevel])) {
      previousMin[curLevel] = timeMin;
      previousSec[curLevel] = timeSec;
    }
    if (accuracy > previousAccuracy[curLevel]) {
      previousAccuracy[curLevel] = accuracy;
    }
    text('Accuracy : '+ accuracy + '%', 750,300);
    numLeft = 1;
    gameWin.play();

  }

}

function timerCount() {
  if (frameCount % 60 == 0) {
    timeSec++;
    if (timeSec == 60) {
      timeMin++;
      timeSec = 0;
    }
  }
}

function endGame() {

  
  let col = color(25, 23, 200);
  playAgain = createButton('Restart');
  playAgain.position(750, 360);
  playAgain.size(300,70);
  playAgain.mousePressed(startEndGame);
  playAgain.style('background-color', col);
  playAgain.style('color', color(255));
  playAgain.style('font-size', '25px');
  
  mainMenuEnd = createButton('Main Menu');
  mainMenuEnd.position(750, 560);
  mainMenuEnd.size(300,70);
  mainMenuEnd.mousePressed(endMainMenu);
  mainMenuEnd.style('background-color', col);
  mainMenuEnd.style('color', color(255));
  mainMenuEnd.style('font-size', '25px');
  
  levelSelectEnd = createButton('Level Select');
  levelSelectEnd.position(750, 460);
  levelSelectEnd.size(300,70);
  levelSelectEnd.mousePressed(endLevelSelect);
  levelSelectEnd.style('background-color', col);
  levelSelectEnd.style('color', color(255));
  levelSelectEnd.style('font-size', '25px');
}

function DrawMenu(){
  if (soundStart){
    backgroundSound.setVolume(0.25);
    backgroundSound.loop();
    soundStart = false;
  }
  cursor(ARROW);
  image(spaceExterior,0,0, 1080,720);
  textSize(80);
  fill(255);
  text('Space Sketch',300,80);
  startDraw = createButton('Start');
  startDraw.position(440,150);
  startDraw.size(200,70);
  startDraw.style('background-color', color(50,200));
  startDraw.style('color', color(255));
  startDraw.style('font-size', '25px');
  startDraw.mousePressed(startMainMenu);
  
  drawLvlSelect = createButton('Level Select');
  drawLvlSelect.position(440,280);
  drawLvlSelect.size(200,70);
  drawLvlSelect.style('background-color', color(50,200));
  drawLvlSelect.style('color', color(255));
  drawLvlSelect.style('font-size', '25px');
  drawLvlSelect.mousePressed(dLvlSelectInit);
  
  drawHowTP = createButton('How To Play');
  drawHowTP.position(440,410);
  drawHowTP.size(200,70);
  drawHowTP.style('background-color', color(50,200));
  drawHowTP.style('color', color(255));
  drawHowTP.style('font-size', '25px');
  drawHowTP.mousePressed(howTo);
  
  drawMenuBTMM = createButton('Main Menu');
  drawMenuBTMM.position(440,540);
  drawMenuBTMM.size(200,70);
  drawMenuBTMM.style('background-color', color(50,200));
  drawMenuBTMM.style('color', color(255));
  drawMenuBTMM.style('font-size', '25px');
  drawMenuBTMM.mousePressed(BTMMM);
  


}
function howTo(){
  hideDrawMenu();
  image(howToImage, 0,0,1080,720);
  
  howToBack = createButton('Back');
  howToBack.position(750, 560);
  howToBack.size(300,70);
  howToBack.style('background-color', color(20,0,200));
  howToBack.style('color', color(255));
  howToBack.style('font-size', '25px');
  howToBack.mousePressed(BTMHT);
}

function BTMHT (){
  howToBack.hide();
  DrawMenu();
}

function BTMMM() {
  window.open('https://editor.p5js.org/brbauma1/full/xco3O8uaj');
}

function hideDrawMenu(){
  startDraw.hide();
  drawLvlSelect.hide();
  drawHowTP.hide();
  drawMenuBTMM.hide();
}

function hideLevelSelect(){
  SelectStartButton.hide();
  RightButton.hide();
  LeftButton.hide();
  BackButton.hide();
}

function hideEndGame(){
  playAgain.hide();
  mainMenuEnd.hide();
  levelSelectEnd.hide();
}


var StartButton;

var MenuButton;

function dLvlSelectInit(){
  hideDrawMenu();
  image(SpaceInterior,0,0, 1080,780);
  fill(255);
  textSize(80);
  text("Choose Level",300,80);
  image(Levels[curLevel],378,180,320,320);
  
  textSize(20);
  fill(255);
  if (previousAccuracy[curLevel] != 0){
    text("Best Score " + previousAccuracy[curLevel] + "%",470,205);
      if (previousSec[curLevel] < 10) {
        text('Best Time ' + previousMin[curLevel] + ':0' + previousSec[curLevel], 470,490);
      }
      else {
      text('Best Time ' + previousMin[curLevel] + ':' + previousSec[curLevel], 470,490);
      }
    }
  
  textSize(200);
  fill(20,0,255,170);
  strokeWeight(5);
  stroke(0,0,255);
  text("" + (curLevel + 1), 240,420);
  text("" + (curLevel + 1), 720,420);
  strokeWeight(0);

  let col = color(20, 0, 125, 150);
  LeftButton = createButton('<--');
  LeftButton.position(300,520);
  LeftButton.size(100,50);
  LeftButton.style('background-color', col);
  LeftButton.style('color', color(255));
  LeftButton.style('font-size', '25px');
  LeftButton.mousePressed(mazeLevelLeft);
  
  RightButton = createButton('-->');
  RightButton.position(675,520);
  RightButton.size(100,50);
  RightButton.style('background-color', col);
  RightButton.style('color', color(255));
  RightButton.style('font-size', '25px');
  RightButton.mousePressed(mazeLevelRight);
  
  SelectStartButton = createButton('Play');
  SelectStartButton.position(405,520);
  SelectStartButton.size(265,50);
  SelectStartButton.style('background-color', col);
  SelectStartButton.style('color', color(255));
  SelectStartButton.style('font-size', '25px');
  SelectStartButton.mousePressed(startLevelSelect);
  
  BackButton = createButton('Back');
  BackButton.position(490, 620);
  BackButton.size(100,50);
  BackButton.style('background-color', col);
  BackButton.style('color', color(255));
  BackButton.style('font-size', '20px');
  BackButton.mousePressed(BTMM);
  
  if(curLevel == 0){ 
    LeftButton.hide();
  }
  if(curLevel == 10){ 
    RightButton.hide();
  }
}

function startMainMenu(){
  hideDrawMenu();
  drawLevelAndGrid(curLevel);
  drawLevel(curLevel);
  defineInvalidBoxes(curLevel);
}

function startLevelSelect(){
  hideLevelSelect();
  drawLevelAndGrid(curLevel);
  drawLevel(curLevel);
  defineInvalidBoxes(curLevel);
}

function startEndGame(){
  hideEndGame();
  drawLevelAndGrid(curLevel);
  drawLevel(curLevel);
  defineInvalidBoxes(curLevel);
}

function endMainMenu() {
  playGame = false;
  DrawMenu();
  hideEndGame();
}

function endLevelSelect() {
  playGame = false;
  dLvlSelectInit();
  hideEndGame();
}

function LvlSelect(){
  LeftButton.show();
  RightButton.show();
  if(curLevel == 0){ 
    LeftButton.hide();
  }
  if(curLevel == 9){           //change to add more levels!!!!
    RightButton.hide();
  }
  image(SpaceInterior,0,0, 1080,780);
  fill(255);
  strokeWeight(0);
  textSize(80);
  text("Choose Level",300,80);
  image(Levels[curLevel],378,180,320,320);  
  
  textSize(200);
  fill(20,0,255,170);
  strokeWeight(4);
  stroke(0,0,255);
  if (curLevel > 8){
    textSize(140);
    text("" + (curLevel + 1), 210,400);
    text("" + (curLevel + 1), 690,400);
  }
  else {
    textSize(200);
    text("" + (curLevel + 1), 240,420);
    text("" + (curLevel + 1), 720,420);
  }
  strokeWeight(0);
  
  image(Levels[curLevel],378,180,320,320);
  textSize(20);
  strokeWeight(0);
  fill(255);
    if (previousAccuracy[curLevel] != 0){
      text("Best Score " + previousAccuracy[curLevel] + "%",470,205);
      if (previousSec[curLevel] < 10) {
        text('Best Time ' + previousMin[curLevel] + ':0' + previousSec[curLevel], 470,490);
      }
      else {
      text('Best Time ' + previousMin[curLevel] + ':' + previousSec[curLevel], 470,490);
      }
    }
}

function mazeLevelLeft(){
  curLevel-=1;
  LvlSelect();
}

function mazeLevelRight(){
  curLevel++;
  LvlSelect();
}

function BTMM(){
  LeftButton.hide();
  RightButton.hide();
  SelectStartButton.hide();
  BackButton.hide();
  DrawMenu();
}

function drawLevelAndGrid(curLevel){
  drawGrid(curLevel);
  drawLevel(curLevel);
  score = 0;
  startGame = true;
}

function drawGrid(curlevel) {
  timeSec = 0;
  timeMin = 0;
  fill(0,0,60);
  strokeWeight(1);
  stroke(20,0,255);
  for (currentX = 0; currentX < borderDim; currentX += squareDim) {
    for (currentY = 0; currentY < borderDim; currentY += squareDim) {
      if (checkValidSquare(curLevel, currentX, currentY)){
        fill(0,0,150);
      }
      else {
        fill(0,0,100);
      }
      rect(currentX, currentY, squareDim, squareDim);
    }
  }
}
function drawLevel(currentLevel) {
  drawSetup();
  strokeWeight(5);
  for (i = 0; i < 399; i++){
    if (invalidSquares[i] == 1){
      var tempY = (i - (i%20))/20;
      if (invalidSquares[i-1] == 0){
        drawLine(i%20, tempY, i%20, tempY+1);
      }
      if (invalidSquares[i+1] == 0){
        drawLine((i%20) + 1, tempY, (i%20) + 1, tempY+1);
      }
      if (invalidSquares[i-20] == 0){
        drawLine(i%20, tempY, (i%20)+1, tempY);
      }
      if (invalidSquares[i+20] == 0){
        drawLine(i%20, tempY+1, (i%20)+1, tempY+1);
      }
    }
  }
  fill(255);
  strokeWeight(0);
  textSize(40);
  text('Blocks left :'+ numLeft, 750,75);
  text('Score : '+ score, 750, 150);
  //fill(0,200,0);
  fill(255);
  if (timeSec < 10) {
      text('Time ' + timeMin + ":0" + timeSec, 750,225);
    }
  else {
      text('Time ' + timeMin + ":" + timeSec, 750,225);
    }
}
function drawLine(x1, y1, x2, y2){
  x1 = x1 * 36;
  x2 = x2 * 36;
  y1 = y1 * 36;
  y2 = y2 * 36;
  strokeWeight(5);
  stroke(20,0,255);
  line(x1,y1,x2,y1);
  line(x2,y1,x2,y2);
  
}
function drawSetup() {
  strokeWeight(6);
  line(0,0,0,720);
  line(0,0,720,0);
  line(0,720,720,720);
  line(720,0,720,720);
  fill(0,0,150);
  rect(720,0,360,720);
}

function checkValidSquare(curLevel, posX, posY) {
  var boxCoordinateX = posX / squareDim;
  var boxCoordinateY = posY / squareDim;
  var boxNum = (boxCoordinateY * 20) + boxCoordinateX;
  if (invalidSquares[boxNum] == 1) {
    return true;
  }
  else {
    return false;
  }
}

function mouseDragged() {
  mouseAction();
}
function mousePressed() {
  mouseAction();
}
function mouseAction () {
  if (playGame == true){
    var posX = mouseX - (mouseX % squareDim);
    var posY = mouseY - (mouseY % squareDim);
    strokeWeight(1);
    var boxNum1 = ((posY/36) * 20) + (posX/36);
    if ((usedSquares.indexOf(boxNum1) != -1) || posX >= 720 || posY >= 720) {
      
    }
    else if (checkValidSquare(curLevel, posX, posY)) {
      fill(0,200,0);
      rect(posX, posY, squareDim);
      score += 1;
      usedSquares[boxNum1] = boxNum1;
      clickSound.play();
      numUsed++;
    }
    else {
      fill(200,0,0);
      rect(posX, posY, squareDim);
      usedSquares[boxNum1] = boxNum1;
      badBeep.play();
      numUsed++;
    }
    numLeft = numGoal - numUsed;
  }
}

var wait1;
var wait2;
function wait(time){
  wait1 = millis()
  do
  {
    wait2 = millis();
  }
  while(wait2 < wait1 + time)
}


function defineInvalidBoxes (curLevel){
  numUsed = 0;
  invalidSquares = [];
  usedSquares = [];
  var i;
  for (i = 0; i < 401; i++) {
    usedSquares[i] = 500;
    if (((i % 20) == 0) && (i > 399)) {
      usedSquares[i] = i;
    }
  }
    
  switch (curLevel){
    case 0:
      numGoal = 108;
      numLeft = 108;
      invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      break;
      
    case 1:
      numGoal = 96;
      numLeft = 96;
      invalidSquares =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      break;
      
    case 2 : 
      numGoal = 72;
      numLeft = 72;
      invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      break;
      
      case 3:
      numGoal = 136;
      numLeft = 136;
      invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      break;
      
      case 4:
      numGoal = 156;
      numLeft = 156;
      invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,1,1,1,0,1,1,0,0,0,0,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,0,0,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,1,1,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,1,1,1,0,0,1,1,1,0,0,1,1,0,0,0,0,1,1,0,1,1,1,0,0,0,0,1,1,1,0,1,1,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    break;
    case 5:
      numGoal = 110;
      numLeft = 110;
    invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      break;
      case 6:
       numGoal = 106;
       numLeft = 106;
      invalidSquares = 
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,1,0,0,1,1,1,0,0,0,0,0,0,1,1,1,0,0,1,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      break;
      case 7:
      numGoal = 66;
      numLeft = 66;
      invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,0,1,0,1,1,0,1,0,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      break;
      case 8: 
      numGoal = 82;
      numLeft = 82;
      invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      break;
      case 9:
      numGoal = 400;
      numLeft = 400;
      invalidSquares = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,0,1,1,1,1,1,1,0,0,1,0,1,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  }
  
  function makeInvalid (short, long){
    for(i = short; i < long; i++)
        invalidSquares[i] = i;
  }
}