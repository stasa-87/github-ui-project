import React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(1),
    },
}));

function IssueForm(props) {

    const classes = useStyles();

    const {title, body, activeIssueId, handleTitleChange, handleBodyChange, handleEditIssue, handleSaveIssue} = props;

    const renderButton = () => {

        if(activeIssueId) {

             return (
                 <Button
                     type="button"
                     color="primary"
                     className={classes.button}
                     size="small"
                     onClick={handleEditIssue}
                 >
                     Edit
                 </Button>
             );
        } else {

            return (
                <Button
                    type="button"
                    color="primary"
                    className={classes.button}
                    size="small"
                    onClick={handleSaveIssue}
                >
                    Save
                </Button>
            );
        }
    };

    return (
        <form className={classes.form} noValidate autoComplete="off">
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Title"
                type="text"
                fullWidth
                value={title}
                onChange={handleTitleChange}
            />
            <TextField
                id="standard-multiline-flexible"
                label="Body"
                multiline
                rows="2"
                rowsMax="2"
                fullWidth
                value={body}
                onChange={handleBodyChange}
            />

            <Grid container>
                <Grid item xs> </Grid>
                <Grid item>
                    {renderButton()}
                </Grid>
            </Grid>
        </form>
    );
}

export default IssueForm;