import * as dat from 'dat.gui';

export default class DatConfig {
    constructor(world) {
        const { camera, level, player } = world;
        const gui = new dat.GUI({
            width: 300,
            closed: true
        });
        gui.useLocalStorage = true;
        const cameraFolder = gui.addFolder("Camera props");
        cameraFolder.add(camera, "x", 0, level.width).listen();
        cameraFolder.add(camera, "y", 0, level.height).listen();
        const playerFolder = gui.addFolder("Player props");
        playerFolder.add(player, "x", 0, level.width).listen();
        playerFolder.add(player, "y", 0, level.height).listen();
        playerFolder.add(player, "speed", 0, player.maxSpeed).listen();
        playerFolder.add(player, "rotateSpeed", 0, player.maxSpeed).listen();
        playerFolder.add(player, "slidingFrictionCoefficient").listen();
        playerFolder.add(player, "angle").listen();
        playerFolder.add(player.lapCounter, "currentCheckpoint").listen();
        playerFolder.add(player.lapCounter, "checkpointCount").listen();
        playerFolder.add(player.lapCounter, "currentLap").listen();
        playerFolder.add(player.lapCounter, "lapsCount").listen();
    }
}