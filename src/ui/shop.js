import $ from "jquery";
import { CARS } from "../config/cars";

export default function Shop(world) {
    let skinNames = Object.keys(CARS);
    let { profile } = world;
    let currentSkin = profile.activeSkin;
    $(".shop .cross").on('click', () => {
        $(".shop").hide();
    });
    $(".buy-button").on('click', () => {
        if (profile.checkAvailableSkin(currentSkin)) {
            if (profile.activeSkin !== currentSkin) {
                profile.changeActiveSkin(currentSkin);
            }
        } else {
            profile.buy(currentSkin, CARS[currentSkin].price); 
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
        let skin = CARS[currentSkin];
        let { name, price, modelSrc } = skin;
        $(".model-3d").attr("src", modelSrc);
        $(".shop-bolts").text("Болты: " + profile.coins);
        $(".buy-button").removeClass("no-money");
        if (profile.checkAvailableSkin(currentSkin)) {
            if (profile.activeSkin === currentSkin) {
                $(".buy-button").text("Активен"); 
            } else {
                $(".buy-button").text("Выбрать"); 
            }
        } else {
            if (price > profile.coins) {
                $(".buy-button").text(price + " C");
                $(".buy-button").addClass("no-money");
            } else {
                $(".buy-button").text(price + " C");
            }
        }
        $(".model-name").text(name);
    }
}