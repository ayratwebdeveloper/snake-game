const world = document.getElementById('world')
const pen = world.getContext('2d')
// Ширина и количество квадратов на игровом поле
let tileSize = 20
let tileCount = world.width /tileSize
// Обьекты по оси X и Y
let velocity = {
	x:0,
	y:0,
}
let food = {
	x:25,
	y:2,
}
let snake = []
let snakeHead = {
	x:5,
	y:5,
}
// Начальная длина змеи
let snakeTailCount = 1
// Функция рисует простарство для игры
function drawWorld() {
	pen.fillStyle = 'black'
	pen.fillRect(0,0, world.width, world.height)
}
// Функция отрисовывает змею на игровом поле
function drawSnake() {
	pen.fillStyle = 'darkgreen'
	for(let i = 0; i < snake.length; i++)
	// создаёт блоки 
	 {
		penCanvas.fillRect(snake[i].x *tileSize, snake[i].y *tileSize, tileSize-2, tileSize-2)
// столкновение головы с телом
		if(
			snake[i].x === snakeHead.x && 
			snake[i].y === snakeHead.y
		) {
			snakeTailCount = 1
			// alert("Что же ты делаешь, рука твоя труба лотал")
		}
	}
}
// Устанавливаем положение еды для змеи
function drawFood() {
	pen.fillStyle = 'orange'
	pen.fillRect(food.x *tileSize, food.y *tileSize, tileSize -2, tileSize -2)
}
// Обновляем позицию главы относительно скорости перемещения змеи
function updateSnakeHead() {
	snakeHead.x +=velocity.x
	snakeHead.y +=velocity.y
// столкновения с границей карты 
	if (snakeHead.x < 0) { snakeHead.x = tileCount - 1}
	if (snakeHead.x > 0) { snakeHead.x = tileCount - 1}
	if (snakeHead.y < 0) { snakeHead.y = tileCount - 1}
	if (snakeHead.y > 0) { snakeHead.y = tileCount - 1}
}
// Генерируем тело змеи
function updateSnakeBody() {
	snake.push({
		x:snakeHead.x,
		y:snakeHead.y
	})
// проверка количества плиток длине змеи
	while(snake.length >snakeTailCount){
		snake.shift()
	}
}
// Разбрасываем еду для змени на игровом поле и проверяем столкнулась ли она с едой
function eatFood() {
	if(food.x === snakeHead.x && food.y === snakeHead.y){
		// змея растет
		snakeTailCount ++
// новое расположение еды
		food.x = Math.floor(Math.random() *tileCount),
		food.y = Math.floor(Math.random() *tileCount)
	}
}
// Обрабатываем нажатие на кнопки
const keyDownHandlers = {
	'ArrowLeft': () => {
		velocity.x = -1
		velocity.y = 0
	},
	'ArrowRight': () => {
		velocity.x = 1
		velocity.y = 0
	},
	'ArrowUp': () => {
		velocity.x = 0
		velocity.y = -1
	},
	'ArrowDown': () => {
		velocity.x = 0
		velocity.y = 1
	}
}
// Обрабатываем события
function onKeyDown (event) {
	if(keyDownHandlers.hasOwnProperty(event.key)){
		keyDownHandlers[event.key]()
	}
}
// Обновляем игровой мир
function updateGame(){
	updateSnakeHead()

	drawWorld()
  // drawSnake()

	eatFood()
	drawFood()

	updateSnakeBody()
}
// Обработчик нажатия на клавиши
document.addEventListener('keydown', onKeyDown)
setInterval(updateGame, 1000/3)