import $ from 'jquery';

export default function EndMenu(world) {

}

export function showEndMenu(place, total) {
    $("#end-menu .place span:first-child").text(place);
    $("#end-menu .place span:last-child").text("из " + total);
    $("#end-menu").show();
}