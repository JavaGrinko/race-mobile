import { BaseObject } from "../system/baseObject";
import { EventType } from "../config/events";
import { SFC } from "./road";
import _ from "lodash";
import LapCounter from "./lapcounter";

export default class Car extends BaseObject {
    constructor(options) {
        super(options);
        this.lapCounter = new LapCounter(this);
        this.world.eventBus.subscribe(this.lapCounter);
        this.acceleration = 0.1;
        this.speed = 0;
        this.headCrab;
        this.rotateSpeed;
        this.slidingFrictionCoefficient = SFC.ICE;
        this.discarding = _.throttle(this.discarding, 1000);
        this.fireEventCollisionWall = _.throttle(this.fireEventCollisionWall, 1000, {'trailing': false});
    }

    updateRotateSpeed() {
        let rp = this.speed / 3;
        rp = rp < 1 ? 1 : rp;
        this.rotateSpeed = rp;
    }

    turnLeft() {
        super.turnLeft(this.rotateSpeed);
    }

    turnRight() {
        super.turnRight(this.rotateSpeed);
    }

    onRender(canvas) {
        this.moveUp(this.speed);
        this.braking();
        this.headCrab && this.headCrab.control(canvas);
    }

    increaseSpeed() {
        const { acceleration, speed, maxSpeed } = this;
        if (speed + acceleration > maxSpeed) {
            this.speed = maxSpeed;
        } else {
            this.speed += acceleration;
        }
        this.updateRotateSpeed();
    }

    decreaseSpeed() {
        const { acceleration, speed } = this;
        if (speed - acceleration < acceleration / 2 && this.speed > 0) {
            this.speed = 0;
        } else {
            this.speed -= acceleration;
        }
        this.updateRotateSpeed();
    }

    braking() {
        if (this.speed != 0) {
            this.speed *= 1 - this.slidingFrictionCoefficient / 50;
            if (this.speed < 0.01 && this.speed > 0) {
                this.speed = 0;
            }
        }
        this.updateRotateSpeed();
    }

    checkCollision() {
        const { roads, walls, camera, bots, player } = this.world;
        for (let bot of bots) {
            if (this != bot && this.collision(bot)) {
                if (this === player) {
                    camera.shake(1000, 15, this.speed / 2);
                }
                return true;
            }
        }
        roads.forEach(road => {
            if (this.collision(road)) {
                this.slidingFrictionCoefficient = road.sfc;
            }
        });
        for (let wall of walls) {
            if (this.collision(wall)) {
                if (wall.background || wall.foreground) {
                    this.fireEventCollisionWall(wall);
                    return false;
                }
                let edge = this.getEdge(wall);
                this.discarding(edge);
                if (this === player) {
                    camera.shake(1000, 15, this.speed / 2);
                }
                return true;
            }
        }
    }

    fireEventCollisionWall(wall) {
        this.world.eventBus.fireEvent({
            type: EventType.COLLISION,
            name: wall.name,
            carId: this.uuid
        });
    }

    getEdge(object) {
        let r1 = object.isPointInObject(this.getRightBottomPoint());
        let r2 = object.isPointInObject(this.getLeftBottomPoint());
        let r3 = object.isPointInObject(this.getLeftTopPoint());
        let r4 = object.isPointInObject(this.getRightTopPoint());
        if (r1) return "right-bottom";
        if (r2) return "left-bottom";
        if (r3) return "left-top";
        if (r4) return "right-top";
    }

    discarding(edge) {
        let i = setInterval(() => {
            switch (edge) {
                case "right-bottom":
                    this.increaseSpeed();
                    this.turnRight(5);
                    break;
                case "left-bottom":
                    this.increaseSpeed();
                    this.turnLeft(5);
                    break;
                case "left-top":
                    this.decreaseSpeed();
                    this.turnRight(5);
                    break;
                case "right-top":
                    this.decreaseSpeed();
                    this.turnLeft(5);
                    break;
            }
        }, 10);
        setTimeout(() => {
            clearInterval(i);
        }, 100);
    }

    notify(event) {
        const { type } = event;
        if (this.actions) {
            let actions = this.actions
                .filter(a => a.event === type)
                .map(a => ACTIONS[a.action]);                 
            for (let a of actions) {
                a(this, event);
            }
        }
    }
}