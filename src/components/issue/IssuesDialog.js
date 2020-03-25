import React, {Component} from "react";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import Button from "@material-ui/core/Button/Button";
import {inject, observer} from "mobx-react";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import IssueForm from "./IssueForm";
import IssueList from "./IssueList";


@inject("commonStore")
@observer
class IssuesDialog extends Component {

    state = {
        title: '',
        body: '',
        activeIssueId: null
    };

    handleClose = () => {

        const {commonStore} = this.props;
        commonStore.hideDialog();

        this.setState({
            activeIssueId: null,
            title: '',
            body: ''
        });

    };

    handleTitleChange = (e) => {
        this.setState({title: e.target.value});
    };

    handleBodyChange = (e) => {
        this.setState({body: e.target.value});
    };

    handleSaveIssue = () => {

        const {commonStore} = this.props;
        const {title, body} = this.state;

        commonStore
            .createIssue(title, body)
            .then(() => {

                this.setState({
                    title: '',
                    body: '',
                    activeIssueId: null
                });
            });
    };

    handleEditIssue = () => {

        const {commonStore} = this.props;
        const {title, body, activeIssueId} = this.state;

        commonStore
            .editIssue(activeIssueId, title, body)
            .then(() => {

                this.setState({
                    title: '',
                    body: '',
                    activeIssueId: null
                });
            });
    };

    handleIssueClick = (id) => () => {

        const {activeIssueId} = this.state;
        const {commonStore} = this.props;

        if(activeIssueId === id){

            this.setState({
                activeIssueId: null,
                title: '',
                body: ''
            });
            return;
        }

        let issue = commonStore.issues.find(item => item.id === id);

        this.setState({
            activeIssueId: id,
            title: issue.title,
            body: issue.body
        });
    };

    render() {

        const {commonStore} = this.props;

        return (
            <Dialog open={commonStore.isDialogOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Issues of {commonStore.activeIssuesRepository.owner}/{commonStore.activeIssuesRepository.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        * GitHub REST API v3 does not support deleting an issue.
                    </DialogContentText>

                    <IssueForm {...this.state} handleTitleChange={this.handleTitleChange} handleBodyChange={this.handleBodyChange} handleEditIssue={this.handleEditIssue} handleSaveIssue={this.handleSaveIssue}/>

                    <IssueList issues={commonStore.issues} handleIssueClick={this.handleIssueClick} />

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default IssuesDialog;