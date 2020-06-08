import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'repeat(9, 1fr)',
        gridTemplateColumns: 'repeat(9, 1fr)',
        backgroundColor: '#ffe99ae8',
    },
}));

export const useSquareStyles = makeStyles((theme: any) => ({
    root: {
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
        '&.col-7': {
            '&:before': {
                borderRight: '3px solid black',
            },
        },
        '&.row-7': {
            '&:before': {
                borderBottom: '3px solid black',
            },
        },
        '&.col-2.row-2, &.col-6.row-6, &.col-2.row-6, &.col-6.row-2, &.col-4.row-4': {
            '&:not(.blackPiece):not(.whitePiece)': {
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
    },
}));
