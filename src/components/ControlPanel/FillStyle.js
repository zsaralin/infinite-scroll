import {createTheme, FormControl, FormHelperText, MenuItem, NativeSelect, Select} from "@mui/material";
import {changeColourSpeed} from "../Stroke/StrokeColor";
import {setFillType} from "../Tile/CompleteTile";
import {SelectChangeEvent} from "@mui/material";
import * as React from 'react';
import {ThemeProvider} from "@mui/material/styles";
import {setDotType} from "../Stroke/DotType";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Montserrat',
            'sans-serif'
        ].join(','),
        fontSize: 12,
    }
});

export function FillStyle(props) {

    const handleChange = (event: SelectChangeEvent) => {
        setFillType(event.target.value.toString());
    };

    return (
        <ThemeProvider theme={theme}>
        <div id="controlPanelRow">{props.name}
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <NativeSelect
                defaultValue="combination"
                onChange={handleChange}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
            >
                <option value={"first"} >First</option>
                <option value={"last"}>Last</option>
                <option value={"complem"}>Complementary Colour</option>
                <option value={"combination"}>Combination</option>
                <option value={"blurFill"}>Blur/Fill</option>
                <option value={"blur"}>Blur/No Fill</option>
                <option value={"meanHue"}>Mean Hue</option>
                <option value={"inverseMean"}>Inverse Mean Hue</option>
                <option value={"radialGradient"}>Radial Gradient</option>
                <option value={"diagGradient"}>Diagonal Gradient</option>
                <option value={"horizGradient"}>Horizontal Gradient</option>
                <option value={"vertGradient"}>Vertical Gradient</option>
                <option value={"mostUsed"}>Most Used Colour</option>
                <option value={"leastUsed"}>Least Used Colour</option>

            </NativeSelect>
        </FormControl>
            </div>
        </ThemeProvider>
    );
}


export function DotStyle(props) {

    const handleChange = (event: SelectChangeEvent) => {
        setDotType(event.target.value.toString());
    };

    return (
        <ThemeProvider theme={theme}>
            <div id="controlPanelRow">{props.name}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <NativeSelect
                        defaultValue="combination"
                        onChange={handleChange}
                        inputProps={{
                            name: 'age',
                            id: 'uncontrolled-native',
                        }}
                    >
                        <option value={"reg"} >Regular</option>
                        <option value={"clover"}>Clover</option>
                        <option value={"flower"}>Flower</option>
                        <option value={"pulse"}>Pulse</option>
                    </NativeSelect>
                </FormControl>
            </div>
        </ThemeProvider>
    );
}