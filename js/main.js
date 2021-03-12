import {
  getReactForksThunk,
  getReactCommitsThunk,
  getReactIssuesClosedThunk,
  getAngularForksThunk,
  getAngularCommitsThunk,
  getAngularIssuesClosedThunk,
  getEmberForksThunk,
  getEmberCommitsThunk,
  getEmberIssuesClosedThunk,
  getVueForksThunk,
  getVueCommitsThunk,
  getVueIssuesClosedThunk,
} from './store/index.js';

import store from './store/index.js';
import vue from './store/vue.js';
store.setInitialState();

//ELEMENTS TO RENDER
const reactForks = document.getElementById('react-forks');
const reactCommits = document.getElementById('react-commits');
const reactIssuesClosed = document.getElementById('react-issues-closed');
const angularForks = document.getElementById('angular-forks');
const angularCommits = document.getElementById('angular-commits');
const angularIssuesClosed = document.getElementById('angular-issues-closed');
const emberForks = document.getElementById('ember-forks');
const emberCommits = document.getElementById('ember-commits');
const emberIssuesClosed = document.getElementById('ember-issues-closed');
const vueForks = document.getElementById('vue-forks');
const vueCommits = document.getElementById('vue-commits');
const vueIssuesClosed = document.getElementById('vue-issues-closed');

//RENDER FUNCTION
function render(prevState, state) {
  if (prevState !== state) {
    reactForks.innerHTML = store.state.react.forks;
    reactCommits.innerHTML = store.state.react.commits;
    reactIssuesClosed.innerHTML = store.state.react.issuesClosed;
    angularForks.innerHTML = store.state.angular.forks;
    angularCommits.innerHTML = store.state.angular.commits;
    angularIssuesClosed.innerHTML = store.state.angular.issuesClosed;
    emberForks.innerHTML = store.state.ember.forks;
    emberCommits.innerHTML = store.state.ember.commits;
    emberIssuesClosed.innerHTML = store.state.ember.issuesClosed;
    vueForks.innerHTML = store.state.vue.forks;
    vueCommits.innerHTML = store.state.vue.commits;
    vueIssuesClosed.innerHTML = store.state.vue.issuesClosed;
  }
}

//render initial state and subscribe to store for changes;
render(store.prevState, store.state);
store.subscribe(render);

//EVENT LISTENERS

// document.getElementById('increment').addEventListener('click', function () {
//   store.dispatch({ type: 'INCREMENT' });
// });

// document.getElementById('decrement').addEventListener('click', function () {
//   store.dispatch({ type: 'DECREMENT' });
// });

// document
//   .getElementById('incrementIfOdd')
//   .addEventListener('click', function () {
//     if (store.getState() % 2 !== 0) {
//       store.dispatch({ type: 'INCREMENT' });
//     }
//   });

// document
//   .getElementById('incrementAsync')
//   .addEventListener('click', function () {
//     setTimeout(function () {
//       store.dispatch({ type: 'INCREMENT' });
//     }, 1000);
//   });

//STORE STATE TESTING
console.log(store.getState());

getReactForksThunk();
getReactCommitsThunk();
getReactIssuesClosedThunk();

getAngularForksThunk();
getAngularCommitsThunk();
getAngularIssuesClosedThunk();

getEmberForksThunk();
getEmberCommitsThunk();
getEmberIssuesClosedThunk();

getVueForksThunk();
getVueCommitsThunk();
getVueIssuesClosedThunk();

setTimeout(() => console.log(store.state), 1000);
