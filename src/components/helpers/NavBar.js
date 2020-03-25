import React, {Component} from "react";
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography/Typography";
import {AccountCircle} from "@material-ui/icons";
import Menu from "@material-ui/core/Menu/Menu";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core";


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

@inject("commonStore")
@observer
class NavBar extends Component {

    state = {
        anchorEl: null,
        open: false
    };

    handleLogout = () => {

        const {commonStore} = this.props;
        commonStore.clearProfile()
    };

    handleMenu = event => {

        this.setState({
            anchorEl: event.currentTarget,
            open: true
        });
    };

    handleClose = () => {

        this.setState({
            anchorEl: null,
            open: false
        });
    };

    render() {

        const {open, anchorEl} = this.state;
        const {commonStore, classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            GitHub UI Project
                        </Typography>

                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <AccountCircle fontSize="large" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>{commonStore.profile.login}</MenuItem>
                                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NavBar);