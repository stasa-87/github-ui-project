import React from 'react';
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import Typography from "@material-ui/core/Typography/Typography";
import moment from "moment";
import FolderIcon from '@material-ui/icons/Folder';
import {StarBorder} from "@material-ui/icons";
import StarIcon from '@material-ui/icons/Star';
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/ListItem";
import {inject, observer} from "mobx-react";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import Badge from "@material-ui/core/Badge/Badge";
import Chip from "@material-ui/core/Chip/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',
        marginRight: theme.spacing(4)
    },
}));

function RepositoryListItem(props) {

    const classes = useStyles();

    const {repository, commonStore} = props;

    const handleStar = commonStore.toggleStarUnstar(true);

    const handleUnStar = commonStore.toggleStarUnstar(false);

    const handleDialogOpen = (owner, name) => () =>{

        commonStore
            .loadIssuesList(owner, name)
            .then(() => {

                return commonStore.showDialog(owner, name);
            });

    };

    return(
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>
                    <FolderIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText disableTypography={true} >

                <ListItemText
                    // disableTypography={true}
                    primary={<a href={repository.html_url} target={'blank'} itemProp="name codeRepository">{repository.name}</a>}
                    secondary={
                        <React.Fragment>

                            <Typography
                                component="span"
                                variant="body2"
                                // className={classes.inline}
                                color="textPrimary"
                            >
                                {repository.description}
                            </Typography>

                            {` — Updated on ${moment(repository.updated_at).format('YYYY-MM-DD')}`}

                        </React.Fragment>
                    }
                />

                <Chip label={repository.language} className={classes.root} />

                <Badge badgeContent={repository.stargazers_count } color="primary">
                    {repository.isStarred ?
                        <StarIcon onClick={handleUnStar(commonStore.profile.login, repository.name)} />
                        : <StarBorder onClick={handleStar(commonStore.profile.login, repository.name)} />}
                </Badge>

            </ListItemText>
            <ListItemSecondaryAction>
                <Button size="small" color="primary" onClick={handleDialogOpen(commonStore.profile.login, repository.name)}>
                    Issues
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default inject("commonStore")(observer(RepositoryListItem));