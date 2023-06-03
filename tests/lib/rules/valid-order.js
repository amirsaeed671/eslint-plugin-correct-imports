//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const { RuleTester } = require("eslint");
const rule = require("../../../lib/rules/valid-order");

const parsers = require("../../helpers/parsers");
const messages = require("../../../lib/utils/messages");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({ parser: parsers.BABEL_ESLINT });
ruleTester.run("valid-order", rule, {
  valid: [
    {
      code: `
        // Packages
        import React from 'react';
        import axios from 'axios';

        // Router
        import Router from 'components/Router';
      `,
    },
  ],

  invalid: [
    {
      code: `
        // Router
        import Router from 'components/Router';
        
        // Packages
        import React from 'react';
        import axios from 'axios';
      `,
      errors: [
        {
          message: messages.rules.tests.validOrderError,
          line: 6,
          column: 9,
          type: "ImportDeclaration",
        },
        {
          message: messages.rules.tests.validOrderError,
          line: 7,
          column: 9,
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
