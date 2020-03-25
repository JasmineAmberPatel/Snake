const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/doughnut.png";

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

let score = 0;

document.addEventListener("keydown", directionCodes);

let direction;
let snakeX = snake[0].x;
let snakeY = snake[0].y;

function directionCodes(event) {
    let key = event.keyCode;
    if (key == 37 && direction != "Right") {
        snakeX -= box;
    } else if (key == 38 && direction != "Down") {
        snakeY -= box;
    } else if (key == 39 && direction != "Left") {
        snakeX += box;
    } else if (key == 40 && direction != "Up") {
        snakeY += box;
    }
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    context.drawImage(ground, 0, 0);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = (i === 0) ? "slategrey" : "white";
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = "slategrey";
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }
    context.drawImage(foodImg, food.x, food.y);

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box,
        }
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);


    context.fillStyle = "white"
    context.font = "45px Verdana one"
    context.fillText(score, 2 * box, 1.6 * box);
}

let game = setInterval(draw, 100);
