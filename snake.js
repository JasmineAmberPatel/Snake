const canvas = document.getElementById("snake");
const context = canvas.getContext("2d");

const box = 32;

const ground = new Image();
ground.src = "images/background.jpg";

const random_images_array = ["apple.png", "cakey.png", "doughnut.png", "food.png", "melon.png"];

function getRandomImage(imgAr, path) {
    path = path || 'images/';
    let num = Math.floor(Math.random() * imgAr.length);
    let img = imgAr[num];
    let imgStr = '<img src="' + path + img + '" alt = "">';
    document.write(imgStr); document.close();
}

const foodImg = new Image();
foodImg.src = "images/melon.png"; //getRandomImage(random_images_array);


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

let d;

document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key === 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key === 38 && d != "DOWN") {
        d = "UP";
    } else if (key === 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key === 40 && d != "UP") {
        d = "DOWN";
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

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d === "LEFT") snakeX -= box;
    if (d === "UP") snakeY -= box;
    if (d === "RIGHT") snakeX += box;
    if (d === "DOWN") snakeY += box;

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


    context.fillStyle = "slategrey"
    context.font = "45px Verdana"
    context.fillText(score, 2 * box, 2 * box);
}

let game = setInterval(draw, 100);
