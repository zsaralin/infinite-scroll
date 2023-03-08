import React from "react";
import {getCurrentPathDict, getTilingIndex} from "../Tiling/TilingArr";
import {getOffsetY} from "../Scroll/PageScroll";
import {getLineWidth} from "./StrokeWidth";
import {getCurrColor} from "./StrokeColor";
import {hslToRgb} from "@mui/material";
import {hsl2Rgb, isCircleInPath} from "../Effects/FillRatio";


let context;

export function drawStroke(x0, y0, x1, y1, theColor, theLineWidth, offset, context) {
    context = context || document.getElementById('canvas').getContext("2d");
    drawStrokeHelper(x0, y0, x1, y1, theLineWidth, theColor, context, offset)
}

export function drawStrokeUnder(x0, y0, x1, y1, theColor, theLineWidth, offset) {
    context = document.getElementById('fill-canvas').getContext("2d");
    drawStrokeHelper(x0, y0, x1, y1, theLineWidth, theColor, context, offset)
}

function drawStrokeHelper(x0, y0, x1, y1, theLineWidth, theColor, context) {
    context.lineCap = "round"
    context.lineWidth = theLineWidth ? theLineWidth : getLineWidth();
    context.strokeStyle = theColor ? theColor : getCurrColor();
    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
}

export function drawBlurryStroke(x0, y0, x1, y1, theLineWidth, theColor, context) {
    context = document.getElementById('canvas').getContext("2d");
    let rgbaColor = theColor ? theColor : getCurrColor()
    if (rgbaColor.charAt(0) === 'h') {
        rgbaColor = hsl2Rgb(rgbaColor)
        rgbaColor = `rgba(${rgbaColor.join(",")},${1})`
    }

    let r = theLineWidth ? theLineWidth : getLineWidth();
    context.beginPath();
    var radialGradient = context.createRadialGradient(x0, y0, 0, x0, y0, r);
    radialGradient.addColorStop(0, rgbaColor);
    radialGradient.addColorStop(1, rgbaColor.substring(0, rgbaColor.length - 2) + '0)');
    context.fillStyle = radialGradient;
    context.fillRect(x0 - r, y0 - r, 150, 150);
    context.closePath();
}

export function drawClover(x0, y0, x1, y1, theColor, theLineWidth, offset, context) {
    context = context || document.getElementById('canvas').getContext("2d");
    let x = Math.max(getLineWidth() / 3, 5);
    theLineWidth = Math.max(getLineWidth() / 2, 5);
    drawStrokeHelper(x0, y0 + x, x1, y1 + x, theLineWidth, theColor, context, offset)
    drawStrokeHelper(x0, y0 - x, x1, y1 - x, theLineWidth, theColor, context, offset)
    drawStrokeHelper(x0 + x, y0, x1 + x, y1, theLineWidth, theColor, context, offset)
    drawStrokeHelper(x0 - x, y0, x1 - x, y1, theLineWidth, theColor, context, offset)
}

export function drawFlower(x0, y0, x1, y1, theColor, theLineWidth, offset, context) {
    context = context || document.getElementById('canvas').getContext("2d");
    let x = Math.max(getLineWidth() / 3, 5);
    theLineWidth = Math.max(getLineWidth() / 2, 5);
    drawStrokeHelper(x0 - x / 1.5, y0 + x * 1.2, x1 - x / 1.5, y1 + x * 1.2, theLineWidth, theColor, context, offset)
    drawStrokeHelper(x0 + x / 1.5, y0 + x * 1.2, x1 + x / 1.5, y1 + x * 1.2, theLineWidth, theColor, context, offset)

    drawStrokeHelper(x0, y0 - x / 1.3, x1, y1 - x / 1.3, theLineWidth, theColor, context, offset)
    drawStrokeHelper(x0 + x, y0, x1 + x, y1, theLineWidth, theColor, context, offset)
    drawStrokeHelper(x0 - x, y0, x1 - x, y1, theLineWidth, theColor, context, offset)
}

export function gradientHelper(x0, y0, theColor, theLineWidth, underCol) {
    context = context || document.getElementById('canvas').getContext("2d");
    let grd = context.createRadialGradient(x0, y0, 0, x0, y0, theLineWidth);

    grd.addColorStop(0, theColor)
    grd.addColorStop(.3, theColor)
    grd.addColorStop(.9, underCol)
    context.fillStyle = grd
    context.beginPath();
    context.arc(x0 , y0  , theLineWidth, 0, 2 * Math.PI);
    context.fill();
}

export function drawGradientStroke(tile, x0, y0, x1, y1, theColor) {
    context = context || document.getElementById('canvas').getContext("2d");
    let underCol = context.getImageData(x0, y0, 1, 1).data
    if (underCol[3] === 0) {
        underCol = "white";
    } else {
        underCol = `rgba(${underCol.join(", ")})`;
    }
    let direction = 1;
    let speed = .5;
    let origLW = getLineWidth()
    let theLineWidth = origLW

    setInterval(function () {
        // Increase or decrease the width of the gradient
        theLineWidth = Math.max(theLineWidth + direction * speed, 5);
        let inPath = isCircleInPath(tile.path, x0, y0, theLineWidth)
        if (theLineWidth >= origLW + 5 || theLineWidth <= origLW - 5 || !inPath) {
            direction = -direction; // Reverse the direction when the size limit is reached
        }
        if(inPath) gradientHelper(x0, y0, theColor, theLineWidth, underCol);
    }, 75); // Call the function every 50 milliseconds
}
