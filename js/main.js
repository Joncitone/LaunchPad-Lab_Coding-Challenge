import {
  getReactScoreThunk,
  getReactForksStarsIssuesThunk,
  getAngularScoreThunk,
  getAngularForksStarsIssuesThunk,
  getEmberScoreThunk,
  getEmberForksStarsIssuesThunk,
  getVueScoreThunk,
  getVueForksStarsIssuesThunk,
} from './store/index.js';

import store from './store/index.js';
store.setInitialState();

//ELEMENTS TO RENDER
const scoreHeader = document.getElementById('score-header');
const forksHeader = document.getElementById('forks-header');
const starsHeader = document.getElementById('stars-header');
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
const reactStars = document.getElementById('react-stars');
const reactIssues = document.getElementById('react-issues');
const angularForks = document.getElementById('angular-forks');
const angularStars = document.getElementById('angular-stars');
const angularIssues = document.getElementById('angular-issues');
const emberForks = document.getElementById('ember-forks');
const emberStars = document.getElementById('ember-stars');
const emberIssues = document.getElementById('ember-issues');
const vueForks = document.getElementById('vue-forks');
const vueStars = document.getElementById('vue-stars');
const vueIssues = document.getElementById('vue-issues');

//RENDER FUNCTION
function render(prevState, state) {
  if (prevState !== state) {
    reactForks.innerHTML = store.state.react.forks;
    reactStars.innerHTML = store.state.react.stars;
    reactIssues.innerHTML = store.state.react.issues;
    angularForks.innerHTML = store.state.angular.forks;
    angularStars.innerHTML = store.state.angular.stars;
    angularIssues.innerHTML = store.state.angular.issues;
    emberForks.innerHTML = store.state.ember.forks;
    emberStars.innerHTML = store.state.ember.stars;
    emberIssues.innerHTML = store.state.ember.issues;
    vueForks.innerHTML = store.state.vue.forks;
    vueStars.innerHTML = store.state.vue.stars;
    vueIssues.innerHTML = store.state.vue.issues;
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

//TOGGLES FOR SORTING
let scoreToggle = false;
let forksToggle = false;
let starsToggle = false;
let issuesToggle = false;

//EVENT LISTENERS FOR SORTING w/ visual indicators
scoreHeader.addEventListener('click', function () {
  scoreToggle = !scoreToggle;
  forksToggle = false;
  starsToggle = false;
  issuesToggle = false;

  sortByCondition(scoreToggle, 'score');
  reRenderTable();

  scoreHeader.setAttribute('class', 'selected');
  forksHeader.removeAttribute('class');
  starsHeader.removeAttribute('class');
  issuesHeader.removeAttribute('class');

  forksHeader.innerHTML = `<th id="forks-header">Forks</th>`;
  starsHeader.innerHTML = `<th id="stars-header">Stars</th>`;
  issuesHeader.innerHTML = `<th id="issues-header">Issues (open)</th>`;

  if (scoreToggle) {
    scoreHeader.innerHTML = `
      <th id="score-header">Score &#9660;</th>
    `;
  } else {
    scoreHeader.innerHTML = `
      <th id="score-header">Score &#9650;</th>
    `;
  }
});

forksHeader.addEventListener('click', function () {
  scoreToggle = false;
  forksToggle = !forksToggle;
  starsToggle = false;
  issuesToggle = false;

  sortByCondition(forksToggle, 'forks');
  reRenderTable();

  scoreHeader.removeAttribute('class');
  forksHeader.setAttribute('class', 'selected');
  starsHeader.removeAttribute('class');
  issuesHeader.removeAttribute('class');

  scoreHeader.innerHTML = `<th id="score-header">Score</th>`;
  starsHeader.innerHTML = `<th id="stars-header">Stars</th>`;
  issuesHeader.innerHTML = `<th id="issues-header">Issues (open)</th>`;

  if (forksToggle) {
    forksHeader.innerHTML = `
      <th id="score-header">Forks &#9660;</th>
    `;
  } else {
    forksHeader.innerHTML = `
      <th id="score-header">Forks &#9650;</th>
    `;
  }
});

starsHeader.addEventListener('click', function () {
  scoreToggle = false;
  forksToggle = false;
  starsToggle = !starsToggle;
  issuesToggle = false;

  sortByCondition(starsToggle, 'stars');
  reRenderTable();

  scoreHeader.removeAttribute('class');
  forksHeader.removeAttribute('class');
  starsHeader.setAttribute('class', 'selected');
  issuesHeader.removeAttribute('class');

  scoreHeader.innerHTML = `<th id="score-header">Score</th>`;
  forksHeader.innerHTML = `<th id="forks-header">Forks</th>`;
  issuesHeader.innerHTML = `<th id="issues-header">Issues (open)</th>`;

  if (starsToggle) {
    starsHeader.innerHTML = `
      <th id="score-header">Stars  &#9660;</th>
    `;
  } else {
    starsHeader.innerHTML = `
      <th id="score-header">Stars  &#9650;</th>
    `;
  }
});

issuesHeader.addEventListener('click', function () {
  scoreToggle = false;
  forksToggle = false;
  starsToggle = false;
  issuesToggle = !issuesToggle;

  sortByCondition(issuesToggle, 'issues');
  reRenderTable();

  scoreHeader.removeAttribute('class');
  forksHeader.removeAttribute('class');
  starsHeader.removeAttribute('class');
  issuesHeader.setAttribute('class', 'selected');

  scoreHeader.innerHTML = `<th id="score-header">Score</th>`;
  forksHeader.innerHTML = `<th id="forks-header">Forks</th>`;
  starsHeader.innerHTML = `<th id="stars-header">Stars</th>`;

  if (issuesToggle) {
    issuesHeader.innerHTML = `
      <th id="score-header">Issues (open) &#9660;</th>
    `;
  } else {
    issuesHeader.innerHTML = `
      <th id="score-header">Issues (open) &#9650;</th>
    `;
  }
});

//INITIAL API CALLS function (via thunks) and invocation, re-used later
function callGithubAPIs() {
  getReactForksStarsIssuesThunk();
  getAngularForksStarsIssuesThunk();
  getEmberForksStarsIssuesThunk();
  getVueForksStarsIssuesThunk();

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

//Calculate Score by default upon initial render
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

//Initial sort DESC by Score
setTimeout(() => sortByCondition(true, 'score'), 3000);
//ORDER TABLE by Scores calculated above
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
    <td id="${frameworks[0].name}-stars">${frameworks[0].stars}</td>
    <td id="${frameworks[0].name}-issues-">${frameworks[0].issues}</td>
  `;

  rowTwo.innerHTML = `
    <td>
      ${frameworks[1].name[0].toUpperCase() + frameworks[1].name.slice(1)}
    </td>
    <td id="${frameworks[1].name}-score">${frameworks[1].score}</td>
    <td id="${frameworks[1].name}-forks">${frameworks[1].forks}</td>
    <td id="${frameworks[1].name}-stars">${frameworks[1].stars}</td>
    <td id="${frameworks[1].name}-issues-">${frameworks[1].issues}</td>
  `;

  rowThree.innerHTML = `
    <td>
      ${frameworks[2].name[0].toUpperCase() + frameworks[2].name.slice(1)}
    </td>
    <td id="${frameworks[2].name}-score">${frameworks[2].score}</td>
    <td id="${frameworks[2].name}-forks">${frameworks[2].forks}</td>
    <td id="${frameworks[2].name}-stars">${frameworks[2].stars}</td>
    <td id="${frameworks[2].name}-issues-">${frameworks[2].issues}</td>
  `;

  rowFour.innerHTML = `
    <td>
      ${frameworks[3].name[0].toUpperCase() + frameworks[3].name.slice(1)}
    </td>
    <td id="${frameworks[3].name}-score">${frameworks[3].score}</td>
    <td id="${frameworks[3].name}-forks">${frameworks[3].forks}</td>
    <td id="${frameworks[3].name}-stars">${frameworks[3].stars}</td>
    <td id="${frameworks[3].name}-issues-">${frameworks[3].issues}</td>
  `;
}

/* REPEAT API Calls
 * Calls every 5 min. Could increase to 4 min. intervals 4calls/4min = 60call/60min.
 */
setInterval(() => {
  callGithubAPIs();
  showUpdatedState();
}, 300000);
