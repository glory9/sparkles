"use strict";
var welcome = document.querySelector(".welcome");
var letters = welcome.textContent.split("");
welcome.textContent = "";
letters.forEach(function (letter, i) {
    var span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = i / 5 + "s";
    welcome.append(span);
});
var canvas = document.getElementById("c1");
var image = null;
var filtered;
var grayImage;
var crimson;
var colorful;
var framed;
var split;
var rainbow;
function loadImage() {
    var fileinput = document.getElementById("img");
    image = new SimpleImage(fileinput);
    colorful = new SimpleImage(fileinput);
    crimson = new SimpleImage(fileinput);
    filtered = new SimpleImage(fileinput);
    grayImage = new SimpleImage(fileinput);
    framed = new SimpleImage(fileinput);
    split = new SimpleImage(fileinput);
    rainbow = new SimpleImage(fileinput);
    image.drawTo(canvas);
    if (image != null) {
        alert("Image loaded successfully");
    }
}
function sunlight() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    for (var _i = 0, _a = filtered.values(); _i < _a.length; _i++) {
        var pix = _a[_i];
        var x = pix.getRed();
        var y = pix.getBlue();
        pix.setRed(0.9 * x);
        pix.setBlue(0.55 * y);
    }
    filtered.drawTo(canvas);
}
function grayScale() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    for (var _i = 0, _a = grayImage.values(); _i < _a.length; _i++) {
        var pixel = _a[_i];
        var val = ((pixel.getRed() + pixel.getBlue() + pixel.getGreen()) / 3);
        pixel.setRed(val);
        pixel.setBlue(val);
        pixel.setGreen(val);
    }
    grayImage.drawTo(canvas);
}
function doCrimson() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    for (var _i = 0, _a = crimson.values(); _i < _a.length; _i++) {
        var pix = _a[_i];
        var aver = ((pix.getRed() + pix.getBlue() + pix.getGreen()) / 3);
        if (aver < 128) {
            pix.setRed(aver * 2);
            pix.setBlue(0);
            pix.setGreen(0);
        }
        else {
            pix.setRed(255);
            pix.setBlue((aver * 2) - 255);
            pix.setGreen((aver * 2) - 255);
        }
    }
    crimson.drawTo(canvas);
}
function doColorful() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    var key = colorful.getWidth();
    for (var _i = 0, _a = colorful.values(); _i < _a.length; _i++) {
        var pix = _a[_i];
        if (pix.getX() <= key / 4) {
            var red = ((pix.getRed() + pix.getBlue() + pix.getGreen()) / 3);
            if (red < 128) {
                pix.setRed(red * 2);
                pix.setBlue(0);
                pix.setGreen(0);
            }
            else {
                pix.setRed(255);
                pix.setBlue((red * 2) - 255);
                pix.setGreen((red * 2) - 255);
            }
        }
        else if (pix.getX() <= key / 2) {
            var bl = ((pix.getRed() + pix.getBlue() + pix.getGreen()) / 3);
            if (bl < 128) {
                pix.setGreen(bl * 1.56);
                pix.setRed(bl * 1.56);
                pix.setBlue(0);
            }
            else {
                pix.setGreen(200);
                pix.setRed(200);
                pix.setBlue((bl * 1.56) - 200);
            }
        }
        else if (pix.getX() <= (key * 0.75)) {
            var bl = ((pix.getRed() + pix.getBlue() + pix.getGreen()) / 3);
            if (bl < 128) {
                pix.setBlue(bl * 1.56);
                pix.setGreen(0);
                pix.setRed(0);
            }
            else {
                pix.setBlue(200);
                pix.setGreen((bl * 1.56) - 200);
                pix.setRed((bl * 1.56) - 200);
            }
        }
        else {
            var zz = ((pix.getRed() + pix.getBlue() + pix.getGreen()) / 3);
            if (zz < 128) {
                pix.setGreen(zz * 1.56);
                pix.setBlue(0);
                pix.setRed(0);
            }
            else {
                pix.setGreen(200);
                pix.setBlue((zz * 1.56) - 200);
                pix.setRed((zz * 1.56) - 200);
            }
        }
    }
    colorful.drawTo(canvas);
}
function addFrame() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    var width = framed.getWidth();
    var height = framed.getHeight();
    for (var _i = 0, _a = framed.values(); _i < _a.length; _i++) {
        var dot = _a[_i];
        if ((dot.getX() <= (0.02 * width)) || (dot.getX() >= (0.98 * width))) {
            dot.setRed(0);
            dot.setBlue(0);
            dot.setGreen(0);
        }
        else if ((dot.getY() <= (0.02 * height)) || (dot.getY() >= (0.98 * height))) {
            dot.setRed(0);
            dot.setBlue(0);
            dot.setGreen(0);
        }
    }
    framed.drawTo(canvas);
}
function doSplit() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    var k = split.getWidth() / split.getHeight();
    for (var _i = 0, _a = split.values(); _i < _a.length; _i++) {
        var p = _a[_i];
        var x = p.getX();
        var y = p.getY();
        var g = p.getGreen();
        var b = p.getBlue();
        var mean = ((p.getRed() + p.getBlue() + p.getGreen()) / 3);
        if (x <= ((k * y) - (0.2 * split.getHeight()))) {
            p.setBlue(0.7 * b);
            p.setGreen(0.9 * g);
        }
        if (x > ((1.2 * split.getHeight()) - (y / k))) {
            if (mean < 128) {
                p.setRed(mean * 2);
                p.setGreen(mean * 0.8);
                p.setBlue(0);
            }
            else {
                p.setRed(255);
                p.setGreen((1.2 * mean) - 51);
                p.setBlue((2 * mean) - 255);
            }
        }
    }
    split.drawTo(canvas);
}
function doRainbow() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    var w = rainbow.getWidth();
    var ref = w / 7;
    for (var _i = 0, _a = rainbow.values(); _i < _a.length; _i++) {
        var pix = _a[_i];
        var mean = ((pix.getRed() + pix.getBlue() + pix.getGreen()) / 3);
        if (pix.getX() <= ref) {
            if (mean < 128) {
                pix.setRed(mean * 2);
                pix.setGreen(0);
                pix.setBlue(0);
            }
            else {
                pix.setRed(255);
                pix.setGreen((mean * 2) - 255);
                pix.setBlue((mean * 2) - 255);
            }
        }
        else if (pix.getX() <= (2 * ref)) {
            if (mean < 128) {
                pix.setRed(mean * 2);
                pix.setGreen(mean * 0.8);
                pix.setBlue(0);
            }
            else {
                pix.setRed(255);
                pix.setGreen((1.2 * mean) - 51);
                pix.setBlue((2 * mean) - 255);
            }
        }
        else if (pix.getX() <= (ref * 3)) {
            if (mean < 128) {
                pix.setRed(mean * 2);
                pix.setGreen(mean * 2);
                pix.setBlue(0);
            }
            else {
                pix.setRed(255);
                pix.setGreen(255);
                pix.setBlue((2 * mean) - 255);
            }
        }
        else if (pix.getX() <= (ref * 4)) {
            if (mean < 128) {
                pix.setRed(0);
                pix.setGreen(mean * 2);
                pix.setBlue(0);
            }
            else {
                pix.setRed((2 * mean) - 255);
                pix.setGreen(255);
                pix.setBlue((2 * mean) - 255);
            }
        }
        else if (pix.getX() <= (ref * 5)) {
            if (mean < 128) {
                pix.setRed(0);
                pix.setGreen(0);
                pix.setBlue(2 * mean);
            }
            else {
                pix.setRed((2 * mean) - 255);
                pix.setGreen((2 * mean) - 255);
                pix.setBlue(255);
            }
        }
        else if (pix.getX() <= (ref * 6)) {
            if (mean < 128) {
                pix.setRed(mean * 0.8);
                pix.setGreen(0);
                pix.setBlue(mean * 2);
            }
            else {
                pix.setRed((1.2 * mean) - 51);
                pix.setGreen((2 * mean) - 255);
                pix.setBlue(255);
            }
        }
        else {
            if (mean < 128) {
                pix.setRed(mean * 1.6);
                pix.setGreen(0);
                pix.setBlue(mean * 1.6);
            }
            else {
                pix.setRed((mean * 0.4) + 153);
                pix.setGreen((mean * 2) - 255);
                pix.setBlue((mean * 0.4) + 153);
            }
        }
    }
    rainbow.drawTo(canvas);
}
function clearScreen() {
    var c1 = document.getElementById("c1");
    var ctx = c1.getContext("2d");
    ctx.clearRect(0, 0, c1.width, c1.height);
}
function resetImg() {
    if (image == null) {
        alert("Please upload an image");
        return;
    }
    clearScreen();
    var fff = document.getElementById("img");
    var immg = new SimpleImage(fff);
    filtered = new SimpleImage(fff);
    grayImage = new SimpleImage(fff);
    crimson = new SimpleImage(fff);
    colorful = new SimpleImage(fff);
    immg.drawTo(canvas);
}