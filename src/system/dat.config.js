import * as dat from 'dat.gui';

export default class DatConfig {
    constructor(world) {
        const { camera, level } = world;
        const gui = new dat.GUI({
            width: 300,
            closed: false
        });
        gui.useLocalStorage = true;
        const cameraFolder = gui.addFolder("Camera props");
        cameraFolder.add(camera, "x", 0, level.width).listen();
        cameraFolder.add(camera, "y", 0, level.height).listen();
    }
}