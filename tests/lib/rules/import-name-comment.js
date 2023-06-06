//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/import-name-comment");

const parsers = require("../../helpers/parsers");
const messages = require("../../../lib/utils/messages");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parser: parsers.BABEL_ESLINT });
ruleTester.run("import-name-comment", rule, {
    valid: [
        {
            code: `
                // Stores
                import UserStore from 'stores/user.store';
                import ThemeStore from 'stores/theme.store';
                
                // Tests
                import AppTests from 'tests/Yup.test';
                import NewTest from 'tests/App.test';
                import YoTest from 'tests/yo.test';
                
                // Assets
                import Logo from 'assets/logos/daily-mix.png';
      `,
        },
    ],

    invalid: [
        {
            code: `
// Stores
import UserStore from 'stores/user.store';
import ThemeStore from 'stores/theme.store';

import AppTests from 'tests/Yup.test';
import NewTest from 'tests/App.test';
import YoTest from 'tests/yo.test';

// Assets
import Logo from 'assets/logos/daily-mix.png';
`,
            errors: [
                {
                    message: messages.rules.tests.importCommentError,
                    line: 6,
                    column: 1,
                    type: "ImportDeclaration",
                },
            ],
            output: `
// Stores
import UserStore from 'stores/user.store';
import ThemeStore from 'stores/theme.store';

// Tests
import AppTests from 'tests/Yup.test';
import NewTest from 'tests/App.test';
import YoTest from 'tests/yo.test';

// Assets
import Logo from 'assets/logos/daily-mix.png';
`,
        },
    ],
});
