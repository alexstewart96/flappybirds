//create our main state that will contain the game
var mainState = {
    preload: function() {
      //This function will be exicuted at the beginning
      //thats where we load the images and sound

      //load the bird sprite
      game.load.image('bird', 'assets/bird.png');
      game.load.image('pipe', 'assets/pipe.png');
    },
    
    create: function() {
      //This function is called after the preload function
      //here we setup the game, display sprites

      //change the backgrouns colour of the game to blue - for now
      game.stage.backgroundColor = '#71c5cf';

      //set the physics for the game
      game.physics.startSystem(Phaser.Physics.ARCADE);

      //display the bird at the position of x=100 and y=245
      this.bird = game.add.sprite(100, 245, 'bird');

      //add physics to the bird
      //needed for:movement gravity and collisions, etc.
      game.physics.arcade.enable(this.bird);

      //add gravity to the bird to make it fall
      this.bird.body.gravity.y = 1000;

      //call 'jump' function when the spacebar is pressed
      var spaceBar = game.input.keyboard.addkey(phaser.keyboard.spaceBar);
      spaceBar.onDown.add(this.jump, this);

      //Create an empty group
      this.pipes = game.add.group();

      //Timer for pipes
      this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);

      //Score
      this.score = 0;
      this.labelScore = game.add.text(20, 20, "0", {
        font: "30px Mono",
        fill: "#ffffff"
      });

    },

    update: function() {
      //This function is called 60 times per second
      //It contains the games logic
      //call the 'restartgame' function
      if (this.bird.y < 0 || this.bird.y > 490) 
        this.restartGame();
    // Slowly rotate the bird downward, up to a certain point

    if(this.bird.angle < 20) {
      this.bird.angle += 1;
    }
  },

  jump : function() {

    //Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
    // Create an animation on the bird

    var animation = game.add.tween(this.bird);

    // Change the angle of the bird to -20° in 100 milliseconds

    animation.to({angle: -20}, 100);

    // And start the animation

    animation.start();
  },

  //restartthe game
  restartGame : function() {
    //start the main state which restarts the game
    game.state.start('main');
  },
  //add a pipe
  addOnePipe : function(x, y) {
    //create a pipe ay the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    //add pipe to group
    this.pipes.add(pipe);

    //Enable the physics on the pipe
    game.physics.arcade.enable(pipe);

    //add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200;

    //Automatically kill pipe when it is no longer visible
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;

    //calls the restartGame function each time the bird dies

    game.physics.arcade.overlap(this.bird, this.pipes, this.restartGame, null, this);
  },

  //many pipes
  addRowOfPipes : function() {
    //Randomly pick a number between 1 and 5
    //This will be the hole position in the pipe
    var hole = Math.floor(Math.random() * 5) + 1;

    //Add 6 pipes
    for (var i = 0; i < 8; i++) 
      if (i != hole && i != hole + 1) 
        this.addOnePipe(400, i * 60 + 10);
  
    //Increases score as new pipes are created

    this.score += 1;

    this.labelScore.text = this.score;

  }
};
//initialise phaser and create a 400px x 490px game
var game = new Phaser.Game(400, 490);

//add the mainstate and call it main
game.state.add('main', mainState);

//start the state to actually start the game
game.state.start('main');
