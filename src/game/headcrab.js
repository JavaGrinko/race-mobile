export default class HeadCrab {
    constructor(car) {
        this.car = car;
    }

    control() {
        const { car } = this;
        let nextPoint = this.getNextPoint();
        let a = Math.abs(car.y - nextPoint.y);
        let c = Math.abs(car.x - nextPoint.x);
        let b = Math.sqrt(a * a + c * c);
        console.log(b);
        let sinA = a * Math.sin(Math.PI / 2) / b;
        let alpha = 90 - Math.asin(sinA) * 57.2958;
        car.angle = alpha;
        // console.log(nextPoint);
        // let ab = this.car.angleBetween(nextPoint);
        // console.log('угол бота ' + this.car.angle + ', угол до чекпоинта ' + ab);
        car.increaseSpeed();
    }

    getNextPoint(){
        const { lapCounter } = this.car;
        if (lapCounter.currentCheckpoint === -1) {
            let start = this.getStartLine();
            let center = start.getCenterPoint(); 
            return center;
        } else {
            let checkpoint = this.getCheckpoint(lapCounter.currentCheckpoint + 1);
            let center = checkpoint.getCenterPoint();
            return center;
        }
    }

    getStartLine() {
        const { walls } = this.car.world;
        return walls.filter(w => w.name === "start_line")[0];
    }

    getCheckpoint(num) {
        const { walls } = this.car.world;
        return walls.filter(w => w.name === `checkpoint_${num}`)[0];
    }
}