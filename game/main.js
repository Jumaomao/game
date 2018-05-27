var LoadLevel = function(game, n) {
    var n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}

// var blocks = []
var enableDebugMode = function(game, enable) {
    if (!enable) {
        return
    }
    window.paused = false
    // debug 用的
    window.addEventListener('keydown', function(event){
        var k = event.key
        if (k == 'p') {
            paused = !paused
        }else if ('123456'.includes(k) == '1') {
            // 关卡选择
            blocks = LoadLevel(game, Number(k))
        }
    })
    document.querySelector('#id-input-speed').addEventListener('input', function(event){
        var input = event.target
        // log(event, input.value)
        window.fps = Number(input.value)
    })
}
var __main = function() {


    var images = {
        paddle: 'paddle.png',
        ball: 'ball.png',
        block: 'block.png',
    }
    var game = guaGame(30, images, function(g){
        var paddle = Paddle(game)
        var ball = Ball(game)

        var score = 0
        blocks = LoadLevel(game, 1)
        paused = false

        game.registerActions('a', function(){
            paddle.moveLeft()
        })
        game.registerActions('d', function(){
            paddle.moveRight()
        })
        game.registerActions('f', function(){
            ball.fire()
        })

        game.update = function() {
            if (paused) {
                return
            }
            ball.move()
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

        game.draw = function() {
            game.drawImage(paddle)
            game.drawImage(ball)
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i]
                if (block.alive) {
                    game.drawImage(block)
                }
            }
            game.context.fillText('分数：' + score, 10, 290)
        }
    })

    enableDebugMode(game, true)

}

__main()
