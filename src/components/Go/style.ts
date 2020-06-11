import { makeStyles } from '@material-ui/styles'

const BOARD_SIDE_MARGIN = 15;

export const useStyles = makeStyles<any, {
    numSquaresPerSide: number,
}>(theme => ({
    root: ({ numSquaresPerSide }) => ({
        display: 'grid',
        gridArea: 'main',
        overflow: 'auto',
        gridTemplateRows: `repeat(${numSquaresPerSide}, min(calc(100vh / ${numSquaresPerSide}), calc(100vw / ${numSquaresPerSide})))`,
        gridTemplateColumns: `repeat(${numSquaresPerSide}, min(calc(100vh / ${numSquaresPerSide}), calc(100vw / ${numSquaresPerSide})))`,
        backgroundColor: 'rgba(255, 233, 154, 0.91)',
    }),
}));

export const useSquareStyles = makeStyles<any, {
    numSquaresPerSide: number,
}>(theme => ({
    root: ({ numSquaresPerSide }) => ({
        position: 'relative',
        backgroundColor: 'transparent',
        outline: 'none',
        '&:active': {
            backgroundColor: 'rgba(0, 8, 99, 0.65)',
        },
        '&:before': {
            content: '""',
            position: 'absolute',
            borderTop: '2px solid black',
            borderLeft: '2px solid black',
            height: '100%',
            width: '100%',
        },
        '&.row-0': {
            '&:before': {
                borderTop: '3px solid black',
            },
        },
        '&.col-0': {
            '&:before': {
                borderLeft: '3px solid black',
            },
        },
        '&.canMoveTo': {

        },
        '&.left': {

        },
        '&.top': {

        },
        [`&.col-${numSquaresPerSide - 2}`]: {
            '&:before': {
                borderRight: '3px solid black',
            },
        },
       [`&.row-${numSquaresPerSide - 2}`]: {
            '&:before': {
                borderBottom: '3px solid black',
            },
        },
        '&.anchorPoint': {
            '&:not(.blackPiece):not(.whitePiece):not(.whiteZone):not(.blackZone)': {
                '&:after': {  
                    content: '""',
                    position: 'absolute',
                    backgroundColor: 'black',
                    height: 8,
                    width: 8,
                    borderRadius: '50%',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(calc(-50% + 1px), calc(-50% + 1px))',
                },
            },
        },
        '&.whitePiece, &.blackPiece': {
            '&:after': {  
                content: '""',
                position: 'absolute',
                backgroundColor: 'black',
                height: '70%',
                width: '70%',
                borderRadius: '50%',
                left: '50%',
                top: '50%',
                transform: 'translate(calc(-50% + 1px), calc(-50% + 1px))',
            },
            '&.whitePiece': {
                '&:after': {
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(207,207,207,1) 0%, rgba(255,255,255,1) 100%)',
                    boxShadow: '0 0 3px 0px black',
                },
            },
            '&.blackPiece': {
                '&:after': {
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(87,87,87,1) 0%, rgba(0,0,0,1) 55%)',
                },
            },
            '&.wasLastMove': {
                '&:after': {
                    border: '3px solid #00a074!important',
                },
            },
        },
        '&.whiteZone, &.blackZone': {
            '&:after': {
                content: '""',
                position: 'absolute',
                backgroundColor: 'black',
                background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(87,87,87,1) 0%, rgba(0,0,0,1) 55%)',
                color: 'white',
                height: '50%',
                width: '50%',
                left: '50%',
                top: '50%',
                transform: 'translate(calc(-50% + 1px), calc(-50% + 1px)) rotate(45deg)',
            },
            '&.whiteZone': {
                '&:after': {
                    background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(207,207,207,1) 0%, rgba(255,255,255,1) 100%)',
                    boxShadow: '0 0 3px 0px black',
                },
            },
        },
        '&.bottom': {
            '&:before': {
                content: 'unset',
            },
            '&:after': {  
                transform: 'translate(calc(-50% + 1px), calc(-50% - 2px)) rotate(45deg)',
            },
        },
        '&.right': {
            '&:before': {
                content: 'unset',
            },
            '&:after': {  
                transform: 'translate(calc(-50% - 1px), calc(-50% + 1px)) rotate(45deg)',
            },
        },
        '&.bottom.right': {
            '&:after': {  
                transform: 'translate(calc(-50% - 1px), calc(-50% - 2px)) rotate(45deg)',
            },
        },
    }),
}));

export const useHeaderStyles = makeStyles((theme: any) => ({
    root: {

    },
    connected: {
        color: 'green',
    },
    connecting: {
        color: 'orange',
    },
    closed: {
        color: 'red',
    },
}));
