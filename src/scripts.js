import { LEVELS } from "./config/levels";
import World from "./game/world";

document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
    console.log("Скрипты подключены");
    const ratio = 1;
    const world = new World({
        width: window.innerWidth * ratio,
        height: window.innerHeight * ratio
    }, LEVELS.DEV);
    world.start();
}