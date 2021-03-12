import {
  getReactForksThunk,
  getReactCommitsThunk,
  getReactIssuesClosedThunk,
} from './store/index.js';

import {
  getAngularForksThunk,
  getAngularCommitsThunk,
  getAngularIssuesClosedThunk,
} from './store/index.js';

import {
  getEmberForksThunk,
  getEmberCommitsThunk,
  getEmberIssuesClosedThunk,
} from './store/index.js';

import {
  getVueForksThunk,
  getVueCommitsThunk,
  getVueIssuesClosedThunk,
} from './store/index.js';

import store from './store/index.js';
store.setInitialState();

//STORE STATE TESTING

// console.log(store.getState());

// getReactForksThunk();
// getReactCommitsThunk();
// getReactIssuesClosedThunk();

// getAngularForksThunk();
// getAngularCommitsThunk();
// getReactIssuesClosedThunk();

// getEmberForksThunk();
// getEmberCommitsThunk();
// getEmberIssuesClosedThunk();

// getVueForksThunk();
// getVueCommitsThunk();
// getVueIssuesClosedThunk();

// setTimeout(() => console.log(store.state), 5000);
