//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/group-import");

const parsers = require("../../helpers/parsers");
const messages = require("../../../lib/utils/messages");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parser: parsers.BABEL_ESLINT });
ruleTester.run("group-import", rule, {
  valid: [
    {
      code: `
        // Tests
        import AppTests from 'tests/Yup.test';
        import NewTest from 'tests/App.test';
        import YoTest from 'tests/yo.test';
      `,
    },
  ],

  invalid: [
    {
      code: `
        // Tests
        import AppTests from 'tests/Yup.test';

        import NewTest from 'tests/App.test';
        import YoTest from 'tests/yo.test';
      `,
      errors: [
        {
          message: messages.rules.tests.adjacentImportError,
          line: 5,
          column: 9,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
