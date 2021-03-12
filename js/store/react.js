import FrameworkAPI from '../api/github.js';
import store from './index.js';

//API
const reactAPI = new FrameworkAPI('facebook', 'react');

//ACTION TYPES
const GET_REACT_FORKS = 'GET_REACT_FORKS';
const GET_REACT_COMMITS = 'GET_REACT_COMMITS';
const GET_REACT_ISSUES_CLOSED = 'GET_REACT_ISSUES_CLOSED';

//ACTION CREATORS
const getReactForks = (forks) => ({ type: GET_REACT_FORKS, forks });
const getReactCommits = (commits) => ({ type: GET_REACT_COMMITS, commits });
const getReactIssuesClosed = (issuesClosed) => ({
  type: GET_REACT_ISSUES_CLOSED,
  issuesClosed,
});

//THUNKS
export function getReactForksThunk() {
  reactAPI
    .fetchForks()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getReactForks(data.items[0].forks));
    })
    .catch((error) => console.error(error));
}

export const getReactCommitsThunk = () => {
  reactAPI
    .fetchCommits()
    .then((response) => response.json())
    .then((data) => {
      let commits = data.all.reduce((acc, curr) => acc + curr, 0);
      store.dispatch(getReactCommits(commits));
    })
    .catch((error) => console.error(error));
};

export const getReactIssuesClosedThunk = () => {
  reactAPI
    .fetchIssuesClosed()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getReactIssuesClosed(data.total_count));
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
export default function react(state = initialState, action) {
  switch (action.type) {
    case GET_REACT_FORKS:
      return { ...state, forks: action.forks };
    case GET_REACT_COMMITS:
      return { ...state, commits: action.commits };
    case GET_REACT_ISSUES_CLOSED:
      return { ...state, issuesClosed: action.issuesClosed };

    default:
      return state;
  }
}
