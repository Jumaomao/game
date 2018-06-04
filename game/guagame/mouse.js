var mouseEvent = function(game, ball) {
    // mouse event
    log('mouse')
    var enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        // log(event)
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y)
        if (ball.hasPoint(x, y)) {
            // 设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'move')
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        // log(x, y, 'up')
        enableDrag = false
    })
}
