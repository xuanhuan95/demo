var game = new Phaser.Game(1920, 1080, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('background', 'assets/tusach/tool/BG.png');
    game.load.image('latch', 'assets/tusach/tool/chot.png');
    game.load.image('the_alphabet', 'assets/tusach/tool/the_alphabet.png');
    game.load.image('the_chair', 'assets/tusach/tool/the_chair.png');
    game.load.image('the_esear', 'assets/tusach/tool/the_esear.png');
    game.load.image('the_page', 'assets/tusach/tool/the_page.png');
    game.load.image('the_pencil', 'assets/tusach/tool/the_pencil.png');
    game.load.image('the_ruler', 'assets/tusach/tool/the_ruler.png');
    game.load.image('cua_kinh', 'assets/tusach/motion/cua_kinh.png');
    
    game.load.spritesheet('bang_abc', 'assets/tusach/motion/bang_abc.png', 320, 166);
    game.load.spritesheet('but_chi', 'assets/tusach/motion/but_chi.png', 413, 95);
    game.load.spritesheet('coc_nuoc', 'assets/tusach/motion/coc_nuoc.png', 147, 159);
    game.load.spritesheet('cuc_tay', 'assets/tusach/motion/cuc_tay.png', 224, 142);
    game.load.spritesheet('ghe', 'assets/tusach/motion/ghe.png', 194, 304);
    game.load.spritesheet('giay', 'assets/tusach/motion/giay.png', 249, 227);
    game.load.spritesheet('thuoc', 'assets/tusach/motion/thuoc.png', 478, 184);
}

var platforms;
var showDebug = true;
var timer;
var cup;
var timeText;
var timeString;
var cupIndex = 0;
var seconds = 0;

var alphabetLatch;
var chairLatch;
var pageLatch;
var pencilLatch;
var esearLatch;
var rulerLatch;

var alphabetLabel;
var chairLabel;
var esearLabel;
var pageLabel;
var pencilLabel;
var rulerLabel;

function create() {
    //  A simple background for our game
    game.add.sprite(0, 0, 'background');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    platforms.enableBody = true;

    initPantAnimation(200, 150, 'bang_abc');
    initPantAnimation(900, 90, 'ghe');
    initPantAnimation(1500, 150, 'giay');
    
    initPantAnimation(200, 550, 'but_chi');
    initPantAnimation(900, 550, 'cuc_tay');
    initPantAnimation(1400, 550, 'thuoc');
    
    alphabetLatch = initLatch(350,20);
    chairLatch = initLatch(950,20);
    pageLatch = initLatch(1600,20);
    pencilLatch = initLatch(350,400);
    esearLatch = initLatch(950,400);
    rulerLatch = initLatch(1600,400);
    
    alphabetLabel = initLabelDragDrop(0,900, 'the_alphabet');
    chairLabel = initLabelDragDrop(250,900, 'the_chair');
    esearLabel = initLabelDragDrop(500,900, 'the_esear');
    pageLabel = initLabelDragDrop(750,900, 'the_page');
    pencilLabel = initLabelDragDrop(1000,900, 'the_pencil');
    rulerLabel = initLabelDragDrop(1230,900, 'the_ruler');
    
    var glass = platforms.create(0, 0, 'cua_kinh');
    
    glass.inputEnabled = true;
    glass.events.onInputDown.add(moveGlass, this);
    // game.physics.enable(glass, Phaser.Physics.ARCADE);

    timeText = game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
    
    cup = platforms.create(1720, 900, 'coc_nuoc');    
    timer = game.time.create();
    // timer.repeat(1 * Phaser.Timer.SECOND, 7200, updateTime, this);
    timerEvent = timer.add(Phaser.Timer.MINUTE * 3, endTimer, this);
        
    // Start the timer
    timer.start();
}    

function render() {
    // game.debug.text("Time until event: " + game.time.events.duration, 32, 32);
    seconds = Math.round((timerEvent.delay - timer.ms) / 1000)

    if (timer.running) {
        timeText.text = formatTime(Math.round((timerEvent.delay - timer.ms) / 1000));
    }
    else {
        timeText.text = "Over time!";
    }      
}

function formatTime(s){
    // Convert seconds (s) to a nicely formatted and padded time string
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}

function update(){
    switch(seconds){
        case 180:
            cup.frame = 0;
            break;
        case 160:
            cup.frame = 1;
            break;
        case 140:
            cup.frame = 2;
            break;
        case 120:
            cup.frame = 3;
            break;
        case 100:
            cup.frame = 4;
            break;
        case 80:
            cup.frame = 5;
            break;
        case 60:
            cup.frame = 6;
            break;
        case 40:
            cup.frame = 7;
            break;
        case 20:
            cup.frame = 7;
            break;
        case 0:
            cup.frame = 8;
            break;
    }
}

function endTimer(){
    console.log("end time");
}

function initLabelDragDrop(x,y, source){
    var label = platforms.create(x, y, source);
    label.inputEnabled = true;
    label.input.enableDrag(true);
    label.events.onDragStart.add(onDragStart, this, source);
    label.events.onDragStop.add(onDragStop, this);
    return label;
}

function initLatch(x, y){
    var obj = platforms.create(x, y, "latch");    
    return obj;
}

function initPantAnimation(x, y, source){
    var obj = platforms.create(x, y, source);
    
    obj.animations.add('pant');
    obj.animations.play('pant', 10, true);
    return obj;
}


function moveGlass (glass) {
    glass.body.velocity.x = -2000;
    console.log("move Glass");
}

function onDragStart(sprite, pointer){
    console.log("dag label");
}


function onDragStop(sprite, pointer){
    
    var xInCorrect = 0;
    var yInCorrect = 0;
    var latch = null;

    switch(sprite.key){
        case "the_alphabet":
            xInCorrect = 0; yInCorrect=900;
            latch = alphabetLatch;
            break;
        case "the_chair":
            xInCorrect = 250; yInCorrect=900;
            latch = chairLatch;
            break;
        case "the_esear":
            xInCorrect = 500; yInCorrect=900;
            latch = esearLatch;
            break;
        case "the_page":
            xInCorrect = 750; yInCorrect=900;
            latch = pageLatch;
            break;
        case "the_pencil":
            xInCorrect = 1000; yInCorrect=900;
            latch = pencilLatch;
            break;
        case "the_ruler":
            xInCorrect = 1200; yInCorrect=900;
            latch = rulerLatch;
            break;
    }

    var dropResult = game.physics.arcade.overlap(sprite, latch, dropOnLatch, null, this);
    
    if(!dropResult){
        sprite.x = xInCorrect;
        sprite.y = yInCorrect;
    }
   console.log("dag stop");
}

function dropOnLatch(sprite){
    sprite.input.enabled = false;
}