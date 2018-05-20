import axios from 'axios';
import { getUserAuth } from './AuthService';

export {
    getAllCommitsByRef,
    getRepositoriesForAccount,
    getRepositorySummary,
    createRepository,
    getItemsByPath,
    getBlobContentsByPath,
    getCommitDiffs,
    getRefs,
    getZipFileUrl
};

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

function getRefs(account, repoName) {
    const url = `${BASE_URL}/repository/${account}/${repoName}/refs`;
    return axios.get(url).then(resp => resp.data);
}

function getAllCommitsByRef(account, repoName, ref) {
    const url = `${BASE_URL}/repository/${account}/${repoName}/commits/${ref}`;
    return axios.get(url).then(resp => resp.data);
}

function getBlobContentsByPath(account, repoName, path) {
    const url = `${BASE_URL}/repository/${account}/${repoName}/contents/${path}`;
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

function getCommitDiffs(account, repoName, oldSha, newSha) {
    const url = `${BASE_URL}/repository/${account}/${repoName}/diff`;
    const queryString = `?oldSha=${oldSha}&newSha=${newSha}`;
    return axios.get(url + queryString).then(resp => resp.data);
}

function getZipFileUrl(account, repoName, branch, fileName) {
    return `${BASE_URL}/repository/${account}/${repoName}/${branch}/zip/${fileName}`;
}
