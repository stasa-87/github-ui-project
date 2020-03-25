import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Loader from "../helpers/Loader";
import Alert from "../helpers/Alert";
import {withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid/Grid";
import NavBar from "../helpers/NavBar";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        backgroundColor: '#fff',
    },
});

@inject("commonStore")
@observer
class Layout extends Component {

    closeError = () => {

        this.props.commonStore.clearError();
    };

    render() {

        const {commonStore, classes} = this.props;

        return (
            <>
                <Loader isOpen={commonStore.isPageLoading}/>
                <Alert isOpen={commonStore.hasError} message={commonStore.errorMessage} handleClose={this.closeError} />

                <NavBar/>

                <div className={classes.root}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <div className={classes.paper}>
                                {this.props.children}
                            </div>
                        </Grid>
                    </Grid>
                </div>

            </>
        );
    }
}

export default withStyles(styles)(Layout);