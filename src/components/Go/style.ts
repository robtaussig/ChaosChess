import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles<any, {
    numSquaresPerSide: number,
}>(theme => ({
    root: ({ numSquaresPerSide }) => ({
        display: 'grid',
        gridTemplateRows: `repeat(${numSquaresPerSide}, 1fr)`,
        gridTemplateColumns: `repeat(${numSquaresPerSide}, 1fr)`,
        backgroundColor: '#ffe99ae8',
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
            backgroundColor: '#000863a6',
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
        '&.bottom': {
            '&:before': {
                content: 'unset',
            },
        },
        '&.right': {
            '&:before': {
                content: 'unset',
            },
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
                    backgroundColor: 'white',
                    border: '2px solid black',
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
                content: '"1"',
                position: 'absolute',
                backgroundColor: 'black',
                border: '2px solid white',
                color: 'white',
                height: '70%',
                width: '70%',
                left: '50%',
                top: '50%',
                transform: 'translate(calc(-50% + 1px), calc(-50% + 1px))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Oxanium',
            },
            '&.whiteZone': {
                '&:after': {
                    backgroundColor: 'white',
                    color: 'black',
                    border: '2px solid black',
                },
            },
        },
        '&.blackPiece': {

        },
        '&.top.left': {

        },
        '&.bottom.left': {

        },
        '&.top.right': {

        },
        '&.bottom.right': {

        },
    }),
}));
