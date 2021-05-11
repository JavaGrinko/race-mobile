export default class HeadCrab {
    constructor(car) {
        this.car = car;
    }

    renderTargetLine(canvas, nextPoint) {
        let center = this.car.getCenterPoint();
        canvas.beginPath();
        canvas.moveTo(center.x, center.y);
        canvas.lineTo(nextPoint.x, nextPoint.y);
        canvas.stroke();
    }

    control(canvas) {
        const { car } = this;
        let center = car.getCenterPoint();
        let nextPoint = this.getNextPoint();
        this.renderTargetLine(canvas, nextPoint);
        let a = Math.abs(center.y - nextPoint.y);
        let c = Math.abs(center.x - nextPoint.x);
        let b = Math.sqrt(a * a + c * c);
        let sinA = c * Math.sin(Math.PI / 2) / b;
        let alpha = Math.asin(sinA) * 57.2958;
        if (nextPoint.x < center.x && nextPoint.y < center.y) {
            alpha = 360 - alpha;
        }
        if (nextPoint.x < center.x && nextPoint.y > center.y) {
            alpha += 180;
        }
        if (nextPoint.x > center.x && nextPoint.y > center.y) {
            alpha = 180 - alpha;
        }
        car.angle = alpha;
        car.increaseSpeed();
    }

    getNextPoint(){
        const { lapCounter } = this.car;
        const { currentCheckpoint, checkpointCount } = lapCounter;
        let nextCP = currentCheckpoint + 1;
        if (currentCheckpoint === -1 && lapCounter.times.length === 0) {
            return this.getStartLine().getCenterPoint();
        } else if (nextCP === checkpointCount) {
            return this.getStartLine().getCenterPoint();
        } else {
            return this.getCheckpoint(nextCP).getCenterPoint();
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