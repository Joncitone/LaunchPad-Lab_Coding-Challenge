# LaunchPad Lab Coding Challenge

## Deployed Version

https://joncitone.github.io/launchpad-lab_coding-challenge

## Setup

1. ### Fork or Clone the Repo

2. ### Open the project in your IDE
3. ### Launching in the Browser
   - If you have an extension like [Live Server](https://github.com/ritwickdey/vscode-live-server), click Go Live to view the page.

## Technologies Used

- Vanilla JS (ES6)

- node-fetch (npm package)
  - used to add fetch functionality to Node.js for initial API testing

## Features

- LaunchPad Lab styling
  - Proxima-Nova font
  - Blue linear gradient
  - Rocketship logo
- Sorting with visual indicators for ASC/DESC
  - Classic DOM manipulation
- Vanilla JS implementation of Redux
  - Redux-Store modularized by framework
- Continuous API calls (every 5 minutes)

## Metrics & Rationale

Rationale of metrics chosen as indicators of activity, community support, and stability.

- Score: I calculated a score for each framework by combining forks, stars, and open issues.
  The formula is consistent across frameworks, and can be found as a thunk in the reducer files.

- Forks: Forks are a decent indication of code stability, while not all forks are projects that depend on the stability of the repository, a good portion of them are and they will ocassionally update their fork by setting the original as an upstream.

- Stars: Stars are mostly a sign of community support in the form of a social media popularity indicator. Stars are very similar to likes on social media sites, and along with Following are one of the biggest social aspects of Github.

- Issues (open): Issues were a bit tricky, and over the several iterations of this project I switched from closed issues, to total issues, and finally landed on open issues. My decision was based on open issues being a decent sign of activity, while the other forms of issues were more a sign of repository age.

### Other Considerations

- Commits: Like issues, I experimented with commits. First with an array indicating weekly commits over the past year, then with the total number of commits. Ultimately, I decided this was not a good indicator due to Ember being an outlier with an inordinate amount of commits.

- NPM Package Downloads: I considered adding these metrics to the overall score as they might also be a good indication of development activity. React was very popular here, perhaps due to CRA, Next.js, and Gatsby. In the end I decided against it since it would put React so far ahead.

- Angular.js: The metrics for Angular.js are likely skewed due to it having two major repos: Angular and Angular.js. This split in versions as part of its history is unique to Angular amongst the other frameworks. Due to this, I think a more accurate position based on overall score would be in 2nd-Place. Another consideration would be to use metrics from Angular as opposed to Angular.js since Angular is newer, and would likely be adopted for use in future development over Angular.js.
