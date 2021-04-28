export default class HeadCrab {
    constructor(car) {
        this.car = car;
    }

    control() {
        this.car.increaseSpeed();
        this.car.turnLeft();
    }
}