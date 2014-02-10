var context;
var queue;
var WIDTH = 1024;
var HEIGHT = 768;
var mouseXPosition;
var mouseYPosition;
var batImage;
var stage;
var animation;
var enemyXPos=100;
var enemyYPos=100;
var enemyXSpeed = 1.5;
var enemyYSpeed = 1.75;
var score = 0;

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
     *      Set up the Asset Queue and load sounds
     *
     */
    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on("complete", queueLoaded, this);
    createjs.Sound.alternateExtensions = ["ogg"];

    queue.loadManifest([
        {id: 'backgroundImage', src: 'assets/background.png'},
        {id: 'crossHair', src: 'assets/crosshair.png'},
        {id: 'shot', src: 'assets/shot.mp3'},
        {id: 'background', src: 'assets/countryside.mp3'},
        {id: 'batSpritesheet', src: 'assets/batSpritesheet.png'},
    ]);
    queue.load();
}

function queueLoaded(event)
{
    // Add background image
    var backgroundImage = new createjs.Bitmap(queue.getResult("backgroundImage"))
    stage.addChild(backgroundImage);

    // Play background sound
    createjs.Sound.play("background", {loop: -1});

    // Create bat spritesheet
    var spriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('batSpritesheet')],
        "frames": {"width": 198, "height": 117},
        "animations": { "flap": [0,4] }
    });

    // Create bat sprite
    animation = new createjs.Sprite(spriteSheet, "flap");
    animation.regX = 99;
    animation.regY = 58;
    animation.x = enemyXPos;
    animation.y = enemyYPos;
    animation.gotoAndPlay("flap");
    stage.addChild(animation);

    // Create crosshair
    crossHair = new createjs.Bitmap(queue.getResult("crossHair"));
    stage.addChild(crossHair);

    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', tickEvent)

    // Set up events AFTER the game is loaded
    window.onmousemove = handleMouseMove;
    window.onmousedown = handleMouseDown;
}

function tickEvent()
{
	//Move enemy Bat
	
	if(enemyXPos < WIDTH && enemyXPos > 0)
	{
		enemyXPos += enemyXSpeed;
	} else 
	{
		enemyXSpeed = enemyXSpeed * (-1);
		enemyXPos += enemyXSpeed;
	}
	if(enemyYPos < HEIGHT && enemyYPos > 0)
	{
		enemyYPos += enemyYSpeed;
	} else
	{
		enemyYSpeed = enemyYSpeed * (-1);
		enemyYPos += enemyYSpeed;
	}

	animation.x = enemyXPos;
	animation.y = enemyYPos;

	//console.log ("X: " + animation.x + " Y: " + animation.y + "Xs: " + enemyXSpeed + " Ys: " + enemyYSpeed);

}


function handleMouseMove(event)
{
    crossHair.x = event.clientX-45;
    crossHair.y = event.clientY-45;
}

function handleMouseDown(event)
{
    //Play Gunshot sound
    createjs.Sound.play("shot");

    //Increase speed of enemy slightly
    enemyXSpeed += .25;
    enemyYSpeed += .25;

    //Shot position
    var shotX = Math.round(event.clientX);
    var shotY = Math.round(event.clientY);
    var hitFlagX = false;
    var hitFlagY = false;

    //console.log(shotX + " " + shotY + " Enemy: " + animation.x + " " + animation.y);

    for(var x = -20; x < 21; x++)
    {
    	if(shotX + x == Math.round(animation.x))
    	{
    		hitFlagX = true;
    	}

    	if(shotY + x == Math.round(animation.y))
    	{
    		hitFlagY = true;
    	}

    }

    	if(hitFlagY && hitFlagX)
    	{
    		console.log("Hit");
    		//Enemy Dies
    		score += 100;
    		
    	} else
    	{
    		console.log("Miss");
    		score -= 10;
    	}

    

}