"use strict";

const {
  reportUngroupImportStatements,
  getImportType,
} = require("../utils");
const messages = require("../utils/messages");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Enforce grouping similar import statements together",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      adjacentImportError: messages.rules.adjacentImportError,
    },
    fixable: false,
  },

  create(context) {
    let importNodesGroup = {};

    return {
      ImportDeclaration(node) {
        const importType = getImportType(node);

        if (importNodesGroup[importType]) {
          importNodesGroup[importType].push(node);
        } else {
          importNodesGroup[importType] = [node];
        }
      },
      "Program:exit": () =>
        reportUngroupImportStatements(importNodesGroup, context),
    };
  },
};
