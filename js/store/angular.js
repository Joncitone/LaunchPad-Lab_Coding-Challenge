import FrameworkAPI from '../api/github.js';
import store from './index.js';

//API
const angularAPI = new FrameworkAPI('angular', 'angular.js');

//ACTION TYPES
const GET_ANGULAR_FORKS = 'GET_ANGULAR_FORKS';
const GET_ANGULAR_COMMITS = 'GET_ANGULAR_COMMITS';
const GET_ANGULAR_ISSUES_CLOSED = 'GET_ANGULAR_ISSUES_CLOSED';

//ACTION CREATORS
const getAngularForks = (forks) => ({ type: GET_ANGULAR_FORKS, forks });
const getAngularCommits = (commits) => ({ type: GET_ANGULAR_COMMITS, commits });
const getAngularIssuesClosed = (issuesClosed) => ({
  type: GET_ANGULAR_ISSUES_CLOSED,
  issuesClosed,
});

//THUNKS
export function getAngularForksThunk() {
  angularAPI
    .fetchForks()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getAngularForks(data.items[0].forks));
    })
    .catch((error) => console.error(error));
}

export const getAngularCommitsThunk = () => {
  angularAPI
    .fetchCommits()
    .then((response) => response.json())
    .then((data) => {
      let commits = data.all.reduce((acc, curr) => acc + curr, 0);
      store.dispatch(getAngularCommits(commits));
    })
    .catch((error) => console.error(error));
};

export const getAngularIssuesClosedThunk = () => {
  angularAPI
    .fetchIssuesClosed()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getAngularIssuesClosed(data.total_count));
    })
    .catch((error) => console.error(error));
};

//INITIAL STATE
const initialState = {
  forks: 0,
  commits: 0,
  issuesClosed: 0,
};

//REDUCER
export default function angular(state = initialState, action) {
  switch (action.type) {
    case GET_ANGULAR_FORKS:
      return { ...state, forks: action.forks };
    case GET_ANGULAR_COMMITS:
      return { ...state, commits: action.commits };
    case GET_ANGULAR_ISSUES_CLOSED:
      return { ...state, issuesClosed: action.issuesClosed };

    default:
      return state;
  }
}
