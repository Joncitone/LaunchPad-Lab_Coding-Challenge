const fetch = require('node-fetch');

class FrameworkAPI {
  constructor(owner, repo, forks = 0, commits = 0, closedIssues = 0) {
    this.owner = owner;
    this.repo = repo;
    this.forks = forks;
    this.commits = commits;
    this.closedIssues = closedIssues;
  }
  fetchForks() {
    fetch(
      `https://api.github.com/search/repositories?q=user%3A${this.owner}+repo%3A${this.repo}+${this.repo}`
    )
      .then((response) => response.json())
      .then((data) => {
        this.forks = data.items[0].forks;
      });
  }
  fetchCommits() {
    fetch(
      `http://api.github.com/repos/${this.owner}/${this.repo}/stats/participation`
    )
      .then((response) => response.json())
      .then((data) => {
        this.commits = data.all.reduce((acc, curr) => acc + curr, 0);
      });
  }
  fetchClosedIssues() {
    fetch(
      `http://api.github.com/search/issues?q=repo:${this.owner}/${this.repo}+type:issue+state:closed`
    )
      .then((response) => response.json())
      .then((data) => {
        this.closedIssues = data.total_count;
      });
  }
}

//FrameworkAPI Instances

const reactData = new FrameworkAPI('facebook', 'react');
const angularData = new FrameworkAPI('angular', 'angular.js');
const emberData = new FrameworkAPI('emberjs', 'ember.js');
const vueData = new FrameworkAPI('vuejs', 'vue');

//FORKS (total count)
reactData.fetchForks();
angularData.fetchForks();
emberData.fetchForks();
vueData.fetchForks();
setTimeout(() => console.log('FORKS'), 1000);
setTimeout(() => console.log('react', reactData.forks), 1000);
setTimeout(() => console.log('angular', angularData.forks), 1000);
setTimeout(() => console.log('ember', emberData.forks), 1000);
setTimeout(() => console.log('vue', vueData.forks), 1000);

//COMMITS (past year)
reactData.fetchCommits();
angularData.fetchCommits();
emberData.fetchCommits();
vueData.fetchCommits();
setTimeout(() => console.log('COMMITS (past year)'), 1000);
setTimeout(() => console.log('react', reactData.commits), 1000);
setTimeout(() => console.log('angular', angularData.commits), 1000);
setTimeout(() => console.log('ember', emberData.commits), 1000);
setTimeout(() => console.log('vue', vueData.commits), 1000);

//ISSUES (closed total)
reactData.fetchClosedIssues();
angularData.fetchClosedIssues();
emberData.fetchClosedIssues();
vueData.fetchClosedIssues();
setTimeout(() => console.log('ISSUES (closed)'), 1000);
setTimeout(() => console.log('react', reactData.closedIssues), 1000);
setTimeout(() => console.log('angular', angularData.closedIssues), 1000);
setTimeout(() => console.log('ember', emberData.closedIssues), 1000);
setTimeout(() => console.log('vue', vueData.closedIssues), 1000);

module.exports = {
  reactData,
  angularData,
  emberData,
  vueData,
};
