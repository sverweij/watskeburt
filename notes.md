```sh
git diff develop --name-status
```

output:

```
M       .dependency-cruiser-known-violations.json
M       configs/plugins/mermaid-reporter-plugin.js
M       doc/cli.md
M       doc/options-reference.md
M       doc/rules-reference.md
M       package.json
M       src/main/options/normalize.js
M       src/report/index.js
M       src/report/markdown.js
A       src/report/mermaid.js
M       src/report/metrics.js
M       src/schema/configuration.schema.js
M       src/schema/configuration.schema.json
M       src/schema/cruise-result.schema.js
M       src/schema/cruise-result.schema.json
M       test/main/options/normalize.cruise-options.spec.mjs
A       test/report/markdown/__mocks__/orphans-cycles-metrics.mjs
M       test/report/markdown/markdown.spec.mjs
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/clusterless.json    test/report/mermaid/__mocks__/clusterless.json
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/clusterless.mmd     test/report/mermaid/__mocks__/clusterless.mmd
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/contains-strings-to-be-escaped.json test/report/mermaid/__mocks__/contains-strings-to-be-escaped.json
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/contains-strings-to-be-escaped.mmd  test/report/mermaid/__mocks__/contains-strings-to-be-escaped.mmd
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/dependency-cruiser-2019-01-14.json  test/report/mermaid/__mocks__/dependency-cruiser-2019-01-14.json
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/dependency-cruiser-2019-01-14.mmd   test/report/mermaid/__mocks__/dependency-cruiser-2019-01-14.mmd
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/do-not-follow-deps.json     test/report/mermaid/__mocks__/do-not-follow-deps.json
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/do-not-follow-deps.mmd      test/report/mermaid/__mocks__/do-not-follow-deps.mmd
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/es6-unresolvable-deps.json  test/report/mermaid/__mocks__/es6-unresolvable-deps.json
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/es6-unresolvable-deps.mmd   test/report/mermaid/__mocks__/es6-unresolvable-deps.mmd
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/orphan-deps.json    test/report/mermaid/__mocks__/orphan-deps.json
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/orphan-deps.mmd     test/report/mermaid/__mocks__/orphan-deps.mmd
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/unknown-deps.json   test/report/mermaid/__mocks__/unknown-deps.json
R100    test/configs/plugins/mermaid-reporter-plugin/module-level/__mocks__/unknown-deps.mmd    test/report/mermaid/__mocks__/unknown-deps.mmd
A       test/report/mermaid/__mocks__/with-focus.json
A       test/report/mermaid/__mocks__/with-focus.mmd
R066    test/configs/plugins/mermaid-reporter-plugin/module-level/index.spec.mjs        test/report/mermaid/mermaid.spec.mjs
A       test/report/metrics/__mocks/cruise-result-with-metrics-for-modules-and-folders.mjs
M       test/report/metrics/metrics.spec.mjs
M       tools/schema/output-type.mjs
M       tools/schema/reporter-options.mjs
M       types/reporter-options.d.ts
M       types/shared-types.d.ts
```

target output:

```json
[
  { "name": "doc/cli.md", "changeType": "modified"},
  { "name": "test/report/mermaid/mermaid.spec.mjs", "changeType": "renamed", "similarity": 66, "oldName": "test/configs/plugins/mermaid-reporter-plugin/module-level/index.spec.mjs" }
...
]
```

