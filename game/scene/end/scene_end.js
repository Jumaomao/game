class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        game.registerActions('r', function(){
            var s = new SceneTitle(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.fillStyle = 'green'
        this.game.context.fillText('GAME  OVER 按 r 返回标题界面', 100, 200)
    }
}
