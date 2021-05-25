import $ from 'jquery';

export default class Gui {
    constructor(world) {
        this.world = world;
        $("#move-forward-button").on('touchstart', (event) => this.startMethod(event, "increaseSpeed"));
        $("#move-forward-button").on('touchend', (event) => this.endMethod(event, "increaseSpeed"));

        $("#move-back-button").on('touchstart', (event) => this.startMethod(event, "decreaseSpeed"));
        $("#move-back-button").on('touchend', (event) => this.endMethod(event, "decreaseSpeed"));
    }

    startMethod = (event, method) => {
        event.preventDefault();
        const { world } = this;
        this[method + "Interval"] = 
            setInterval(() => world.player[method](), 10);
    }

    endMethod = (event, method) => {
        event.preventDefault();
        clearInterval(this[method + "Interval"]);
    }
}