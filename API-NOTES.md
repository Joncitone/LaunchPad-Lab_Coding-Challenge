# API Formatting Notes

Examples

## Forks

GET https://api.github.com/search/repositories?q=user%3Afacebook+repo%3Areact+react

returns an object containing an array of items listing the forks as a property, note that watchers (stars), and open issues can also be seen

```
{
    "total_count": 13,
    "incomplete_results": false,
    "items": [
        {
            "id": 10270250,
            "node_id": "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
            "name": "react",
            "full_name": "facebook/react",
            "private": false,
            ...
            omitted for brevity
            ...
            "forks": 33134,
            "open_issues": 734,
            "watchers": 165010,
            "default_branch": "master",
            "score": 1.0
        },
        ... omitted for brevity ...
    ]
}
```

## Commits

GET https://api.github.com/repos/facebook/react/stats/participation

returns the last year of commit activity grouped by week oldest to newest

```
{
    "all": [
        ... number of commits from the past year ...
        16,
        9,
        11,
        20
    ],
    "owner": [
        0,
        ... 51 more 0s, omitted for brevity ...
    ]
}
```

## Issues Closed

GET https://api.github.com/search/issues?q=repo:facebook/react+type:issue+state:closed

returns an object with the total amount of closed issues and a detailed items array

```
{
    "total_count": 9465,
    "incomplete_results": false,
    "items": [
      ... omitted for brevity ...
    ]
}

```
