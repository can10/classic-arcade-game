// Enemies our player must avoid
var Enemy = function (x, y, speed) {
	// Variables applied to each of our instances go here,
	// we've provided one for you to get started

	this.x = x;
	this.y = y + 60; // offset for the visual canvas is 60
	this.horizontalStep = 101;
	this.boundary = this.horizontalStep * 5;
	this.speed = speed;

	// The image/sprite for our enemies, this uses
	// a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.

	if (this.x < this.boundary) {
		this.x = this.x + this.speed * dt;
	} else { // start from left side if the screen again
		this.x = -this.boundary;
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
function Player() {

	// Properties
	this.horizontalStep = 101;
	this.verticalStep = 83;
	this.startX = this.horizontalStep * 2;
	this.startY = (this.verticalStep * 4) + 60;
	this.isWon = false;

	this.x = this.startX;
	this.y = this.startY;
	this.sprite = 'images/char-boy.png';

	// Methods
	this.update = function () {

		// If collision happens
		for (let enemy of allEnemies) {
			if (this.y === enemy.y &&
				(enemy.x + enemy.horizontalStep / 2 > this.x && enemy.x < this.x + this.horizontalStep / 2)) {
				this.reset(); // Player is back to the initial stage
			}
		}

		if (this.y === -23 && this.isWon === false) { // win coordinate is -23
			// Player wins the game
			this.isWon = true;
		}
	};

	this.render = function () {
		// Draw the player in the canvas
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	this.handleInput = function (pressedKey) {
		console.log(pressedKey);

		if (pressedKey === 'left') {
			if (this.x > 0) {
				this.x -= this.horizontalStep;
			}
		} else if (pressedKey === 'up') {
			if (this.y > 0) {
				this.y -= this.verticalStep;
			}
		} else if (pressedKey === 'right') {
			if (this.x < this.horizontalStep * 4) {
				this.x += this.horizontalStep;
			}
		} else if (pressedKey === 'down') {
			if (this.y < this.verticalStep * 4) {
				this.y += this.verticalStep;
			}
		}
	};

	this.reset = function () {
		this.x = this.startX;
		this.y = this.startY;
	};
}

function initGame() {

	createModal(); // Create the modal

	// Instantiate the enemies
	bug1 = new Enemy(-101, 0, 200); // A bug in the first row
	bug2 = new Enemy(-101, 83 * 2, 180); // A bug in the third row
	bug3 = new Enemy((-101 * 5), 83, 300); // A bug in the second row
	bug4 = new Enemy(-101, 83, 300); // A bug in the second row
	bug5 = new Enemy(-101, 0, 150); // A bug in the first row
	bug6 = new Enemy((-101 * 2.5), 83, 300); // A bug in the first row
	bug7 = new Enemy(-101, 83 * 2, 200); // A bug in the first row

	allEnemies = [];
	allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6, bug7);

	// Instantiate the player
	player = new Player();

	// Hide the modal
	modalElement.style.display = "none";
}

function createModal() {

	// Create the modal elements and create a DOM
	modalElement = document.createElement("div");
	modalContent = document.createElement("div");
	headerText = document.createElement("h1");
	headerText.textContent = "Congratulations!";
	paragraphText = document.createElement("p");
	paragraphText.textContent = "... You reached the sea!";
	replayButton = document.createElement("button");
	replayButton.textContent = "Play again!";
	modalContent.appendChild(headerText);
	modalContent.appendChild(paragraphText);
	modalContent.appendChild(replayButton);
	modalElement.appendChild(modalContent);
	document.body.insertBefore(modalElement, document.body.childNodes[1]);

	// Set the attribues of the modal elements
	modalElement.setAttribute("style", "display: none; position: fixed; z-index: 1; \
		padding-top: 200px; left: 0; top: 0; \
		width: 100%; height: 100%; overflow: auto; \
		background-color: rgba(0,0,0,0.4);");

	modalContent.setAttribute("style", "position: relative; background: #B9C1FE; \
		margin: auto; padding: 0; text-align: center; \
		border: 2px solid #888; border-radius: 2px; width: 60%; \
		box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);");

	headerText.setAttribute("style", "color: #001f3f; font-family: Georgia; font-size: 40px");

	paragraphText.setAttribute("style", "color: #0074D9; font-family: Lucida Console; font-size: 28px; font-weight: bold; \
		font-style: italic;");

	replayButton.setAttribute("style", "margin: 50px; font-size: 20px; background-color: #DAD9D9; \
		color: black; border: 2px solid black; cursor: pointer;");

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let bug1, bug2, bug3, bug4, bug5, bug6, bug7;
let allEnemies;

// Place the player object in a variable called player
let player;

// Create the modal elements globally
let modalElement;
let modalContent;
let headerElement;
let replayButton;

initGame(); // initialize the game

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});

// Click event for the replay button
replayButton.addEventListener("click", function (event) {
	location.reload();
});