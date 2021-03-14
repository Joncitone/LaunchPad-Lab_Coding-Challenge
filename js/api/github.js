//const fetch = require('node-fetch');

export default class FrameworkAPI {
  constructor(owner, repo) {
    this.owner = owner;
    this.repo = repo;
  }
  fetchForksStarsIssues() {
    return fetch(
      `https://api.github.com/search/repositories?q=user%3A${this.owner}+repo%3A${this.repo}+${this.repo}`
    );
  }
}
