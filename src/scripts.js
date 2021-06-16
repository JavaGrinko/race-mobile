import { LEVELS } from "./config/levels";
import Gui from "./game/gui";
import World from "./game/world";
import controls from "./system/controls";
import DatConfig from "./system/dat.config";
import MainMenu from "./ui/main-menu";
import Shop from "./ui/shop";
import '@google/model-viewer';

document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
    console.log("Скрипты подключены");
    const ratio = 1;
    const world = new World({
        width: window.innerWidth * ratio,
        height: window.innerHeight * ratio
    }, LEVELS.TRACK);
    world.controls = controls;
    MainMenu(world);
    Shop(world);
    new Gui(world);
    new DatConfig(world);
    window.world = world;

    document.addEventListener("click", (event) => {
        let mouseX = event.offsetX * ratio + world.camera.x;
        let mouseY = event.offsetY * ratio + world.camera.y;
        console.log('mouseX: ', mouseX, 'mouseY: ', mouseY);
    });
}