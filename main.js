//create our main state that will contain the game
var mainStage = {
    preload: function() {}
    //This function will be exicuted at the beginning 
    //thats where we load the images and sound
   },

     create: function() {
      //This function is called after the preload function
      //here we setup the game, display sprites
    
    
    },
        
       update: function () {
            //This function is called 60 times per second
            //It contains the games logic
        
},
    
};

//initialise phaser and create a 400px x 490px game
var game = new Phaser.game(400, 490);

//add the mainstate and call it main
game.state.add('main' , mainstate);

//start the state to actually start the game
game.state.start('main');



