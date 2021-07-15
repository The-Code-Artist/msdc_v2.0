var isCtrl = false;
document.onkeyup = function (e) {
    if (e.which == 17)
        isCtrl = false;
}
document.onkeydown = function (e) {
    if (e.which == 17)
        isCtrl = true;
    if (isCtrl == true)
    {
        return false;
    }
}
