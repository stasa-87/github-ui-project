import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import RepositoryListItem from "./RepositoryListItem";
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

function RepositoryList(props) {

    const classes = useStyles();

    const {repositories, commonStore} = props;

    const renderRepositories = () => {

        if(repositories.length === 0 && commonStore.isPageLoading){
            return null;
        }

        if(repositories.length === 0){
            return (
                <ListItem>
                    <ListItemText
                        primary="No Data Found!"
                    />
                </ListItem>
            );
        }

        return (
            repositories.map((repository, i) => {

                return (
                    <React.Fragment key={i}>
                        <RepositoryListItem repository={repository} />
                        {repositories.length !== i + 1 && <Divider variant="inset" component="li" />}
                    </React.Fragment>
                );
            })
        );
    };

    return (
        <List className={classes.root}>
            {renderRepositories()}
        </List>
    );
}

export default inject("commonStore")(observer(RepositoryList));