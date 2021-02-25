import Camera from "../system/camera";

export default class World {
    constructor(options, initLevel) {
        this.options = options;
        this.canvas = this.createCanvas(options);
        this.isRunning = false;
        this.background;
        this.level;
        this.camera;
        this.player = { x: 100, y: 100 };
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
        const { isRunning, canvas, options, background } = this;
        const { width, height } = options;
        if (isRunning) requestAnimationFrame(this.render);
        canvas.drawImage(background, 0, 0);
    }
    createCanvas({ width, height }) {
        let game = document.createElement("canvas");
        game.width = width;
        game.height = height;
        document.body.appendChild(game);
        return game.getContext("2d");
    }

    createCamera() {
        const { level, player, canvas } = this;
        const { width, height } = level;
        const { width: cWidth, height: cHeight } = canvas; 
        this.camera = new Camera(player, width, height, cWidth, cHeight);
    }
}

