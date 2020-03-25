import GitHub from "github-api";
import {GITHUB_TOKEN} from '../config';

const gh = new GitHub({
    token: GITHUB_TOKEN
});

export const ghUser = gh.getUser();
export default gh;