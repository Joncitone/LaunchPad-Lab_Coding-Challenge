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

//EVENT LISTENERS (click to sort ASC/DESC functionality)
//
//WORK IN PROGRESS - finish this section!
//
document.getElementById('forks-header').addEventListener('click', function () {
  alert('you clicked the FORKS header, sort functionality coming soon :)');
});

document
  .getElementById('commits-header')
  .addEventListener('click', function () {
    alert('you clicked the COMMITS header, sort functionality coming soon :)');
  });

document.getElementById('issues-header').addEventListener('click', function () {
  alert('you clicked the ISSUES header, sort functionality coming soon :)');
});

//STORE STATE TESTING
console.log(store.getState());

//INITIAL API CALLS via Thunks
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

//see state change after initial API call
setTimeout(() => console.log(store.state), 2000);

/* REPEAT API Calls
 * Calls every 5 min (300000ms), due to 4x3 = 12 calls, and 60 calls/hour limit, 60/12 = 5 min. intervals
 */

setInterval(() => {
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

  showUpdatedState();
}, 300000);

function showUpdatedState() {
  setTimeout(() => console.log(store.state), 2000);
}
