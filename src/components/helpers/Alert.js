import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

/**
 * @return {null}
 */
export default function Alert(props) {

    const classes = useStyles();

    const {message, severity, isOpen, handleClose} = props;

    if(!isOpen){
        return null;
    }

    return (

        <div className={classes.root}>
            <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity} >{message}</MuiAlert>
            </Snackbar>
        </div>
    );
}

Alert.propType = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
    handleClose: PropTypes.object.isRequired,
};

Alert.defaultProps = {
    severity: 'error',
    isOpen: false
};