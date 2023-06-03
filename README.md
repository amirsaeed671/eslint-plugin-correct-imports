# eslint-plugin-correct-imports

Eslint rules for correct imports in javascript files

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-correct-imports`:

```
$ npm install eslint-plugin-correct-imports --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-correct-imports` globally.

## Usage

Add `correct-imports` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["correct-imports"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "correct-imports/rule-name": "error"
  }
}
```

You can also use the recommended config instead

```json
{
  "extends": ["plugin:correct-imports/recommended"]
}
```

## Supported Rules

- [correct-imports/no-relative-path](docs/rules/no-relative-path.md): Enforce using import statements as string literal with absolute path
- [correct-imports/group-import](docs/rules/group-import.md): Enforce grouping similar import statements together
- [correct-imports/valid-order](docs/rules/valid-order.md): Enforce consistent order of import statements
