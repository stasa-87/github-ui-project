import {action, computed, observable} from 'mobx';
import gh, {ghUser} from '../api/github';

class commonStore {

    @observable errorMessage = null;

    @observable isPageLoadingCount = 0;

    @observable profile = {};

    @observable repositories = [];

    @observable issues = [];

    @observable activeIssuesRepository = {};

    @observable isDialogOpen = false;

    @computed get isPageLoading(){

        return !!this.isPageLoadingCount;
    }

    @action
    loadProfile() {

        this.isPageLoadingCount++;

        return ghUser
            .getProfile()
            .then(({data: profile}) => {

                this.profile = profile;
            })
            .catch(err => {

                this.errorMessage = err.message;
            })
            .finally(() => {

                this.isPageLoadingCount--;
            });
    }

    @action
    clearProfile() {

        this.profile = {};
    }

    @computed get isAuthenticated() {
        return !!this.profile.login;
    }

    @action
    clearError() {

        this.errorMessage = null;
    }

    @computed get hasError() {

        return !!this.errorMessage;
    }

    @action
    loadRepositoryList() {

        this.isPageLoadingCount++;

        return ghUser
            .listRepos()
            .then(({data:repos}) => {

                return Promise.all(
                    repos.map((repo,index) => gh.getRepo(repo.owner.login, repo.name).isStarred().then(response => {
                        return {...repo, isStarred: response};
                    }))
                )
                .then(repos => {

                    this.repositories = repos;
                });
            })
            .catch(err => {

                this.errorMessage = err.message;
            })
            .finally(() => {

                this.isPageLoadingCount--;
            });
    };

    @action
    toggleStarUnstar = (isStarred) => (owner,name) => () =>{

        this.isPageLoadingCount++;

        let itemIndex = this.repositories.findIndex((item) => {
            return item.name === name && item.owner.login === owner;
        });


        let repo = gh.getRepo(owner, name);
        repo[isStarred? 'star': 'unstar']()
            .then(() => {

                let newState = [...this.repositories];

                newState[itemIndex].isStarred = isStarred;
                isStarred? newState[itemIndex].stargazers_count++ : newState[itemIndex].stargazers_count--;
                this.repositories = newState;
            })
            .catch(err => {

                this.errorMessage = err.message;
            })
            .finally(() => {

                this.isPageLoadingCount--;
            });
    };

    @action
    loadIssuesList(owner, name) {

        this.isPageLoadingCount++;

        return gh.getIssues(owner, name)
            .listIssues()
            .then(({data:issues}) => {

                this.issues = issues;
            })
            .catch(err => {

                this.errorMessage = err.message;
            })
            .finally(() => {

                this.isPageLoadingCount--;
            });
    };

    @action
    createIssue(title, body) {

        const {owner, name} = this.activeIssuesRepository;

        this.isPageLoadingCount++;

        return gh.getIssues(owner, name)
            .createIssue({title, body})
            .then(() => {

                return this.loadIssuesList(owner, name);
            })
            .catch(err => {

                this.errorMessage = err.message;
            })
            .finally(() => {

                this.isPageLoadingCount--;
            });
    };

    @action
    editIssue(id, title, body) {

        const {owner, name} = this.activeIssuesRepository;

        this.isPageLoadingCount++;

        let issue = this.issues.find(item => item.id === id);

        return gh.getIssues(owner, name)
            .editIssue(issue.number, {title, body})
            //fast fix for github api requests cache
            //issue found here https://github.com/octokit/rest.js/issues/890
            .then(() => {
                return new Promise(resolve => setTimeout(() => resolve(null), 1000));
            })
            .then(() => {

                return fetch(`https://api.github.com/repos/${owner}/${name}/issues`, {
                    headers: {
                        'If-None-Match': ""
                    }})
                    .then(response => response.json())
                    .then(data => {
                        this.issues = data
                    });
                // return this.loadIssuesList(owner, name);
            })
            //end fast fix
            .catch(err => {

                this.errorMessage = err.message;
            })
            .finally(() => {

                this.isPageLoadingCount--;
            });
    };

    @action
    showDialog(owner, name) {

        this.isDialogOpen = true;
        this.activeIssuesRepository = {owner, name};
    };

    @action
    hideDialog() {

        this.isDialogOpen = false;
        this.activeIssuesRepository = {};
    };
}

export default new commonStore();