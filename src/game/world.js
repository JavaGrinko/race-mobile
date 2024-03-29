import $ from "jquery";

import { CARS } from "../config/cars";
import Camera from "../system/camera";
import EventBus from "../system/eventBus";
import Car from "./car";
import HeadCrab from "./headcrab";
import Road from "./road";
import Wall from "./wall";
import Profile from './profile';
import Player from "./player";

export default class World {
    constructor(options, initLevel) {
        this.options = options;
        const { canvas, domElement } = this.createCanvas(options);
        this.eventBus = new EventBus();
        this.canvas = canvas;
        this.domElement = domElement;
        this.isRunning = false;
        this.background;
        this.level;
        this.camera;
        this.profile = new Profile();
        this.roads = [];
        this.walls = [];
        this.bots = [];
        this.loadLevel(initLevel);
    }

    createWall(options) {
        const wall = new Wall({ ...options, world: this });
        this.eventBus.subscribe(wall);
        return wall;
    }

    createCar(options) {
        const car = new Car({ ...options, world: this });
        this.eventBus.subscribe(car);
        return car;
    }

    createPlayer(options) {
        const car = new Player({ ...options, world: this });
        this.eventBus.subscribe(car);
        return car;
    }

    changeStatLaps(current, total) {
        $("#game-container .laps").text(`Круги: ${current} из ${total}`);
    }

    loadLevel(level) {
        this.player = this.createPlayer(CARS[this.profile.activeSkin]);
        this.level = level;
        const { backgroundSrc, roads, walls, spawn, lapsCount, bots } = level;
        this.background = new Image();
        this.background.src = backgroundSrc;
        this.roads = roads.map(road => this.createRoad(road));
        this.walls = walls.map(wall => this.createWall(wall));
        this.player.x = spawn.x;
        this.player.y = spawn.y;
        this.player.angle = spawn.angle;
        let checkpointCount = walls
                    .filter(w => w.name && w.name.includes("checkpoint")).length;
        this.player.lapCounter.reset(checkpointCount, lapsCount);
        this.createBots(bots, spawn, checkpointCount, lapsCount);
        this.changeStatLaps(0, lapsCount);
        this.createCamera();
    }

    createBots(bots, spawn, checkpointCount, lapsCount) {
        let { x, y, angle } = spawn;
        this.bots = [];
        bots && bots.forEach((bot, index) => {
            let car = this.createCar(bot);
            car.x = x - Math.ceil(index / 2) * (car.width * 2);
            car.y = index % 2 === 0 ? y + car.height + 30 : y;
            car.angle = angle;
            car.headCrab = new HeadCrab(car);
            car.lapCounter.reset(checkpointCount, lapsCount);
            this.bots.push(car);
        });
    }

    createRoad(options) {
        const newRoad = new Road(options);
        newRoad.world = this;
        newRoad.setTexture(options.textureSrc, true, this.canvas);
        return newRoad;
    }

    start() {
        this.isRunning = true;
        this.render();
    }

    stop() {
        this.isRunning = false;
    }

    render = () => {
        const { isRunning, canvas, options, 
                background, camera, player, controls } = this;
        const { roads, walls, bots } = this;
        const { width, height } = options;
        if (isRunning) requestAnimationFrame(this.render);
        canvas.save();
        canvas.translate(-camera.x, -camera.y);
        canvas.drawImage(background, 0, 0);
        roads.forEach(road => road.render(canvas));
        walls.forEach(wall => wall.render(canvas));
        bots.forEach(bot => bot.render(canvas));
        player.render(canvas);
        camera.update();
        canvas.restore();
        controls(this);
    }

    createCanvas({ width, height }) {
        document.getElementById("game-canvas")?.remove();
        let game = document.createElement("canvas");
        game.width = width;
        game.height = height;
        game.id = "game-canvas";
        document.getElementById("game-container").appendChild(game);
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

