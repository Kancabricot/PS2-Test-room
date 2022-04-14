let gameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height:  540,
    backgroundColor: '#ffffff',
    parent: 'game',
    physics: {

        default: 'arcade',
        arcade: {
            gravity: { y: 600},
            debug : true,
            fps : 60
        }
    },
    scene: new Tableau1()
};
let game = new Phaser.Game(gameConfig);
