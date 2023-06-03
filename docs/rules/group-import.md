# no-relative-path

Enforce grouping similar import statements together

## Rule Details

Examples of **incorrect** code for this rule:

```js
// Tests
import AppTests from 'tests/Yup.test';

// Components
import App from 'components/App';

import NewTest from 'tests/App.test';
import YoTest from 'tests/yo.test';
```

Examples of **correct** code for this rule:

```js
// Tests
import AppTests from 'tests/Yup.test';
import NewTest from 'tests/App.test';
import YoTest from 'tests/yo.test';
```
