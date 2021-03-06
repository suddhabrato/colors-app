import chroma from 'chroma-js';
import sizes from "./sizes";

const styles = {
    ColorBox: {
        width: '20%',
        height: props => props.showFull ? '25%' : '50%',
        margin: '0 auto',
        display: 'inline-block',
        position: 'relative',
        cursor: 'pointer',
        marginBottom: '-4px',
        '&:hover button': {
            opacity: '1',
            transition: '0.5s'
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => (props.showFull ? "20%" : "33.3333%")
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => (props.showFull ? "10%" : "20%")
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => (props.showFull ? "5%" : "10%")
        }
    },
    copyText: {
        color: props => chroma(props.background).luminance() >= 0.7 ? 'black' : 'white'
    },
    colorName: {
        color: props => chroma(props.background).luminance() <= 0.08 ? 'white' : 'black'
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.5)' : 'white',
        background: 'rgba(255,255,255,0.3)',
        position: 'absolute',
        border: 'none',
        right: '0',
        bottom: '0',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
        textTransform: 'uppercase'
    },
    copyButton: {
        color: props => chroma(props.background).luminance() >= 0.7 ? 'rgba(0,0,0,0.5)' : 'white',
        width: '100px',
        height: '30px',
        position: 'absolute',
        display: 'inline-block',
        top: '50%',
        left: '50%',
        marginLeft: '-50px',
        marginTop: '-15px',
        textAlign: 'center',
        outline: 'none',
        background: 'rgba(255, 255, 255, 0.3)',
        fontSize: '1rem',
        lineHeight: '30px',
        textTransform: 'uppercase',
        border: 'none',
        textDecoration: 'none',
        opacity: '0'
    },
    boxContent: {
        position: 'absolute',
        padding: '10px',
        width: '100%',
        left: '0',
        bottom: '0',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    copyOverlay: {
        zIndex: '0',
        width: '100%',
        height: '100%',
        opacity: '0',
        transform: 'scale(0.1)',
        transition: 'transform 0.6s ease-in-out'
    },
    showOverlay: {
        opacity: '1',
        transform: 'scale(50)',
        zIndex: '2',
        position: 'absolute'
    },
    copyMessage: {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        transform: 'scale(0.1)',
        opacity: '0',
        color: 'white',
        '& h1': {
            fontWeight: '400',
            textShadow: '1px 2px black',
            background: 'rgba(255,255,255,0.2)',
            width: '100%',
            textAlign: 'center',
            marginBottom: '0',
            padding: '1rem',
            textTransform: 'uppercase',
            [sizes.down("xs")]: {
                fontSize: "6rem"
            }
        },
        '& p': {
            fontSize: '2rem',
            fontWeight: '100'
        }
    },
    showMessage: {
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '25',
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.3s'
    }
};

export default styles;