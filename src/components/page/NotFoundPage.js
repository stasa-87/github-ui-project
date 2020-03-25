import React from "react";
import Typography from "@material-ui/core/Typography/Typography";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    paper: {
        color:'#000',
        background:'#fff',
        fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
        height:'100vh',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    code: {
        display:'inline-block',
        borderRight:'1px solid rgba(0, 0, 0,.3)',
        margin:0,
        marginRight:'20px',
        padding:'10px 23px 10px 0',
        fontSize:'24px',
        fontWeight:'500',
        verticalAlign:'top'
    },
    messagePaper: {
        display: 'inline-block',
        textAlign: 'left',
        lineHeight:'49px',
        height:'49px',
        verticalAlign:'middle'
    },
    message: {
        fontSize: '14px',
        fontWeight: 'normal',
        lineHeight:'inherit',
        margin:0,
        padding:0
    }
}));

function NotFoundPage() {

    const classes = useStyles();

    return (
        <div>
            <div className={classes.paper} >
                <div>
                    <Typography component="h1" className={classes.code} >404</Typography>
                    <div className={classes.messagePaper} >
                        <Typography component="h6" className={classes.message} >This page could not be found.</Typography>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;