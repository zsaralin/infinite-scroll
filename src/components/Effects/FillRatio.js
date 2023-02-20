import {getOffsetY} from "../Scroll/PageScroll";
import {getCurrColor} from "../Stroke/StrokeColor";
import {getLineWidth} from "../Stroke/StrokeWidth";
import {useState} from "react";

import {FILL_RATIO} from "../Constants";

let BB_PADDING = 35; // bounding box padding
let fillMin = FILL_RATIO

function getTotalPixels(currTile) {
    let ctx = document.getElementById('canvas').getContext("2d");
    let tileDim = currTile.tile
    let startX = tileDim[0] - BB_PADDING;
    let startY = tileDim[2] - BB_PADDING;
    let endX = tileDim[1] + BB_PADDING;
    let endY = tileDim[3] + BB_PADDING;

    for (let x = startX; x < endX; x += 5) {
        for (let y = startY; y < endY; y += 5) {
            if (ctx.isPointInPath(currTile.path, x, y)) {
                currTile.inPath.push([x, y])
            }
        }
    }
    return currTile.inPath.length
}

export function getFillRatio(currTile) {
    let ctx = document.getElementById('canvas').getContext("2d");
    // let tileDim = currTile.tile

    let fillRatio = [0, currTile.inPath.length === 0 ? getTotalPixels(currTile) : currTile.inPath.length] // [filledPixels, totalPixels]
    currTile.inPath.forEach(i => {
        if (ctx.getImageData(i[0], i[1], 1, 1).data.toString() !== '0,0,0,0' && ctx.getImageData(i[0], i[1], 1, 1).data.toString() !== '255,255,255,255')
         {
             fillRatio[0]++
        }
    })
    // for (let x = startX; x < endX; x += 25) {
    //     for (let y = startY; y < endY; y += 25) {
    //         if (ctx.isPointInPath(currTile.path, x, y)) {
    //             // fillRatio[1]++;
    //             // if pixel color matches curr color of stroke
    //             // if (isColorMatch(ctx.getImageData(x, y - getOffsetY(), 1, 1).data, hslToRgb(getCurrColor()))) {
    //             //     fillRatio[0]++
    //             // }
    //             if (ctx.getImageData(x, y, 1, 1).data.toString() !== '0,0,0,0') {
    //                 fillRatio[0]++
    //             }
    //         }
    //     }
    // }
    // console.log(fillRatio[0] / fillRatio[1])
    // console.log(fillRatio[0] / fillRatio[1])
    return fillRatio[0] / fillRatio[1]
}

export function getFillRatio2(currTile) {
    let ctx = document.getElementById('fill-canvas').getContext("2d");
    // let tileDim = currTile.tile
    let fillRatio = [0, currTile.inPath.length === 0 ? getTotalPixels(currTile) : currTile.inPath.length] // [filledPixels, totalPixels]
    currTile.inPath.forEach(i => {
        // console.log(ctx.getImageData(i[0], i[1], 1, 1).data.toString() )

        if (ctx.getImageData(i[0], i[1], 1, 1).data.toString() !== '0,0,0,0' && ctx.getImageData(i[0], i[1], 1, 1).data.toString() !== '255,255,255,255')
        {
            // console.log(ctx.getImageData(i[0], i[1], 1, 1).data.toString() )
            fillRatio[0]++
        }
    })
    // for (let x = startX; x < endX; x += 25) {
    //     for (let y = startY; y < endY; y += 25) {
    //         if (ctx.isPointInPath(currTile.path, x, y)) {
    //             // fillRatio[1]++;
    //             // if pixel color matches curr color of stroke
    //             // if (isColorMatch(ctx.getImageData(x, y - getOffsetY(), 1, 1).data, hslToRgb(getCurrColor()))) {
    //             //     fillRatio[0]++
    //             // }
    //             if (ctx.getImageData(x, y, 1, 1).data.toString() !== '0,0,0,0') {
    //                 fillRatio[0]++
    //             }
    //         }
    //     }
    // }
    return fillRatio[0] / fillRatio[1]
}


function isColorMatch(col0, col1) {
    let h0 = col0[0];
    let h1 = col1[0];
    let s0 = col0[1];
    let s1 = col1[1];
    let l0 = col0[2];
    let l1 = col1[2];
    if ((h0 >= h1 - 1 && h0 <= h1 + 1) && (s0 >= s1 - 1 && s0 <= s1 + 1) && (l0 >= l1 - 1 && l0 <= l1 + 1)) {
        return true;
    }
    return false;
}

function hslStrToArr(str) {
    str = str.substring(4, str.length - 1).replaceAll('%', '')
    return str.split(',').map(Number);
}

function hslToRgb(str) {
    let hsl = hslStrToArr(str)
    let h = hsl[0] / 360;
    let s = hsl[1] / 100;
    let l = hsl[2] / 100
    // console.log('l ' + h)
    var r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

export const changeFillMin = (event: Event, newValue: number) => {
    fillMin = newValue / 100
};

export function getFillMin() {
    return fillMin
}