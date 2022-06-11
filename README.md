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
