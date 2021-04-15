import { EventType } from "../config/events";

export default class LapCounter {
    constructor() {
        this.lapCount = 0;
        this.currentCheckpoint = -1;
        this.checkpointCount;
        this.startTime;
        this.endTime;
    }

    notify(event) {
        const { type, name } = event;
        const { startTime, currentCheckpoint, checkpointCount } = this;
        if (type === EventType.COLLISION && name) {
            if (name === "start_line") {
                if (!startTime) {
                    this.start();
                } else if (currentCheckpoint === checkpointCount - 1) {
                    this.end();
                }
            } else if (name.includes("checkpoint")) {
                let lapNum = Number.parseInt(name.split("_")[1]);
                if (currentCheckpoint + 1 === lapNum) {
                    this.currentCheckpoint = lapNum;
                }
            }
        }
    }

    reset(checkpointCount) {
        this.lapCount = 0;
        this.currentCheckpoint = -1;
        this.checkpointCount = checkpointCount;
        this.startTime = undefined;
        this.endTime = undefined;
    }

    start() {
        this.startTime = new Date();
    }

    end() {
        this.endTime = new Date();
        let lapTime = Math.round((this.endTime - this.startTime ) / 1000);
        console.log("Время круга: " + lapTime + " сек");
    }
}