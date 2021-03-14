//const fetch = require('node-fetch');

export default class FrameworkAPI {
  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }
  fetchForks() {
    return fetch(
      `https://api.github.com/search/repositories?q=user%3A${this.owner}+repo%3A${this.repo}+${this.repo}`
    );
  }
  fetchCommits() {
    return fetch(
      `https://api.github.com/repos/${this.owner}/${this.repo}/stats/participation`
    );
  }
  fetchIssuesClosed() {
    return fetch(
      `https://api.github.com/search/issues?q=repo:${this.owner}/${this.repo}+type:issue+state:closed`
    );
  }
}

//FrameworkAPI Instances
//moved to store files

// //FORKS (total count)
// reactAPI.fetchForks();
// angularAPI.fetchForks();
// emberAPI.fetchForks();
// vueAPI.fetchForks();
// setTimeout(() => console.log('FORKS'), 1000);
// setTimeout(() => console.log('react', reactAPI.forks), 1000);
// setTimeout(() => console.log('angular', angularAPI.forks), 1000);
// setTimeout(() => console.log('ember', emberAPI.forks), 1000);
// setTimeout(() => console.log('vue', vueAPI.forks), 1000);

// //COMMITS (past year)
// reactAPI.fetchCommits();
// angularAPI.fetchCommits();
// emberAPI.fetchCommits();
// vueAPI.fetchCommits();
// setTimeout(() => console.log('COMMITS (past year)'), 1000);
// setTimeout(() => console.log('react', reactAPI.commits), 1000);
// setTimeout(() => console.log('angular', angularAPI.commits), 1000);
// setTimeout(() => console.log('ember', emberAPI.commits), 1000);
// setTimeout(() => console.log('vue', vueAPI.commits), 1000);

// //ISSUES (closed total)
// reactAPI.fetchClosedIssues();
// angularAPI.fetchClosedIssues();
// emberAPI.fetchClosedIssues();
// vueAPI.fetchClosedIssues();
// setTimeout(() => console.log('ISSUES (closed)'), 1000);
// setTimeout(() => console.log('react', reactAPI.closedIssues), 1000);
// setTimeout(() => console.log('angular', angularAPI.closedIssues), 1000);
// setTimeout(() => console.log('ember', emberAPI.closedIssues), 1000);
// setTimeout(() => console.log('vue', vueAPI.closedIssues), 1000);
