var context;
var queue;
var WIDTH = 1024;
var HEIGHT = 768;
var mouseXPosition;
var mouseYPosition;
var batImage;
var stage;
var animation;

window.onload = function()
{
    /*
     *      Set up the Canvas with Size and height
     *
     */
    var canvas = document.getElementById('myCanvas');
    context = canvas.getContext('2d');
    context.canvas.width = WIDTH;
    context.canvas.height = HEIGHT;
    stage = new createjs.Stage("myCanvas");
    /*
     *      Set up other events and delegats
     *
     */
    window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;
    
    
    /*
     *      Set up the Asset Queue and load sounds
     *
     */
    queue = new createjs.LoadQueue(false);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];
    queue.loadFile({id:"backgroundImage", src:"assets/background.png"});
    queue.loadFile({id:"crossHair", src:"assets/crosshair.png"});
    queue.loadFile({id:"shot", src:"assets/shot.mp3"});
    queue.loadFile({id:"background", src:"assets/countryside.mp3"});                
    queue.load();
    
    /*
     *      Initialize Bat Sprite Sheet
     *
     */
    batImage = new Image();
    batImage.onload = handleBatLoad;
    batImage.onError = handleBatError;
    batImage.src = "assets/batSpritesheet.png";
}

function handleBatLoad()
{
    var spriteSheet = new createjs.SpriteSheet({
            "images": [batImage],
            "frames": {"width": 170, "height": 142},
            "animations": { "flap": [0,5] }
    });
    
    animation = new createjs.Sprite(spriteSheet, "flap");
    animation.gotoAndPlay("flap");
    animation.x = 100;
    animation.y = 100;
    spriteSheet.getAnimation("flap").frequency = 2;
    spriteSheet.getAnimation("flap").next = "flap";
    animation.gotoAndPlay("flap");
    stage.addChild(animation);
    Ticker.setFPS(60);
    Ticker.addListener(stage);
    stage.update();
}

function handleBatError(e)
{
    alert("Error " + e);
}

function queueLoaded(event)
{
    createjs.Sound.registerSound("assets/shot.mp3", "shot");
    createjs.Sound.registerSound("assets/countryside.mp3", "background");
    var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"),0,0)
    stage.addChild(backgroundImage);
    stage.update();
    var backgroundSound = createjs.Sound.play("background");
    
}

function handleMouseMove(event)
{
    var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"));
    var crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    stage.addChild(backgroundImage);
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
    stage.addChild(crossHair);
    stage.addChild(animation);
    stage.update();
}

function handleMouseDown(event)
{
    var instance = createjs.Sound.play("shot");
   
}