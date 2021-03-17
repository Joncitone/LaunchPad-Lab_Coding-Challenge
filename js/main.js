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

//RENDER FUNCTION
function render(prevState, state) {
  if (prevState !== state) {
    // update state
    document.getElementById('react-forks').innerHTML = store.state.react.forks;
    document.getElementById('react-stars').innerHTML = store.state.react.stars;
    document.getElementById('react-issues').innerHTML =
      store.state.react.issues;
    document.getElementById('angular-forks').innerHTML =
      store.state.angular.forks;
    document.getElementById('angular-stars').innerHTML =
      store.state.angular.stars;
    document.getElementById('angular-issues').innerHTML =
      store.state.angular.issues;
    document.getElementById('ember-forks').innerHTML = store.state.ember.forks;
    document.getElementById('ember-stars').innerHTML = store.state.ember.stars;
    document.getElementById('ember-issues').innerHTML =
      store.state.ember.issues;
    document.getElementById('vue-forks').innerHTML = store.state.vue.forks;
    document.getElementById('vue-stars').innerHTML = store.state.vue.stars;
    document.getElementById('vue-issues').innerHTML = store.state.vue.issues;
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

// Switching Sort By Condition
function sortByCondition(toggle, condition) {
  frameworks.sort((a, b) => {
    return toggle ? b[condition] - a[condition] : a[condition] - b[condition];
  });
}

//Toggles & Toggle-Switching (for ASC/DESC sort switching)
const toggles = {
  category: {
    score: false,
    forks: false,
    stars: false,
    issues: false,
  },
  switch(target) {
    const prevVal = this.category[target];

    this.category = {
      score: false,
      forks: false,
      stars: false,
      issues: false,
    };

    this.category[target] = !prevVal;
  },
};

//Headers (used below)
const scoreHeader = document.getElementById('score-header');
const forksHeader = document.getElementById('forks-header');
const starsHeader = document.getElementById('stars-header');
const issuesHeader = document.getElementById('issues-header');

//Removes selected class from all headers
export function removeClassFromHeaders() {
  scoreHeader.removeAttribute('class');
  forksHeader.removeAttribute('class');
  starsHeader.removeAttribute('class');
  issuesHeader.removeAttribute('class');
}

//Category Header innerHTML Setter
export function resetHeaderInnerHTML() {
  scoreHeader.innerHTML = `<th id="score-header">Score</th>`;
  forksHeader.innerHTML = `<th id="forks-header">Forks</th>`;
  starsHeader.innerHTML = `<th id="stars-header">Stars</th>`;
  issuesHeader.innerHTML = `<th id="issues-header">Issues (open)</th>`;
}

//EVENT LISTENERS FOR SORTING w/ visual indicators
scoreHeader.addEventListener('click', function () {
  toggles.switch('score');
  sortByCondition(toggles.category['score'], 'score');
  reRenderTableRows();
  removeClassFromHeaders();
  resetHeaderInnerHTML();

  if (toggles.category['score']) {
    scoreHeader.innerHTML = `<th id="score-header">Score &#9660;</th>`;
  } else {
    scoreHeader.innerHTML = `<th id="score-header">Score &#9650;</th>`;
  }

  scoreHeader.setAttribute('class', 'selected');
});

forksHeader.addEventListener('click', function () {
  toggles.switch('forks');
  sortByCondition(toggles.category['forks'], 'forks');
  reRenderTableRows();
  removeClassFromHeaders();
  resetHeaderInnerHTML();

  if (toggles.category['forks']) {
    forksHeader.innerHTML = `<th id="score-header">Forks &#9660;</th>`;
  } else {
    forksHeader.innerHTML = `<th id="score-header">Forks &#9650;</th>`;
  }

  forksHeader.setAttribute('class', 'selected');
});

starsHeader.addEventListener('click', function () {
  toggles.switch('stars');

  sortByCondition(toggles.category['stars'], 'stars');
  reRenderTableRows();
  removeClassFromHeaders();
  resetHeaderInnerHTML();

  if (toggles.category['stars']) {
    starsHeader.innerHTML = `<th id="score-header">Stars  &#9660;</th>`;
  } else {
    starsHeader.innerHTML = `<th id="score-header">Stars  &#9650;</th>`;
  }

  starsHeader.setAttribute('class', 'selected');
});

issuesHeader.addEventListener('click', function () {
  toggles.switch('issues');

  sortByCondition(toggles.category['issues'], 'issues');
  reRenderTableRows();
  removeClassFromHeaders();
  resetHeaderInnerHTML();

  if (toggles.category['issues']) {
    issuesHeader.innerHTML = `<th id="score-header">Issues (open) &#9660;</th>`;
  } else {
    issuesHeader.innerHTML = `<th id="score-header">Issues (open) &#9650;</th>`;
  }

  issuesHeader.setAttribute('class', 'selected');
});

//INITIAL API CALLS function (via thunks) and invocation, re-used later
export function callGithubAPIs() {
  getReactForksStarsIssuesThunk();
  getAngularForksStarsIssuesThunk();
  getEmberForksStarsIssuesThunk();
  getVueForksStarsIssuesThunk();

  showUpdatedState();
}
callGithubAPIs();

//see state change after initial API call, used above and re-used later
export function showUpdatedState() {
  setTimeout(() => {
    console.log('prevState', store.prevState);
    console.log('state', store.state);
  }, 2000);
}

//Calculate Score by default upon initial render
export function calculateCompositeScores() {
  setTimeout(() => {
    getReactScoreThunk();
    getAngularScoreThunk();
    getEmberScoreThunk();
    getVueScoreThunk();

    document.getElementById('react-score').innerHTML = store.state.react.score;
    document.getElementById('angular-score').innerHTML =
      store.state.angular.score;
    document.getElementById('ember-score').innerHTML = store.state.ember.score;
    document.getElementById('vue-score').innerHTML = store.state.vue.score;
  }, 2000);
}
calculateCompositeScores();

//Initial sort DESC by Score
setTimeout(() => sortByCondition(true, 'score'), 3000);
//ORDER TABLE by Scores calculated above
setTimeout(() => {
  reRenderTableRows();
}, 4000);

export function reRenderTableRows() {
  for (let i = 0; i < frameworks.length; i++) {
    document.getElementById(`row-${i}`).innerHTML = `
    <td>
      ${frameworks[i].name[0].toUpperCase() + frameworks[i].name.slice(1)}
    </td>
    <td id="${frameworks[i].name}-score">${frameworks[i].score}</td>
    <td id="${frameworks[i].name}-forks">${frameworks[i].forks}</td>
    <td id="${frameworks[i].name}-stars">${frameworks[i].stars}</td>
    <td id="${frameworks[i].name}-issues-">${frameworks[i].issues}</td>
  `;
  }
}

/* REPEAT API Calls
 * Calls every 5 min. Could increase to 4 min. intervals 4calls/4min = 60call/60min.
 */
setInterval(() => {
  callGithubAPIs();
  showUpdatedState();
}, 300000);
