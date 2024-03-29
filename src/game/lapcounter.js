import { EventType } from "../config/events";

export default class LapCounter {
    constructor(car) {
        this.currentCheckpoint;
        this.lapsCount;
        this.currentLap;
        this.checkpointCount;
        this.times = [];
        this.car = car;
    }

    notify(event) {
        const { type, name, carId } = event;
        if (type === EventType.COLLISION && name && this.car.uuid === carId) {
            if (name === "start_line") {
                this.startLinePassed();
                this.onStartPassed();
            } else if (name.includes("checkpoint")) {
                this.checkpointPassed(name);
            }
        }
    }

    onStartPassed() {}
    onFinished() {}

    startLinePassed() {
        console.log(this.times);
        if (!this.times[this.currentLap]) {
            this.start();
        } else if (this.currentCheckpoint === this.checkpointCount - 1) {
            this.end();
        }
    }

    checkpointPassed(name) {
        let lapNum = Number.parseInt(name.split("_")[1]);
        if (this.currentCheckpoint + 1 === lapNum) {
            this.currentCheckpoint = lapNum;
        }
    }

    reset(checkpointCount, lapsCount) {
        this.currentCheckpoint = -1;
        this.checkpointCount = checkpointCount;
        this.currentLap = 0;
        this.lapsCount = lapsCount;
        this.times = [];
    }

    start() {
        this.times[this.currentLap] = {
            startTime: new Date(),
            endTime: undefined
        }
    }

    end() {
        this.times[this.currentLap].endTime = new Date();
        const {startTime, endTime} = this.times[this.currentLap];
        let lapTime = Math.round((endTime - startTime ) / 1000);
        console.log("Время круга: " + lapTime + " сек");
        if (this.currentLap + 1 === this.lapsCount) {
            this.onFinished();
        }
        this.currentCheckpoint = -1;
        this.currentLap++;
        this.start();
    }
}