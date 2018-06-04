class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerActions('k', function(){
            var s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        this.game.context.font = '20px Arial'
        this.game.context.fillStyle = 'green'
        this.game.context.fillText('按 K 开始游戏', 100, 200)
    }
}
