import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import RepositoryList from "../repository/RepositoryList";
import Typography from "@material-ui/core/Typography/Typography";
import IssuesDialog from "../issue/IssuesDialog";


@inject("commonStore")
@observer
class DashboardPage extends Component {

    componentDidMount() {

        const {commonStore} = this.props;

        commonStore.loadRepositoryList();
    }

    render() {

        const {commonStore} = this.props;

        return (
            <>

                <Typography variant="h3" component="h1" gutterBottom>
                    {commonStore.profile.login}'s repositories
                </Typography>

                <RepositoryList repositories={commonStore.repositories} />
                <IssuesDialog />
            </>
        );
    }
}

export default DashboardPage;