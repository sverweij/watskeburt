/** @type {import('dependency-cruiser').IConfiguration} */
export default {
  forbidden: [
    {
      name: "no-deep-deps-from-cli",
      severity: "error",
      from: {
        path: "^src/run-cli[.]ts$",
      },
      to: {
        pathNot: ["^src/cli[.]ts$", "$1"],
      },
    },
    {
      name: "no-unreachable-from-main",
      from: {
        path: "src/main.ts",
      },
      to: {
        path: "^src/",
        pathNot: ["[.]spec[.]ts$", "^src/(run-cli|cli|version)[.]ts$"],
        reachable: false,
      },
    },
    {
      name: "use-assert-strict",
      comment:
        "This module uses 'node:assert'. It's better to use 'node:assert/strict' instead.",
      severity: "error",
      from: {},
      to: {
        path: "^assert$",
        dependencyTypes: ["core"],
      },
    },
    /* rules from the 'recommended' preset: */
    {
      name: "no-circular",
      severity: "warn",
      comment:
        "This dependency is part of a circular relationship. You might want to revise " +
        "your solution (i.e. use dependency inversion, make sure the modules have a single responsibility) ",
      from: {},
      to: {
        circular: true,
      },
    },
    {
      name: "no-orphans",
      comment:
        "This is an orphan module - it's likely not used (anymore?). Either use it or " +
        "remove it. If it's logical this module is an orphan (i.e. it's a config file), " +
        "add an exception for it in your dependency-cruiser configuration. By default " +
        "this rule does not scrutinize dotfiles (e.g. .eslintrc.js), TypeScript declaration " +
        "files (.d.ts), tsconfig.json and some of the babel and webpack configs.",
      severity: "warn",
      from: {
        orphan: true,
        pathNot: [
          "(^|/)[.][^/]+[.](js|cjs|ts|json)$", // dot files
          "[.]d[.]ts$", // TypeScript declaration files
          "(^|/)tsconfig[.]json$", // TypeScript config
          "eslint.config[.]m?js", // eslint config
          "^dist/",
        ],
      },
      to: {},
    },
    {
      name: "no-deprecated-core",
      comment:
        "A module depends on a node core module that has been deprecated. Find an alternative - these are " +
        "bound to exist - node doesn't deprecate lightly.",
      severity: "warn",
      from: {},
      to: {
        dependencyTypes: ["core"],
        path: [
          "^(v8/tools/codemap)$",
          "^(v8/tools/consarray)$",
          "^(v8/tools/csvparser)$",
          "^(v8/tools/logreader)$",
          "^(v8/tools/profile_view)$",
          "^(v8/tools/profile)$",
          "^(v8/tools/SourceMap)$",
          "^(v8/tools/splaytree)$",
          "^(v8/tools/tickprocessor-driver)$",
          "^(v8/tools/tickprocessor)$",
          "^(node-inspect/lib/_inspect)$",
          "^(node-inspect/lib/internal/inspect_client)$",
          "^(node-inspect/lib/internal/inspect_repl)$",
          "^(async_hooks)$",
          "^(punycode)$",
          "^(domain)$",
          "^(constants)$",
          "^(sys)$",
          "^(_linklist)$",
          "^(_stream_wrap)$",
        ],
      },
    },
    {
      name: "not-to-deprecated",
      comment:
        "This module uses a (version of an) npm module that has been deprecated. Either upgrade to a later " +
        "version of that module, or find an alternative. Deprecated modules are a security risk.",
      severity: "warn",
      from: {},
      to: {
        dependencyTypes: ["deprecated"],
      },
    },
    {
      name: "no-non-package-json",
      severity: "error",
      comment:
        "This module depends on an npm package that isn't in the 'dependencies' section of your package.json. " +
        "That's problematic as the package either (1) won't be available on live (2 - worse) will be " +
        "available on live with an non-guaranteed version. Fix it by adding the package to the dependencies " +
        "in your package.json.",
      from: {},
      to: {
        dependencyTypes: ["npm-no-pkg", "npm-unknown"],
      },
    },
    {
      name: "not-to-unresolvable",
      comment:
        "This module depends on a module that cannot be found ('resolved to disk'). If it's an npm " +
        "module: add it to your package.json. In all other cases you likely already know what to do.",
      severity: "error",
      from: {},
      to: {
        couldNotResolve: true,
        // https://github.com/nodejs/node/issues/42785 - node:test is not enumerated in builtinModules
        // and won't ever be. Workaround in dependency-cruiser coming up. For now: ignore node:test
        path: "node:test",
      },
    },
    {
      name: "no-duplicate-dep-types",
      comment:
        "Likely this module depends on an external ('npm') package that occurs more than once " +
        "in your package.json i.e. bot as a devDependencies and in dependencies. This will cause " +
        "maintenance problems later on.",
      severity: "warn",
      from: {},
      to: {
        moreThanOneDependencyType: true,
        // as it's pretty common to have a type import be a type only import
        // _and_ (e.g.) a devDependency - don't consider type-only dependency
        // types for this rule
        dependencyTypesNot: ["type-only"],
      },
    },

    /* rules you might want to tweak for your specific situation: */
    {
      name: "not-to-spec",
      comment:
        "This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. " +
        "If there's something in a spec that's of use to other modules, it doesn't have that single " +
        "responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.",
      severity: "error",
      from: {},
      to: {
        path: "[.]spec[.]ts$",
      },
    },
    {
      name: "not-to-dev-dep",
      severity: "error",
      comment:
        "This module depends on an npm package from the 'devDependencies' section of your " +
        "package.json. It looks like something that ships to production, though. To prevent problems " +
        "with npm packages that aren't there on production declare it (only!) in the 'dependencies'" +
        "section of your package.json. If this module is development only - add it to the " +
        "from.pathNot re of the not-to-dev-dep rule in the dependency-cruiser configuration",
      from: {
        path: "^(dist|src)",
        pathNot: "[.]spec[.]ts$",
      },
      to: {
        dependencyTypes: ["npm-dev"],
      },
    },
    {
      name: "optional-deps-used",
      severity: "info",
      comment:
        "This module depends on an npm package that is declared as an optional dependency " +
        "in your package.json. As this makes sense in limited situations only, it's flagged here. " +
        "If you're using an optional dependency here by design - add an exception to your" +
        "dependency-cruiser configuration.",
      from: {},
      to: {
        dependencyTypes: ["npm-optional"],
      },
    },
    {
      name: "peer-deps-used",
      comment:
        "This module depends on an npm package that is declared as a peer dependency " +
        "in your package.json. This makes sense if your package is e.g. a plugin, but in " +
        "other cases - maybe not so much. If the use of a peer dependency is intentional " +
        "add an exception to your dependency-cruiser configuration.",
      severity: "warn",
      from: {},
      to: {
        dependencyTypes: ["npm-peer"],
      },
    },
    {
      name: "only-type-only-in-types",
      comment:
        "This type only module depends on something that is not type-only. That's not allowed.",
      severity: "error",
      from: {
        path: "[.]d[.]m?ts$",
      },
      to: {
        dependencyTypesNot: [
          "type-only",
          "type-import",
          "triple-slash-type-reference",
        ],
      },
    },
    {
      name: "only-type-only-to-dts",
      comment:
        "This module depends on a .d.ts file via an import that is not 'type-only'. See https://www.typescriptlang.org/docs/handbook/modules/reference.html#type-only-imports-and-exports",
      severity: "error",
      from: {},
      to: {
        path: "[.]d[.][cm]?ts$",
        dependencyTypesNot: [
          "type-only",
          "type-import",
          "triple-slash-type-reference",
        ],
      },
    },
    {
      name: "no-tsconfig-basedir-use",
      comment:
        "This module depends om something directly via a 'tsconfig.json' 'baseUrl' property. This is discouraged, unless you're still doing AMD modules - see https://www.typescriptlang.org/tsconfig#baseUrl",
      severity: "error",
      from: {},
      to: {
        dependencyTypes: ["aliased-tsconfig-base-url"],
      },
    },
  ],
  options: {
    doNotFollow: {
      path: "node_modules",
    },
    moduleSystems: ["es6"],
    prefix: `vscode://file/${process.cwd()}/`,
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "./tsconfig.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default"],
      extensions: [".ts", ".d.ts", ".js", ".cjs"],
    },
    cache: true,
    skipAnalysisNotInRules: true,
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/[^/]+",
        theme: {
          graph: {
            splines: "ortho",
          },
          modules: [
            {
              criteria: { matchesFocus: true },
              attributes: { fillcolor: "lime", penwidth: 2 },
            },
            {
              criteria: { matchesReaches: true },
              attributes: { fillcolor: "lime", penwidth: 2 },
            },
            {
              criteria: { matchesHighlight: true },
              attributes: { fillcolor: "lime", penwidth: 2 },
            },
            {
              criteria: { source: ".spec.ts" },
              attributes: {
                fontcolor: "gray",
                color: "gray",
                fillcolor: "#faffff",
              },
            },
          ],
          dependencies: [
            {
              criteria: { "rules[0].severity": "error" },
              attributes: { fontcolor: "red", color: "red" },
            },
            {
              criteria: { "rules[0].severity": "warn" },
              attributes: { fontcolor: "orange", color: "orange" },
            },
            {
              criteria: { "rules[0].severity": "info" },
              attributes: { fontcolor: "blue", color: "blue" },
            },
          ],
        },
      },
      archi: {
        collapsePattern:
          "^(packages|src|lib|app|test(s?)|spec(s?))/[^/]+|node_modules/[^/]+",
      },
    },
  },
};
// generated: dependency-cruiser@11.9.0 on 2022-06-15T20:07:49.259Z
