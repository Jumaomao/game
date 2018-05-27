var guaGame = function(fps, images, runCallback) {
    // images 是一个对象 里面是图片的引用名字和图片路径
    // 程序会在所有图片载入成功才开始运行
    var g = {
        actions: {},
        keydowns: {},
        images: {},
    }
    log('guaGame',g)
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    // draw
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    // events
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
        // log('***2', g.keydowns)
    })
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
        // log('***3', g.keydowns)
    })
    g.registerActions = function(key, callback) {
        g.actions[key] = callback
    }

    // time
    window.fps = 30
    var runloop = function() {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        // update
        g.update()
        // clear
        context.clearRect(0, 0, canvas.width, canvas.height)
        // draw
        g.draw()
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    var loads = []
    // 预先载入所有图片
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            // 存入g.images
            g.images[name] = img
            // 所有图片载入成功后调用 run
            loads.push(1)
            if (loads.length == names.length) {
                g.run()
            }
        }
    }

    g.imageByName = function(name) {
        // log('image by name', g.images)
        var img = g.images[name]
        // log('img', img)
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function() {
         runCallback(g)
        // 开始运行程序
        setTimeout(function(){
            runloop()
        }, 1000/window.fps)
    }

    return g
}
