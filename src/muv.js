let canvas, ctx, figures, idTimer, elements, directions, speed = 5;
		let N = 10;
		let maxN = 80;

		function getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
		class TFigure {
			constructor(pX, pY) {
				this.posX = pX;
				this.posY = pY;
				this.color = 'rgb('+Math.floor(Math.random()*256)+','
						+Math.floor(Math.random()*256)+','+Math.floor(Math.random()*256)+')';
				this.size = getRandomInt(N, maxN);
				this.direction = Math.floor(Math.random() * 8);
			}

		}
		class TBall extends TFigure {
			gradientFill(ctx) {
				let gradient = ctx.createRadialGradient(this.posX +  this.size / 4,
						this.posY - this.size / 6, this.size / 8, this.posX, this.posY, this.size);
				gradient.addColorStop(0, '#fff');
				gradient.addColorStop(0.85, this.color);
				return gradient;
			}
			draw(ctx) {
				ctx.fillStyle = this.gradientFill(ctx);
				ctx.beginPath();
				ctx.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
				ctx.closePath();
				ctx.fill();
			}
		}

		class TRectangle extends TFigure {
			draw(ctx) {
				ctx.fillStyle = this.gradientFill(ctx);
				ctx.beginPath();
				ctx.fillRect(this.posX, this.posY, this.size, this.size);
				ctx.closePath();
			}

			gradientFill(ctx) {
				let gradient = ctx.createLinearGradient(this.posX, this.posY, this.posX + this.size, this.posY + this.size);
				gradient.addColorStop(0, '#fff');
				gradient.addColorStop(0.85, this.color);
				return gradient;
			}
		}

		class TTriangle extends TFigure {
			draw(ctx) {
				ctx.fillStyle = this.gradientFill(ctx);
				ctx.beginPath();
				ctx.moveTo(this.posX, this.posY);
				ctx.lineTo(this.posX + this.size / 2, this.posY + this.size);
				ctx.lineTo(this.posX - this.size / 2, this.posY + this.size);
				ctx.fill();
			}
			gradientFill(ctx) {
				let gradient = ctx.createLinearGradient(this.posX, this.posY, this.posX + this.size, this.posY + this.size);
				gradient.addColorStop(0, '#fff');
				gradient.addColorStop(0.85, this.color);
				return gradient;
			}
		}

		function drawBack(ctx, col1, col2, w, h) {
			// закрашиваем канвас градиентным фоном
			ctx.save();
			let g = ctx.createLinearGradient(0, 0, 0, h);
			g.addColorStop(1, col1);
			g.addColorStop(0, col2);
			ctx.fillStyle = g;
			ctx.fillRect(0, 0, w, h);
			ctx.restore();
		}

		function randomEl() {
			return Math.floor(Math.random() * elements.length);
		}
		// инициализация работы
		function init(){

			canvas = document.getElementById('canvas');
			if (canvas.getContext){
				ctx = canvas.getContext('2d');
				//рисуем фон
				drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
				elements = [TBall, TRectangle, TTriangle];
				figures = [];
				for (let i = 1; i<=10;i++){
					let item = new elements[randomEl()](10+Math.random()*(canvas.width-30),
					10+Math.random()*(canvas.height-30));
					item.draw(ctx);
					figures.push(item);
				}
			}
		}
		// создаем новый шарик по щелчку мыши, добавляем его в массив шариков и рисуем его
		function goInput(event){
			let x = event.clientX;
			let y = event.clientY;
			let item = new elements[randomEl()](x - 15, y);
			item.draw(ctx);
			figures.push(item);
		}

		function moveFigUp(){
			//реализация движения шариков, находящихся в массиве figures
			drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
			for (let i = 0; i < figures.length;i){
				figures[i].posX = figures[i].posX + (Math.random()*4-2);
				figures[i].posY = figures[i].posY + (Math.random()*2-speed);
				figures[i].draw(ctx);
				check_collusion(figures[i]);
				figures[i].size += 1;
				if (figures[i].size >= maxN) {
					figures.splice(i, 1);
					continue;
				}
				if ((figures[i].posX > canvas.width) || (figures[i].posX < 0) || (figures[i].posY < 0) || (figures[i].posY > canvas.height)) {
					figures.splice(i, 1);
				} else {
					i++;
				}
				let direction = document.getElementById("directions");
				direction = direction.getElementsByClassName("active");
				direction = direction.item(0).childNodes[1].getAttribute('value');
				if (direction === 'up') {
					continue;
				} else {
					move();
				}
			}
		}
		function moveFigDown(){
			//реализация движения шариков, находящихся в массиве figures
			drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
			for (let i = 0; i < figures.length;i){
				figures[i].posX = figures[i].posX - (Math.random()*4-2);
				figures[i].posY = figures[i].posY - (Math.random()*2-speed);
				figures[i].draw(ctx);
				check_collusion(figures[i]);
				figures[i].size += 1;
				if (figures[i].size >= maxN) {
					figures.splice(i, 1);
					continue;
				}
				if ((figures[i].posX > canvas.width) || (figures[i].posX < 0) || (figures[i].posY < 0) || (figures[i].posY > canvas.height)) {
					figures.splice(i, 1);
				} else {
					i++;
				}
				let direction = document.getElementById("directions");
				direction = direction.getElementsByClassName("active");
				direction = direction.item(0).childNodes[1].getAttribute('value');
				if (direction === 'down') {
					continue;
				} else {
					move();
				}
			}

		}
		function moveFigRight(){
			//реализация движения шариков, находящихся в массиве figures
			drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
			for (let i = 0; i < figures.length;i){
				figures[i].posX = figures[i].posX - (Math.random()*2-speed);
				figures[i].posY = figures[i].posY - (Math.random()*4-2);
				figures[i].draw(ctx);
				check_collusion(figures[i]);
				figures[i].size += 1;
				if (figures[i].size >= maxN) {
					figures.splice(i, 1);
					continue;
				}
				if ((figures[i].posX > canvas.width) || (figures[i].posX < 0) || (figures[i].posY < 0) || (figures[i].posY > canvas.height)) {
					figures.splice(i, 1);
				} else {
					i++;
				}
				let direction = document.getElementById("directions");
				direction = direction.getElementsByClassName("active");
				direction = direction.item(0).childNodes[1].getAttribute('value');
				if (direction === 'right') {
					continue;
				} else {
					move();
				}
			}

		}
		function moveFigLeft(){
			drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
			for (let i = 0; i < figures.length;i){
				figures[i].posX = figures[i].posX + (Math.random()*2-speed);
				figures[i].posY = figures[i].posY + (Math.random()*4-2);
				figures[i].draw(ctx);
				check_collusion(figures[i]);
				figures[i].size += 1;
				if (figures[i].size >= maxN) {
					figures.splice(i, 1);
					continue;
				}
				if ((figures[i].posX > canvas.width) || (figures[i].posX < 0) || (figures[i].posY < 0) || (figures[i].posY > canvas.height)) {
					figures.splice(i, 1);
				} else {
					i++;
				}
				let direction = document.getElementById("directions");
				direction = direction.getElementsByClassName("active");
				direction = direction.item(0).childNodes[1].getAttribute('value');
				if (direction === 'left') {
					continue;
				} else {
					move();
				}
			}
		}
		function moveChaos() {
			drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
			for (let i = 0; i < figures.length;i) {
				figures[i].posX = figures[i].posX + getRandomInt(-speed -24, speed + 24);
				figures[i].posY = figures[i].posY + getRandomInt(-speed -24, speed + 24);
				figures[i].draw(ctx);
				check_collusion(figures[i]);
				figures[i].size += 1;
				if (figures[i].size >= maxN) {
					figures.splice(i, 1);
					continue;
				}

				if ((figures[i].posX > canvas.width) || (figures[i].posX < 0) || (figures[i].posY < 0) || (figures[i].posY > canvas.height)) {
					figures.splice(i, 1);
				} else {
					i++;
				}
				let direction = document.getElementById("directions");
				direction = direction.getElementsByClassName("active");
				direction = direction.item(0).childNodes[1].getAttribute('value');
				if (direction === 'chaos') {
					continue;
				} else {
					move();
				}
			}
		}
		function moveRandom() {
			drawBack(ctx,'#202020','#aaa',canvas.width,canvas.height);
			for (let i = 0; i < figures.length;i){

				let dir = directions[figures[i].direction];
				if (dir === 'up') {
					figures[i].posX = figures[i].posX + (Math.random()*4-2);
					figures[i].posY = figures[i].posY + (Math.random()*2-speed);
				}
				if (dir === 'down') {
					figures[i].posX = figures[i].posX - (Math.random()*4-2);
					figures[i].posY = figures[i].posY - (Math.random()*2-speed);
				}
				if (dir === 'left') {
					figures[i].posX = figures[i].posX + (Math.random()*2-speed);
					figures[i].posY = figures[i].posY + (Math.random()*4-2);
				}
				if (dir === 'right') {
					figures[i].posX = figures[i].posX - (Math.random()*2-speed);
					figures[i].posY = figures[i].posY - (Math.random()*4-2);
				}
				figures[i].draw(ctx);
				check_collusion(figures[i]);
				figures[i].size += 1;
				if (figures[i].size >= maxN) {
					figures.splice(i, 1);
					continue;
				}
				if ((figures[i].posX > canvas.width) || (figures[i].posX < 0) || (figures[i].posY < 0) || (figures[i].posY > canvas.height)) {
					figures.splice(i, 1);
				} else {
					i++;
				}
				let direction = document.getElementById("directions");
				direction = direction.getElementsByClassName("active");
				direction = direction.item(0).childNodes[1].getAttribute('value');
				if (direction === 'random') {
					continue;
				} else {
					move();
				}
			}
		}
		function move() {

				console.log("a")
				clearInterval(idTimer);
				let direction = document.getElementById("directions");
				direction = direction.getElementsByClassName("active");
				direction = direction.item(0).childNodes[1].getAttribute('value');

				directions = ['up', 'down', 'left', 'right'];

				if (direction === 'up') {
					idTimer = setInterval('moveFigUp();', 50);
				}

				if (direction === 'down') {
					idTimer = setInterval('moveFigDown();', 50);
				}

				if (direction === 'right') {
					idTimer = setInterval('moveFigRight();', 50);
				}

				if (direction === 'left') {
					idTimer = setInterval('moveFigLeft();', 50);
				}
				if (direction === 'chaos') {
					idTimer = setInterval('moveChaos()', 50);
				}
			if (direction === 'random') {
				idTimer = setInterval('moveRandom()', 50);
			}


		}

		function faster() {
			if (speed > 10) {
				return;
			}
			speed += 1;
		}

		function slower() {
			if (speed <= 2) {
				stop();
				return;
			}
			speed -= 1;
		}
		function distance(x1, y1, x2, y2) {
			return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
		}

		function check_collusion(figure) {
			for (let i = 0; i < figures.length; i++) {
				if (figures[i] !== figure) {
					if (figure instanceof TBall && figures[i] instanceof TBall) {
						let d = distance(figure.posX, figure.posY, figures[i].posX, figures[i].posY);
						if (d <= (figure.size + figures[i].size)) {
							figures.splice(figures.indexOf(figure, 0), 1);
							figures.splice(figures.indexOf(figures[i], 0), 1);
							return;
						}
					}
					if (figure instanceof TRectangle && figures[i] instanceof TRectangle) {
						if (((Math.abs(figures[i].posX - figure.posX) <= figures[i].size) &&
								(Math.abs(figures[i].posY - figure.posY) <= figures[i].size)) ||
								((Math.abs(figures[i].posX - figure.posX) <= figure.size) &&
										(Math.abs(figures[i].posY - figure.posY) <= figure.size))) {
							figures.splice(figures.indexOf(figure), 1);
							figures.splice(figures.indexOf(figures[i]), 1);
						}
					} else {
						if (((Math.abs(figure.posY - figures[i].posY) <= figure.size + figures[i].size) && (figure.posY < figures[i].posY) && (figures[i].posX >= figure.posX - figures[i].size) && (figures[i].posX <= figure.posX + figure.size + figures[i].size)) ||
								((Math.abs(figure.posX - figures[i].posX) <= figures[i].size) && (figures[i].posX < figure.posX) && (figures[i].posY >= figure.posY - figures[i].size) && (figures[i].posY <= figure.posY + figure.size + figures[i].size)) ||
								((Math.abs(figure.posX - figures[i].posX) <= figure.size + figures[i].size) && (figure.posX < figures[i].posX) && (figures[i].posY >= figure.posY - figures[i].size) && (figures[i].posY <= figure.posY + figure.size + figures[i].size)) ||
								((Math.abs(figure.posY - figures[i].posY) <= figures[i].size) && (figure.posY > figures[i].posY) && (figures[i].posX >= figure.posX - figures[i].size) && (figures[i].posX <= figure.posX + figure.size + figures[i].size))) {
						}

					}
				}
			}
		}
