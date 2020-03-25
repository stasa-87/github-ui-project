import React from "react";
import List from "@material-ui/core/List/List";
import IssueListItem from "./IssueListItem";

function IssueList(props) {

    const {issues, handleIssueClick} = props;

    return (
        <List dense={true} >
            {issues.map((issue, i) =>
                <IssueListItem key={i} issue={issue} handleIssueClick={handleIssueClick} />
            )}
        </List>
    );
}

export default IssueList;