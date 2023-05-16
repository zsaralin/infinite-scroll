import {drawBottomTiling, drawTwoTilings, refreshTilings, refreshTilings2, topSecondTiling} from "../Tiling/Tiling2";
import {redrawStrokes} from "../Stroke/StrokeType/StrokeArr";
import {redrawCompleteTiles} from "../Tile/CompleteTileArr";
import {redrawActiveTiles} from "../Effects/Watercolor";
import {setInternalOffset} from "../Tile/CompleteTile";
import {SCROLL_DELTA, SCROLL_DIST, TOP_PAGE_SPACE} from "../Constants";
import {endAutoScroll, isAutoScrollActive} from "./AutoScroll";
import {getOffsetY, setOffsetY} from "./Offset";
import {isSlowScrollOn} from "./SlowScroll";
import {getOffsetTop} from "@mui/material";
import {redrawBlur} from "../Effects/Blur";
import {redrawTransparentStrokes} from "../Stroke/StrokeType/TransparentStroke";
import {redrawDottedStrokes} from "../Stroke/StrokeType/DottedStroke";
import {gsap} from "gsap";
import {endEffect, moveEffect, startEffect} from "./ScrollEffect";
import {redrawDots} from "../Stroke/Dot/DotArr";
import {hideColourPreview} from "../Bubble/Bubble";
import {drawSecondTiling, drawTwo, secondTiling, top} from "../Tiling/Tiling3";
import {activeFillAnim, redrawAnim, stopAnim} from "../Tile/FillTile/FillAnim";

export let limitScroll = 0;


export function doScroll(currY, prevY) {
    // limitScroll = tilingArrLength() <= 2 ? 0 : (sumArrayPrev() - LINE_WIDTH)
    if (getOffsetY() - (currY - prevY) >= limitScroll) {
        setOffsetY(getOffsetY() - (currY - prevY))
        redrawCanvas();

    } else {
        setOffsetY(limitScroll)
    }
    if (isAutoScrollActive) endAutoScroll()
}

const delay = ms => new Promise(res => setTimeout(res, ms));

export let prevOffsetY = 0;
let refreshed = false;

export function setRefreshed(i) {
    refreshed = i
}

export const redrawCanvas = async () => {
    const wrap = document.getElementById("wrapper")
    const canv = document.getElementById("canvas-wrapper")
    let offsetY = getOffsetY()
    if (offsetY > top - TOP_PAGE_SPACE) {
        // await delay(.5);
        // drawTwoTilings()
        // copyToOnScreen(document.getElementById('off-canvas'));
        // drawBottomTiling()
        // copyToOnScreen(document.getElementById('off-canvas'));

//         canv.style.transform = `translate(0,-${offsetY + prevOffsetY}px)`;

        // redrawStrokes(offsetY ) // - 200
        // redrawDots(offsetY ) // - 200
        // redrawCompleteTiles(offsetY)
        // redrawActiveTiles(offsetY)
        // redrawTransparentStrokes(offsetY )
        // redrawDottedStrokes(offsetY)
        // redrawBlur(offsetY)
        prevOffsetY += offsetY
        // canv.style.height = `${parseFloat(canv.style.height) + prevOffsetY}px`;
        // wrap.style.height = `${parseFloat(wrap.style.height) + prevOffsetY}px`;
        // let off = document.getElementById("off-canvas")
        // off.getContext('2d').clearRect(0,0,off.width, off.height)
        const canvasIds = ['tiling-canvas', 'invis-canvas', 'fill-canvas', 'top-canvas', 'off-canvas'];
        canvasIds.forEach(id => {
            const canvas = document.getElementById(id);
            const ctx = canvas.getContext('2d', {willReadFrequently: true});

            const imageData = ctx.getImageData(0, offsetY, window.innerWidth, window.innerHeight * 7, {willReadFrequently: true});

            // off.width = canvas.width;
            // off.height = canvas.height
            // canvas.height += 3000

            ctx.putImageData(imageData, 0, 0);
            // offCtx.drawImage(imageData, 0, 0);
            // canvas.height += 3000
            // ctx.drawImage(off, 0, 0);
            // const ctx = canvas.getContext('2d');
            // Store the current transformation matrix
            // ctx.save();

            // canvas.height = `${parseFloat(canvas.style.height) + prevOffsetY}px`;
            // ctx.restore();
        });

        // drawBottomTiling()
        drawSecondTiling()
        copyToOnScreen(document.getElementById('off-canvas'));
        setOffsetY(0)
        refreshed = true;

        redrawAnim()

        // oldOffset = 0


    } else {
        wrap.style.transform = `translate(0,-${offsetY}px)`;
        // console.log(offsetY)
        // const currentHeight = parseFloat(wrap.style.height);
        // wrap.style.height = `${currentHeight + offsetY}px`;
        // wrap.style.height += `${offsetY}px`
        moveEffect(refreshed, offsetY, prevOffsetY)
    }
}

function copyToOnScreen(offScreenCanvas) {
    let tilingCanv = document.getElementById('tiling-canvas').getContext('2d');
    tilingCanv.drawImage(offScreenCanvas, 0, 0);
}

export function setUpCanvas() {
    drawTwo()
    copyToOnScreen(document.getElementById('off-canvas'));
}

export function refreshPage() { // used when change tile width and size
    refreshTilings2()
    copyToOnScreen(document.getElementById('off-canvas'));
    // redrawStrokes(0)
    // redrawCompleteTiles()
    // redrawActiveTiles()
}

let d = SCROLL_DIST

export function startScroll(ySpeed, prevCursorY, cursorY) {
    startEffect(prevCursorY, cursorY)
    hideColourPreview()
    if ((ySpeed < 10 || !isSlowScrollOn()) && d === SCROLL_DIST) {
        doScroll(cursorY, prevCursorY);
    } else {
        if (cursorY < prevCursorY) {
            d > 0 ? d -= SCROLL_DELTA * d : d = 0
            doScroll(prevCursorY - d, prevCursorY);
        } else if (cursorY > prevCursorY) {
            d > 0 ? d -= SCROLL_DELTA * d : d = 0
            doScroll(prevCursorY + d, prevCursorY);
        }
    }
}


export function endScroll() {
    endEffect()
    d = SCROLL_DIST
}