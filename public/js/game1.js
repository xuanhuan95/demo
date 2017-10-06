var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.image('background', 'assets/tusach/tool/BG.png');
    game.load.image('latch', 'assets/tusach/tool/chot.png');
    game.load.image('the_alphabet', 'assets/tusach/tool/the_alphabet.png');
    game.load.image('the_chair', 'assets/tusach/tool/the_chair.png');
    game.load.image('the_esear', 'assets/tusach/tool/the_esear.png');
    game.load.image('the_page', 'assets/tusach/tool/the_page.png');
    game.load.image('the_pencil', 'assets/tusach/tool/the_pencil.png');
    game.load.image('the_ruler', 'assets/tusach/tool/the_ruler.png');
    
    game.load.spritesheet('bang_abc', 'assets/tusach/motion/bang_abc.png', 316, 166);
    game.load.spritesheet('but_chi', 'assets/tusach/motion/but_chi.png', 409, 95);
    game.load.spritesheet('coc_nuoc', 'assets/tusach/motion/coc_nuoc.png', 457, 159);
    game.load.spritesheet('cua_kinh', 'assets/tusach/motion/cua_kinh.png', 1924, 909);
    game.load.spritesheet('cuc_tay', 'assets/tusach/motion/cuc_tay.png', 223, 142);
    game.load.spritesheet('ghe', 'assets/tusach/motion/ghe.png', 196, 304);
    game.load.spritesheet('giay', 'assets/tusach/motion/giay.png', 247, 227);
    game.load.spritesheet('thuoc', 'assets/tusach/motion/thuoc.png', 477, 184);
    game.load.spritesheet('fish', 'assets/tusach/fish.png', 184, 104);
}

var platforms;
var sprites;
var fish;

function create() {
    sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);

    // game.physics.startSystem(Phaser.Physics.ARCADE);

    for (var i = 0; i < 5; i++)
    {
        var s = sprites.create(0, game.rnd.integerInRange(32, 200), 'fish');
        s.animations.add('fish');
        s.play('fish', 20, true);
        s.body.velocity.set(game.rnd.integerInRange(-200, 200), game.rnd.integerInRange(-200, 200));
    }

    sprites.setAll('body.collideWorldBounds', true);
    sprites.setAll('body.bounce.x', 1);
    sprites.setAll('body.bounce.y', 1);

    // //  A simple background for our game
    // game.add.sprite(0, 0, 'background');

    // //  The platforms group contains the ground and the 2 ledges we can jump on
    // platforms = game.add.group();

    // initPantAnimation(200, 150, 'bang_abc');
    // initPantAnimation(900, 90, 'ghe');
    // initPantAnimation(1500, 150, 'giay');
    
    // initPantAnimation(200, 550, 'but_chi');
    // initPantAnimation(900, 550, 'cuc_tay');
    // initPantAnimation(1400, 550, 'thuoc');
    
    // var alphabetLatch = initLatch(350,20);
    // var chairLatch = initLatch(950,20);
    // var pageLatch = initLatch(1600,20);
    

    // var pencilLatch = initLatch(350,400);
    // var esearLatch = initLatch(950,400);
    // var rulerLatch = initLatch(1600,400);
    

    // var alphabetLabel = platforms.create(0,900, 'the_alphabet');
    // var chairLabel = platforms.create(250,900, 'the_chair');
    // var esearLabel = platforms.create(500,900, 'the_esear');
    // var pageLabel = platforms.create(750,900, 'the_page');
    // var pencilLabel = platforms.create(1000,900, 'the_pencil');
    // var rulerLabel = platforms.create(1200,900, 'the_ruler');
    
    // fish = initPantAnimation(0,0,'fish');
    // var glass = platforms.create(0, 0, 'cua_kinh');
    
    // glass.animations.add('pant');
    // glass.animations.play('pant', 10, true);
    
    // glass.inputEnabled = true;
    // glass.events.onInputDown.add(moveGlass, this);
    // game.physics.enable(fish, Phaser.Physics.ARCADE);
}

function update(){
    game.physics.arcade.collide(sprites);
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