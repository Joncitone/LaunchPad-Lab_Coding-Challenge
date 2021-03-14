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
const scoreHeader = document.getElementById('score-header');
const forksHeader = document.getElementById('forks-header');
const commitsHeader = document.getElementById('commits-header');
const issuesHeader = document.getElementById('issues-header');
const rowOne = document.getElementById('row-one');
const rowTwo = document.getElementById('row-two');
const rowThree = document.getElementById('row-three');
const rowFour = document.getElementById('row-four');
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
//Switching Sort By Condition

function sortByCondition(toggle, condition) {
  frameworks.sort((a, b) => {
    return toggle ? b[condition] - a[condition] : a[condition] - b[condition];
  });
}

//Initial sort DESC by Score
setTimeout(() => sortByCondition(true, 'score'), 3000);

//TOGGLES FOR SORTING
let scoreToggle = false;
let forksToggle = false;
let commitsToggle = false;
let issuesToggle = false;

//EVENT LISTENERS FOR SORTING w/ visual indicators
document.getElementById('score-header').addEventListener('click', function () {
  scoreToggle = !scoreToggle;
  forksToggle = false;
  commitsToggle = false;
  issuesToggle = false;

  sortByCondition(scoreToggle, 'score');
  reRenderTable();

  scoreHeader.setAttribute('class', 'selected');
  forksHeader.removeAttribute('class');
  commitsHeader.removeAttribute('class');
  issuesHeader.removeAttribute('class');

  forksHeader.innerHTML = `<th id="forks-header">Forks (total)</th>`;
  commitsHeader.innerHTML = `<th id="commits-header">Commits (52-week total)</th>`;
  issuesHeader.innerHTML = `<th id="issues-header">Issues Closed (total)</th>`;

  if (scoreToggle) {
    scoreHeader.innerHTML = `
      <th id="score-header">Composite Score &#9660;</th>
    `;
  } else {
    scoreHeader.innerHTML = `
      <th id="score-header">Composite Score &#9650;</th>
    `;
  }
});

document.getElementById('forks-header').addEventListener('click', function () {
  scoreToggle = false;
  forksToggle = !forksToggle;
  commitsToggle = false;
  issuesToggle = false;

  sortByCondition(forksToggle, 'forks');
  reRenderTable();

  scoreHeader.removeAttribute('class');
  forksHeader.setAttribute('class', 'selected');
  commitsHeader.removeAttribute('class');
  issuesHeader.removeAttribute('class');

  scoreHeader.innerHTML = `<th id="score-header">Composite Score</th>`;
  commitsHeader.innerHTML = `<th id="commits-header">Commits (52-week total)</th>`;
  issuesHeader.innerHTML = `<th id="issues-header">Issues Closed (total)</th>`;

  if (forksToggle) {
    forksHeader.innerHTML = `
      <th id="score-header">Forks (total) &#9660;</th>
    `;
  } else {
    forksHeader.innerHTML = `
      <th id="score-header">Forks (total) &#9650;</th>
    `;
  }
});

commitsHeader.addEventListener('click', function () {
  scoreToggle = false;
  forksToggle = false;
  commitsToggle = !commitsToggle;
  issuesToggle = false;

  sortByCondition(commitsToggle, 'commits');
  reRenderTable();

  scoreHeader.removeAttribute('class');
  forksHeader.removeAttribute('class');
  commitsHeader.setAttribute('class', 'selected');
  issuesHeader.removeAttribute('class');

  scoreHeader.innerHTML = `<th id="score-header">Composite Score</th>`;
  forksHeader.innerHTML = `<th id="forks-header">Forks (total)</th>`;
  issuesHeader.innerHTML = `<th id="issues-header">Issues Closed (total)</th>`;

  if (commitsToggle) {
    commitsHeader.innerHTML = `
      <th id="score-header">Commits (52-week total) &#9660;</th>
    `;
  } else {
    commitsHeader.innerHTML = `
      <th id="score-header">Commits (52-week total) &#9650;</th>
    `;
  }
});

issuesHeader.addEventListener('click', function () {
  scoreToggle = false;
  forksToggle = false;
  commitsToggle = false;
  issuesToggle = !issuesToggle;

  sortByCondition(issuesToggle, 'issuesClosed');
  reRenderTable();

  scoreHeader.removeAttribute('class');
  forksHeader.removeAttribute('class');
  commitsHeader.removeAttribute('class');
  issuesHeader.setAttribute('class', 'selected');

  scoreHeader.innerHTML = `<th id="score-header">Composite Score</th>`;
  forksHeader.innerHTML = `<th id="forks-header">Forks (total)</th>`;
  commitsHeader.innerHTML = `<th id="commits-header">Commits (52-week total)</th>`;

  if (issuesToggle) {
    issuesHeader.innerHTML = `
      <th id="score-header">Issues Closed (total) &#9660;</th>
    `;
  } else {
    issuesHeader.innerHTML = `
      <th id="score-header">Issues Closed (total) &#9650;</th>
    `;
  }
});

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

//ORDER TABLE by Composite Scores calculated above
setTimeout(() => {
  reRenderTable();
}, 4000);

function reRenderTable() {
  rowOne.innerHTML = `
    <td>
      ${frameworks[0].name[0].toUpperCase() + frameworks[0].name.slice(1)}
    </td>
    <td id="${frameworks[0].name}-score">${frameworks[0].score}</td>
    <td id="${frameworks[0].name}-forks">${frameworks[0].forks}</td>
    <td id="${frameworks[0].name}-commits">${frameworks[0].commits}</td>
    <td id="${frameworks[0].name}-issues-closed">
      ${frameworks[0].issuesClosed}
    </td>
  `;

  rowTwo.innerHTML = `
    <td>
      ${frameworks[1].name[0].toUpperCase() + frameworks[1].name.slice(1)}
    </td>
    <td id="${frameworks[1].name}-score">${frameworks[1].score}</td>
    <td id="${frameworks[1].name}-forks">${frameworks[1].forks}</td>
    <td id="${frameworks[1].name}-commits">${frameworks[1].commits}</td>
    <td id="${frameworks[1].name}-issues-closed">
      ${frameworks[1].issuesClosed}
    </td>
  `;

  rowThree.innerHTML = `
    <td>
      ${frameworks[2].name[0].toUpperCase() + frameworks[2].name.slice(1)}
    </td>
    <td id="${frameworks[2].name}-score">${frameworks[2].score}</td>
    <td id="${frameworks[2].name}-forks">${frameworks[2].forks}</td>
    <td id="${frameworks[2].name}-commits">${frameworks[2].commits}</td>
    <td id="${frameworks[2].name}-issues-closed">
      ${frameworks[2].issuesClosed}
    </td>
  `;

  rowFour.innerHTML = `
    <td>
      ${frameworks[3].name[0].toUpperCase() + frameworks[3].name.slice(1)}
    </td>
    <td id="${frameworks[3].name}-score">${frameworks[3].score}</td>
    <td id="${frameworks[3].name}-forks">${frameworks[3].forks}</td>
    <td id="${frameworks[3].name}-commits">${frameworks[3].commits}</td>
    <td id="${frameworks[3].name}-issues-closed">
      ${frameworks[3].issuesClosed}
    </td>
  `;
}

/* REPEAT API Calls
 * Calls every 5 min (300000ms), due to 4x3 = 12 calls, and 60 calls/hour limit, 60/12 = 5 min. intervals
 */
setInterval(() => {
  callGithubAPIs();
  showUpdatedState();
}, 300000);
