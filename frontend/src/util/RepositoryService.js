import axios from 'axios';
import { getUserAuth } from './AuthService';

export { getRepositoriesForAccount, getRepositorySummary, createRepository, getItemsByPath };

const BASE_URL = 'http://localhost:8080';

function getRepositoriesForAccount(account) {
    const url = `${BASE_URL}/repository/${account}`;
    return axios.get(url).then(resp => resp.data);
}

function getRepositorySummary(account, repoName) {
    const url = `${BASE_URL}/repository/${account}/${repoName}/summary`;
    return axios.get(url).then(resp => resp.data);
}

function getItemsByPath(account, repoName, path) {
    const url = `${BASE_URL}/repository/${account}/${repoName}/blob/${path}`;
    return axios.get(url).then(resp => resp.data);
}

function createRepository(repoName, description) {
    const url = `${BASE_URL}/repository`;
    return axios.post(url, {
        name: repoName,
        description: description
    }, {
            headers: {
                'Token': getUserAuth(),
                'Content-Type': 'application/json'

            }
        }).then(resp => resp.data)
        .catch(e => alert(e));
}
