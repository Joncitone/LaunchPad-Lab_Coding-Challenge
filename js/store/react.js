import FrameworkAPI from '../api/github.js';
import store from './index.js';

//API
const reactAPI = new FrameworkAPI('facebook', 'react');

//ACTION TYPES
const GET_REACT_SCORE = 'GET_REACT_SCORE';
const GET_REACT_FORKS = 'GET_REACT_FORKS';
const GET_REACT_STARS = 'GET_REACT_STARS';
const GET_REACT_ISSUES = 'GET_REACT_ISSUES';

//ACTION CREATORS
export const getReactScore = (score) => ({ type: GET_REACT_SCORE, score });
export const getReactForks = (forks) => ({ type: GET_REACT_FORKS, forks });
export const getReactStars = (stars) => ({ type: GET_REACT_STARS, stars });
export const getReactIssues = (issues) => ({ type: GET_REACT_ISSUES, issues });

//THUNKS
export function getReactScoreThunk() {
  const score =
    Math.round(store.state.react.forks / 1000) +
    Math.round(store.state.react.stars / 10000) +
    Math.round(store.state.react.issues / 1000);

  store.dispatch(getReactScore(score));
}

export function getReactForksStarsIssuesThunk() {
  reactAPI
    .fetchForksStarsIssues()
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(getReactForks(data.items[0].forks));
      store.dispatch(getReactStars(data.items[0].watchers));
      store.dispatch(getReactIssues(data.items[0].open_issues));
    })
    .catch((error) => console.error(error));
}

//INITIAL STATE
const initialState = {
  name: 'react',
  score: 0,
  forks: 0,
  stars: 0,
  issues: 0,
};

//REDUCER
export default function react(state = initialState, action) {
  switch (action.type) {
    case GET_REACT_SCORE:
      return { ...state, score: action.score };
    case GET_REACT_FORKS:
      return { ...state, forks: action.forks };
    case GET_REACT_STARS:
      return { ...state, stars: action.stars };
    case GET_REACT_ISSUES:
      return { ...state, issues: action.issues };

    default:
      return state;
  }
}
