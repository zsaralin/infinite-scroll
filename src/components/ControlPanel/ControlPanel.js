import {gsap} from "gsap";
import FormGroup from "@mui/material/FormGroup";
import SwitchGrey from "./SwitchGrey";
import {triggerAudio} from "../Audio";
import {triggerScroll} from "../PageScroll";
import {triggerCompleteTile} from "../Tile/CompleteTile";
import SliderGrey from "./SliderGrey";
import {changeLineWidth} from "../Stroke/StrokeWidth";
import {FILL_RATIO, LINE_WIDTH, TILE_WIDTH} from "../Constants";
import {changeColourSpeed, colorDelay, stopColorChange, triggerRandomColour} from "../Stroke/StrokeColor";
import {changeTileWidth} from "../Tiling/TileWidth";
import {triggerShrinkStroke} from "../Stroke/ShrinkingStroke";
import {changeFillRatio} from "../Effects/FillRatio";

let panelOn = false;

export function hideControlPanel() {
    const controlPanelBackground = document.getElementById("controlPanelBackground");
    controlPanelBackground.style.visibility  = 'hidden'
    gsap.to("#controlPanel", {left: -window.innerWidth + 'px', duration: 1, delay: 0})
    panelOn = false;
    colorDelay()
}

export function showControlPanel() {
    const controlPanelBackground = document.getElementById("controlPanelBackground");
    controlPanelBackground.style.visibility  = 'visible'
    gsap.to("#controlPanel", {left: '0px', duration: 1, delay: 0})
    panelOn = true;
}

export function isPanelOn(){
    return panelOn;
}

export default function ControlPanel() {
    return (
        <div>
            <div id="controlPanel">
                <div style={{padding: '30px', fontSize: '1.5em'}}>Control Panel</div>
                <FormGroup style={{paddingLeft: '30px'}}>
                    <SwitchGrey name="Music" fn={triggerAudio}/>
                    <SwitchGrey name="Show Feedback" fn={triggerAudio}/>
                    <SwitchGrey name="Show Colour Preview" fn={triggerAudio}/>
                    <SwitchGrey name="Auto Page Scroll" fn={triggerScroll}/>
                    <SwitchGrey name="Auto Complete Tile" fn={triggerCompleteTile}/>
                    <SwitchGrey name="Auto Stroke Width" fn={triggerShrinkStroke}/>
                    <SwitchGrey name="Random Colour Change" fn={triggerRandomColour}/>
                    <SliderGrey name="Stroke Width" fn={changeLineWidth} default = {LINE_WIDTH} min = {5} max = {40}/>
                    <SliderGrey name="Tile Width" fn={changeTileWidth} default = {TILE_WIDTH} min = {5} max = {40}/>
                    <SliderGrey name="Colour Change" fn={changeColourSpeed} default = {-300} min = {-1000} max = {-100}/>
                    <SliderGrey name="Auto Fill Min Threshold" fn={changeFillRatio} default = {FILL_RATIO} min = {0} max = {.95}/>
                </FormGroup>
            </div>
            <div id="controlPanelBackground" onClick={hideControlPanel}></div>
        </div>
    )
}