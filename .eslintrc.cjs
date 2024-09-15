/** @type {import("eslint").Linter.Config} */
const config = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": true
  },
  "plugins": [
    "@typescript-eslint",
    "import",
    "unused-imports",
    "validate-filename"
  ],
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked"
  ],
  "rules": {
    "import/first": "error",
    "import/newline-after-import": "error",
    "unused-imports/no-unused-imports": "error", // removes not used imports on `eslint --fix`. 1 = warn, 2 = error
    "import/order": [
      "warn",
      {
        "groups": [
          "builtin", "external", "internal", "parent", "sibling", "index", "object", "type"
        ],
        "newlines-between": "always",
        "pathGroups": [
          {
            "pattern": "react",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "next",
            "group": "external",
            "position": "before"
          },
          {
            "pattern": "@/server/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@app/**",
            "group": "external",
            "position": "after"
          },
          {
            "pattern": "@ui/**",
            "group": "external",
            "position": "after"
          }
        ],
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        }
      }
    ],
    "validate-filename/naming-rules": [
      "error",
      {
        "rules": [
          {
            "case": "pascal",
            "target": "**/_providers/**",
            "patterns": "^[a-zA-Z]*Provider"
          },
          {
            "case": "kebab",
            "target": "**/components/ui/**"
          },
          {
            "case": "pascal",
            "target": "**/_components/**"
          },
          {
            "case": "camel",
            "target": "**/hooks/**",
            "patterns": "^use"
          },
          {
            "case": "kebab",
            "target": "**/app/**",
            "patterns": "^(page|layout|loading|error|not-found|route|template).(tsx|ts)$"
          }
        ]
      }
    ],
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "inline-type-imports"
      }
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        "checksVoidReturn": {
          "attributes": false
        }
      }
    ]
  }
}
module.exports = config;