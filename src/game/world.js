export default class World {
    constructor(options) {
        this.options = options;
        this.canvas = createCanvas(options);
        this.isRunning = false;
    }

    start() {
        this.isRunning = true;
        this.render();
    }

    stop() {
        this.isRunning = false;
    }

    render = () => {
        const { isRunning, canvas, options } = this;
        const { width, height } = options;
        if (isRunning) requestAnimationFrame(this.render);
        canvas.fillStyle = "red";
        canvas.fillRect(0, 0, width, height);
    }
}

function createCanvas({ width, height }) {
    let game = document.createElement("canvas");
    game.width = width;
    game.height = height;
    document.body.appendChild(game);
    return game.getContext("2d");
}