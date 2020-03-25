import React, {Component} from "react";
import {inject, observer} from "mobx-react";
import Loader from "../helpers/Loader";
import Alert from "../helpers/Alert";


@inject("commonStore")
@observer
class Layout extends Component {

    closeError = () => {

        this.props.commonStore.clearError();
    };

    render() {

        const {commonStore} = this.props;

        return (
            <>
                <Loader isOpen={commonStore.isPageLoading}/>
                <Alert isOpen={commonStore.hasError} message={commonStore.errorMessage} handleClose={this.closeError} />

                {this.props.children}
            </>
        );
    }
}

export default Layout;