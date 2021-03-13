import FrameworkAPI from '../api/github.js';
import store from './index.js';

//API
const vueAPI = new FrameworkAPI('vuejs', 'vue');

//ACTION TYPES
const GET_VUE_SCORE = 'GET_VUE_SCORE';
const GET_VUE_FORKS = 'GET_VUE_FORKS';
const GET_VUE_COMMITS = 'GET_VUE_COMMITS';
const GET_VUE_ISSUES_CLOSED = 'GET_VUE_ISSUES_CLOSED';

//ACTION CREATORS
const getVueScore = (score) => ({ type: GET_VUE_SCORE, score });
const getVueForks = (forks) => ({ type: GET_VUE_FORKS, forks });
const getVueCommits = (commits) => ({ type: GET_VUE_COMMITS, commits });
const getVueIssuesClosed = (issuesClosed) => ({
  type: GET_VUE_ISSUES_CLOSED,
  issuesClosed,
});

//THUNKS
export function getVueScoreThunk() {
  const score =
    Math.floor(store.state.vue.forks / 10000) +
    Math.floor(store.state.vue.commits / 100) +
    Math.floor(store.state.vue.issuesClosed / 1000);

  store.dispatch(getVueScore(score));
}

export function getVueForksThunk() {
  vueAPI
    .fetchForks()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getVueForks(data.items[0].forks));
    })
    .catch((error) => console.error(error));
}

export const getVueCommitsThunk = () => {
  vueAPI
    .fetchCommits()
    .then((response) => response.json())
    .then((data) => {
      let commits = data.all.reduce((acc, curr) => acc + curr, 0);
      store.dispatch(getVueCommits(commits));
    })
    .catch((error) => console.error(error));
};

export const getVueIssuesClosedThunk = () => {
  vueAPI
    .fetchIssuesClosed()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getVueIssuesClosed(data.total_count));
    })
    .catch((error) => console.error(error));
};

//INITIAL STATE
const initialState = {
  name: 'vue',
  score: 0,
  forks: 0,
  commits: 0,
  issuesClosed: 0,
};

//REDUCER
export default function vue(state = initialState, action) {
  switch (action.type) {
    case GET_VUE_SCORE:
      return { ...state, score: action.score };
    case GET_VUE_FORKS:
      return { ...state, forks: action.forks };
    case GET_VUE_COMMITS:
      return { ...state, commits: action.commits };
    case GET_VUE_ISSUES_CLOSED:
      return { ...state, issuesClosed: action.issuesClosed };

    default:
      return state;
  }
}
