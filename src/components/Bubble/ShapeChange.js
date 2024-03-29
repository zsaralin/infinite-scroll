import {gsap} from "gsap";
import Snap from "snapsvg-cjs";
import {isRightHand} from "../Effects/Handedness";
import {getCircle, pauseColourPreview, setIsHiding, startColourPreview, isMoving} from "./Bubble";

let startWhite;
let startInterval;
let endInterval;

let s;
let speech;
let circlePoints;
let speechPoints;
let cloudPoints;
let bubble;
let isChanging = false;


const mina = window.mina;

export let currShape = "circle"
let cloudType = '#circlesR';

export function toSpeech(str) {
    shapeChange(`speech`, str)
}

export function toCloud(str) {
    shapeChange(`cloud`, str)
}

export function getIsChanging() {
    return isChanging;
}

export function setIsChanging(i) {
    isChanging = i;
}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function shapeChange(shapeType, feedbackStr) {
    while (isMoving) {
        await delay(500)
    }

    isChanging = true;
    let circle = getCircle();
    let points = shapeType === "cloud" ? cloudPoints : speechPoints
    let id = shapeType + '-text'
    let textStr = '#' + id;
    if (shapeType === "cloud") {
        cloudType = isRightHand() ? "#circlesR" : "#circlesL";
        textStr = `${textStr}, ${cloudType}`;
    } else if (shapeType === "speech") {
        s = Snap(bubble)
        let speechType = isRightHand() ? "#speechR" : "#speechL"
        speech = s.select(speechType);
        speechPoints = speech?.node.getAttribute('d');
    }
    if (!isMoving) {
        currShape = shapeType

        circle?.animate({d: points}, 1500, mina.linear);
        // currShape = shapeType

        gsap.to("#bubble", {opacity: 1, duration: .5, delay: 0})
        startWhite = setTimeout(function () {
            pauseColourPreview()
            gsap.to("#circle", {stroke: 'grey', strokeWidth: 3, onComplete: showText})
        }, 1000);
    }

    function showText() {
        gsap.to(textStr, {opacity: 1, delay: 0, duration: 1.3, onComplete: toCircle})
        document.getElementById(id).innerHTML = feedbackStr
    }

    function toCircle() {
        endInterval = setTimeout(function () {
            getCircle()?.animate({d: circlePoints}, 500, mina.linear);
            gsap.to("#circle", {stroke: 'white', strokeWidth: 10, duration: 1})
            gsap.to(textStr, {opacity: 0, duration: .5})
            isChanging = false;
            startColourPreview()
            currShape = "circle";
        }, 2000);
    }

    setIsHiding(false)

}

export function setSpeechPoints(p) {
    speechPoints = p
}

export function setCloudPoints(p) {
    cloudPoints = p
}

export function setCirclePoints(p) {
    circlePoints = p
}

export function stopShapeChange() {
    clearTimeout(startWhite)
    clearTimeout(startInterval)
    clearTimeout(endInterval)
}