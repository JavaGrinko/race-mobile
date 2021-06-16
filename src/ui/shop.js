import $ from "jquery";
import { CARS } from "../config/cars";

export default function Shop(world) {
    let skinNames = Object.keys(CARS);
    let currentSkin = skinNames[0];
    $(".shop .cross").on('click', () => {
        $(".shop").hide();
    })
    $(".model-3d").attr("src", CARS[currentSkin].modelSrc);
    $(".arrow-left").on("click", () => {
        let currentIndex = skinNames.findIndex(it => it === currentSkin);
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = skinNames.length - 1;
        }
        currentSkin = skinNames[currentIndex];
        $(".model-3d").attr("src", CARS[currentSkin].modelSrc);
    });
    $(".arrow-right").on("click", () => {
        let currentIndex = skinNames.findIndex(it => it === currentSkin);
        currentIndex++;
        if (currentIndex >= skinNames.length) {
            currentIndex = 0;
        }
        currentSkin = skinNames[currentIndex];
        $(".model-3d").attr("src", CARS[currentSkin].modelSrc);
    });
}