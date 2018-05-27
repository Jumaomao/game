var Paddle = function(game) {
    var o = game.imageByName('paddle')
    // var o = {
    //     image: image,
    //     x: 120,
    //     y: 250,
    //     speed: 6,
    // }
    o.x = 120
    o.y = 250
    o.speed = 6
    o.move = function(x) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - o.image.width) {
            x = 400 - o.image.width
        }
        o.x = x
    }
    o.moveLeft = function() {
        o.move(o.x - o.speed)
    }
    o.moveRight = function() {
        o.move(o.x + o.speed)
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if (ball.x + ball.image.width > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
        return false
    }
    return o
}
