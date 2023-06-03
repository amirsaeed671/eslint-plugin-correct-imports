
# valid-order

Enforce consistent order of import statements

## Rule Details

Examples of **incorrect** code for this rule:

```js
// Router
import Router from 'components/Router';

// Packages
import React from 'react';
import axios from 'axios';
```

Examples of **correct** code for this rule:

```js
// Packages
import React from 'react';
import axios from 'axios';

// Router
import Router from 'components/Router';
```
