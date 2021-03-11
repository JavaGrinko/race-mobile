import { BaseObject } from "../system/baseObject";

export default class Car extends BaseObject {
    constructor(options) {
        super(options);
    }
    onRender() {
        this.moveUp(this.speed);
        this.braking();
    }

    braking() {
        if (this.speed != 0) {
            this.speed = this.speed * 0.95;
        }
    }

    checkCollision() {
    }
}