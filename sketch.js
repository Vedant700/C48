var bg, bg_image;
var bob, bob_img, bob_gamelost_img;

var invisibleGround;
var invisibleTopLayer;
var lion, lion_img, bear, bear_img, elephant, elephant_img, fox, fox_img, snake, snake_img, tiger, tiger_img;
var animalsGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var dartRight, dartRight_img, dartLeft_img;
var dartsGroup;
var score;


function preload() {
    bg_image = loadImage("bg.jpg");

    // =====PLAYING CHARACTER=====
    bob_img = loadAnimation("bob_1.png", "bob_2.png");

    bob_gamelost_img = loadAnimation("bob_gamelost.png", "bob_gamelost.png");

    // =====NON-PLAYING CHARACTERS=====
    lion_img = loadImage("lion.png");
    bear_img = loadImage("snake.png");
    elephant_img = loadImage("elephant.png");
    fox_img = loadImage("fox.png");
    snake_img = loadImage("snake.png");
    tiger_img = loadImage("tiger.png");


    dartRight_img = loadImage("dartright_3.png")
    dartLeft_img = loadImage("dartleft.png")

}

function setup() {
    createCanvas(1200, 700);

    bg = createSprite(900, 380);
    bg.addImage(bg_image);
    bg.scale = 0.257;
    // if scale decrease, then other values such as image length increases

    bob = createSprite(100, 600);
    bob.addAnimation("moving", bob_img);
    bob.scale = 0.5;

    invisibleGround = createSprite(0, 670, 2400, 20);
    invisibleGround.visible = false;

    invisibleTopLayer = createSprite(0, 250, 2400, 20);
    invisibleTopLayer.visible = false;

    animalsGroup = new Group();
    dartsGroup = new Group();

    rightDartGroup = new Group();

    score = 0;
    stroke("brown");
    fill("brown");
    textSize(20);

    swal({
        title: "Instructions",
        text: "If you collect an arrow on the track you can press 'right arrow key' to launch it and kill the other animals. Use Up Arrow Key to dodge the animals and stay alive!",
        button: "Continue",
    });

}

function draw() {
    background(0);


    if (gameState === PLAY) {

        bg.velocityX = -8;

        bob.changeAnimation(bob_gamelost_img);

        if (bg.x < 370) {
            bg.x = bg.width / 8;
        }

        if (keyDown("space")) {
            bob.velocityY = -13;
        }

        bob.velocityY = bob.velocityY + 0.435;

        bob.collide(invisibleGround)


        if (bob.collide(invisibleTopLayer)) {
            bob.y = 600;
        }

        if (dartsGroup.collide(bob)) {
            dartsGroup.destroyEach();

            if (keyDown("RIGHT_ARROW")) {
                dartRight = createSprite(bob.x, bob.y, 20, 25);
                dartRight.velocityX = 15;
                dartRight.addImage(dartRight_img);
                dartRight.scale = 0.7;
                rightDartGroup.add(dartRight);

                if (animalsGroup.collide(rightDartGroup)) {
                    animalsGroup.destroyEach();
                    rightDartGroup.destroyEach();
                    score = score + 1;
                }
            }
        }

        if (animalsGroup.collide(bob)) {
            gameState = END;
        }
    } else if (gameState === END) {
        bg.velocityX = 0;
        // animalsGroup.setVelocityXEach(0);
        // animalsGroup.setVelocityYEach(0);
        dartsGroup.setVelocityXEach(0);
        dartsGroup.setVelocityYEach(0);
        bob.velocityY = 0.0;
        // animalsGroup.setVisibleEach(false);
        dartsGroup.setVisibleEach(false);
        // dartRight.velocityX = 0;
        // bob.changeAnimation(bob_gamelost_img);
    }

    spawnAnimals();

    spawnDarts();

    drawSprites();
    text("Score: " + score, 250, 50);
}

function spawnAnimals() {
    if (frameCount % 170 === 0) {
        animals = createSprite(1100, 600, 35, 55);
        animals.velocityX = -10;
        var rand = Math.round(random(1, 6));
        switch (rand) {
            case 1: animals.addImage(lion_img);
                break;
            case 2: animals.addImage(bear_img);
                break;
            case 3: animals.addImage(elephant_img);
                break;
            case 4: animals.addImage(fox_img);
                break;
            case 5: animals.addImage(snake_img);
                break;
            case 6: animals.addImage(tiger_img);
                break;
            default: break;
        }
        animals.scale = 0.17;
        animals.lifetime = 110;
        animalsGroup.add(animals);
    }
}

function spawnDarts() {
    if (frameCount % 100 === 0) {
        dart = createSprite(1100, 600, 20, 25);
        dart.velocityX = -8;
        dart.addImage(dartLeft_img);
        dart.scale = 0.09;
        dart.lifetime = 138;
        dartsGroup.add(dart);
    }
}