import _ from "lodash";

export default class HeadCrab {
    constructor(car) {
        this.car = car;
        this.reactionDelay = () => car.randomInt(100, 200);
    }

    turnLeft() {
        _.delay(() => this.car.turnLeft(), this.reactionDelay());
    }

    turnRight() {
        _.delay(() => this.car.turnRight(), this.reactionDelay());
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
        let nextPoint = this.getNextPoint();
        this.renderTargetLine(canvas, nextPoint);
        let needAngle = car.getAngleToPoint(nextPoint.x, nextPoint.y);
        car.angle = car.angle < 0 ? 360 + car.angle : car.angle;
        if (needAngle > car.angle) {
            let needRight = needAngle - car.angle;
            let needLeft = 360 - needAngle + car.angle;
            if (needRight > needLeft) {
                this.turnLeft();
            } else {
                this.turnRight();
            }
        } else {
            let needLeft = car.angle - needAngle;
            let needRight = 360 - car.angle + needAngle;
            if (needRight > needLeft) {
                this.turnLeft();
            } else {    
                this.turnRight();
            }
        }
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