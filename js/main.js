import {
  getReactScoreThunk,
  getReactForksThunk,
  getReactCommitsThunk,
  getReactIssuesClosedThunk,
  getAngularScoreThunk,
  getAngularForksThunk,
  getAngularCommitsThunk,
  getAngularIssuesClosedThunk,
  getEmberScoreThunk,
  getEmberForksThunk,
  getEmberCommitsThunk,
  getEmberIssuesClosedThunk,
  getVueScoreThunk,
  getVueForksThunk,
  getVueCommitsThunk,
  getVueIssuesClosedThunk,
} from './store/index.js';

import store from './store/index.js';
store.setInitialState();

//ELEMENTS TO RENDER
const tableContainer = document.getElementById('table-container');
const reactScore = document.getElementById('react-score');
const angularScore = document.getElementById('angular-score');
const emberScore = document.getElementById('ember-score');
const vueScore = document.getElementById('vue-score');
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
document.getElementById('score-header').addEventListener('click', function () {
  alert('you clicked the SCORE header, sort functionality coming soon :)');
});

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

//INITIAL API CALLS function (via thunks) and invocation, re-used later

function callGithubAPIs() {
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
}
callGithubAPIs();

//see state change after initial API call, used above and re-used later
function showUpdatedState() {
  setTimeout(() => {
    console.log('prevState', store.prevState);
    console.log('state', store.state);
  }, 2000);
}

//Calculate Composite Score by default upon initial render
function calculateCompositeScores() {
  setTimeout(() => {
    getReactScoreThunk();
    getAngularScoreThunk();
    getEmberScoreThunk();
    getVueScoreThunk();

    reactScore.innerHTML = store.state.react.score;
    angularScore.innerHTML = store.state.angular.score;
    emberScore.innerHTML = store.state.ember.score;
    vueScore.innerHTML = store.state.vue.score;
  }, 2000);
}
calculateCompositeScores();

//Establish Framework Names and sort by condition
let frameworks = [];

function clearAndPopulateFrameworks(prevState, state) {
  if (prevState !== state) {
    frameworks = [];
    frameworks.push(store.state.react);
    frameworks.push(store.state.angular);
    frameworks.push(store.state.ember);
    frameworks.push(store.state.vue);
  }
}
store.subscribe(clearAndPopulateFrameworks);

setTimeout(() => console.log('frameworks before', frameworks), 1000);

//Switching Sort By Condition
function sortByCondition(toggle, condition) {
  frameworks.sort((a, b) => {
    return toggle ? b[condition] - a[condition] : a[condition] - b[condition];
  });
}

//Initial Sort DESC by Score
setTimeout(() => {
  sortByCondition(true, 'score');
  console.log('frameworks after', frameworks);
}, 3000);

//ORDER TABLE by Composite Scores calculated above
setTimeout(() => {
  tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Framework</th>
          <th id="score-header" class="selected">Composite Score</th>
          <th id="forks-header">Forks (total)</th>
          <th id="commits-header">Commits (52-week total)</th>
          <th id="issues-header">Issues Closed (total)</th>
        </tr>
      </thead>
      <tbody>
        <tr id="row-one">
          <td>${frameworks[0].name}</td>
          <td id="${frameworks[0].name}-score">${frameworks[0].score}</td>
          <td id="${frameworks[0].name}-forks">${frameworks[0].forks}</td>
          <td id="${frameworks[0].name}-commits">${frameworks[0].commits}</td>
          <td id="${frameworks[0].name}-issues-closed">${frameworks[0].issuesClosed}</td>
        </tr>
        <tr id="row-two">
          <td>${frameworks[1].name}</td>
          <td id="${frameworks[1].name}-score">${frameworks[1].score}</td>
          <td id="${frameworks[1].name}-forks">${frameworks[1].forks}</td>
          <td id="${frameworks[1].name}-commits">${frameworks[1].commits}</td>
          <td id="${frameworks[1].name}-issues-closed">${frameworks[1].issuesClosed}</td>
        </tr>
        <tr id="row-three">
          <td>${frameworks[2].name}</td>
          <td id="${frameworks[2].name}-score">${frameworks[2].score}</td>
          <td id="${frameworks[2].name}-forks">${frameworks[2].forks}</td>
          <td id="${frameworks[2].name}-commits">${frameworks[2].commits}</td>
          <td id="${frameworks[2].name}-issues-closed">${frameworks[2].issuesClosed}</td>
        </tr>
        <tr id="row-four">
          <td>${frameworks[3].name}</td>
          <td id="${frameworks[3].name}-score">${frameworks[3].score}</td>
          <td id="${frameworks[3].name}-forks">${frameworks[3].forks}</td>
          <td id="${frameworks[3].name}-commits">${frameworks[3].commits}</td>
          <td id="${frameworks[3].name}-issues-closed">${frameworks[3].issuesClosed}</td>
        </tr>
      </tbody>
    </table>
  `;
}, 4000);

function reRenderOnColumnClick(column) {
  setTimeout(() => {
    tableContainer.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Framework</th>
          <th id="score-header" class="selected">Composite Score</th>
          <th id="forks-header">Forks (total)</th>
          <th id="commits-header">Commits (52-week total)</th>
          <th id="issues-header">Issues Closed (total)</th>
        </tr>
      </thead>
      <tbody>
        <tr id="row-one">
          <td>${frameworks[0].name}</td>
          <td id="${frameworks[0].name}-score">${frameworks[0].score}</td>
          <td id="${frameworks[0].name}-forks">${frameworks[0].forks}</td>
          <td id="${frameworks[0].name}-commits">${frameworks[0].commits}</td>
          <td id="${frameworks[0].name}-issues-closed">${frameworks[0].issuesClosed}</td>
        </tr>
        <tr id="row-two">
          <td>${frameworks[1].name}</td>
          <td id="${frameworks[1].name}-score">${frameworks[1].score}</td>
          <td id="${frameworks[1].name}-forks">${frameworks[1].forks}</td>
          <td id="${frameworks[1].name}-commits">${frameworks[1].commits}</td>
          <td id="${frameworks[1].name}-issues-closed">${frameworks[1].issuesClosed}</td>
        </tr>
        <tr id="row-three">
          <td>${frameworks[2].name}</td>
          <td id="${frameworks[2].name}-score">${frameworks[2].score}</td>
          <td id="${frameworks[2].name}-forks">${frameworks[2].forks}</td>
          <td id="${frameworks[2].name}-commits">${frameworks[2].commits}</td>
          <td id="${frameworks[2].name}-issues-closed">${frameworks[2].issuesClosed}</td>
        </tr>
        <tr id="row-four">
          <td>${frameworks[3].name}</td>
          <td id="${frameworks[3].name}-score">${frameworks[3].score}</td>
          <td id="${frameworks[3].name}-forks">${frameworks[3].forks}</td>
          <td id="${frameworks[3].name}-commits">${frameworks[3].commits}</td>
          <td id="${frameworks[3].name}-issues-closed">${frameworks[3].issuesClosed}</td>
        </tr>
      </tbody>
    </table>
  `;
  }, 4000);
}

/* REPEAT API Calls
 * Calls every 5 min (300000ms), due to 4x3 = 12 calls, and 60 calls/hour limit, 60/12 = 5 min. intervals
 */
setInterval(() => {
  callGithubAPIs();
  showUpdatedState();
}, 300000);
