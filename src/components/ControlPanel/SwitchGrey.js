import {styled} from "@mui/material";
import Switch, {SwitchProps} from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

export const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props}/>
))(({theme}) => ({
    width: 31,
    height: 15,
    padding: 0,
    right: '10px',
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? 'grey' : 'grey',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 11,
        height: 11,
    },
    '& .MuiSwitch-track': {
        borderRadius: 20 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export function SwitchGreyChecked(props) {
    return (
        <div id="controlPanelRow" style={{ padding: '4px 0' }}>{props.name}
            <FormControlLabel control={<IOSSwitch onChange={props.fn} defaultChecked />} />
        </div>
    );
}
export function SwitchGreyUnchecked(props) {
    return (
        <div id="controlPanelRow" style={{ padding: '4px 0' }}>{props.name}
            <FormControlLabel control={<IOSSwitch onChange={props.fn} />} />
        </div>
    );
}
