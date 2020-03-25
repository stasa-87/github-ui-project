import React from 'react';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';

function IssueListItem(props) {

    const {issue, handleIssueClick} = props;

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <ErrorIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={issue.title}
                secondary={!!issue.body ? issue.body : null}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={handleIssueClick(issue.id)}>
                    <EditIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default IssueListItem;