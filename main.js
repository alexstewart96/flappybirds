//create our main state that will contain the game
var mainStage = {
    preload: function() {
    //This function will be exicuted at the beginning 
    //thats where we load the images and sound
   

    //load the bird sprite
    game.load.image('bird', 'assets/bird.png');
    
    },
     create: function() {
      //This function is called after the preload function
      //here we setup the game, display sprites
    
      //change the backgrouns colour of the game to blue - for now
         game.stage.backgroundColor = '#71c5cf';
         
         //set the physics for the game
         game.physics.startsystem(Phaser.Physics.ARCADE);
         
         //display the bird at the position of x=100 and y=245
         this.bird = game.add.sprite(100, 245, 'bird');
         
         //add physics to the bird
         //needed for:movement gravity and collisions, etc.
         game.physics.arcade.enable(this.bird);
         
         //add gravity to the bird to make it fall
         this.bird.body.gravity.y = 1000;
         
         //call 'jump' function when the spacebar is pressed
         var spaceBar = game.input.keyboard.addkey(                                                                                                                              phaser.keyboard.spaceBar);
         spaceBar.onDown.add(this.jump, this);
    },
        
       update: function () {
            //This function is called 60 times per second
            //It contains the games logic
        
           //call the 'restartgame' function
           if (this.bird.y <0 || this.bird.y > 490)
               this.restartGame();
},
    
    jump: function() {
        
        //Add a vertical velocity to the bird
        this.bird.body.velocity.y = -350;
    },
    
    //restartthe game
    restartGame: function() {
    //start the main state which restarts the game
    game.state.start('main');
},
};

//initialise phaser and create a 400px x 490px game
var game = new Phaser.game(400, 490);

//add the mainstate and call it main
game.state.add('main' , mainstate);

//start the state to actually start the game
game.state.start('main');



