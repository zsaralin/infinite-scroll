import {makeRandomTiling, drawTiling, fillTiling} from './TilingGenerator'

import {getRandomShape} from "./Shape";
import {getBoundsTiling} from "./TilingBounds";

let tilingArr = []
let yMinArr = []
let yMaxArr = []
let pathArr = [] //array of path dict for each tiling
let shapeDimensions = []

export function sumArray() {
    return yMaxArr.length > 0 ? yMaxArr[yMaxArr.length - 1] : 0
}

export function sumArrayPrev() {
    return yMaxArr.length > 0 ? yMaxArr[yMaxArr.length - 3] : 0
}

export function addToTilingArr() {
    let tiling = makeRandomTiling()
    let [xMin, xMax, yMin, yMax] = getBoundsTiling(tiling)
    yMin += sumArray();
    yMax += sumArray();

    let pathDict = drawTiling(tiling, -(xMin - (window.innerWidth - xMax)) / 2, yMaxArr.length > 0 ? yMaxArr[yMaxArr.length - 1] + (yMaxArr[yMaxArr.length - 1] - yMin) : -yMin + 75)
    tilingArr.push(tiling)

    drawRandomShape(yMin, yMax, pathDict)

    if (yMaxArr.length > 0) {
        yMinArr.push(yMin + (yMaxArr[yMaxArr.length - 1] - yMin));
        yMaxArr.push(yMax + (yMaxArr[yMaxArr.length - 1] - yMin) + 400)
    } else {
        yMinArr.push(yMin)
        yMaxArr.push(yMax - yMin + 500)
    }
    pathArr.push(pathDict);
}

export function redrawTilings() {
    let q = tilingArr.length > 2 ? tilingArr.length - 2 : 0 // limit scroll to current and previous tiling
    // let q = 0;
    for (let i = q; i < tilingArr.length; i++) {
        // for (let i = q; i < 1; i++) {
        fillTiling(pathArr[i])
    }
}

export function tilingArrLength() {
    return tilingArr.length
}

function drawRandomShape(yMin, yMax, pathDict) {
    let shapePath; let dimension;
    let y0;
    console.log('length of path' + Object.values(pathDict)[0])
    if (yMaxArr.length > 0) {
        [shapePath, dimension] = getRandomShape(yMax + yMaxArr[yMaxArr.length - 1] - yMin)
        shapeDimensions.push(yMax + yMaxArr[yMaxArr.length - 1] - yMin)
    } else {
        [shapePath, dimension] = getRandomShape(yMax - yMin + 75)
        shapeDimensions.push(yMax - yMin + 75)
    }
    pathDict['rgb(0,255,0)'] = {
        path: shapePath,
        tile: dimension
    };
}

export function getCurrentPathDict(i) {
    return pathArr[i]
}

export function getTilingIndex(y) {
    for (let i = 0; i < tilingArrLength(); i++) {
        if (yMaxArr.length > 0 && y >= yMinArr[i] && y <= yMaxArr[i] + yMaxArr[i - 1] - yMinArr[i]) {
            return i
        } else if (y >= yMinArr[i] && y <= yMaxArr[i] - yMinArr[i] + 75) {
            return i
        }
    }
}

export function getShapeDimensions(i) {
    return shapeDimensions[i]
}