import $ from "jquery";
import { showEndMenu } from "../ui/end-menu";
import Car from "./car";

export default class Player extends Car {
    constructor(options) {
        super(options);
        this.lapCounter.onStartPassed = () => {
            const { currentLap } = this.lapCounter;
            let total = this.world.level.lapsCount;
            this.world.changeStatLaps(currentLap + 1, total);
        }
        this.lapCounter.onFinished = () => {
            showEndMenu(5, 8);
        }
    }
}