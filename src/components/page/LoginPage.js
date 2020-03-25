import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import {withStyles} from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Grid from "@material-ui/core/Grid/Grid";
import Link from "@material-ui/core/Link/Link";
import Container from "@material-ui/core/Container/Container";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(15),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(7),
        height: theme.spacing(7),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

@inject("commonStore")
@observer
class LoginPage extends Component {

    login = () => {

        const {commonStore} = this.props;
        commonStore.loadProfile().then(() => {
            this.props.history.push('/dashboard')
        });
    };

    render() {

        const { classes } = this.props;

        return (
            <>
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={this.login}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs> </Grid>
                            <Grid item>
                                <Link target={'_blank'} href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line" variant="body2">
                                    {"Don't have an access token?"}
                                </Link>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(LoginPage));