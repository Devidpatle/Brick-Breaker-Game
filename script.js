        document.addEventListener("DOMContentLoaded", function () {
            var canvas = document.getElementById("gameCanvas");
            var ctx = canvas.getContext("2d");
            alert("START GAME");
            // Game constants
            var ballRadius = 10;
            var ballX = canvas.width / 2;
            var ballY = canvas.height - 30;
            var ballDX = 2;
            var ballDY = -2;
            var paddleHeight = 10;
            var paddleWidth = 75;
            var paddleX = (canvas.width - paddleWidth) / 2;
            var brickRowCount = 3;
            var brickColumnCount = 5;
            var brickWidth = 75;
            var brickHeight = 20;
            var brickPadding = 10;
            var brickOffsetTop = 30;
            var brickOffsetLeft = 30;
            var score = 0;
            var lives = 3;

            // Create bricks
            var bricks = [];
            for (var c = 0; c < brickColumnCount; c++) {
                bricks[c] = [];
                for (var r = 0; r < brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }

            // Draw ball
            function drawBall() {
                ctx.beginPath();
                ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }

            // Draw paddle
            function drawPaddle() {
                ctx.beginPath();
                ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }

            // Draw bricks
            function drawBricks() {
                for (var c = 0; c < brickColumnCount; c++) {
                    for (var r = 0; r < brickRowCount; r++) {
                        if (bricks[c][r].status === 1) {
                            var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                            var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                            bricks[c][r].x = brickX;
                            bricks[c][r].y = brickY;
                            ctx.beginPath();
                            ctx.rect(brickX, brickY, brickWidth, brickHeight);
                            ctx.fillStyle = "#0095DD";
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
            }

            // Draw score
            function drawScore() {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Score: " + score, 8, 20);
            }

            // Draw lives
            function drawLives() {
                ctx.font = "16px Arial";
                ctx.fillStyle = "#0095DD";
                ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
            }

            // Collision detection
            function collisionDetection() {
                for (var c = 0; c < brickColumnCount; c++) {
                    for (var r = 0; r < brickRowCount; r++) {
                        var brick = bricks[c][r];
                        if (brick.status === 1) {
                            if (ballX > brick.x && ballX < brick.x + brickWidth && ballY > brick.y && ballY < brick.y + brickHeight) {
                                ballDY = -ballDY;
                                brick.status = 0;
                                score++;
                                if (score === brickRowCount * brickColumnCount) {
                                    alert("YOU WIN, CONGRATULATIONS!");
                                    document.location.reload();
                                }
                            }
                        }
                    }
                }
            }
                    // Update game state
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            drawScore();
            drawLives();
            collisionDetection();

            // Move paddle
            if (rightPressed && paddleX < canvas.width - paddleWidth) {
                paddleX += 7;
            } else if (leftPressed && paddleX > 0) {
                paddleX -= 7;
            }

            // Move ball
            ballX += ballDX;
            ballY += ballDY;

            // Ball collision with walls
            if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
                ballDX = -ballDX;
            }
            if (ballY + ballDY < ballRadius) {
                ballDY = -ballDY;
            } else if (ballY + ballDY > canvas.height - ballRadius) {
                if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                    ballDY = -ballDY;
                } else {
                    lives--;
                    if (!lives) {
                        alert("GAME OVER");
                        document.location.reload();
                    } else {
                        ballX = canvas.width / 2;
                        ballY = canvas.height - 30;
                        ballDX = 2;
                        ballDY = -2;
                        paddleX = (canvas.width - paddleWidth) / 2;
                    }
                }
            }

            requestAnimationFrame(update);
        }

        update();

        // Keyboard event listeners
        var rightPressed = false;
        var leftPressed = false;

        document.addEventListener("keydown", function(event) {
            if (event.key === "Right" || event.key === "ArrowRight") {
                rightPressed = true;
            } else if (event.key === "Left" || event.key === "ArrowLeft") {
                leftPressed = true;
            }
        });

        document.addEventListener("keyup", function(event) {
            if (event.key === "Right" || event.key === "ArrowRight") {
                rightPressed = false;
            } else if (event.key === "Left" || event.key === "ArrowLeft") {
                leftPressed = false;
            }
        });
    });
