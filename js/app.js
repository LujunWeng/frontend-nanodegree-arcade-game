"use strict";
var Role = function () {
    this.reset();
};

Role.prototype.reset = function () {
    this.x = 0;
    this.y = 0;
    this.sprite = "";
};

Role.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x * 101, this.y * 83 - 20);
};

Role.prototype.update = function (dt) {
};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    Role.call(this);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = Object.create(Role.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function () {
    this.y = Math.floor(Math.random() * 3) + 1;
    this.x = -1;
    this.speed = Math.random() * 2 + 1;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.moveRight(this.speed * dt);
};

Enemy.prototype.moveRight = function (movement) {
    this.x += movement;
    if (this.x >= 5) {
        this.reset();
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    Role.call(this);
    this.sprite = 'images/char-boy.png';
};

Player.prototype = Object.create(Role.prototype);
Player.prototype.constructor = Player;

Player.prototype.reset = function () {
    this.y = 5;
    this.x = 2;
};

Player.prototype.moveUp = function () {
    this.y--;
    if (this.y <= 0) {
        this.reset();
    }
};

Player.prototype.moveDown = function () {
    if (this.y < 5) {
        this.y++;
    }

};

Player.prototype.moveLeft = function () {
    if (this.x > 0) {
        this.x--;
    }
};

Player.prototype.moveRight = function () {
    if (this.x < 4) {
        this.x++;
    }
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            this.moveUp();
            break;
        case 'down':
            this.moveDown();
            break;
        case 'left':
            this.moveLeft();
            break;
        case 'right':
            this.moveRight();
            break;
        default:
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy());
}

function checkCollisions() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (allEnemies[i].y === player.y) {
            var dist = Math.abs(allEnemies[i].x - player.x);
            if (dist < 0.5) {
                player.reset();
            }
        }
    }
}

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
