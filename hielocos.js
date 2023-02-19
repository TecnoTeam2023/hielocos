const ANCHO = 540;
const ALTO = 960;
let velocidadFondo = 5;
let anchoCarril = (ANCHO / 3);
let arrayCarril = [((anchoCarril * 0) + (anchoCarril / 2)), ((anchoCarril * 1) + (anchoCarril / 2)), ((anchoCarril * 2) + (anchoCarril / 2))];
let temporizadorHielocos = null;
let deltaHieloco = 500;
let estoyVivo = true;

class Hielocos extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.setBaseURL('https://www.antonio.com.mx');
        this.load.image('fondo_oceano', 'imagenes/fondo_oceano.jpg');
        this.load.spritesheet('pinguino', 'imagenes/pinguino.png', { frameWidth: 30, frameHeight: 43 });
        this.load.image('hieloco', 'imagenes/hieloco.png');
    }

    create() {
        this.fondo = this.add.tileSprite(0, 0, 0, 0, 'fondo_oceano')
            .setOrigin(0)
            .setScrollFactor(0, 1);
        this.fondo.displayWidth = this.sys.canvas.width;
        const animacionPinguino = this.anims.create({
            key: 'nadar',
            frames: this.anims.generateFrameNumbers('pinguino'),
            frameRate: 15,
            repeat: -1
        });
        const spritePinguino = this.add.sprite(ANCHO / 2, 900, 'pinguino').setScale(2);
        spritePinguino.anims.load('nadar');
        spritePinguino.anims.play('nadar');

        this.input.on('pointerdown', function (pointer) {
            let puntoX = pointer.x;
            let puntoY = pointer.y;
            let carril = Math.floor(puntoX / anchoCarril);
            carril = Math.max(Math.min(2, carril), 0);
            //console.log('X: ' + puntoX + ', Y: ' + puntoY + ' -> CARRIL: ' + carril);
            spritePinguino.x = arrayCarril[carril];
        })
    }

    update(tiempo, delta) {
        this.fondo.tilePositionY -= velocidadFondo;
        temporizadorHielocos += delta;
        while (temporizadorHielocos > deltaHieloco) {
            temporizadorHielocos -= deltaHieloco;
            let carril = Math.floor(Math.random() * 3);
            let hielo = new Hielo(this, arrayCarril[carril], 0);
        }
    }
}

const configuracion = {
    type: Phaser.AUTO,
    width: ANCHO,
    height: ALTO,
    backgroundColor: '#072F53',
    pixelArt: true,
    scene: [Hielocos]
};

const juego = new Phaser.Game(configuracion);
