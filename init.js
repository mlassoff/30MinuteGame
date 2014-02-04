var context;
var queue;
var WIDTH = 300;
var HEIGHT = 500;

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

    /*
     *      Set up the Asset Queue
     *
     */
    queue = new createjs.LoadQueue(false);
    queue.on("complete", queueLoaded, this);
    queue.loadFile({id:"backgroundImage", src:"assets/background.png"});
    queue.load();
}

function queueLoaded(event)
{
    context.drawImage(queue.getResult("backgroundImage"),0,0);    
    
}