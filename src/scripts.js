import World from "./game/world";

document.addEventListener("deviceready", deviceReady, false);

function deviceReady() {
    console.log("Скрипты подключены");
    const ratio = 1.5;
    const world = new World({
        width: window.innerWidth * ratio,
        height: window.innerHeight * ratio
    });
    world.start();
}