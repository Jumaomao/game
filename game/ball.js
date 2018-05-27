var Ball = function(game) {
    var o = game.imageByName('ball')
    // var o = {
    //     image: image,
    //     x: 180,
    //     y: 200,
    //     speedX: 4,
    //     speedY: 4,
    //     fired: false,
    // }
    o.x = 180
    o.y = 200,
    o.speedX = 4
    o.speedY = 4
    o.fired = false
    o.fire = function() {
        o.fired = true
    }
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + o.image.width > 400) {
                o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y + o.image.height > 300) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.bounced = function() {
        o.speedY *= -1
    }
    return o
}
