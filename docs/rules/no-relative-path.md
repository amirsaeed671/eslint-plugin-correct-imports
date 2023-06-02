# no-relative-path

Enforce using import statements as string literal with absolute path

## Rule Details

Examples of **incorrect** code for this rule:

```js
import Menu from './components/Menu'
```

Examples of **correct** code for this rule:

```js
import Menu from 'components/Menu'
```
