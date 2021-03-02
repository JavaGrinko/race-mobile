import Camera from "../system/camera";

export default class World {
    constructor(options, initLevel) {
        this.options = options;
        const { canvas, domElement } = this.createCanvas(options);
        this.canvas = canvas;
        this.domElement = domElement;
        this.isRunning = false;
        this.background;
        this.level;
        this.camera;
        this.player = { x: 100, y: 100 };
        setInterval(() => {
            this.player.y++;
        }, 10);
        this.loadLevel(initLevel);
    }

    loadLevel(level) {
        this.level = level;
        const { backgroundSrc } = level;
        this.background = new Image();
        this.background.src = backgroundSrc;
        this.createCamera();
    }

    start() {
        this.isRunning = true;
        this.render();
    }

    stop() {
        this.isRunning = false;
    }

    render = () => {
        const { isRunning, canvas, options, background, camera } = this;
        const { width, height } = options;
        if (isRunning) requestAnimationFrame(this.render);
        canvas.drawImage(background, 0, 0);
        camera.update();
    }

    createCanvas({ width, height }) {
        let game = document.createElement("canvas");
        game.width = width;
        game.height = height;
        document.body.appendChild(game);
        return {
            canvas: game.getContext("2d"),
            domElement: game
        }
    }

    createCamera() {
        const { level, player, domElement } = this;
        const { width, height } = level;
        const { width: cWidth, height: cHeight } = domElement; 
        this.camera = new Camera(player, width, height, cWidth, cHeight);
    }
}

