import FrameworkAPI from '../api/github.js';
import store from './index.js';
const { dispatch } = store;

//API
const vueAPI = new FrameworkAPI('vuejs', 'vue');

//ACTION TYPES
const GET_VUE_SCORE = 'GET_VUE_SCORE';
const GET_VUE_FORKS = 'GET_VUE_FORKS';
const GET_VUE_STARS = 'GET_VUE_STARS';
const GET_VUE_ISSUES = 'GET_VUE_ISSUES';

//ACTION CREATORS
const getVueScore = (score) => ({ type: GET_VUE_SCORE, score });
const getVueForks = (forks) => ({ type: GET_VUE_FORKS, forks });
const getVueStars = (stars) => ({ type: GET_VUE_STARS, stars });
const getVueIssues = (issues) => ({ type: GET_VUE_ISSUES, issues });

//THUNKS
export function getVueScoreThunk() {
  const score =
    Math.round(store.state.vue.forks / 1000) +
    Math.round(store.state.vue.stars / 10000) +
    Math.round(store.state.vue.issues / 1000);

  dispatch(getVueScore(score));
}

export function getVueForksStarsIssuesThunk() {
  vueAPI
    .fetchForksStarsIssues()
    .then((response) => response.json())
    .then((data) => {
      dispatch(getVueForks(data.items[0].forks));
      dispatch(getVueStars(data.items[0].watchers));
      dispatch(getVueIssues(data.items[0].open_issues));
    })
    .catch((error) => console.error(error));
}

//INITIAL STATE
const initialState = {
  name: 'vue',
  score: 0,
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function vue(state = initialState, action) {
  switch (action.type) {
    case GET_VUE_SCORE:
      return { ...state, score: action.score };
    case GET_VUE_FORKS:
      return { ...state, forks: action.forks };
    case GET_VUE_STARS:
      return { ...state, stars: action.stars };
    case GET_VUE_ISSUES:
      return { ...state, issues: action.issues };

    default:
      return state;
  }
}
