import FrameworkAPI from '../api/github.js';
import store from './index.js';

//API
const angularAPI = new FrameworkAPI('angular', 'angular.js');

//ACTION TYPES
const GET_ANGULAR_SCORE = 'GET_ANGULAR_SCORE';
const GET_ANGULAR_FORKS = 'GET_ANGULAR_FORKS';
const GET_ANGULAR_STARS = 'GET_ANGULAR_STARS';
const GET_ANGULAR_ISSUES = 'GET_ANGULAR_ISSUES';

//ACTION CREATORS
export const getAngularScore = (score) => ({ type: GET_ANGULAR_SCORE, score });
export const getAngularForks = (forks) => ({ type: GET_ANGULAR_FORKS, forks });
export const getAngularStars = (stars) => ({ type: GET_ANGULAR_STARS, stars });
export const getAngularIssues = (issues) => ({
  type: GET_ANGULAR_ISSUES,
  issues,
});

//THUNKS
export function getAngularScoreThunk() {
  const score =
    Math.round(store.state.angular.forks / 1000) +
    Math.round(store.state.angular.stars / 10000) +
    Math.round(store.state.angular.issues / 1000);

  store.dispatch(getAngularScore(score));
}

export function getAngularForksStarsIssuesThunk() {
  angularAPI
    .fetchForksStarsIssues()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getAngularForks(data.items[0].forks));
      store.dispatch(getAngularStars(data.items[0].watchers));
      store.dispatch(getAngularIssues(data.items[0].open_issues));
    })
    .catch((error) => console.error(error));
}

//INITIAL STATE
const initialState = {
  name: 'angular',
  score: 0,
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function angular(state = initialState, action) {
  switch (action.type) {
    case GET_ANGULAR_SCORE:
      return { ...state, score: action.score };
    case GET_ANGULAR_FORKS:
      return { ...state, forks: action.forks };
    case GET_ANGULAR_STARS:
      return { ...state, stars: action.stars };
    case GET_ANGULAR_ISSUES:
      return { ...state, issues: action.issues };
    default:
      return state;
  }
}
