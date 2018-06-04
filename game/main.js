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
            // log(k)
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
        paddle: 'img/paddle.png',
        ball: 'img/ball.png',
        block: 'img/block.png',
    }

    var game = GuaGame.instance(30, images, function(g) {
        var s = new SceneTitle(g)
        g.runWithScene(s)
    })

    enableDebugMode(game, true)


}

__main()
