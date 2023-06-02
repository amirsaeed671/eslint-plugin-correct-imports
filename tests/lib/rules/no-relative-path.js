//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/no-relative-path");

const parsers = require("../../helpers/parsers");
const messages = require("../../../lib/utils/messages");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parser: parsers.BABEL_ESLINT });
ruleTester.run("no-relative-path", rule, {
  valid: [
    {
      code: "import Menu from 'components/Menu'",
    },
  ],

  invalid: [
    {
      code: "import Menu from './components/Menu'",
      errors: [
        {
          message: messages.rules.noRelativePath,
          line: 1,
          column: 18,
          type: "ImportDeclaration",
        },
      ],
      // Since we have fixable: 'code' in meta, we need to provide output
      output: "import Menu from 'components/Menu'",
    },
  ],
});
