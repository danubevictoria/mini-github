# Mini-Github

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and [Now UI Dashboard React](README_DASHBOARD.md).

## Table of Contents

- [Quick Start](#quick-start)
- [Write Up](#write-up)
- [Known Issues](#known-issues)
  - [Fix navigation](#fix-navigation)
  - [Fix search](#fix-search)
  - [Fix fetching data](#fix-fetching-data)
  - [Handle rate limit error](#handle-rate-limit-error)
  - [Performance](#performance)
  - [Re-design components](#re-design-components)
  - [Redux Store](#redux-store)
  - [Testing](#testing)
- [Conclusion](#conclusion)

## Quick Start

Clone this repo, install, and start the development server!

```git
git clone git@github.com:danubevictoria/mini-github.git
cd mini-github
npm install
npm start
```

If successful, it should automatically open up the localhost in browser for preview.

```
Compiled successfully!

You can now view now-ui-dashboard-react in the browser.

  Local:            http://localhost:3000/now-ui-dashboard-react
  On Your Network:  http://192.168.1.7:3000/now-ui-dashboard-react

Note that the development build is not optimized.
To create a production build, use npm run build.


```

## Demo

| Organizations                                                                                                                                | User Profile                                                                                                                  | Repositories                                                                                                      | Commits                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| [![Organizations Dashboard Page](/demo/organizations.png)](https://github.com/danubevictoria/mini-github/blob/master/demo/organizations.png) | [![User profile page](/demo/userprofile.png)](https://github.com/danubevictoria/mini-github/blob/master/demo/userprofile.png) | [![Repositories View](/demo/repos.png)](https://github.com/danubevictoria/mini-github/blob/master/demo/repos.png) | [![Commits View](/demo/commits.png)](https://github.com/danubevictoria/mini-github/blob/master/demo/commits.png) |

## Write Up

### Milestones

1. Development Pipeline and Base App Running
2. See list of public organizations from [Github API](https://developer.github.com/v3/)
3. Perform search on organizations
4. See repositories associated with an organization. Sort them by stars.
5. See commits and link to commits for a repository.
6. Demo.

#### Prioritization

In order:

- Design UI/UX for the product first as it is crucial to what I would build
- Development server up and running for developing and testing
- Assessing Github API to choose appropriate urls and data needed
- Assessing Open Source Dashboard for icons and components I could use
- Build or pare down components from open source dashboard
- Design and build routes
- Assess and address issues, prioritizing those that impacted core functionality first
- Cleanup and polish

#### Technical Decisions

I bootstrapped my app with an open source dashboard in React, which already has styled components and a modern layout. I bootstrapped it with create-react-app in order to get development server up and running.

Core Components:

- Search Bar
- Navigation
- Card

I pass necessary params across components through routing and parsing. Another approach would be to use a global store or passing props. Best practice would be to scrub the urls because of hacking and security concerns, but for our use case, the info passed isn't sensitive.

React router allows for tracking browser history, so the user can navigate backwards and forward.

Routing:

- /admin/dashboard
  - Github API: https://api.github.com/organizations ([Reference](https://developer.github.com/v3/orgs/#list-organizations))
    - Fetches list of organizations and displays it in cards as the home page
  - Data:
    - Org Name
    - Link to repos for org
    - Org Avatar
- /admin/dashboard?search={search_term}
  - https://api.github.com/organizations did not have capability to do search queries so was built client side
  - Data:
    - Search Query
- /admin/repositories?org={org_name}
  - Github API: https://api.github.com/orgs/${org}/repos ([Reference](https://developer.github.com/v3/repos/#list-organization-repositories))
    - Fetches list of repos based on org and displays them in a list of flushed cards on a tabbed view
  - Data:
    - Org name
    - Repo Full Name
    - Stargazers Count
- /admin/commits?repo_full_name={repo_full_name}
  - Github API: commits_url from json from https://developer.github.com/v3/repos/#list-organization-repositories
    - Fetches list of commits from repo and displays them in a list of flushed cards on a tabbed view
  - Data:
    - Repo full name
    - Commits url
    - Github link to commit
    - Author Name
    - Author Avatar

Additional Features Needed:

- Organizations
  - Toggle for sorting (stars, forks)
- Repositories
  - Toggle for sorting
  - Icons and counts (stars, forks)
- Commits
  - Timeline
  - Branch toggle
  - Updated time
- UI / UX Improvements
  - Consistency with github UI/UX
  - Ghost loading state
- Functionality
  - User Profile & Account

## Known Issues

### Fix navigation

Navigating on the tabs between repositories and commits doesn't work. This needs a link between the two to "remember" what repo the commits were for. It can be accomplished with a global store to track current repo and current org.

### Fix search

Search doesn't work. :( The search terms is passed from the DemoNavbar into Dashboard to use for filtering the organizations, but it also needs to trigger the event in the Dashboard to grab the search query from the onSubmit for the Search Form Input. Thoughts include possibly a callback and/or bringing in the search form into the dashboard component.

### Fix fetching data

Dummy data is used for all the organizations, repositories, and commits with commented out code for actual fetching.

I ran into rate limiting because there's a bug that was infinite looping on componentDidMount which wasn't expected as componentDidMount should only be called once. I suspect it might have something to do with the React Redirect being used in the open source dashboard.

Ideally it would be nice to limit the number of API calls and cache the necessary fetched data instead of hardcoding them as I did.

I cached all the data that came back in react state but I wonder if it would be better to cache only the data that I'd need.

### Handle rate limit error

There's less chance of rate limiting if you use an authenticated user.

I would have liked to show the user a notification or some action they could take, and logging. I stored the error message in the state, but the message can be lost as it is only stored on the react component.

### Performance

It's slow to load the views so I could do for some better pre-fetching.

To improve user-perceived performance, I would include a ghost loading state.

And again, limit api calls as much as possible with caching.

### Re-design components

Commits, Repositories, and Dashboard are very similar. To avoid duplication of code in the future, I'd create a base component that all three could use. I'd also consider doing a higher order component and abstracting out common functions.

### Redux Store

To simplify install and dev server setup I chose to forego using redux. Redux store would have been better to share state across components or implement a global store.

### Testing

Include unit tests and/or snapshot testing for components and util functions as needed.

## Conclusion

I'm super excited that I have the opportunity to interview at Netflix! And this project was fun to build. Thanks for reviewing!
