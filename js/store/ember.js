import FrameworkAPI from '../api/github.js';
import store from './index.js';
const { dispatch } = store;

//API
const emberAPI = new FrameworkAPI('emberjs', 'ember.js');

//ACTION TYPES
const GET_EMBER_SCORE = 'GET_EMBER_SCORE';
const GET_EMBER_FORKS = 'GET_EMBER_FORKS';
const GET_EMBER_STARS = 'GET_EMBER_STARS';
const GET_EMBER_ISSUES = 'GET_EMBER_ISSUES';

//ACTION CREATORS
const getEmberScore = (score) => ({ type: GET_EMBER_SCORE, score });
const getEmberForks = (forks) => ({ type: GET_EMBER_FORKS, forks });
const getEmberStars = (stars) => ({ type: GET_EMBER_STARS, stars });
const getEmberIssues = (issues) => ({ type: GET_EMBER_ISSUES, issues });

//THUNKS
export function getEmberScoreThunk() {
  const score =
    Math.round(store.state.ember.forks / 1000) +
    Math.round(store.state.ember.stars / 10000) +
    Math.round(store.state.ember.issues / 1000);

  dispatch(getEmberScore(score));
}

export function getEmberForksStarsIssuesThunk() {
  emberAPI
    .fetchForksStarsIssues()
    .then((response) => response.json())
    .then((data) => {
      dispatch(getEmberForks(data.items[0].forks));
      dispatch(getEmberStars(data.items[0].watchers));
      dispatch(getEmberIssues(data.items[0].open_issues));
    })
    .catch((error) => console.error(error));
}

//INITIAL STATE
const initialState = {
  name: 'ember',
  score: 0,
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function ember(state = initialState, action) {
  switch (action.type) {
    case GET_EMBER_SCORE:
      return { ...state, score: action.score };
    case GET_EMBER_FORKS:
      return { ...state, forks: action.forks };
    case GET_EMBER_STARS:
      return { ...state, stars: action.stars };
    case GET_EMBER_ISSUES:
      return { ...state, issues: action.issues };

    default:
      return state;
  }
}
