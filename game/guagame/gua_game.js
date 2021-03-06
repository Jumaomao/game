class GuaGame {
    constructor(fps, images, runCallback) {
        window.fps = fps
        this.images = images
        this.runCallback = runCallback
        this.scene = null
        this.actions = {}
        this.keydowns = {}
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        // events
        var self = this
        window.addEventListener('keydown', function(event){
            self.keydowns[event.key] = true
            // log('***2', g.keydowns)
        })
        window.addEventListener('keyup', function(event){
            self.keydowns[event.key] = false
            // log('***3', g.keydowns)
        })
        this.init()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }
    drawImage(img) {
        this.context.drawImage(img.image, img.x, img.y)
    }
    // uupdate
    update() {
        this.scene.update()
    }
    // draw
    draw() {
        this.scene.draw()
    }
    registerActions(key, callback) {
        this.actions[key] = callback
    }
    runloop() {
        var g = this
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
        g.context.clearRect(0, 0, g.canvas.width,g.canvas.height)
        // draw
        g.draw()
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    imageByName(name) {
        // log('image by name', g.images)
        var img = this.images[name]
        // log('img', img)
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    runWithScene(scene) {
        var g = this
        g.scene = scene
        // 开始运行程序
        setTimeout(function(){
            g.runloop()
        }, 1000/window.fps)
    }
    replaceScene(scene) {
        this.scene = scene
    }
    run() {
         this.runCallback(this)
    }

    init() {
        var g = this
        var loads = []
        // 预先载入所有图片
        var names = Object.keys(g.images)
        for (var i = 0; i < names.length; i++) {
            let name = names[i]
            var path = this.images[name]
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
    }
}




// var guaGame = function(fps, images, runCallback) {
//     // images 是一个对象 里面是图片的引用名字和图片路径
//     // 程序会在所有图片载入成功才开始运行
//     var g = {
//         scnen: null,
//         actions: {},
//         keydowns: {},
//         images: {},
//     }
//     // log('guaGame',g)
//     var canvas = document.querySelector('#id-canvas')
//     var context = canvas.getContext('2d')
//     g.canvas = canvas
//     g.context = context
//     // draw
//     g.drawImage = function(guaImage) {
//         g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
//     }
//     // events
//     window.addEventListener('keydown', function(event){
//         g.keydowns[event.key] = true
//         // log('***2', g.keydowns)
//     })
//     window.addEventListener('keyup', function(event){
//         g.keydowns[event.key] = false
//         // log('***3', g.keydowns)
//     })
//     // uupdate
//     g.update = function() {
//         g.scene.update()
//     }
//     // draw
//     g.draw = function() {
//         g.scene.draw()
//     }
//     g.registerActions = function(key, callback) {
//         g.actions[key] = callback
//     }
//
//     // time
//     window.fps = 30
//     var runloop = function() {
//         var actions = Object.keys(g.actions)
//         for (var i = 0; i < actions.length; i++) {
//             var key = actions[i]
//             if (g.keydowns[key]) {
//                 g.actions[key]()
//             }
//         }
//         // update
//         g.update()
//         // clear
//         context.clearRect(0, 0, canvas.width, canvas.height)
//         // draw
//         g.draw()
//         setTimeout(function(){
//             runloop()
//         }, 1000/window.fps)
//     }
//
//     var loads = []
//     // 预先载入所有图片
//     var names = Object.keys(images)
//     for (var i = 0; i < names.length; i++) {
//         let name = names[i]
//         var path = images[name]
//         let img = new Image()
//         img.src = path
//         img.onload = function() {
//             // 存入g.images
//             g.images[name] = img
//             // 所有图片载入成功后调用 run
//             loads.push(1)
//             if (loads.length == names.length) {
//                 g.run()
//             }
//         }
//     }
//
//     g.imageByName = function(name) {
//         // log('image by name', g.images)
//         var img = g.images[name]
//         // log('img', img)
//         var image = {
//             w: img.width,
//             h: img.height,
//             image: img,
//         }
//         return image
//     }
//     g.runWithScene = function(scene) {
//         g.scene = scene
//         // 开始运行程序
//         setTimeout(function(){
//             runloop()
//         }, 1000/window.fps)
//     }
//     g.replaceScene = function(scene) {
//         g.scene = scene
//     }
//     g.run = function() {
//          runCallback(g)
//
//     }
//
//     return g
// }
