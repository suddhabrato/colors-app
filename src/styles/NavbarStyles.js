const styles = {
    Navbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '5vh'
    },
    logo: {
        marginRight: '15px',
        padding: '0 13px',
        fontSize: '18px',
        backgroundColor: '#eceff1',
        height: '100%',
        fontFamily: "Roboto",
        display: 'flex',
        alignItems: 'center',
        '& a': {
            textDecoration: 'none',
            color: 'black'
        }
    },
    slider: {
        width: '320px',
        margin: '0 15px',
        display: 'inline-block',
        '& .rc-slider-track': {
            backgroundColor: 'transparent'
        },
        '& .rc-slider-rail': {
            height: '8px'
        },
        '& .rc-slider-handle':
        {
            '&, &:hover, &:active, &:focus':
            {
                backgroundColor: 'green',
                outline: 'none',
                border: '2px solid green',
                boxShadow: 'none',
                width: '13px',
                height: '13px',
                marginLeft: '-2px',
                marginTop: '-3px'
            }
        }
    },
    selectContainer: {
        marginLeft: 'auto',
        marginRight: '1rem'
    }
};

export default styles;