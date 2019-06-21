// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //assign enemy x, y, speed, and it's sprite
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = Math.floor(Math.random() * 150) + 50
    this.speed = speed;
   
};
var score = 0;
var speedMultiplier = 15;
var score_counts = false;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //offscreen enemy gets random y  and random speed
    this.goneOff = 505;
    this.startingXPOS = -100;
    if (this.x >= this.goneOff) {
        this.x = this.startingXPOS;
        this.y = Math.floor(Math.random() * 180) + 50
        this.randomSpeed();
    }
    if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y > player.y - 75 && this.y < player.y + 75)) {
        console.log("collision detected");
        setTimeout(()=> {
            player.x = 200;
            player.y = 400;
            score = 0;
        }, 100);
    }
    
    
};


//enemy gets a random speed
Enemy.prototype.randomSpeed = function (){
    //a random number for the speed
    this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

//draws the enemy 
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);


};
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// Instantiate all enemies, set to 6, push to allEnemies array
for (var i = 0; i < 6; i++) {
    //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 15 + 1);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// Creating my player object with a sprite, x, and a y.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

//my Gem appears and has a sprite, x, and a y.
var gemG = function (x,y,sprite) {
    this.sprite = 'images/gg.png';
    this.x = 50;
    this.y = 200;
};
//drawing my gem on the screen
gemG.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//drawing the player on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//making a new gem and a player.
var Gem = new gemG();
var player = new Player();

Player.prototype.handleInput = function(keyPress){
    //checks for key presses and moves the player accordingly
    if(keyPress == 'left' && this.x>0){
        this.x-=100;
    };
    if(keyPress == 'left' && this.x < 15){
        this.x = 15;
    };
    if(keyPress == 'right' && this.x>0){
        this.x+=100;
    };
    if(keyPress == 'right' && this.x >410){
        this.x = 410;
    };
    if(keyPress == 'up' && this.y>0){
        this.y-=82;
    };
    if(keyPress == 'down' && this.y<405){
        this.y+=82;
    };
    if(keyPress == 'down' && this.y>400){
        this.y = 400;
    };
    //if you reach the water your score increases
    if(this.y < 81) {
        setTimeout(()=> {
          this.x = 200;
          this.y = 400;
          score = score + 1;
          document.getElementById("scoreNum").innerHTML = score;
          console.log(score);
        }, 500);
        
    }
   //get a score of 10+ you win
    if(score >= 10){
        alert("Yay! You won!");
        score = 0;
    }
}
//changes the players image if you want to change your player.
const img1 = document.querySelector(".iMG");

img1.onclick = function(){
    player.sprite = 'images/char-boy.png';
    
}

const img2 = document.querySelector(".iMG1");

img2.onclick = function(){
    player.sprite = 'images/char-pink-girl.png';
    
}

const img3 = document.querySelector(".iMG2");

img3.onclick = function(){
    player.sprite = 'images/char-horn-girl.png';
}

const img4 = document.querySelector(".iMG3");

img4.onclick = function(){
    player.sprite = 'images/char-princess-girl.png';
}

const img5 = document.querySelector(".iMG4");

img5.onclick = function(){
    player.sprite = 'images/char-cat-girl.png';
}
//checks for collision between the gem and the player.

gemG.prototype.update = function(){
    if ((this.x > player.x - 75 && this.x < player.x + 75) && (this.y > player.y - 75 && this.y < player.y + 75)) {
       
            document.getElementById("scoreNum").innerHTML = score +=1;
            console.log(score);
            //relocates gem after collision as well as player
            this.y= Math.floor(Math.random() * 150) + 50;
            this.x=Math.floor(Math.random() * 100)+100
            player.y = 400;
            player.x = 200;
        
    }
};


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
