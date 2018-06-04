var Scene = function(game) {
    var s = {
        game: game,
    }
    // 初始化
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0
    blocks = LoadLevel(game, 1)
    game.registerActions('a', function(){
        paddle.moveLeft()
    })
    game.registerActions('d', function(){
        paddle.moveRight()
    })
    game.registerActions('f', function(){
        ball.fire()
    })
    s.draw = function() {
        // draw 背景
        game.context.fillStyle = "#444"
        game.context.fillRect(0, 0, 400, 300)

        game.drawImage(paddle)
        game.drawImage(ball)
        // draw block
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
        game.context.font = '20px Arial'
        game.context.fillStyle = 'lightgreen'
        game.context.fillText('分数：' + score, 10, 290)
    }
    mouseEvent(game, ball)
    s.update = function() {
        if (paused) {
            return
        }
        ball.move()
        // 判断游戏结束
        if (ball.y > paddle.y) {
            // 跳转到游戏结束画面
            var end = new SceneEnd(game)
            game.replaceScene(end)
        }
        // 判断相撞
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
        // block 与 ball 相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                log('block 相撞')
                block.kill()
                ball.bounced()
                // 更新分数
                score += 100
            }
        }
    }


    return s
}
