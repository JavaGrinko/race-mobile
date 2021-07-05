import $ from "jquery";
import { LEVELS } from "../config/levels";

export default function MainMenu(world) {
    let { profile } = world;
    $("#menu-screen .coins").text("Монет: " + profile.coins);
    $("#menu-screen .content").on('click', () => {
        $("#menu-screen").hide();
        world.loadLevel(LEVELS.TRACK);
        world.start();
    });
    $("#shop-button").on('click', () => {
        $(".shop").show();
    });
}