"use strict";

const { validateImportPath } = require("../utils");
const messages = require("../utils/messages");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        "Enforce using import statements as string literal with absolute path",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      noRelativePath: messages.rules.noRelativePath,
    },
    fixable: 'code',
  },

  create(context) {
    return {
      ImportDeclaration: (node) => validateImportPath(node, context),
    };
  },
};