See [diff-filter](https://git-scm.com/docs/git-diff#Documentation/git-diff.txt---diff-filterACDMRTUXB82308203) for a list of changeTypes:

Select only files that are Added (A), Copied (C), Deleted (D), Modified (M), Renamed (R), have their type (i.e. regular file, symlink, submodule, …​) changed (T), are Unmerged (U), are Unknown (X), or have had their pairing Broken (B)

This is what is in a `github` object on github actions for a regular pull request

```json
{
  "token": "***",
  "job": "check",
  "ref": "refs/pull/2/merge",
  "sha": "31775ae8a219de2294f39d6a3dfdac0cda59a4ee",
  "repository": "sverweij/watskeburt",
  "repository_owner": "sverweij",
  "repository_owner_id": "4822597",
  "repositoryUrl": "git://github.com/sverweij/watskeburt.git",
  "run_id": "2521505556",
  "run_number": "38",
  "retention_days": "90",
  "run_attempt": "1",
  "artifact_cache_size_limit": "10",
  "repository_id": "504299470",
  "actor_id": "4822597",
  "actor": "sverweij",
  "workflow": "ci",
  "head_ref": "refactor/split-off-formatters",
  "base_ref": "main",
  "event_name": "pull_request",
  "event": {
    "action": "synchronize",
    "after": "e3603e2e51fed89ad50306f42756b760de7a8fc7",
    "before": "a52423985709de905337ceb0dbe0186f6d275b48",
    "number": 2,
    "pull_request": {
      "_links": {
        "comments": {
          "href": "https://api.github.com/repos/sverweij/watskeburt/issues/2/comments"
        },
        "commits": {
          "href": "https://api.github.com/repos/sverweij/watskeburt/pulls/2/commits"
        },
        "html": {
          "href": "https://github.com/sverweij/watskeburt/pull/2"
        },
        "issue": {
          "href": "https://api.github.com/repos/sverweij/watskeburt/issues/2"
        },
        "review_comment": {
          "href": "https://api.github.com/repos/sverweij/watskeburt/pulls/comments{/number}"
        },
        "review_comments": {
          "href": "https://api.github.com/repos/sverweij/watskeburt/pulls/2/comments"
        },
        "self": {
          "href": "https://api.github.com/repos/sverweij/watskeburt/pulls/2"
        },
        "statuses": {
          "href": "https://api.github.com/repos/sverweij/watskeburt/statuses/e3603e2e51fed89ad50306f42756b760de7a8fc7"
        }
      },
      "active_lock_reason": null,
      "additions": 114,
      "assignee": null,
      "assignees": [],
      "author_association": "OWNER",
      "auto_merge": null,
      "base": {
        "label": "sverweij:main",
        "ref": "main",
        "repo": {
          "allow_auto_merge": false,
          "allow_forking": true,
          "allow_merge_commit": true,
          "allow_rebase_merge": true,
          "allow_squash_merge": true,
          "allow_update_branch": false,
          "archive_url": "https://api.github.com/repos/sverweij/watskeburt/{archive_format}{/ref}",
          "archived": false,
          "assignees_url": "https://api.github.com/repos/sverweij/watskeburt/assignees{/user}",
          "blobs_url": "https://api.github.com/repos/sverweij/watskeburt/git/blobs{/sha}",
          "branches_url": "https://api.github.com/repos/sverweij/watskeburt/branches{/branch}",
          "clone_url": "https://github.com/sverweij/watskeburt.git",
          "collaborators_url": "https://api.github.com/repos/sverweij/watskeburt/collaborators{/collaborator}",
          "comments_url": "https://api.github.com/repos/sverweij/watskeburt/comments{/number}",
          "commits_url": "https://api.github.com/repos/sverweij/watskeburt/commits{/sha}",
          "compare_url": "https://api.github.com/repos/sverweij/watskeburt/compare/{base}...{head}",
          "contents_url": "https://api.github.com/repos/sverweij/watskeburt/contents/{+path}",
          "contributors_url": "https://api.github.com/repos/sverweij/watskeburt/contributors",
          "created_at": "2022-06-16T20:39:05Z",
          "default_branch": "main",
          "delete_branch_on_merge": false,
          "deployments_url": "https://api.github.com/repos/sverweij/watskeburt/deployments",
          "description": null,
          "disabled": false,
          "downloads_url": "https://api.github.com/repos/sverweij/watskeburt/downloads",
          "events_url": "https://api.github.com/repos/sverweij/watskeburt/events",
          "fork": false,
          "forks": 0,
          "forks_count": 0,
          "forks_url": "https://api.github.com/repos/sverweij/watskeburt/forks",
          "full_name": "sverweij/watskeburt",
          "git_commits_url": "https://api.github.com/repos/sverweij/watskeburt/git/commits{/sha}",
          "git_refs_url": "https://api.github.com/repos/sverweij/watskeburt/git/refs{/sha}",
          "git_tags_url": "https://api.github.com/repos/sverweij/watskeburt/git/tags{/sha}",
          "git_url": "git://github.com/sverweij/watskeburt.git",
          "has_downloads": true,
          "has_issues": true,
          "has_pages": false,
          "has_projects": true,
          "has_wiki": true,
          "homepage": null,
          "hooks_url": "https://api.github.com/repos/sverweij/watskeburt/hooks",
          "html_url": "https://github.com/sverweij/watskeburt",
          "id": 504299470,
          "is_template": false,
          "issue_comment_url": "https://api.github.com/repos/sverweij/watskeburt/issues/comments{/number}",
          "issue_events_url": "https://api.github.com/repos/sverweij/watskeburt/issues/events{/number}",
          "issues_url": "https://api.github.com/repos/sverweij/watskeburt/issues{/number}",
          "keys_url": "https://api.github.com/repos/sverweij/watskeburt/keys{/key_id}",
          "labels_url": "https://api.github.com/repos/sverweij/watskeburt/labels{/name}",
          "language": "JavaScript",
          "languages_url": "https://api.github.com/repos/sverweij/watskeburt/languages",
          "license": null,
          "merges_url": "https://api.github.com/repos/sverweij/watskeburt/merges",
          "milestones_url": "https://api.github.com/repos/sverweij/watskeburt/milestones{/number}",
          "mirror_url": null,
          "name": "watskeburt",
          "node_id": "R_kgDOHg7_zg",
          "notifications_url": "https://api.github.com/repos/sverweij/watskeburt/notifications{?since,all,participating}",
          "open_issues": 1,
          "open_issues_count": 1,
          "owner": {
            "avatar_url": "https://avatars.githubusercontent.com/u/4822597?v=4",
            "events_url": "https://api.github.com/users/sverweij/events{/privacy}",
            "followers_url": "https://api.github.com/users/sverweij/followers",
            "following_url": "https://api.github.com/users/sverweij/following{/other_user}",
            "gists_url": "https://api.github.com/users/sverweij/gists{/gist_id}",
            "gravatar_id": "",
            "html_url": "https://github.com/sverweij",
            "id": 4822597,
            "login": "sverweij",
            "node_id": "MDQ6VXNlcjQ4MjI1OTc=",
            "organizations_url": "https://api.github.com/users/sverweij/orgs",
            "received_events_url": "https://api.github.com/users/sverweij/received_events",
            "repos_url": "https://api.github.com/users/sverweij/repos",
            "site_admin": false,
            "starred_url": "https://api.github.com/users/sverweij/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/sverweij/subscriptions",
            "type": "User",
            "url": "https://api.github.com/users/sverweij"
          },
          "private": true,
          "pulls_url": "https://api.github.com/repos/sverweij/watskeburt/pulls{/number}",
          "pushed_at": "2022-06-18T19:26:19Z",
          "releases_url": "https://api.github.com/repos/sverweij/watskeburt/releases{/id}",
          "size": 1914,
          "ssh_url": "git@github.com:sverweij/watskeburt.git",
          "stargazers_count": 0,
          "stargazers_url": "https://api.github.com/repos/sverweij/watskeburt/stargazers",
          "statuses_url": "https://api.github.com/repos/sverweij/watskeburt/statuses/{sha}",
          "subscribers_url": "https://api.github.com/repos/sverweij/watskeburt/subscribers",
          "subscription_url": "https://api.github.com/repos/sverweij/watskeburt/subscription",
          "svn_url": "https://github.com/sverweij/watskeburt",
          "tags_url": "https://api.github.com/repos/sverweij/watskeburt/tags",
          "teams_url": "https://api.github.com/repos/sverweij/watskeburt/teams",
          "topics": [],
          "trees_url": "https://api.github.com/repos/sverweij/watskeburt/git/trees{/sha}",
          "updated_at": "2022-06-16T20:56:13Z",
          "url": "https://api.github.com/repos/sverweij/watskeburt",
          "use_squash_pr_title_as_default": false,
          "visibility": "private",
          "watchers": 0,
          "watchers_count": 0
        },
        "sha": "44455edcfc1040dc19155484c53775f44bd72ee3",
        "user": {
          "avatar_url": "https://avatars.githubusercontent.com/u/4822597?v=4",
          "events_url": "https://api.github.com/users/sverweij/events{/privacy}",
          "followers_url": "https://api.github.com/users/sverweij/followers",
          "following_url": "https://api.github.com/users/sverweij/following{/other_user}",
          "gists_url": "https://api.github.com/users/sverweij/gists{/gist_id}",
          "gravatar_id": "",
          "html_url": "https://github.com/sverweij",
          "id": 4822597,
          "login": "sverweij",
          "node_id": "MDQ6VXNlcjQ4MjI1OTc=",
          "organizations_url": "https://api.github.com/users/sverweij/orgs",
          "received_events_url": "https://api.github.com/users/sverweij/received_events",
          "repos_url": "https://api.github.com/users/sverweij/repos",
          "site_admin": false,
          "starred_url": "https://api.github.com/users/sverweij/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sverweij/subscriptions",
          "type": "User",
          "url": "https://api.github.com/users/sverweij"
        }
      },
      "body": null,
      "changed_files": 10,
      "closed_at": null,
      "comments": 0,
      "comments_url": "https://api.github.com/repos/sverweij/watskeburt/issues/2/comments",
      "commits": 1,
      "commits_url": "https://api.github.com/repos/sverweij/watskeburt/pulls/2/commits",
      "created_at": "2022-06-18T18:29:45Z",
      "deletions": 83,
      "diff_url": "https://github.com/sverweij/watskeburt/pull/2.diff",
      "draft": false,
      "head": {
        "label": "sverweij:refactor/split-off-formatters",
        "ref": "refactor/split-off-formatters",
        "repo": {
          "allow_auto_merge": false,
          "allow_forking": true,
          "allow_merge_commit": true,
          "allow_rebase_merge": true,
          "allow_squash_merge": true,
          "allow_update_branch": false,
          "archive_url": "https://api.github.com/repos/sverweij/watskeburt/{archive_format}{/ref}",
          "archived": false,
          "assignees_url": "https://api.github.com/repos/sverweij/watskeburt/assignees{/user}",
          "blobs_url": "https://api.github.com/repos/sverweij/watskeburt/git/blobs{/sha}",
          "branches_url": "https://api.github.com/repos/sverweij/watskeburt/branches{/branch}",
          "clone_url": "https://github.com/sverweij/watskeburt.git",
          "collaborators_url": "https://api.github.com/repos/sverweij/watskeburt/collaborators{/collaborator}",
          "comments_url": "https://api.github.com/repos/sverweij/watskeburt/comments{/number}",
          "commits_url": "https://api.github.com/repos/sverweij/watskeburt/commits{/sha}",
          "compare_url": "https://api.github.com/repos/sverweij/watskeburt/compare/{base}...{head}",
          "contents_url": "https://api.github.com/repos/sverweij/watskeburt/contents/{+path}",
          "contributors_url": "https://api.github.com/repos/sverweij/watskeburt/contributors",
          "created_at": "2022-06-16T20:39:05Z",
          "default_branch": "main",
          "delete_branch_on_merge": false,
          "deployments_url": "https://api.github.com/repos/sverweij/watskeburt/deployments",
          "description": null,
          "disabled": false,
          "downloads_url": "https://api.github.com/repos/sverweij/watskeburt/downloads",
          "events_url": "https://api.github.com/repos/sverweij/watskeburt/events",
          "fork": false,
          "forks": 0,
          "forks_count": 0,
          "forks_url": "https://api.github.com/repos/sverweij/watskeburt/forks",
          "full_name": "sverweij/watskeburt",
          "git_commits_url": "https://api.github.com/repos/sverweij/watskeburt/git/commits{/sha}",
          "git_refs_url": "https://api.github.com/repos/sverweij/watskeburt/git/refs{/sha}",
          "git_tags_url": "https://api.github.com/repos/sverweij/watskeburt/git/tags{/sha}",
          "git_url": "git://github.com/sverweij/watskeburt.git",
          "has_downloads": true,
          "has_issues": true,
          "has_pages": false,
          "has_projects": true,
          "has_wiki": true,
          "homepage": null,
          "hooks_url": "https://api.github.com/repos/sverweij/watskeburt/hooks",
          "html_url": "https://github.com/sverweij/watskeburt",
          "id": 504299470,
          "is_template": false,
          "issue_comment_url": "https://api.github.com/repos/sverweij/watskeburt/issues/comments{/number}",
          "issue_events_url": "https://api.github.com/repos/sverweij/watskeburt/issues/events{/number}",
          "issues_url": "https://api.github.com/repos/sverweij/watskeburt/issues{/number}",
          "keys_url": "https://api.github.com/repos/sverweij/watskeburt/keys{/key_id}",
          "labels_url": "https://api.github.com/repos/sverweij/watskeburt/labels{/name}",
          "language": "JavaScript",
          "languages_url": "https://api.github.com/repos/sverweij/watskeburt/languages",
          "license": null,
          "merges_url": "https://api.github.com/repos/sverweij/watskeburt/merges",
          "milestones_url": "https://api.github.com/repos/sverweij/watskeburt/milestones{/number}",
          "mirror_url": null,
          "name": "watskeburt",
          "node_id": "R_kgDOHg7_zg",
          "notifications_url": "https://api.github.com/repos/sverweij/watskeburt/notifications{?since,all,participating}",
          "open_issues": 1,
          "open_issues_count": 1,
          "owner": {
            "avatar_url": "https://avatars.githubusercontent.com/u/4822597?v=4",
            "events_url": "https://api.github.com/users/sverweij/events{/privacy}",
            "followers_url": "https://api.github.com/users/sverweij/followers",
            "following_url": "https://api.github.com/users/sverweij/following{/other_user}",
            "gists_url": "https://api.github.com/users/sverweij/gists{/gist_id}",
            "gravatar_id": "",
            "html_url": "https://github.com/sverweij",
            "id": 4822597,
            "login": "sverweij",
            "node_id": "MDQ6VXNlcjQ4MjI1OTc=",
            "organizations_url": "https://api.github.com/users/sverweij/orgs",
            "received_events_url": "https://api.github.com/users/sverweij/received_events",
            "repos_url": "https://api.github.com/users/sverweij/repos",
            "site_admin": false,
            "starred_url": "https://api.github.com/users/sverweij/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/sverweij/subscriptions",
            "type": "User",
            "url": "https://api.github.com/users/sverweij"
          },
          "private": true,
          "pulls_url": "https://api.github.com/repos/sverweij/watskeburt/pulls{/number}",
          "pushed_at": "2022-06-18T19:26:19Z",
          "releases_url": "https://api.github.com/repos/sverweij/watskeburt/releases{/id}",
          "size": 1914,
          "ssh_url": "git@github.com:sverweij/watskeburt.git",
          "stargazers_count": 0,
          "stargazers_url": "https://api.github.com/repos/sverweij/watskeburt/stargazers",
          "statuses_url": "https://api.github.com/repos/sverweij/watskeburt/statuses/{sha}",
          "subscribers_url": "https://api.github.com/repos/sverweij/watskeburt/subscribers",
          "subscription_url": "https://api.github.com/repos/sverweij/watskeburt/subscription",
          "svn_url": "https://github.com/sverweij/watskeburt",
          "tags_url": "https://api.github.com/repos/sverweij/watskeburt/tags",
          "teams_url": "https://api.github.com/repos/sverweij/watskeburt/teams",
          "topics": [],
          "trees_url": "https://api.github.com/repos/sverweij/watskeburt/git/trees{/sha}",
          "updated_at": "2022-06-16T20:56:13Z",
          "url": "https://api.github.com/repos/sverweij/watskeburt",
          "use_squash_pr_title_as_default": false,
          "visibility": "private",
          "watchers": 0,
          "watchers_count": 0
        },
        "sha": "e3603e2e51fed89ad50306f42756b760de7a8fc7",
        "user": {
          "avatar_url": "https://avatars.githubusercontent.com/u/4822597?v=4",
          "events_url": "https://api.github.com/users/sverweij/events{/privacy}",
          "followers_url": "https://api.github.com/users/sverweij/followers",
          "following_url": "https://api.github.com/users/sverweij/following{/other_user}",
          "gists_url": "https://api.github.com/users/sverweij/gists{/gist_id}",
          "gravatar_id": "",
          "html_url": "https://github.com/sverweij",
          "id": 4822597,
          "login": "sverweij",
          "node_id": "MDQ6VXNlcjQ4MjI1OTc=",
          "organizations_url": "https://api.github.com/users/sverweij/orgs",
          "received_events_url": "https://api.github.com/users/sverweij/received_events",
          "repos_url": "https://api.github.com/users/sverweij/repos",
          "site_admin": false,
          "starred_url": "https://api.github.com/users/sverweij/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sverweij/subscriptions",
          "type": "User",
          "url": "https://api.github.com/users/sverweij"
        }
      },
      "html_url": "https://github.com/sverweij/watskeburt/pull/2",
      "id": 971331386,
      "issue_url": "https://api.github.com/repos/sverweij/watskeburt/issues/2",
      "labels": [],
      "locked": false,
      "maintainer_can_modify": false,
      "merge_commit_sha": "3fc18110b92b08bd4875a330781161f4cfc8e31a",
      "mergeable": null,
      "mergeable_state": "unknown",
      "merged": false,
      "merged_at": null,
      "merged_by": null,
      "milestone": null,
      "node_id": "PR_kwDOHg7_zs455Vc6",
      "number": 2,
      "patch_url": "https://github.com/sverweij/watskeburt/pull/2.patch",
      "rebaseable": null,
      "requested_reviewers": [],
      "requested_teams": [],
      "review_comment_url": "https://api.github.com/repos/sverweij/watskeburt/pulls/comments{/number}",
      "review_comments": 0,
      "review_comments_url": "https://api.github.com/repos/sverweij/watskeburt/pulls/2/comments",
      "state": "open",
      "statuses_url": "https://api.github.com/repos/sverweij/watskeburt/statuses/e3603e2e51fed89ad50306f42756b760de7a8fc7",
      "title": "refactor: splits off formatters",
      "updated_at": "2022-06-18T19:26:20Z",
      "url": "https://api.github.com/repos/sverweij/watskeburt/pulls/2",
      "user": {
        "avatar_url": "https://avatars.githubusercontent.com/u/4822597?v=4",
        "events_url": "https://api.github.com/users/sverweij/events{/privacy}",
        "followers_url": "https://api.github.com/users/sverweij/followers",
        "following_url": "https://api.github.com/users/sverweij/following{/other_user}",
        "gists_url": "https://api.github.com/users/sverweij/gists{/gist_id}",
        "gravatar_id": "",
        "html_url": "https://github.com/sverweij",
        "id": 4822597,
        "login": "sverweij",
        "node_id": "MDQ6VXNlcjQ4MjI1OTc=",
        "organizations_url": "https://api.github.com/users/sverweij/orgs",
        "received_events_url": "https://api.github.com/users/sverweij/received_events",
        "repos_url": "https://api.github.com/users/sverweij/repos",
        "site_admin": false,
        "starred_url": "https://api.github.com/users/sverweij/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/sverweij/subscriptions",
        "type": "User",
        "url": "https://api.github.com/users/sverweij"
      }
    },
    "repository": {
      "allow_forking": true,
      "archive_url": "https://api.github.com/repos/sverweij/watskeburt/{archive_format}{/ref}",
      "archived": false,
      "assignees_url": "https://api.github.com/repos/sverweij/watskeburt/assignees{/user}",
      "blobs_url": "https://api.github.com/repos/sverweij/watskeburt/git/blobs{/sha}",
      "branches_url": "https://api.github.com/repos/sverweij/watskeburt/branches{/branch}",
      "clone_url": "https://github.com/sverweij/watskeburt.git",
      "collaborators_url": "https://api.github.com/repos/sverweij/watskeburt/collaborators{/collaborator}",
      "comments_url": "https://api.github.com/repos/sverweij/watskeburt/comments{/number}",
      "commits_url": "https://api.github.com/repos/sverweij/watskeburt/commits{/sha}",
      "compare_url": "https://api.github.com/repos/sverweij/watskeburt/compare/{base}...{head}",
      "contents_url": "https://api.github.com/repos/sverweij/watskeburt/contents/{+path}",
      "contributors_url": "https://api.github.com/repos/sverweij/watskeburt/contributors",
      "created_at": "2022-06-16T20:39:05Z",
      "default_branch": "main",
      "deployments_url": "https://api.github.com/repos/sverweij/watskeburt/deployments",
      "description": null,
      "disabled": false,
      "downloads_url": "https://api.github.com/repos/sverweij/watskeburt/downloads",
      "events_url": "https://api.github.com/repos/sverweij/watskeburt/events",
      "fork": false,
      "forks": 0,
      "forks_count": 0,
      "forks_url": "https://api.github.com/repos/sverweij/watskeburt/forks",
      "full_name": "sverweij/watskeburt",
      "git_commits_url": "https://api.github.com/repos/sverweij/watskeburt/git/commits{/sha}",
      "git_refs_url": "https://api.github.com/repos/sverweij/watskeburt/git/refs{/sha}",
      "git_tags_url": "https://api.github.com/repos/sverweij/watskeburt/git/tags{/sha}",
      "git_url": "git://github.com/sverweij/watskeburt.git",
      "has_downloads": true,
      "has_issues": true,
      "has_pages": false,
      "has_projects": true,
      "has_wiki": true,
      "homepage": null,
      "hooks_url": "https://api.github.com/repos/sverweij/watskeburt/hooks",
      "html_url": "https://github.com/sverweij/watskeburt",
      "id": 504299470,
      "is_template": false,
      "issue_comment_url": "https://api.github.com/repos/sverweij/watskeburt/issues/comments{/number}",
      "issue_events_url": "https://api.github.com/repos/sverweij/watskeburt/issues/events{/number}",
      "issues_url": "https://api.github.com/repos/sverweij/watskeburt/issues{/number}",
      "keys_url": "https://api.github.com/repos/sverweij/watskeburt/keys{/key_id}",
      "labels_url": "https://api.github.com/repos/sverweij/watskeburt/labels{/name}",
      "language": "JavaScript",
      "languages_url": "https://api.github.com/repos/sverweij/watskeburt/languages",
      "license": null,
      "merges_url": "https://api.github.com/repos/sverweij/watskeburt/merges",
      "milestones_url": "https://api.github.com/repos/sverweij/watskeburt/milestones{/number}",
      "mirror_url": null,
      "name": "watskeburt",
      "node_id": "R_kgDOHg7_zg",
      "notifications_url": "https://api.github.com/repos/sverweij/watskeburt/notifications{?since,all,participating}",
      "open_issues": 1,
      "open_issues_count": 1,
      "owner": {
        "avatar_url": "https://avatars.githubusercontent.com/u/4822597?v=4",
        "events_url": "https://api.github.com/users/sverweij/events{/privacy}",
        "followers_url": "https://api.github.com/users/sverweij/followers",
        "following_url": "https://api.github.com/users/sverweij/following{/other_user}",
        "gists_url": "https://api.github.com/users/sverweij/gists{/gist_id}",
        "gravatar_id": "",
        "html_url": "https://github.com/sverweij",
        "id": 4822597,
        "login": "sverweij",
        "node_id": "MDQ6VXNlcjQ4MjI1OTc=",
        "organizations_url": "https://api.github.com/users/sverweij/orgs",
        "received_events_url": "https://api.github.com/users/sverweij/received_events",
        "repos_url": "https://api.github.com/users/sverweij/repos",
        "site_admin": false,
        "starred_url": "https://api.github.com/users/sverweij/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/sverweij/subscriptions",
        "type": "User",
        "url": "https://api.github.com/users/sverweij"
      },
      "private": true,
      "pulls_url": "https://api.github.com/repos/sverweij/watskeburt/pulls{/number}",
      "pushed_at": "2022-06-18T19:26:19Z",
      "releases_url": "https://api.github.com/repos/sverweij/watskeburt/releases{/id}",
      "size": 1914,
      "ssh_url": "git@github.com:sverweij/watskeburt.git",
      "stargazers_count": 0,
      "stargazers_url": "https://api.github.com/repos/sverweij/watskeburt/stargazers",
      "statuses_url": "https://api.github.com/repos/sverweij/watskeburt/statuses/{sha}",
      "subscribers_url": "https://api.github.com/repos/sverweij/watskeburt/subscribers",
      "subscription_url": "https://api.github.com/repos/sverweij/watskeburt/subscription",
      "svn_url": "https://github.com/sverweij/watskeburt",
      "tags_url": "https://api.github.com/repos/sverweij/watskeburt/tags",
      "teams_url": "https://api.github.com/repos/sverweij/watskeburt/teams",
      "topics": [],
      "trees_url": "https://api.github.com/repos/sverweij/watskeburt/git/trees{/sha}",
      "updated_at": "2022-06-16T20:56:13Z",
      "url": "https://api.github.com/repos/sverweij/watskeburt",
      "visibility": "private",
      "watchers": 0,
      "watchers_count": 0
    },
    "sender": {
      "avatar_url": "https://avatars.githubusercontent.com/u/4822597?v=4",
      "events_url": "https://api.github.com/users/sverweij/events{/privacy}",
      "followers_url": "https://api.github.com/users/sverweij/followers",
      "following_url": "https://api.github.com/users/sverweij/following{/other_user}",
      "gists_url": "https://api.github.com/users/sverweij/gists{/gist_id}",
      "gravatar_id": "",
      "html_url": "https://github.com/sverweij",
      "id": 4822597,
      "login": "sverweij",
      "node_id": "MDQ6VXNlcjQ4MjI1OTc=",
      "organizations_url": "https://api.github.com/users/sverweij/orgs",
      "received_events_url": "https://api.github.com/users/sverweij/received_events",
      "repos_url": "https://api.github.com/users/sverweij/repos",
      "site_admin": false,
      "starred_url": "https://api.github.com/users/sverweij/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/sverweij/subscriptions",
      "type": "User",
      "url": "https://api.github.com/users/sverweij"
    }
  },
  "server_url": "https://github.com",
  "api_url": "https://api.github.com",
  "graphql_url": "https://api.github.com/graphql",
  "ref_name": "2/merge",
  "ref_protected": false,
  "ref_type": "branch",
  "secret_source": "Actions",
  "workspace": "/home/runner/work/watskeburt/watskeburt",
  "action": "__run",
  "event_path": "/home/runner/work/_temp/_github_workflow/event.json",
  "action_repository": "",
  "action_ref": "",
  "path": "/home/runner/work/_temp/_runner_file_commands/add_path_459dda95-0916-437f-99be-49ee3afbde68",
  "env": "/home/runner/work/_temp/_runner_file_commands/set_env_459dda95-0916-437f-99be-49ee3afbde68",
  "step_summary": "/home/runner/work/_temp/_runner_file_commands/step_summary_459dda95-0916-437f-99be-49ee3afbde68"
}
```
