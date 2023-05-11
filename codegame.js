const world = document.getElementById('world');
const penCanvas = world.getContext('2d');

// Ширина и количество квадратов на игровом поле
let squareWidth = 20;
let numberOfSquares = world.width/squareWidth;

// Обьекты по оси X и Y
let startPositionOfTheSnake = {
	x:0,
	y:0,
};

let foodForSnake = {
	x:10,
	y:10,
};

let snake = [];
let snakeHead = {
	x:15,
	y:15,
};

// Начальная длина змеи
let initialLengthOfTheChange = 3;

// Функция рисует простарство для игры
function drawWorld() {
	penCanvas.fillStyle = 'black';
	penCanvas.fillRect(0,0, world.width, world.height)
};

// Функция отрисовывает змею на игровом поле
function drawSnake() {
	penCanvas.fillStyle = 'orange';
	for(let index = 0; index < snake.length; index++)
	// создаёт блоки 
	 {
		penCanvas.fillRect(snake[index].x *squareWidth, snake[index].y *squareWidth, squareWidth-2, squareWidth-2)
// столкновение головы с телом
		if(
			snake[index].x === snakeHead.x && 
			snake[index].y === snakeHead.y
		) {
			initialLengthOfTheChange -=1
			alert("Что же ты делаешь, рука твоя труба мотал")
		}
	}

}