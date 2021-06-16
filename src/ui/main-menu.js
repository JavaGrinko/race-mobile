import $ from "jquery";

export default function MainMenu(world) {
    $("#menu-screen .content").on('click', () => {
        $("#menu-screen").hide();
        world.start();
    });
    $("#shop-button").on('click', () => {
        $(".shop").show();
    });
}