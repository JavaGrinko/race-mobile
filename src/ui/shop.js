import $ from "jquery";
import { CARS } from "../config/cars";
import { checkAvailableCar, getProfile, setProfile } from "../game/profile";

export default function Shop(world) {
    let skinNames = Object.keys(CARS);
    let currentSkin = skinNames[0];
    $(".shop .cross").on('click', () => {
        $(".shop").hide();
    });
    $(".buy-button").on('click', () => {
        let profile = getProfile();
        if (checkAvailableCar(currentSkin)) {
            profile.activeCar = currentSkin;
        } else {
            profile.coins -= CARS[currentSkin].price;
            profile.availableCars.push(currentSkin); 
        }
        changeModel();
    });
    changeModel();
    $(".arrow-left").on("click", () => {
        let currentIndex = skinNames.findIndex(it => it === currentSkin);
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = skinNames.length - 1;
        }
        currentSkin = skinNames[currentIndex];
        changeModel();
    });
    $(".arrow-right").on("click", () => {
        let currentIndex = skinNames.findIndex(it => it === currentSkin);
        currentIndex++;
        if (currentIndex >= skinNames.length) {
            currentIndex = 0;
        }
        currentSkin = skinNames[currentIndex];
        changeModel();
    });

    function changeModel() {
        $(".shop-bolts").text("Coins: " + getProfile().coins);
        let skin = CARS[currentSkin];
        let { name, price, modelSrc } = skin;
        $(".model-3d").attr("src", modelSrc);
        if (checkAvailableCar(currentSkin)) {
            $(".buy-button").text("Выбрать");
        } else {
            $(".buy-button").text(price + " C");
        }
        $(".model-name").text(name);
    }
}