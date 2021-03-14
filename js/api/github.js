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
