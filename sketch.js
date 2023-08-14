var fundoImg, fundo;
var loboImg, lobo;
var laraImg, lara;
var arco_e_flechaImg, arco_e_flecha;
var explosaoImg, explosao; 

var arco_e_flechaGroup;
var loboGroup;

var score = 0; //pontuação
var life = 3; //limite de vidas/tentativas

var gameState = "play";

//carregar imagens, variáveis que tem Img ao entrar no site
function preload() {
  fundoImg = loadImage("img/fundo.jpg")
  loboImg = loadImage("img/lobo.png")
  laraImg = loadAnimation("img/lara.png")
  
  arco_e_flechaImg = loadImage("img/arco_e_flecha.png")
  explosaoImg = loadAnimation("img/explosao.png")
}

//criando sprites para dar forma/vida as imagens
function setup() {
  createCanvas(800,800); //tamanho da tela que vai rodar o jogo
  
  //criar sprites
  fundo = createSprite(400,400) //1p: X 2p: Y (3p: L 4p: A = sem imagem)s
  fundo.addImage(fundoImg)
  fundo.scale = 1 //para ajustar o tamanho da imagem se ficar desproporcional

  lara = createSprite(400,600)
  lara.addAnimation("lara", laraImg)
  lara.addAnimation("explosao", explosaoImg)
  lara.scale = 0.150

    //criando grupos
  arco_e_flechaGroup = new Group();
  loboGroup = new Group();
  
}

function draw() {
  background(0);

  drawSprites();

  textSize(22)
  fill("white")
  text("Vidas: " + life, 40, 100)

  textSize(22)
  fill("white")
  text("Score: "+ score, 40, 150)
  //criar estado de jogo "play" / trabalhando com condicionais

  if (gameState == "play") { // == para comparação
    fundo.velocityY = 4; //fundo se movimentará na vertical na velocidade 4
    
    //condicionamento aninhado
    if (fundo.y > 800) {
        fundo.y = 200
    }
    if (keyDown("RIGHT_ARROW")) {
        lara.x += 5 //+= aumentando a posição em 5px
    }
    if (keyDown("LEFT_ARROW")) {
      lara.x -= 5 //-= diminuindo a posição em 5px
    }

    removeLife();
    removeCoins()
    spawnlobo();
    spawnarco_e_flecha();
    // if (keyDown("UP_ARROW")) {
    //   lara.y -= 5
    // }
    // if (keyDown("DOWN_ARROW")){
    //   lara.y += 5
    // }
 

    if (life == 0) {
      gameState = "end"
    }
  } 
  

  
 //criar estado de jogo "end"
  if (gameState == "end") {
    
    //remover grupos
    arco_e_flechaGroup.destroyEach();
    loboGroup.destroyEach();
    fundo.velocityY = 0;
    lara.velocityX = 0;

    //mudar annimação da lara para explosão
    lara.changeAnimation("explosao, explosaoImg")
    textSize(30)
    fill("white")
    text("Game Over", 300, 400)
  
  }
  
}

function spawnlobo() {
  if (frameCount % 60 == 0) {
    lobo = createSprite(random(30, 770), random(10, 450))
    lobo.addImage(loboImg)
    lobo.velocityY = 3
    lobo.scale = 0.1
    //tempo de vida do sprite
    lobo.lisfeTime = 800
    loboGroup.add(lobo)
  }
  
}

function spawnarco_e_flecha() {
  if (frameCount % 60 == 0) {
    arco_e_flecha = createSprite(random(30, 770), random(10, 450))
    arco_e_flecha.addImage(arco_e_flechaImg)
    arco_e_flecha.velocityY = 3
    arco_e_flecha.scale = 0.2
    arco_e_flecha.lifeTime = 800
    arco_e_flechaGroup.add(arco_e_flecha)
  }
  
 
}

function removeCoins() {
  lara.overlap(arco_e_flechaGroup, function(collector, collected){
    score += 1;
    collected.remove();
  });
}

function removeLife() {
  lara.overlap(loboGroup, function(collector, collected) {
    life -= 1;
    collected.remove();
})
  }