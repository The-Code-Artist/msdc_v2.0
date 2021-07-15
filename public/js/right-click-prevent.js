$(document).ready(function () {
    // Disable right clicking.
    $('img, .parallax').on('contextmenu', function (e) {
        return false;
    });
    // Disable image dragging.
    $('img').on('dragstart', function (e) {
        return false;
    });
});
