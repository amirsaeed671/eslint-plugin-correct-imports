# import-name-comment

Enforce comment on top of import group


## Rule Details

Examples of **incorrect** code for this rule:

```js
import App from 'components/App';

import AppTests from 'tests/Yup.test';
import NewTest from 'tests/App.test';
import YoTest from 'tests/yo.test';
```

Examples of **correct** code for this rule:

```js

// Components
import App from 'components/App';

// Tests
import NewTest from 'tests/App.test';
import YoTest from 'tests/yo.test';
```
