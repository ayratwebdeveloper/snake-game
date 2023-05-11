const playground = document.getElementById('playground')
const gameObject = playground.getContext('2d')
// Ширина и количество квадратов на игровом поле
let tileSize = 20
let tileCount = playground.width /tileSize
// Обьекты по оси X и Y
let displacementSpeed = {
	x:0,
	y:0,
}
let snakeFood = {
	x:15,
	y:15,
}
let snakeSize = []
let snakeHead = {
	x:10,
	y:10,
}
// Начальная длина змеи
let snakeTailCount = 3
// Функция рисует простарство для игры
function drawWorld() {
	gameObject.fillStyle = 'black'
	gameObject.fillRect(0,0, playground.width, playground.height)
}
// Функция отрисовывает змею на игровом поле
function drawSnake() {
	gameObject.fillStyle = 'red'
	for(let index = 0; index < snakeSize.length; index++)
	// создаём блоки 
	 {
		gameObject.fillRect(snakeSize[index].x *tileSize, snakeSize[index].y *tileSize, tileSize-2, tileSize-2)
// столкновение головы с телом
		if(
			snakeSize[index].x === snakeHead.x && 
			snakeSize[index].y === snakeHead.y
		) {
			snakeTailCount =3
		}
	}
}
// Устанавливаем положение еды для змеи
function drawFood() {
	gameObject.fillStyle = 'orange'
	gameObject.fillRect(snakeFood.x *tileSize, snakeFood.y *tileSize, tileSize -2, tileSize -2)
}
// Обновляем позицию главы относительно скорости перемещения змеи
function updateSnakeHead() {
	snakeHead.x +=displacementSpeed.x
	snakeHead.y +=displacementSpeed.y
// столкновения с границей карты 
	if (snakeHead.x < 0) { 
		snakeHead.x = tileCount - 1
	}
	if (snakeHead.x > tileCount - 1) { 
		snakeHead.x = 0
	}
	if (snakeHead.y < 0) {
		 snakeHead.y = tileCount - 1
		}
	if (snakeHead.y > tileCount - 1) { 
		snakeHead.y = 0
	}
}
// Генерируем тело змеи
function updateSnakeBody() {
	snakeSize.push({
		x:snakeHead.x,
		y:snakeHead.y
	})
// проверка количества плиток к длине змеи
	while(snakeSize.length >snakeTailCount){
		snakeSize.shift()
	}
}
// Разбрасываем еду для змени на игровом поле и проверяем столкнулась ли она с едой
function eatFood() {
	if(snakeFood.x === snakeHead.x && snakeFood.y === snakeHead.y){
		// змея растет
		snakeTailCount ++
// новое расположение еды
		snakeFood.x = Math.floor(Math.random() *tileCount),
		snakeFood.y = Math.floor(Math.random() *tileCount)
	}
}
// Обрабатываем нажатие на кнопки
const keyDownHandlers = {
	'ArrowLeft': () => {
		displacementSpeed.x = -1
		displacementSpeed.y = 0
	},
	'ArrowRight': () => {
		displacementSpeed.x = 1
		displacementSpeed.y = 0
	},
	'ArrowUp': () => {
		displacementSpeed.x = 0
		displacementSpeed.y = -1
	},
	'ArrowDown': () => {
		displacementSpeed.x = 0
		displacementSpeed.y = 1
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
	drawSnake()
	
	eatFood()
	drawFood()

	updateSnakeBody()
}
// Обработчик нажатия на клавиши
document.addEventListener('keydown', onKeyDown)
setInterval(updateGame, 1000/7)